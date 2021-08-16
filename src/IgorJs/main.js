import Ticker from "ticker"
import {set as dbSet, get as dbGet, del as dbDel, clear as dbClear, keys as dbKeys, Store as dbStore, Store} from 'idb-keyval'
import KVSMap from "resources/types/KVSMap"
import {TagMapProxy} from "resources/types/TagsProxy"

const IgorCore = {
  tick_entities: [],
  object_tickers: {},
  game: {}, // Tis the base game json
  objs: new Map(),
  namedObjs: [],
  $_tags: new KVSMap(),
  meta: {}, // Contains all the runtime data
  ops: {},
  metaDefines: { // As meta, but organized by object types and direct paths
    
  },
  Tick: (td) => {
    for( let each of IgorCore.tick_entities.values()) {
      let order = IgorCore.object_tickers[each.$_type].$_signalOrders
      order.forEach( (x) => {
        if(each.$_tags.has(x)) IgorCore.object_tickers[each.$_type][x].fn(each, td, IgorRunner)
      })
    }
    /*
    for(let each of IgorCore.$_tags.get('ticking').values()) {
      //generate tick data using Tick_Builder
      //  per each types tick data signature
      each.forEach( (x) => {
        IgorCore.object_tickers[x.$_type].fn(x,td, IgorRunner)
      })
    }
    */
  },
  Tick_Builder: (td) => {
    let ret  = {}
    Object.assign(ret, td)
    // Lookup tick data signature
    //  execute callbacks to acquire data
    return ret
  },
  IgorBuilder,
  config: {}
}

//* IgorBuilder should only called/accessed from within
//  the Igor scope, it's used internally used by the Igor Engine
//  to manipulate the lifecycle of it's objects
const IgorBuilder = {
  get data() { return IgorCore.data },
  newObject(type, subType, parent) {
    let obj = {
      $_id: "id_"+IgorCore.objs.size,
      $_type: type,
      $_subType: subType,
    }

    obj.$_tags = TagMapProxy({to: IgorCore.$_tags, entity: obj})
    IgorCore.objs.set(obj.$_id, obj)
    parent.push(obj.$_id)
    return obj
  },
}


export const IgorUtils = {
  initialize(obj) {
    IgorCore.ticker = new Ticker(obj.ticker.ticks_perSec, obj.ticker.ticks_maxPhase)
    IgorCore.config.TICKS_PER_SECOND = obj.ticker.ticks_perSec
    IgorUtils.Ticker = IgorCore.ticker
    IgorCore.ticker_sub = IgorCore.ticker.subscribe(IgorCore.Tick)
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
    //    so game action definitions won't reference CephlaComm directly
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
  defineObj: (who, fn, actions) => {
    IgorCore.metaDefines[who] = {
      new: fn,
      actions,
    }
    if(actions?.tick){
      !IgorCore.object_tickers[who] && (IgorCore.object_tickers[who] = {})
      IgorCore.object_tickers[who].tick = {
        type: who,
        fn: actions.tick
      }
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
  //! I don't really like this implementation
  // I need a way to provide different tick processors for different tags
  // tickDataSig would be the needed parameters from the passed TickData
  addObjectTickHandler: (who, what, named, priority) => {
    !IgorCore.object_tickers[who] && (IgorCore.object_tickers[who]  = {})

    let at = IgorCore.object_tickers[who]
    at[named] = {
      type: who,
      fn: what,
      priority
    }
    //Regenerate priorities... add to base object_tickers
    let order = at.$_signalOrders || ["tick"]
    let tickIdx = order.findIndex((x)=> x=="tick")
    if(priority.chain) {
      //! Lots more needed for this...
      // need to account for priorities
      [].splice.apply(order, [tickIdx, 1].concat(priority.chain))
    } else if(priority.num) {
      //... also if no chain exists...
    }
    at.$_signalOrders = order
  },
  async loadDatabase(dataset) {
    IgorCore.data = dataset
    //Iterate through data objects
    // pass required info into Graphics and Command processors
    
    //If save loaded,
    IgorCore.save = await dbGet(IgorCore.saveName, IgorCore.db)
    if(IgorCore.save) {
      IgorCore.game = JSON.parse(IgorCore.save.game)
      IgorCore.objs = new Map(JSON.parse(IgorCore.save.objs))
      //Reconnect tags
      IgorCore.objs.forEach( (x) => {
        x.$_tags = TagMapProxy({to: IgorCore.$_tags, entity: x, load: x.$_tags})
        if(IgorCore.object_tickers[x.$_type]) IgorCore.tick_entities.push(x)
      })
      console.log('found save')
    } else {
      //Create new game
      IgorCore.game = IgorCore.metaDefines['#'].new
      console.log('new game')
    }
    console.log('db loaded')
  },
  setNamed(as, who) {
    IgorCore.namedObjs[as] = who
  },
  getObjId(id) {
    return IgorCore.objs[id]
  },
  arrayFromIds(list) {
    if(!list) return []
    let ret = []
    list.forEach( (id) => { ret.push(IgorCore.objs.get(id)) })
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
      objs: JSON.stringify(Array.from(IgorCore.objs.entries()))
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
      case "tick":
        IgorCore.ticker.once();
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
  get data() { return IgorCore.data },
  get view() { return IgorCore.graphics },
  get config() { return IgorCore.config }, 
  processTEMP: (obj, op, args) => {
    let ret = {}
    IgorCore.ops[op].fn(obj, args, ret, IgorRunner, IgorCore.ops[op].fn)
    //console.log('_result' in ret)
    return '_result' in ret ? ret._result : ret
  },
  getNamedObject: (what) => {
    return IgorCore.namedObjs[what]
  },
  addNewObject: (target, objType, params ) => {
    if(IgorCore.metaDefines[objType]) {
      let [obj, cmds] = IgorCore.metaDefines[objType].new(params, IgorBuilder.newObject(objType, "", target), IgorBuilder)
      if(IgorCore.object_tickers[objType]) {
        IgorCore.tick_entities.push(obj)
      }
      return true
    } else {
      console.warn("cannot find object type")
      debugger
      return false
    }
  }
}


window.IgorCore = IgorCore
