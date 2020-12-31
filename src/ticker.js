import * as CONFIG from './Config'
import {mgrs} from "managers"

export default class Ticker {
  _cbs = {
    subscribers: new Set(),
    providers: new Set()
  }
  debugging = false
  winTerval = null
  ticks = 0
  constructor() {
    this.isRunning = false
    this.mspt = 1000/CONFIG.TICKS_PER_SECOND
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
      if (this.debugging) console.log('tick')
      
      this.ticks++
      if(this.ticks == CONFIG.TICKS_MAX_PHASE) this.ticks = 0
      let tickData = { ticks: this.ticks }
      this._cbs.providers.forEach( (providerCB) => {
        providerCB(tickData)
      })
      this._cbs.subscribers.forEach( (cbObj) => {
        if (this.ticks % cbObj.nth == cbObj.phase) cbObj.cb(tickData)
      })
    }
    mgrs.signaler.signal("tickUpdate")
    return true;
  }
  DataProvider(cb) {
    this._cbs.providers.add(cb)
  }
  subscribe(cb, nth = 1) {
    if(CONFIG.TICKS_MAX_PHASE%nth != 0) { return false; }  // Only factors of TICKS_MAX_PHASE should be used
    let obj = {cb: cb, nth: nth, phase: this.ticks%nth}
    Object.freeze(obj) //It's being used as a Set key
    this._cbs.subscribers.add(obj)
    return obj
  }
  dispose(obj) {
    this._cbs.subscribers.delete(obj)
  }
}
