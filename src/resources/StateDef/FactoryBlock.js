import {PlayerBlock} from 'resources/StateDef/FactoryBlock_old'
import {CephlaCommConstructor as CCC} from "CephlaComm/main"

//! This should eventually be moved to Igor
//* Chameleon is a view controller and should be called by Igor to
//    post updates
import {ChameleonBuilder as ChamBuild, ChameleonViewer as ChameJS} from 'Chameleon/main.js'
import {IgorUtils} from 'IgorJs/main'

export const NamedBlocks = {
  player: PlayerBlock,
  DefenseBlock,
  DefenseBus,
  OffenseBlock,
  OffenseBus,
}

function DefenseBlock() {
  let ret = {}
  ret.machines = {}
  ret.ammo = 0
  ret.repair = 0
  return ret
}

ChamBuild.AddGameObjectClass("turret", {name: "turret", count: 0}, {category: "defenseMachines"})

function DefenseBus() {
  let ret = {}
  return ret
}
function OffenseBlock() {
  let ret = {}
  ret.machines = {}
  ret.supply = 0
  ret.fuel = 0
  return ret
}
ChamBuild.AddGameObjectClass("radar", {name: "radar", count: 0}, {category: 'offenseMachines'})

function OffenseBus() {
  let ret = {}
  return ret
}

//* New Stuff, working towards CephlaComm
const SetConnectionSig = {
  at: "factoryXput",
  to_which: "factoryBus",
  dir: "string"
}
//Validator should ensure which.facblock can in/out opposing this
function SetConnection(obj) {
  obj.at.factoryXput.connection = obj.to_which.factoryBus
}
CCC.provide('factoryBlock.setConnection', SetConnection, SetConnectionSig)

const AddProdLineSig = {
  at: "factoryBlock",
}
function AddProdLine(obj) {
  obj.at.factoryBlock.processingLines.push(
    { recipe: null, building: null, prepped: null,
      counts: { buildings: 0, prepped: 0, producing: 0},
      timers: { production: 0 }
    }
  )
  //NYI something about block size and complexity increases
}
CCC.provide("factoryBlock.addProdLine", AddProdLine, AddProdLineSig)


//* Begin Factory Lines CCC
const SetRecipeSig = {
  at: "factoryLine",
  which: "recipe"
}
function SetRecipe(obj) {
  obj.at.factoryLine.recipe = obj.which.recipe
  //return current production
}
CCC.provide("factoryLine.setRecipe", SetRecipe, SetRecipeSig)


const SetBuildingSig = {
  at: "factoryLine",
  which: "building"
}
function SetBuilding(obj) {
  obj.at.factoryLine.building = obj.which.building
}
CCC.provide("factoryLine.setBuilding", SetBuilding, SetBuildingSig)


const AddBuildingSig = {
  at: "factoryLine",
  from: "inventory"
}
function AddBuilding(obj) {
  if(obj.at.factoryLine.counts.prepped<=obj.at.factoryLine.counts.buildings) {
    ChameJS.error("Need a prepped spot to build")
    return
  }
  if(obj.from.inventory.consumeAll([{name: obj.at.factoryLine.building, count: 1}])!==true) {
    ChameJS.error("You must have a "+obj.at.factoryLine.building+" to add.")
    return
  }
  obj.at.factoryLine.counts.buildings++
}
CCC.provide("factoryLine.addBuilding", AddBuilding, AddBuildingSig)


const PrepLineSig = {
  at: ["factoryLine", "factoryBlock"],
  //"which": "foundation"
  from: "inventory",
}
function PrepLine(obj) {
  //NYI 
  //let foundationCost = lookup(obj.which.foundation, "foundationType").cost
  //if(!obj.from.inventory.canConsume(foundationCost)) {
    //NYI ChameJS.error("Not enough items to prep line")
    //return
  //}
  obj.at.factoryLine.counts.prepped++
  //NYI something about factoryBlock size and complexity increases
}
CCC.provide("factoryLine.prepLine", PrepLine, PrepLineSig)
