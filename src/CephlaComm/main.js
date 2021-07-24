import {mgrs} from 'managers'

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
  runner: null
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

  }
}

export const CephlaCommCaller = {
  statics: {},
  issue: async (who, obj, $evt) => {
    if(!CephlaCommCore.repo[who]) {
      console.warn('nothing for: '+who)
      return;
    }
    if(CephlaCommCore.sigs[who]) {
      let args = {}
      let missed = []
      debugIf(CephlaCommCore, "caller_start")
      for( let [specifier, typeS] of Object.entries(CephlaCommCore.sigs[who])) {
        !Array.isArray(typeS) && (typeS = [typeS])
        for( let type of typeS) {
          args[specifier] || (args[specifier] = {})
          let found = obj?.[specifier+"."+type] || $evt?.CCC[specifier]?.[type] || CephlaCommCaller.statics[specifier]?.[type]
          if(!found) {
            if(type=="recipe") {
              found = await mgrs.DS.open("SelectX", {
                list: Object.values(mgrs.rec.recipeList), type
              })
              found = found?.item?.name
            } else if(type=="building") {
              //# should pull entity_cats from a validator
              found = await mgrs.DS.open("SelectX", {
                list: Object.values(mgrs.entity.entity_cats["crafting"]), type
              })
              found = found?.item
            } else if(type=="factoryBus") {
              found = await mgrs.DS.open("SelectBus", {
                buses: mgrs.baseApp.facBlocks.filter( (x)=> x.type=="bus")
              })
              found = found?.selected?.name
            }
          }
          debugIf(CephlaCommCore, "caller_found")
          if(found) {
            !args[specifier] && (args[specifier] = {})
            args[specifier][type] = found
          } else {
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
  },
  staticProvide: (specifier, type, obj) => {
    CephlaCommCaller.statics[specifier] || (CephlaCommCaller.statics[specifier] = {})
    CephlaCommCaller.statics[specifier][type] = obj
  }
}
window.CCC = CephlaCommCore
