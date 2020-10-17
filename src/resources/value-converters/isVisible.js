export class IsVisibleValueConverter {
	constructor() {
	}
	toView(arr) {
    let ret = []
		for (let obj of arr) {
      if(!obj.hidden || obj.visible) ret.push(obj)
    }
		return ret
	}
}
