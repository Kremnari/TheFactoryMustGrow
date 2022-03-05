import $ from 'jquery'

const ChameleonCore = {
  GameObjects: {tagged: {}, base: {}},
  GameObjectFromPointer: (pointer) => {
    // Dissect pointer
    console.warn("GOFP")
    let [item, category] = pointer.split("@")
    if(category) {
      return ChameleonCore.GameObjects.tagged[category][item]()
    } else {
      return ChameleonCore.GameObjects.base[pointer]()
    }
  },
  SetModalBox: (selector) => {
    ChameleonCore.modalSelector = document.querySelector(selector)
  },
  classFns: {},
  viewFns: {},
  signaler: null,
  baseApp: null,
  viewControl: {
    statusBox: null,
  },
  viewScope: {},
  viewOptions: {},
  viewFilters: {},
}
window.chame = ChameleonCore

export const ChameleonBuilder = {
  signaler: ChameleonCore.signaler,
  app: ChameleonCore.baseApp,
  AddGameObjectClass: (name, obj, tags ) => {
    let jsonObj = JSON.stringify(obj)
    if(tags["category"]) {
      if(!ChameleonCore.GameObjects.tagged[tags["category"]]) ChameleonCore.GameObjects.tagged[tags["category"]] = {}
      ChameleonCore.GameObjects.tagged[tags["category"]][name] = () => { return JSON.parse(jsonObj) }
    } else {
      ChameleonCore.GameObjects.base[name] = () => { return JSON.parse(jsonObj) }
    }
  },
  setClassFn: (name, fn) => {
    ChameleonCore.classFns[name] = fn
  },
  setViewFn: (name, fn) => {
    ChameleonCore.viewFns[name] = fn
  },
  setViewFnGetter: (name, fn) => {
    Object.defineProperty(ChameleonCore.viewFns, name, {
      get: fn
    })
  }
}
Object.defineProperty(ChameleonBuilder, "app", {
  set: (val) => { ChameleonCore.app = val }
})
Object.defineProperty(ChameleonBuilder, "signaler", {
  set: (val) => { ChameleonCore.signaler = val }
})


export const ChameleonViewer = {
  ctrl: ChameleonCore.viewControl,
  options: ChameleonCore.viewOptions,
  filters: ChameleonCore.viewFilters,
  $scope: ChameleonCore.viewScope,
  toasts: [],
  toastTimer: 0,

  set: (command) => {
    if(command.hasOwnProperty('if') && !command.if) return
    if(command.$double && ChameleonViewer.__checkDouble(command)) return
    switch (command.type) {
      case "view":
        ChameleonCore.viewControl[command.which] = command.what
        command.statusBox && (ChameleonCore.viewControl.statusBox = command.statusBox)
        break;
      case "scope":
        if(!command.what) return
        ChameleonCore.viewScope[command.which] = command.what
        if(command.which=="tooltip") {
          ChameleonCore.viewControl.statusBox = "tooltip"
        }
        break;
      case "context":
        ChameleonCore.viewContext = command.what
        ChameleonCore.viewScope.context = command.what
        console.log('context', command.what)
        break;
      case "viewObject":
      case "unset":
        break;
    }
  },
  __checkDouble: (command) => {
    // Where's the elegance?
    if(ChameleonViewer.$double
        && ChameleonViewer.$double.type==command.type
        && ChameleonViewer.$double.which==command.which
        && ChameleonViewer.$double.what?.$_id==command.what?.$_id) {
      ChameleonViewer.set(command.$double)
      return true;
    }
    ChameleonViewer.$double = command
    return false
  },
  unset: (command) => {
    switch (command.which) {
      case "tooltip":
        ChameleonCore.viewScope.tooltip = null
        ChameleonCore.viewControl.statusBox='statusBox'
        break;
      case "showingEntity":
        ChameleonCore.viewScope.showingEntity = null
        break;
      case "showingBlock":
        ChameleonCore.viewScope.showingBlock = null
        break;
    }
  }
}
Object.defineProperty(ChameleonViewer, "Fn", {
  get: () => { return ChameleonCore.viewFns }
})
Object.defineProperty(ChameleonViewer, "classFn", {
  get: () => { return ChameleonCore.classFns }
})

