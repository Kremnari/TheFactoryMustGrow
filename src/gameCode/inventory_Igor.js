


//! I don't think these will work under all circumstances,
// I need a way to define a start index 

//* max contains the max stack size for the item
// if it's falsy, then we'll assume we are consuming
function findIndex(items, name, max) {
    if(max) {
      let idx = -1
      let mode = 4
      for (let [curr, item] of items.entries()) {
        if(mode>3 && !item) { mode = 3; idx = curr; }
        if(mode>2 && item && item.count == 0) { mode = 2; idx = curr; }
        if(mode>1 && item && item.name == name && item.count < max) { mode = 1; idx = curr; }
      }
      if(mode==2) { items[idx].name = name; items[idx].icon = null; }
      return idx
    } else {
      let idx = items.slice().reverse().findIndex( (elm) => { return elm && elm.name == name && elm.count > 0 })
      return idx==-1 ? -1 : items.length-1-idx
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
      let idx = findIndex(inv.items, each.name, maxStack)
      while(idx>-1 && addTotal>0) {
        //console.log("toadd: "+addTotal+" of "+each.name)
        let toAdd = Math.min(maxStack-inv.items[idx].count, addTotal)
        addTotal -= toAdd
        inv.items[idx].count += toAdd
        idx = findIndex(inv.items, each.name, maxStack)
      }
      if(addTotal>0) {
        //TODO: Need to track inventory size
        //! Theoretically, this would be the case of all existing inventory
        //!   is different than the item or full
        if(!inv.maxStacks || inv.items.length<inv.maxStacks) {
          inv.items.push({name: each.name, count: addTotal})
        } else {
          Igor.graphics.error("Inventory Full")
        }
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
      let idx = findIndex(inv.items, each.name)
      let consumeTotal = each.count*(args.multi || 1)
      while(idx>-1 && consumeTotal) {
        let toSub = Math.min(inv.items[idx].count, consumeTotal)
        inv.items[idx].count -= toSub
        consumeTotal -= toSub
        idx = findIndex(inv.items, each.name)
      }
      part.push({name: each.name, count: each.count*(args.multi||1)-consumeTotal})
      if(consumeTotal) {
        //! we have failed to consume all
        //console.log("re-adding: ")
        //console.log(part)
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
  function calcTotal(itemStacks, args, returnObj, Igor) {
    if(args.name) {
      returnObj.count = 0
      for(let each of itemStacks) {
        if(each.name==args.name) returnObj.count += each.count
      }
      returnObj._result = returnObj.count
    } else if(args.names) {
      for(let each of itemStacks) {
        if(args.names.indexOf(each.name)>-1) returnObj[each.name] ? (returnObj[each.name] += each.count) : (returnObj[each.name] = each.count)
      }
    }
  }
  
  import {IgorUtils as IgorJs} from "IgorJs/main"
  IgorJs.addOperation("inventory.add", AddAll)
  IgorJs.addOperation("inventory.consume", ConsumeAll)
  IgorJs.addOperation("inventory.total", calcTotal)
  IgorJs.addUtility_CCC("inventory.total", calcTotal)
  