import {BindingSignaler} from 'aurelia-templating-resources'
import {inject} from 'aurelia-framework'
import {FactoryBlock, PlayerBlock} from './resources/StateDef/FactoryBlock'
import {DataProvider} from 'DataProvider'
import {DialogMgr} from 'resources/dialogs/DialogMgr'
import {CephlaCommTemp as CC} from 'CephlaComm/main.js'

const IDB_SAVE_VERSION = "0.02"

@inject(BindingSignaler, DataProvider, DialogMgr)
export class App {
    viewPane = {main: "home", showingItem: null }
    dataBase = {}
    viewRecCat = false
    tooltip = null
    constructor(signaler, DataProv, DS) { 
      window.tfmg = this
      this.signaler = signaler
      DataProv.onLoadComplete((db) => { this.init(db, DS) }) //webpack live reload hack
      DataProv.beginLoad()
      this.CC = CC
      this.saveGame = DataProv.saveGame
    }
    async init(database, DS) {
      this.mgrs = database.mgrs
      this.mgrs.DS = DS
      this.mgrs.baseApp = this
      this.mgrs.signaler = this.signaler
      if(database.save) {
        if(database.save.version==IDB_SAVE_VERSION) {
          this.player = PlayerBlock.deserialize(this.mgrs, database.save.player)
          this.facBlocks = []
          for (let each of database.save.facBlocks) {
            this.facBlocks.push(FactoryBlock.deserialize(each))
          }
        } else {
          console.log("idb save data out of date")
          this.facBlocks = []
          this.player =  new PlayerBlock(20)
          //this.jumpStart()
          this.save()
        }
      } else {
        this.facBlocks = []
        this.player =  new PlayerBlock(20)
        //this.jumpStart()
      }
      this.showDev = await this.mgrs.idb.get("dev")
      this.mgrs.rec.set_player(this.player) //SMELL
      this.mgrs.rec.sub_ticker(this.mgrs.Ticker)
      this.select_FacBlock(this.player, true)
      if(!this.showDev) this.mgrs.Ticker.toggle()
    }
    vrcToggle(toWhich) { this.viewRecCat = this.viewRecCat == toWhich ?  false : toWhich }
    set showItem(obj) {
      if (this.viewPane.showingItem) this.viewPane.showingItem.selectedClass = ""
      let old = this.viewPane.showingItem
      this.viewPane.showingItem = null
      this.viewPane.showingCat = ""
      if (obj && old != obj.item) {
        window.setTimeout( ()=> {
          obj.item.selectedClass = "selected"
          this.viewPane.showingItem = obj.item
          this.viewPane.showingCat = obj.cat
        }, 0)
      }
    }
    resetSave() {
      this.saveGame()
    }
    showing(whatObj, category) {
      if (this.viewPane.showingItem) this.viewPane.showingItem.selectedClass = ""
      let old = this.viewPane.showingItem
      this.viewPane.showingItem = null
      this.viewPane.showingCat = ""
      if (whatObj && old != whatObj) {
        window.setTimeout( ()=> {
          whatObj.selectedClass = "selected"
          this.viewPane.showingItem = whatObj
          this.viewPane.showingCat = category
        }, 0)
      }
    }
    add_FacBlock(type, name) {
      name = name || prompt("Enter Block Name")
      if(!name) return false

      let add = new FactoryBlock(type, name)
      this.facBlocks.push(add)
      return add
    }
    select_FacBlock(which, isPlayer = false) {
      this.showItem = null
      this.viewPane.facBlock = which
      this.viewPlayer = isPlayer
    }
    async save() {
      let save = { player: {}}
      console.log('saving...')
      save.version = IDB_SAVE_VERSION
      save.techs = this.mgrs.tech.serialize()
      save.player = this.player.serialize()
      save.facBlocks = []
      for (let each of this.facBlocks) {
        save.facBlocks.push(each.serialize())
      }
      this.saveGame(save)
      console.log("...done")
    }
    jumpStart() {
      this.player.inv.add("burner-mining-drill", 2)
      this.player.inv.add("assembling-machine-1", 2)
      this.player.inv.add("lab", 2)
      this.player.inv.add("automation-science-pack", 200)
    }
    testing() {
      //if(!confirm("Initialize Testing?")) return
      this.player2 = new PlayerBlock(10)
      this.add_FacBlock("resource", "iron-mine") //1
      this.facBlocks[0].lines[0].AddEntity("burner-mining-drill")
      this.facBlocks[0].lines[0].AddEntity("burner-mining-drill")
      this.facBlocks[0].lines[0].SetEntityFn(this.mgrs.res.resList["iron-ore"])
      this.add_FacBlock("factory", "iron-plates") //3
      this.facBlocks[1].lines[0].AddEntity("stone-furnace")
      this.facBlocks[1].lines[0].AddEntity("stone-furnace")
      this.facBlocks[1].lines[0].SetEntityFn(this.mgrs.rec.recipeList["iron-plate"])

      this.add_FacBlock("resource", "copper-mine") //1
      this.facBlocks[2].lines[0].AddEntity("burner-mining-drill")
      this.facBlocks[2].lines[0].AddEntity("burner-mining-drill")
      this.facBlocks[2].lines[0].SetEntityFn(this.mgrs.res.resList["copper-ore"])
      this.add_FacBlock("factory", "copper-plates") //3
      this.facBlocks[3].lines[0].AddEntity("stone-furnace")
      this.facBlocks[3].lines[0].AddEntity("stone-furnace")
      this.facBlocks[3].lines[0].SetEntityFn(this.mgrs.rec.recipeList["copper-plate"])
      this.add_FacBlock("bus", "plates")
      this.facBlocks[0].AddBusDrain(this.facBlocks[1])
      this.facBlocks[1].AddBusDrain(this.facBlocks[4])
      this.facBlocks[2].AddBusDrain(this.facBlocks[3])
      this.facBlocks[3].AddBusDrain(this.facBlocks[4])

      this.player.inv.add("inserter", 10)
    }

