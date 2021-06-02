import IconMgr from 'IconMgr';
import ItemMgr from 'ItemMgr'
import ResMgr from  'ResMgr'
import RecipeMgr from 'RecipeMgr'
import TechMgr from 'TechMgr'
import Ticker from "ticker"
import {Rounder} from 'Rounder'
import {EntityMgr} from 'EntityMgr'
import {set as dbSet, get as dbGet, del as dbDel, clear as dbClear} from 'idb-keyval'

export const mgrs =  {
  icon: new IconMgr(),
  item: new ItemMgr(),
  res: new ResMgr(),
  tech: new TechMgr(),
  rec: new RecipeMgr(),
  entity: new EntityMgr(),
  rounder: Rounder,
  DS: null,
  idb: {
    set: dbSet,
    get: dbGet,
    del: dbDel,
    clear: dbClear
  },
  Ticker: new Ticker()
}
