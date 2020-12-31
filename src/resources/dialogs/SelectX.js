import {DialogController} from 'aurelia-dialog'
import {mgrs as MGRS} from 'managers'

export class SelectX {
  static inject = [DialogController, MGRS]
  selected = null
  constructor(dc, mgrs) {
    this.controller = dc
    this.mgrs = mgrs
  }
  activate(model) {
    this.list = model.list
    this.type = model.type
    this.selected = model.default
  }
  select(item) {
    this.selected = (item == this.selected) ? null : item
  }
  complete() {
    this.controller.ok({item: this.selected})
  }
}
