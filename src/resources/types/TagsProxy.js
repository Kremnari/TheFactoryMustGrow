export function TagMapProxy({to, load, entity}) {
  let transient = new Map()
  let ret = {
    push: function(tag, value) {
      if(transient.has(tag)) {
        to.removeTuple(tag, transient.get(tag), entity)
      }
      transient.set(tag, value)
      to.setTuple(tag, value, entity)
    },
    getValue: function(tag) {
      return transient.get(tag)
    },
    list: function() {
      return Array.from(transient)
    },
    delete: function(tag) {
      if(!transient.has(tag)) return
      to.removeTuple(tag, transient.get(tag), entity)
      transient.delete(tag)
    },
    toJSON: function() {
      return Array.from(transient)
    }
  }
  if(load) {
    // use ret
  }
  return ret
}
