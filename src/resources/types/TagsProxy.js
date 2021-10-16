export function TagMapProxy({to, load, entity}) {
  let ret = {
    push: function(tag, value) {
      if(entity._tags[tag]) {
        to.removeTuple(tag, entity._tags[tag], entity)
      }
      entity._tags[tag] = value
      to.setTuple(tag, value, entity)
    },
    /*
    add_control: function(tag, value) {
      if(!entity._tag) entity._tag = []
      !entity._tag.includes(value) && entity._tag.push(value)
    },
    rem_control: function(tag, value) {
      if(entity._tag.includes(value)) {
        entity._tag.splice(entity._tag.indexOf(value), 1)
      }
    },
    */
    XX_has: function(tag) {
      return transient.get(tag)
    },
    list: function() {
      //Should be less needed
      return Object.keys(entity._tags)
    },
    delete: function(tag) {
      if(!entity._tags[tag]) return
      to.removeTuple(tag, entity._tags[tag], entity)
      entity._tags[tag] = false
    },
    toJSON: function() {
      return Object.entries(entity._tags)
    }
  }
  entity._tags = {}
  if(load) {
    load.forEach( (x) => {
      ret.push(x[0], x[1])
    })
  }
  return ret
}
