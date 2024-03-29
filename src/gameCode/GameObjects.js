import {IgorUtils as IgorJs} from "IgorJs/main"

/* *
 *  Adding workshop entities from player inventory
 */

const PlayerEntity = (params, newObj, Igor) => {
  newObj.buffers = {}
  //? Copy static data onto entity,
  //? surely there's a better way to do this...
  Object.assign(newObj, Igor.data.entity[params.name])
  newObj.size = newObj.space
  newObj.space = undefined
  if(newObj.subType=="miner" || newObj.subType=="crafter") {
    newObj.buffers.out = Igor.newComponent("entity.buffer", {dir: 'out'}, newObj)
  }
  if(newObj.subType=="crafter" || newObj.subType=="research") {
    if(newObj.subType=="research") {
      newObj.buffers.in = Igor.newComponent("entity.buffer", {staticStacks: newObj.inputs, dir: 'in'}, newObj)
      newObj.research_timer = null
      newObj.$_tags.push("researchTicker", true)
    } else {
      newObj.buffers.in = Igor.newComponent("entity.buffer", { dir: 'in'}, newObj)
    }
  }
  newObj.order = params.idx
  return [newObj]
}
PlayerEntity._delete = (target, Igor) => {
  target.buffers.in  && Igor.deleteObject(target.buffers.in)
  target.buffers.out && Igor.deleteObject(target.buffers.out)
  Igor.getNamedObject("global").land.used -= Igor.data.entity[target.name].space
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
    let buffer = Igor.getId(entity.buffers.in)
    buffer?.upgrades.loader?.count && buffer.$_tags.push("tick", "processing")
    entity.research_time = research.cost.time * Igor.getStatic("config.TICKS_PER_SECOND") * entity.researching_speed
    entity.research_timer = entity.research_time
    return
  }
  if(entity.research_timer) { --entity.research_timer }
  if(entity.research_timer<=0) {
    Igor.processTEMP(research, "research.update", {})
    entity.research_timer = NaN
  }
  Igor.view.signaler.signal("bufferUpdate")
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
  if(entity.process_timer<=0) {
    let buffer = Igor.getId(entity.buffers.out)
    let added = Igor.processTEMP(buffer, "inventory.add", {itemStacks: entity.buffers.stalled || entity.processing.results || {name: entity.processing.mining_results, count: 1}})
    //console.log(added)
    if(added.complete) {
      entity.process_timer = NaN
      //Backwards linking... :(
      //buffer = Igor.getId(entity.buffers.in)
      //buffer?.upgrades.loader?.count && buffer.$_tags.push("tick", "processing")
      //buffer = Igor.getId(entity.buffers.out)
      //buffer?.upgrades.loader?.count && buffer.$_tags.push("tick", "processing")
    } else {
      entity.$_tags.delete("tick")
    }
  }
  Igor.view.signaler.signal("bufferUpdate")
}
IgorJs.defineObj("player.entity", PlayerEntity, {tick: EntityProcessTicker})
IgorJs.addObjectTickHandler("player.entity", EntityResearchTicker, "researchTicker", {chain: ["tick", "researchTicker"], num: 3})


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
    obj.at.entity.process_ticks = obj.which.process.mining_time / obj.at.entity.mining_speed * Igor.getStatic("config.TICKS_PER_SECOND")
    obj.at.entity.process_timer = obj.at.entity.process_ticks
  } else if (obj.type.class=="crafting") {
    obj.at.entity.process_ticks = obj.which.process.crafting_speed / obj.at.entity.crafting_speed * Igor.getStatic("config.TICKS_PER_SECOND")
    if(obj.at.entity.buffers.in) {
      let buffer = Igor.getId(obj.at.entity.buffers.in)
      if(buffer.stacks<obj.which.process.ingredients.length) { return Igor.view.warnToast("Recipe exceedes machines ingredient limit") }
      obj.which.process.ingredients.forEach( (item, idx) => {buffer.items[idx] = {name: item.name, count: 0}; })
    }
    if(obj.at.entity.buffers.out) {
      let buffer = Igor.getId(obj.at.entity.buffers.out)
      if(buffer.stacks<obj.which.process.results.length) { return Igor.view.warnToast("Recipe exceedes machines results limit") }
      obj.which.process.results.forEach( (item, idx) => {buffer.items[idx] = {name: item.name, count: 0};})
    }
    obj.at.entity.process_timer = NaN
  }
}
IgorJs.provide_CCC("entity.setProcess", EntitySetProcess, EntitySetProcessSig)

