export class ActiveWhenCustomAttribute {
  static inject = [Element];
  active = {
    classNames: [],
    click: null
  }
  inactive = {
    classNames: [],
    click: null
  }
  constructor(elm) {
    this.element = elm
  }
  /*attached(app) {
    console.log(this.element.attributes["class.when-inactive"].value)
    this.element.attributes["class.when-active"] && (this.active.classNames =  this.element.attributes["class.when-active"].value)
    this.element.attributes["click.when-active"] && (this.active.click = this.element.attributes["click.when-active"].value)

    this.element.attributes["class.when-inactive"] && (this.inactive.classNames = this.element.attributes["class.when-inactive"].value)
    this.element.attributes["click.when-inactive"] && (this.inactive.click = this.element.attributes["click.when-inactive"].value)
  }*/
  valueChanged(value) {
    debugger
    if(value) {
      this.element.attributes["class.when-active"].forEach((x) => this.element.classList.push(x))
      //this.active.click...
    } else {
      this.element.attributes["class.when-inactive"].forEach((x) => this.element.classList.push(x))
      //this.inactive.click...
    }
  }
}
