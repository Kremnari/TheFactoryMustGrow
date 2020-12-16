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
  restoreIcons(dataSet) {
    Object.values(dataSet).forEach((obj) => {
      if(!obj.icon) return
      let [type, name] = obj.icon.split('@')
      obj.icon = this.iconList[type]?.[name] || this.iconList.item[name]
      //if(!obj.icon) console.log("couldn't load an icon for: "+type+"@"+name)
    })
    return dataSet 
  }
}
