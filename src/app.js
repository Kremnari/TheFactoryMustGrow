import {BindingSignaler} from 'aurelia-templating-resources'
import {inject} from 'aurelia-framework'
import Parcel from './resources/StateDef/parcel'
import DataProvider from 'DataProvider'

const IDB_SAVE_VERSION = "0.01"

@inject(BindingSignaler, DataProvider)
export class App {
    viewPane = {main: "resources", showingItem: null }
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
      this.parcels = database.parcels || []
      this.player = database.player || new Parcel(10, this.mgrs, true)
      if(database.save) {
        if(database.save.version==IDB_SAVE_VERSION) {
          this.player = Parcel.deserialize(this.mgrs, database.save.player)
          for (let each of database.save.parcels) {
            this.parcels.push(Parcel.deserialize(this.mgrs, each))
          }
        } else {
          console.log("idb save data out of date")
          this.jumpStart()
          this.save()
        }
      } else {
        this.jumpStart()
      }
      this.mgrs.entity.set_player(this.player)
      this.selectParcel(this.player)
      this.viewPane.entities = (x) => {
        return Array.from(this.viewPane.parcel.entityStore?.entityTags?.get("type")?.get(x)?.values() || [])
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
    addParcel() {
      this.parcels.push(new Parcel(10, this.mgrs, false))
    }
    selectParcel(which) {
      this.showItem = null
      this.viewPane.parcel = which
    }
    async save() {
      let save = { player: {}}
      console.log('saving...')
      save.version = IDB_SAVE_VERSION
      save.techs = this.mgrs.tech.serialize()
      save.player = this.player.serialize()
      save.parcels = []
      for (let each of this.parcels) {
        save.parcels.push(each.serialize())
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
