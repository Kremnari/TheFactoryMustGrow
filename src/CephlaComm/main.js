//* All three of these the same initials on purpose!
//* Only one should ever be used in a given environment
 

//Provide/Issue should operate like a subscription service
//that includes a signature validator

const CephlaCommCore = {
  //* need to improve repo namespacing
  repo: {}
}

export const CephlaCommConstructor = {
  //
  provide: (who, what) => {
    CephlaCommCore.repo[who] = what
  }
}

export const CephlaCommCaller = {
  issue: (who, obj) => {
    CephlaCommCore.repo[who](obj)
  }
}
window.CCC = CephlaCommCore

let test = 4
