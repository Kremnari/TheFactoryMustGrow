import {EntityStorage} from 'EntityMgr'
import {Inventory} from 'ItemMgr'
import {TransportLine, EntityLine} from './FactoryLines'
import {DialogService} from 'aurelia-dialog'
import {mgrs} from 'managers'

export class FactoryBlock {
  constructor(whichType, name) {
    let includes
    switch(whichType) {
      case "resource":
        includes = {output:true, line:true }
        break;
      case "bus":
        includes = {input: true, output: true, delay: true}
        break;
      case "research":
        includes = {input: true, line: true}
        break;
      case "factory":
      default:
        includes = {input: true, output: true, line:true}
    }

    this.lines = []
    this.transports = []
    this.feeds = []
    this.drains = []
    this.name = name
    this.type = whichType
    if(includes.input) this.lines.push(new TransportLine(this))
    if(includes.line) this.lines.push(new EntityLine(this))
    if(includes.output) this.lines.push(new TransportLine(this))

    this.line_select = includes.line ? 1 : 0
    mgrs.Ticker.subscribe( (x) => this.tick(x))
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
    for (let line of this.lines) {
      line.tick(tickData)
    }
  }
  useItem(item) {
    return this.lines[this.line_select].AddEntity(item)
  }
  getStore(line = 0) {
    return this.lines[line]
  }
  selectLine(which) {
    this.line_select = which
  }
  add_EntityLine() {
    this.lines.splice(-1, 0, new TransportLine(this), new EntityStorage(this))
  }
  AddBusDrain(who) { this.drains.push(who) }
  DelBusDrain(who) { this.drains = this.drains.filter( (x) => x!=who) }
  AddBusFeed(who)  { this.feeds.push(who) }
  DelBusFeed(who)  { this.feeds = this.feeds.filter( (x) => x!=who)}
}

export class PlayerBlock {
  constructor(invSeed) {
    this.inv = new Inventory(mgrs, invSeed)
    this.entityStore = new EntityStorage(this)
  }
  static deserialize(DEPRECIATED, saveData) {
    let ret = new PlayerBlock(saveData.inv)
    ret.entityStore.deserialize(saveData.entityStore)
    return ret
  }
  serialize() {
    let ret = {}
    ret.inv = this.inv.serialize()
    ret.entityStore = this.entityStore.serialize()
    return ret
  }
  getEntities(tag) {
    return Array.from(this.entityStore.entityTags.get("type")?.get(tag)?.values() || []) 
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
