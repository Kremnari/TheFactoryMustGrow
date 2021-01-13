/*  
 @options Object:
  maxXfer: maximum items transfered
  toAs: 'to' is default as an inventory, but we
    could treat it as an EntityStore by setting "entity"
  maxPerType: t/f
  types: array of item types
  stacks: [ItemStacks]
 */
export function InvXFer(from, to, options) {
  options?.debug && console.log('called:')
  options?.debug && console.log(options)
  if(!from || !to) debugger
  if(options?.maxXFer==0) return 
  let send = options?.toAs=="entity" ? 'recieveItem' : 'addStack'
  let accum = 0
  let XFer = (itemStack) => {
    options?.debug && console.log(itemStack)
    let consumed = to[send](itemStack)
    options?.debug && console.log(consumed)
    from.consume(itemStack.name, consumed)
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
    }
  }
}

import {CephlaCommTemp as CC} from "CephlaComm/main"
CC.InvXFer = InvXFer

/*

** FactoryBlock/tick..(input/output)Line
    for(let each of from.getTypes(false)) {
      let total = from.total(each)
      if(total>0) {
        let consumed = to.recieveItem(new ItemStack(each, total))
        console.log('con: '+consumed)
        from.consume(each, consumed)
        console.log('total: '+from.total(each))
      }
    }


*/
