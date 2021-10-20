


//! I don't think these will work under all circumstances,
// I need a way to define a start index 

//* max contains the max stack size for the item
// if it's falsy, then we'll assume we are consuming
function findIndex(items, name, max, start) {
  if(max) {
    let idx = -1
    let mode = 4
    let item
    for( let i = start || 0; i< items.length; i++ ) {
      item = items[i]
      if(mode>3 && !item) { mode = 3; idx = i; }
      if(mode>2 && item && item.count == 0) { mode = 2; idx = i; }
      if(mode>1 && item && item.name == name) { mode = 1; idx = i; }
    }
    if(mode==2) { items[idx].icon = null; }
    return idx
  } else {
    let idx = items.slice().reverse().findIndex( (elm) => { return elm && elm.name == name && elm.count > 0 })
    return idx==-1 ? -1 : items.length-1-idx
  }
}
//args.stackLimit - basically how many times we can search for a stack
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
    maxStack = inv.stackSize || Igor.data.item[each.name].stack_size
    args.force && (maxStack*=2)
    let idx = findIndex(inv.items, each.name, maxStack)
    let found = 0
    let toAdd
    while(!(args.stackLimit && found>=args.stackLimit) && idx>-1 && addTotal>0) {
      //console.log("toadd: "+addTotal+" of "+each.name)
      if(typeof inv.items[idx]==='undefined') {
        //console.log('undef')
        toAdd = Math.min(maxStack, addTotal)
        inv.items[idx] = {name: each.name, count: toAdd}
        addTotal -= toAdd
      } else if(inv.items[idx].restricted && inv.items[idx].name!=each.name) {
        //Skip
        //console.log('restricted')
      } else {
        toAdd = Math.min(maxStack-inv.items[idx].count, addTotal)
        addTotal -= toAdd
        inv.items[idx].name = each.name
        inv.items[idx].count += toAdd
        if(toAdd===0) found++
      }
      if(addTotal) idx = findIndex(inv.items, each.name, maxStack, idx+1)
    }
    if(idx==-1
      && (!inv.maxStacks || inv.items.length<inv.maxStacks)
      && !(args.stackLimit && found>=args.stackLimit)
    ) {
      inv.items.push({name: each.name, count: addTotal})
      addTotal = 0
    } 
    if(addTotal>0) {
      //TODO: Need to track inventory size
      //! Theoretically, this would be the case of all existing inventory
      //!   is different than the item or full
      if(args.stackLimit) {
        part.push({name: each.name, count: each.count-addTotal})
      } else {
        part.push({name: each.name, count: addTotal})
        //Igor.graphics.error("Inventory Full")
      }
    }
  }
  //TODO: handle failures and preferences
  returnObj.part = part
  returnObj.complete = part.length==0
}
//args.itemStacks: should be an array of ItemStacks
//args.multi: int, used to indicate a multiplier to the itemstacks (easily apply the Rounder)
//args.partial: bool, used to consume whatever is available, and return consumed part
//! This performs multiple loops, could be optimized later
function ConsumeAll(inv, args, returnObj, Igor) {
  //* Incomplete
  let itemStacks = args.itemStacks
  if(!Array.isArray(itemStacks)) itemStacks = [itemStacks]
  let part = []
  let atMulti = args.multi || 1
  //Reduce multi by available items
  if(atMulti>1) {
    //console.log('multi: '+atMulti)
    atMulti = itemStacks.reduce((accum_multi, x) => {
      if(accum_multi==-1) return -1
      let avail = Igor.processTEMP(inv, "inventory.total", {name:x.name})
      return avail<x.count ? -1 : Math.min(accum_multi, Math.floor(avail/x.count))
    }, atMulti)
    //console.log('atMulti: '+atMulti)
    if(atMulti<1 && !args.partial) {
      returnObj._result = false
      return
    }
  }
  //Perform consumes
  for (let each of itemStacks) {
    if(!each.count && each.amount) each.count = each.amount //TEMP data set is not upto snuff..
    let idx = findIndex(inv.items, each.name)
    let consumeTotal = each.count*atMulti
    while(idx>-1 && consumeTotal) {
      let toSub = Math.min(inv.items[idx].count, consumeTotal)
      inv.items[idx].count -= toSub
      consumeTotal -= toSub
      idx = findIndex(inv.items, each.name)
    }
    part.push({name: each.name, count: each.count*atMulti-consumeTotal})
    if(consumeTotal && !args.partial) {
      //! we have failed to consume all
      //console.log("re-adding: ")
      //console.log(part)
      Igor.processTEMP(inv, "inventory.add", {itemStacks: part})
      returnObj._result = false
      return returnObj
    }
  }
  returnObj._result = (args.partial && part) || atMulti || true
}
//args.names = array of strings
// --or-- args.name = string
// 
function calcTotal(itemStacks, args, returnObj, Igor) {
  if(typeof itemStacks == 'string' && itemStacks.includes('id')) {
    itemStacks = Igor.getId(itemStacks).items
  }
  if(itemStacks.items) itemStacks = itemStacks.items
  if(itemStacks==="undefined") debugger

  if(args.name) {
    returnObj._result = 0
    for(let each of itemStacks) {
      if(each && each.name==args.name) returnObj._result += each.count
    }
  } else if(args.names) {
    for(let each of itemStacks) {
      if(each && args.names.indexOf(each.name)>-1) {
        !returnObj[each.name] && (returnObj[each.name] = 0)
        returnObj[each.name] += each.count
      }
    }
  }
}

import {IgorUtils as IgorJs} from "IgorJs/main"
IgorJs.addOperation("inventory.add", AddAll)
IgorJs.addOperation("inventory.consume", ConsumeAll)
IgorJs.addOperation("inventory.total", calcTotal)
IgorJs.CCC_addUtility("inventory.total", calcTotal)
