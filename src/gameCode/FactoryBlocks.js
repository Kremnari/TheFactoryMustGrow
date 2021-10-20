import {IgorUtils as IgorJs} from "IgorJs/main"
import {ChameleonViewer as ChameJs} from "Chameleon/main"
import M from "minimatch"

IgorJs.setStatic("itemStackCost.busExpansion", [{name: "iron-chest", count: 2}])
IgorJs.setStatic("itemStackCost.busProcessing", [{name: "inserter", count: 2}])
IgorJs.setStatic("itemStackCost.resBlock_foundation", [{name: "stone", count: 5}, {name: "transport-belt", count: 4}])
IgorJs.setStatic("itemStackCost.resBlock_miner", [{name: "burner-mining-drill", count: 1}])


const FactoryBlock = {}
FactoryBlock.New = (params, newObj, Igor) => {
    let features = Igor.getNamedObject("global").activeFeatures.factoryBlocks
    newObj.name = params.name.string
    newObj.size = 50
    newObj.complexity = 10
    newObj.connections = {
        sources: []
        ,drains: []
        ,maxSources: features.blocksMaxSources || 1
        ,maxDrains: features.blocksMaxDrains || 1
    }
    let bufferSettings = {
        restrictable: true,
        stacks: 1,
        stackSize: 10,
    }
    newObj.buffers = {}
    newObj.buffers.in = Igor.newComponent("entity.buffer", bufferSettings, newObj)
    newObj.buffers.internal = Igor.newComponent("entity.buffer", bufferSettings, newObj)
    newObj.buffers.out = Igor.newComponent("entity.buffer", bufferSettings, newObj)
    newObj.processingList = {}

    newObj.subIcon = "stone"
    newObj.factoryLines = []
    newObj.factoryLines.push(
        Igor.newComponent("FactoryLine", {
            source: newObj.buffers.in
            ,drain: newObj.buffers.out
            ,internal: newObj.buffers.internal
            ,parent: newObj.$_id
            ,order: newObj.factoryLines.length
        })
    )
    newObj.$_tags.push("tick", "processing")
    return [newObj]
}
FactoryBlock.New.signature = { }
FactoryBlock.New._signal = "facBlockUpdate"
FactoryBlock.NewCCC = (params, Igor) => {
    Igor.addNewObject(Igor.getNamedObject("global").facBlocks.blocks, "FactoryBlock", params)
}
FactoryBlock.NewCCC.signature = {
    name: "string"
}
FactoryBlock.NewCCC.CC_provide = "facBlock.newBlock"
FactoryBlock.NewBusCCC = (params, Igor) => {
    Igor.addNewObject(Igor.getNamedObject("global").facBlocks.buses, "FactoryBus", params)
}
FactoryBlock.NewBusCCC.signature = {
    name: "string"
}
FactoryBlock.NewBusCCC.CC_provide = "facBlock.newBus"
FactoryBlock.NewResBlock = (params, Igor) => {
    if(Igor.addNewObject(Igor.getNamedObject("global").facBlocks.resBlocks, "ResourceBlock", params)) {
        Igor.getNamedObject("global").land.res_patches_used++
    }
}
FactoryBlock.NewResBlock.signature = {
    name: "string",  //WIP should become resource vein
}
FactoryBlock.NewResBlock.CC_provide = "facBlock.newResBlock"
FactoryBlock.NewTechBlock = (params, Igor) => {
    Igor.addNewObject(Igor.getNamedObject("global").facBlocks.techBlocks, "TechBlock", params)
}
FactoryBlock.NewTechBlock.signature = {
    name: "string"
}
FactoryBlock.NewTechBlock.CC_provide = "facBlock.newTechBlock"
FactoryBlock.__tooltips = (obj, args, retObj, Igor) => {
    let who = Igor.getId(obj) || null
    let data = []
    let tip = ""
    switch(args.which) {
        case "resBlock":
            data.landCost = "resource"
            data.complexity = 5
            tip = "Next ResourceBlock"
            break;
        case "techBlock":
            data.landCost = 50
            data.complexity = 5
            tip = "Next Tech Block"
            break;
        case "busLine":
            data.landCost = 25
            data.complexity = 5
            tip = "Next Bus Line"
            break;
        case "factoryBlock":
            data.landCost = 50
            data.complexity = 10
            tip = "Next Factory Block"
            break;
        case "addLine":
            data.landCost = "??"
            data.complexity = "??"
            tip = "New Factory Line"
            break;
    }
    retObj._result = {tool: "blockCosts", tip, data}
}
FactoryBlock.__tooltips.CC_utility = "facBlock.__tooltips"
FactoryBlock.tick = (obj, tickData, Igor) => {
    // Process I/O buffers
    if(obj.connections.drains) {
        //console.log('process drains: push mode')
    }    
}
FactoryBlock.tick.signature = { }
FactoryBlock.SelectSubIcon = (obj, params, Igor) => {
    obj.at.factoryBlock.subIcon = obj.which.icon
}
FactoryBlock.SelectSubIcon.signature = {
    at: "factoryBlock",
    which: "icon"
}
FactoryBlock.SelectSubIcon.CC_provide = "factoryBlock.selectSubIcon"
FactoryBlock.ConsumeStacks = (target, args, returnObj, Igor) => {
    //WIP
    let consumable = args.itemStacks.reduce( (accum_multi, x) => {
        if(accum_multi==-1) return -1
        let avail = Igor.processTEMP(Igor.getId(target.processingList[x.name].at).items, "inventory.total", {name: x.name})
        return avail<x.amount ? -1 : Math.min(accum_multi, Math.floor(avail/x.amount))
    }, args.multi)
    if(consumable>=1) {
        args.itemStacks.forEach( (x) => {
            Igor.processTEMP(Igor.getId(target.processingList[x.name].at), "inventory.consume", {itemStacks: x, multi: consumable})
        })
    }
    returnObj._result = consumable
}
FactoryBlock.ConsumeStacks.signature = {}
FactoryBlock.ConsumeStacks.Igor_operation = "factoryBlock.consumeStacks"
FactoryBlock.ProduceStacks = (target, args, returnObj, Igor) => {
    let depositable = args.itemStacks.reduce( (accum_multi, x) => {
        if(accum_multi==-1) return -1 //Shortcircuit
        let buffer = Igor.getId(target.processingList[x.name].at)
        let avail = buffer.stackSize - Igor.processTEMP(buffer.items, "inventory.total", {name: x.name})
        return avail<x.amount ? -1 : Math.min(accum_multi, Math.floor(avail/x.amount))
    }, args.multi)
    if(depositable>=1) {
        args.itemStacks.forEach( (x) => {
            Igor.processTEMP(Igor.getId(target.processingList[x.name].at), "inventory.add", {itemStacks: x, multi: depositable})
        })
    }
    returnObj._result = depositable
}
FactoryBlock.ProduceStacks.signature = {

}
FactoryBlock.ProduceStacks.Igor_operation = "factoryBlock.produceStacks"
FactoryBlock.SetConnection =  (obj, Igor) => {
    let callFn = obj.dir.string=="source" ? "Drain" : "Source"
    if(obj.at.factoryBlock.connections[obj.dir.string+'s']== obj.to_which.factoryBus) {
        Igor.processTEMP(obj.to_which.factoryBus, "factoryBus.clear"+callFn, {who: obj.at.factoryBlock.$_id})
        return
    }
    //Clear prior connection
    //Can execute on factoryBus...
    if(Igor.processTEMP(obj.to_which.factoryBus, "factoryBus.add"+callFn, {who: obj.at.factoryBlock.$_id}) ) {
        obj.at.factoryBlock.connections[obj.dir.string+'s'] = obj.to_which.factoryBus
    }
    Igor.processTEMP(obj.to_which.factoryBus, "factoryBus.connectTo", {})
}
FactoryBlock.SetConnection.signature = {
    at: "factoryBlock",
    to_which: "factoryBus",
    dir: "string"
}
FactoryBlock.SetConnection.CC_provide = "factoryBlock.setConnection"

