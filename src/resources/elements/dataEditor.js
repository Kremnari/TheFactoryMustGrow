import {observable} from 'aurelia-framework'
import {mgrs} from 'managers'
import {set as dbSet,
  get as dbGet,
  del as dbDel,
  clear as dbClear,
  keys as dbKeys,
  Store as dbStore,
} from 'idb-keyval'

import {saveAs} from 'file-saver';

//TODO Change this to load and use it's own data instead of the one from mgrs

export class DataEditor {
  editList = null
  eTypes = ["crafter", "miner", "research", "defense", "offense"]
  @observable editType = null
  constructor() {
    mgrs.de = this
    this.mgrs = mgrs
    this.store = new dbStore("TFMG_DATA", 'store')
  }
  detached() {
    this.editing = null
    this.editList = null
    this.editType = null
  }
  editTypeChanged(newVal) {
    if(!newVal) return
    if(newVal=='icons') {
      this.editList = null
      this.editing = null
      return
    }
    this.editList = mgrs.data[newVal]
    //this.suggestions = new ListSuggestionService(newVal)
    this.editing = null
  }
  selectEdit(name) {
    this.editing = mgrs.data[this.editType][name]
    if(this.editType=='entity') {
      if(this.editing.crafting_categories) {
        this.eTypeSelect = 'crafter'
        this.editing.subType = 'crafter'
      } else if(this.editing.resource_categories) {
        this.eTypeSelect = 'miner'
        this.editing.subType = 'miner'
      } else if(this.editing.inputs) {
        this.eTypeSelect = 'research'
        this.editing.subType = 'research'
      } else if(this.editing.defense_value) {
        this.eTypeSelect = 'defense'
        this.editing.subType = 'defense'
      } else if(this.editing.offense_value) {
        this.eTypeSelect = 'offense'
        this.editing.subType = 'offense'
      }
    }
  }
  addNew() {
    this.editing = { type: this.editType }
    if (this.editType=='recipe') {
      this.editing.ingredients = [{name: "__someitem__", amount: 1}]
      this.editing.category = "crafting"
      this.editing.results = [{name: "__someitem__", amount: 1}]
      this.editing.enabled = false
    }
    if (this.editType=='technology') {
      this.editing.prerequisites = ['__sometech__']
      this.editing.unlocks = ['__somerecipe__']
      this.editing.cost = { ingredients: [['automation-science-pack', 1]]}
    }
  }
  copyItem() {
    this.editing = Object.assign({}, this.editing)
  }
  saveItem() {
    if(this.eTypeSelect=='research' && typeof this.editing.inputs== 'string') {
      this.editing.inputs = this.editing.inputs.split(",")
    }
    //This shouldn't really be needed, right?
    mgrs.data[this.editType][this.editing.name] = this.editing
    this.editing = null
  }
  deleteItem() {
    delete mgrs.data[this.editType][this.editing.name]
    delete this.editList[this.editing.name]
    this.editing = null

  }
  saveDataSet() {
    dbSet("TFMG_BASE_DATA_dataSet", mgrs.data, this.store) 
    this.editList = null
    this.editType = null

  }
  dlDataSet() {
    let data = JSON.parse(JSON.stringify(mgrs.data))
    data.icons = undefined
    let file = new File([JSON.stringify(data)], "data_source.json", {type: "application/json"})

    saveAs(file)
  }
  async dlImageSet() {
    let data = await mgrs.idb.get("Icons")
    let file = new File([JSON.stringify(data)], "data_images.json", {type: "application/json"})
    saveAs(file)
  }
  async dlLocalization() {
    let data = await mgrs.idb.get("Localization")
    let file = new File([JSON.stringify(data)], "local.json", {type: "application/json"})
    saveAs(file)
  }
  close() {
    //TODO remove direct access... but would have to change the data editor to use Chameleon....
    mgrs.baseApp.view.ctrl.version = null
  }
}

export class ListSuggestionService {
  constructor(type) {
    this.type = type
  }
  suggest(value) {
    if (value === '') {
      return Promise.resolve([]);
    }
    value = value.toLowerCase();
    const suggestions = mgrs.data[this.type].filter(x => x.name.toLowerCase().indexOf(value) === 0)
      .map(x => x.name);
    return Promise.resolve(suggestions);
  }
  
  getName(suggestion) {
    return suggestion;
  }
}
