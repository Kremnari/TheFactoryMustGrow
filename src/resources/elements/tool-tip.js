import {bindable} from 'aurelia-framework';

export class ToolTipCustomElement {
  @bindable display;
  @bindable itemMgr;
  @bindable recipeMgr;
  constructor() {
  }
  displayChanged() {
    //console.log(this.display)
  }

}
