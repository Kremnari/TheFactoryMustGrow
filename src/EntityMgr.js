import {TagMapProxy} from "./resources/types/TagsProxy"
import KVSMap from "./resources/types/KVSMap"
import {ItemStack, Inventory} from "./ItemMgr"
import {mgrs} from 'managers'

export class EntityMgr {
  entities_base = {}
  entity_cats = []
  constructor() {}
  import(entityData, mgrs) {
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
    //TODO ugly implementation of actor acquisition
    //TODO ugly implementation of defining upgrade period
    //consume upgrade ingredients from inventory
      if(obj.type=="buffers") {
        let consumed = mgrs.baseApp.player.inv.consumeAll([new ItemStack("iron-chest", 2)], true)
        if(consumed) {
          obj.who.buffers["max_"+obj.dir] += 10
        } else {
          console.log('not enough...awesome')
        }
      } else if(obj.type=="autoload") {
/*        if(mgrs.baseApp.player.inv.consumeAll([new ItemStack("burner-inserter", 1)], true).length==0) {
          obj.who.buffers[obj.dir].xfer.count++
        } else {
          console.log('not enough...awesome')
        }*/
      }
  }
  craftingCats(entityStr) {
    return this.entities_base[entityStr].crafting_categories
  }
}
class Entity {
  buffers = { out: undefined, in: undefined }
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
  tick(tickData) {
    if(tickData.ticks%30==0) {
      //console.log("xfer to outputline")
      tickData.fromParent.drain.absorbFrom(this.buffers.out)
    }
    if (!this.mining || this.buffers.out.total(this.mining.mining_results) == this.buffers.max_out) return
    if (++this.mining_timer%this.mining_time == 0) {
      this.buffers.out.add(this.mining.mining_results, 1)
      console.log('adding one mined')
      this.mining_timer = 0
      mgrs.signaler.signal("generalUpdate")
    }
    this.progress = this.mining_timer/this.mining_time*100
 }
  set_mining(resObj, timer) {
    this.mining && this.collectBuffer() 
    if (resObj!=this.mining) {
      this.mining = null
      this.mining = resObj
      this.mining_time = resObj.mining_time / this.mining_speed * 100
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
  }
}
class CraftingEntity extends Entity {
  recipe = null
  constructor(baseItem, inventory, tagArray) {
    super(baseItem, inventory, tagArray, "crafting")
    this.buffers.in = new Inventory(5)
    this.buffers.max_in = 5
    this.buffers.out = new Inventory(5)
    this.buffers.max_out = 5;
    this.crafting_timer = NaN
  }
  tick(tickData) {
    if(tickData.ticks%30==0) {
      tickData.fromParent.drain.absorbFrom(this.buffers.out)
      //console.log("buffer in absorb")
      //this.buffers.in.absorbFrom(tickData.fromParent.feed)
      // *Improve
      //if(this.buffers.in.total(this.recipe.ingredients[0].name)) this.tags.push('ticking', 'crafting')
    }
    if(Number.isNaN(this.crafting_timer)) {
      if(this.buffers.in.consumeAll(this.recipe.ingredients)===true) {
        this.crafting_timer = 0
      }
    } else {
      if (++this.crafting_timer%this.crafting_time == 0) {
        if(this.buffers.out.addAll(this.recipe.results, true)) {
          this.crafting_timer = NaN
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
    this.crafting_time = recipeObj.crafting_speed / this.crafting_speed * 100
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
  addPotion(name, rounder) {
    if(!this.canAdd(name)) return

    let toAdd = rounder.calc(this.buffers.in.total(name), this.buffers.max_in, this.inv.total(name))
    toAdd -= this.inv.consume(name, toAdd) //returns unconsumed
    this.buffers.in.add(name, toAdd)
    this.tags.push("ticking", "lab")
  }
  tick(tickData) {
    if(tickData.ticks%30==0) {
      this.buffers.in(tickData.fromParent.feed)
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
  deserialize(saveEntities, mgrs) {
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
          this.restricted.feed.addFilter(each.name)
        }
      }
      if(this.restricted.type=="mining") {
        this.restricted.drain.removeFilter(this.setFn.mining_results, true)
      } 
    }

    this.setFn = doing
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
      //console.log(this.setFn)
      let done = this.restricted.drain.addFilter(this.setFn.mining_results)
      //console.log("set filter: "+done)
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
  recieveItem(itemStack, from) {
    console.log(itemStack)
    let whole = Math.floor(itemStack.count/this.entities.length)
    let parts = itemStack.count % this.entities.length
    let accum = 0
    let SplitRounder = () => {
      let add = whole
      parts>0 && add++ && parts--
      accum -= add
      console.log('adding: '+add)
      return add
    }
    let toAdd
    let unconsumed
    for(let each of this.entities) {
      toAdd = SplitRounder()
      unconsumed = each.buffers.in.add(itemStack.name, toAdd)
      console.log(toAdd+" : "+unconsumed)
      from.consume(itemStack.name, toAdd-unconsumed)
    }
    return itemStack.count - accum
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
