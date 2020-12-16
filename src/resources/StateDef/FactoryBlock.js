import {EntityStorage} from 'EntityMgr'
import {Inventory} from 'ItemMgr'
import {TransportLine, EntityLine} from './FactoryLines'
import {DialogService} from 'aurelia-dialog'
import {mgrs as MGRS} from 'managers'
let mgrs = MGRS

export class FactoryBlock {
  constructor(whichType, name) {
    let includes
    switch(whichType) {
      case "resource":
        includes = {output:true, line:true }
        break;
      case "bus":
        includes = {input: true, output: true}
        break;
      case "research":
        includes = {input: true, line: true}
        break;
      case "factory":
      default:
        includes = {input: true, output: true, line:true}
    }

    this.lines = []
    this.name = name
    this.type = whichType
    if(includes.input) this.lines.push(new TransportLine(this, mgrs))
    if(includes.line) this.lines.push(new EntityStorage(this, mgrs))
    if(includes.output) this.lines.push(new TransportLine(this, mgrs))
  }
  static deserialize(DEPRECIATED, saveData) {
    let ret = new FactoryBlock()
    return ret
  }
  serialize() {
    let ret = {}
    return ret
  }
  tick(tickData) {
    this.output.tick(tickData)
    for (let line of this.lines) {
      line.tick(tickData)
    }
    this.input.tick(tickData)
  }
  useItem(item) {
    this.lines[0].AddEntity(item)
  }
  getStore(line = 0) {
    return this.lines[line]
  }
  selectLine(which) {
    this.selected = which
  }
  add_EntityLine() {
    this.lines.splice(-1, 0, new TransportLine(), new EntityStorage(this))
  }
}
export class BusLineBlock {
  constructor() {
    this.lines.push(new TransportLine())
  }
}

export class PlayerBlock {
  constructor(invSeed) {
    this.inv = new Inventory(mgrs, invSeed)
    this.entityStore = new EntityStorage(this)
  }
  static deserialize(DEPRECIATED, saveData) {
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
  useItem(item) {
    this.entityStore.AddEntity(item)

  }
  tick(tickData) {
    //subscribe moved to entitystorage, where it's used
    //This may become relevant when more things are added to a parcel
    this.entityStore.tick(tickData, this.inv)
  }
}
