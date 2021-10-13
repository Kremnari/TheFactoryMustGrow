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
  statics: {},
  control: {
    obj_counter: 0
  },
  metaDefines: { // As meta, but organized by object types and direct paths
  },
  Tick: (td) => {
    for( let each of IgorCore.tick_entities.values()) {
      let order = IgorCore.object_tickers[each.$_type].$_signalOrders
      if(order) {
        order.forEach( (x) => {
          if(each.$_tags.has(x)) IgorCore.object_tickers[each.$_type][x].fn(each, td, IgorRunner)
        })
      } else {
        IgorCore.object_tickers[each.$_type].tick.fn(each, td, IgorRunner)
      }
    }
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
//  the Igor scope, it's internally used by the Igor Engine
//  to manipulate the lifecycle of it's objects
const IgorBuilder = {
  get data() { return IgorCore.data },
  newObject(type, subType, parent) {
    let obj = {
      $_id: "id_"+IgorCore.control.obj_counter++,
      $_type: type,
      $_subType: subType,
      $_parent: parent
    }
    obj.$_tags = TagMapProxy({to: IgorCore.$_tags, entity: obj})
    IgorCore.objs.set(obj.$_id, obj)
    return obj
  },
  newComponent: (objType, params ) => {
    if(IgorCore.metaDefines[objType]) {
      let [obj, cmds] = IgorCore.metaDefines[objType].new(params, IgorBuilder.newObject(objType, ""), IgorBuilder)
      if(IgorCore.object_tickers[objType]) {
        IgorCore.tick_entities.push(obj)
      }
      return obj.$_id
    } else {
      console.warn("cannot find object type")
      debugger
      return false
    }
  }
}


export const IgorUtils = {
  initialize(obj) {
    IgorCore.ticker = new Ticker(obj.ticker.ticks_perSec, obj.ticker.ticks_maxPhase)
    IgorCore.config.TICKS_PER_SECOND = obj.ticker.ticks_perSec
    IgorCore.statics["config.TICKS_PER_SECOND"] = obj.ticker.ticks_perSec
    IgorUtils.Ticker = IgorCore.ticker
    IgorCore.ticker_sub = IgorCore.ticker.subscribe(IgorCore.Tick)
    IgorCore.graphics = obj.viewTasker
    IgorCore.command = obj.commandTasker
    IgorCore.dbName = obj.dbName
    IgorCore.saveName = obj.saveName
    IgorCore.db = new Store(IgorCore.dbName, "store")
    if(IgorCore._provideTemp) {
      IgorCore._provideTemp.forEach( (elm) => {IgorCore.command.provide(elm.item, elm.fn, elm.sig, elm.valid)})
    }
    if(IgorCore._utilityTemp) {
      IgorCore._utilityTemp.forEach( (elm) => IgorCore.command.utilityFn(elm.named, elm.fn) )
    }
  },
  provide_CCC: (item, fn, sig, valid) => {
    //! Provides temporary passthrough for game commands
    //    so game action definitions won't reference CephlaComm directly
    if(!IgorCore.command) {
      IgorCore._provideTemp || (IgorCore._provideTemp = [])
      IgorCore._provideTemp.push({item, fn, sig, valid})
    } else {
      IgorCore.command.provide(item, fn, sig, valid)
    }
  },
  CCC_addUtility: (named, fn) => {
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
      _delete: fn._delete,
      actions,
    }
    if(actions?.tick){
      !IgorCore.object_tickers[who] && (IgorCore.object_tickers[who] = {})
      IgorCore.object_tickers[who].tick = {
        type: who,
        fn: actions.tick
      }
    }
    actions && Object.entries(actions).forEach(([prop, obj]) => {
      if(obj && obj.CC_provide) IgorUtils.provide_CCC(obj.CC_provide, obj, obj.signature, obj.validator)
      if(obj && obj.Igor_operation) IgorUtils.addOperation(obj.Igor_operation, obj)
      if(obj && obj.CC_utility) IgorUtils.CCC_addUtility(obj.CC_utility, obj)
    })
  
  },
  setStatic: (name, as) => {
    Object.defineProperty(IgorCore.statics, name, {
      value: as,
      writable: false
    })
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
      if(IgorCore.save.control) IgorCore.control = JSON.parse(IgorCore.save.control)
      //Reconnect tags
      IgorCore.objs.forEach( (x) => {
        x.$_tags = TagMapProxy({to: IgorCore.$_tags, entity: x, load: x.$_tags})
        if(IgorCore.object_tickers[x.$_type]) IgorCore.tick_entities.push(x)
      })
      //console.log('found save')
    } else {
      //Create new game
      IgorCore.game = IgorCore.metaDefines['#'].new
      //console.log('new game')
    }
    //console.log('db loaded')
  },
  setNamed(as, who) {
    IgorCore.namedObjs[as] = who
  },
  getObjId(id, doubleProp) {
    if(!doubleProp) return IgorCore.objs.get(id)
    return IgorCore.objs.get(IgorCore.objs.get(id)[doubleProp])
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
    console.log("Game saving...")
    let data = {
      game: JSON.stringify(IgorCore.game),
      objs: JSON.stringify(Array.from(IgorCore.objs.entries())),
      control: JSON.stringify(IgorCore.control)
    }
    dbSet(IgorCore.saveName, data, IgorCore.db)
  },
  backupSave() {
    let data = {
      game: JSON.stringify(IgorCore.game),
      objs: JSON.stringify(Array.from(IgorCore.objs.entries()))
    }
    dbSet("SaveGame_bak", data, IgorCore.db)
  },
  async loadBackup() {
    let save = await dbGet("SaveGame_bak", IgorCore.db)
    IgorCore.game = JSON.parse(save.game)
    IgorCore.objs = new Map(JSON.parse(save.objs))
    IgorCore.objs.forEach( (x) => {
      x.$_tags = TagMapProxy({to: IgorCore.$_tags, entity:x, load: x.$_tags})
      if(IgorCore.object_tickers[x.$_type]) IgorCore.tick_entities.push(x)
    })
    console.log("backup loaded")
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
      case "copySave":
        window.tfmg_save = await dbGet(IgorCore.saveName, IgorCore.db)
        return "done";
      case "storeSave":
        await dbSet(IgorCore.saveName, params, IgorCore.db);
        return "done";
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
    if(typeof obj == "string" && obj.includes("id")) obj = IgorCore.objs.get(obj)
    IgorCore.ops[op].fn(obj, args, ret, IgorRunner, IgorCore.ops[op].fn)
    //console.log('_result' in ret)
    return '_result' in ret ? ret._result : ret
  },
  getNamedObject: (what) => {
    return IgorCore.namedObjs[what]
  },
  getId: (which) => {
    return IgorCore.objs.get(which)
  },
  getStatic: (which) => {
    return IgorCore.statics[which]
  },
  updateStatic: (which, is) => {
    IgorCore.statics[which] = is
  },
  newComponent: (objType, params ) => {
    if(IgorCore.metaDefines[objType]) {
      let [obj, cmds] = IgorCore.metaDefines[objType].new(params, IgorBuilder.newObject(objType, ""), IgorBuilder)
      if(IgorCore.object_tickers[objType]) {
        IgorCore.tick_entities.push(obj)
      }
      return obj.$_id
    } else {
      console.warn("cannot find object type")
      debugger
      return false
    }
  },
  addNewObject: (target, objType, params ) => {
    if(IgorCore.metaDefines[objType]) {
      let [obj, cmds] = IgorCore.metaDefines[objType].new(params, IgorBuilder.newObject(objType, "", target.$_id), IgorBuilder)
      target.push(obj.$_id)
      if(IgorCore.object_tickers[objType]) {
        IgorCore.tick_entities.push(obj)
      }
      IgorCore.graphics.signaler.signal("addedEntity")
      IgorCore.graphics.signaler.signal("generalUpdate")
      return true
    } else {
      console.warn("cannot find object type")
      debugger
      return false
    }
  },
  deleteObject: (target) => {
    if(typeof target=="string" && target.includes("id")) target = IgorCore.objs.get(target)
    let del = IgorCore.metaDefines[target.$_type]._delete
    del && del(target, IgorRunner)
    console.warn("deleting: "+target.$_id)
    IgorCore.objs.delete(target.$_id)
  }
}


window.IgorCore = IgorCore
