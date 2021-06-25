const IgorCore = {
  tick_entities: [],
  object_tickers: {}
}


export const IgorJS = {
  Ticker_temp: (t) => {
    //!  Should depreciate ASAP, this is an inversion of control
    // IgorJS should be outputting tick events to the DOM thread
    t.DataProvider((td) => {IgorJS.Tick_provide})
    t.subscribe((td) => { IgorJS.Tick(td)})
  },
  addToTicker: (who) => {
    IgorCore.tick_entities.push(who)
  },
  // sig would be the required parameters on TickData
  addObjectTickFunction: (what, who, sig) => {
    IgorCore.object_tickers[who] = {
      object: who,
      fn: what,
      sig
    }
  },
  Tick_provide: (td) => {

  },
  Tick: (td) => {

  },
}
