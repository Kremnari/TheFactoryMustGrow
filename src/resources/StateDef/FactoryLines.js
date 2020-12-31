import {EntityStorage} from 'EntityMgr'
import {Inventory} from 'ItemMgr'
import {mgrs} from 'managers'

export class EntityLine {
  entityType = undefined
  recipe = undefined
  entities = undefined
  constructor(parent, feed, drain) {
    this.parent = parent
    this.entities = new EntityStorage(this.parent)
    this.feed = feed
    this.drain = drain
  }
  tick(tickData) {
    this.entities.tick(tickData, this.feed, this.drain)
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
    let new_e = this.entities.AddEntity(which)
    this.recipe && new_e.set_recipe(this.recipe)
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
