export default class IconMgr {
  iconList = {}
  constructor() {}
  import(iconList) {
    this.iconList = iconList
    for (const [name, obj] of Object.entries(this.iconList.tool)) {
      this.iconList.item[name] = obj
    }
  }
  getSrc(type, name) {
    if (!type) return ""
    if (type.indexOf("@")> -1 && !name) {
      [type, name] = type.split("@")
    }
    if (!this.iconList[type]?.[name]) {
      //console.log('cannot find icon for: '+name+"@"+type)
      return null
    }
    return this.iconList[type][name]
  }
}
