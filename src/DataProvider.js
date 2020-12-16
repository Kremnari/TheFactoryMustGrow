import {mgrs as MGRS} from 'managers'
let mgrs = MGRS
export let DataProvider = {
  onLoadComplete(cb) {
    DataProvider.loadCb = cb
  },
  async beginLoad() {
    let ds = await mgrs.idb.get('dataSet')
    if(!ds) {
      let resp = await fetch("./data_source.json")
      ds = await resp.json()
      console.log('loaded from file')
      await mgrs.idb.set('dataSet', ds)
    } else console.log('loaded from db')
    let save = await mgrs.idb.get("SaveGame") || {}

    DataProvider.init(ds, save)
  },
  async init(data, save) {
    mgrs.icon.import(data.icons)
    mgrs.item.import(mgrs.icon.restoreIcons(data.item))
    mgrs.res.import(mgrs.icon.restoreIcons(data.resource))
    mgrs.rec.import(mgrs.icon.restoreIcons(data.recipe), mgrs.item)
    mgrs.tech.import(mgrs.icon.restoreIcons(data.technology), mgrs, save?.techs)
    mgrs.entity.import(mgrs.icon.restoreIcons(data.entity), mgrs)
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
