import {EntityStorage} from 'EntityMgr'
import {Inventory} from 'ItemMgr'

export default class Parcel {
  constructor(invSeed, mgrs, isPlayer = false) {
    this.inv = new Inventory(mgrs, invSeed)
    this.entityStore = new EntityStorage(mgrs.entity, this, mgrs.Ticker)
    this.isPlayer = isPlayer
  }
  static deserialize(mgrs, saveData) {
    let ret = new Parcel(saveData.inv, mgrs, saveData.isPlayer)
    ret.entityStore.deserialize(saveData.entityStore, mgrs)
    return ret
  }
  serialize() {
    let ret = {}
    ret.inv = this.inv.serialize()
    ret.entityStore = this.entityStore.serialize()
    ret.isPlayer = this.isPlayer
    return ret
  }
  tick(tickData) {
    //subscribe moved to entitystorage, where it's used
    //This may become relevant when more things are added to a parcel
    this.entityStore.tick(tickData, this.inv)
  }
}
