export class FilterValueConverter {
  toView(obj, params) {
    if(!obj) return {}
    let ret = {}
    if(Array.isArray(params.value)) {
      for (let [key, each] of Object.entries(obj)) {
        if(each[params.key]) {
          if(params.value.indexOf(each[params.key]) >= 0) ret[key] = each
        } else {
          if(params.includeUndefs) ret[key] = each
        }
      }
    } else {
      for (let [key, each] of Object.entries(obj)) {
        if(each[params.key]) {
          if(each[params.key] == params.value) ret[params.key] = each
        } else {
          if(params.includeUndefs) ret[key] = each
        }
      }
    }
    return ret
  }
}
