import {TagMapProxy} from "./resources/types/TagsProxy"
import KVSMap from "./resources/types/KVSMap"
import {ItemStack, Inventory} from "./ItemMgr"
import {FactoryBlock} from './resources/StateDef/FactoryBlock_old'
import {mgrs} from 'managers'
import {TICKS_PER_SECOND} from "./Config"
import {InvXFer} from './gameCode/Inventory'

import {IgorUtils as IgorJs} from 'IgorJs/main'

const BUFFER_SIZES = [5, 10, 20, 30, 40, 50]
BUFFER_SIZES.MAX = 50

export class EntityMgr {
  entities_base = {}
  entity_cats = []
  constructor() {}
  import(entityData) {
    this.itemMgr = mgrs.item
    this.techMgr = mgrs.tech
    Object.entries(entityData).forEach( ([name, obj]) => {
      if(this.itemMgr.itemList[name]) {
        this.itemMgr.itemList[name].hasEntity = true
        this.entities_base[name] = obj
        if (obj.crafting_categories) {
          obj.crafting_categories.forEach( (craft_cat) => {
            if(!this.entity_cats[craft_cat]) this.entity_cats[craft_cat] = []
            this.entity_cats[craft_cat].push(obj.name)
          })
        }
      } else {
        console.warn("cannot locate  item for entity: "+name)
      }
    })
    Object.defineProperty(this, "avail_cats", {
      get () {
        let ret = []
        Object.entries(this.entity_cats).forEach( ([cat, crafters]) => {
          if( crafters.some( (item) => {
                      return this.itemMgr.itemList[item].count > 0
              }) ) {
                ret.push(cat)
              }
        })
        return ret
      }
    })
    IgorJs.Ticker.DataProvider((obj) => { this.TickerProvider(obj) })
  }
  TickerProvider(tickerObj) {
    if(!tickerObj.entities) tickerObj.entities = {}
    if(!tickerObj.entities.types) tickerObj.entities.types = []
    tickerObj.entities.types.push('crafting')
    tickerObj.entities.types.push('mining')
  }
  EntityType(name) {
    return this.entities_base[name].subType
    /*
    let obj = this.entities_base[name]
    if(obj.resource_categories) return "mining"
    if(obj.crafting_categories) return "crafting"
    if(obj.inputs) return "research"
    return false
    */
  }
  GenerateEntity(name, facBlock, tagArray) {
    let obj = this.entities_base[name]
    if (obj.resource_categories) {
      return new MiningEntity(obj, facBlock, tagArray)
    }
    if (obj.crafting_categories) {
      return new CraftingEntity(obj, facBlock, tagArray)
    }
    if (obj.inputs) {
      return new LabEntity(obj, facBlock, tagArray)
    }
    return false //Entity not added
  }
  RestoreEntity(save, facBlock, tagArray) {
    let obj = this.entities_base[save.name]
    let ret = null
    if(save.type=="mining") {
      ret = new MiningEntity(obj, facBlock, tagArray)
      if(save.mining!="") ret.set_mining(mgrs.res.resList[save.mining], save.mining_timer)
    } else if(save.type=="crafting") {
      ret = new CraftingEntity(obj, facBlock, tagArray)
      if(save.recipe!="") ret.set_recipe(mgrs.rec.recipeList[save.recipe], save.crafting_timer)
    } else if(save.type=="lab") { 
      ret = new LabEntity(obj, facBlock, tagArray)
      ret.research_timer = save.research_timer
    }
    ret.restoreBuffers(save.buffers)
    return ret
  }
  upgrade(obj) {
    //TODO no maximums present...
    //SMELL ugly implementation of actor acquisition
    //SMELL ugly implementation of defining upgrade period
    //consume upgrade ingredients from inventory
      let at = obj.who.buffers.upgrades[obj.dir]
      if(obj.type=="buffers") {
        let consumed = mgrs.baseApp.player.inv.consumeAll([new ItemStack("iron-chest", 1)], true)
        //console.log(consumed)
        if(consumed && !Array.isArray(consumed)) {
          at.size++
          obj.who.buffers["max_"+obj.dir] = BUFFER_SIZES[at.size] || BUFFER_SIZE.MAX //...Past end of array
        } else {
          //console.log('not enough...awesome')
        }
      } else if(obj.type=="autoload") {
        let consumed = mgrs.baseApp.player.inv.consumeAll([new ItemStack("inserter", 1)], true)
        //console.log(consumed)
        if(consumed && !Array.isArray(consumed)) {
          at.xfer++
          at.xferAt || (at.xferAt = 0)
        } else {
          //console.log('not enough...awesome')
        }
      }
  }
  craftingCats(entityStr) {
    return this.entities_base[entityStr].crafting_categories
  }
}
class Entity {
  buffers = {
    out: undefined, in: undefined
    ,upgrades: {
      out: {size: 0, xfer:0, xferMod: 120, xferProgress: NaN }
      ,in: {size: 0, xfer:0, xferMod: 120, xferProgress: NaN }
    }
  }
  constructor(baseItem, inventory, tagArray, type = null) {
    Object.assign(this, baseItem)
    this.inv = inventory
    this.tags = TagMapProxy({to: tagArray, entity: this})
    if(type) this.tags.push("type", type);
    
    if(baseItem.type!="mining-drill")
      //? Why did I do it this way...?
      Object.defineProperty(this.buffers, 'max_in', {
        get() { return this.in.max_stack; },
        set(val) {
          this.in.max_stack = val;
        }
      })
    if(baseItem.type!="lab")
      Object.defineProperty(this.buffers, 'max_out', {
        get() { return this.out.max_stack; },
        set(val) {
          this.out.max_stack = val;
        }
      })
  }
  deserialize(data) {
    throw new Error("Abstract method, please override")
  }
  serialize() {
    throw new Error("Abstract method, please override")
  }
  tick(tickNum) {
    console.warn("base entity ticked")
  }
  restoreBuffers(buffers) {
    buffers.out && (this.buffers.out = new Inventory(buffers.out.items, buffers.out.max_stack))
    buffers.in  && (this.buffers.in  = new Inventory(buffers.in.items, buffers.in.max_stack))
    this.buffers.upgrades = buffers.upgrades
    buffers.max_in  && (this.buffers.max_in  = buffers.max_in)
    buffers.max_out && (this.buffers.max_out = buffers.max_out)

  }
}
class MiningEntity extends Entity{
  mining = null
    constructor(baseItem, inventory, tagArray) {
    super(baseItem, inventory, tagArray, "mining")
    this.buffers.out = new Inventory(1)
    this.buffers.max_out = 5;
  }
  deserialize(data) {
    Object.assign(this, data)
    debugger
  }
  serialize() {
    let ret = {}
    ret.name = this.name
    ret.type = "mining"
    ret.mining = this.mining?.name || ""
    ret.buffers = {
       out: this.buffers.out.serialize()
      ,upgrades: this.buffers.upgrades 
      ,max_out: this.buffers.max_out
    }
    ret.mining_timer = this.mining_timer
    return ret
  }
  tick_outXfer(tickData) {
    if(++this.buffers.upgrades.out.xferAt>this.buffers.upgrades.out.xferMod) {
      InvXFer({
        from: this.buffers.out,
        to: tickData.fromParent.drain,
        options: {maxXfer: this.buffers.upgrades.out.xfer}
      })
      this.buffers.upgrades.out.xferAt = 0
    }
    this.buffers.upgrades.out.xferProgress = this.buffers.upgrades.out.xferAt/this.buffers.upgrades.out.xferMod * 100
  }
  tick(tickData) {
    //this.buffers.upgrades.out.xfer && this.tick_outXfer(ickData)
    if (!this.mining || this.buffers.out.total(this.mining.mining_results) == this.buffers.max_out) return
    if (++this.mining_timer>this.mining_time) {
      this.buffers.out.add(this.mining.mining_results, 1)
      //console.log('adding one mined')
      this.mining_timer = 0
      mgrs.signaler.signal("generalUpdate")
    }
    this.progress = this.mining_timer/this.mining_time*100
  }
  set_mining(resObj, timer) {
    if(resObj==this.mining) return 
    this.mining && this.collectBuffer()
    this.mining && this.buffers.out.removeFilter(this.mining.mining_results)
    if (resObj!=this.mining) {
      this.mining = resObj
      this.mining_time = resObj.mining_time / this.mining_speed * TICKS_PER_SECOND
      this.mining_timer = timer || 0
      this.buffers.out.addFilter(this.mining.mining_results)
      this.tags.push("ticking", "mining")
      this.tags.push("outputTicker", true)
    } else {
      this.mining = null
      this.tags.delete("ticking")
    }
  }
  collectBuffer(actor = this, count= this.buffers.out.total(this.mining.mining_results)) {
    if(count==0) return
    let consumed = actor.inv.add(this.mining.mining_results, count)
    this.buffers.out.consume(this.mining.mining_results, count - consumed)
    mgrs.signaler.signal("generalUpdate")
  }
}
class CraftingEntity extends Entity {
  recipe = null
  outputFull = false
  constructor(baseItem, inventory, tagArray) {
    super(baseItem, inventory, tagArray, "crafting")

    let items = this.type=="furnace" ? 1: 5
    this.buffers.in = new Inventory(items)
    this.buffers.max_in = 5
    this.buffers.out = new Inventory(items)
    this.buffers.max_out = 5
    this.crafting_timer = NaN
  }
  tick_outXfer(tickData) {
    if(++this.buffers.upgrades.out.xferAt>this.buffers.upgrades.out.xferMod) {
      InvXFer({
        from: this.buffers.out,
        to: tickData.fromParent.drain,
        options:{maxXfer: this.buffers.upgrades.out.xfer}
      })
      this.buffers.upgrades.out.xferAt = 0
    }
    this.buffers.upgrades.out.xferProgress = this.buffers.upgrades.out.xferAt/this.buffers.upgrades.out.xferMod * 100
  }
  tick_inXfer(tickData) {
    if(++this.buffers.upgrades.in.xferAt>this.buffers.upgrades.in.xferMod) {
      InvXFer({
        from: tickData.fromParent.feed,
        to: this.buffers.in,
        options:{
          types: this.recipe.ingredients.map((x)=> x.name)
          ,maxXfer: this.buffers.upgrades.in.xfer
        }
      })
      this.outputFull = false
      this.buffers.upgrades.in.xferAt = 0
    }
    this.buffers.upgrades.in.xferProgress = this.buffers.upgrades.in.xferAt/this.buffers.upgrades.in.xferMod * 100
  }
  tick(tickData) {
    //this.buffers.upgrades.out.xfer && this.tick_outXfer(tickData)
    //this.buffers.upgrades.in.xfer && this.tick_inXfer(tickData)
    if(Number.isNaN(this.crafting_timer)) {
      if(this.buffers.in.consumeAll(this.recipe.ingredients)===true) {
        this.crafting_timer = 0
      }
    } else {
      if (!this.outputFull && ++this.crafting_timer>this.crafting_time) {
        let addResult = this.buffers.out.addAllOrFail(this.recipe.results)
        //console.log(addResult)
        if(addResult) {
          this.crafting_timer = NaN
          this.progress = 0
          mgrs.signaler.signal("generalUpdate")
        } else {
          this.outputFull = true
        }
      }
    }
    this.crafting_timer && (this.progress = this.crafting_timer/this.crafting_time*100)
  }
  deserialize(data) {
    Object.assign(this, data)
  }
  serialize() {
    let ret = {}
    ret.name = this.name
    ret.type = "crafting"
    ret.buffers = {
      out: this.buffers.out.serialize()
      ,in: this.buffers.in.serialize()
      ,upgrades: this.buffers.upgrades
      ,max_out: this.buffers.max_out
      ,max_in: this.buffers.max_in

    }
    ret.crafting_timer = this.crafting_timer
    ret.recipe = this.recipe?.name || ""

    return ret
  }
  dump(actor, res) {
    actor.inv.absorbFrom(this.buffers.out, res.name)
    this.outputFull = false
  }
  clear_recipe() {
    mgrs.baseApp.player.inv.absorbFrom(this.buffers.in)
    mgrs.baseApp.player.inv.absorbFrom(this.buffers.out)
    this.tags.delete("ticking")
    this.recipe = null
  }
  consumeFrom(inv, IS) {
    let toAdd = mgrs.rounder.calc(this.buffers.in.total(IS.name), this.buffers.max_in, inv.total(IS.name))
    inv.consume(IS.name, toAdd)
    this.buffers.in.add(IS.name, toAdd)
    this.tags.push("ticking", "crafting")
    mgrs.signaler.signal("generalUpdate")
  }
  set_recipe(recipeObj) {
    if(this.recipe && this.recipe.name!=recipeObj.name) this.clear_recipe()
    this.recipe = recipeObj
    this.crafting_time = recipeObj.crafting_speed / this.crafting_speed * TICKS_PER_SECOND
    recipeObj.ingredients.forEach((ing, idx) => {
      this.buffers.in.setFilter(idx, ing.name)
    })
    recipeObj.results.forEach((ing, idx) => {
      this.buffers.out.setFilter(idx, ing.name)
    })
    this.buffers.in.items.length = recipeObj.ingredients.length
    this.buffers.out.items.length = recipeObj.ingredients.length
    this.tags.push("ticking", "crafting")
  }
}
class LabEntity extends Entity {
  //technology is set elsewhere
  constructor(baseItem, inventory, tagArray) {
    super(baseItem, inventory, tagArray, "lab")
    this.buffers.in = new Inventory(this.inputs.length)
    this.buffers.max_in = 5;
    this.inputs.forEach( (name, idx) => this.buffers.in.setFilter(idx, name))
    this.research_timer = NaN
    this.tags.push("ticking", "lab")
  }
  deserialize(data) {
    Object.assign(this, data)
  }
  serialize() {
    let ret = {}
    ret.name = this.name
    ret.type = "lab"
    ret.buffers = {
      in: this.buffers.in.serialize()
      ,upgrades: this.buffers.upgrades
      ,max_in: this.buffers.max_in
    }
    ret.research_timer = this.research_timer
    return ret
  }
  canAdd(name) {
    if(this.inv.total(name) == 0) return false
    if(this.buffers.in.total(name) == this.buffers.max_in) return false
    return true
  }
  addPotion(name) {
    if(!this.canAdd(name)) return

    let toAdd = mgrs.rounder.calc(this.buffers.in.total(name), this.buffers.max_in, this.inv.total(name))
    toAdd -= this.inv.consume(name, toAdd) //returns unconsumed
    this.buffers.in.add(name, toAdd)
  }
  tick_inXfer(tickData) {
    if(++this.buffers.upgrades.in.xferAt>this.buffers.upgrades.in.xferMod) {
      InvXFer({
        from: tickData.fromParent.feed,
        to: this.buffers.in,
        options:{
          types: this.inputs
          ,maxXfer: this.buffers.upgrades.in.xfer
        }
      })
      this.outputFull = false
      this.buffers.upgrades.in.xferAt = 0
    }
    this.buffers.upgrades.in.xferProgress = this.buffers.upgrades.in.xferAt/this.buffers.upgrades.in.xferMod * 100
  }

