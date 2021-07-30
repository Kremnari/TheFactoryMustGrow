import IconMgr from 'IconMgr';
import ItemMgr from 'ItemMgr'
import RecipeMgr from 'RecipeMgr'
import {Rounder} from 'Rounder'
import {EntityMgr} from 'EntityMgr'
import {set as dbSet, get as dbGet, del as dbDel, clear as dbClear, keys as dbKeys} from 'idb-keyval'

export const mgrs =  {
  icon: new IconMgr(),
  item: new ItemMgr(),
  rec: new RecipeMgr(),
  entity: new EntityMgr(),
  rounder: Rounder,
  DS: null,
  idb: {
    set: dbSet,
    get: dbGet,
    del: dbDel,
    clear: dbClear,
    list: dbKeys
  },
}
