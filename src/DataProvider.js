//import './data_source.json';
import {inject} from 'aurelia-framework'
import IconMgr from 'IconMgr';
import ItemMgr from 'ItemMgr'
import ResMgr from  'ResMgr'
import RecipeMgr from 'RecipeMgr'
import TechMgr from 'TechMgr'
import Ticker from "ticker"
import {EntityMgr} from 'EntityMgr'
import {set as dbSet, get as dbGet, del as dbDel} from 'idb-keyval'

@inject(IconMgr, ItemMgr, ResMgr, TechMgr, RecipeMgr, EntityMgr)
export default class DataProvider {
  constructor(IM, Im, RM, TM, RcM, EM) {
    this.mgrs = {
      icon: IM,
      item: Im,
      res: RM,
      tech: TM,
      rec: RcM,
      entity: EM,
      idb: {
        set: dbSet,
        get: dbGet,
        del: dbDel
      }
    }
    this.mgrs.Ticker = new Ticker()
  }
  onLoadComplete(cb) {
    this.loadCb = cb
  }
  async beginLoad() {
    let ds = await dbGet('dataSet')
    if(!ds) {
      let resp = await fetch("./tfmg/data_source.json")
      ds = await resp.json()
      console.log('loaded from file')
      await dbSet('dataSet', ds)
    } else console.log('loaded from db')
    let save = await dbGet("SaveGame") || {}

    this.init(ds, save)
  }
  async init(data, save) {
    this.mgrs.icon.import(data.icons)
    this.mgrs.item.import(this.mgrs.icon.restoreIcons(data.item))
    this.mgrs.res.import(this.mgrs.icon.restoreIcons(data.resource))
    this.mgrs.rec.import(this.mgrs.icon.restoreIcons(data.recipe), this.mgrs.item)
    this.mgrs.tech.import(this.mgrs.icon.restoreIcons(data.technology), this.mgrs, save?.techs)
    this.mgrs.entity.import(this.mgrs.icon.restoreIcons(data.entity), this.mgrs)
    this.loadCb({mgrs: this.mgrs, save: save})
  }
  saveGame(data) {
    if(data) {
      dbSet("SaveGame", data)
    } else {
      dbDel("SaveGame")
      window.location.reload()
    }
  }
}
