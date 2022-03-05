import {BindingSignaler} from 'aurelia-templating-resources'
import {inject, BindingEngine} from 'aurelia-framework'
import {DataProvider} from 'DataProvider'
import * as Config from 'Config'
import {DialogMgr} from "resources/dialogs/DialogMgr.js"


import {CephlaCommCaller as CCC, CephlaCommConstructor as CC_const} from 'CephlaComm/main'
import {ChameleonBuilder as ChameJS, ChameleonViewer as ChameView, ChameleonTasker as ChameTasks} from 'Chameleon/main'
import {IgorUtils as IgorJs} from 'IgorJs/main'

import * as BaseGame from 'gameCode/BaseGame' //* this will come from data files

import * as JSON5 from 'json5'

import {Tutorial} from 'Tutorial'

@inject(BindingSignaler, BindingEngine, DialogMgr)
export class App {
    showTut = true
    dataBase = {}
    viewRecCat = false
    constructor(signaler, BE, DS) { 
      window.tfmg = this
      this.Math = Math
      this.signaler = signaler
      this.IgorJs = IgorJs
      ChameJS.signaler = this.signaler
      ChameJS.app = this
      this.view = ChameView
      this.DS = DS
      this.view.set({type: 'view', which: 'main', what: 'home'})
      this.view.set({type: 'context', what: 'standard'})
      this.CCC = CCC  // Need to add so it's available in the view
      this.Tutorial = Tutorial  //Needed in view
      this.save = () => {
        IgorJs.saveGame();
        this.autoSave();
        // Calling twice will reset it
        this.autoSave();
      }
      BE.expressionObserver(this, "view.ctrl.main").subscribe((newVal, oldVal) => {this.whenCheck(newVal, oldVal, "main")})
      this.Igor_init()
    }
    async Igor_init() {
      let url = location.href.slice(0, location.href.lastIndexOf("/"))
      const setup_file = await fetch(url+"/tfmg_base_config.json5")
      const setup_data = JSON5.parse(await setup_file.text())
      await IgorJs.initialize({
        commandTasker: CC_const, //TODO: Probably some kind of initilization function
        viewTasker: ChameTasks,  //TODO: Probably some kind of initilization function
        ticker: {
          ticks_per_sec: Config.TICKS_PER_SECOND,
          ticks_max_phase: Config.TICKS_MAX_PHASE
        },
        dbName: "TheFactoryMustGrow",
        dataSets: setup_data,
      })
      DataProvider.onLoadComplete((db) => { this.init(db) }) //webpack live reload hack
      DataProvider.beginLoad(setup_data, IgorJs.getDataSets())
    }
    async init(database) { 
      //TODO `this.mgrs` needs to be removed
      this.mgrs = database.mgrs
      this.mgrs.baseApp = this

      CC_const.initialize({
        dataSet: database.mgrs.data,
        dialogSvc: this.DS,
        viewer: ChameView

      })
      await IgorJs.loadDatabase(database.mgrs.data) //TODO fix this data transfer
      this.dataSet = IgorJs.dataSet

      //TODO Improve this... just seems hacky
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
        }).sort( (x, y) => {
          return x.name < y.name ? -1 : 1
        })
      })
      ChameJS.setViewFn("objectValues", (list) => {
        return Object.values(list)
      })
      ChameJS.setViewFn("technologyFilter", () => {
        if(tfmg.showAllTechs) {
          return Object.values(tfmg.dataSet.technology)
        } else {
          return Object.values(tfmg.dataSet.technology).filter( (tech) => {
            if(this.globals.research[tech.name]?.complete) return tfmg.view.options.bDoneTechs
            return !tech.prerequisites || tech.prerequisites.every( (preq) => { return this.globals.research[preq]?.complete })
          }).sort( (first, second) => {
            return first.name > second.name ? 1 : -1
          })
        }
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
    //TODO NUKE in favor of chameView
    // Is used app.html:245
    set setConnectedItems(obj) {
      let cis= {}
      obj.item.connections.drains?.forEach((x) => {cis[x.parent || x] = 'drain'})
      obj.item.connections.sources?.forEach((x) => {cis[x.parent || x] += ' source'})            
      this.view.set({type: 'scope', which: 'connectedItems', what: cis})
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
      if(this.whenTarg.targ.entityPane && this.view.ctrl.entityPane != this.whenTarg.targ.entityPane) return
      if(this.whenTarg.targ.main && this.view.ctrl.main != this.whenTarg.targ.main) return
      this.whenTarg.cb()
      this.whenTarg = undefined
    }
    isAwesome() {
      this.showAllTechs = true
      this.editDataSource = true
    }

    //* Utility Functions
    nukeCache() {
      //TODO include all idb caches
      this.mgrs.idb.clear();
      window.location.reload()
    }
    hideTutorial() { Tutorial.clearTut() }
    jumpTutorial() { 
      this.IgorRunner.checkAndEmit("system_update", "facBlock", {})
      this.globals.activeFeatures.tutorial = {step: 49};
      Tutorial.jump(this)
    }
    async copySave() {
      await this.IgorJs.commands("copySave")
      navigator.clipboard.writeText(window.tfmg_save)
      this.view.goodToast("Copied save to clipboard")
    }
    resetDS() { this.mgrs.idb.del('last_ds'); location.reload() }
    toggleDev() { this.mgrs.idb.set('dev', !this.showDev); this.showDev = !this.showDev}
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
          {name: 'transport-belt', count: 100},
          {name: 'logistic-science-pack', count: 100},
          {name: 'radar', count: 100},
          {name: 'offenseBot', count: 100}
        ]
      })
      this.showAllTechs = true
      //this.globals.activeFeatures.factoryBlocks = {}
      this.globals.land.total += 400
      this.globals.control.bonusTicks = 60000
      this.signaler.signal("generalUpdate")
    }
}
