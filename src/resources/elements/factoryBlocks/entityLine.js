import {bindable} from 'aurelia-framework'
import {mgrs as MGRS} from "managers"
let mgrs = MGRS

export class EntityLine {
  @bindable line
  async click(entity) {
    console.log(entity)
    if(entity.type=="assembling-machine") {
      let out = await mgrs.DS.open('SelectRecipe', {tags: {category: entity.crafting_categories}})
      line.SetRecipe(out.recipe)
    }
  }
}
