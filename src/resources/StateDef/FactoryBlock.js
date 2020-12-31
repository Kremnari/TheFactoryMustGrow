import {EntityStorage} from 'EntityMgr'
import {Inventory, ItemStack} from 'ItemMgr'
import {mgrs} from 'managers'
import {InvXFer} from 'gameCode/Inventory'

export class FactoryBlock {
  entityTypes = false
  upgrades = {}
  constructor(whichType, name) {
    let includes
    switch(whichType) {
      case "resource":
        includes = {output:true, line:true }
        this.entityTypes = "mining"
        break;
      case "bus":
        includes = {input: true, output: true, delay: true}
        break;
      case "research":
        includes = {input: true, line: true}
        this.entityTypes = "research"
        break;
      case "factory":
      default:
        this.entityTypes = "crafting"
        includes = {input: true, output: true, line:true}
    }
    this.lines = []
    this.transports = []
    this.feeds = []
    this.drains = []
    this.name = name
    this.type = whichType
    this.upgrades = {}
    if(includes.input) this.inputLine = new Inventory(5)
    if(includes.output) this.outputLine = new Inventory(5)
    if(includes.line) this.lines.push(new EntityStorage(this, {type: this.entityTypes, feed: this.inputLine, drain: this.outputLine}))

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
    if(tickData.ticks%16!=0) return
    //console.log('tickStart')
    if(this.type=="bus") {
      for(let x of this.drains) {
        if(x.type=="bus") return
        x.inputLine.absorbFrom(this.outputLine)
      }
    } else {
      //NYI
      //this.inputLine && InvXFer(this.inputLine, this.lines[0])

      if(this.inputLine) {
        for(let each of this.inputLine.getTypes(false)) {
          let total = this.inputLine.total(each)
          if(total>0) {
            this.lines[0].recieveItem(new ItemStack(each, total), this.inputLine)
            console.log('total: '+this.inputLine.total(each))
          }
        }
      }
      tickData.fromParent = {
        feed: this.inputLine
        ,drain: this.outputLine
      }
      for(let line of this.lines) {
        line.tick(tickData)
      }
      this.drains[0]?.inputLine.absorbFrom(this.outputLine)
    }
    //console.log('tickEnd')
  }

  useItem(item, line = this.line_select) {
    return this.lines[0].AddEntity(item)
  }
  add_EntityLine() {
    this.lines.splice(-1, 0, new Inventory(5), new EntityStorage(this, this.entityTypes))
  }
  async SelectBusFeed() {
    let out = await mgrs.DS.open("SelectBus", {base: mgrs.baseApp})
    if(!out?.selected) return
    this.AddBusFeed(out.selected)
  }
  AddBusFeed(who)  {
    if(!this.inputLine || !who || this.feeds.includes(who)) return 
    this.feeds.push(who)
    who.AddBusDrain(this)
  }
  DelBusFeed(who)  {
    this.feeds = this.feeds.filter( (x) => x!=who)
  }
  async SelectBusDrain() {
    let out = await mgrs.DS.open("SelectBus", {base: mgrs.baseApp})
    if(!out?.selected) return
    this.AddBusDrain(out.selected)
  }
  AddBusDrain(who) {
    if(!who || this.drains.includes(who)) return
    this.drains.push(who)
    who.AddBusFeed(this)
  }
  DelBusDrain(who) { this.drains = this.drains.filter( (x) => x!=who) }
  ApplyUpgrade() {

  }
}

export class PlayerBlock {
  constructor(invSeed) {
    this.inv = new Inventory(invSeed)
    this.entityStore = new EntityStorage(this)
    mgrs.Ticker.subscribe((x)=>{this.tick(x)})
  }
  static deserialize(DEPRECIATED, saveData) {
    let ret = new PlayerBlock()
    ret.inv.deserialize(saveData.inv)
    ret.entityStore.deserialize(saveData.entityStore)
    //debugger
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
    return this.entityStore.AddEntity(item)
  }
  tick(tickData) {
    //subscribe moved to entitystorage, where it's used
    //This may become relevant when more things are added to a parcel
    this.entityStore.tick(tickData, this.inv)
  }
}
