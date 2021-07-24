import {IgorUtils as IgorJs} from "IgorJs/main"


const PlayerEntity = (params, Igor) => {
  let obj = {
    buffers = {}
  }
  //? Copy static data onto entity,
  //? surely there's a better way to do this...
  Object.assign(obj, Igor.data.entity[params.name])
  if(obj.subType=="mining-drill" || obj.subType=="crafter") {
    obj.buffers.out = {
      items: [],
      upgrades: {},
      stacks: 1, stackSize: 5,
      xfer: 0, xferTicks: 120, xferTimer: NaN
    }
  }
  if(obj.subType=="crafter" || obj.subType=="research") {
    obj.buffers.out = {
      items: [],
      upgrades: {},
      stacks: 1, stackSize: 5,
      xfer: 0, xferTicks: 120, xferTimer: NaN
    }
  }
  Igor.finalizeObj(obj)
  obj.$_tags.push("")
  return obj
}

IgorJs.defineObj("player.entity", PlayerEntity)
