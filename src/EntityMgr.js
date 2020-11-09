import {TagMapProxy} from "./resources/types/TagsProxy"
import KVSMap from "./resources/types/KVSMap"
import {ItemStack} from "./ItemMgr"

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
  GenerateEntity(name, parcel, tagArray) {
    let obj = this.entities_base[name]
    if (obj.resource_categories) {
      return new MiningEntity(obj, parcel, tagArray)
    }
    if (obj.crafting_categories) {
      return new CraftingEntity(obj, parcel, tagArray)
    }
    if (obj.inputs) {
      return new LabEntity(obj, parcel, tagArray)
    }
    return false //Entity not added
  }
  RestoreEntity(save, parcel, tagArray, mgrs) {
    let obj = this.entities_base[save.name]
    let ret = null
    if(save.type=="mining") {
      ret = new MiningEntity(obj, parcel, tagArray)
      if(save.mining!="") ret.set_mining(mgrs.res.resList[save.mining], save.mining_timer)
    } else if(save.type=="crafting") {
      ret = new CraftingEntity(obj, parcel, tagArray)
      if(save.recipe!="") ret.set_recipe(mgrs.rec.recipeList[save.recipe], save.crafting_timer)
    } else if(save.type=="lab") { 
      ret = new LabEntity(obj, parcel, tagArray)
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
}
class Entity {
  buffers = { out: {max: 5, qty: 0, xfer: {timer: 0, ticks: 30, count: 0} },
               in: {max: 5, qty: 0, xfer: {timer: 0, ticks: 30, count: 0} }
            }
  constructor(baseItem, inventory, tagArray, type = null) {
    Object.assign(this, baseItem)
    this.inv = inventory
    this.tags = TagMapProxy({to: tagArray, entity: this})
    if(type) this.tags.push("type", type)
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
  incrementBuffer() {
    this.buffers.out.qty++
    return this.buffers.out.qty == this.buffers.out.max
  }
  restoreBuffers(buffers) {
    this.buffers = buffers
  }
}
class MiningEntity extends Entity{
  mining = null
    constructor(baseItem, inventory, tagArray) {
    super(baseItem, inventory, tagArray, "mining")
    this.buffers.in = undefined
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
    let xfer = this.buffers.out.xfer
    if(xfer.count>0) {
      if(++xfer.timer==xfer.ticks) {
        this.collectBuffer(this, xfer.count)
        xfer.timer = 0
      }
    }
    if (!this.mining || this.buffers.out.qty == this.buffers.out.max) return
    if (++this.mining_timer%16 == 0) {
      this.buffers.out.qty++
      this.mining_timer = 0  
    }
 }
  set_mining(resObj, timer) {
    this.collectBuffer() 
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
  collectBuffer(actor = this, count=this.buffers.out.qty) {
    if (this.buffers.out.qty == 0 ) return
    this.buffers.out.qty -= count - actor.inv.add(this.mining.mining_results, count)
  }
}
class CraftingEntity extends Entity {
  recipe = null
  constructor(baseItem, inventory, tagArray) {
    super(baseItem, inventory, tagArray, "crafting")
  }
  tick(tickNum) {
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
   if(this.recipe && this.buffers.in.qty>0
        && this.buffers.out.qty < this.buffers.out.max) {
      this.crafting_timer++
      if (this.crafting_timer%16 == 0) {
        this.buffers.in.qty--
        this.buffers.out.qty++
        this.crafting_timer = 0
      }
    }
  }
  deserialize(data) {
    Object.assign(this, data)
  }
  serialize() {
    let ret = {}
    ret.name = this.name
    ret.type = "crafting"
    ret.buffers = this.buffers
    ret.crafting_timer = this.crafting_timer
    ret.recipe = this.recipe?.name || ""

    return ret
  }
  clear_recipe() {
    //if(this.tickSub) this.ticker.dispose(this.tickSub)
    //this.tickSub = null
    if (this.buffers.in.qty>0) {

      //process refunds
      for (let i=1; i<=this.buffers.in.qty; i++) {
        this.recipe.ingredients.forEach( (item) => {
          this.inv.add(item.name, item.amount)
          //this.itemMgr.itemList[item.name].amount += item.amount
        })
      }
    }
    this.collectBuffer()
    this.tags.delete("ticking")
    this.recipe = null
  }
  set_recipe(recipeObj, timer) {
    if(this.recipe) this.clear_recipe()
    this.recipe = recipeObj
    this.crafting_time = recipeObj.crafting_speed / this.crafting_speed * 100
    //this.tickSub = this.ticker.subscribe(()=> {this.tick()}, this.crafting_time/16)
    this.crafting_timer = timer || 0
    this.tags.push("ticking", "crafting")
  }
  get canConsumeIngs() {
    return true
     //return this.recipe && this.buffers.in.qty < this.buffers.in.max && this.recipe.recMgr.canProduce(this.recipe)
  }
  consumeIngs(rounder) {
    if(!this.recipe || this.buffers.in.qty == this.buffers.in.max) return
    let maxAdd = this.inv.recMgr.canProduceMax(this.recipe, this.inv)
    if (maxAdd == 0) return
    //let toAdd = rounder.calc_val(Math.min(maxAdd, this.buffers.in.max - this.buffers.in.qty))
    let toAddMulti = rounder?.calc(this.buffers.in.qty, this.buffers.in.max, maxAdd) || 1
    this.inv.consumeAll(this.recipe.ingredients, true, toAddMulti)
    //this.recipe.recMgr.consumeIngs(this.recipe, toAdd)
    this.buffers.in.qty += toAddMulti
  }
  collectBuffer(actor=this, count = this.buffers.out.qty) {
    //BUG Ahhh...
    let partial = actor.inv.addAll(this.recipe.results, true, count)
    this.buffers.out.qty = 0 //This is a hold over because of potential multiple outputs in recipes
  }
}
class LabEntity extends Entity {
  //technology is set elsewhere
  constructor(baseItem, inventory, tagArray) {
    super(baseItem, inventory, tagArray, "lab")
    //this.tickSub = this.ticker.subscribe(() => {this.tick()}, 10)
    this.buffers.in = {max: 10, xfer: {timer: 0, ticks: 30, count: 0}}
    this.buffers.out = undefined
    this.inputs.forEach( (name) => this.buffers.in[name] = {qty: 0})
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
    if(this.buffers.in[name].qty == this.buffers.in.max) return false
    return true
  }
  addPotion(name, rounder) {
    if(!this.canAdd(name)) return

    let toAdd = rounder.calc(this.buffers.in[name].qty, this.buffers.in.max, this.inv.total(name))
    toAdd -= this.inv.consume(name, toAdd) //returns unconsumed
    //this.itemMgr.itemList[name].count -= toAdd
    this.buffers.in[name].qty += toAdd
    this.tags.push("ticking", "lab")
  }
  tick(tickData) {
    let xfer = this.buffers.in.xfer
    if(xfer.count>0) {
      if(++xfer.timer==xfer.ticks) {
        let room = NaN
        for (let potion of this.inputs) {
          room = this.buffers.in.max - this.buffers.in[potion].qty 
          if(room>0) this.inv.consume(potion, Math.min(xfer.count, room))
        }
        xfer.timer = 0
      }
    }
    if(!tickData.mgrs.tech.researching) return
    if(Number.isNaN(this.research_timer)) this.nextUnit(tickData.mgrs.tech.nextIngredients)
    this.research_timer++
    if (this.research_timer%16==0) {
      tickData.mgrs.tech.increment_research()
      this.research_timer = NaN
    }
  }
  nextUnit(ings) {
    let canConsume = ings.every( ([name, qty]) => { return this.buffers.in[name].qty >= qty } )
    if(!canConsume) { this.tags.delete("ticking"); return }
    ings.forEach( ([name, qty]) => this.buffers.in[name].qty -= qty)
    this.research_timer = 0
    this.tags.push("ticking", "lab")
  }

}

export class EntityStorage {
  entities = []
  entityTags = new KVSMap()
  constructor(em, facBlock, Ticker) {
    this.mgr = em
    this.parent = facBlock
    Ticker.subscribe( (obj) => { this.tick(obj) } )
  }
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
  }
  tick(tickData, inv) {
    let which = tickData.entities.types
    for (let type of which) {
      this.entityTags.getSetValues("ticking", type).forEach( (entity) => { entity.tick(tickData, inv) })
    }
  }
}
