import {bindable} from 'aurelia-framework';
import {mgrs} from 'managers'

export class ToolTipCustomElement {
  @bindable display;
  @bindable itemMgr;
  @bindable recipeMgr;
  constructor() {
  }
  displayChanged() {
    //console.log(this.display)
  }
  showRec(name) {
    mgrs.baseApp.tooltip = this.recipeMgr.recipeList[name]
  }

}