FactoryBlock.AddFactoryLine = (obj, Igor) => {
    // obj.at.factoryBlock.complexity
    // Inventory.consume some cost
    obj.at.factoryBlock.factoryLines.push(
        Igor.newComponent("FactoryLine", {
            source: obj.at.factoryBlock.buffers.in
            ,drain: obj.at.factoryBlock.buffers.out
            ,internal: obj.at.factoryBlock.buffers.internal
            ,parent: obj.at.factoryBlock.$_id
            ,order: obj.at.factoryBlock.factoryLines.length || 0
        })
    )
    // obj.at.factoryBlock.complexity++
    Igor.view.signaler.signal("generalUpdate")
}
FactoryBlock.AddFactoryLine.signature = {
    at: "factoryBlock"
}
FactoryBlock.AddFactoryLine.CC_provide = "factoryBlock.addLine"
FactoryBlock.SetProcessItems = (target, args, returnObj, Igor) => {
    console.log('set process')
    args.lists.consume.forEach( (x) => {
        if(!target.processingList[x]) {
            target.processingList[x] = {at: target.buffers.in, consume: [args.listId]}
        } else if(target.processingList[x].at == target.buffers.internal) {
            target.processingList[x].consume.push(args.listId)
        } else if(target.processingList[x].at == target.buffers.out) {
            // Move to internal
            target.processingList[x].at = target.buffers.internal
            target.processingList[x].consume = []
            target.processingList[x].consume.push(args.listId)
        } else {
            //x is found and at input already
        }
    })
    args.lists.produce.forEach( (x) => {
        if(!target.processingList[x]) {
            target.processingList[x] = {at: target.buffers.out, produce: [args.listId]}
        } else if(target.processingList[x].at==target.buffers.internal) {
            target.processingList[x].produce.push(args.listId)
        } else if(target.processingList[x].at==target.buffers.in) {
            //move it
            target.processingList[x].at = target.buffers.internal
            target.processingList[x].produce = []
            target.processingList[x].produce.push(args.listId)
        }
    })
    //TODO this doesn't respect stack limits on the buffers
    Igor.processTEMP(target.buffers.in, "buffer.restrictList", {list: Object.keys(target.processingList).filter((x)=> {return target.processingList[x].at==target.buffers.in})})
    Igor.processTEMP(target.buffers.internal, "buffer.restrictList", {list: Object.keys(target.processingList).filter((x)=> {return target.processingList[x].at==target.buffers.internal})})
    Igor.processTEMP(target.buffers.out, "buffer.restrictList", {list: Object.keys(target.processingList).filter((x)=> {return target.processingList[x].at==target.buffers.out})})
}
FactoryBlock.SetProcessItems.Igor_operation = "factoryBlock.setProcessItems"
FactoryBlock.ClearProcessItems = (target, args, returnObj, Igor) => {
    args.lists.consume.forEach( (x) => {
        let which = target.processingList[x]
        which.consume.splice(which.consume.indexOf(args.listId),1)
        if(which.consume.length==0) {
            if(which.at==target.buffers.internal && which.produce?.length>0) {
                which.at = target.buffers.out
            } else {
                delete target.processingList[x]
            }
        }
    })
    args.lists.produce.forEach( (x) => {
        let which = target.processingList[x]
        which.produce.splice(which.produce.indexOf(args.listId),1)
        if(which.produce.length==0) {
            if(which.at==target.buffers.internal && which.consume?.length>0) {
                which.at = target.buffers.in
            } else {
                delete target.processingList[x]
            }
        }
    })
    Igor.processTEMP(Igor.getId(target.buffers.in), "buffer.restrictList", {list: Object.keys(target.processingList).filter((x)=> {return target.processingList[x].at=="in"})})
    Igor.processTEMP(Igor.getId(target.buffers.internal), "buffer.restrictList", {list: Object.keys(target.processingList).filter((x)=> {return target.processingList[x].at=="internal"})})
    Igor.processTEMP(Igor.getId(target.buffers.out), "buffer.restrictList", {list: Object.keys(target.processingList).filter((x)=> {return target.processingList[x].at=="out"})})
}
FactoryBlock.ClearProcessItems.Igor_operation = "factoryBlock.clearProcessItems"
IgorJs.defineObj("FactoryBlock", FactoryBlock.New, FactoryBlock)

