import Ticker from "ticker"
import {set as dbSet, get as dbGet, del as dbDel, clear as dbClear, keys as dbKeys, Store as dbStore, Store} from 'idb-keyval'
import KVSMap from "resources/types/KVSMap"
import {TagMapProxy} from "resources/types/TagsProxy"

const IgorCore = {
  tick_entities: [],
  object_tickers: {},
  game: {}, // Tis the base game json
  objs: [],
  $_tags: new KVSMap(),
  meta: {}, // Contains all the runtime data
  ops: {},
  metaDefines: { // As meta, but organized by object types and direct paths
    
  },
  Tick: (td) => {
    for(let each of IgorCore.tick_entities) {
      IgorCore.object_tickers[each.as].fn(td, each.obj)
    }
  },
  Tick_Builder: (td) => {

  },
  IgorBuilder,
  IgorRunner,
  config: {}
}

//* IgorBuilder should only called/accessed from within
//  the Igor scope, it's used internally used by the Igor Engine
//  to manipulate the lifecycle of it's objects
const IgorBuilder = {
  get data() { return IgorCore.data },
  newObject(type, subType, parent) {
    let obj = {
      $_id: "id_"+IgorCore.objs.length,
      $_type: type,
      $_subType: subType,
      $_tags: TagMapProxy({to: IgorCore.$_tags, entity: obj})
    }
    IgorCore.objs[obj.$_id] = obj
    parent.push(obj.$_id)
    return obj
  },
}


export const IgorUtils = {
  initialize(obj) {
    IgorCore.ticker = new Ticker(obj.ticker.ticks_perSec, obj.ticker.ticks_maxPhase)
    IgorCore.config.TICKS_PER_SECOND = obj.ticker.ticks_perSec
    IgorUtils.Ticker = IgorCore.ticker
    IgorCore.graphics = obj.viewTasker
    IgorCore.command = obj.commandTasker
    IgorCore.dbName = obj.dbName
    IgorCore.saveName = obj.saveName
    IgorCore.db = new Store(IgorCore.dbName, "store")
    if(IgorCore._provideTemp) {
      IgorCore._provideTemp.forEach( (elm) => {IgorCore.command.provide(elm.item, elm.fn, elm.sig)})
    }
    if(IgorCore._utilityTemp) {
      IgorCore._utilityTemp.forEach( (elm) => IgorCore.command.utilityFn(elm.named, elm.fn) )
    }
  },
  provide_CCC: (item, fn, sig) => {
    //! Provides temporary passthrough for game commands
    //    so game action definintions won't reference CephlaComm directly
    if(!IgorCore.command) {
      IgorCore._provideTemp || (IgorCore._provideTemp = [])
      IgorCore._provideTemp.push({item, fn, sig})
    } else {
      IgorCore.command.provide(item, fn, sig)
    }
  },
  addUtility_CCC: (named, fn) => {
    if(!IgorCore.command) {
      IgorCore._utilityTemp || (IgorCore._utilityTemp = [])
      IgorCore._utilityTemp.push({named, fn})
    } else {
      IgorCore.command.utilityFn(named, fn)
    }

  },
  defineData: (table ) => {

  },
  defineObj: (what, fn, actions) => {
    IgorCore.metaDefines[what] = {
      new: fn,
      actions,
    }
  },
  addOperation: (op, fn) => {
    //* These functions are only accessible from game codes
    // Their signature shouldn't need to be known
    IgorCore.ops[op] = {fn}
  },
  amendObject(who, obj) {
   //?  should I throw an error if the object doesn't exist? 
  },
  //!
  // tickDataSig would be the needed parameters from the passed TickData
  addObjectTickFunction: (who, what, tickDataSig) => {
    IgorCore.object_tickers[who] = {
      object: who,
      fn: what,
      tickDataSig
    }
  },
  async loadDatabase(dataset) {
    IgorCore.data = dataset
    //Iterate through data objects
    // pass required info into Graphics and Command processors
    
    //If save loaded,
    let save = await dbGet(IgorCore.saveName, IgorCore.db)
    if(save) {
      IgorCore.game = JSON.parse(save.game)
      IgorCore.objs = JSON.parse(save.objs)
      //Reconnect tags
      console.log('found save')
    } else {
      //Create new game
      IgorCore.game = IgorCore.metaDefines['#'].new
      console.log('new game')
    }
    console.log('db loaded')
  },
  getObjId(id) {
    return IgorCore.objs[id]
  },
  arrayFromIds(list) {
    if(!list) return []
    let ret = []
    list.forEach( (id) => { ret.push(IgorCore.objs[id]) })
    console.log(ret)
    return ret
  },
  getRunner() { return IgorRunner },
  get globalObject() {
    return IgorCore.game
  },
  get dataSet() {
    return IgorCore.data
  },
  get(named, specifiers) {
    return IgorCore.objects_by_name()
  },
  saveGame() {
    let data = {
      game: JSON.stringify(IgorCore.game),
      objs: JSON.stringify(IgorCore.objs)
    }
    dbSet(IgorCore.saveName, data, IgorCore.db)
  },
  setState(which) {
    switch(which) {
      case "start":
        IgorCore.ticker.resume();
        break;
      case "stop":
        IgorCore.ticker.pause();
        break;
      case "toggle":
        IgorCore.ticker.toggle();
        break;
      default:
        console.warn("IGOR: setting unknown state")
    }
  },
  async commands(what, params) {
    switch(what) {
      case "resetSave":
        await dbDel(IgorCore.saveName, IgorCore.db)
        return true;
        break;
    }
  }
}


//  The purpose of IgorRunner is to accept commands from external sources, and process them into the
//  Igor environment
//The IgorRunner is passed to GameObjectActionFunctions so they may emit events or get data
export const IgorRunner = {
  emit: () => {
    //I emit events into Igor
  },
  get view() {
    return IgorCore.graphics
  },
  get data() { return IgorCore.data },
  get view() { return IgorCore.graphics },
  get config() { return IgorCore.config },
  processTEMP: (obj, op, args) => {
    let ret = {}
    IgorCore.ops[op].fn(obj, args, ret, IgorRunner, IgorCore.ops[op].fn)
    return '_result' in ret ? ret._result : ret
  },
  addNewObject: (target, objType, params ) => {
    if(IgorCore.metaDefines[objType]) {
      let [obj, cmds] = IgorCore.metaDefines[objType].new(params, IgorBuilder.newObject(objType, "", target), IgorBuilder)
      return true
    } else {
      console.warn("cannot find object type")
      debugger
      return false
    }
  }
}


window.IgorCore = IgorCore
