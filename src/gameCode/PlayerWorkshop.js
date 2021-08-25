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
  if(obj.which.itemStack.count>0
    && Igor.data.entity[obj.which.itemStack.name]
    && Igor.addNewObject(obj.to.entities, "player.entity", { name: obj.which.itemStack.name})) {
    obj.which.itemStack.count--
    Igor.view.signaler.signal("addedEntity")
  }
}
IgorJs.provide_CCC("player.inventoryPush", InventoryPush, InventoryPushSig)
