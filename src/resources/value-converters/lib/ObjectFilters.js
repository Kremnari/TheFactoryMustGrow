// A ValueConverter for iterating an Object's properties inside of a repeat.for in Aurelia
// Source: https://ilikekillnerds.com/2015/08/iterating-objects-using-repeat-for-in-aurelia/
export class ObjectKeysValueConverter {
    toView(obj) {
      if (obj === undefined ||
        obj === null)
        return obj
      return Reflect.ownKeys(obj)
    }
}
export class ObjectEntriesValueConverter {
  toView(obj) {
    if (obj === undefined ||
      obj === null)
      return obj
    return Object.entries(obj)
}
}

export class ObjectValuesValueConverter {
	toView(obj) {
    if (obj === undefined ||
      obj === null)
      return []
  return Object.values(obj)
	}
}
/**
 * Usage
 * Shows how to use the custom ValueConverter to iterate an objects properties
 * aka its keys.
 * 
 * <require from="ObjectKeys"></require>
 * <li repeat.for="prop of myVmObject | objectKeys">${prop}</li>
 */
