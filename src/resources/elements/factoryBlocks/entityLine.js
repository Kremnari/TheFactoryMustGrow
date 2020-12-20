import {bindable} from 'aurelia-framework'
import {mgrs} from "managers"

export class EntityLine {
  @bindable line
  async click(entity) {
    let out = await mgrs.DS.open('SelectRecipe', {tags: {category: mgrs.entity.craftingCats(entity)}})
    this.line.SetRecipe(out.recipe)
  }
}
