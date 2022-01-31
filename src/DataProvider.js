import {mgrs as MGRS} from 'managers'
import {set as dbSet,
        get as dbGet,
        del as dbDel,
        clear as dbClear,
        keys as dbKeys,
        Store as dbStore,
      } from 'idb-keyval'

import * as JSON5 from 'json5'
import * as Config from 'Config'

var mgrs = MGRS
export let DataProvider = {
  onLoadComplete(cb) {
    DataProvider.loadCb = cb
  },
  async beginLoad(sources, toLoad) {
    let store = new dbStore(sources.dbStore_name, "store")
    let setNames = ['dataSet', 'iconSet', 'systemSet']
    let urlBase = location.href.slice(0, location.href.lastIndexOf("/"))
    let dataDates = await dbGet('dataDates', store) || {}
    let process, keyName, url
    let data = { dataSet: {}, iconSet: {}, systemSet: {} }
    let updateDates = false
    for (let nextLoad of toLoad) {
      for( let setName of setNames){
        process = sources.data_files[nextLoad]
        keyName = nextLoad+"_"+setName
        if(process.latestDates[setName]) {
          if(!dataDates[keyName] || dataDates[keyName] < process.latestDates[setName]) {
            console.log(setName+" db out of date")
            url = process[setName].includes('http') ? process[setName] : urlBase +"/"+process[setName]
            //console.log('loading '+keyName)
            Object.assign(data[setName], await DataProvider.loadAndStore(url, keyName, store))
            dataDates[keyName] = process.latestDates[setName]
            updateDates = true
          } else {
            console.log(keyName+' db current')
            Object.assign(data[setName], await dbGet(keyName, store))
          }
        }
      }
    }
    updateDates && await dbSet('dataDates', dataDates, store)
    DataProvider.init(data)
  },
  async loadAndStore(url, storeName, dbstore) {
    let resp = await fetch(url)
    let ds = JSON5.parse(await resp.text())
    dbSet(storeName, ds, dbstore)
    //console.log(ds)
    return ds
  },
  async beginLoad2(sources, toLoad) {
    let ds
    let icons
    if(navigator.onLine && await mgrs.idb.get('last_ds')!=Config.LAST_DS_DB) {
      //console.log("last datasource out of data")
      let url = location.href.slice(0, location.href.lastIndexOf("/"))
      let resp = await fetch(url+"/tfmg_base_data.json")
      ds = await resp.json()
      mgrs.idb.set("last_ds", Config.LAST_DS_DB)
      mgrs.idb.set("dataSet", ds)
    } else {
      //console.log('last datasource up to date')
      ds = await mgrs.idb.get("dataSet")
    }
    if(navigator.onLine && await mgrs.idb.get('last_icon_set')!=Config.LAST_ICON_SET) {
      let url = location.href.slice(0, location.href.lastIndexOf("/"))
      let resp = await fetch(url+"/tfmg_base_icons.json")
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
  async init(data) {
    mgrs.icon.import(data.iconSet)
    mgrs.item.import(data.dataSet.item)
    mgrs.data = data.dataSet
    DataProvider.loadCb({mgrs: mgrs})
  },
}
window.mgrs = mgrs