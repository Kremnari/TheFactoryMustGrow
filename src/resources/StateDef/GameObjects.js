import {IgorUtils as IgorJs} from "IgorJs/main"
import { EntityStorage } from "../../EntityMgr"
import {ChameleonViewer as ChameJs} from "Chameleon/main"

/* *
 *  Adding workshop entities from player inventory
 */

const PlayerEntity = (params, newObj, Igor) => {
  newObj.buffers = {}
  //? Copy static data onto entity,
  //? surely there's a better way to do this...
  Object.assign(newObj, Igor.data.entity[params.name])
  if(newObj.subType=="mining-drill" || newObj.subType=="crafter") {
    newObj.buffers.out = {
      items: [],
      upgrades: {},
      stacks: 1, stackSize: 5,
      xfer: 0, xferTicks: 120, xferTimer: NaN
    }
  }
  if(newObj.subType=="crafter" || newObj.subType=="research") {
    newObj.buffers.in = {
      items: [],
      upgrades: {},
      stacks: 1, stackSize: 5,
      xfer: 0, xferTicks: 120, xferTimer: NaN
    }
  }
  //!  This won't work when Igor is in a webworker
  ChameJs.signaler.signal("addedEntity")
  return [newObj]
}
const PlayerEntityTickerSig = {
  
}
const PlayerEntityTicker = (entity, tickData) => {
  console.log("player entity ticker")
}
IgorJs.defineObj("player.entity", PlayerEntity, {tick: PlayerEntityTicker})
IgorJs.addObjectTickFunction("player.entity", PlayerEntityTicker, PlayerEntityTickerSig)

/* *
 * Resource mining
*/
const ResourceMine = (obj, Igor, self) => {
  if(self.res) {
    window.clearTimeout(self.timeout)
    Igor.view.animsUpdate(self.res, null, null)
    self.res = undefined
  } else {
    self.timeout = window.setTimeout( () => {
      Igor.processTEMP(obj.player.inventory, "inventory.add", {itemStacks: [{name: obj.which.resource.mining_results, count: 1}]})
      Igor.view.animsUpdate(self.res, null, null)
      self.res = undefined
    }, obj.which.resource.mining_time * 1000)
    self.res = obj.which.resource
    Igor.view.animsUpdate(obj.which.resource, "isMining", obj.which.resource.mining_time)
  }
}
window.ResourceMine = ResourceMine

const ResourceMineSig = {
  which: "resource",
  player: "inventory"
}

IgorJs.provide_CCC("resources.mine", ResourceMine, ResourceMineSig)

/* *
 *  Entity Set processing
 */
const EntitySetProcessSig = {
  at: "entity",
  which: "process",
  type: "class",  // enum ['mining', 'crafting', 'lab']
  player: "inventory",
}
const EntitySetProcess = (obj, Igor) => {
  if(obj.at.entity.processing || obj.which.process==null) {
    Igor.processTEMP(obj.at.entity, "entity.clearProcess", {returnTo: obj.player.inventory})
    if(!obj.which.process) return
  }
  obj.at.entity.processing = obj.which.process
  obj.at.entity.$_tags.push("ticking", obj.type.class)
  if(obj.type.class=="mining") {
    obj.at.entity.process_timer = obj.which.process.mining_time / obj.at.entity.mining_speed * Igor.config.TICKS_PER_SECOND
  } else if (obj.type.class=="crafting") {
    obj.at.entity.process_timer = obj.which.process.crafting_speed / obj.at.entity.crafting_speed * Igor.config.TICKS_PER_SECOND
    if(obj.at.entity.buffers.in) {
      if(obj.at.entity.buffers.in.stacks<obj.which.process.ingredients.length) { console.error("cannot fit ingredients"); return }
      obj.which.process.ingredients.forEach( (item, idx) => {obj.at.entity.buffers.in.items[idx] = {name: item.name, count: 0}; console.log(item)})
    }
    if(obj.at.entity.buffers.out) {
      if(obj.at.entity.buffers.out.stacks<obj.which.process.results.length) { console.error('cannot fit results'); return }
      obj.which.process.results.forEach( (item, idx) => {obj.at.entity.buffers.out.items[idx] = {name: item.name, count: 0}; console.log(item)})
    }
  }
}
IgorJs.provide_CCC("entity.setProcess", EntitySetProcess, EntitySetProcessSig)

function EntityClearProcess(entity, args, returnObj, Igor) {
  if(entity.buffers.in) {
    Igor.processTEMP(args.returnTo, "inventory.add", {itemStacks: entity.buffers.in.items})
    //! If args.returnTo is full, 'inventory.add' will fail silently
    entity.buffers.in.items.length = 0
  }
  if(entity.buffers.out) {
    Igor.processTEMP(args.returnTo, "inventory.add", {itemStacks: entity.buffers.out.items})
    //! If args.returnTo is full, 'inventory.add' will fail silently
    entity.buffers.out.items.length = 0
  }
  entity.processing = null
}
IgorJs.addOperation("entity.clearProcess", EntityClearProcess)

const CollectBufferSig = {
  which: 'buffer',
  player: 'inventory'
}
const CollectBuffer = (obj, Igor) => {
  Igor.processTEMP(obj.player.inventory, "inventory.add", {itemStacks: obj.which.buffer})
  obj.which.buffer.count = 0
}

IgorJs.provide_CCC("entity.bufferCollect", CollectBuffer, CollectBufferSig)

const FillBufferSig = {
  which: 'buffer',
  service: 'rounder',
  player: 'inventory'
}
const FillBuffer = (obj, Igor) => {
  //Igor.processTEMP(obj.player.inventory, "inventory.consume", {itemStacks: {name: obj.which.buffer.name, count: 5}})
  obj.which.buffer.count += 5
}

IgorJs.provide_CCC("entity.bufferFill", FillBuffer, FillBufferSig)
