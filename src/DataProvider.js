import {mgrs as MGRS} from 'managers'
import * as Config from 'Config'

var mgrs = MGRS
export let DataProvider = {
  onLoadComplete(cb) {
    DataProvider.loadCb = cb
  },
  async beginLoad() {
    let ds
    if(await mgrs.idb.get('last_ds')!=Config.LAST_DS_DB) {
      console.log("last datasource out of data")
      let url = location.href.slice(0, location.href.lastIndexOf("/"))
      let resp = await fetch(url+"/data_source.json")
      ds = await resp.json()
      mgrs.idb.set("last_ds", Config.LAST_DS_DB)
      mgrs.idb.set("dataSet", ds)
    } else {
      console.log('last datasource up to date')
      ds = await mgrs.idb.get("dataSet")
    }
    let icons = await mgrs.idb.get("Icons")
    icons && (ds.icons = icons)
    let save = await mgrs.idb.get("SaveGame") || null
    if(!save) {
      save = await mgrs.idb.get("SaveGame_Igor") || null
      if(!save.version) save.version = Config.IDB_SAVE_VERSION
    }
    debugger
    DataProvider.init(ds, save)
  },
  async init(data, save) {
    mgrs.icon.import(data.icons)
    mgrs.item.import(data.item)
    mgrs.res.import(data.resource)
    mgrs.rec.import(data.recipe, mgrs.item)
    mgrs.tech.import(data.technology, save?.techs)
    mgrs.entity.import(data.entity, mgrs)
    mgrs.data = data
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
