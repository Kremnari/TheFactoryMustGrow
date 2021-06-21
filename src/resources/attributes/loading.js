var loadingElem

export class LoadingAnimCustomAttribute {
  static inject = [Element]
  static setLoadingElem = (str) => {
    loadingElem = document.querySelector(str).cloneNode(true)
  }
  constructor(element) {
    this.element = element
    this.inner = element.cloneNode(true)
  }
  valueChanged(newVal) {
    if(newVal) {
      //This appears to work in the debugger
      this.element.replaceWith(this.inner)
      //But by function exit the elment is unchanged
    }
    if(!newVal) {
      this.element.replaceWith(loadingElem)
    }
  }
}
