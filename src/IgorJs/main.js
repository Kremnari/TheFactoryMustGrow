import Ticker from "ticker"

const IgorCore = {
  tick_entities: [],
  object_tickers: {},
  game: {}, // Tis the base game json
  objs: [],
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

  }
}

export const IgorBuilder = {
  get data() { return IgorCore.data },
  finalizeObj(obj) {
    obj.$_id = IgorCore.objs.length
    IgorCore.objs.push(obj)

  },
}


export const IgorUtils = {
  captureEvent: (which, cb) => {

  },
  Ticker_temp: (t) => {
    //!  Should depreciate ASAP, this is an inversion of control
    // IgorJS should be outputting tick events to the DOM thread
    t.DataProvider((td) => { IgorCore.Tick_Builder(td) })
    t.subscribe((td) => { IgorCore.Tick(td)})
  },
  defineObj: (what, fn, actions) => {
    IgorCore.metaDefines[what] = {
      new: fn,
      actions,
    }
  },
  addOperation: (op, fn) => {
    IgorCore.ops[op] = {fn}
  },
  // tickDataSig would be the required parameters on TickData
  addObjectTickFunction: (what, who, tickDataSig) => {
    IgorCore.object_tickers[who] = {
      object: who,
      fn: what,
      tickDataSig
    }
  },
  loadDatabase(dataset) {
    IgorCore.data = dataset
    //Iterate through data objects
    // pass required info into Graphics and Command processors
  },
  loadSave(data) {
    
    IgorCore.setGlobal(data)
  },
  initialize(obj) {
    IgorCore.ticker = new Ticker(obj.ticker.ticks_perSec, obj.ticker.ticks_maxPhase)
    IgorUtils.Ticker = IgorCore.ticker
    IgorCore.graphics = obj.viewTasker
    IgorCore.command = obj.commandTasker
  },
  getRunner() { return IgorRunner },
  get(named, specifiers) {
    return IgorCore.objects_by_name()
  },
  setGlobal(obj) {
    IgorCore.game = obj
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
  }
}

Object.defineProperty(IgorUtils, "globalObject", {
  get() {
    return IgorCore.game
  }
})

//The IgorRunner is passed to GameObjectActionFunctions so they may emit events or get data
export const IgorRunner = {
  emit: () => {
    //I emit events into Igor
  },
  get data() { return IgorCore.data },
  processTEMP: (obj, op, args) => {
    let ret = {}
    IgorCore.ops[op].fn(obj, args, ret, IgorRunner, IgorCore.ops[op].fn)
    return '_result' in ret ? ret._result : ret
  },
  addNewObject: (target, objType, params ) => {
    if(IgorCore.metaDefines[objType]) {
      let [obj, cmds] = IgorCore.metaDefines[objType].new(params, IgorBuilder)
      target.push()
      return true
    } else {
      console.warn("cannot find object type")
      return false
    }
  }
}
