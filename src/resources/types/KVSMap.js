export default class KVSMap extends Map {
  setTuple(key, value, obj) {
    this.ensure(key, new Map()).ensure(value, new Set()).add(obj)
  }
  removeTuple(key, value, obj) {
    this.get(key).get(value).delete(obj)
  }
  getSetValues(key, value) {
    return Array.from(this.get(key)?.get(value)?.values() || [])
  }

  /*
  ensure(key, value) {
    if(!this.has(key)) {
      this.set(key, new Map())
    }
    if(!this.get(key).has(value)) {
      this.get(key).set(value, new Set())
    }
  }
  setTuple(key, val, obj) {
    this.get(key).get(val).add(obj)
  }
  swap(key, oldVal, newVal, obj) {
    this.get(key).get(oldVal).delete(obj)
    this.ensure(key, newVal)
    if(!this.get(key).has(newVal)) {
      this.get(key).set(newVal, new Set())
    }
    this.get(key).get(newVal).add(obj)
  }*/
}