function EntityClearProcess(entity, args, returnObj, Igor) {
  if(entity.buffers.in) {
    if(entity.process_timer) {
      Igor.processTEMP("player.inventory", "inventory.add", {itemStacks: entity.processing.ingredients})
    }
    let buffer = Igor.getId(entity.buffers.in)
    Igor.processTEMP("player.inventory", "inventory.add", {itemStacks: buffer.items})
    //! If args.returnTo is full, 'inventory.add' will fail silently
    buffer.items.length = 0
    buffer.xferStack = 0
    buffer.stalled = false
  }
  if(entity.buffers.out) {
    let buffer = Igor.getId(entity.buffers.out)
    Igor.processTEMP("player.inventory", "inventory.add", {itemStacks: buffer.items})
    //! If args.returnTo is full, 'inventory.add' will fail silently
    buffer.items.length = 0
    buffer.xferStack = 0
    buffer.stalled = false
  }
  if(entity.buffers.stalled) {
    Igor.processTEMP("player.inventory", "inventory.add", {itemStacks: entity.buffers.stalled})
    entity.buffers.stalled = null
  }
  entity.processing = null
}
IgorJs.addOperation("entity.clearProcess", EntityClearProcess)


/*
  Buffers
 */
IgorJs.setStatic("entityBuffer.sizeExpansionCost", [{name: "iron-chest", count: 1}])
IgorJs.setStatic("entityBuffer.xferExpansionCost", [{name: "inserter",   count: 1}])

const NewEntityBuffer = (params, newObj, Igor) => {
  newObj.upgrades = {
    maxBuffers: 6 || params.maxBuffers
    ,maxInserters: 10 || params.maxInserters
  }
  newObj.maxStacks = params.staticStacks?.length || params.stacks || 1
  newObj.stackSize = params.stackSize || 5
  newObj.items = (params.staticStacks?.map((x) => {return {name: x, count: 0}})) || []
  newObj.xfer = 0
  newObj.xferTicks = 120
  newObj.xferStack = 0
  newObj.busShift = 0
  newObj.xferTimer = NaN
  newObj.restrictable = params.restrictable || false
  newObj.connection = null
  newObj.dir = params.dir
  newObj.active = false
  return [newObj]
}
NewEntityBuffer._delete = (obj, Igor) => {
  let inv = Igor.getNamedObject("player.inventory")
  let land = Igor.getNamedObject("global").land
  if(obj.upgrades.bufferSize?.count) {
    if(obj.$_parent) { Igor.getId(obj.$_parent).size -= obj.upgrades.bufferSize.count }
    land.used -= obj.upgrades.bufferSize.count
    Igor.processTEMP(inv, "inventory.add", {itemStacks: Igor.getStatic("entityBuffer.sizeExpansionCost"), multi: obj.upgrades.bufferSize.count })
  }
  if(obj.upgrades.loader?.count) {
    if(obj.$_parent) { Igor.getId(obj.$_parent).size -= obj.upgrades.loader.count }
    land.used -= obj.upgrades.loader.count
    Igor.processTEMP(inv, "inventory.add", {itemStacks: Igor.getStatic("entityBuffer.xferExpansionCost"), multi: obj.upgrades.loader.count })
  }
}
const EntityBufferActions = {}
EntityBufferActions.Collect = (obj, Igor) => {
  let buffer = Igor.getId(obj.which.buffer)
  let idx = buffer.items.findIndex( (x) => { return x.name==obj.item.name })
  if(idx==-1) { console.warn("Didnt' find the right index"); debugger }
  if(buffer.items[idx].count===0) return
  Igor.processTEMP("player.inventory", "inventory.add", {itemStacks: buffer.items[idx]})
  buffer.items[idx].count = 0

  Igor.getId(buffer.$_parent).$_tags.push("tick", "processing")
  Igor.view.signaler.signal("bufferUpdate")
  buffer.upgrades.loader?.count && buffer.$_tags.push("tick", "processing")
}
EntityBufferActions.Collect.signature = {
  which: 'buffer',
  item: 'name',
}
EntityBufferActions.Collect.CC_provide = "entity.bufferCollect"


