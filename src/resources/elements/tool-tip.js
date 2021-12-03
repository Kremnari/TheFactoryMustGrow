import {bindable} from 'aurelia-framework';

export class ToolTipCustomElement {
  @bindable display;
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
