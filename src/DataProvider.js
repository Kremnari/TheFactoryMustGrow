import {mgrs as MGRS} from 'managers'
import * as Config from 'Config'

var mgrs = MGRS
export let DataProvider = {
  onLoadComplete(cb) {
    DataProvider.loadCb = cb
  },
  async beginLoad() {
    let ds
    let icons
    if(navigator.onLine && await mgrs.idb.get('last_ds')!=Config.LAST_DS_DB) {
      //console.log("last datasource out of data")
      let url = location.href.slice(0, location.href.lastIndexOf("/"))
      let resp = await fetch(url+"/data_source.json")
      ds = await resp.json()
      mgrs.idb.set("last_ds", Config.LAST_DS_DB)
      mgrs.idb.set("dataSet", ds)
    } else {
      //console.log('last datasource up to date')
      ds = await mgrs.idb.get("dataSet")
    }
    if(navigator.onLine && await mgrs.idb.get('last_icon_set')!=Config.LAST_ICON_SET) {
      let url = location.href.slice(0, location.href.lastIndexOf("/"))
      let resp = await fetch(url+"/data_icons.json")
      icons = await resp.json()
      mgrs.idb.set("last_icon_set", Config.LAST_ICON_SET)
      mgrs.idb.set("Icons", icons)
    } else {
      icons = await mgrs.idb.get("Icons")
    }
   
    let save = await mgrs.idb.get("SaveGame") || null
    if(!save) {
      save = await mgrs.idb.get("SaveGame_Igor") || null
      if(save && !save.version) save.version = Config.IDB_SAVE_VERSION
    }
    DataProvider.init(ds, icons, save)
  },
  async init(data, icons, save) {
    mgrs.icon.import(icons)
    mgrs.item.import(data.item)
    mgrs.data = data
    mgrs
    DataProvider.loadCb({mgrs: mgrs, save: save})
  },
  saveGame(data) {
    if(data) {
      mgrs.idb.set("SaveGame", data)
    } else {
      mgrs.idb.del("SaveGame")
      window.location.reload()
    }
  }
}
window.mgrs = mgrs