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
    newObj.buffers.out = Igor.newClassObject("entity.buffer", {})
  }
  if(newObj.subType=="crafter" || newObj.subType=="research") {
    newObj.buffers.in = Igor.newClassObject("entity.buffer", {})
    if(newObj.subType=="research") {
      newObj.inputs.forEach((x) => newObj.buffers.in.items.push({name: x, count: 0}))
      newObj.research_timer = null
      newObj.$_tags.push("researchTicker", true)
    }
  }
  //!  This won't work when Igor is in a webworker
  ChameJs.signaler.signal("addedEntity")
  return [newObj]
}
//!  These should be combined into the entity.buffer tick()
function EntityInputTicker(entity, tickData, Igor) {
  //need to reconjigger this to draw from multiple buffer slots
  if(entity.buffers.in.xferTimer-- == 0) {
    let toAdd = Math.min(entity.buffers.in.xfer, entity.buffers.in.stackSize-entity.buffers.in.items[0].count)
    let added = Igor.processTEMP(
                    Igor.getNamedObject("player.inventory")
                    ,"inventory.consume"
                    ,{itemStacks: {
                          name: entity.buffers.in.items[0].name
                        ,count: toAdd
                      }, partial: true
                    })
    if(added) {
        entity.buffers.in.items[0].count += added[0].count
        entity.$_tags.push("tick", "processing")
      }
    entity.buffers.in.xferTimer = entity.buffers.in.xferTicks
  }
}
function EntityOutputTicker(entity, tickData, Igor) {
  //need to reconjigger this for drawing from multiple buffer slots
  if(entity.buffers.out.xferTimer-- == 0) {
    let toSub = Math.min(entity.buffers.out.xfer, entity.buffers.out.items[0].count)
    //console.log(toSub)
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
    entity.buffers.out.xferTimer = entity.buffers.out.xferTicks
  }
}
function EntityResearchTicker(entity, tickData, Igor) {
  let research = Igor.getNamedObject("research").progressing
  if(!research) return
  if(Number.isNaN(entity.research_timer) || entity.research_timer===null) {
    let canConsume = research.cost.ingredients.every(([name, qty]) => {
        return Igor.processTEMP(entity.buffers.in.items, "inventory.total", {name})>qty
      })
    if(!canConsume) return
    console.log('consuming')
    research.cost.ingredients.forEach( ([name, qty]) => {
      Igor.processTEMP(entity.buffers.in, "inventory.consume", {itemStacks: {name, count: qty}})
    })
    //Consume next units to reset timer
    entity.research_timer = 120
    return
  }
  if(entity.research_timer) { --entity.research_timer }
  if(entity.research_timer===0) {
    Igor.processTEMP(research, "research.update", {})
    entity.research_timer = NaN
  }
}
function EntityProcessTicker(entity, tickData, Igor) {
  if(!entity.processing || entity.buffers.out.items.some( (x) => {return x.count >= entity.buffers.out.stackSize })) { entity.$_tags.delete("ticking"); return }
  if(Number.isNaN(entity.process_timer) || entity.process_timer===null) {
    if(entity.subType=='miner' || Igor.processTEMP(entity.buffers.in, "inventory.consume", {itemStacks: entity.processing.ingredients})) {
      entity.process_timer = entity.process_ticks
    } else {
      entity.$_tags.delete("tick")
    }
    return
  }
  if(entity.process_timer) { --entity.process_timer }
  if(entity.process_timer===0) {
    if(Igor.processTEMP(entity.buffers.out, "inventory.add", {itemStacks: entity.processing.results || {name: entity.processing.mining_results, count: 1}})) {
      entity.process_timer = NaN
    }
  }
}
IgorJs.defineObj("player.entity", PlayerEntity, {tick: EntityProcessTicker})
IgorJs.addObjectTickHandler("player.entity", EntityInputTicker, "inputTicker", {chain: ["inputTicker", "tick"], num: -5})
IgorJs.addObjectTickHandler("player.entity", EntityOutputTicker, "outputTicker", {chain: ["tick", "outputTicker"],  num: 5})
IgorJs.addObjectTickHandler("player.entity", EntityResearchTicker, "researchTicker", {chain: ["tick", "researchTicker"], num: 3})

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

ResourceMine.signature = {
  which: "resource",
  player: "inventory"
}

