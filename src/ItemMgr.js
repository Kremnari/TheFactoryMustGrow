import {mgrs} from 'managers'

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
  }
}

export class ItemStack {
  constructor(item, count, filtered = false) {
    if(typeof item == "string") this.name = item
    if(typeof item == "Object") { this.name = item.name; this.item = item }
    this.count = count
    this.filtered = filtered
  }
  static convert(fromRec) {
    if(fromRec.count) return fromRec
    return new ItemStack(fromRec.name || fromRec.item, fromRec.amount)
  }
}

export class Inventory {
  constructor(from = 0, max_stack) {
    this.items = Array.isArray(from) ? from : new Array(from) 
    this.max_stack = max_stack
    this.itemMgr = mgrs.item // ?? is needed? ... just for stacksizes?
    this.recMgr = mgrs.rec
    this.signaler = mgrs.signaler
  }
  serialize() {
    return { items: this.items, max_stack: this.max_stack }
  }
  deserialize(save) {
    this.items = save.items
    this.max_stack = save.max_stack
    //debugger
  }
  [Symbol.iterator]() { return this.items }
  addAll(itemStacks, returnPartial = true, multi = 1.0) {
    if(!Array.isArray(itemStacks)) itemStacks = [itemStacks]
    let part = []
    let retCount = 0
    for (let each of itemStacks) {
      retCount = this.add((each.item || each.name), (each.amount || each.count) * multi) //HACK
      if(retCount > 0) part.push(new ItemStack(each.name || each.item, retCount))
    }
    if (returnPartial) return part
  }
  consumeAll(itemStacks, revertOnFailFast = true, multi = 1.0) {
    //console.log("start consume")
    //console.log(itemStacks)
    if(!Array.isArray(itemStacks)) itemStacks = [itemStacks]
    let consumed = []
    let retCount = 0
    for (let IS of itemStacks) {
      let each = ItemStack.convert(IS)
      //console.log(each)
      retCount = this.consume(each.name, each.count*multi )
      //console.log(retCount)
      if(retCount===true) consumed.push(each)
      else if(revertOnFailFast) {
        //console.log('reverting')
        consumed.length>=1 ? this.addAll(consumed, false, multi) : void
        this.add(each.item, each.count-retCount)
        consumed = null
        return itemStacks
      }
    }
    return revertOnFailFast ? true : []
  }
  absorbFrom(inv, specific) {
    for(let i of inv.items) {
      if(!i) return 
      let rest
      if(specific && i.name!=specific) continue
      rest = this.addAll(i)
      if(rest.length==0) {
        //console.log(i)
        inv.consumeAll(i)
      } else {
        //TODO finish for partial adds
        console.log("couldn't add all")
        console.log(rest)
      }
    }
    mgrs.signaler.signal("generalUpdate")
  }
  /*fill(inv, IS) {
    let toAdd = mgrs.rounder.calc(inv.total(IS.name), inv.max_in, this.total(IS.name))
    console.log(toAdd)
  }*/
  setFilter(where, what, actor = mgrs.baseApp.player) {
    if(where>this.items.length) return false
    let filterStack = new ItemStack(what, 0, true)

    if(!this.items[where]) {
      this.items[where] = filterStack
    } else if(this.items[where].name==what) {
      this.items[where].filtered = true
    } else {
      let consumed = this.items[where]
      this.items[where] = filterStack
      actor.inv.addAll(consumed, false)
    }
    mgrs.signaler.signal("generalUpdate")
    return true
  }
  removeFilter(where, what) {
    if(where>this.items.length
      || this.items[where].name!=what)
      return false
    this.items[where].filtered = false
    return true
  }
  total(item, log = false) {
    return this.items.reduce( (acc, curr) => { return curr && curr.name == item ? acc+curr.count : acc }, 0)
  }
  add(item, count) { //will ALWAYS returns unadded portion
    if(count==0) return
    let maxStack = this.max_stack || this.itemMgr.get(item).stack_size
    let targ = this._GetAddStack(item, maxStack)
    if(!targ) { return count }
    let toAdd = Math.min(maxStack - targ.count, count)
    targ.count+=toAdd
    if(count-toAdd>0) return this.add(item, count-toAdd)
    else return 0
  }
  consume(item, count) { //will ALWAYS return unconsumed portion
    //console.log("consuming")
    //console.log(item)
    //console.log(count)
    let targ = this._GetSubStack(item, false) //By_elm
    if(!targ) return count
    //targ.count -= count
    /*if (targ.count<0) {
      let left = targ.count*-1
      targ.count = 0
      !this.items[targIdx].filtered && (this.items[targIdx] = undefined)
      return this.add(item, left)
    }
    if(targ.count==0) !this.items[targIdx] && (this.items[targIdx] = undefined)
    */
    //console.log(targ.count)
    if(targ.count>=count) {
      targ.count-=count
      //console.log("found enough")
      return true
    }
    return false
  }  
  _GetAddStack(item, maxStack) {
    let targ = -1
    let byName = (elm) => { return elm && elm.name == item && elm.count < maxStack }
    let byZeroStack = (elm) => { return elm && elm.count == 0 }
    let byEmpty = (elm) => { return !elm }

    for (let func of [byName, byZeroStack, byEmpty]) {
      targ = this.items.findIndex(func)
      //? filter check appropriate?
      if(targ>-1 && (!this.items[targ]?.filtered || this.items[targ].name==item)) {
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
            data.where.useItem(data.which.name) && data.which.count--
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
      case "setFilter":
        break;
    }
  }
}
