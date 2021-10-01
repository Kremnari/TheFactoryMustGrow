import {IgorUtils as IgorJs} from "IgorJs/main"
import {ChameleonViewer as ChameJs} from "Chameleon/main"

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
    name: "string"  //WIP should become resource vein
}
FactoryBlock.NewResBlock.CC_provide = "facBlock.newResBlock"
FactoryBlock.NewTechBlock = (params, Igor) => {
    Igor.addNewObject(Igor.getNamedObject("globals").facBlocks.tech, "FactoryBlockRes", params)
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
                    console.log('currently processing '+obj.at.factoryLine.processing_count)
                    console.log('ticks: '+obj.at.factoryLine.processing_ticks)
                    console.log('timer: '+obj.at.factoryLine.processing_time)
                    let consumed = Igor.processTEMP(obj.at.factoryBlock, "factoryBlock.consumeStacks", {itemStacks: obj.at.factoryLine.recipe.ingredients, multi: 1})
                    if(consumed) {
                        obj.at.factoryLine.processing_ticks *= (obj.at.factoryLine.built-1)/obj.at.factoryLine.built
                        obj.at.factoryLine.processing_count++
                        console.log('new ticks: '+obj.at.factoryLine.processing_ticks)
                    }
                }
                obj.at.factoryLine.$_tags.push("tick", "processing")
            }
        }
    } else {
        debugger
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
FactoryLine.tick = (entity, tickdata, Igor) => {
    if(entity.built==0 || !entity.processing_time) return  //TODO turn this into an "anti-tick" tag
    //consume from buffers if empty
    if(Number.isNaN(entity.processing_ticks)) {
        let consumed = Igor.processTEMP(entity.$_parent, "factoryBlock.consumeStacks", {itemStacks: entity.recipe.ingredients, multi: entity.built})
        if(consumed> 0) {
            entity.processing_ticks = 0
            entity.processing_count = consumed
        }
    } else if(entity.processing_ticks>=entity.processing_time) {
        Igor.processTEMP(entity.$_parent, "factoryBlock.produceStacks", {itemStacks: entity.recipe.results, multi: entity.processing_count})
        entity.processing_ticks=NaN
    } else {
        entity.processing_ticks++
    }

}
FactoryLine.signature = { }

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
    }
    return [newObj]
}

//! These are called from FactoryBlock's persepective,
//! that's what the Igor call names are reversed
FactoryBus.AddSource = (target, args, returnObj, Igor) => {
    let completed = true
    target.connections.sources.push(args.who)
    returnObj._result = completed
}
FactoryBus.AddSource.Igor_operation = "factoryBus.addDrain"
FactoryBus.AddDrain = (target, args, returnObj, Igor) => { 
    let completed = true
    target.connections.drains.push(args.who)
    returnObj._result = completed
}
FactoryBus.AddDrain.Igor_operation = "factoryBus.addSource"
FactoryBus.ClearSource = () => {
    target.connections.sources.slice(target.connections.sources.indexOf(args.who), 1)
    returnObj._result = true
}
FactoryBus.ClearDrain = () => {
    target.connections.drains.slice(target.connections.drains.indexOf(args.who), 1)
    returnObj._result = true
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
    newObj.minerType = "burner-mining-drill"
    newObj.mining_ticks = NaN
    newObj.foundationCost = [{name: "stone", count: 5}]
    newObj.output = Igor.newComponent("entity.buffer", {restrictable: true, stacks: 1, stackSize: 10})

    return [newObj]
}
ResourceBlock.SetResource = (obj, Igor) => {
    obj.at.ResourceBlock.patchProperties.resource = obj.which.resource
    if(obj.at.ResourceBlock.minerType) {
        obj.at.ResourceBlock.patchProperties.mining_time = Igor.data.resources[obj.which.resource].mining_time / Igor.data.entity[obj.at.ResourceBlock.minerType] * Igor.getStatic("config.TICKS_PER_SECOND")
        obj.at.ResourceBlock.mining_ticks =  obj.at.ResourceBlock.patchProperties.mining_time
    }
}
ResourceBlock.SetResource.signature = {
    at: "ResourceBlock",
    which: 'resource'
}
ResourceBlock.SetResource.CC_provide = "resBlock.setResource"
ResourceBlock.PrepSpace = (obj, Igor) => {
    if(!obj.at.foundationCost) return
    if(Igor.processTEMP(obj.player.inventory, "inventory.consume", {itemStacks: obj.at.ResourceBlock.foundationCost})) {
        obj.at.ResourceBlock.prepped++
        obj.at.ResourceBlock.size += 10
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
    if(Igor.processTEMP(obj.player.inventory, "inventory.consume", {itemStacks: [{name: newObj.minerType, count: 1}]})) {
        obj.at.ResourceBlock.prepped--
        obj.at.ResourceBlock.built++
    }
}
ResourceBlock.BuildMine.signature = {
    at: "ResourceBlock",
    player: "inventory"
}
ResourceBlock.BuildMine.CC_provide = "resBlock.buildMine"
ResourceBlock.tick = (entity, tickdata, Igor) => {
    if(entity.built==0 || !entity.patchProperties.resource) return
    if(entity.mining_ticks==0) {
        let stored = Igor.processTEMP(entity.output, "inventory.add", {itemStacks: {name: entity.patchProperties.resource, count: entity.storedResources || entity.built}})
        debugger
        entity.mining_ticks = entity.patchProperties.mining_time
    } else {
        entity.mining_ticks--
    }
}


IgorJs.defineObj("ResourceBlock", ResourceBlock.New, ResourceBlock)