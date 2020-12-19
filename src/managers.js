import IconMgr from 'IconMgr';
import ItemMgr from 'ItemMgr'
import ResMgr from  'ResMgr'
import RecipeMgr from 'RecipeMgr'
import TechMgr from 'TechMgr'
import Ticker from "ticker"
import {EntityMgr} from 'EntityMgr'
import {DialogMgr} from 'resources/dialogs/DialogMgr'
import {set as dbSet, get as dbGet, del as dbDel} from 'idb-keyval'
import {inject} from 'aurelia-framework'

export const mgrs =  {
  icon: new IconMgr(),
  item: new ItemMgr(),
  res: new ResMgr(),
  tech: new TechMgr(),
  rec: new RecipeMgr(),
  entity: new EntityMgr(),
  DS: DialogMgr,
  idb: {
    set: dbSet,
    get: dbGet,
    del: dbDel
  },
  Ticker: new Ticker()
}
