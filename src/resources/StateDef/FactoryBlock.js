import {EntityStorage} from 'EntityMgr'
import {Inventory} from 'ItemMgr'
import {TransportLine, EntityLine} from './FactoryLines'

export class FactoryBlock {
  constructor(mgrs) {
    this.input = new TransportLine()
    this.lines = []
    this.lines.push(new EntityStore(mgrs.entity, this, mgrs.Ticker))
    this.output = new TransportLine()
  }
  static deserialize(mgrs, saveData) {
    let ret = new FactoryBlock(mgrs)
    return ret
  }
  serialize() {
    let ret = {}
    return ret
  }
  tick(tickData) {
    this.input.tick(tickData)
    this.output.tick(tickData)
    for (let line of this.lines) {
      line.tick(tickData)
    }
    /*this.entityStore.tick(tickData, this.inv)*/
  }
  add_EntityLine() {
    this.lines.push(new TransportLine())
    this.lines.push(new EntityStore())
  }
}

export class PlayerBlock {
  constructor(invSeed, mgrs) {
    this.inv = new Inventory(mgrs, invSeed)
    this.entityStore = new EntityStorage(mgrs.entity, this, mgrs.Ticker)
  }
  static deserialize(mgrs, saveData) {
    let ret = new PlayerBlock(saveData.inv, mgrs, saveData.isPlayer)
    ret.entityStore.deserialize(saveData.entityStore, mgrs)
    return ret
  }
  serialize() {
    let ret = {}
    ret.inv = this.inv.serialize()
    ret.entityStore = this.entityStore.serialize()
    return ret
  }
  tick(tickData) {
    //subscribe moved to entitystorage, where it's used
    //This may become relevant when more things are added to a parcel
    this.entityStore.tick(tickData, this.inv)
  }
}
