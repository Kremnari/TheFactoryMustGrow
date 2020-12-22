import {TagMapProxy} from "./resources/types/TagsProxy"
import KVSMap from "./resources/types/KVSMap"
import {ItemStack, Inventory} from "./ItemMgr"
import {mgrs} from 'managers'

export class EntityMgr {
  entities_base = {}
  //entity_types = {"assembling-machine": {$total: {qty:0}}, "furnace": {$total: {qty:0}}, "mining-drill": {$total: {qty:0}}, "lab": {$total: {qty:0}}} 
  //entity_types = {"mining": [], "crafting": [], "lab": []}
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
  set_player(who) {
    this.player = who
  }
  upgrade(obj) {
    //consume upgrade ingredients from inventory
      if(obj.type=="buffers") {
        if(this.player.inv.consumeAll([new ItemStack("iron-chest", 2)], true).length==0) {
          obj.who.buffers[obj.dir].max += 10
        } else {
          console.log('not enough...awesome')
        }
      } else if(obj.type=="autoload") {
        if(this.player.inv.consumeAll([new ItemStack("burner-inserter", 1)], true).length==0) {
          obj.who.buffers[obj.dir].xfer.count++
        } else {
          console.log('not enough...awesome')
        }
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
    ret.buffers = this.buffers
    ret.mining_timer = this.mining_timer
    return ret
  }
  tick(tickNum) {
    /*
    let xfer = this.buffers.out.xfer
    if(xfer.count>0) {
      if(++xfer.timer==xfer.ticks) {
        this.collectBuffer(this, xfer.count)
        xfer.timer = 0
      }
    }
    */
    if (!this.mining || this.buffers.out.total(this.mining.mining_results) == this.buffers.max_out) return
    if (++this.mining_timer%16 == 0) {
      this.buffers.out.add(this.mining.mining_results, 1)
      this.mining_timer = 0
      mgrs.signaler.signal("generalUpdate")
    }
 }
  set_mining(resObj, timer) {
    this.mining && this.collectBuffer() 
    if (resObj!=this.mining) {
      this.mining = null
      window.setTimeout( () => {
        this.mining = resObj
        this.mining_time = resObj.mining_time / this.mining_speed * 100
        this.mining_timer = timer || 0
      }, 0)
      this.tags.push("ticking", "mining")
    } else {
      this.mining = null
      this.tags.delete("ticking")
    }
  }
  collectBuffer(actor = this, count= this.buffers.out.total(this.mining.mining_results)) {
    //if (this.buffers.out.qty == 0 ) return
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
  tick(tickNum) {
    /*
    let xfer = this.buffers.in.xfer
    if(xfer.count>0) {
      if(++xfer.timer==xfer.ticks) {
        this.consumeIngs()
        xfer.timer = 0
      }
    }
    xfer = this.buffers.out.xfer
    if(xfer.count>0) {
      if(++xfer.timer==xfer.ticks) {
        this.collectBuffer(this, xfer.count)
        xfer.timer = 0
      }
    }
    */
    if(!Number.isNaN(this.crafting_timer) && this.crafting_timer<16) this.crafting_timer++
    if (this.crafting_timer%16 == 0) {
      if(this.buffers.out.addAll(this.recipe.results, true)) {
        this.crafting_timer = NaN
        mgrs.signaler.signal("generalUpdate")
      }
    }
    if(Number.isNaN(this.crafting_timer)) {
      let cond = this.buffers.in.consumeAll(this.recipe.ingredients)
      if(cond===true) {
        this.crafting_timer = 0
      } else {
        this.tags.delete("ticking")
      }
    }
  }
  deserialize(data) {
    debugger
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
    //if(this.tickSub) this.ticker.dispose(this.tickSub)
    //this.tickSub = null
    this.inv.absorbFrom(this.buffers.in)
    this.inv.absorbFrom(this.buffers.out)
    this.tags.delete("ticking")
    this.recipe = null
  }
  consumeFrom(inv, IS) {
    let toAdd = mgrs.rounder.calc(this.buffers.in.total(IS.name), this.buffers.max_in, inv.total(IS.name))
    //let toAdd = mgrs.rounder.calc(inv.total(IS.name), inv.max_in, this.total(IS.name))
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
    //this.tickSub = this.ticker.subscribe(() => {this.tick()}, 10)
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
    ret.buffers = this.buffers
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
    //this.itemMgr.itemList[name].count -= toAdd
    this.buffers.in.add(name, toAdd)
    this.tags.push("ticking", "lab")
  }
  tick(tickData) {
    /*let xfer = this.buffers.in.xfer
    if(xfer.count>0) {
      if(++xfer.timer==xfer.ticks) {
        let room = NaN
        for (let potion of this.inputs) {
          room = this.buffers.in.max - this.buffers.in[potion].qty 
          if(room>0) this.inv.consume(potion, Math.min(xfer.count, room))
        }
        xfer.timer = 0
      }
    }*/
    if(!tickData.mgrs.tech.researching) return
    if(Number.isNaN(this.research_timer)) this.nextUnit(tickData.mgrs.tech.nextIngredients)
    else this.research_timer++
    if (this.research_timer%16==0) {
      tickData.mgrs.tech.increment_research()
      this.research_timer = NaN
    }
  }
  nextUnit(ings) {
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
  constructor(facBlock) {
    this.mgr = mgrs.entity
    this.parent = facBlock.parent || facBlock
    mgrs.Ticker.subscribe( (obj) => { this.tick(obj) } )
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
  AddEntity(name) {
    let new_e = this.mgr.GenerateEntity(name, this.parent.inv, this.entityTags)
    new_e.parent = this.parent
    this.entities.push(new_e)
    return true
  }
  tick(tickData, inv) {
    let which = tickData.entities.types
    for (let type of which) {
      this.entityTags.getSetValues("ticking", type).forEach( (entity) => { entity.tick(tickData, inv) })
    }
  }
}
