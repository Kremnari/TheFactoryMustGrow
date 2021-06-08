import {BindingSignaler} from 'aurelia-templating-resources'
import {inject, BindingEngine} from 'aurelia-framework'
import {FactoryBlock, NamedBlocks} from './resources/StateDef/FactoryBlock'
import {DataProvider} from 'DataProvider'
import {DialogMgr} from 'resources/dialogs/DialogMgr'
import {Tutorial} from 'Tutorial'
import * as Config from 'Config'
import {CephlaCommCaller as CCC} from 'CephlaComm/main.js'
import {ChameleonCore as ChamJS} from 'Chameleon/main.js'

import {ArrayObject} from 'libs/ArrayObject'

@inject(BindingSignaler, DataProvider, DialogMgr, BindingEngine)
export class App {
    viewPane = {
      main: "home",
      showingItem: null,
      version: "beta"
    }
    activeFeatures = ArrayObject()
    globals = {
      land: {
        total: 100,
        used: 0,
        complexity: 0,
        res_patches: 1,
        res_patch_used: 0
      },
      scanning: {
        nextCost: 100,
        currentCost: 0
      },
      attackWaves: {
        nextTimer: 100,
        nextStrength: 100,
        currentTimer: 0,
      }
    }
    viewHelpers =  {
      //HACK no 'this' reference....
      //using tfmg from window
      PlayerBlock(where) {
        tfmg.select_FacBlock(tfmg.player, true)
        tfmg.viewPane.main = "entities"
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
      this.CCC = CCC
      this.Cham = ChamJS
      this.saveGame = DataProv.saveGame
      BE.expressionObserver(this, "viewPane.main").subscribe((newVal, oldVal) => {this.whenCheck(newVal, oldVal, "main")})
    }
    async init(database, DS) { 
      this.mgrs = database.mgrs
      this.mgrs.DS = DS
      this.mgrs.baseApp = this
      this.mgrs.signaler = this.signaler
      if(database.save && database.save.version==Config.IDB_SAVE_VERSION) {
        this.player = NamedBlocks.player.deserialize(this.mgrs, database.save.player)
        this.facBlocks = []
        this.global = database.save.global
        this.activeFeatures = database.save.features || ArrayObject()
        this.facBlocks.player = this.player
        this.showTut = false
        if(database.save.facBlocks) {
          for (let each of database.save.facBlocks.set) {
            this.facBlocks.push(FactoryBlock.deserialize(each))
          }
          this.facBlocks.defenses = database.save.facBlocks.d
          this.facBlocks.defenseBus = database.save.facBlocks.dbus
          this.facBlocks.offenses = database.save.facBlocks.o
          this.facBlocks.offenseBus = database.save.facBlocks.obus
        }
      } else {
        this.facBlocks = []
        this.player =  new NamedBlocks.player(20)
        //this.jumpStart()
        this.mgrs.signaler.signal("generalUpdate")
      }
      this.mgrs.rec.set_player(this.player) //SMELL recipe manager shouldn't have to care who the player is
      this.mgrs.rec.sub_ticker(this.mgrs.Ticker)
      this.select_FacBlock(this.player, true)
      this.mgrs.Ticker.subscribe((td) => { this.tickMine(td) })
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
    toggleDev(at) { this.mgrs.idb.set('dev', !this.showDev); this.showDev = !this.showDev}
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
      if(type=="resource") {
        if(globals.land.res_patches-globals.land.res_patch_used>0) {
          this.facBlocks.push(new FactoryBlock('resource', name))
        }
        return
      }
      //++ Need to calculate next block space
      if(this.globals.land.available - this.globals.land.used < 10) {
        console.log('not enough land available')
        return 
      }
      this.globals.land.used += 10

      let add = new FactoryBlock(type, name)
      this.facBlocks.push(add)
      return add
    }
    select_FacBlock(which, isPlayer = false) {
      this.showItem = null
      this.viewPane.facBlock = which
      this.viewPlayer = isPlayer
    }
    adjustFeature(obj) {
      switch(obj.feature) {
        case "defense":
          if(!this.activeFeatures["defense"]) {
            this.activeFeatures["defense"] = true
            this.facBlocks.defenses = NamedBlocks.DefenseBlock()
            this.facBlocks.defenseBus = NamedBlocks.DefenseBus()
          }
          this.facBlocks.defenses.machines["turret"] = ChamJS.GameObjectFromPointer(obj.go_pointer)
          break;
        case "offense":
          if(!this.activeFeatures["offense"]) {
            this.activeFeatures["offense"] = true
            this.facBlocks.offenses = NamedBlocks.OffenseBlock()
            this.facBlocks.offenseBus = NamedBlocks.OffenseBus()
          }
          this.facBlocks.offenses.radar = ChamJS.GameObjectFromPointer(obj.go_pointer)
          break;
        case "factoryBlocks":
          this.activeFeatures["factoyBlocks"] = true
      }
      // this.activeFeatures[obj.feature] = obj.level || (this.activeFeatures[obj.feature]+obj.inc) || (this.activeFeatures[obj.feature] * obj.bonus) || true
    }
    tickMine(tickData) {
      //SMELL
      //This should be moved to YgorJs
      if(tickData.ticks%100) { return }
      if(this.facBlocks?.offenses?.machines.radar?.count) {
        this.globals.scanning.currentCost += this.facBlocks.offenses.machines.radar.count * 1
        if(this.globals.scanning.currentCost>=this.globals.scanning.nextCost) {
          this.globals.scanning.currentCost -= this.globals.scanning.nextCost
          this.globals.scanning.nextCost += 20
          //NYI generate land /resource patch
          this.globals.land.total += 10
          this.globals.land.res_patches = Math.floor(this.globals.land.total/100)

        }
      }
      if(this.facBlocks?.defenses?.machines.turret?.count) {
        //next wave
        if(this.globals.attackWaves.currentTimer>this.globals.attackWaves.nextTimer) {
          this.globals.attackWaves.nextTimer = this.globals.attackWaves.nextTimer ^ 1.2
          this.globals.attackWaves.currentTime = 0
          //Process some attack
        } else {
          this.globals.attackWaves.currentTimer++
        }
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
    async save() {
      let save = { player: {}}
      console.log('saving...')
      save.version = Config.IDB_SAVE_VERSION
      save.techs = this.mgrs.tech.serialize()
      save.player = this.player.serialize()
      save.features = this.activeFeatures
      save.facBlocks = {
        set: [],
        d: this.facBlocks.defenses,
        dbus: this.facBlocks.defenseBus,
        o: this.facBlocks.offenses,
        obus: this.facBlocks.offenseBus
      }
      for (let each of this.facBlocks) {
        save.facBlocks.set.push(each.serialize())
      }
      save.global = this.global
      this.saveGame(save)
      console.log("...done")
    }
    jumpStart() {
      this.player.inv.add("inserter", 10)
      this.player.inv.add("lab", 10)
      this.player.inv.add("automation-science-pack", 200)
      this.mgrs.tech.complete_research("steel-processing")
    }
    testing() {
      if(!confirm("Initialize Testing?")) return
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
    nukeCache() {
      this.mgrs.idb.clear()
      window.location.reload()
    }
}