EntityBufferActions.Fill = (obj, Igor) => {
  let buffer = Igor.getId(obj.which.buffer)
  let idx = buffer.items.findIndex( (x) => { return x.name==obj.item.name})
  if(idx==-1) { console.warn("Didnt' find the right index"); debugger }
  let avail = Igor.processTEMP("player.inventory", "inventory.total", {name: buffer.items[idx].name})
  if(avail===0) return
  let toMove = obj.service.rounder.calc(buffer.items[idx].count, buffer.stackSize, avail)
  Igor.processTEMP("player.inventory", "inventory.consume", {itemStacks: {name: buffer.items[idx].name, count: toMove}})
  buffer.items[idx].count += toMove

  Igor.getId(buffer.$_parent).$_tags.push("tick", "processing")
  Igor.view.signaler.signal("bufferUpdate")
  buffer.upgrades.loader?.count && buffer.$_tags.push("tick", "processing")
}
EntityBufferActions.Fill.signature = {
  which: 'buffer',
  item: 'name',
  service: 'rounder',
}
EntityBufferActions.Fill.CC_provide = "entity.bufferFill"

EntityBufferActions.ClickCycle = (obj, Igor) => {
  // The purpose is to cycle between buffer_fill and buffer_collect
  let buffer = Igor.getId(obj.which.buffer)
  let itemElm = buffer.items.find((x)=> {return x.name==obj.item.name})
  debugger
}
EntityBufferActions.ClickCycle.signature = {
  which: 'buffer',
  item: 'name',
  service: 'rounder'
}
EntityBufferActions.ClickCycle.CC_provide = "entity.bufferCycle"


IgorJs.setStatic("entity.buffer.BUFFER_SIZE",  [5, 10, 10, 10, 20, 20, 20])
IgorJs.setStatic("entity.buffer.BUFFER_SIZE.MAX", 25)

EntityBufferActions.Upgrade = (obj, Igor) => {
  let buffer =  Igor.getId(obj.which.buffer)
  let land = Igor.getNamedObject("global").land
  if(obj.type.string=="autoload") {
    let cost = obj.cost?.stacks || {name: "inserter", count: 1}
    if(buffer.upgrades.loader?.count>=10) return Igor.view.warnToast("Loaders full", null, "fa-fill")
    if(land.used>=land.total) return Igor.view.warnToast("No available land", null, "fa-mountain")
    if(!Igor.processTEMP(obj.player.inventory, "inventory.consume", {itemStacks: cost})) return Igor.view.warnToast("Inserter required")

    land.used++
    if(buffer.$_parent) { Igor.getId(buffer.$_parent).size++ }
    !buffer.upgrades.loader && (buffer.upgrades.loader = {count: 0})
    buffer.upgrades.loader.count++
    buffer.xferTimer || (buffer.xferTimer = buffer.xferTicks)
    buffer.xfer++
    buffer.active = true
    buffer.$_tags.push("tick", "processing")
  } else if(obj.type.string=="buffer") {
    let cost = obj.cost?.stacks || {name: "iron-chest", count: 1}
    if(buffer.upgrades.bufferSize?.count>=buffer.upgrades.maxBuffers) return Igor.view.warnToast("Chests full", null, "fa-fill")
    if(land.used>=land.total) return Igor.view.warnToast("No available land", null, "fa-mountain")
    if(!Igor.processTEMP(obj.player.inventory, "inventory.consume", {itemStacks: cost})) return Igor.view.warnToast("Cannot consume upgrade costs", )

    land.used++
    if(buffer.$_parent) {
      let parent = Igor.getId(buffer.$_parent)
      parent.size++
      parent.$_type!="player.entity" && !buffer.restricable &&  Igor.processTEMP(buffer, "inventory.compress", {})
      //TODO I hate this, it's cross polution
      if(parent.clogged) {
        parent.clogged = false
        parent.$_tags.push("tick", "processing")
      }
    }
    !buffer.upgrades.bufferSize && (buffer.upgrades.bufferSize = {count: 0})
    buffer.upgrades.bufferSize.count++
    buffer.stackSize += Igor.getStatic("entity.buffer.BUFFER_SIZE")[buffer.upgrades.bufferSize.count-1] || Igor.getStatic("entity.buffer.BUFFER_SIZE.MAX")

    Igor.getId(buffer.$_parent).$_tags.push("tick", "processing")
  }
}
EntityBufferActions.Upgrade.signature = {
  which: "buffer",
  type: "string",
  player: 'inventory',
  "cost.stacks": {optional: true}
}
EntityBufferActions.Upgrade.CC_provide = "entity.bufferUpgrade"
EntityBufferActions.SetRestrictions = (target, args, returnObj, Igor) => {
  if(!target.restrictable) returnObj._result = false
  //check through the list and return things to player buffer
  let connected = []
  let emptyIdxs = []
  target.maxStacks = args.list.length
  for(let idx=0; idx<target.items.length; idx++)  {
    let x = target.items[idx]
    if(!x) {emptyIdxs.push(idx); continue}
    if(!args.list.includes(x.name)) {
      if(x.count>0) Igor.processTEMP("player.inventory", "inventory.add", {itemStacks: x})
      target.items.splice(idx, 1)
      emptyIdxs.push(idx)
    } else {
      connected.push(x.name)
      x.restricted = true
    }
  }
  //console.log(emptyIdxs)
  args.list.forEach( (x) => {
    if(!connected.includes(x)) {
      if(emptyIdxs.length>0) {
        target.items.splice(emptyIdxs.splice(0,1), 1, {name: x, count: 0, restricted:true})
        //console.log("restricted splice "+x)
      } else {
        target.items.push({name: x, count: 0, restricted: true})
        //console.log('push restricted:'+x)
      }
    }
  })
  if(target.busShift>target.items.length) target.busShift = 0
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
        target.items.splice(idx, 1)
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
  //TODO need to handle different item stacks
  // setup filter priorities for output 
  let loopStart = target.busShift
  if(args.toBus) {
    let loops = 0
    while(args.xferCount>0 && loops<target.items.length) {
      if(!target.items[target.busShift]) {
        ++target.busShift>=target.items.length && (target.busShift=0)
        if(target.busShift==loopStart) return
        continue
      }
      let toAdd = Igor.processTEMP(target, "inventory.total", {name: target.items[target.busShift].name})
      let added = Igor.processTEMP(args.toBus, "inventory.add", {itemStacks: [{name: target.items[target.busShift].name, count: Math.min(args.xferCount, toAdd)}]})
      if(added.complete) {
        Igor.processTEMP(target, "inventory.consume", {itemStacks: [{name: target.items[target.busShift].name, count: args.xferCount}]})
        args.xferCount=0
      } else if(toAdd-added.part[0].count==0) {
        //! This point breaks the loop
        ++target.busShift==target.items.length && (target.busShift=0)
        returnObj.full = true
        return
      } else {
        Igor.processTEMP(target, "inventory.consume", {itemStacks: [{name: target.items[target.busShift].name, count: toAdd-added.part[0].count}]})
        args.xferCount = added.part[0].count
      }
      ++target.busShift==target.items.length && (target.busShift=0)
    }
    returnObj.complete = true
  } else if (args.fromBus) {
    let loops = 0
    while(args.xferCount>0) {
      if(!target.items[target.busShift]) {
        ++target.busShift>=target.items.length && (target.busShift=0)
        if(target.busShift==loopStart) return
        continue
      }
      let space = target.stackSize -  target.items[target.busShift].count
      if(space) {
        let consumed = Igor.processTEMP(args.fromBus, "inventory.consume", {itemStacks: [{name: target.items[target.busShift].name, count: Math.min(args.xferCount, space)}], partial: true})
        if(consumed[0].count>0) {
          Igor.processTEMP(target, "inventory.add", {itemStacks: [{name: target.items[target.busShift].name, count: consumed[0].count}]})
          args.xferCount-=consumed[0].count
        }
      }
      if(++loops==target.items.length) {
        returnObj.full = true
        return
      }
      ++target.busShift==target.items.length && (target.busShift=0)
    }
    returnObj.complete = true
  } else {
    console.warn("BusXfer called __ no bus target")
  }
}
EntityBufferActions.BusXfer.Igor_operation = "buffer.busXfer"

