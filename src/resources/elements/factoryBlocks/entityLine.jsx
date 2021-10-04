import {bindable} from 'aurelia-framework'
import {mgrs} from "managers"

export class EntityLine {
  @bindable line
  async clickX(entity) {
    let out = await mgrs.DS.open('SelectRecipe'
      ,{ tags: {category: mgrs.entity.craftingCats(entity)}}
      )
    this.line.SetRecipe(out.recipe)
  }
  async click(what) {
    let out
    if(this.line.restricted.type=="mining") {
      out = await mgrs.DS.open("SelectX",
      {list: Object.values(mgrs.res.resList), type: "resource", default: this.line.setFn?.name})
    }
    if(this.line.restricted.type=="crafting") {
      //Need to refine this list
      let recList = Object.values(mgrs.rec.recipeList)
      out = await mgrs.DS.open("SelectX",
      {list: recList, type: "recipe", default: this.line.setFn?.name})
    }
    if(!out?.item) return 
    this.line.SetEntityFn(out.item)
    //mgrs.signaler.signal("generalUpdate")
  }
}
