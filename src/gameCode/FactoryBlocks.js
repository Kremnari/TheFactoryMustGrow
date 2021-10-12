import {IgorUtils as IgorJs} from "IgorJs/main"
import {ChameleonViewer as ChameJs} from "Chameleon/main"

IgorJs.setStatic("itemStackCost.busExpansion", [{name: "iron-chest", count: 2}])
IgorJs.setStatic("itemStackCost.busProcessing", [{name: "inserter", count: 2}])
IgorJs.setStatic("itemStackCost.resBlock_foundation", [{name: "stone", count: 5}, {name: "transport-belt", count: 4}])
IgorJs.setStatic("itemStackCost.resBlock_miner", [{name: "burner-mining-drill", count: 1}])


const FactoryBlock = {}
FactoryBlock.New = (params, newObj, Igor) => {
    newObj.name = params.name.string
    newObj.size = 100
    newObj.complexity = 100
    newObj.connections = {
        source: null
        ,drain: null
    }
    let bufferSettings = {
        restrictable: true,
        stacks: 1,
        stackSize: 10,
        $_parent: newObj.$_id
    }
    newObj.buffers = {}
    newObj.buffers.in = Igor.newComponent("entity.buffer", bufferSettings)
    newObj.buffers.internal = Igor.newComponent("entity.buffer", bufferSettings)
    newObj.buffers.out = Igor.newComponent("entity.buffer", bufferSettings)
    newObj.processingList = {}

    newObj.factoryLines = []
    newObj.factoryLines.push(
        Igor.newComponent("FactoryLine", {
            source: newObj.buffers.in
            ,drain: newObj.buffers.out
            ,internal: newObj.buffers.internal
            ,parent: newObj.$_id
        })
    )
    newObj.$_tags.push("tick", "processing")
    return [newObj]
}
FactoryBlock.New.signature = { }
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
    Igor.addNewObject(Igor.getNamedObject("globals").facBlocks.techBlocks, "FactoryBlockRes", params)
}
FactoryBlock.NewTechBlock.signature = {
    name: "string"
}
FactoryBlock.NewTechBlock.CC_provide = "facBlock.newTechBlock"

