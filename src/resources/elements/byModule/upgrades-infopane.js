import {inject, bindable} from 'aurelia-framework'
import {EntityMgr} from 'EntityMgr'

@inject(EntityMgr)
export class upgradesInfopaneCustomElement {
  @bindable entity;
  @bindable parcel;
  constructor(EM) {
    this.EM = EM
  }
}
