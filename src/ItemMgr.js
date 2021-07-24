import {mgrs} from 'managers'
import {InvXFer} from 'gameCode/Inventory'
import {CephlaCommConstructor as CCC} from 'CephlaComm/main'


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
  }
  serialize() {
    return { items: this.items, max_stack: this.max_stack }
  }
  static deserialize(save) {
    return new Inventory(save.items, save.max_stack)
  }
  deserialize(save) {
    this.items = save.items
    this.max_stack = save.max_stack
  }
  [Symbol.iterator]() { return this.items }
  when(itemStack, cb) {
    this.check = {itemStack, cb}
    this.check.sub = mgrs.Ticker.subscribe((t) => {this.whenTickCheck()})
  }
  whenTickCheck() {
    if(!this.check) return 
    //? It may not be performant to do this every tick
    // Then again... it should only be used on an "as need" (ie tutorial) basis
    if(this.total(this.check.itemStack.name)==this.check.itemStack.count) {
      mgrs.Ticker.dispose(this.check.sub)

      //SMELL - If I run the callback before undefining,
      //it will undefined the new criteria
      let temp = this.check.cb
      this.check = undefined
      temp()
    }
  }
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
  addAllOrFail(itemStacks) {
    //! assume itemStacks is array
    let added = []
    let retCount = 0
    let revert = false
    let toAdd
    for(let each of itemStacks) {
      toAdd = ItemStack.convert(each)
      retCount = this.add(toAdd.name, toAdd.count)
      if(retCount > 0) {
        revert = true
        toAdd.count -= retCount
        added.push(toAdd)
        break
      } else {
        added.push(toAdd)
      }
    }
    if(revert) {
      for(let each of added) {
        this.consume(each.name, each.count)
      }
      return false
    }
    return true
  }
  consumeAll(itemStacks, revertOnFailFast = true, multi = 1.0) {
    if(!Array.isArray(itemStacks)) itemStacks = [itemStacks]
    let consumed = []
    let retCount = 0
    for (let IS of itemStacks) {
      let each = ItemStack.convert(IS)
      retCount = this.consume(each.name, each.count*multi )
      if(retCount===0) consumed.push(each)
      else if(revertOnFailFast) {
        consumed.length>=1 && this.addAll(consumed, false, multi)
        this.add(each.name, each.count-retCount)
        return itemStacks
      }
    }
    return revertOnFailFast ? true : []
  }
  absorbFrom(inv, specific) {
    for(let i of inv.items) {
      if(!i) continue 
      let rest
      if(specific && i.name!=specific) continue
      if(i.count==0) continue
      rest = this.add(i.name, i.count)
      inv.consume(i.name, i.count-rest)
    }
    mgrs.signaler.signal("generalUpdate")
  }
  setFilter(where, what, actor = mgrs.baseApp.player) {
    if(where>this.items.length) return false
    let filterStack = new ItemStack(what, 0, true)

    if(!this.items[where]) {
      this.items.splice(where, 1, filterStack)
    } else if(this.items[where].name==what) {
      this.items[where].filtered = true
    } else {
      let consumed = this.items[where]
      this.items.splice(where, 1, filterStack)
      actor.inv.addAll(consumed, false)
    }
    return true
  }
  addFilter(what, actor = mgrs.baseApp.player) {
    for(const [idx, i] of this.items.entries()) {
      if(!i) {
        this.items.splice(idx, 1, new ItemStack(what, 0, true))
        return true
      }
      if(!i.filtered && (i.name==what || !i.name)) {
        i.filtered = true
        i.name = what
        return true
      }
    }
    return false
  }
  seeFilteredItems() {
    let out = []
    this.items.forEach((i) => i.filtered && out.push(i.name))
    return out
  }
  removeFilter(what, clear, actor= mgrs.baseApp.player) {
    for( let i of this.items) {
      if(i.filtered && i.name==what) {
        i.filtered = false
        clear && actor.inv.addAll(i)
        if(i.count==0) i.name = undefined
        return true
      }
    }
    return false
  }
  getTypes(includeEmpty = true) {
    let ret = []
    for(let i of this.items) {
      if(i && !ret.includes(i.name)) {
        if(includeEmpty || (!includeEmpty && i.count>0))
            ret.push(i.name)
      }
    }
    return ret
  }
  total(item, log = false) {
    return this.items.reduce( (acc, curr) => { return curr && curr.name == item ? acc+curr.count : acc }, 0)
  }
  addStack(is) {
    if(is.count==0) return 0
    return is.count-this.add(is.name, is.count)
  }
  add(item, count) { //will ALWAYS returns unadded portion
    if(count==0) return
    let maxStack = this.max_stack || mgrs.item.get(item).stack_size
    let targ = this._GetAddStack(item, maxStack)
    if(!targ) {
      return count
    }
    let toAdd = Math.min(maxStack - targ.count, count)
    targ.count+=toAdd
    if(count-toAdd>0) return this.add(item, count-toAdd)
    else return 0
  }
  consume(item, count) { //will ALWAYS return unconsumed portion
    let targ = this._GetSubStack(item, false) //By_elm
    if(!targ) return count
    if(targ.count>=count) {
      targ.count-=count
      return 0
    } else {
      count -= targ.count
      targ.count = 0
      return this.consume(item, count)
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
    let idx = this.items.length-1 - this.items.slice().reverse().findIndex( (elm) => { return elm && elm.name == item && elm.count>0 })
    return returnIdx ? idx : this.items[idx]
  }
  click(data) {
    switch(data.what) {
      case "use":
        let item = data.which.item || mgrs.item.get(data.which.name)
        if(data.which.count>0) {
          if(item.hasEntity) {
            data.where.useItem(data.which.name) && data.which.count--
            mgrs.signaler.signal('addedEntity')
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


//! I don't think these will work under all circumstances,
// I need a way to define a start index 

//* max contains the max stack size for the item
// if it's falsy, then we'll assume we are consuming
function findIndex(inv, name, max) {
  if(max) {
    let idx = -1
    let mode = 4
    for (let [curr, item] of inv.items.entries()) {
      if(mode>3 && !item) { mode = 3; idx = curr; }
      if(mode>2 && item && item.count == 0) { mode = 2; idx = curr; }
      if(mode>1 && item && item.name == name && item.count < max) { mode = 1; idx = curr; }
    }
    if(mode==2) item.name = name
    return idx
  } else {
    let idx = inv.items.slice().reverse().findIndex( (elm) => { return elm && elm.name == name && elm.count > 0 })
    return idx==-1 ? -1 : inv.items.length-1-idx
  }
}
function AddAll(inv, args, returnObj, Igor) {
  //! needs to handle a multiplier from args
  let itemStacks = args.itemStacks
  if(!Array.isArray(itemStacks)) itemStacks = [itemStacks]
  let part = []
  let maxStack = 0
  for (let each of itemStacks) {
    if(!each.count && each.amount) each.count = each.amount //TEMP data set is not upto snuff..
    if(each.count==0) continue
    let addTotal = each.count*(args.multi||1) //Aurelia is inf looping the getters and setters without this temp
    maxStack = Igor.data.item[each.name].stack_size
    let idx = findIndex(inv, each.name, maxStack)
    while(idx>-1 && addTotal>0) {
      //console.log("toadd: "+addTotal+" of "+each.name)
      let toAdd = Math.min(maxStack-inv.items[idx].count, addTotal)
      addTotal -= toAdd
      inv.items[idx].count += toAdd
      idx = findIndex(inv, each.name, maxStack)
    }
    if(addTotal>0) {
      //TODO: Need to track inventory size
      //! Theoretically, this would be the case of all existing inventory
      //!   is different than the item or full
      inv.items.push({name: each.name, count: addTotal})
    }
  }
  //TODO: handle failures and preferences
  returnObj.part = part
}
//args.itemStacks: should be an array of ItemStacks
//args.test: should be a bool, indicating whether it's checking totals
//args.multi: int, used to indicate a multiplier to the itemstacks (easily apply the Rounder)
function ConsumeAll(inv, args, returnObj, Igor) {
  //* Incomplete
  let itemStacks = args.itemStacks
  if(!Array.isArray(itemStacks)) itemStacks = [itemStacks]
  let part = []
  for (let each of itemStacks) {
    if(!each.count && each.amount) each.count = each.amount //TEMP data set is not upto snuff..
    let idx = findIndex(inv, each.name)
    let consumeTotal = each.count*(args.multi || 1)
    while(idx>-1 && consumeTotal) {
      let toSub = Math.min(inv.items[idx].count, consumeTotal)
      inv.items[idx].count -= toSub
      consumeTotal -= toSub
      idx = findIndex(inv, each.name)
    }
    part.push({name: each.name, count: each.count*(args.multi||1)-consumeTotal})
    if(consumeTotal) {
      //! we have failed to consume all
      console.log("readding: ")
      console.log(part)
      Igor.processTEMP(inv, "inventory.add", {itemStacks: part})
      returnObj._result = false
      return returnObj
    }
  }
  returnObj._result = true 
}
//args.names = array of strings
// --or-- args.name = string
// 
function calcTotal(inv, args, returnObj, Igor) {
  if(args.name) {
    returnObj.count = 0
    for(let each of inv) {
      if(each.name==args.name) returnObj.count += each.count
    }
  } else if(args.names) {
    for(let each of inv) {
      if(args.names.indexOf(each.name)>-1) returnObj[each.name] ? (returnObj[each.name] += each.count) : (returnObj[each.name] = each.count)
    }
  }
}

import {IgorUtils as IgorJs} from "IgorJs/main"
IgorJs.addOperation("inventory.add", AddAll)
IgorJs.addOperation("inventory.consume", ConsumeAll)
IgorJs.addOperation("inventory.total", calcTotal)
