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
  let send = options?.toAs=="entity" ? 'recieveItem' : 'addStack'
  console.log(send)
  let xFer = (itemStack) => {
    let consumed = to[send](itemStack)
    console.log(consumed+" of "+itemStack.name)
    from.consume(itemStack.name, consumed)
    return consumed
  }
  switch(true) {
    case options?.stacks:
      break;
    case options?.types:
      break;
    default:
      for(let i of from.items) {
        if(!i || !i.name ||  i.count==0) continue
        xFer(i)
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
