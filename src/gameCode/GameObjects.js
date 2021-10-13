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
    newObj.buffers.out = Igor.newComponent("entity.buffer", {})
  }
  if(newObj.subType=="crafter" || newObj.subType=="research") {
    if(newObj.subType=="research") {
      newObj.buffers.in = Igor.newComponent("entity.buffer", {staticStacks: newObj.inputs})
      newObj.research_timer = null
      newObj.$_tags.push("researchTicker", true)
    } else {
      newObj.buffers.in = Igor.newComponent("entity.buffer", {})
    }
  }
  newObj.order = params.idx
  //!  This won't work when Igor is in a webworker
  ChameJs.signaler.signal("addedEntity")
  return [newObj]
}
PlayerEntity._delete = (target, Igor) => {
  target.buffers.in  && Igor.deleteObject(target.buffers.in)
  target.buffers.out && Igor.deleteObject(target.buffers.out)
}

//!  These should be combined into the entity.buffer tick()
function EntityInputTicker(entity, tickData, Igor) {
  //need to reconjigger this to draw from multiple buffer slots
  let buffer = Igor.getId(entity.buffers.in)
  if(buffer.items.length==0) return
  if(buffer.xferTimer == 0) {
    let toAdd = Math.min(buffer.xfer, buffer.stackSize-buffer.items[buffer.xferStack].count)
    let added = Igor.processTEMP(
                    Igor.getNamedObject("player.inventory")
                    ,"inventory.consume"
                    ,{itemStacks: {
                          name: buffer.items[buffer.xferStack].name
                        ,count: toAdd
                      }, partial: true
                    })
    if(added && added[0].count>0) {
        buffer.items[buffer.xferStack].count += added[0].count
        entity.$_tags.push("tick", "processing")
      }
    buffer.xferTimer = buffer.xferTicks
    ++buffer.xferStack==buffer.items.length && (buffer.xferStack=0)
  } else {
    buffer.xferTimer--
  }
}
function EntityOutputTicker(entity, tickData, Igor) {
  //need to reconjigger this for drawing from multiple buffer slots
  let buffer = Igor.getId(entity.buffers.out)
  if(buffer.items.length==0) return
  if(buffer.xferTimer == 0) {
    let toSub = Math.min(buffer.xfer, buffer.items[buffer.xferStack].count)
    //console.log(toSub)
    let added = Igor.processTEMP(
      Igor.getNamedObject("player.inventory")
      ,"inventory.add"
      ,{itemStacks: {
         name: buffer.items[buffer.xferStack].name
        ,count: toSub
      }}
    )
    if(added.complete) {
      buffer.items[buffer.xferStack].count -= toSub
    }
    buffer.xferTimer = buffer.xferTicks
    ++buffer.xferStack==buffer.items.length && (buffer.xferStack =0)
  } else {
    buffer.xferTimer--
  }
}
function EntityResearchTicker(entity, tickData, Igor) {
  let research = Igor.getNamedObject("research").progressing
  if(!research) return
  if(Number.isNaN(entity.research_timer) || entity.research_timer===null) {
    let canConsume = research.cost.ingredients.every(([name, qty]) => {
        return Igor.processTEMP(entity.buffers.in, "inventory.total", {name})>=qty
      })
    if(!canConsume) return
    research.cost.ingredients.forEach( ([name, qty]) => {
      Igor.processTEMP(entity.buffers.in, "inventory.consume", {itemStacks: {name, count: qty}})
    })
    //Consume next units to reset timer
    entity.research_time = research.cost.time * Igor.config.TICKS_PER_SECOND * entity.researching_speed
    entity.research_timer = entity.research_time
    return
  }
  if(entity.research_timer) { --entity.research_timer }
  if(entity.research_timer===0) {
    Igor.processTEMP(research, "research.update", {})
    entity.research_timer = NaN
  }
}
function EntityProcessTicker(entity, tickData, Igor) {
  if(!entity.processing) { entity.$_tags.delete("ticking"); return }
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
    let buffer = Igor.getId(entity.buffers.out)
    let added = Igor.processTEMP(buffer, "inventory.add", {itemStacks: entity.buffers.stalled || entity.processing.results || {name: entity.processing.mining_results, count: 1}})
    if(added.complete) {
      entity.buffers.stalled = null
      entity.process_timer = NaN
    } else {
      //console.log('buffer full')
      //if(entity.name=="assembling-machine-1") debugger
      entity.buffers.stalled = added.part
      entity.process_timer = 0
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
      let buffer = Igor.getId(obj.at.entity.buffers.in)
      if(buffer.stacks<obj.which.process.ingredients.length) { console.error("cannot fit ingredients"); return }
      obj.which.process.ingredients.forEach( (item, idx) => {buffer.items[idx] = {name: item.name, count: 0}; })
    }
    if(obj.at.entity.buffers.out) {
      let buffer = Igor.getId(obj.at.entity.buffers.out)
      if(buffer.stacks<obj.which.process.results.length) { console.error('cannot fit results'); return }
      obj.which.process.results.forEach( (item, idx) => {buffer.items[idx] = {name: item.name, count: 0};})
    }
    obj.at.entity.process_timer = NaN
  }
}
IgorJs.provide_CCC("entity.setProcess", EntitySetProcess, EntitySetProcessSig)

