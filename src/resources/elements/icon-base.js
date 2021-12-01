import {bindable, } from 'aurelia-framework'
import {mgrs as MGRS} from 'managers'
import {ChameleonViewer as ChameView} from 'Chameleon/main'

let mgrs = MGRS
export class IconBaseCustomElement {
  @bindable item;
  @bindable anim_style;
  @bindable debug;
  @bindable count;
  @bindable altImage;
  @bindable progress;
  @bindable stalled;
  @bindable required;
  @bindable max_fill;
  @bindable metas;
  @bindable showName = false;
  parsedCount = null
  mgrs = mgrs;
  constructor() {
    this.view = ChameView
  }
  bind(bindContext, overContext) {
    if(!this.item) return
    if(typeof this.item === 'string') {
      if(this.item.indexOf("@")>-1) {
        this.item = {icon:this.item}
      } else {
        this.altTip = this.item
        try {
          this.item = mgrs.item.get(this.item)
          this.hasEntity = mgrs.data.entity[this.item.name]
        } catch(e) {
          console.warn(this.item)
        }
        if(!this.item) return
      }
    } else if(typeof this.item === 'object') {
      this.altTip = this.item.name
      this.hasEntity = this.item.hasEntity || mgrs.data.entity[this.item.name]
    }
    if(!this.item.icon) {
      this.item.icon = mgrs.item.get(this.item.name).icon
    }
    if(this.altImage && this.altImage.indexOf("@")==-1) {
      this.altImage = "item@"+this.altImage
    }
  }
  itemChanged(newVal) {
    if(!newVal) return
    if(typeof newVal === 'string') {
      this.altTip = newVal
      this.item = mgrs.item.get(newVal)
    } else if(typeof newVal === 'object') {
      this.altTip = newVal.name
    }
  }
  altImageChanged2(newVal) {
    if(!newVal) return
    if(newVal.includes("@")) {
      console.log("lookup "+newVal)
      this.altImage = mgrs.item.get(newVal)
      console.log(this.altImage)
    }
  }
}
