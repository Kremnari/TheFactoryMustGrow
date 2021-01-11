import {bindable, } from 'aurelia-framework'
import {mgrs as MGRS} from 'managers'

let mgrs = MGRS
export class IconBaseCustomElement {
  @bindable item;
  @bindable anim_style;
  @bindable debug;
  @bindable count;
  @bindable altImage;
  @bindable progress;
  @bindable showName = false;
  parsedCount = null
  mgrs = mgrs;
  constructor() {}
  bind(bindContext, overContext) {
    if(typeof this.item === 'string') {
      this.altTip = this.item
      this.item = mgrs.item.get(this.item)
    } else if(typeof this.item === 'object') {
      this.altTip = this.item.name
    }
  }
  itemChanged(newVal) {
    if(typeof newVal === 'string') {
      this.altTip = newVal
      this.item = mgrs.item.get(newVal)
    } else if(typeof newVal === 'object') {
      this.altTip = newVal.name
    }
  }
}