EntityBufferActions.BufferStalled = (buffer, args, returnObj, Igor) => {
  /* more advanced stall handling, then return*/
  //console.log('stalled start'+buffer.items.length)
  buffer.stalled = true
  buffer.xferTimer = Math.floor(buffer.xferTicks/6)
  ++buffer.xferStack==buffer.items.length && (buffer.xferStack=0)
}
EntityBufferActions.BufferStalled.Igor_operation = "buffer.setStall"

EntityBufferActions.tick = (buffer, tickData, Igor) => {
  if(buffer.items.length==0 || !buffer.active) return
  if(buffer.xferTimer>0) return buffer.xferTimer--
  //Surely a more elegant way to run this...
  //TODO need to alter stacks if not completely xferd
  if(buffer.dir=='in') {
    let toAdd = Math.min(buffer.xfer, buffer.stackSize-buffer.items[buffer.xferStack].count)
    if(toAdd==0) return Igor.processTEMP(buffer, "buffer.setStall")
    let acquired = Igor.processTEMP(
                    "player.inventory"
                    ,"inventory.consume"
                    ,{itemStacks: {
                        name: buffer.items[buffer.xferStack].name
                        ,count: toAdd
                     }, partial: true})
    if(acquired[0].count==0) return Igor.processTEMP(buffer, "buffer.setStall")
    buffer.items[buffer.xferStack].count += acquired[0].count
    buffer.xferTimer = (buffer.xferTicks * acquired[0].count /buffer.xfer)
  } else {
    let xfer = buffer.items[buffer.xferStack]
    let added = Igor.processTEMP(
                   "player.inventory"
                   ,"inventory.add"
                   ,{itemStacks: { 
                      name: xfer.name
                      ,count: Math.min(xfer.count, buffer.xfer)
                   }, stackLimit: 1})
    //console.log(added)
    if(!added.complete) return Igor.processTEMP(buffer, "buffer.setStall")
    xfer.count -= Math.min(xfer.count, buffer.xfer)
    buffer.xferTimer = buffer.xferTicks
  }
  ++buffer.xferStack==buffer.items.length && (buffer.xferStack=0)
  buffer.stalled = false
  Igor.getId(buffer.$_parent).$_tags.push("tick", "processing")
  Igor.view.signaler.signal("bufferUpdate")
}

