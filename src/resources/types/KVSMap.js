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
}
