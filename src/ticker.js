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
  tickTimes = []
  tickTime = 0
  constructor(config, signaler) {
    this.isRunning = false
    this.config = config
    this.mspt = 1000/this.config.ticks_per_sec
    this.msptff = this.mspt/20
    this.signaler = signaler
  }
  fastForward(set=true) {
    if(set) {
      window.clearInterval(this.winTerval)
      this.winTerval = window.setInterval(() => {this.onTick() } , this.msptff)
    } else {
      window.clearInterval(this.winTerval)
      this.winTerval = window.setInterval(() => {this.onTick() } , this.mspt)
    }
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
    this.tickTime = performance.now()
    if (this.isRunning) {
      this.ticks++
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
    }
    this.tickTimes.push(performance.now()-this.tickTime)
    this.tickTimes.length>this.config.ticks_max_phase && this.tickTimes.shift()
    return true;
  }
  average(secs=1) {
    let total = 0
    for(let i=1; i<Math.min(secs*30, this.tickTimes.length)+1; i++) {
      //console.log(this.tickTimes[this.tickTimes.length-i)
      total+=this.tickTimes[this.tickTimes.length-i]
    }
    return total/(secs*30)
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
