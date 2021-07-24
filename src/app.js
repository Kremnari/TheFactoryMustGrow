import {BindingSignaler} from 'aurelia-templating-resources'
import {inject, BindingEngine} from 'aurelia-framework'
import {FactoryBlock} from './resources/StateDef/FactoryBlock_old'
import {NamedBlocks} from './resources/StateDef/FactoryBlock'
import {DataProvider} from 'DataProvider'
import {DialogMgr} from 'resources/dialogs/DialogMgr'
import * as Config from 'Config'
import {CephlaCommCaller as CCC, CephlaCommConstructor as CC_const} from 'CephlaComm/main'
import {ChameleonCore as ChamJS, ChameleonViewer as ChameView} from 'Chameleon/main'
import {IgorUtils as IgorJs} from 'IgorJs/main'

import {ArrayObject} from 'libs/ArrayObject'

import {game} from 'BaseGame'
import {Tutorial} from 'Tutorial'

@inject(BindingSignaler, DataProvider, DialogMgr, BindingEngine)
export class App {
    viewPane = {
      main: "home",
      showingItem: null,
      version: "beta",
      loaded: false
    }
    activeFeatures = ArrayObject()
    showTut = true
    dataBase = {}
    viewRecCat = false
    tooltip = null
    constructor(signaler, DataProv, DS, BE) { 
      window.tfmg = this
      this.signaler = signaler
      IgorJs.initialize({
        commandTasks: CC_const,
        viewTasks: ChamJS,
        ticker: {
          ticks_perSec: Config.TICKS_PER_SECOND,
          ticks_maxPhase: Config.TICKS_MAX_PHASE
        }
      })
      DataProv.onLoadComplete((db) => { this.init(db, DS) }) //webpack live reload hack
      DataProv.beginLoad()
      this.CCC = CCC  // Need to add so it's available in the view
      this.save = () => { game.save(this.mgrs.idb) }
      BE.expressionObserver(this, "viewPane.main").subscribe((newVal, oldVal) => {this.whenCheck(newVal, oldVal, "main")})
    }
    async init(database, DS) { 
      this.mgrs = database.mgrs
      this.mgrs.DS = DS
      this.mgrs.baseApp = this
      this.mgrs.signaler = this.signaler
      this.mgrs.Ticker = IgorJs.Ticker
      ChameView.signaler = this.signaler
      IgorJs.setDatabase(database.mgrs.data) //TODO fix this data transfer
      game.setup()  //Should have pointer to base game object
      if(database.save && database.save.version==Config.IDB_SAVE_VERSION) {
        console.log("loaded")
        game.load(database.save)
        this.mgrs.save = database.save
        this.showTut = false
      } else {
        console.log("new")
        game.new()
      }
      this.globals = IgorJs.globalObject
      this.IgorRunner = IgorJs.getRunner() // DEBUGGER
      CC_const.setRunner(this.IgorRunner)
      CCC.staticProvide("from", "inventory", this.globals.player.inv)  //! Should depreciate use in preference of proper noun reference
      CCC.staticProvide("player", "inventory", this.globals.player.inv)

      //SMELL Should get these out at some point,
      //this.mgrs.rec.set_player(this.globals.player)
      //this.mgrs.rec.sub_ticker(IgorJs.Ticker)

      this.signaler.signal("generalUpdate")
      this.showDev = await this.mgrs.idb.get("dev")
      if(!this.showDev) {
        IgorJs.setState("start")
        this.showTut && Tutorial.start()
        !this.showTut && this.autoSave()
      }
    }
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
      if(type=="resource") {
        if(globals.land.res_patches-globals.land.res_patch_used>0) {
          this.facBlocks.push(new FactoryBlock('resource', name))
        }
        return
      }
      if(this.globals.land.available - this.globals.land.used < this.globals.land.fac_block_costs[type]) {
        ChameView.error('not enough land available')
        return 
      }
      this.globals.land.used += this.globals.land.fac_block_costs[type]

      //# Magic number in calculation
      //++ Better calculation of next factory block
      this.globals.land.fac_block_costs[type] = Math.floor(this.globals.land.fac_block_costs[type] * 1.2)

      let add = FactoryBlock.new(type, name)
      this.facBlocks.push(add)
      return add
    }
    adjustFeature(obj) {
      switch(obj.feature) {
        case "defense":
          if(!this.activeFeatures["defense"]) {
            this.activeFeatures["defense"] = true
            this.facBlocks.defenses = NamedBlocks.DefenseBlock()
            this.facBlocks.defenseBus = NamedBlocks.DefenseBus()
          }
          this.facBlocks.defenses.machines["turret"] = ChameView.GameObjectFromPointer(obj.go_pointer)  //!!! shouldn't be in Chameleon
          break;
        case "offense":
          if(!this.activeFeatures["offense"]) {
            this.activeFeatures["offense"] = true
            this.facBlocks.offenses = NamedBlocks.OffenseBlock()
            this.facBlocks.offenseBus = NamedBlocks.OffenseBus()
          }
          this.facBlocks.offenses.radar = ChameView.GameObjectFromPointer(obj.go_pointer)  //!!! shouldn't be in Chameleon
          break;
        case "factoryBlocks":
          this.activeFeatures["factoryBlocks"] = true
      }
      // this.activeFeatures[obj.feature] = obj.level || (this.activeFeatures[obj.feature]+obj.inc) || (this.activeFeatures[obj.feature] * obj.bonus) || true
    }
    when(targ, cb) {
      this.whenTarg = {targ, cb}
      console.log('whenSet')
    }
    whenCheck(newVal, oldVal, prop) {
      if(!this.whenTarg) return
      if(this.whenTarg.targ.entityPane && this.viewPane.entityPane != this.whenTarg.targ.entityPane) return
      if(this.whenTarg.targ.main && this.viewPane.main != this.whenTarg.targ.main) return
      this.whenTarg.cb()
      this.whenTarg = undefined
    }
    //* Utility Functions
    jumpStart() {
      this.player.inv.add("inserter", 10)
      this.player.inv.add("lab", 10)
      this.player.inv.add("automation-science-pack", 200)
      this.mgrs.tech.complete_research("steel-processing")
    }
    testing() {
      if(!confirm("Initialize Testing?")) return
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
    nukeCache() { this.mgrs.idb.clear(); window.location.reload() }
    hideTutorial() { Tutorial.hide() }
    resetDS() { this.mgrs.idb.del('last_ds'); location.reload() }
    toggleDev(at) { this.mgrs.idb.set('dev', !this.showDev); this.showDev = !this.showDev}
    resetSave() { this.mgrs.idb.del('SaveGame_Igor') }
}