/*
    Factory Line
*/
const FactoryLine = {}
FactoryLine.New = (params, newObj, Igor) => {
    newObj.prepped = 0
    newObj.built = 0
    newObj.buildingType = null
    newObj.recipe = null
    newObj.itemTargets = null
    newObj.processing_time = -1
    newObj.connections = {
        source: params.source,
        drain: params.drain,
        internal: params.internal
    }
    newObj.order = params.order
    newObj.$_parent = params.parent
    return [newObj]
}
FactoryLine.New.signature = {
    source: 'entity.buffer',
    drain: 'entity.buffer',
    internal: 'entity.buffer'
}
FactoryLine.New._signal = "facBlockUpdate"
FactoryLine.__delete = (obj, Igor) => {
    console.log('got it!')
}
FactoryLine.__delete.Igor_operation = "FactoryLine.delete"
FactoryLine.SetType = (obj, Igor) => {
    obj.at.factoryLine.buildingType = obj.which.building.name
    obj.at.factoryLine.crafting_categories = obj.which.building.crafting_categories
    //Create Lookup by building type
    obj.at.factoryLine.foundationCost = [
        {name: "stone", count: 5}
    ]
}
FactoryLine.SetType.signature = {
    at: ["factoryLine", "factoryBlock"],
    which: "building"
}
FactoryLine.SetType.CC_provide = "factoryLine.setBuilding"
FactoryLine.Prep = (obj, Igor) => {
    if(!obj.at.factoryLine.foundationCost) return
    if(Igor.processTEMP(obj.player.inventory, "inventory.consume", {itemStacks: obj.at.factoryLine.foundationCost})) {
        obj.at.factoryLine.prepped++
        obj.at.factoryBlock.size +=10  //# magic number
        obj.at.factoryBlock.complexity += 5  //# magic number
    } else {
        Igor.view.warnToast("Cannot consume foundation costs")
    }
}
FactoryLine.Prep.signature = {
    at: ["factoryLine", "factoryBlock"],
    player: "inventory"
}
FactoryLine.Prep.CC_provide = "factoryLine.prep"
FactoryLine.Expand = (obj, Igor) => {
    if(obj.at.factoryLine.prepped==0) return
    if(Igor.processTEMP(obj.player.inventory, "inventory.consume", {itemStacks: {name: obj.at.factoryLine.buildingType, count: 1}})) {
        obj.at.factoryLine.built++
        obj.at.factoryLine.prepped--
        if(obj.at.factoryLine.recipe) {
            if(Number.isInteger(obj.at.factoryLine.processing_ticks)) {
                let consumed = Igor.processTEMP(obj.at.factoryBlock, "factoryBlock.consumeStacks", {itemStacks: obj.at.factoryLine.recipe.ingredients, multi: 1})
                if(consumed) {
                    obj.at.factoryLine.processing_ticks *= (obj.at.factoryLine.built-1)/obj.at.factoryLine.built
                    obj.at.factoryLine.processing_count++
                }
            }
            obj.at.factoryLine.$_tags.push("tick", "processing")
        }
    } else {
        Igor.view.warnToast("Building not in inventory")
    }
}
FactoryLine.Expand.signature = {
    at: ["factoryLine", "factoryBlock"],
    player: 'inventory'
}
FactoryLine.Expand.CC_provide = "factoryLine.addBuilding"

