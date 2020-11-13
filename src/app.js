import {BindingSignaler} from 'aurelia-templating-resources'
import {inject} from 'aurelia-framework'
import {FactoryBlock, PlayerBlock} from './resources/StateDef/FactoryBlock'
import {DataProvider} from 'DataProvider'

const IDB_SAVE_VERSION = "0.01"

@inject(BindingSignaler, DataProvider)
export class App {
    viewPane = {main: "home", showingItem: null }
    dataBase = {}
    rounder = { ones: 1, tens: 0, huns: 0, abs: false, fail: false,
                get val() { return this.huns*100+this.tens*10+this.ones},
                calc_val(max) { return Math.min(this.val, max)},
                calc(current, max, avail) { return Math.min(this.val, Math.min(avail, max-current))}
              } // absolute vs modulus, fail... on partial
    viewRecCat = false
    tooltip = null
    constructor(signaler, DataProv) {
      //import("./data_source.json").then( (mod) => this.init(mod.default))
      //fetch("data_source.json").then( (data) => data.json().then( (what) => this.init(what) ) )
      window.tfmg = this
      this.signaler = signaler
      DataProv.onLoadComplete((db) => { this.init(db) }) //webpack live reload hack
      DataProv.beginLoad()
      this.saveGame = DataProv.saveGame
    }
    init(database) {
      this.mgrs = database.mgrs
      this.mgrs.signaler = this.signaler
      if(database.save) {
        if(database.save.version==IDB_SAVE_VERSION) {
          this.player = PlayerBlock.deserialize(this.mgrs, database.save.player)
          this.facBlocks = []
          for (let each of database.save.facBlocks) {
            this.facBlocks.push(FactoryBlock.deserialize(this.mgrs, each))
          }
        } else {
          console.log("idb save data out of date")
          this.facBlocks = []
          this.player =  new PlayerBlock(10, this.mgrs, true)
          this.jumpStart()
          this.save()
        }
      } else {
        this.facBlocks = []
        this.player =  new PlayerBlock(10, this.mgrs, true)
        this.jumpStart()
      }
      this.mgrs.entity.set_player(this.player)  //SMELL
      this.mgrs.rec.set_player(this.player) //SMELL
      this.mgrs.rec.sub_ticker(this.mgrs.Ticker)
      this.select_FacBlock(this.player)
      this.viewPane.entities = (x) => {
        return Array.from(this.viewPane.facBlock.entityStore?.entityTags?.get("type")?.get(x)?.values() || [])
      }
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
    add_FacBlock() {
      this.facBlocks.push(new FactoryBlock(0, this.mgrs, false))
    }
    select_FacBlock(which) {
      this.showItem = null
      this.viewPane.facBlock = which
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
}