FactoryBlock.tick = (obj, tickData, Igor) => {
    // Process I/O buffers
    if(obj.connections.drain) {
        //console.log('process drains: push mode')
    }    
}
FactoryBlock.tick.signature = { }

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
    if(obj.at.factoryBlock.connections[obj.dir.string]== obj.to_which.factoryBus) {
        Igor.processTEMP(obj.to_which.factoryBus, "factoryBus.clear"+callFn, {who: obj.at.factoryBlock.$_id})
        return
    }
    //Clear prior connection
    //Can execute on factoryBus...
    if(Igor.processTEMP(obj.to_which.factoryBus, "factoryBus.add"+callFn, {who: obj.at.factoryBlock.$_id}) ) {
        obj.at.factoryBlock.connections[obj.dir.string] = obj.to_which.factoryBus
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
        })
    )
    // obj.at.factoryBlock.complexity++
}
FactoryBlock.AddFactoryLine.signature = {
    at: "factoryBlock"
}
FactoryBlock.AddFactoryLine.CC_provide = "factoryBlock.addLine"
FactoryBlock.SetProcessItems = (target, args, returnObj, Igor) => {
    console.log('set process')
    returnObj.consumes = {}
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
            console.error("target at not found")
            debugger
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
    Igor.processTEMP(target.buffers.in, "buffer.restrictList", {list: Object.keys(target.processingList).filter((x)=> {return target.processingList[x].at==target.buffers.in})})
    Igor.processTEMP(target.buffers.internal, "buffer.restrictList", {list: Object.keys(target.processingList).filter((x)=> {return target.processingList[x].at==target.buffers.internal})})
    Igor.processTEMP(target.buffers.out, "buffer.restrictList", {list: Object.keys(target.processingList).filter((x)=> {return target.processingList[x].at==target.buffers.out})})
    //Igor.view.signaler.signal("generalUpdate")
}
FactoryBlock.SetProcessItems.Igor_operation = "factoryBlock.setProcessItems"
FactoryBlock.ClearProcessItems = (target, args, returnObj, Igor) => {
    debugger
    args.lists.consume.forEach( (x) => {
        let which = target.processingList[x]
        which.consume.splice(which.consume.indexOf(args.listId),1)
        if(which.consume.length==0) {
            if(which.at==target.buffers.internal && which.produce?.length>0) {
                which.at = target.buffers.out
            } else {
                target.processingList[x] = undefined
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
                target.processingList[x] = undefined
            }
        }
    })
    Igor.processTEMP(Igor.getId(target.buffers.in), "buffer.restrictList", {list: Object.keys(target.processingList).filter((x)=> {return target.processingList[x].at=="in"})})
    Igor.processTEMP(Igor.getId(target.buffers.internal), "buffer.restrictList", {list: Object.keys(target.processingList).filter((x)=> {return target.processingList[x].at=="internal"})})
    Igor.processTEMP(Igor.getId(target.buffers.out), "buffer.restrictList", {list: Object.keys(target.processingList).filter((x)=> {return target.processingList[x].at=="out"})})
}
FactoryBlock.ClearProcessItems.Igor_operation = "factoryBlock.clearProcessItems"
FactoryBlock.__tooltips = (obj, args, ret, Igor) => {
    let who = Igor.getId(obj)
    let data = []
    let tip = ""
    switch(args.which) {
        case "addLine":
            tip = "New Factory Line"
            break;
    }
    ret._result = {tool: "stackArray", tip, data}
}
FactoryBlock.__tooltips.CC_utility = "factoryBlock.toolTips"
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
    newObj.$_parent = params.parent
    //newObj.$_tags.push("anti-tick", ["no_recipe", "no_buildings", "no_inputs"])
    return [newObj]
}
FactoryLine.New.signature = {
    source: 'entity.buffer',
    drain: 'entity.buffer',
    internal: 'entity.buffer'
}
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
        console.error("Cannot consume foundation costs")
    }
}
FactoryLine.Prep.signature = {
    at: ["factoryLine", "factoryBlock"],
    player: "inventory"
}
FactoryLine.Prep.CC_provide = "factoryLine.prep"
FactoryLine.Expand = (obj, Igor) => {
    if(Igor.processTEMP(obj.player.inventory, "inventory.consume", {itemStacks: {name: obj.at.factoryLine.buildingType, count: 1}})) {
        if(obj.at.factoryLine.prepped>0 /* && inventory.consume */) {
            obj.at.factoryLine.built++
            obj.at.factoryLine.prepped--
            if(obj.at.factoryLine.recipe) {
                if(Number.isInteger(obj.at.factoryLine.processing_ticks)) {
                    //If we're already actively processing something...
                    //console.log('currently processing '+obj.at.factoryLine.processing_count)
                    //console.log('ticks: '+obj.at.factoryLine.processing_ticks)
                    //console.log('timer: '+obj.at.factoryLine.processing_time)
                    let consumed = Igor.processTEMP(obj.at.factoryBlock, "factoryBlock.consumeStacks", {itemStacks: obj.at.factoryLine.recipe.ingredients, multi: 1})
                    if(consumed) {
                        obj.at.factoryLine.processing_ticks *= (obj.at.factoryLine.built-1)/obj.at.factoryLine.built
                        obj.at.factoryLine.processing_count++
                        //console.log('new ticks: '+obj.at.factoryLine.processing_ticks)
                    }
                }
                obj.at.factoryLine.$_tags.push("tick", "processing")
            }
        }
    } else {
        console.error("Building not in inventory")
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
        obj.at.factoryLine.processList = FB_set
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
    newObj.size = 50
    newObj.complexity = 50
    newObj.connections = {
        sources: []
        ,drains: []
        ,maxSources: 0
        ,maxDrains: 0
    }
    newObj.processors = {
        source: {xferTicks: 120, xferTimer: 0, xferTarget: 0, xferQty: 0}
        ,drain: {xferTicks: 120, xferTimer: 0, xferTarget: 0, xferQty: 0}
        ,central: Igor.newComponent("entity.buffer", {stacks: 1, stackSize: 10, $_parent: newObj.$_id})
    }
   // newObj.$_tags.push("tick", "processing")
    return [newObj]
}
FactoryBus.ClearConnection = (target, args, returnObj, Igor) => {
    console.log("clear connection: ")
    console.log(args.dir)
    debugger
}
FactoryBus.ClearConnection.Igor_operation = "factoryBus.clearConnection"
FactoryBus.ConnectTo = (obj, Igor) => {
    let buffer = Igor.getId(obj.to.buffer)
    if(buffer.connection==obj.connectTo.factoryBus) return

    let connectTo = Igor.getId(obj.connectTo.factoryBus)
    if(obj.dir.string=="output") {
        if(buffer.connection) {
            let connected = Igor.getId(buffer.connection)
            Igor.processTEMP(connected, "factoryBus.clearConnection", {dir: "drains", id: buffer.$_id})
        }
        if(connectTo.connections.sources.length<connectTo.connections.maxSources) {
            connectTo.connections.sources.push({
                buffer: obj.to.buffer
                ,parent: buffer.$_parent
                ,named: Igor.getId(buffer.$_parent).name
            })
            buffer.connection = connectTo.$_id
        } else {
            console.warn("No available source connections")
        }
    
    } else if(obj.dir.string=="input") {
        if(buffer.connection) {
            let connected = Igor.getId(buffer.connection)
            Igor.processTEMP(connected, "factoryBus.clearConnection", {dir: "sources"})
        }
        if(connectTo.connections.drains.length<connectTo.connections.maxDrains) {
            connectTo.connections.drains.push({
                buffer: obj.to.buffer
                ,parent: buffer.$_parent
                ,named: Igor.getId(buffer.$_parent).name
            })
            buffer.connection = connectTo.$_id
        } else {
            console.warn("No available drain connections")
        }
    }
}
FactoryBus.ConnectTo.signature = {
    dir: "string",
    connectTo: "factoryBus",
    to: "buffer"
}
FactoryBus.ConnectTo.CC_provide = "factoryBus.connectTo"
FactoryBus.ExpandBus = (obj, Igor) => {
    let consumed = Igor.processTEMP(obj.player.inventory, "inventory.consume", {itemStacks: Igor.getStatic("itemStackCost.busExpansion")})
    if(!consumed) return
    if(obj.dir.string=="source") {
        obj.at.factoryBus.connections.maxSources += 1
        obj.at.factoryBus.complexity += 5
        obj.at.factoryBus.size += 10
    } else if(obj.dir.string=="drain") {
        obj.at.factoryBus.connections.maxDrains += 1
        obj.at.factoryBus.size += 10
        obj.at.factoryBus.complexity += 5
    }
    let central = Igor.getId(obj.at.factoryBus.processors.central)
    if(obj.at.factoryBus.connections.maxSources>central.maxStacks) {
        // Didn't like these combined with && 
        if(obj.at.factoryBus.connections.maxDrains>central.maxStacks) {
            central.maxStacks++
        }
    }
}
FactoryBus.ExpandBus.signature = {
    at: "factoryBus",
    dir: "string",
    player: "inventory"
} 
FactoryBus.ExpandBus.CC_provide = "factoryBus.expandBus"
FactoryBus.ExpandProcessing = (obj, Igor) => {
    let consumed = Igor.processTEMP(obj.player.inventory, "inventory.consume", {itemStacks: Igor.getStatic("itemStackCost.busProcessing")})
    if(!consumed) return
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
FactoryBus.tick = (entity, tickdata, Igor) => {
    if(entity.connections.sources.length>0 && entity.processors.source?.xferQty>0) {
        if(entity.processors.source.xferTimer>=entity.processors.source.xferTicks) {
            let busXfer = Igor.processTEMP(entity.connections.sources[entity.processors.source.xferTarget].buffer, "buffer.busXfer", {xferCount: entity.processors.source.xferQty, toBus: entity.processors.central})

            ++entity.processors.source.xferTarget==entity.connections.sources.length && (entity.processors.source.xferTarget=0)
            entity.processors.source.xferTimer=0
        } else {
            entity.processors.source.xferTimer++
        }
    }
    if(entity.connections.drains.length>0  && entity.processors.drain?.xferQty>0) {
        if(entity.processors.drain.xferTimer>=entity.processors.drain.xferTicks) {
            let busXfer = Igor.processTEMP(entity.connections.drains[entity.processors.drain.xferTarget].buffer, "buffer.busXfer", {xferCount: entity.processors.drain.xferQty, fromBus: entity.processors.central})
            //do something

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
    newObj.prepped = 0
    newObj.built = 0
    newObj.mining_ticks = NaN
    newObj.mining_drill = "burner-mining-drill"
    newObj.output = Igor.newComponent("entity.buffer", {restrictable: true, stacks: 1, stackSize: 0, $_parent: newObj.$_id})

    newObj.$_tags.push("tick", "processing")
    return [newObj]
}
ResourceBlock.SetResource = (obj, Igor) => {
    let resBlock = obj.at.ResourceBlock
    if(obj.at.ResourceBlock.patchProperties.resource) {
        let buffer = Igor.getId(resBlock.output)
        Igor.processTEMP(Igor.getNamedObject("player.inventory"), "inventory.add", {itemStacks: buffer.items})
        buffer.items = []
    }
    obj.at.ResourceBlock.patchProperties.resource = obj.which.resource
    if(obj.at.ResourceBlock.mining_drill) {
        obj.at.ResourceBlock.patchProperties.mining_time = Igor.data.resource[obj.which.resource].mining_time / Igor.data.entity[obj.at.ResourceBlock.mining_drill].mining_speed * Igor.getStatic("config.TICKS_PER_SECOND")
        obj.at.ResourceBlock.mining_ticks =  obj.at.ResourceBlock.patchProperties.mining_time
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
        console.error("unable to consume foundation costs")
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
        Igor.getId(obj.at.ResourceBlock.output).stackSize += 5
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
        let stored = Igor.processTEMP(entity.output, "inventory.add", {itemStacks: {name: entity.patchProperties.resource, count: entity.storedResources || entity.built}})
        entity.mining_ticks = entity.patchProperties.mining_time
    } else {
        entity.mining_ticks--
    }
}
IgorJs.defineObj("ResourceBlock", ResourceBlock.New, ResourceBlock)