/*
*/
FactoryLine.SetRecipe = (obj, Igor) => {
    if(obj.at.factoryLine.recipe) {
        if(obj.at.factoryLine.recipe!==obj.which.recipe) {
        Igor.processTEMP(
            obj.at.factoryBlock
            ,"factoryBlock.clearProcessItems"
            ,{lists: obj.at.factoryLine.processList})
        } else {
            obj.at.factoryLine.recipe = null
            obj.at.factoryLine.$_tags.delete("tick")
            return
        }
    }
    let recipe = Igor.data.recipe[obj.which.recipe]
    let lists = {consume: recipe.ingredients.map( x => x.name), produce: recipe.results.map( x => x.name)}
    let FB_set = Igor.processTEMP(
                    obj.at.factoryBlock
                    ,"factoryBlock.setProcessItems",
                    {lists, listId: obj.at.factoryLine.$_id})
    if(FB_set) {
        obj.at.factoryLine.processList = lists
        obj.at.factoryLine.recipe = recipe // store full object, not argument from obj.which.recipe
        obj.at.factoryLine.processing_time = recipe.crafting_speed / Igor.data.entity[obj.at.factoryLine.buildingType].crafting_speed * Igor.getStatic("config.TICKS_PER_SECOND")
        obj.at.factoryLine.processing_ticks = NaN
        obj.at.factoryLine.built && obj.at.factoryLine.$_tags.push("tick", "processing")
        //Just wait till next tick to start processing the recipe
    } else {
        // Factory Block set failed...
        console.error("Couldn't set my items on the parent factoryBlock")
        debugger
    }
}
FactoryLine.SetRecipe.signature = {
    at: ["factoryLine", "factoryBlock"],
    which: "recipe",
    player: "inventory"
}
FactoryLine.SetRecipe.CC_provide = "factoryLine.setRecipe"
FactoryLine.__tooltips = (obj, args, ret, Igor) => {
    let who = Igor.getId(obj)
    let data = []
    let tip = ""
    switch(args.which) {
        case "foundation":
            data.push({name: "stone", count: 5})
            tip = "Foundation Cost"
            break;
    }
    ret._result = {tool: "stackArray", tip, data}
}
FactoryLine.__tooltips.CC_utility = "factoryLine.toolTips"
FactoryLine.tick = (entity, tickdata, Igor) => {
    if(entity.built==0 || !entity.processing_time || !entity.recipe) return  //TODO turn this into an "anti-tick" tag
    //consume from buffers if empty
    if(entity.delay) {
        if(--entity.delay==0) {
            entity.delay = null
        }
        return
    }
    if(Number.isNaN(entity.processing_ticks)) {

        let consumed = Igor.processTEMP(entity.$_parent, "factoryBlock.consumeStacks", {itemStacks: entity.recipe.ingredients, multi: entity.built})
        if(consumed> 0) {
            entity.processing_ticks = 0
            entity.processing_count = consumed
        } else {
            entity.delay = Math.ceil(entity.processing_time * 0.1)
        }
    } else if(entity.processing_ticks>=entity.processing_time) {
        let added = Igor.processTEMP(entity.$_parent, "factoryBlock.produceStacks", {itemStacks: entity.recipe.results, multi: entity.processing_count})
        if(added>0) {
            entity.processing_ticks=NaN
        } else {
            // Couldn't deposit all so... try again after a delay
            entity.delay = Math.ceil(entity.processing_time * 0.1)
        }
    } else {
        entity.processing_ticks++
    }

}

