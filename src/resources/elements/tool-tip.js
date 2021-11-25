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
    mgrs.baseApp.view.set({type: 'scope', which: 'tooltip', what: this.recipeMgr.recipeList[name]})
  }

}
