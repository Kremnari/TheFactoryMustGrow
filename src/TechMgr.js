import {inject} from 'aurelia-framework'
import {EventAggregator} from 'aurelia-event-aggregator'
import {mgrs} from "managers"

@inject(EventAggregator)
export default class TechMgr {
  techList = {}
  shownTechs = []
  visFilters = []
  filters = {
    ShowComplete: true,
    ShowPack: {
      "automation-science-pack": true,
      "logistic-science-pack": false,
      "military-science-pack": false,
      "chemical-science-pack": false,
      "production-science-pack": false,
      "utility-science-pack": false,
      "space-science-pack": false,
    }
  }
  researching = null
  constructor(ea) {this.events = ea}
  import(baseData, savedTech) {
    this.recipeMgr = mgrs.rec
    Object.entries(baseData).forEach( ([name, tech]) => {
      let newTech = new TechItem(tech, savedTech?.[name])
      this.techList[name] = newTech
    })
    this.applyFilter("prereqs", {count: 0})
    this.applyFilter("byPack", {pack: 'automation-science-pack'})
    this.updateVisible() //TODO move this to an importable function
    mgrs.Ticker.DataProvider((obj) => { this.TickerProvider(obj) } )
  }
  serialize() {
    let ret = {}
    for(let tech of Object.values(this.techList)) {
      if(!tech.researched && !tech.completeUnits) {
        //console.log('skipping: '+tech.name)
        continue
      }
      let toAdd = {
        name: tech.name,
        type: tech.type,
        researched: tech.researched,
        completeUnits: tech.completeUnits,
      }
      //console.warn("toAdd: "+tech.name)
      ret[tech.name] = toAdd
    }
    return ret
  }
  TickerProvider(tickerObj) {
    if(!tickerObj.entities) tickerObj.entities = {}
    if(!tickerObj.entities.types) tickerObj.entities.types = []
    if(this.researching) tickerObj.entities.types.push("lab")
    if(!tickerObj.mgrs) tickerObj.mgrs = {}
    tickerObj.mgrs.tech = this    
  }
  select_research(tech) {
    this.researching = tech
    this.nextIngredients = this.researching.cost.ingredients
  }
  cancel_research() {
    this.researching = null
    this.nextIngredients = null
  }
  increment_research() {
    this.researching.completeUnits++
    if (this.researching.completeUnits == this.researching.cost.count) {
      this.complete_research()
    }
  }
  complete_research() {
    this.researching.researched = true;
    this.researching.unlocks.forEach( (item) => this.recipeMgr.recipeList[item].enabled=true)
    this.researching = null
    this.nextIngredients = null
    this.updateVisible()
  } 
  applyFilter(type, args) {
    //let filter = {type: type, args: args}
    //validate filter
    return this.visFilters.push({type: type, args: args}) - 1
  }
  hasFilter(type) {
    let idx = this.visFilters.findIndex( (elm) => { return elm.type==type })
    return idx>-1
  }
  removeFilter(type) {
    let idx = this.visFilters.findIndex( (elm) => { return elm.type==type })
    this.visFilters.splice(idx, 1)
  }
  updateVisible() {
    let nextSet = []
    Object.entries(this.techList).forEach( ([name, tech]) => {
      if (this.visFilters.every((filterElm) => {
        switch(filterElm.type) {
          case "prereqs":
            if (filterElm.args.count==0) {
              if(!tech.prerequisites || tech.prerequisites.count==0) return true
            }
            let reducer = (acc, name) => {
              if(!this.techList[name]) console.log(name)
              return acc + !this.techList[name].researched
            }
            if(tech.prerequisites.reduce(reducer, 0)==filterElm.args.count) return true
            return false
          case "byPack":
            return tech.cost.ingredients.some( ([name, amount]) => { return name==filterElm.args.pack})
          case "complete":
            return !tech.researched
        }
        return false
      })) {
        nextSet.push(tech)
      }
    })
    this.shownTechs = nextSet
    this.mgrs?.signaler?.signal('techUpdate')
  }
  toggleFilter(which, type) {
    switch(which) {
      case "complete":
        if(this.hasFilter("complete")) {
          this.removeFilter("complete")
          this.filters.ShowComplete = false
        } else {
          this.applyFilter("complete", {})
          this.filters.ShowComplete = true
        }
        break;
      case "byPack":
        this.filters.ShowPack[type] = !this.filters.ShowPack[type]
        break
    }
    this.updateVisible();
  }
}

class TechItem {
  constructor(baseTechData, saved) {
    Object.assign(this, baseTechData)
    this.completeUnits = saved?.completeUnits || 0
    this.researched = false
    if(saved?.researched) {
      this.researched = true
      this.unlocks.forEach( (item) => mgrs.rec.recipeList[item]?.enabled=true)
    }
  }
}
