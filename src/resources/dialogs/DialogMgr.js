import {DialogService} from 'aurelia-dialog'
import {SelectBus} from 'resources/dialogs/SelectBus'
PLATFORM.moduleName('resources/dialogs/SelectBus')
import {SelectRecipe} from 'resources/dialogs/SelectRecipe'
PLATFORM.moduleName('resources/dialogs/SelectRecipe')


export class DialogMgr {
  static inject = [DialogService]
  constructor(DS) {
    this.ds = DS
    this.modals = {
       SelectBus
      ,SelectRecipe
    }
  }
  open(vm, model, lock = false) {
    return new Promise( (res, rej) => {
      this.ds.open({viewModel: this.modals[vm], model, lock})
      .whenClosed(response => res(response.output))
    })
  }
}
