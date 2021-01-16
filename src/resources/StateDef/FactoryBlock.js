import {EntityStorage} from 'EntityMgr'
import {Inventory, ItemStack} from 'ItemMgr'
import {mgrs} from 'managers'
import {InvXFer} from 'gameCode/Inventory'

const lineUpgrades = () => {
  return {
    buffers: {
      count: 0      
      ,type: "buffers"
      , max: 3
    }
    ,loaders: {
      count: 0
      ,type: "loaders"
      , max: 10
    }
  }
}
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
    this.feeds = []
    this.drains = []
    this.name = name
    this.type = whichType
    this.upgrades = {base: this }
    FactoryBlock.assign(this.name+":"+this.type, this)
    if(includes.input) {
      this.upgrades.input = lineUpgrades()
      this.inputLine = new Inventory(5, 5)
    }
    if(includes.output) {
      this.upgrades.output = lineUpgrades()
      this.outputLine = new Inventory(5, 5)
    }
    if(includes.line) this.lines.push(new EntityStorage(this, {type: this.entityTypes, feed: this.inputLine, drain: this.outputLine}))

    mgrs.Ticker.subscribe( (x) => this.tick(x))
  }
  static #blocks = {}
  static #awaiting = {}
  static assign(name, facBlock) {
    if(this.#awaiting[name]) {
      this.#awaiting[name].forEach((cb) => {cb(facBlock)})
    }
    this.#blocks[name] = facBlock
  }
  static acquire(name, cb) {
    if(this.#blocks[name]) {
      cb(this.#blocks[name])
      return
    }
    if(!this.#awaiting[name]) {
      this.#awaiting[name] = []
    }
    this.#awaiting[name].push(cb)
  }
  static deserialize(save) {
    let ret = new FactoryBlock(save.type, save.name)
    ret.upgrades = save.upgrades
    ret.base = ret
    save.inputLine && (ret.inputLine = Inventory.deserialize(save.inputLine))
    save.outputLine && (ret.outputLine = Inventory.deserialize(save.outputLine))
    if(save.lines) {
      ret.lines = []
      save.lines.forEach((l, i)=> {
        ret.lines[i] = EntityStorage.deserialize(this, l)
      })
    }
    if(save.feeds) {
      ret.feeds = []
      save.feeds.forEach((x,i) => FactoryBlock.acquire(x, (fb) => { ret.feeds[i] = fb}))
    }
    if(save.drains) {
      ret.drains = []
      save.drains.forEach( (x,i) => FactoryBlock.acquire(x, (fb) => { ret.drains[i] = fb}))
    }
    return ret
  }
  serialize() {
    let ret = {}
    ret.name = this.name
    ret.type = this.type
    ret.entityTypes = this.entityTypes
    this.inputLine && (ret.inputLine = this.inputLine.serialize())
    this.outputLine && (ret.outputLine = this.outputLine.serialize())
    this.feeds && (ret.feeds = this.feeds.map(x => x.name+":"+x.type))
    this.drains && (ret.drains = this.drains.map(x => x.name+":"+x.type))
    this.lines && (ret.lines = this.lines.map(x => x.serialize()))
    ret.upgrades = this.upgrades
    ret.upgrades.base = undefined
    return ret
  }
  tick(tickData) {
    if(this.type=="bus") {
      for(let x of this.drains) {
        if(x.type=="bus") return
        x.inputLine.absorbFrom(this.outputLine)
      }
    } else {
      //NYI
     this.inputLine && InvXFer(this.inputLine, this.lines[0], {
       maxXfer: this.upgrades.input.count * 2
       ,toAs: "entity"
     })
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
  useItem(item) {
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
  ApplyUpgrade(obj) {
    //console.log(obj)
    if(obj.upgrade.type=="buffers") {
      let unconsumed = obj.inv.consume("iron-chest", 1)
      //console.log(unconsumed)
      if(unconsumed==0) {
        obj.upgrade.count++
        obj.line.max_stack *= 2
      } else {
        //console.log('not enough')
      }
      return
    }
    if(obj.upgrade.type=="loaders") {
      let unconsumed = obj.inv.consume("inserter", 1)
      if(unconsumed==0) {
        obj.upgrade.count++
      } else {
        //console.log('not enough')
      }
      return
    }
  }
}

export class PlayerBlock {
  constructor(invSeed) {
    this.inv = new Inventory(invSeed)
    this.entityStore = new EntityStorage(this)
    mgrs.Ticker.subscribe((x)=>{ this.tick(x)})
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
    tickData.fromParent = {
      feed: this.inv,
      drain: this.inv
    }
    this.entityStore.tick(tickData)
  }
}