function EntityClearProcess(entity, args, returnObj, Igor) {
  let player = Igor.getNamedObject("player.inventory")
  if(entity.buffers.in) {
    if(entity.process_timer) {
      Igor.processTEMP(player, "inventory.add", {itemStacks: entity.processing.ingredients})
    }
    let buffer = Igor.getId(entity.buffers.in)
    Igor.processTEMP(player, "inventory.add", {itemStacks: buffer.items})
    //! If args.returnTo is full, 'inventory.add' will fail silently
    buffer.items.length = 0
  }
  if(entity.buffers.out) {
    let buffer = Igor.getId(entity.buffers.out)
    Igor.processTEMP(player, "inventory.add", {itemStacks: buffer.items})
    //! If args.returnTo is full, 'inventory.add' will fail silently
    buffer.items.length = 0
  }
  if(entity.buffers.stalled) {
    Igor.processTEMP(player, "inventory.add", {itemStacks: entity.buffers.stalled})
    entity.buffers.stalled = null
  }
  entity.processing = null
}
IgorJs.addOperation("entity.clearProcess", EntityClearProcess)


/*
  Buffers
 */
const NewEntityBuffer = (params, newObj, Igor) => {
  newObj.upgrades = {}
  newObj.maxStacks = params.staticStacks?.length || params.stacks || 1
  newObj.stackSize = params.stackSize || 5
  newObj.items = (params.staticStacks?.map((x) => {return {name: x, count: 0}})) || []
  newObj.xfer = 0
  newObj.xferTicks = 120
  newObj.xferStack = 0
  newObj.busShift = 0
  newObj.xferTimer = NaN
  newObj.restrictable = params.restrictable || false
  newObj.$_parent = params.$_parent
  newObj.connection = null
  return [newObj]
}
const EntityBufferActions = {}
EntityBufferActions.Collect = (obj, Igor) => {
  let buffer = Igor.getId(obj.which.buffer)
  let idx = buffer.items.findIndex( (x) => { return x.name==obj.item.name })
  if(buffer.items[idx].count===0) return
  Igor.processTEMP(obj.player.inventory, "inventory.add", {itemStacks: buffer.items[idx]})
  buffer.items[idx].count = 0
  obj.at.entity!="temp_null" && obj.at.entity.$_tags.push("tick", "processing")
}
EntityBufferActions.Collect.signature = {
  which: 'buffer',
  item: 'name',
  at: 'entity',
  player: 'inventory'
}
EntityBufferActions.Collect.CC_provide = "entity.bufferCollect"
//IgorJs.provide_CCC("entity.bufferCollect", CollectBuffer, CollectBufferSig)