IgorJs.defineObj("FactoryLine", FactoryLine.New, FactoryLine)

/**
 *  * Factory Bus
 *  TODO: source/drains are managed from factoryBlocks
 *  TODO: Ticker to move things between buffers
 *  TODO: Upgrades and expansions
 * 
 */


const FactoryBus = {}
FactoryBus.New = (params, newObj, Igor) => {
    newObj.name = params.name.string
    newObj.size = 25
    newObj.complexity = 5
    newObj.connections = {
        sources: []
        ,drains: []
        ,maxSources: 0
        ,maxDrains: 0
    }
    newObj.processors = {
        source: {xferTicks: 120, xferTimer: 0, xferTarget: 0, xferQty: 0}
        ,drain: {xferTicks: 120, xferTimer: 0, xferTarget: 0, xferQty: 0}
        ,central: Igor.newComponent("entity.buffer", {stacks: 1, stackSize: 10 }, newObj.$_id)
    }
    newObj.clogged = false
    newObj.subIcon = "stone"
   // newObj.$_tags.push("tick", "processing")
    return [newObj]
}
FactoryBus.New._signal = "facBlockUpdate"
FactoryBus.SelectSubIcon = (obj, params, Igor) => {
    obj.at.factoryBus.subIcon = obj.which.icon
}
FactoryBus.SelectSubIcon.signature = {
    at: "factoryBus",
    which: "icon"
}
FactoryBus.SelectSubIcon.CC_provide = "factoryBus.selectSubIcon"
FactoryBus.ClearConnection = (target, args, returnObj, Igor) => {
    let conn = args.dir=="sources" ? "drains": "sources"
    let idx = target.connections[conn].findIndex( (x) => { return x.buffer==args.id })
    if(idx==-1) {
        console.log("couldn't find index")
        debugger
    }
    target.connections[conn].splice(idx, 1)
    target.processors[conn].xferTarget = 0;
}
FactoryBus.ClearConnection.Igor_operation = "factoryBus.clearConnection"
FactoryBus.ConnectTo = (obj, Igor) => {
    let bus = Igor.getId(obj.connectTo.factoryBus)
    let block = Igor.getId(obj.connectTo.block)
    if(obj.dir.string=="output") {
        //target drain, bus source
        if(obj.current.bus!=-1 && block.connections.drains.includes(obj.current.bus)) {
            let idx = block.connections.drains.indexOf(obj.current.bus)
            block.connections.drains.splice(idx, 1)
            let curr = Igor.getId(obj.current.bus)
            idx = curr.connections.sources.indexOf(block.$_id)
            curr.connections.sources.splice(idx, 1)
            curr.processors.source.xferTarget = 0
        }
        if(block.connections.drains.length<block.connections.maxDrains &&
            bus.connections.sources.length<bus.connections.maxSources) {
            block.connections.drains.push(obj.connectTo.factoryBus)
            bus.connections.sources.push(obj.connectTo.block)
        } else {
            Igor.view.warnToast("No available source connections")
        }
    } else {
        //target source, bus drain
        if(obj.current.bus!=-1 && block.connections.sources.includes(obj.current.bus)) {
            let idx = block.connections.sources.indexOf(obj.current.bus)
            block.connections.sources.splice(idx, 1)
            let curr = Igor.getId(obj.current.bus)
            idx = curr.connections.drains.indexOf(block.$_id)
            curr.connections.drains.splice(idx, 1)
            curr.processors.drain.xferTarget = 0
        }
        if(block.connections.sources.length<block.connections.maxSources &&
            bus.connections.drains.length<bus.connections.maxDrains) {
            block.connections.sources.push(obj.connectTo.factoryBus)
            bus.connections.drains.push(obj.connectTo.block)
        } else {
            Igor.view.warnToast("No available drain connections")
        }
    }
    Igor.view.signaler.signal("generalUpdate")
}
FactoryBus.ConnectTo.signature = {
    dir: "string",
    connectTo: ["factoryBus", "block"],
    current: "bus"
}
FactoryBus.ConnectTo.CC_provide = "factoryBus.connectTo"
FactoryBus.ExpandBus = (obj, Igor) => {
    let consumed = Igor.processTEMP(obj.player.inventory, "inventory.consume", {itemStacks: Igor.getStatic("itemStackCost.busExpansion")})
    if(!consumed) return Igor.view.warnToast("Unable to consume costs to expand bus")
    if(obj.dir.string=="source") {
        obj.at.factoryBus.connections.maxSources += 1
        obj.at.factoryBus.complexity += 5
        obj.at.factoryBus.size += 10
    } else if(obj.dir.string=="drain") {
        obj.at.factoryBus.connections.maxDrains += 1
        obj.at.factoryBus.size += 10
        obj.at.factoryBus.complexity += 5
    }
    if(obj.at.factoryBus.connections.maxSources && obj.at.factoryBus.connections.maxDrains) {
        obj.at.factoryBus.$_tags.push("tick", "processing")
    }
    let central = Igor.getId(obj.at.factoryBus.processors.central)
    central.maxStacks = Math.min(Math.ceil(obj.at.factoryBus.size/50), 15)
}
FactoryBus.ExpandBus.signature = {
    at: "factoryBus",
    dir: "string",
    player: "inventory"
} 
FactoryBus.ExpandBus.CC_provide = "factoryBus.expandBus"
FactoryBus.ExpandProcessing = (obj, Igor) => {
    let consumed = Igor.processTEMP(obj.player.inventory, "inventory.consume", {itemStacks: Igor.getStatic("itemStackCost.busProcessing")})
    if(!consumed) return Igor.view.warnToast("Unable to consume costs to expand bus")
    if(obj.dir.string=="source") {
        obj.at.factoryBus.processors.source.xferQty += 2
        obj.at.factoryBus.size += 10
        obj.at.factoryBus.complexity += 5
    } else if(obj.dir.string=="drain") {
        obj.at.factoryBus.processors.drain.xferQty += 2
        obj.at.factoryBus.size += 10
        obj.at.factoryBus.complexity += 5
    }
}
FactoryBus.ExpandProcessing.signature = {
    at: "factoryBus",
    dir: "string",
    player: "inventory"
}
FactoryBus.ExpandProcessing.CC_provide = "factoryBus.expandProcessing"
FactoryBus.__tooltips = (obj, args, ret, Igor) => {
    if(!obj) return
    let who = Igor.getId(obj)
    let data = []
    let tip = ""
    switch(args.which) {
        case "input_processing":
            data.push({name: "inserter", count: 2})
            tip = "Input Processing"
            break;
        case "expand_input_sources":
            data.push({name: "iron-chest", count: 2})
            who.connections.maxSources && data.push({name: "transport-belt", count: 5*who.connections.maxSources})
            tip = "Expand Source Points"
            break;
        case "output_processing":
            data.push({name: "inserter", count: 2})
            tip = "Output Processing"
            break;
        case "expand_output_drains":
            data.push({name: "iron-chest", count: 2})
            who.connections.maxDrains && data.push({name: "transport-belt", count: 5*who.connections.maxDrains})
            tip = "Expand Drain Points"
            break;
        }
    ret._result = {tool: "stackArray", tip, data}
}
FactoryBus.__tooltips.CC_utility = "busLine_Costs"
FactoryBus.ClearClog = (obj, Igor) => {
    Igor.getId(obj.at.factoryBus.processors.central).items.forEach( (x) => {
        Igor.processTEMP("player.inventory", "inventory.add", {itemStacks: x})
        x.count = 0;
        x.icon = undefined
    })
    obj.at.factoryBus.clogged = false
}
FactoryBus.ClearClog.signature = {
    at: "factoryBus"
}
FactoryBus.ClearClog.CC_provide = "factoryBus.clearClog"
FactoryBus.tick = (entity, tickdata, Igor) => {
    if(entity.connections.sources.length>0 && entity.processors.source?.xferQty>0) {
        if(entity.processors.source.xferTimer>=entity.processors.source.xferTicks) {
            let busXfer = Igor.processTEMP(
                            Igor.getId(entity.connections.sources[entity.processors.source.xferTarget], "buffers.out")
                            ,"buffer.busXfer"
                            ,{xferCount: entity.processors.source.xferQty
                                 ,toBus: entity.processors.central})
            if(busXfer.full) {
                entity.clogged = true
            }
            ++entity.processors.source.xferTarget==entity.connections.sources.length && (entity.processors.source.xferTarget=0)
            entity.processors.source.xferTimer=0
        } else {
            entity.processors.source.xferTimer++
        }
    }
    if(entity.connections.drains.length>0  && entity.processors.drain?.xferQty>0) {
        if(entity.processors.drain.xferTimer>=entity.processors.drain.xferTicks) {
            let busXfer = Igor.processTEMP(
                            Igor.getId(entity.connections.drains[entity.processors.drain.xferTarget], "buffers.in")
                            ,"buffer.busXfer"
                            ,{xferCount: entity.processors.drain.xferQty
                               ,fromBus: entity.processors.central})
            if(busXfer.full) {
                //skip outputting?
            }
            ++entity.processors.drain.xferTarget==entity.connections.drains.length && (entity.processors.drain.xferTarget=0)
            entity.processors.drain.xferTimer=0
        } else {
            entity.processors.drain.xferTimer++
        }
    }
    
}

