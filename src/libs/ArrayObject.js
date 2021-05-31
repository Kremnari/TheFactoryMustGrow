export function ArrayObject() {
  let ret = {}
  ret[Symbol.iterator] = function () { return Object.keys(this) }
  return ret
}
