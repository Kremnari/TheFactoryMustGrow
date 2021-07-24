import {mgrs} from 'managers'

export default class RecipeMgr {
  recipeList = {}
  recipes_by_cats = { "hand_only": [], "crafting": [] }
  showing_item = null
  import(recList, IM) {
    this.itemMgr = IM
    Object.entries(recList).forEach( ([name, recBase]) => {
      let recipe = new Recipe(recBase, IM, this)
      if (!recipe) return
      recipe.ingCheck = (inv) => {
        //if(recipe.ingredients.every( (obj) => this.itemMgr.itemList[obj.name].count >= obj.amount, this)) {
        if(recipe.ingredients.every( (obj) => inv.total(obj.name) >= obj.amount, this)) {
          recipe.classes[CLASSES.enabled] = 'recipeEnabled'
        } else { recipe.classes[CLASSES.enabled] = 'recipeDisabled' }
      }
      recipe.classes[CLASSES.enabled] = 'recipeDisabled'
      this.recipeList[name] = recipe
      if (recipe.category) {
        if (!this.recipes_by_cats[recipe.category]) {
          this.recipes_by_cats[recipe.category] = []
          this.crafting[recipe.category] = null
        }
        this.recipes_by_cats[recipe.category].push(recipe)
      } else
        this.recipes_by_cats["hand_only"].push(recipe)
        this.recipes_by_cats["crafting"].push(recipe)
    })
  }
  set_player(player) {
    this.player = player
  }
  sub_ticker(ticker) {
    this.TickSub = ticker.subscribe( tickData => { this.tick(tickData) })
  }
  tick() {
    for (let each of Object.values(this.recipeList)) {
      each.ingCheck(this.player.inv)
    }
  }
  canProduce(recipe, inv) {
    let checkIngs = (obj) => {
      return inv.total(obj.name) >= obj.amount || false
    }
    return recipe.ingredients.every(checkIngs)
  }
  canProduceMax(recipe, inv) {
    let checkIngs = (obj) => {
      return Math.floor(inv.total(obj.name)/obj.amount)
    }
    return recipe.ingredients.reduce((acc, obj) => {return Math.min(acc, checkIngs(obj) )}, Infinity)
  }
  consumeIngs(recipe, inv, multi = 1, refund = false) {
    recipe.ingredients.forEach( (obj) => {
      !refund ? 
        inv.consume(obj.name, obj.amount * multi) :
        inv.add(obj.name, obj.amount * multi)
    })
  }
  crafting = {}
  startCraft(recipe, inv, recCategory) {
    let catTO = this.crafting[recCategory]
    if (catTO!=null) {
      window.clearTimeout(catTO.timer)
      catTO.recipe.style = ""
      catTO.recipe.classes[CLASSES.crafting] = ""
      this.consumeIngs(catTO.recipe, inv, 1, true)
      if (recipe.name == catTO.recipe.name) {
        //same recipe, we need to finish clearing and exit
        this.crafting[recCategory] = null
        return false
      }
      // else we shall continue to the consume,,,
    }
    if(this.canProduce(recipe, inv)) {
      catTO = {}
      this.consumeIngs(recipe, inv)
      let craftingTime = recipe.crafting_speed || recipe.crafting_time
      catTO.timer = window.setTimeout(() => {
        this.crafting[recCategory] = null
        recipe.animTime = null
        recipe.animClass = null
        recipe.classes[CLASSES.crafting] = ""
        this.craft(recipe, inv)
      }, craftingTime* 1000)
      catTO.recipe = recipe
      this.crafting[recCategory] = catTO
      recipe.animTime = "animation-duration: "+craftingTime+"s"
      recipe.animClass = "isCrafting"
      recipe.classes[CLASSES.crafting] = "crafting"
    }
  }
  craft(recipe, inv) {
    recipe.results.forEach((obj) => {
        inv.add(obj.name, obj.amount || 1 )
    })
  }
  recipesByTags(property, tagList, recList = this.recipeList) {
    if (tagList == null) return []
    if (!Array.isArray(tagList)) tagList = [tagList]
    let includeUndefineds = false;
    if (tagList.includes("crafting"))  includeUndefineds = true
    return Object.values(recList).filter( (elm) => {
      return (elm.enabled == undefined || elm.enabled) && (tagList.includes(elm[property]) || (includeUndefineds && !elm[property] ))
    })
  }
}

class Recipe {
  style = ""
  constructor(recipe) {
    Object.assign(this, recipe)
    this.enabled = recipe.enabled == undefined ? true : recipe.enabled
    Object.defineProperty(this, 'classesStr', {
      get: () => {
        return this.classes.join(" ")
      }
    })
    //if (!this.category) this.category = "crafting"
    if (this.icon == "") this.icon = mgrs.item.itemList[this.results[0].name]?.icon
    if (this.icon == "") return false
  }
  classes = []
  getClassesX() {
    console.log('computed')
    return this.classes.join(" ")
  }
}

const CLASSES =  {
  enabled: 0,
  crafting: 1,

}


//### Start Igor Magic
//* Need to start with player crafting

import {CephlaCommConstructor as CCC} from 'CephlaComm/main'
import {ChameleonViewer as ChameJs} from 'Chameleon/main'

const CraftFromInv = (obj, Igor, fn) => {
  if(fn.rec) {
    window.clearTimeout(fn.timeout)
    //console.log("canceling:")
    //console.log(fn.rec.ingredients)
    Igor.processTEMP(obj.player.inventory, "inventory.add", {itemStacks: fn.rec.ingredients})
    ChameJs.animsUpdate(fn.rec, null, null)
    fn.rec = undefined
  } else {
    //console.log(obj.which.recipe.ingredients)
    if(Igor.processTEMP(obj.player.inventory, "inventory.consume", {itemStacks: obj.which.recipe.ingredients })) {
      fn.rec = obj.which.recipe
      fn.timeout = window.setTimeout( () => {
        //console.log('crafting complete')
        //console.log(fn.rec.results)
        Igor.processTEMP(obj.player.inventory, "inventory.add", {itemStacks: fn.rec.results})
        ChameJs.animsUpdate(fn.rec, null, null)
        fn.rec = undefined
      }, obj.which.recipe.crafting_speed * 1000)
      fn.rec = obj.which.recipe
      ChameJs.animsUpdate(fn.rec, "isCrafting", obj.which.recipe.crafting_speed)
    } else {
      //Error alert: cannot build
      console.log('cannot craft')
    }
  }
}
const CraftFromInvSig = {
  which: "recipe",
  player: "inventory"
}

CCC.provide("player.craft", CraftFromInv, CraftFromInvSig)

//### Start Chameleon Magic
//* Should contain a function to update borders on 
//   craftable recipes