IgorJs.defineObj("entity.buffer", NewEntityBuffer, EntityBufferActions)



/*
 *  Research Related
 *
 */

const SetResearchSig = {
  "which": "tech",
}
const SetResearch =  (obj, Igor, self) => {
  let research = Igor.getNamedObject("global").research
  research.progressing = obj.which.tech

  if(!research[obj.which.tech.name]) {
    research[obj.which.tech.name] = {
      completeUnits: 0
    }
  }
}

IgorJs.provide_CCC("research.set", SetResearch, SetResearchSig)

const ClearResearchSig = {
}
const ClearResearch = (obj, Igor, self) => {
  let research = Igor.getNamedObject("global").research
  research.progressing = null
  Igor.view.signaler.signal("techResearched")
}
IgorJs.provide_CCC("research.clear", ClearResearch, ClearResearchSig)

//Returns extra portion, but I don't have a good solution
//To adding it back to the factoryBlock
const ResearchUpdate = (obj, args, returnObj, Igor) => {
  let global = Igor.getNamedObject("global")
  global.research[obj.name].completeUnits += args.count || 1
  if(global.research[obj.name].completeUnits>=obj.cost.count) {
    Igor.view.goodToast("Research Complete: "+obj.name, null, "fa-filter fa-rotate-180")
    returnObj._result = global.research[obj.name].completeUnits-obj.cost.count
    Igor.getNamedObject("research").progressing = null
    obj.researched = true
    global.research[obj.name].complete = true
    obj.unlocks.forEach( (item) => {
      if(item.feature) {
        Igor.checkAndEmit("system_update", item.feature, item)
      } else if(item.type=="recipe") {
        Igor.getNamedObject("global").unlocked_recipes.push(item.name)
      } else {
        Igor.processTEMP(null, item.type+".unlock", {item})
     }
    })
    let cost = obj.cost.ingredients.map(([name, qty]) => {return {name, count:qty}})
    //TODO! need to update this to respond to different tech trees
    global.player.workshop.entities.forEach( (x) => {
      let ent = Igor.getId(x)
      if(ent.name=="lab") {
        Igor.processTEMP(ent.buffers.in, "inventory.add", {itemStacks: cost, force: true})
        ent.research_timer = NaN
      }
    })
    global.facBlocks?.techBlocks.forEach( (x) => {
      if(args.me==x) return
      let block = Igor.getId(x)
      if(block.research_consumed) {
        Igor.processTEMP(block.buffers.in, "inventory.add", {itemStacks: cost, force: true, multi: research_consumed})
        block.research_consumed = 0 
        block.research_ticks = NaN
      }
    })
    Igor.view.signaler.signal("techResearched")
  }
}

IgorJs.addOperation("research.update", ResearchUpdate)

const RecipeUnlock = (obj, args, returnObj, Igor) => {
  //Igor.data.recipe[obj].enabled = true
  
}
IgorJs.addOperation("recipe.unlock", RecipeUnlock)
IgorJs.addOperation("global.unlock", (notUsed, args, returnObj, Igor) => {
  let global = Igor.getNamedObject("global")
  let obj = Object.walkPath(global, args.item.path)
  if(!obj) return console.warn("Could not find object path", args.item.path)
  switch(args.item.operation) {
    case "add":
      obj[args.item.key] += args.item.value
      break;
    case "sub":
      obj[args.item.key] -= args.item.value
      break;
    case "multiply":
      obj[args.item.key] *= args.item.value
      break;
    case "divide":
      obj[args.item.key] /= args.item.value
      break;
    case "exp":
      obj[args.item.key] = Math.pow(obj, args.item.value)
      break;
    case "set":
      obj[args.item.key] = args.item.value
      break;
  }
})