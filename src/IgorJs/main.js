import Ticker from "ticker"
import {set as dbSet, get as dbGet, del as dbDel, clear as dbClear, keys as dbKeys, Store as dbStore, Store} from 'idb-keyval'
import KVSMap from "resources/types/KVSMap"
import {TagMapProxy} from "resources/types/TagsProxy"

const IgorCore = {
  tick_entities: [],
  object_tickers: {},
  hardTickers: {},
  eventHandlers: {},
  featureDefines: {},
  userData: {},
  game: {}, // Tis the base game json
  objs: new Map(),
  namedObjs: [],
  $_tags: new KVSMap(),
  meta: {}, // Contains all the runtime data
  ops: {},
  statics: {},
  control: {
    obj_counter: 0,
    dataSets: ["TFMG_BASE_DATA"]
  },
  metaDefines: { // As meta, but organized by object types and direct paths
  },
  Tick: (td) => {
    for( let each of IgorCore.tick_entities.values()) {
      if(!each._tags.tick) continue
      let order = IgorCore.object_tickers[each.$_type].$_signalOrders
      if(order) {
        order.forEach( (x) => {
          if(each._tags[x]) IgorCore.object_tickers[each.$_type][x].fn(each, td, IgorRunner)
        })
      } else {
        IgorCore.object_tickers[each.$_type].tick.fn(each, td, IgorRunner)
      }
    }
    for( let each of Object.values(IgorCore.eventHandlers['tick'])) {
      each(td, IgorRunner)
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
  get view() { return IgorCore.graphics },
  get config() { return IgorCore.config },
  getNamedObject(who) {
    if(who=="global" || who=="game") return IgorCore.game
    return Object.walkPath(IgorCore.game, IgorCore.namedObjs[who])
  },
  newObject(type, subType, parent) {
    let obj = {
      $_id: "id_"+IgorCore.control.obj_counter++,
      $_type: type,
      $_subType: subType,
      $_parent: parent?.$_id || parent
    }
    obj.$_tags = TagMapProxy({to: IgorCore.$_tags, entity: obj})
    IgorCore.objs.set(obj.$_id, obj)
    return obj
  },
  newComponent: (objType, params, parent ) => {
    if(IgorCore.metaDefines[objType]) {
      let [obj, cmds] = IgorCore.metaDefines[objType].new(params, IgorBuilder.newObject(objType, "", parent), IgorBuilder)
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
  subscribedFeatures: IgorCore.userData,
  gameList: [],
  async initialize(obj) {
    IgorCore.graphics = obj.viewTasker
    IgorCore.command = obj.commandTasker
    IgorCore.ticker = new Ticker(obj.ticker, IgorCore.graphics.signaler)
    IgorUtils.Ticker = IgorCore.ticker
    IgorCore.ticker_sub = IgorCore.ticker.subscribe(IgorCore.Tick)
    IgorCore.dbName = obj.dbName
    IgorCore.db = new Store(IgorCore.dbName, "store")
    IgorUtils.dataSets = obj.dataSets.data_files
    if(IgorCore._provideTemp) {
      IgorCore._provideTemp.forEach( (elm) => {IgorCore.command.provide(elm.item, elm.fn, elm.sig, elm.valid)})
    }
    if(IgorCore._utilityTemp) {
      IgorCore._utilityTemp.forEach( (elm) => IgorCore.command.utilityFn(elm.named, elm.fn) )
    }
    //load last game from IgorCore.db
    IgorCore.command.provide("core.loadGame", async (data) => {
      console.log('loading game', data.name.game)
    }, {name: 'game'})

    IgorUtils.gameList = await dbGet("gameList", IgorCore.db) || []
    IgorCore.saveName = await dbGet("lastSaveName", IgorCore.db)
    if(!IgorCore.saveName) { IgorUtils.newGame() }
    else {IgorUtils.loadGame(IgorCore.saveName) }
  },
  getDataSets() {
    return IgorCore.control.dataSets
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
      _signal: fn._signal,
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
      if(obj && obj.CC_dialogList) IgorUtils.CCC_addUtility(obj.CC_dialogList, obj)
      if(obj.Igor_Event) {
        !IgorCore.eventHandlers[obj.Igor_Event.type] && (IgorCore.eventHandlers[obj.Igor_Event.type] = {})
        IgorCore.eventHandlers[obj.Igor_Event.type][obj.Igor_Event.name] = obj
      }
    })
  
  },
  defineFeature: (who, actions) => {
    IgorCore.featureDefines[who] = actions
    actions && Object.entries(actions).forEach(([prop, obj]) => {
      if(obj) {
        obj.CC_provide && IgorUtils.provide_CCC(obj.CC_provide, obj, obj.signature, obj.validator)
        obj.Igor_operation && IgorUtils.addOperation(obj.Igor_operation, obj)
        obj.CC_utility && IgorUtils.CCC_addUtility(obj.CC_utility, obj)
        obj.CC_dialogList && IgorUtils.CCC_addUtility(obj.CC_dialogList, obj)
        if(obj.Igor_Event) {
          !IgorCore.eventHandlers[obj.Igor_Event.type] && (IgorCore.eventHandlers[obj.Igor_Event.type] = {})
          IgorCore.eventHandlers[obj.Igor_Event.type][obj.Igor_Event.name] = obj
        }
      }
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
  addEventHandler: (named, fn) => {
    //if push fn to IgorCOre.eventHandlers and add [named] if not present
    if(!IgorCore.eventHandlers[named]) {
      IgorCore.eventHandlers[named] = []

    }
    IgorCore.eventHandlers[named].push(fn)
  },
  //! I don't really like this implementation
  // I need a way to provide different tick processors for different tags
  // tickDataSig would be the needed parameters from the passed TickData
  addObjectTickHandler: (who, what, named, priority) => {
    !IgorCore.object_tickers[who] && (IgorCore.object_tickers[who]  = {})
    //console.warn("ObjectTickHandler: "+who)
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
  loadDatabase(dataset) {
    //? Is this really all it's needed for?
    IgorCore.data = dataset
  },
  async loadGame(name) {
    //find game in gamelist and set game on IgorCore
    IgorCore.save = await dbGet(name, IgorCore.db)
    IgorCore.game = JSON.parse(IgorCore.save.game)
    IgorCore.objs = new Map(JSON.parse(IgorCore.save.objs))
    if(IgorCore.save.control) IgorCore.control = JSON.parse(IgorCore.save.control)
    //Reconnect tags
    IgorCore.objs.forEach( (x) => {
      x.$_tags = TagMapProxy({to: IgorCore.$_tags, entity: x, load: x.$_tags})
      if(IgorCore.object_tickers[x.$_type]) IgorCore.tick_entities.push(x)
    })
    // run each function in eventhandlers['gameload']
    //? Obsolete?
    if(IgorCore.eventHandlers["gameLoad"]) {
      IgorCore.eventHandlers["gameLoad"].forEach( (x) => x(IgorUtils) )
    }
  },
  newGame(gameOptions) {
    !gameOptions && (gameOptions = {name: 'SaveGame', dataSets: ['TFMG_BASE_DATA']})
    //TODO compile metaDefines based on loadData
    IgorCore.game = IgorCore.metaDefines['#'].new
    IgorCore.objs = new Map()
    IgorCore.control = {obj_counter: 0, dataSets: gameOptions.dataSets}
    IgorCore.saveName = gameOptions.name
    IgorUtils.gameList.push(gameOptions)
  },
  saveGame() {
    console.log("Game saving...")
    if(IgorCore.eventHandlers['gameSave']) {
      IgorCore.eventHandlers['gameSave'].forEach( (fn) => {
        fn(IgorUtils)
      })
    }
    let data = {
      game: JSON.stringify(IgorCore.game),
      objs: JSON.stringify(Array.from(IgorCore.objs.entries())),
      control: JSON.stringify(IgorCore.control)
    }
    dbSet(IgorCore.saveName, data, IgorCore.db)
    dbSet("lastSaveName", IgorCore.saveName, IgorCore.db)
    dbSet("gameList", IgorUtils.gameList, IgorCore.db)
  },
  setNamed(who, path) {  IgorCore.namedObjs[who] = path  },
  getNamed(who) {
    if(who=="global" || who=="game") return IgorCore.game
    return Object.walkPath(IgorCore.game, IgorCore.namedObjs[who])
  },
  getObjId(id, doubleProp) {
    if(!doubleProp) return IgorCore.objs.get(id)
    let obj = IgorCore.objs.get(id)
    obj = Object.walkPath(obj, doubleProp)
    return IgorCore.objs.get(obj)
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
        IgorCore.graphics.signaler.signal("generalUpdate")
        IgorCore.graphics.signaler.signal("entityUpdate")
        IgorCore.graphics.signaler.signal("techResearched")
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
        if(IgorCore.ticker.isRunning) {
          IgorCore.graphics.signaler.signal("generalUpdate")
          IgorCore.graphics.signaler.signal("entityUpdate")
          IgorCore.graphics.signaler.signal("techResearched")
        }
        break;
      default:
        console.warn("IGOR: setting unknown state")
    }
  },
  async commands(what, params) {
    switch(what) {
      case "resetSave":
        let idx = IgorUtils.gameList.findIndex( x => x.name==IgorCore.saveName )
        if(idx > -1) {
          IgorUtils.gameList.splice(idx, 1)
          dbSet("gameList", IgorUtils.gameList, IgorCore.db)
        }
        await dbDel(IgorCore.saveName, IgorCore.db)
        if(IgorUtils.gameList.length>0) {
          dbSet("lastSaveName", IgorUtils.gameList[0].name, IgorCore.db)
        } else {
          dbDel("lastSaveName", IgorCore.db)
        }

        return true;
      case "copySave":
        window.tfmg_save = await dbGet(IgorCore.saveName, IgorCore.db)
        return "done";
      case "storeSave":
        await dbSet(IgorCore.save, params, IgorCore.db);
        return "done";
      case "backupSave":
        IgorUtils.backupSave()
        return "done"
      case "restoreBackupSave":
        let save = await dbGet("SaveGame_bak", IgorCore.db)
        dbSet(IgorCore.saveName, save, IgorCore.db)
        return "done"
    }
  }
}


//  The purpose of IgorRunner is to accept commands from external sources, and process them into the
//  Igor environment
//The IgorRunner is passed to GameObjectActionFunctions so they may emit events or get data
export const IgorRunner = {
  checkAndEmit: (className, validator, data) => {
    //I emit events into Igor
    let found = false
    if(typeof validator=="string") {
      IgorCore.eventHandlers[className][validator](data, IgorRunner)
    } else {
      IgorCore.eventHandlers[className].forEach( (event) => {
        if(validator_CB(event.data)) {
          event.fn(data, IgorRunner)
          found = true
        }
      })
      return found
    }
  },
  get data() { return IgorCore.data },
  get view() { return IgorCore.graphics },
  get config() { return IgorCore.config },
  get ticker() { return IgorCore.ticker },

  processTEMP: (obj, op, args) => {
    let ret = {}
    if(typeof obj == "string") {
      if(obj.includes("id")) {
        obj = IgorCore.objs.get(obj)
      } else {
        let temp = IgorRunner.getNamedObject(obj)
        if(temp) obj = temp
      }
    }
    if(!IgorCore.ops[op]) {
      console.error("operation not found: "+op)
    }
    IgorCore.ops[op].fn(obj, args, ret, IgorRunner, IgorCore.ops[op].fn)
    //console.log('_result' in ret)
    return '_result' in ret ? ret._result : ret
  },
  getNamedObject: (who) => {
    if(who=="global" || who=="game") return IgorCore.game
    return Object.walkPath(IgorCore.game, IgorCore.namedObjs[who])
  },
  getId: (which, doubleProp) => {
    if(!doubleProp) return which.$_id ? which : IgorCore.objs.get(which)
    let obj = which.$_id ? which : IgorCore.objs.get(which)
    obj = Object.walkPath(obj, doubleProp)
    return IgorCore.objs.get(obj)
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
  addEventHandler: (name, cb) => {
    if(!IgorCore.eventHandlers[name]) {
      IgorCore.eventHandlers[name] = []

    }
    IgorCore.eventHandlers[name].push(cb)
  },
  addNewObject: (target, objType, params ) => {
    let def = IgorCore.metaDefines[objType]
    if(def) {
      let [obj, cmds] = def.new(params, IgorBuilder.newObject(objType, "", target.$_id), IgorBuilder)
      if(!obj) return false
      target.push(obj.$_id)
      if(IgorCore.object_tickers[objType]) {
        IgorCore.tick_entities.push(obj)
      }
      if(def._signal) IgorCore.graphics.signaler.signal(def._signal)
      return true
    } else {
      console.warn("cannot find object type")
      debugger
      return false
    }
  },
  deleteObject: (target) => {
    if(typeof target=="string" && target.includes("id")) target = IgorCore.objs.get(target)
    let def = IgorCore.metaDefines[target.$_type]
    let del = def._delete
    del && del(target, IgorRunner)
    let idx = IgorCore.tick_entities.findIndex( (x) => { return x.$_id==target.$_id })
    IgorCore.tick_entities.splice(idx, 1)
    IgorCore.objs.delete(target.$_id)
    IgorRunner.view.clearShowing()
    def._signal && IgorCore.graphics.signaler.signal(def._signal)
  }
}
IgorBuilder.processTEMP = IgorRunner.processTEMP

window.IgorCore = IgorCore
