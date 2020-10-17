import {bindable, inject} from 'aurelia-framework'
import IconMgr from 'IconMgr'
import ItemMgr from 'ItemMgr'

@inject(IconMgr, ItemMgr)
export class IconBaseCustomElement {
  @bindable item;
  @bindable anim_style;
  @bindable debug;
  @bindable count;
  @bindable altImage;
  @bindable showName = false;
  parsedCount = null
  constructor(im, im2) {
    this.iconMgr = im
    this.itemMgr = im2

  }
  bind(bindContext, overContext) {
    if(typeof this.item === 'string') {
      this.altTip = this.item
      this.item = this.itemMgr.get(this.item)
    } else if(typeof this.item=== 'object') {
      this.altTip = this.item.name
    }
  }
}
