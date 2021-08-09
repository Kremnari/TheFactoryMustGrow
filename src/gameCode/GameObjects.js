import {IgorUtils as IgorJs} from "IgorJs/main"
import {ChameleonViewer as ChameJs} from "Chameleon/main"

/* *
 *  Adding workshop entities from player inventory
 */

const PlayerEntity = (params, newObj, Igor) => {
  newObj.buffers = {}
  //? Copy static data onto entity,
  //? surely there's a better way to do this...
  Object.assign(newObj, Igor.data.entity[params.name])
  if(newObj.subType=="miner" || newObj.subType=="crafter") {
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
function EntityInputTicker(entity, tickData, Igor) {
  //need to reconjigger this to draw from multiple buffer slots
  if(entity.buffers.in.xferTimer-- == 0) {
    let toAdd = Math.min(entity.buffers.in.xfer, entity.buffers.in.stackSize-entity.buffers.in.items[0].count)
    if(Igor.processTEMP(
       Igor.getNamedObject("player.inventory")
      ,"inventory.consume"
      ,{itemStacks: {
           name: entity.buffers.in.items[0].name
          ,count: toAdd
        }
      })) {
        entity.buffers.in.items[0].count += toAdd
        entity.$_tags.push("tick", "processing")
      }
    entity.buffers.in.xferTimer = entity.buffers.in.xferTicks
  }
}
function EntityOutputTicker(entity, tickData, Igor) {
  //need to reconjigger this for drawing from multiple buffer slots
  if(entity.buffers.out.xferTimer-- == 0) {
    let toSub = Math.min(entity.buffers.out.xfer, entity.buffers.out.stackSize-entity.buffers.out.items[0].count)
    console.log(toSub)
    if(Igor.processTEMP(
        Igor.getNamedObject("player.inventory")
        ,"inventory.add"
        ,{itemStacks: {
           name: entity.buffers.out.items[0].name
          ,count: toSub
        }}
    )) {
      entity.buffers.out.items[0].count -= toSub
    }
    entity.buffers.out.xferTimer = entity.buffers.in.xferTicks
  }
}
function EntityProcessTicker(entity, tickData, Igor) {
  if(!entity.processing || entity.buffers.out.items.some( (x) => {return x.count >= entity.buffers.out.stackSize })) { entity.$_tags.delete("ticking"); return }
  if(entity.process_timer) { --entity.process_timer }
  if(entity.process_timer===0) {
    if(Igor.processTEMP(entity.buffers.out, "inventory.add", {itemStacks: entity.processing.results || {name: entity.processing.mining_results, count: 1}})) {
      entity.process_timer = NaN
    }
  }
  if(Number.isNaN(entity.process_timer) || entity.process_timer===null) {
    if(entity.subType=='miner' || Igor.processTEMP(entity.buffers.in, "inventory.consume", {itemStacks: entity.processing.ingredients})) {
      entity.process_timer = entity.process_ticks
    } else {
      entity.$_tags.delete("tick")
    }
  }
}
IgorJs.defineObj("player.entity", PlayerEntity, {tick: EntityProcessTicker})
IgorJs.addObjectTickHandler("player.entity", EntityInputTicker, "inputTicker", {chain: ["inputTicker", "tick"], num: -5})
IgorJs.addObjectTickHandler("player.entity", EntityOutputTicker, "outputTicker", {chain: ["tick", "outputTicker"],  num: 5})

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
  obj.at.entity.$_tags.push("ticking", "processing")
  if(obj.type.class=="mining") {
    obj.at.entity.process_ticks = obj.which.process.mining_time / obj.at.entity.mining_speed * Igor.config.TICKS_PER_SECOND
    obj.at.entity.process_timer = NaN
  } else if (obj.type.class=="crafting") {
    obj.at.entity.process_ticks = obj.which.process.crafting_speed / obj.at.entity.crafting_speed * Igor.config.TICKS_PER_SECOND
    if(obj.at.entity.buffers.in) {
      if(obj.at.entity.buffers.in.stacks<obj.which.process.ingredients.length) { console.error("cannot fit ingredients"); return }
      obj.which.process.ingredients.forEach( (item, idx) => {obj.at.entity.buffers.in.items[idx] = {name: item.name, count: 0}; })
    }
    if(obj.at.entity.buffers.out) {
      if(obj.at.entity.buffers.out.stacks<obj.which.process.results.length) { console.error('cannot fit results'); return }
      obj.which.process.results.forEach( (item, idx) => {obj.at.entity.buffers.out.items[idx] = {name: item.name, count: 0};})
    }
    obj.at.entity.process_timer = NaN
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
  at: 'entity',
  player: 'inventory'
}
const CollectBuffer = (obj, Igor) => {
  Igor.processTEMP(obj.player.inventory, "inventory.add", {itemStacks: obj.which.buffer})
  obj.which.buffer.count = 0
  obj.at.entity.$_tags.push("tick", "processing")
}

IgorJs.provide_CCC("entity.bufferCollect", CollectBuffer, CollectBufferSig)

const FillBufferSig = {
  which: 'buffer',
  item: 'buffer',
  at: 'entity', 
  service: 'rounder',
  player: 'inventory'
}
const FillBuffer = (obj, Igor) => {
  let avail = Igor.processTEMP(obj.player.inventory.items, "inventory.total", {name: obj.item.buffer.name})
  if(avail===0) return
  let toMove = obj.service.rounder.calc(obj.item.buffer.count, obj.which.buffer.stackSize, avail)
  Igor.processTEMP(obj.player.inventory, "inventory.consume", {itemStacks: {name: obj.item.buffer.name, count: toMove}})
  obj.item.buffer.count += toMove
  //Set entity to 'ticking'
  obj.at.entity.$_tags.push("tick", "processing")
}

IgorJs.provide_CCC("entity.bufferFill", FillBuffer, FillBufferSig)


const BufferUpgradeSig = {
  which: "buffer",
  type: "string",
  at: "entity",
  player: 'inventory',
}

const BUFFER_SIZE = [5, 10, 20, 30, 40, 50]
BUFFER_SIZE.MAX = 50

const BufferUpgrade = (obj, Igor) => {
  if(obj.type.string=="autoload") {
    if(Igor.processTEMP(obj.player.inventory, "inventory.consume", {itemStacks: {name: "inserter", count: 1}})) {

      !obj.which.buffer.upgrades.loader && (obj.which.buffer.upgrades.loader = {count: 0})
      obj.which.buffer.upgrades.loader.count++
      obj.which.buffer.xferTimer || (obj.which.buffer.xferTimer = obj.which.buffer.xferTicks)
      obj.which.buffer.xfer++

      let tag = null
      tag = (obj.at.entity.buffers.in==obj.which.buffer ? "inputTicker" : "outputTicker")
      obj.at.entity.$_tags.push(tag, true)
    }
  } else if(obj.type.string=="buffer") {
    if(Igor.processTEMP(obj.player.inventory, "inventory.consume", {itemStacks: {name: "iron-chest", count: 1}})) {
      !obj.which.buffer.upgrades.bufferSize && (obj.which.buffer.upgrades.bufferSize = {count: 0})
      obj.which.buffer.upgrades.bufferSize.count++
      obj.which.buffer.stackSize = BUFFER_SIZE[obj.which.buffer.upgrades.bufferSize.count] || BUFFER_SIZE.MAX
      obj.at.entity.$_tags.push("tick", "processing")
    }
  }
}

IgorJs.provide_CCC("entity.bufferUpgrade", BufferUpgrade, BufferUpgradeSig)