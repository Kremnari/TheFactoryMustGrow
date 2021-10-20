import $ from 'jquery'

const ChameleonCore = {
  GameObjects: {tagged: {}, base: {}},
  GameObjectFromPointer: (pointer) => {
    // Dissect pointer
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
  viewFns: {}
}
export const ChameleonBuilder = {
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

export const ChameleonViewer = {
  app: null,
  signal: null,
  toasts: [],
  toastTimer: NaN,
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
      _alert: ChameleonViewer.showAlert
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
      _alert: ChameleonViewer.showAlert
    }
    ChameleonViewer.toasts.push(what)
    ChameleonViewer.toastTimerSet()
  },
  goodToast: (msg, icon, fa= 'fa-thumbs-up') => {
    let what = {
      class: "primary-bg",
      msg,
      icon,
      fa,
      timer: 400,
      _alert: ChameleonViewer.showAlert
    }
    ChameleonViewer.toasts.push(what)
    ChameleonViewer.toastTimerSet()
  },
  toast: (msg, icon, fa = 'fa-question') => {
    let what = {}
    what.class = "light-bg"
    what.msg = msg
    what.icon = icon
    what.fa = fa
    what.timer = 200
    what._alert = ChameleonViewer.showAlert
    ChameleonViewer.toasts.push(what)
    ChameleonViewer.toastTimerSet()
  },
  showAlert: (toast) => {
    alert(toast.msg)
    ChameleonViewer.clearToast(toast)
  },
  clearToast: (which) => {
    let idx = ChameleonViewer.toasts.findIndex((x)=>{return x==which})
    ChameleonViewer.toasts.splice(idx, 1)
    window.clearInterval(ChameleonViewer.toastTimer.timeout)
    ChameleonViewer.toastTimer = null
    if(ChameleonViewer.toasts.length>0) {
      ChameleonViewer.toastTimerSet()
    }
  },
  toastTimerSet: () => {
    if(ChameleonViewer.toastTimer) return
    ChameleonViewer.toastTimer = {
      ticks: 0,
    }
    ChameleonViewer.toastTimer.timeout = window.setInterval( () => {
      if(ChameleonViewer.toastTimer.ticks>=100) {
        ChameleonViewer.clearToast(ChameleonViewer.toasts[0])
      } else {
        ChameleonViewer.toastTimer.ticks += 1
      }
    }, 50 * ChameleonViewer.toasts[0].timer/100)
  },
  animsUpdate: (who, what, dur) => {
    who.animClass = what
    who.animTime = "animation-duration: "+dur+"s"
    ChameleonViewer.signaler.signal("animsUpdate")
  },
  clearShowing: () => {
    ChameleonViewer.app.viewPane.showingItem = null
  },
  GameObjectFromPointer: ChameleonCore.GameObjectFromPointer,
  classFn: ChameleonCore.classFns,
  viewFn: ChameleonCore.viewFns
}
