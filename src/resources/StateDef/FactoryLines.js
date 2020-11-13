import {Inventory} from 'ItemMgr'

export class TransportLine {
  feed = "null"
  drain = "null"
  constructor(parent) { this.parent = parent}
  tick(tickData) {}
  setFeed() {}
  setDrain() {}
}

export class EntityLine {
  entityType = "null"
  entityCount = 0

  constructor(parent) { this.parent = parent}
  tick(tickData) {}
}

//Eventually add through CephlaComm
export function Add2EntityLine(entityLine, entity) {
  if(entityLine.entityType==entity) {

  } else if (entityLine.entityType=="null") {

  } else { // entity is not in line

  }
}