export const ChameleonTasker = {
  error: (what) => {
    $("#ChameleonModal").show()
    $("#ChameleonMessage").removeClass().addClass('error').text(what)
    $("#ChameleonButton").removeClass().addClass(['btn', 'btn-error']).on("click", ()=> { $("#ChameleonModal").hide() })
  },
  errorToast: (msg, icon, fa = 'fa-exclamation-triangle') => {
    let what = {
      class: "danger-bg",
      msg,
      icon,
      fa,
      timer: 400,
      _alert: ChameleonTasker.showAlert
    }
    ChameleonViewer.toasts.push(what)
    ChameleonViewer.toastTimerSet()
  },
  warnToast: (msg, icon, fa = 'fa-exclamation') => {
    let what = {
      class: "warning-bg",
      msg,
      icon,
      fa,
      timer: 100,
      _alert: ChameleonTasker.showAlert
    }
    ChameleonViewer.toasts.push(what)
    ChameleonTasker.toastTimerSet()
  },
  goodToast: (msg, icon, fa= 'fa-thumbs-up') => {
    let what = {
      class: "primary-bg",
      msg,
      icon,
      fa,
      timer: 400,
      _alert: ChameleonTasker.showAlert
    }
    ChameleonViewer.toasts.push(what)
    ChameleonTasker.toastTimerSet()
  },
  toast: (msg, icon, fa = 'fa-question') => {
    let what = {}
    what.class = "light-bg"
    what.msg = msg
    what.icon = icon
    what.fa = fa
    what.timer = 200
    what._alert = ChameleonTasker.showAlert
    ChameleonViewer.toasts.push(what)
    ChameleonTasker.toastTimerSet()
  },
  showAlert: (toast) => {
    alert(toast.msg)
    ChameleonTasker.clearToast(toast)
  },
  clearToast: (which) => {
    let idx = ChameleonViewer.toasts.findIndex((x)=>{return x==which})
    ChameleonViewer.toasts.splice(idx, 1)
    window.clearInterval(ChameleonViewer.toastTimer.timeout)
    ChameleonViewer.toastTimer = null
    if(ChameleonViewer.toasts.length>0) {
      ChameleonTasker.toastTimerSet()
    }
  },
  toastTimerSet: () => {
    if(ChameleonViewer.toastTimer) return
    ChameleonViewer.toastTimer = {
      ticks: 0,
    }
    ChameleonViewer.toastTimer.timeout = window.setInterval( () => {
      if(ChameleonViewer.toastTimer.ticks>=100) {
        ChameleonTasker.clearToast(ChameleonViewer.toasts[0])
      } else {
        ChameleonViewer.toastTimer.ticks += 1
      }
    }, 50 * ChameleonViewer.toasts[0].timer/100)
  },
  animsUpdate: (who, what, dur) => {
    who.animClass = what
    who.animTime = "animation-duration: "+dur+"s"
    ChameleonTasker.signaler.signal("animsUpdate")
  },
  clearShowing: () => {
    //TODO be selective, called from IgorRunner
    ChameleonViewer.unset({which: "showingEntity"})
    ChameleonViewer.unset({which: "showingBlock"})
  },
  GameObjectFromPointer: ChameleonCore.GameObjectFromPointer,
  classFn: ChameleonCore.classFns,
  viewFn: ChameleonCore.viewFns
}
Object.defineProperty(ChameleonTasker, "app", {
  get: () => { return ChameleonCore.baseApp }
})
Object.defineProperty(ChameleonTasker, "signaler", {
  get: () => { return ChameleonCore.signaler }
})