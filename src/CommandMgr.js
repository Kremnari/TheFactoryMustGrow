export default class CommandMgr {
  constructor() {}
  link(tfmg) {
    this.tfmg = tfmg
  }
  provide(evt, obj, preferred_cb, ...args) {
    if (this.context) {

    } else {
      if (obj == null) preferred_cb()
      obj[preferred_cb]()
    }
  }
  context()
}
