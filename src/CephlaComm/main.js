//* All three of these the same initials on purpose!
//* Only one should ever be used in a given environment
/** 
  Core - should never be called, hence not exported
  Constructor - is used to feed function callbacks to Core
  Caller - should be used in views to provide objects and initiate callbacks
*/
// Provide/Issue should operate like a subscription service
//   that includes a signature validator

//* During dev, function signatures are optional
// Signature should be an object of with specifiers as properties and
//   a string or array to indicate valid object types

//* SPECIFIERS - either a proper noun (specific instance of game object)
//      or a preposition use to indicate a game object with a relation
//       to the target of said preposition

const CephlaCommCore = {
  //* need to improve repo namespacing
  repo: {},
  sigs: {},
  valids: {},
  runner: null,
  utilityFns: {}
}

export const CephlaCommConstructor = {
  //
  provide: (who, what, signature, validator) => {
    CephlaCommCore.repo[who] = what
    signature && (CephlaCommCore.sigs[who] = signature)
    validator && (CephlaCommCore.valids[who] = validator)
  },
  setRunner(who) {
    //TODO this should be used to link CephlaComm with a compatible engine (IgorJS)
    // Perhaps it should validate the interface...?
    CephlaCommCore.runner = who
  },
  utilityFn(named, fn) {
    CephlaCommCore.utilityFns[named] = fn
  },
  initialize(obj) {
    CephlaCommCore.dialogSvc = obj.dialogSvc
    CephlaCommCore.dataSet = obj.dataSet
    CephlaCommCore.viewer = obj.viewer
  }
}
//! Should remove the function call  in `issue`
// That is really the responsibility of Igor,
// CCC.issues should just ensure the appropriate objects
//   and their references

export const CephlaCommCaller = {
  statics: {},
  issue: async (who, obj, $evt) => {
    if(!CephlaCommCore.repo[who]) {
      console.warn('nothing for: '+who)
      return;
    }
    //console.log(obj)
    if(CephlaCommCore.sigs[who]) {
      let args = {}
      let missed = []
      debugIf(CephlaCommCore, "caller_start")
      for( let [specifier, typeS] of Object.entries(CephlaCommCore.sigs[who])) {
        let options = {}
        if(specifier.indexOf(".")>-1) {
          //! For some bizarre reason, destructuring wasn't working here
          let temp = specifier.split(".")
          options = typeS
          typeS = temp[1]
          specifier = temp[0]
        }
        !Array.isArray(typeS) && (typeS = [typeS])
        for( let type of typeS) {
          let found
          if(obj && obj[specifier+"."+type]!==undefined) {
            //! Weirdness, chrome stopped accepting the shorthand of this if
              found = obj[specifier+"."+type]
          } else if($evt?.CCC?.[specifier]?.[type]) { found = $evt.CCC[specifier][type]
          } else if(CephlaCommCaller.statics[specifier]?.[type]) found = CephlaCommCaller.statics[specifier]?.[type]
          //! The above used to be condensed, but it negated possible nulls
          //found = (obj?.[specifier+"."+type]!==undefined && obj?.[specifier+"."+type]) || $evt?.CCC[specifier]?.[type] || CephlaCommCaller.statics[specifier]?.[type]
          if(found===undefined) {
            if(obj && obj[type+".dialog"]) {
              found = await CephlaCommCore.dialogSvc.open("SelectX",
                CephlaCommCore.utilityFns[type](obj[type+".dialog"], CephlaCommCore.runner), type
              )
              if(!found || !found.item && !options?.optional) return
              found = found.item
            } else if(obj && obj["$_"+type+"Xlist"]) {
              found = await CephlaCommCore.dialogSvc.open("SelectX", {
                list: obj["$_"+type+"Xlist"], type
              })
              if(!found || !found.item && !options?.optional) return
              found = found.item?.name || found.item
            } else if(type=="recipe") {
              found = await CephlaCommCore.dialogSvc.open("SelectX", {
                list: Object.values(CephlaCommCore.dataSet.recipe), type
              })
              if(!found && !options?.optional) return 
              found = found.item?.name
            } else if(type=="building") {
              //# should pull entity_cats from a validator
              found = await CephlaCommCore.dialogSvc.open("SelectX", {
                list: Object.values(CephlaCommCore.dataSet.entity).filter((x) => {return x.subType=='crafter'}), type
              })
              if(!found && !options?.optional) return
              found = found.item
            } else if(type=="string") {
              found = prompt("Enter "+specifier+":")
              CephlaCommCore.viewer.unset({which: 'tooltip'})  // HACKY
              if(!found && !options?.optional) return
            } else if(type=="icon") {
              let list = Object.keys(CephlaCommCore.dataSet.item)
              found = await CephlaCommCore.dialogSvc.open("SelectX", {
                list, type: 'icon'
              })
              if(!found && !options?.optional) return
              found = found.item
            }
          }
          debugIf(CephlaCommCore, "caller_found")
          if(found!==undefined) {
            !args[specifier] && (args[specifier] = {})
            args[specifier][type] = found
          } else if(!options?.optional) {
            missed.push(specifier+"."+type)
          }
        }
      }
      if(missed.length>0) {
        console.warn("missing args for "+who+": ");
        console.warn(missed)
        debugger
        return
      }
      // args obj, Igor, self_function
      // self_function: when creating Function s from strings at runtime,
      //   the function code will not have a name reference,
      //   so instead will need to be passed a reference to that object
      //   so it can place/track it's own side effects
      if(CephlaCommCore.valids[who] && !CephlaCommCore.valids[who](args, CephlaCommCore.runner)) return console.log(who+" failed validator")
      CephlaCommCore.repo[who](args, CephlaCommCore.runner, CephlaCommCore.repo[who])
    } else {
      CephlaCommCore.repo[who](obj, $evt?.CCC)
    }
  },
  /* 
  $evt - mouseEvent
  specifier - typically a determiner or preposition
  type - type of object
  obj - object to assign
  */
  provide: ($evt, specifier, type, obj) => {
    /* Errors out with 4 arguments for some reason
    if(arguments.length!=4) {
      console.error("Code 400, missing argument")
      debugger;
    }*/
    if(!$evt.CCC) {
      $evt.CCC = {}
    }
    if(!$evt.CCC[specifier]) $evt.CCC[specifier] = {}
    $evt.CCC[specifier][type] = obj
    //console.log("captured: "+specifier+": "+type)
  },
  utilityFn: (which, base, args) => {
    let ret = {}
    CephlaCommCore.utilityFns[which](base, args, ret, CephlaCommCore.runner)
    return '_result' in ret ? ret._result : ret
  },
  staticProvide: (specifier, type, obj) => {
    CephlaCommCaller.statics[specifier] || (CephlaCommCaller.statics[specifier] = {})
    CephlaCommCaller.statics[specifier][type] = obj
  }
}
window.CCC = CephlaCommCore
