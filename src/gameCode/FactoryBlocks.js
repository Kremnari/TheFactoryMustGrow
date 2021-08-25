import {IgorUtils as IgorJs} from "IgorJs/main"
import {ChameleonViewer as ChameJs} from "Chameleon/main"

const FactoryBlock = {}
FactoryBlock.New = (params, newObj, Igor) => {
    newObj.connections = {}
    newObj.connections.in = Igor.newClassObject(newObj.connections.in, "entity.buffer", {}),
    newObj.connections.internal = Igor.newClassObject(newObj.connections.internal, "entity.buffer", {}),
    newObj.connections.out = Igor.newClassObject(newObj.connections.out, "entity.buffer", {})

    newObj.factoryLines = []
    newObj.factoryLines.push(
        Igor.newClassObject(newObj, "factoryLine", {
            source: newObj.connections.in
            ,drain: newObj.connections.out
            ,internal: newObj.connections.internal
        })
    )
}
FactoryBlock.New.signature = { }
FactoryBlock.Ticker = (obj, tickData, Igor) => {

}
FactoryBlock.Ticker.signature = { }

FactoryBlock.SetConnection =  (obj, Igor) => {
    obj.at.factoryXput.connection = obj.to_which.factoryBus
}
FactoryBlock.SetConnection.signature = {
    at: "factoryXput",
    to_which: "factoryBus",
    dir: "string"
}
FactoryBlock.SetConnection.CC_provide = "facBlock.setConnection"

FactoryBlock.AddFactoryLine = (obj, Igor) => {
    // obj.at.factoryBlock.complexity
    // Inventory.consume some cost
    obj.at.factoryBlock.factoryLines.push(
        Igor.addNewObject(obj.at.factoryBlock, "factoryLine", {
            source: obj.at.factoryBlock.connections.in
            ,drain: obj.at.factoryBlock.connections.out
            ,internal: obj.at.factoryBlock.connections.internal
        })
    )
    // obj.at.factoryBlock.complexity++
}
FactoryBlock.AddFactoryLine.signature = {
    at: "factoryBlock"
}
FactoryBlock.AddFactoryLine.CC_provide = "facBlock.addLine"

IgorJs.defineObj("FactoryBlock", FactoryBlock.New, {
    tick: FactoryBlock.Ticker,
    setConnection: FactoryBlock.SetConnection
})

/*
    Factory Line
*/
const FactoryLine = {}
FactoryLine.New = (params, newObj, Igor) => {
    newObj.prepped = 0
    newObj.built = 0
    newObj.buildingType = null
    newObj.recipe = null
    newObj.connections = {
        source: params.source,
        drain: params.drain,
        internal: params.internal
    }
}
FactoryLine.New.signature = {
    source: 'entity.buffer',
    drain: 'entity.buffer',
    internal: 'entity.buffer'
}
FactoryLine.Prep = (obj, Igor) => {
  //NYI 
  //let foundationCost = lookup(obj.which.foundation, "foundationType").cost
  //if(!obj.from.inventory.canConsume(foundationCost)) {
    //NYI ChameJS.error("Not enough items to prep line")
    //return
  //}
  obj.at.factoryLine.prepped++
  //NYI something about factoryBlock size and complexity increases
}
FactoryLine.Prep.signature = {
    at: ["factoryLine", "factoryBlock"],
    player: "inventory"
}
FactoryLine.Prep.CC_provide = "facLine.prep"
FactoryLine.Expand = (obj, Igor) => {
    //Consume from inventory
    if(obj.at.factoryLine.prepped>0 /* && inventory.consume */) {
        obj.at.factoryLine.built++
        obj.at.factoryLine.prepped--
    }
}
FactoryLine.Expand.signature = {
    at: ["factoryLine", "factoryBlock"],
    inventory: "player"
}
FactoryLine.Expand.CC_provide = "facLine.expand"
FactoryLine.Recipe = (obj, Igor) => {
    if(obj.at.factoryLine.recipe!==obj.which.recipe) {
        //clear buffers
    }
    // set buffers
    obj.at.factoryLine.recipe = obj.which.recipe
}
FactoryLine.Recipe.signature = {
    at: ["factoryLine", "factoryBlock"],
    which: "recipe",
    inventory: "player"
}
FactoryLine.Recipe.CC_provide = "facLine.setRecipe"
FactoryLine.tick = (line, tickData, Igor) => {
    //Process ins and outs 
    console.log("factory Line tick")
}

IgorJs.defineObj("FactoryLine", FactoryLine.New, FactoryLine)


/*
    Factory Bus Line

* /

const NewFactoryBus = (params, newObj, Igor) => {
    
}
const FactoryBusTicker = (obj, tickData, Igor) => {

}

IgorJs.defineObj("FactoryBus", NewFactoryBus, {tick: FactoryBusTicker})

*/