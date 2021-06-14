import {mgrs} from 'managers'
import {ItemStack} from 'ItemMgr'
/*  
 @options Object:
  maxXfer: maximum items transfered
  toAs: 'to' is default as an inventory, but we
    could treat it as an EntityStore by setting "entity"
  maxPerType: t/f ... if multiple types are provided, do we transfer upto x per type, or x total
  types: array of item types
  stacks: [ItemStacks]  ... this is only what we transfer in.
 */
export function InvXFer(obj) {
  let {from, to, options} = obj
  if(options?.debug) {
    console.log("debug:")
    console.log(from)
    console.log(to)
    console.log(options)
  }
  if(!from || !to) debugger
  //if(to==mgrs.baseApp.player.inv) debugger
  if(options?.maxXfer==0) return 
  let send = options?.toAs=="entity" ? 'recieveItem' : 'addStack'
  let accum = 0
  let XFer = (itemStack) => {
    options?.debug && console.log(itemStack)
    let consumed = to[send](itemStack)
    options?.debug && console.log(consumed)
    consumed && from.consumeAll(new ItemStack(itemStack.name, consumed))
    if(options?.debug) debugger
    return consumed
  }
  let XFerCount = options?.maxXfer ? (count) => {
    return Math.min(count, options.maxXfer-accum)
  } : (count) => {
    return count
  }
  if(options?.stacks) {
    for(let each of options.stacks) {
      XFer(each)
    }
  } else {
    for(let i of from.items) {
      if(!i || !i.name ||  i.count==0) continue
      if(options?.types && !options.types.includes(i.name)) continue
      accum += XFer({
          name: i.name
        ,count: XFerCount(i.count)
      })
      options?.debug && console.log('accum: '+accum)
      if(options?.maxXfer) {
        if(options.maxXfer==accum) return
      }
    }
  }
}

function invUse(obj) {
  switch(obj.how) {
    case "sub-n-crement":
      if(obj.from.consume(obj.what, obj.count)===0) {
        if(obj.to_prop) {
          obj.to[obj.to_prop] += obj.count
        } else {
          obj.to += obj.count

        }
      }
      break;
  }
}

import {CephlaCommConstructor as CCC} from "CephlaComm/main"
CCC.provide("invXfer", InvXFer)
CCC.provide("invUse", invUse)
// globalThis.InvXFer = InvXFer
