import {bindable} from 'aurelia-framework'
import {mgrs} from 'managers'

export class upgradesInfopaneCustomElement {
  @bindable entity;
  @bindable parcel;
  EM = mgrs.entity
}
