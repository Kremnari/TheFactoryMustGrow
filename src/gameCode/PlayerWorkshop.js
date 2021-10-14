import {IgorUtils as IgorJs} from 'IgorJs/main'

export const newPlayer = {
  inv: {
    items: []
  },
  workshop: {
    entities: []
  }
}


const InventoryPushSig = {
  which: "itemStack",
  to: "entities"
}
function InventoryPush(obj, Igor) {
  let entities = Igor.getNamedObject("global").player.workshop.entities
  if(obj.which.itemStack.count>0
    && Igor.data.entity[obj.which.itemStack.name]
    && Igor.addNewObject(obj.to.entities, "player.entity", {
          name: obj.which.itemStack.name,
          idx: entities.length})
  ) {
    obj.which.itemStack.count--
    Igor.view.signaler.signal("entityUpdate")
    Igor.view.signaler.signal("generalUpdate")
  }
}
IgorJs.provide_CCC("player.inventoryPush", InventoryPush, InventoryPushSig)


IgorJs.CCC_addUtility("workshop.moveEntity", (obj, args, ret, Igor) => {
    let workshop = Igor.getNamedObject("global").player.workshop.entities
    let target = Igor.getId(args.which)
    args.to = target.order < args.to 
      ? Math.min(args.to, workshop.length-1)
      : Math.max(args.to, 0)
    let swap = workshop.find( (x) => {return Igor.getId(x).order==args.to})
    swap = Igor.getId(swap)
    swap.order = target.order
    target.order = args.to
    Igor.view.signaler.signal("entityUpdate")
})

const WorkshopRecover = (obj, Igor) => {
  let entity = Igor.getId(obj.which.entity)
  Igor.processTEMP(entity, "entity.clearProcess", {return: obj.player.inventory})
  Igor.processTEMP(obj.player.inventory, 'inventory.add', {itemStacks: [{name: entity.name, count: 1}]})
  //update workshop array
  let workshop = Igor.getNamedObject("global").player.workshop.entities
  let idx = workshop.findIndex((x) => {return x==obj.which.entity})
  workshop.splice(idx, 1)
  let holeNum = entity.order
  workshop.forEach( (id) => {
    let item = Igor.getId(id)
    if(item.order > holeNum) item.order--
  })

  Igor.deleteObject(entity)
  Igor.view.signaler.signal("entityUpdate")
}
WorkshopRecover.signature = {
  which: 'entity',
  player: 'inventory'
}

IgorJs.provide_CCC("workshop.recover", WorkshopRecover, WorkshopRecover.signature)