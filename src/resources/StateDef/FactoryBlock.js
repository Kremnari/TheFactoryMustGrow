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
    this.name = name
    this.type = whichType
    if(includes.input) this.lines.push(new TransportLine(this, mgrs))
    if(includes.line) this.lines.push(new EntityStorage(this, mgrs))
    /*if(includes.delay) {
      this.lines.push()
      this.drains = []
      this.feeds = []
    }
    */
    if(includes.output) this.lines.push(new TransportLine(this, mgrs))

    this.line_select = includes.line ? 1 : 0
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
    this.lines[this.line_select].AddEntity(item)
  }
  getStore(line = 0) {
    return this.lines[line]
  }
  selectLine(which) {
    this.line_select = which
  }
  add_EntityLine() {
    this.lines.splice(-1, 0, new TransportLine(this, mgrs), new EntityStorage(this, mgrs))
  }
  AddBusDrain(who) { this.drains.push(who) }
  DelBusDrain(who) { this.drains = this.drains.filter( (x) => x!=who) }
  AddBusFeed(who)  { this.feeds.push(who) }
  DelBusFeed(who)  { this.feeds = this.feeds.filter( (x) => x!=who)}
}

export class PlayerBlock {
  constructor(invSeed) {
    this.inv = new Inventory(mgrs, invSeed)
    this.entityStore = new EntityStorage(this, mgrs)
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
  getEntities(tag) {
    let ret = Array.from(this.entityStore.entityTags.get("type").get(tag).values() || []) 
    console.log(ret)
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
