import {CephlaCommConstructor as CCC} from "CephlaComm/main"


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
  who: "player",
  to: "entities"
}
function InventoryPush(obj, Igor) {
  debugger
  if(obj.which.itemStack.count>0
    && Igor.addNewObject(obj.to.workshop.entities, "entity", { name: obj.which.itemStack.name})) {
    obj.which.itemStack.count--
  }
}

CCC.provide("player.inventoryPush", InventoryPush, InventoryPushSig)
