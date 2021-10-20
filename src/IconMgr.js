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
    if(type.indexOf("@")==-1) {
      
      return(this.iconList.item[type])
    } else if (type.indexOf("@")> -1 && !name) {
      [type, name] = type.split("@")
    }
    return (this.iconList[type] && this.iconList[type][name]) || this.iconList.item[name] || null
  }
}
