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
    && Igor.addNewObject(obj.to.entities, "player.entity", { name: obj.which.itemStack.name})) {
    obj.which.itemStack.count--
  }
}
IgorJs.provide_CCC("player.inventoryPush", InventoryPush, InventoryPushSig)
