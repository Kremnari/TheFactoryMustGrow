import {BindingSignaler} from 'aurelia-templating-resources'
import {inject, BindingEngine} from 'aurelia-framework'
import {DataProvider} from 'DataProvider'
import {DialogMgr} from 'resources/dialogs/DialogMgr'
import * as Config from 'Config'
import {CephlaCommCaller as CCC, CephlaCommConstructor as CC_const} from 'CephlaComm/main'
import {ChameleonBuilder as ChameJS, ChameleonViewer as ChameView} from 'Chameleon/main'
import {IgorUtils as IgorJs} from 'IgorJs/main'

import {setupIgor as gameSetup} from 'gameCode/BaseGame'
import {Tutorial} from 'Tutorial'

@inject(BindingSignaler, DataProvider, DialogMgr, BindingEngine)
export class App {
    viewPane = {
      main: "home",
      showingItem: null,
      version: "beta",
      loaded: false,
      options: {}
    }
    showTut = true
    dataBase = {}
    tooltip = null
    viewRecCat = false
    constructor(signaler, DataProv, DS, BE) { 
      window.tfmg = this
      this.Math = Math
      this.signaler = signaler
      this.IgorJs = IgorJs
      ChameView.signaler = this.signaler
      ChameView.app = this
      this.ChameView = ChameView
      IgorJs.initialize({
        commandTasker: CC_const, //TODO: Probably some kind of initilization function
        viewTasker: ChameView,  //TODO: Probably some kind of initilization function
        ticker: {
          ticks_per_sec: Config.TICKS_PER_SECOND,
          ticks_max_phase: Config.TICKS_MAX_PHASE
        },
        dbName: "TheFactoryMustGrow",
        saveName: "SaveGame"
      })
      DataProv.onLoadComplete((db) => { this.init(db, DS) }) //webpack live reload hack
      DataProv.beginLoad()
      this.CCC = CCC  // Need to add so it's available in the view
      this.Tutorial = Tutorial  //Needed in view
      this.save = () => {
        IgorJs.saveGame();
        this.autoSave();
        // Calling twice will reset it
        this.autoSave();
      }
      BE.expressionObserver(this, "viewPane.main").subscribe((newVal, oldVal) => {this.whenCheck(newVal, oldVal, "main")})
    }
    async init(database, DS) { 
      this.mgrs = database.mgrs
      this.mgrs.baseApp = this
      //this.mgrs.signaler = this.signaler
      //this.mgrs.Ticker = IgorJs.Ticker
      CC_const.initialize({
        dialogSvc: DS,
        dataSet: database.mgrs.data
      })
      gameSetup(IgorJs)
      await IgorJs.loadDatabase(database.mgrs.data) //TODO fix this data transfer
      this.dataSet = IgorJs.dataSet
      this.globals = IgorJs.globalObject
      CC_const.setRunner(IgorJs.getRunner())

      this.IgorRunner = IgorJs.getRunner() //# For debugging

      this.globals = IgorJs.getNamed("global")
      // This should be established from within Igor, not made from here
      //CCC.staticProvide("from", "inventory", this.globals.player.inv)  /
      CCC.staticProvide("player", "inventory", this.globals.player.inv)
      CCC.staticProvide("service", "rounder",  this.mgrs.rounder)

      //These would appear in the data files, which "list" and "params" objects
      ChameJS.setClassFn("canCraft", (rec) => {
        let res = rec.ingredients.every( (ing) => {
          return this.IgorRunner.processTEMP(this.globals.player.inv.items, "inventory.total", {name: ing.name}) >= ing.amount
        })
        return res ? "recipeEnabled" : "recipeDisabled"
      })
      ChameJS.setViewFn("recipeFilter", (category) => {
        return Object.values(this.IgorRunner.data.recipe).filter( (x) => {
          return (x.enabled === undefined || x.enabled || this.globals.unlocked_recipes.includes(x.name) )
                && ((Array.isArray(category) && category.includes(x.category))
                    || x.category == category
                )
        })
      })
      ChameJS.setViewFn("objectValues", (list) => {
        return Object.values(list)
      })
      ChameJS.setViewFn("technologyFilter", () => {
        return Object.values(tfmg.dataSet.technology).filter( (tech) => {
          if(this.globals.research[tech.name]?.complete) return tfmg.viewPane.options.bDoneTechs
          return !tech.prerequisites || tech.prerequisites.every( (preq) => { return this.globals.research[preq]?.complete })
        }).sort( (first, second) => {
          return first.name > second.name ? 1 : -1
        })
      })
      ChameJS.setViewFn("workshopEntities", () => {
        let list = this.IgorJs.arrayFromIds(this.globals.player.workshop.entities)
        list = list.sort( (first, second) => {
          return first.order > second.order ? -1 : 1
        })
        return list
      })
      ChameJS.setViewFn("playerInventory", () => {
        let list = this.globals.player.inv.items
        list = list.sort( (first, second) => {
          if(first.name==second.name) {
            //This seems backwards...
            return first.count > second.count ? -1 : 1
          } else {
            return first.name > second.name ? 1 : -1
          }
        })
        return list
      })

      this.showDev = await this.mgrs.idb.get("dev")
      if(!this.showDev) {
        IgorJs.setState("start")
        if(this.globals.activeFeatures["tutorial"]) Tutorial.start(this) 
        else this.autoSave()
      }
      ChameJS.setViewFn("sort", (list) => {
        list = list.sort( (first, second) => {
          return first.order > second.order ? 1 : -1
        })
        return list
      })
    }
    hoverTest () {
      alert("test")
    }
    set showTech(tech) {
      this.viewPane.showingTech = null
      tech && window.setTimeout( () => {
        this.viewPane.showingTech = tech
      })
    }
    set showItem(obj) {
      if(!obj.item) return
      if(typeof obj.item == "string" && obj.item.includes("id")) {
        obj.item = this.IgorJs.getObjId(obj.item)
      }
      if(this.viewPane.showingItem==obj.item && obj.double) {
        this.viewPane.main=obj.double.view
        return
      }
      let old = this.viewPane.showingItem
      this.viewPane.showingItem = null
      this.viewPane.showingCat = ""
      this.viewPane.connectedItems = null
      if (obj && old != obj.item) {
        window.setTimeout( ()=> {
          this.viewPane.showingItem = obj.item
          this.viewPane.showingCat = obj.cat
          obj.view && (this.viewPane.main = obj.view)
          obj.setConnected && (this.setConnectedItems = obj)
        }, 0)
      }
    }
    set setConnectedItems(obj) {
      this.viewPane.connectedItems = {}
      obj.item.connections.drains?.forEach((x) => {this.viewPane.connectedItems[x.parent || x] = 'drain'})
      obj.item.connections.sources?.forEach((x) => {this.viewPane.connectedItems[x.parent || x] += ' source'})            
    }
    set clearConnectedItems(obj) {
      this.viewPane.connectedItems = {}
    }
    autoSave() {
      if(!this.autoSave.sub) {
        this.autoSave.sub = IgorJs.Ticker.subscribe(()=> {
          IgorJs.saveGame()
        }, Config.TICKS_MAX_PHASE/5)
        this.autoSave.secs = () => { return Math.floor((Config.TICKS_MAX_PHASE/5 - IgorJs.Ticker.ticks%(Config.TICKS_MAX_PHASE/5)+this.autoSave.sub.phase)/Config.TICKS_PER_SECOND) }
      } else {
        this.IgorJs.Ticker.dispose(this.autoSave.sub)
        this.autoSave.secs = () => {return 0 }
        this.autoSave.sub = null
      }
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
    test(val) {
      console.log(val)

    }

    //* Utility Functions
    nukeCache() { this.mgrs.idb.clear(); window.location.reload() }
    hideTutorial() { Tutorial.clearTut() }
    jumpTutorial() { 
      this.globals.activeFeatures.factoryBlocks = {}
      this.globals.activeFeatures.tutorial = {step: 49};
      Tutorial.jump(this)
    }
    resetDS() { this.mgrs.idb.del('last_ds'); location.reload() }
    toggleDev(at) { this.mgrs.idb.set('dev', !this.showDev); this.showDev = !this.showDev}
    resetSave() { if(IgorJs.commands("resetSave")) { location.reload() } }
    jumpStart() {
      this.IgorRunner.processTEMP("player.inventory", "inventory.add", {
        itemStacks: [
          {name: "lab", count: 10},
          {name: 'automation-science-pack', count: 200},
          {name: 'inserter', count: 50},
          {name: 'iron-chest', count: 50},
          {name: 'stone', count: 100},
          {name: 'burner-mining-drill', count: 10},
          {name: 'stone-furnace', count: 10},
          {name: 'assembling-machine-1', count: 10},
          {name: 'transport-belt', count: 100}
        ]
      })
      this.globals.activeFeatures.factoryBlocks = {}
      this.signaler.signal("generalUpdate")
    }
}
