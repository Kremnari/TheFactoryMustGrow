import ItemMgr from "ItemMgr";
import {inject} from 'aurelia-framework';

@inject(ItemMgr)
export class CanMineValueConverter {
	constructor(im) {
		this.ItemMgr = im
	}
	toView(obj) {
    if(!obj) return {}
		let ret = {}
		for (let each of Object.keys(obj)) {
      let val = obj[each]
			if (!val.mining_ingredients) {
        ret[each] = val
      }
    }
		return ret
	}
}