IgorJs.defineObj("FactoryBus", FactoryBus.New, FactoryBus)



/*
 *  Resource Block
 */

const ResourceBlock = {}
ResourceBlock.New = (params, newObj, Igor) => {
    newObj.name = params.name.string
    newObj.patchProperties = {}
    newObj.spaceUsed = 50
    newObj.complexity = 1
    newObj.connections = {
        drains: [],
        maxDrains: 1
    }
    newObj.prepped = 0
    newObj.built = 0
    newObj.mining_ticks = NaN
    newObj.mining_drill = "burner-mining-drill"
    newObj.buffers = {}
    newObj.buffers.out = Igor.newComponent("entity.buffer", {restrictable: true, stacks: 1, stackSize: 0}, newObj)

    return [newObj]
}
ResourceBlock.New._signal = "facBlockUpdate"
ResourceBlock.SetResource = (obj, Igor) => {
    let resBlock = obj.at.ResourceBlock
    if(obj.at.ResourceBlock.patchProperties.resource) {
        let buffer = Igor.getId(resBlock.buffers.out)
        Igor.processTEMP(Igor.getNamedObject("player.inventory"), "inventory.add", {itemStacks: buffer.items})
        buffer.items = []
    }
    obj.at.ResourceBlock.$_tags.push("tick", "processing")
    obj.at.ResourceBlock.patchProperties.resource = obj.which.resource
    if(obj.at.ResourceBlock.mining_drill) {
        obj.at.ResourceBlock.patchProperties.mining_time = Igor.data.resource[obj.which.resource].mining_time / Igor.data.entity[obj.at.ResourceBlock.mining_drill].mining_speed * Igor.getStatic("config.TICKS_PER_SECOND")
        obj.at.ResourceBlock.mining_ticks =  obj.at.ResourceBlock.patchProperties.mining_time
        obj.at.ResourceBlock.subIcon = obj.at.ResourceBlock.patchProperties.resource
    }
}
ResourceBlock.SetResource.signature = {
    at: "ResourceBlock",
    which: 'resource'
}
ResourceBlock.SetResource.CC_provide = "resBlock.setResource"
ResourceBlock.PrepSpace = (obj, Igor) => {
    if(Igor.processTEMP(obj.player.inventory, "inventory.consume", {itemStacks: Igor.getStatic('itemStackCost.resBlock_foundation')})) {
        obj.at.ResourceBlock.prepped++
        obj.at.ResourceBlock.spaceUsed += 10
        obj.at.ResourceBlock.complexity += 5
    } else {
        Igor.view.warnToast("Unable to consume foundation costs")
    }

}
ResourceBlock.PrepSpace.signature = {
    at: "ResourceBlock",
    player: "inventory"
}
ResourceBlock.PrepSpace.CC_provide = "resBlock.prepSpace"
ResourceBlock.BuildMine = (obj, Igor) => {
    if(obj.at.ResourceBlock.prepped==0) return
    if(Igor.processTEMP(obj.player.inventory, "inventory.consume", {itemStacks: Igor.getStatic('itemStackCost.resBlock_miner')})) {
        obj.at.ResourceBlock.prepped--
        obj.at.ResourceBlock.built++
        Igor.getId(obj.at.ResourceBlock.buffers.out).stackSize += 5
    } else {
        return Igor.view.warnToast("Mining drill not available")
    }
}
ResourceBlock.BuildMine.signature = {
    at: "ResourceBlock",
    player: "inventory"
}
ResourceBlock.BuildMine.CC_provide = "resBlock.buildMine"
ResourceBlock.__foundationCost = (obj, x_null, ret, Igor) => {
    let who = Igor.getId(obj)
    let is = [{name: "stone", count: 5}]
    is.push({name: "transport-belt", count: Math.floor(who.spaceUsed/10)})
    ret._result = {tool: 'stackArray', tip: 'Foundation Cost', data: is}
}
ResourceBlock.__foundationCost.CC_utility = "resBlock.__foundationCost"
ResourceBlock.__minerCost = (obj, args_null, ret, Igor) => {
    let who = Igor.getId(obj)
    let is = [{name: who.mining_drill, count: 1}]
    ret._result = {tool: 'stackArray', tip: 'Foundation Cost', data: is}
}
ResourceBlock.__minerCost.CC_utility = "resBlock.__minerCost"
ResourceBlock.tick = (entity, tickdata, Igor) => {
    if(entity.built==0 || !entity.patchProperties.mining_time) return
    if(entity.mining_ticks==0) {
        let stored = Igor.processTEMP(entity.buffers.out, "inventory.add", {itemStacks: {name: entity.patchProperties.resource, count: entity.storedResources || entity.built}})
        entity.mining_ticks = entity.patchProperties.mining_time
    } else {
        entity.mining_ticks--
    }
}
IgorJs.defineObj("ResourceBlock", ResourceBlock.New, ResourceBlock)

