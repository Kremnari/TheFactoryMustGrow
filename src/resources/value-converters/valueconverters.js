export class FilterOnPropertyValueConverter {
  toView(array, property, exp) {
    if (array === undefined ||
        array === null ||
        property === undefined ||
        exp === undefined)
        return array
    if (Object.isObject(array)) {
      return Object.entries(array).filter((name, val) => val[property])
    } else {
      return array.filter( (item) => item[property].toLowerCase().indexOf(exp.toLowerCase())>-1 ) 
    }
  }
}

export class HasPropertyValueConverter {
  toView(array, property, exp) {
    if (array === undefined ||
        array === null ||
        property === undefined ||
        exp === undefined)
        return false
    return array.filter( (item) => item[property].toLowerCase().indexOf(exp.toLowerCase())>-1).length > 0
  }
}

export class BlobToUrlValueConverter {
  toView(blob) {
    if(!blob) return
    return URL.createObjectURL(blob);
  }
}

export class NumeralValueConverter {
  fromView(value, format = null) {
    if(!value) return
    return numeral(value).value()
  }
}