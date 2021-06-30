import Ticker from "ticker"

const IgorCore = {
  tick_entities: [],
  object_tickers: {},
  Tick: (td) => {
    for(let each of IgorCore.tick_entities) {
      IgorCore.object_tickers[each.as].fn(td, each.obj)
    }
  },
  Tick_Builder: (td) => {

  }
}


export const IgorUtils = {
  
  Ticker_temp: (t) => {
    //!  Should depreciate ASAP, this is an inversion of control
    // IgorJS should be outputting tick events to the DOM thread
    t.DataProvider((td) => { IgorCore.Tick_Builder(td) })
    t.subscribe((td) => { IgorCore.Tick(td)})
  },
  addToTicker: (what, who) => {
    IgorCore.tick_entities.push({obj: who, as: what})
  },
  // tickDataSig would be the required parameters on TickData
  addObjectTickFunction: (what, who, tickDataSig) => {
    IgorCore.object_tickers[who] = {
      object: who,
      fn: what,
      tickDataSig
    }
  },
  finalize(obj) {
    IgorCore.ticker = new Ticker(obj.ticker.ticks_perSec, obj.ticker.ticks_maxPhase);
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
  getTicker() {
    return IgorCore.ticker
  }
}