const TechBlock = {}
TechBlock.New = (params, newObj, Igor) => {
    newObj.name = params.name.string
    newObj.spaceUsed = 50
    newObj.complexity = 10
    newObj.prepped = 0
    newObj.built = 0
    newObj.connections = { sources: [], maxSources: 1}
    newObj.buffers = {}
    newObj.buffers.in = Igor.newComponent("entity.buffer", {restrictable: true, stackSize: 10, maxStack: 2}, newObj.$_id)
    newObj.techTreeClass = "main"
    newObj.subIcon = "automation-science-pack"
    newObj.research_speed = 1
    newObj.research_ticks = NaN
    newObj.research_time = 0
    newObj.buildingType = "lab"
    newObj.foundationType = ""
    return [newObj]
}
TechBlock.New._signal = "facBlockUpdate"
TechBlock.prepSpace = (obj, Igor) => {
    if(Igor.processTEMP("player.inventory", "inventory.consume", {itemStacks: Igor.processTEMP(obj.at.techBlock, "techBlock.toolTips", {which: "foundation"}).data })) {
        obj.at.techBlock.prepped++
        obj.at.techBlock.spaceUsed += 10
        obj.at.techBlock.complexity += 5
    } else {
        Igor.view.warnToast("Not enough materials for foundation")
    }
}
TechBlock.prepSpace.signature = {
    at: "techBlock"
}
TechBlock.prepSpace.CC_provide = "techBlock.prepSpace"
TechBlock.BuildTech = (obj,Igor) => {
    if(obj.at.techBlock.prepped==0) return
    if(Igor.processTEMP("player.inventory", "inventory.consume", {itemStacks: Igor.processTEMP(obj.at.techBlock, "techBlock.toolTips", {which: "buildLab"}).data })) {
        obj.at.techBlock.prepped--
        obj.at.techBlock.built++
        Igor.getId(obj.at.techBlock.buffers.in).stackSize += 5
    } else {
        Igor.view.warnToast("Not enough materials to build lab")
    }
    if(!obj.at.techBlock.bufferSet) {
        Igor.processTEMP(obj.at.techBlock.buffers.in, "buffer.restrictList", {list: ['automation-science-pack', 'logistic-science-pack']})
        obj.at.techBlock.bufferSet = true
    }
    obj.at.techBlock.$_tags.push("tick", "processing")
}
TechBlock.BuildTech.signature = {
    at: "techBlock",

}
TechBlock.BuildTech.CC_provide="techBlock.buildLab"
TechBlock.SetTree = (obj, Igor) => {
    Igor.view.errorToast("Not Yet Implemented")
    /*
        set building type
            foundation type
            researching_speed
    */
}
TechBlock.SetTree.signature = {
    at: 'techBlock'
}
TechBlock.SetTree.CC_provide="techBlock.setTree"
TechBlock.__tooltips = (obj, args, ret, Igor) => {
    let who = Igor.getId(obj)
    let data = []
    let tip = ""
    switch(args.which) {
        case 'foundation':
            data.push({name: "inserter", count: 2})
            data.push({name: "stone", count: 5})
            tip = "Lab foundation"
            break;
        case 'buildLab':
            data.push({name: "lab", count: 1})
            tip = "Lab building"
            break;
        case 3:
            break;
    }
    ret._result = {tool: "stackArray", tip, data}
}
TechBlock.__tooltips.Igor_operation = "techBlock.toolTips"
TechBlock.__tooltips.CC_utility = "techBlock.toolTips"
TechBlock.tick = (obj, tickData, Igor) => {
    let research = Igor.getNamedObject('research').progressing
    if(!research) return
    if(Number.isNaN(obj.research_ticks) || obj.research_ticks===null) {
        let cost = research.cost.ingredients.map(([name, qty])=> {return {name, count:qty}})
        let canConsume = Igor.processTEMP(obj.buffers.in, "inventory.consume", {itemStacks: cost, multi: obj.built})
        obj.research_time = research.cost.time * Igor.getStatic("config.TICKS_PER_SECOND") * obj.research_speed
        if(!canConsume) {
            obj.research_consumed = 0
            obj.research_ticks = obj.research_time * 0.1
            obj.stalled = true
            return
        }
        obj.stalled = false
        obj.research_ticks = obj.research_time
        obj.research_consumed = canConsume
    } else if(obj.research_ticks) {
        --obj.research_ticks
    } else if(obj.research_ticks<=0) {
        if(obj.research_consumed) {
            let ret = Igor.processTEMP(research, "research.update", {count: obj.research_consumed, me: obj.$_id})
            let cost = research.cost.ingredients.map(([name, qty])=> {return {name, count:qty}})
            Igor.processTEMP(obj.buffers.in, "inventory.add", {itemStacks: cost, force: true, multi: ret})

        }
        obj.research_ticks = NaN
    }

}

IgorJs.defineObj("TechBlock", TechBlock.New, TechBlock)