EntityBufferActions.Fill = (obj, Igor) => {
  let buffer = Igor.getId(obj.which.buffer)
  let idx = buffer.items.findIndex( (x) => { return x.name==obj.item.name})
  let avail = Igor.processTEMP(obj.player.inventory.items, "inventory.total", {name: buffer.items[idx].name})
  if(avail===0) return
  let toMove = obj.service.rounder.calc(buffer.items[idx].count, buffer.stackSize, avail)
  Igor.processTEMP(obj.player.inventory, "inventory.consume", {itemStacks: {name: buffer.items[idx].name, count: toMove}})
  buffer.items[idx].count += toMove
  //Set entity to 'ticking'
  obj.at.entity!="temp_null" && obj.at.entity.$_tags.push("tick", "processing")
}
EntityBufferActions.Fill.signature = {
  which: 'buffer',
  item: 'name',
  at: 'entity', 
  service: 'rounder',
  player: 'inventory'
}
EntityBufferActions.Fill.CC_provide = "entity.bufferFill"
//IgorJs.provide_CCC("entity.bufferFill", FillBuffer, FillBufferSig)


IgorJs.setStatic("entity.buffer.BUFFER_SIZE",  [5, 10, 20, 30, 40, 50])
IgorJs.setStatic("entity.buffer.BUFFER_SIZE.MAX", 50)

