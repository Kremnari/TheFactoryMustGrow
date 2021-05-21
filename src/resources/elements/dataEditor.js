import {observable} from 'aurelia-framework'
import {mgrs} from 'managers'
import {saveAs} from 'file-saver';

export class DataEditor {
  editList = null
  @observable editType = null
  constructor() {
    mgrs.de = this
    this.mgrs = mgrs
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
    this.editList = Object.keys(mgrs.data[newVal])
    //this.suggestions = new ListSuggestionService(newVal)
    this.editing = null
  }
  selectEdit(name) {
    this.editing = mgrs.data[this.editType][name]
  }
  addNew() {
    this.editing = { type: this.editType }
  }
  saveItem() {
    mgrs.data[this.editType][this.editing.name] = this.editing
    this.editing = null
  }
  deleteItem() {
    delete mgrs.data[this.editType][this.editing.name]
    this.editList.splice(this.editList.indexOf(this.editing.name), 1)
    this.editing = null

  }
  saveDataSet() {
    mgrs.idb.set("dataSet", mgrs.data)
    this.editList = null
    this.editType = null

  }
  dlDataSet() {
    let file = new File([JSON.stringify(mgrs.data)], "data_source.json", {type: "application/json"})
    saveAs(file)
  }
  close() {
    mgrs.baseApp.viewPane.version = 'beta'
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
