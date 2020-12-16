import {DialogController} from 'aurelia-dialog'
export class SelectBus {
  static inject = [DialogController]
  constructor(dc) {
    this.controller = dc
  }
  activate(model) {
    this.options = Object.values(model.base.facBlocks).filter(x => x.type=="bus")
    this.selected = null
  }
  selectedChanged(newVal) {
    console.log(newVal)
  }
  complete() {
    this.controller.ok({selected: this.selected})
  }
}