EntityBufferActions.Upgrade = (obj, Igor) => {
  obj.which.buffer = Igor.getId(obj.which.buffer)
  if(obj.type.string=="autoload") {
    if(Igor.processTEMP(obj.player.inventory, "inventory.consume", {itemStacks: {name: "inserter", count: 1}})) {
      !obj.which.buffer.upgrades.loader && (obj.which.buffer.upgrades.loader = {count: 0})
      obj.which.buffer.upgrades.loader.count++
      obj.which.buffer.xferTimer || (obj.which.buffer.xferTimer = obj.which.buffer.xferTicks)
      obj.which.buffer.xfer++

      let tag = null
      tag = (obj.at.entity.buffers.in==obj.which.buffer.$_id ? "inputTicker" : "outputTicker")
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
EntityBufferActions.SetRestrictions = (target, args, returnObj, Igor) => {
  if(!target.restrictable) returnObj._result = false
  //check through the list and return things to player buffer
  let connected = []
  let emptyIdxs = []
  for(let idx=0; idx<target.items.length; idx++)  {
    let x = target.items[idx]
    if(!x) {emptyIdxs.push(idx); continue}
    if(!args.list.includes(x.name)) {
      if(x.count>0) Igor.processTEMP(Igor.getNamedObject("player.inventory"), "inventory.add", {itemStacks: x})
      target.items.splice(idx, 1, undefined)
      emptyIdxs.push(idx)
    } else {
      connected.push(x.name)
    }
  }
  //console.log(emptyIdxs)
  args.list.forEach( (x) => {
    if(!connected.includes(x)) {
      target.items.splice(emptyIdxs.splice(0,1), 1, {name: x, count: 0})
    }
  })
}
EntityBufferActions.SetRestrictions.Igor_operation = "buffer.restrictList"
EntityBufferActions.HasRestriction = (target, args, returnObj, Igor) => {
  if(!target.restrictable) returnObj._result = false
  else {
    target.items.forEach( (x) => {
      if(x.name == args.itemName) {
        if(x.restrictedBy.includes(args.lineId)) {
          returnObj._result = {found: true, restricted: true}
        } else {
          returnObj._result = {found: true, restricted: false}
        }
      }
    })
  }
  !returnObj._result && (returnObj._result = {found: false, restricted: false})
}
EntityBufferActions.HasRestriction.Igor_operation = "buffer.hasRestriction"
EntityBufferActions.ClearRestriction = (target, args, returnObj, Igor) => {
  if(!target.restrictable) returnObj._result = false
  let idx = -1
  while(!("_result" in returnObj)) {
    let x = target.items[++idx]
    if(x.name == args.itemName) {
      x.restrictedBy.splice(x.restrictedBy.indexOf(args.lineId), 1)
      if(x.restrictedBy.length==0) {
        target.items[idx] = null
        returnObj._result = {found: true, cleared: true}
      } else {
        returnObj._result = {found: true, cleared: false}
      }
    }
  }
  !returnObj._result && (returnObj._result = {found: false, cleared: false})
}

EntityBufferActions.ClearRestriction.Igor_operation = "buffer.clearRestriction"
EntityBufferActions.BusXfer = (target, args, returnObj, Igor) => {
  //TODO need better protections for transfers
  if(args.toBus) {
    while(args.xferCount>0) {
      if(!target.items[target.busShift]) return null
      let added = Igor.processTEMP(args.toBus, "inventory.add", {itemStacks: [{name: target.items[target.busShift].name, count: args.xferCount}]})
      //console.log(added)
      if(added.complete) {
        Igor.processTEMP(target, "inventory.consume", {itemStacks: [{name: target.items[target.busShift].name, count: args.xferCount}]})
        args.xferCount=0
      } else if(added.part[0].count==args.xferCount) {
        return {full:true}
      } else {
        Igor.processTEMP(target, "inventory.consume", {itemStacks: [{name: target.items[target.busShift].name, count: args.xferCount-added.part[0].count}]})
        args.xferCount = added.part[0].count
      }
      ++target.busShift==target.items.length && (target.busShift=0)
    }
    
  } else if (args.fromBus) {
    while(args.xferCount>0) {
      if(!target.items[target.busShift]) return null
      let added = Igor.processTEMP(target, "inventory.add", {itemStacks: [{name: target.items[target.busShift].name, count: args.xferCount}]})
      if(added.complete) {
        Igor.processTEMP(args.fromBus, "inventory.consume", {itemStacks: [{name: target.items[target.busShift].name, count: args.xferCount}]})
        args.xferCount=0
      } else if(added.part[0].count==args.xferCount) {
        return
      } else {
        Igor.processTEMP(args.fromBus, "inventory.consume", {itemStacks: [{name: target.items[target.busShift].name, count: args.xferCount-added.part[0].count}]})
        args.xferCount = added.part[0].count
      }
      ++target.busShift==target.items.length && (target.busShift=0)
    }
  } else {
    console.warn("BusXfer called __ no bus target")
  }
}
EntityBufferActions.BusXfer.Igor_operation = "buffer.busXfer"

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
  let global = Igor.getNamedObject("global")
  obj.completeUnits++
  if(obj.completeUnits==obj.cost.count) {
    //console.log("complete tech")
    Igor.getNamedObject("research").progressing = null
    obj.researched = true
    global.research.completed[obj.name] = true
    obj.unlocks.forEach( (item) => {
      typeof item === 'string' && Igor.processTEMP(item, "recipe.unlock")
      typeof item === 'object' && Igor.processTEMP(item, "feature.unlock")
    })
    ChameJs.signaler.signal("generalUpdate")
  }
}

IgorJs.addOperation("research.update", ResearchUpdate)

const RecipeUnlock = (obj, args, returnObj, Igor) => {
  //Igor.data.recipe[obj].enabled = true
  Igor.getNamedObject("global").unlocked_recipes.push(obj)
}
IgorJs.addOperation("recipe.unlock", RecipeUnlock)

const FeatureUnlock = (obj, args, returnObj, Igor) => {
  Igor.getNamedObject("global").activeFeatures[obj.feature] = obj
  /*
  adjustFeature(obj) {
    switch(obj.feature) {
      case "defense":
        if(!this.activeFeatures["defense"]) {
          this.activeFeatures["defense"] = true
          this.facBlocks.defenses = NamedBlocks.DefenseBlock()
          this.facBlocks.defenseBus = NamedBlocks.DefenseBus()
        }
        this.facBlocks.defenses.machines["turret"] = ChameView.GameObjectFromPointer(obj.go_pointer)  //!!! shouldn't be in Chameleon
        break;
      case "offense":
        if(!this.activeFeatures["offense"]) {
          this.activeFeatures["offense"] = true
          this.facBlocks.offenses = NamedBlocks.OffenseBlock()
          this.facBlocks.offenseBus = NamedBlocks.OffenseBus()
        }
        this.facBlocks.offenses.radar = ChameView.GameObjectFromPointer(obj.go_pointer)  //!!! shouldn't be in Chameleon
        break;
      case "factoryBlocks":
        this.activeFeatures["factoryBlocks"] = true
    }
    // this.activeFeatures[obj.feature] = obj.level || (this.activeFeatures[obj.feature]+obj.inc) || (this.activeFeatures[obj.feature] * obj.bonus) || true
  }
  */
}
IgorJs.addOperation("feature.unlock", FeatureUnlock)