    async iconEditor() {
      if(this.viewPane=="iconEditor") {
        this.viewPane = {main: "home", showingItem: null }
        return
      }
      this.viewPane = "iconEditor"
      this.IE = {
          ds: {
          old: {}
          ,new: {}
        }
        ,select: {}
      }
      this.IE.ds.new = await this.mgrs.idb.get('Icons') || (await this.mgrs.idb.get("dataSet")).icons
      this.IE.ds.old = (await this.mgrs.idb.get('oldIcons'))
      this.IE.ds.old || ((await this.mgrs.idb.set("oldIcons", this.IE.ds.new)) && (this.IE.ds.old = this.IE.ds.new))
      this.signaler.signal("update")
    }
    IEshow() {
      this.IE.showOld = this.IE.ds.old[this.IE.select.Cat][this.IE.select.Icon]
      this.IE.showNew = this.IE.ds.new[this.IE.select.Cat][this.IE.select.Icon]
      this.signaler.signal("update")
    }
    async IEfiled() {
      let convert = async function(data) {
        var a = new FileReader()
        return new Promise( (res) => {
          a.onload = () => {
            res(a.result)
          }
          a.readAsDataURL(data)
        })
      }
      this.IE.fileBlob = await convert(this.IE.file[0])
    }
    IEStore() {
      this.IE.ds.new[this.IE.select.Cat][this.IE.select.Icon] = this.IE.fileBlob
      debugger
    }
    async saveIconEditor() {
      await this.mgrs.idb.set("Icons", this.IE.ds.new)
    }
    dlIconEditor() {
      let a = document.createElement('a')
      a.download = "icons.json"
      a.href = "data:application/octet-stream:base64,"+JSON.stringify(this.IE.ds.new)
      a.style = "display:none"
      document.body.appendChild(a)
      a.click()
    }
    async ulIconEditor() {
      if(!this.IE.upload) return
      let convert = async function(icon) {
        var a = new FileReader()
        return new Promise( (res) => {
          a.onload = () => {
            res(a.result)
          }
          a.readAsText(icon)
        })
      }
      let data = JSON.parse(await convert(this.IE.upload[0]))
      this.mgrs.idb.set("Icons", data)
      console.log('loaded')
    }

}
