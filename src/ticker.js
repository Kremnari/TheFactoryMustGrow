import {mgrs} from "managers"

//* This two imports should be removed,
//     the config data should be passed through the constructor
//     a modifier function should be provided to multiply the speed of the ticker
//        or change the tick interval at a flat rate
//     the mgrs object should be removed, and such signals emitted by Igor back into the GUI


export default class Ticker {
  _cbs = {
    subscribers: new Set(),
    providers: new Set()
  }
  debugging = false
  winTerval = null
  ticks = 0
  constructor(TPS, TMP, signaler) {
    this.isRunning = false
    this.config = { ticks_per_sec: TPS, ticks_max_phase: TMP}
    this.mspt = 1000/this.config.ticks_per_sec
    this.signaler = signaler
  }
  pause() {
    this.isRunning = false
    window.clearInterval(this.winTerval)
    this.winTerval = null
  }
  once() {
    this.isRunning = true
    this.onTick()
    this.isRunning = false
  }
  resume() {
    this.isRunning = true
    this.winTerval = window.setInterval(() => {this.onTick() } , this.mspt)
  }
  toggle() {
    this.isRunning ? this.pause() : this.resume()
  }
  onTick() {
    if (this.isRunning) {
      this.ticks++
      //console.time(this.ticks)
      if (this.debugging) console.log('tick')
      
      if(this.ticks >= this.config.ticks_max_phase) {
        this.ticks = 0
      }
      let tickData = { ticks: this.ticks }
      this._cbs.providers.forEach( (providerCB) => {
        providerCB(tickData)
      })
      this._cbs.subscribers.forEach( (cbObj) => {
        if (this.ticks % cbObj.nth == cbObj.phase) cbObj.cb(tickData)
      })
      this.signaler.signal("generalUpdate")
      //console.timeEnd(this.ticks)
    }
    return true;
  }
  DataProvider(cb) {
    this._cbs.providers.add(cb)
  }
  subscribe(cb, nth = 1) {
    // Only factors of TICKS_MAX_PHASE should be used
    // Mostly because I don't want to add logic to handle carries
    if(this.config.ticks_max_phase%nth != 0) { return false; }
    let obj = {cb: cb, nth: nth, phase: this.ticks%nth}
    Object.freeze(obj) //It's being used as a Set key
    this._cbs.subscribers.add(obj)
    return obj
  }
  dispose(obj) {
    this._cbs.subscribers.delete(obj)
  }
}
