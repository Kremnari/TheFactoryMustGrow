import Ticker from "ticker"

const IgorCore = {
  tick_entities: [],
  object_tickers: {},
  game: {}, // Tis the base game json
  meta: {}, // Contains all the runtime data
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


export const IgorUtils = {
  captureEvent: (which, cb) => {

  },
  Ticker_temp: (t) => {
    //!  Should depreciate ASAP, this is an inversion of control
    // IgorJS should be outputting tick events to the DOM thread
    t.DataProvider((td) => { IgorCore.Tick_Builder(td) })
    t.subscribe((td) => { IgorCore.Tick(td)})
  },
  defineObj: (what, path) => {
    let who = IgorCore.game.walkPath(path)
    IgorCore.metaDefines.push({
      obj: who,
      as: what
    })
  },
  // tickDataSig would be the required parameters on TickData
  addObjectTickFunction: (what, who, tickDataSig) => {
    IgorCore.object_tickers[who] = {
      object: who,
      fn: what,
      tickDataSig
    }
  },
  initialize(obj) {
    IgorCore.ticker = new Ticker(obj.ticker.ticks_perSec, obj.ticker.ticks_maxPhase)
    IgorUtils.Ticker = IgorCore.ticker
  },
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
