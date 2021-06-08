import {EntityStorage} from 'EntityMgr'
import {Inventory, ItemStack} from 'ItemMgr'
import {mgrs} from 'managers'
import {InvXFer} from 'gameCode/Inventory'
import {ChameleonBuilder as ChamBuild} from 'Chameleon/main.js'

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
        this.tick = this.tick_bus
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
  tick_bus(tickData) {
    if(tickData.ticks%40!=0) return 
    for(let x of this.drains) {
      if(x.type=="bus") return
      if(this.upgrades.output.count==0) continue
      InvXFer(this.outputLine, x.inputLine, {maxXfer: this.upgrades.output.loaders.count})
    }
    InvXFer(this.inputLine, this.outputLine, {maxXfer: this.upgrades.input.loaders.count * 2})    
  }
  tick(tickData) {
    this.inputLine
      && tickData.ticks%30==0
      && this.upgrades.input.loaders.count &&InvXFer(this.inputLine, this.lines[0], {
        maxXfer: this.upgrades.input.loaders.count * 2
        ,toAs: "entity"
      })
    tickData.fromParent = {
      feed: this.inputLine 
      ,drain: this.outputLine
    }
    for(let line of this.lines) {
      line.tick(tickData)
      line.tick_restricted(tickData)
    }
    this.drains[0]
      && tickData.ticks%30==0
      && this.upgrades.output.loaders.count
      && InvXFer(this.outputLine, this.drains[0].inputLine, {maxXfer: this.upgrades.output.loaders.count*2})
  }
  useItem(item) {
    if(this.type=="bus") return
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

class PlayerBlock {
  constructor(invSeed) {
    this.inv = new Inventory(invSeed)
    this.entityStore = new EntityStorage(this)
    mgrs.Ticker.subscribe((x)=>{ this.tick(x)})
  }
  static deserialize(DEPRECIATED, saveData) {
    let ret = new PlayerBlock()
    ret.inv.deserialize(saveData.inv)
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
    if(tag) {
      return Array.from(this.entityStore.entityTags.get("type")?.get(tag)?.values() || []) 
    } else {
      return Array.from(this.entityStore.entities)
    }
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
function DefenseBlock() {
  let ret = {}
  ret.machines = {}
  ret.ammo = 0
  ret.repair = 0
  return ret
}

ChamBuild.AddGameObjectClass("turret", {name: "turret", count: 0}, {category: "defenseMachines"})

function DefenseBus() {
  let ret = {}
  return ret
}
function OffenseBlock() {
  let ret = {}
  ret.machines = {}
  ret.supply = 0
  ret.fuel = 0
  return ret
}
ChamBuild.AddGameObjectClass("radar", {name: "radar", count: 0}, {category: 'offenseMachines'})

function OffenseBus() {
  let ret = {}
  return ret
}

export const NamedBlocks = {
  player: PlayerBlock,
  DefenseBlock,
  DefenseBus,
  OffenseBlock,
  OffenseBus
}
