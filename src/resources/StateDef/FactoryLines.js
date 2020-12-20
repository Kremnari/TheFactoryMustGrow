import {EntityStorage} from 'EntityMgr'
import {Inventory} from 'ItemMgr'
import {mgrs} from 'managers'


export class TransportLine {
  feed = null
  drain = null
  constructor(parent) {
    this.parent = parent
    //this.inv = new Inventory()
  }
  tick(tickData) {}
  async setSource() {
    let out = await mgrs.DS.open("SelectBus", {base: mgrs.baseApp})
    if(!out.selected){ return }
    //@response.output.selected is a factoryBlock
    this.feed?.DelBusDrain(this.parent)
    this.feed = out.selected
    out.selected.AddBusDrain(this.parent)
  }
  async setTarget() {
    let out = await mgrs.DS.open("SelectBus", {base: mgrs.baseApp})
    if(!out.selected){ return }
    //@response.output.selected is a factoryBlock
    this.feed?.DelBusFeed(this.parent)
    this.drain = out.selected
    out.selected.AddBusFeed(this.parent)
  }
}

export class EntityLine {
  entityType = undefined
  recipe = undefined
  entities = undefined
  constructor(parent) {
    this.parent = parent
    this.entities = new EntityStorage(this.parent, mgrs)
  }
  tick(tickData) {
    this.entities.forEach( (e) => e.tick(tickData))
  }
  SetRecipe(which) {
    //Process ingredient refunds and reset busses
    if(which) {
      this.recipe=which
    } else {
      this.recipe=undefined
    }
  }
  AddEntity(which) {
    if(!this.entityType) {
      this.entityType = which
    } else if( this.entityType!=which) {
      return false
    }
    this.entities.AddEntity(which)
    return true
  }
}

//Eventually add through CephlaComm
export function Add2EntityLine(entityLine, entity) {
  if(entityLine.entityType==entity) {

  } else if (entityLine.entityType=="null") {

  } else { // entity is not in line

  }
}
