import {IgorUtils as IgorJs} from 'IgorJs/main'
import { IgorRunner } from '../IgorJs/main'

export const newPlayer = {
  inv: {
    items: []
  },
  crafting: {
    list: [],
    timer:NaN,
    time: NaN,
    maxQueue: 5,
    current:0
  },
  mining: {
    list: [],
    timer:NaN,
    time: NaN,
    maxQueue: 5,
    current: 0
  },
  workshop: {
    entities: []
  }
}

/*
* Workshop actions
*/

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

const ChangeOrder = (obj, Igor) => {
  let swapOrder = obj.which.obj.order + obj.dir.number
  if(swapOrder<0 || swapOrder> obj.list.objs.length) return Igor.view.warnToast("Cannot move")
  if(typeof obj.list.objs[0]=="string") {
    let swapId = obj.list.objs.find((x) => {
      return Igor.getId(x).order==swapOrder
    })
    Igor.getId(swapId).order -= obj.dir.number
    obj.which.obj.order += obj.dir.number
  } else {
    let swap = obj.list.objs.find((x) => {
      return x.order==swapOrder
    })
    swap.order -= obj.dir.number
    obj.which.obj.order += obj.dir.number
  }
  Igor.view.signaler.signal("generalUpdate")
}
ChangeOrder.signature = {
  which: "obj",
  list: "objs",
  dir: "number"
}

IgorJs.provide_CCC("object.move", ChangeOrder, ChangeOrder.signature)

const DeleteObject = (obj, Igor) => {
  Igor.processTEMP(obj.which.obj, obj.which.obj.$_type+".delete", Igor)
}
DeleteObject.signature = {
  which: "obj",
  list: "objs"
}
IgorJs.provide_CCC("object.delete", DeleteObject, DeleteObject.signature)

/*
 * Player actions
*/

const CraftFromInv = (obj, Igor, fn) => {
  let craftObj = Igor.getNamedObject("global").player.crafting
  if(craftObj.current== craftObj.maxQueue) {
    Igor.view.warnToast("Queue Full.  Max: "+craftObj.maxQueue)
    return
  }
  if(!Igor.processTEMP("player.inventory", "inventory.consume", {itemStacks: obj.which.recipe.ingredients})) {
    Igor.view.warnToast("Unable to consume ingredients to craft")
    return
  }
  if(craftObj.list[craftObj.list.length-1]?.name==obj.which.recipe.name) {
    craftObj.list[craftObj.list.length-1].count++
  } else {
    craftObj.list.push({name: obj.which.recipe.results[0].name, count: 1, recipe: obj.which.recipe.name})
    craftObj.time = obj.which.recipe.crafting_speed * Igor.getStatic("config.TICKS_PER_SECOND") * 2
    craftObj.timer = 0
  }
  craftObj.current++
}
CraftFromInv.signature = {
  which: "recipe",
}
IgorJs.provide_CCC("player.craft", CraftFromInv, CraftFromInv.signature)

/* *
 * Resource mining
 * Player action
*/
const ResourceMine = (obj, Igor, self) => {
  let mineObj = Igor.getNamedObject("global").player.mining
  if(mineObj.current== mineObj.maxQueue) {
    Igor.view.warnToast("Queue Full.  Max: "+mineObj.maxQueue)
    return
  }
  if(mineObj.list[mineObj.list.length-1]?.name==obj.which.resource.name) {
    mineObj.list[mineObj.list.length-1].count++
  } else {
    mineObj.list.push({name: obj.which.resource.name, count: 1})
    mineObj.time = obj.which.resource.mining_time * Igor.getStatic("config.TICKS_PER_SECOND") * 2
    mineObj.timer = 0
  }
  mineObj.current++
}
window.ResourceMine = ResourceMine

ResourceMine.signature = {
  which: "resource",
}

IgorJs.provide_CCC("resources.mine", ResourceMine, ResourceMine.signature)

const QueueCancel = (obj, Igor) => {
  let queue = Igor.getNamedObject("global").player[obj.which.queue]
  if(obj.which.queue=="crafting") {
    let recipe = Igor.data.recipe[queue.list[obj.which.idx].recipe]
    Igor.processTEMP("player.inventory", "inventory.add", {itemStacks: recipe.ingredients})
  }
  if(queue.list[obj.which.idx].count>1) {
    queue.list[obj.which.idx].count--
  } else {
    queue.list.splice(obj.which.idx, 1)
    queue.timer= 0
  }
  queue.current--
}
QueueCancel.signature = {
  which: ["idx", "queue"]
}
IgorJs.provide_CCC("player.cancelQueue", QueueCancel, QueueCancel.signature)

IgorJs.addEventHandler("tick", (tick, Igor) => {
  let player = Igor.getNamedObject("global").player
  let craftObj = player.crafting
  let mineObj = player.mining
  if(craftObj.current>0) {
    craftObj.timer++
    if(craftObj.timer>=craftObj.time) {
      craftObj.timer= 0
      craftObj.current--
      let recipe = Igor.data.recipe[craftObj.list[0].recipe]
      Igor.processTEMP("player.inventory", 'inventory.add', {itemStacks: recipe.results})
      --craftObj.list[0].count==0 && craftObj.list.shift()
    }
  }
  if(mineObj.current>0) {
    mineObj.timer++
    if(mineObj.timer>=mineObj.time) {
      mineObj.timer= 0
      mineObj.current--
      let resource = Igor.data.resource[mineObj.list[0].name]
      Igor.processTEMP("player.inventory", 'inventory.add', {itemStacks: [{name: resource.mining_results, count: 1}]})
      --mineObj.list[0].count==0 && mineObj.list.shift()
    }
  }
})