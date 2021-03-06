import $ from 'jquery'

export const ChameleonCore = {
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
  }
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
  }
}

export const ChameleonViewer = {
  signaler: null,
  error: (what) => {
    $("#ChameleonModal").show()
    $("#ChameleonMessage").removeClass().addClass('error').text(what)
    $("#ChameleonButton").removeClass().addClass(['btn', 'btn-error']).on("click", ()=> { $("#ChameleonModal").hide() })
  },
  animsUpdate: () => {
    ChameleonViewer.signaler.signal("animsUpdate")
  }
}