IgorJs.provide_CCC("resources.mine", ResourceMine, ResourceMine.signature)

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
  obj.at.entity.$_tags.push("tick", "processing")
  if(obj.type.class=="mining") {
    obj.at.entity.process_ticks = obj.which.process.mining_time / obj.at.entity.mining_speed * Igor.config.TICKS_PER_SECOND
    obj.at.entity.process_timer = obj.at.entity.process_ticks
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


/*
  Buffers
 */
const NewEntityBuffer = (params, newObj, Igor) => {
  newObj.items = []
  newObj.upgrades = {}
  newObj.stacks = 1
  newObj.stackSize = 5
  newObj.xfer = 0
  newObj.xferTicks = 120
  newObj.xferTimer = NaN
  return [newObj]
}
const EntityBufferActions = {}
EntityBufferActions.Collect = (obj, Igor) => {
  Igor.processTEMP(obj.player.inventory, "inventory.add", {itemStacks: obj.which.buffer})
  obj.which.buffer.count = 0
  obj.at.entity.$_tags.push("tick", "processing")
}
EntityBufferActions.Collect.signature = {
  which: 'buffer',
  at: 'entity',
  player: 'inventory'
}
EntityBufferActions.Collect.CC_provide = "entity.bufferCollect"
//IgorJs.provide_CCC("entity.bufferCollect", CollectBuffer, CollectBufferSig)


EntityBufferActions.Fill = (obj, Igor) => {
  let avail = Igor.processTEMP(obj.player.inventory.items, "inventory.total", {name: obj.item.buffer.name})
  if(avail===0) return
  let toMove = obj.service.rounder.calc(obj.item.buffer.count, obj.which.buffer.stackSize, avail)
  Igor.processTEMP(obj.player.inventory, "inventory.consume", {itemStacks: {name: obj.item.buffer.name, count: toMove}})
  obj.item.buffer.count += toMove
  //Set entity to 'ticking'
  obj.at.entity.$_tags.push("tick", "processing")
}
EntityBufferActions.Fill.signature = {
  which: 'buffer',
  item: 'buffer',
  at: 'entity', 
  service: 'rounder',
  player: 'inventory'
}
EntityBufferActions.Fill.CC_provide = "entity.bufferFill"
//IgorJs.provide_CCC("entity.bufferFill", FillBuffer, FillBufferSig)


IgorJs.setStatic("entity.buffer.BUFFER_SIZE",  [5, 10, 20, 30, 40, 50])
IgorJs.setStatic("entity.buffer.BUFFER_SIZE.MAX", 50)

EntityBufferActions.Upgrade = (obj, Igor) => {
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
      obj.which.buffer.stackSize = Igor.getStatic("entity.buffer.BUFFER_SIZE")[obj.which.buffer.upgrades.bufferSize.count] || Igor.getStatic("entity.buffer.BUFFER_SIZE.MAX")
      obj.at.entity.$_tags.push("tick", "processing")
    }
  }
}
EntityBufferActions.Upgrade.signature = {
  which: "buffer",
  type: "string",
  at: "entity",
  player: 'inventory',
}
EntityBufferActions.Upgrade.CC_provide = "entity.bufferUpgrade"
//IgorJs.provide_CCC("entity.bufferUpgrade", BufferUpgrade, BufferUpgradeSig)
IgorJs.defineObj("entity.buffer", NewEntityBuffer, EntityBufferActions)



/*
 *  Research Related
 *
 */

const SetResearchSig = {
  "which": "tech",
  "global": "game"
}
const SetResearch =  (obj, Igor, self) => {
  obj.global.game.research.progressing = obj.which.tech
  obj.global.game.research.progressing.completeUnits = 0
}

IgorJs.provide_CCC("research.set", SetResearch, SetResearchSig)

const ClearResearchSig = {
  "global": "game"
}
const ClearResearch = (obj, Igor, self) => {
  obj.global.game.research.progressing = null
}
IgorJs.provide_CCC("research.clear", ClearResearch, ClearResearchSig)

const ResearchUpdate = (obj, args, returnObj, Igor) => {
  obj.completeUnits++
  if(obj.completeUnits==obj.cost.count) {
    console.log("complete tech")
    Igor.getNamedObject("research").progressing = null
    obj.researched = true
    obj.unlocks.forEach( (item) => {
      typeof item === 'string' && Igor.processTEMP(item, "recipe.unlock")
      typeof item === 'object' && Igor.processTEMP(item, "feature.unlock")
      (typeof item=== 'string' && Igor.data.recipe[item] && (Igor.data.recipe[item].enabled = true))
//      || (typeof item === 'object' && item.feature && Igor.getNamedObject("global").activeFeatures.push(item.feature))
    })
  }
}

IgorJs.addOperation("research.update", ResearchUpdate)

const RecipeUnlock = (obj, args, returnObj, Igor) => {
  Igor.data.recipe[obj].enabled = true
}

IgorJs.addOperation("recipe.unlock", RecipeUnlock)

const FeatureUnlock = (obj, args, returnObj, Igor) => {
  Igor.getNamedObject("global").activeFeatures[obj.feature] = obj
}
IgorJs.addOperation("feature.unlock")