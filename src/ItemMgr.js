import {EventAggregator} from 'aurelia-event-aggregator'

export default class ItemMgr {
  itemList = {}
  import(itemList) {
    Object.entries(itemList).forEach( ([name, item]) => {
      let toAdd = new Item(item)
      this.itemList[name] = toAdd
    })
  }
  get(item) {
    return this.itemList[item]
  }
  incrementX(itemName) {
    return ++this.itemList[itemName].count
  }
  addNotifyX(ingName, recName) {
    this.itemList[ingName]?.notifys.push(recName)
  }
}


class Item {
  isVisible = false
  isCraftable = false
  entity = false
  notifys = []
  set_count_callbacks = ["ItemNotifys"]
  constructor(itemBase, evtAgg) {
    Object.assign(this, itemBase)
    /*Object.defineProperty(this, 'count', {
      get() {
        return this.__count
      },
      set(val) {
        this.__count = val
        this.set_count_callbacks.forEach( (func) => { this[func]?.() })
        return true
      }
    })
    this.count = 0
    */
  }
  /*set_hasEntity() {
    console.error("SET HAS ENTITY WAS CALLED")
    let idx = this.set_count_callbacks.push("EntityUpdates") -1 //damn 0 idx
    this.hasEntity = true

    this.EntityUpdates = () => {
      //HACK
      tfmg.entityMgr.EntityAvailable(this.name)
      delete this.set_count_callbacks[idx]
      delete this.EntityUpdates
    }
  }*/
  ItemNotifysX() {
    this.notifys.forEach( (recipe) => {
      recipe.ingCheck(this.name, this.__count)
    })
  }
}

export class ItemStack {
  constructor(item, count) {
    if(typeof item == "string") this.name = item
    if(typeof item == "Object") { this.name = item.name; this.item = item }
    this.count = count
  }
  static convert(fromRec) {
    if(fromRec.count) return fromRec
    return new ItemStack(fromRec.name || fromRec.item, fromRec.amount)
  }
}

export class Inventory {
  constructor(mgrs, from = 0) {
    this.items = Array.isArray(from) ? from : new Array(from) 
    this.itemMgr = mgrs.item // ?? is needed? ... just for stacksizes?
    this.recMgr = mgrs.rec
    this.signaler = mgrs.signaler
  }
  serialize() {
    return this.items
  }
  deserialize(save) {
    this.items = save
  }
  [Symbol.iterator]() { return this.items }
  addAll(itemStacks, returnPartial = true, multi = 1.0) {
    let part = []
    let retCount = 0
    for (let each of itemStacks) {
      retCount = this.add((each.item || each.name), (each.amount || each.count) * multi) //HACK
      if(retCount > 0) part.push(new ItemStack(each.name || each.item, retCount))
    }
    if (returnPartial) return part
  }
  consumeAll(itemStacks, revertOnFailFast = true, multi = 1.0) {
    let consumed = []
    let retCount = 0
    for (let IS of itemStacks) {
      let each = ItemStack.convert(IS)
      retCount = this.consume(each.item || each.name, (each.count || each.amount)*multi )
      if(retCount==0) consumed.push(each)
      else if(revertOnFailFast) {
        consumed.length>=1 ? this.addAll(consumed, false, multi) : void
        this.add(each.item, each.count-retCount)
        consumed = null
        return itemStacks
      }
    }
    return []
  }
  total(item) {
    return this.items.reduce( (acc, curr) => { return curr && curr.name == item ? acc+curr.count : acc }, 0)
  }
  add(item, count) { //will ALWAY returns unadded portion
    if(count==0) return
    let maxStack = this.itemMgr.get(item).stack_size
    let targ = this._GetAddStack(item, maxStack)
    if(!targ) { return count }
    let toAdd = Math.min(maxStack - targ.count, count)
    targ.count+=toAdd
    if(count-toAdd>0) return this.add(item, count-toAdd)
    else return 0
  }
  consume(item, count) { //will ALWAYS return unconsumed portion
    let targIdx = this._GetSubStack(item, true) //By_Idx
    let targ = this.items[targIdx]
    if(!targ) return count
    targ.count -= count
    if (targ.count<0) {
      let left = targ.count*-1
      targ.count = 0
      this.items[targIdx] = undefined
      return this.consume(item, left)
    }
    if(targ.count==0) this.items[targIdx] = undefined
    return 0
  }
  
  _GetAddStack(item, maxStack) {
    let targ = -1
    let byName = (elm) => { return elm && elm.name == item && elm.count < maxStack }
    let byZeroStack = (elm) => { return elm && elm.count == 0 }
    let byEmpty = (elm) => { return !elm }

    for (let func of [byName, byZeroStack, byEmpty]) {
      targ = this.items.findIndex(func)
      if(targ>-1) {
        break
      }
    }
    if(targ>-1 && (!this.items[targ] || this.items[targ].name != item)) this.items.splice(targ, 1, {name: item, count: 0} )
    return this.items[targ]
  }
  _GetSubStack(item, returnIdx = true) {
    let idx = this.items.length-1 - this.items.slice().reverse().findIndex( (elm) => { return elm && elm.name == item })
    return returnIdx ? idx : this.items[idx]
  }
  click(data) {
    switch(data.what) {
      case "use":
        let item = data.which.item || this.itemMgr.get(data.which.name)
        if(data.which.count>0) {
          if(item.hasEntity) {
            data.which.count--
            data.where.entityStore.AddEntity(data.which.name, this)
            this.signaler.signal('addedEntity')
            return
          }
        }
        break;
      case "move":
        let count = data.rounder.val
        let unconsumed = data.where.inv.consume(data.which.name, count)
        let unaddable = data.who.inv.add(data.which.name, count-unconsumed)
        data.where.inv.add(data.which.name, unaddable)
        break;
    }
  }
}
