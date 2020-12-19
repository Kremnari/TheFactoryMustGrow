import {DialogController} from 'aurelia-dialog'
import {mgrs as MGRS} from 'managers'

export class SelectRecipe {
  static inject = [DialogController, MGRS]
  selected = null
  constructor(dc, mgrs) {
    this.controller = dc
    this.mgrs = mgrs
  }
  activate(model) {
    let recList
    this.model = model
    Object.entries(model.tags).forEach(([k, vs]) => {
      recList = this.mgrs.rec.recipesByTags(k, vs, recList)
    })
    this.recList = recList
  }
  select(rec) {
    this.selected = (rec == this.selected) ? null : rec
  }
  complete() {
    this.controller.ok({recipe: this.selected})
  }
}
