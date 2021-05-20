import {BindingSignaler} from 'aurelia-templating-resources'
import {inject, BindingEngine} from 'aurelia-framework'
import {FactoryBlock, PlayerBlock} from './resources/StateDef/FactoryBlock'
import {DataProvider} from 'DataProvider'
import {DialogMgr} from 'resources/dialogs/DialogMgr'
import {Tutorial} from 'Tutorial'
import * as Config from 'Config'
import {CephlaCommTemp as CC} from 'CephlaComm/main.js'

@inject(BindingSignaler, DataProvider, DialogMgr, BindingEngine)
export class App {
    viewPane = {
      main: "home",
      entityPane: "mining",
      showingItem: null,
      version: 'beta',
      showSubUp: false,
    }
    viewHelpers =  {
      //HACK no this reference....
      //using tfmg from window
      PlayerBlock(where) {
        tfmg.select_FacBlock(tfmg.player, true)
        tfmg.viewPane.main = "entities"
        tfmg.viewPane.entityPane = where
      }
    }

    showTut = true
    dataBase = {}
    viewRecCat = false
    tooltip = null
    constructor(signaler, DataProv, DS, BE) { 
      window.tfmg = this
      this.signaler = signaler
      DataProv.onLoadComplete((db) => { this.init(db, DS) }) //webpack live reload hack
      DataProv.beginLoad()
      this.CC = CC
      this.saveGame = DataProv.saveGame
      BE.expressionObserver(this, "viewPane.main").subscribe((newVal, oldVal) => {this.whenCheck(newVal, oldVal, "main")})
      BE.expressionObserver(this, "viewPane.entityPane").subscribe((newVal, oldVal) => {this.whenCheck(newVal, oldVal, "entityPane")})
    }
    async init(database, DS) { 
      this.mgrs = database.mgrs
      this.mgrs.DS = DS
      this.mgrs.baseApp = this
      this.mgrs.signaler = this.signaler
      if(database.save && database.save.version==Config.IDB_SAVE_VERSION) {
        this.player = PlayerBlock.deserialize(this.mgrs, database.save.player)
        this.facBlocks = []
        this.showTut = false
        for (let each of database.save.facBlocks) {
          this.facBlocks.push(FactoryBlock.deserialize(each))
        }
      } else {
        this.facBlocks = []
        this.player =  new PlayerBlock(20)
        //this.jumpStart()
        this.mgrs.signaler.signal("generalUpdate")
      }
      this.mgrs.rec.set_player(this.player) //SMELL
      this.mgrs.rec.sub_ticker(this.mgrs.Ticker)
      this.select_FacBlock(this.player, true)
      this.showDev = await this.mgrs.idb.get("dev")
      if(!this.showDev) {
       this.showTut && Tutorial.start()
       !this.showTut && this.autoSave()
       this.mgrs.Ticker.toggle()
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
    hideTutorial() { Tutorial.hide() }
    resetDS() { this.mgrs.idb.del('last_ds'); location.reload() }
    setDev() { this.mgrs.idb.set('dev', true); this.showDev = true}
    unsetDev() { this.mgrs.idb.set('dev', false); this.showDev = false}
    autoSave() {
      if(!this.autoSave.sub) {
        this.autoSave.sub = this.mgrs.Ticker.subscribe(()=> {
          this.save()
        }, Config.TICKS_MAX_PHASE)
      } else {
        this.mgrs.Ticker.dispose(this.autoSave.sub)
        this.autoSave.sub = null
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
    when(targ, cb) {
      this.whenTarg = {targ, cb}
      console.log('whenSet')
    }
    whenCheck(newVal, oldVal, prop) {
      //debugger
      //console.log('whencheck')
      if(!this.whenTarg) return
      if(this.whenTarg.targ.entityPane && this.viewPane.entityPane != this.whenTarg.targ.entityPane) return
      if(this.whenTarg.targ.main && this.viewPane.main != this.whenTarg.targ.main) return
      //console.log('still here')
      this.whenTarg.cb()
      this.whenTarg = undefined
    }
    async save() {
      let save = { player: {}}
      console.log('saving...')
      save.version = Config.IDB_SAVE_VERSION
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
}
