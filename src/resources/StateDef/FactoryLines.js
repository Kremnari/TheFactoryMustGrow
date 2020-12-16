import {Inventory} from 'ItemMgr'
import {SelectBus} from 'resources/dialogs/SelectBus'
PLATFORM.moduleName('resources/dialogs/SelectBus')

export class TransportLine {
  feed = "null"
  drain = "null"
  constructor(parent, partwo) {
    this.parent = parent
    this.mgrs = partwo
  }
  tick(tickData) {}
  setSource() {
    this.mgrs.DS.open({viewModel: SelectBus, model: {base: this.mgrs.baseApp}, lock: false}).whenClosed(response => {
      if(response.wasCancelled){ return }
      debugger
      this.feed = response.output.selected
    })
  }
  setTarget() {
    this.mgrs.DS.open({viewModel: SelectBus, model: {base: this.mgrs.baseApp}, lock: false}).whenClosed(response => {
      if(response.wasCancelled){ return }
      debugger
      this.drain = response.output.selected
    })
  }
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
