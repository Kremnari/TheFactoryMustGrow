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
  //console.log('called:')
  //console.log(options)
  let send = options?.toAs=="entity" ? 'recieveItem' : 'addStack'
  //console.log(send)
  let accum = 0
  let xFer = (itemStack) => {
    //console.log(itemStack)
    let consumed = to[send](itemStack)
    //console.log(consumed)
    from.consume(itemStack.name, consumed)
    return consumed
  }
  let XFerCount = options?.maxXfer ? (count) => {
    return Math.min(count, options.maxXfer-accum)
  } : (count) => {
    return count
  }
  //console.log(XFerCount)
  switch(true) {
    case options?.stacks:
      break;
    default:
      for(let i of from.items) {
        if(!i || !i.name ||  i.count==0) continue
        if(options?.types && !options.types.includes(i.name)) continue
        accum += xFer({
            name: i.name
          ,count: XFerCount(i.count)
        })
        //console.log('accum: '+accum)
      }
  }
}


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
