import {TagMapProxy} from "./resources/types/TagsProxy"
import KVSMap from "./resources/types/KVSMap"
import {ItemStack, Inventory} from "./ItemMgr"
import {mgrs} from 'managers'
import {TICKS_PER_SECOND} from "./Config"

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
    mgrs.Ticker.DataProvider((obj) => { this.TickerProvider(obj) })
  }
  TickerProvider(tickerObj) {
    if(!tickerObj.entities) tickerObj.entities = {}
    if(!tickerObj.entities.types) tickerObj.entities.types = []
    tickerObj.entities.types.push('crafting')
    tickerObj.entities.types.push('mining')
  }
  EntityType(name) {
    let obj = this.entities_base[name]
    if(obj.resource_categories) return "mining"
    if(obj.crafting_categories) return "crafting"
    if(obj.inputs) return "research"
    return false
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
          obj.who.buffers["max_"+obj.dir] += 10
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
    (function(me) {
      let max_in = 0
      let max_out = 0
      Object.defineProperty(me.buffers, 'max_in', {
      get: function() { return max_in; },
      set: function(val) {
        max_in = val;
        me.buffers.in && (me.buffers.in.max_stack = val);
      }
      })
      Object.defineProperty(me.buffers, 'max_out', {
        get: function() { return max_out; },
        set: function(val) {
          max_out = val;
          me.buffers.out && (me.buffers.out.max_stack = val);
        }
      })
    })(this)
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
  }
  serialize() {
    let ret = {}
    ret.name = this.name
    ret.type = "mining"
    ret.mining = this.mining?.name || ""
    ret.buffers = {out: this.buffers.out.serialize()}
    ret.mining_timer = this.mining_timer
    return ret
  }
  tick_outXfer(tickData) {
    if(++this.buffers.upgrades.out.xferAt>this.buffers.upgrades.out.xferMod) {
      InvXFer(
        this.buffers.out
        ,tickData.fromParent.drain
        ,{maxXfer: this.buffers.upgrades.out.xfer}
      )
      this.buffers.upgrades.out.xferAt = 0
    }
    this.buffers.upgrades.out.xferProgress = this.buffers.upgrades.out.xferAt/this.buffers.upgrades.out.xferMod * 100
  }
  tick(tickData) {
    this.buffers.upgrades.out.xfer && this.tick_outXfer(tickData)
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
    this.mining && this.collectBuffer()
    this.mining && this.buffers.out.removeFilter(this.mining.mining_results)
    if (resObj!=this.mining) {
      this.mining = resObj
      this.mining_time = resObj.mining_time / this.mining_speed * TICKS_PER_SECOND
      this.mining_timer = timer || 0
      this.buffers.out.addFilter(this.mining.mining_results)
      this.tags.push("ticking", "mining")
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
  constructor(baseItem, inventory, tagArray) {
    super(baseItem, inventory, tagArray, "crafting")

    let items = this.type=="furnace" ? 1: 5
    this.buffers.in = new Inventory(items)
    this.buffers.max_in = 5
    this.buffers.out = new Inventory(items)
    this.buffers.max_out = 5;
    this.crafting_timer = NaN
  }
  tick_outXfer(tickData) {
    if(++this.buffers.upgrades.out.xferAt>this.buffers.upgrades.out.xferMod) {
      InvXFer(
        this.buffers.out
        ,tickData.fromParent.drain
        ,{maxXfer: this.buffers.upgrades.out.xfer}
      )
      this.buffers.upgrades.out.xferAt = 0
    }
    this.buffers.upgrades.out.xferProgress = this.buffers.upgrades.out.xferAt/this.buffers.upgrades.out.xferMod * 100
  }
  tick_inXfer(tickData) {
    if(++this.buffers.upgrades.in.xferAt>this.buffers.upgrades.in.xferMod) {
      InvXFer(
        tickData.fromParent.feed
        ,this.buffers.in
        ,{
          types: this.recipe.ingredients.map((x)=> x.name)
          ,maxXfer: this.buffers.upgrades.in.xfer
        }

      )
      this.buffers.upgrades.in.xferAt = 0
    }
    this.buffers.upgrades.in.xferProgress = this.buffers.upgrades.in.xferAt/this.buffers.upgrades.in.xferMod * 100
  }
  tick(tickData) {
    this.buffers.upgrades.out.xfer && this.tick_outXfer(tickData)
    this.buffers.upgrades.in.xfer && this.tick_inXfer(tickData)
    if(Number.isNaN(this.crafting_timer)) {
      if(this.buffers.in.consumeAll(this.recipe.ingredients)===true) {
        this.crafting_timer = 0
      }
    } else {
      if (++this.crafting_timer>this.crafting_time) {
        if(this.buffers.out.addAll(this.recipe.results, true)) {
          this.crafting_timer = NaN
          this.progress = 0
          mgrs.signaler.signal("generalUpdate")
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
    ret.buffers = {out: this.buffers.out.serialize(), in: this.buffers.in.serialize() }
    ret.crafting_timer = this.crafting_timer
    ret.recipe = this.recipe?.name || ""

    return ret
  }
  clear_recipe() {
    this.inv.absorbFrom(this.buffers.in)
    this.inv.absorbFrom(this.buffers.out)
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
    if(this.recipe) this.clear_recipe()
    this.recipe = recipeObj
    this.crafting_time = recipeObj.crafting_speed / this.crafting_speed * TICKS_PER_SECOND
    recipeObj.ingredients.forEach((ing, idx) => {
      this.buffers.in.setFilter(idx, ing.name)
    })
    recipeObj.results.forEach((ing, idx) => {
      this.buffers.out.setFilter(idx, ing.name)
    })
    this.tags.push("ticking", "crafting")
  }
}
class LabEntity extends Entity {
  //technology is set elsewhere
  constructor(baseItem, inventory, tagArray) {
    super(baseItem, inventory, tagArray, "lab")
    this.buffers.in = new Inventory(this.inputs.length, this.buffers.max_in)
    this.buffers.max_in = 5;
    this.inputs.forEach( (name, idx) => this.buffers.in.setFilter(idx, name))
    this.research_timer = NaN
  }
  deserialize(data) {
    Object.assign(this, data)
  }
  serialize() {
    let ret = {}
    ret.name = this.name
    ret.type = "lab"
    ret.buffers = { in: this.buffers.in.serialize()}
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
    this.tags.push("ticking", "lab")
  }
  tick(tickData) {
    if(tickData.ticks%30==0) {
      InvXFer(tickData.fromParent.feed, this.buffers.in)
    }
    if(!mgrs.tech.researching) return
    if(!Number.isNaN(this.research_timer) && this.research_timer<16) this.research_timer++
    if (this.research_timer%16==0) {
      mgrs.tech.increment_research()
      this.research_timer = NaN
    }
    if(Number.isNaN(this.research_timer)) {
      this.nextUnit(mgrs.tech.nextIngredients)
    }
  }
  nextUnit(ings) {
    if(!ings) return
    let canConsume = ings.every( ([name, qty]) => { return this.buffers.in.total(name) >= qty } )
    if(!canConsume) { this.tags.delete("ticking"); return }
    ings.forEach( ([name, qty]) => this.buffers.in.consume(name, qty))
    this.research_timer = 0
    this.tags.push("ticking", "lab")
  }

}

export class EntityStorage {
  entities = []
  entityTags = new KVSMap()
  constructor(facBlock, restricted = false) {
    this.mgr = mgrs.entity
    this.parent = facBlock.parent || facBlock
    this.restricted = restricted
  }
  [Symbol.iterator]() { return this.entities }
  deserialize(saveEntities) {
    let next = null
    for (let each of saveEntities) {
      next = this.mgr.RestoreEntity(each, this.parent.inv, this.entityTags, mgrs)
      next.parent = this.parent
      this.entities.push(next)
    }    
  }
  serialize() {
    let ret = []
    for (let idx in this.entities) {
      ret[idx] = this.entities[idx].serialize()
    }
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
    if(this.restricted && this.mgr.EntityType(name)!=this.restricted.type) return

    let new_e = this.mgr.GenerateEntity(name, this.parent.inv, this.entityTags)
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
      this.entityTags.getSetValues("ticking", type).forEach(
        (entity) => {
          entity.tick(tickData)
        }
      )
    }
    //console.log('%ces tick end', "color: blue")
  }
}