  /*tick_inXfer(tickData) {
    if(tickData.ticks%30!=0) return
    InvXFer({from: tickData.fromParent.feed, to: this.buffers.in, options: {maxXfer: this.buffers.upgrades.in.xfer}})
  }*/
  tick(tickData) {
    if(!mgrs.tech.researching) return
    let tickCost = mgrs.tech.researching.cost.time*TICKS_PER_SECOND
    if(Number.isNaN(this.research_timer)) {
      this.nextUnit(mgrs.tech.nextIngredients)
    } else {
      if (++this.research_timer%tickCost==0) {
        mgrs.tech.increment_research()
        this.research_timer = NaN
      }
    }
    this.progress = (this.research_timer/tickCost*100) || NaN
  }
  nextUnit(ings) {
    if(!ings) return
    let canConsume = ings.every( ([name, qty]) => { return this.buffers.in.total(name) >= qty } )
    if(!canConsume) {  return }
    ings.forEach( ([name, qty]) => this.buffers.in.consume(name, qty))
    this.research_timer = 0
  }

}

export class EntityStorage {
  entities = []
  entityTags = new KVSMap()
  constructor(facBlock, restricted = false) {
    this.parent = facBlock.parent || facBlock
    //console.log(restricted)
    this.restricted = restricted
  }
  [Symbol.iterator]() { return this.entities }
  static deserialize(facBlock, save) {
    let ret = new EntityStorage(facBlock)
    if(save.restricted) {
      ret.restricted = {}
      ret.restricted.type = save.restricted.type
      save.restricted.feed && FactoryBlock.acquire(save.restricted.feed, (fb) => { ret.restricted.feed = fb})
      save.restricted.drain && FactoryBlock.acquire(save.restricted.drain, (fb) => { ret.restricted.drain = fb})
    }
    if(save.setFn) {
      let itIs
      let [type, name] = save.setFn.split(":")
      type=="resource" ? itIs = mgrs.res.resList[name] : itIs = mgrs.rec.recipeList[name]
      ret.setFn = itIs
      //! SetEntityFn is not required. :D
      // because the inventory filters were serialized
      //ret.SetEntityFn(itIs)
    }
    let newE
    save.entities.forEach( (e) => {
      newE = mgrs.entity.RestoreEntity(e, facBlock.inv, ret.entityTags)
      ret.entities.push(newE)
      ret.setFn && ret.ApplyEntityFn(newE)
    })
    //ret.deserialize(save)
    return ret
  }
  deserialize(save) {
    let next = null
    for (let each of save.entities) {
      next = mgrs.entity.RestoreEntity(each, this.parent.inv, this.entityTags)
      next.parent = this.parent
      this.entities.push(next)
    }    
  }
  serialize() {
    let ret = {
      entities: []
    }
    if(this.restricted) {
      ret.restricted = {
        type: this.restricted.type
      }
      this.restricted.feed && (ret.restricted.feed = this.restricted.feed.name+":"+this.restricted.feed.type)
      this.restricted.drain && (ret.restricted.drain =  this.restricted.drain.name+":"+this.restricted.drain.type)
    }
    for (let idx in this.entities) {
      ret.entities[idx] = this.entities[idx].serialize()
    }
    this.setFn && (ret.setFn = this.setFn.type+":"+this.setFn.name)
    return ret
  }
  SetEntityFn(doing) {
    if(!this.restricted) return
    if(this.setFn) {
      if(this.restricted.type=="crafting") {
        for(let each of this.setFn.results) {
          this.restricted.drain.removeFilter(each.name, true)
        }
        for(let each of this.setFn.ingredients) {
          this.restricted.feed.removeFilter(each.name, true)
        }
      }
      if(this.restricted.type=="mining") {
        this.restricted.drain.removeFilter(this.setFn.mining_results, true)
      } 
    }

    this.setFn = doing
    //console.log(this.setFn)
    this.entities.forEach( (e)=> this.ApplyEntityFn(e))
    if(this.restricted.type=="crafting") {
      for(let each of this.setFn.results) {
        this.restricted.drain.addFilter(each.name)
      }
      for(let each of this.setFn.ingredients) {
        this.restricted.feed.addFilter(each.name)
      }
    }
    if(this.restricted.type=="mining") {
      this.restricted.drain.addFilter(this.setFn.mining_results)
    }
  }
  ApplyEntityFn(e) {
    if(!this.restricted) return
    if(this.restricted.type=="crafting") {
      e.set_recipe(this.setFn)
      return
    }
    if(this.restricted.type=="mining") {
      e.set_mining(this.setFn)
    }
  }
  AddEntity(name) {
    if(this.restricted && mgrs.entity.EntityType(name)!=this.restricted.type) return

    let new_e = mgrs.entity.GenerateEntity(name, this.parent.inv, this.entityTags)
    new_e.parent = this.parent
    this.entities.push(new_e)
    if(this.restricted && this.setFn) this.ApplyEntityFn(new_e)
    return new_e
  }
  recieveItem(itemStack) {
    //console.log('target: '+itemStack.count)
    let whole = Math.floor(itemStack.count/this.entities.length)
    let parts = itemStack.count % this.entities.length
    let accum = 0
    let SplitRounder = () => {
      let add = whole
      parts>0 && add++ && parts--
      accum += add
      //console.log('adding: '+add)
      return add
    }
    let toAdd
    let unconsumed
    for(let each of this.entities) {
      toAdd = SplitRounder()
      unconsumed = each.buffers.in.add(itemStack.name, toAdd)
      //console.log(toAdd+":"+unconsumed+":"+accum)
      accum -=  unconsumed
    }
    //console.log("accum: "+accum)
    return accum
  }
  tick(tickData) {
    //console.log('%ces tick start', "color: blue")
    let which = tickData.entities.types
    for (let type of which) {
      !this.restricted && this.entityTags.getSetValues("outputTicker", true).forEach(
        entity => entity.tick_outXfer(tickData)
      )
      this.entityTags.getSetValues("ticking", type).forEach(
        entity => entity.tick(tickData)
      )
      !this.restricted && this.entityTags.getSetValues("inputTicker", true).forEach(
        entity => entity.tick_inXfer(tickData)
      )
    }
  }
  tick_restricted(tickData) {
    if(tickData.ticks%30==0) {
      this.entities.forEach( (e) => {
        InvXFer({from: e.buffers.out, to: tickData.fromParent.drain, options: {maxXfer: 1}})
      })      
    }
  }
}
