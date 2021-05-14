import {mgrs} from 'managers'
import {BindingSignaler} from 'aurelia-templating-resources'
import {inject} from 'aurelia-framework'

@inject(BindingSignaler)
export class IconEditor {
  IE = {
    ds: {
      old: {}
      ,new: {}
    }
    ,select: {}
    ,show: "old"
  }
  show_on = false
  constructor(signal) {
    this.mgrs = mgrs
    this.mgrs.IE = this
    this.iconEditor()
    this.signaler = signal
  }
  async iconEditor() {
    this.IE.ds.new = await this.mgrs.idb.get('Icons') || (await this.mgrs.idb.get("dataSet")).icons
    this.IE.ds.old = (await this.mgrs.idb.get('oldIcons'))
    this.IE.ds.old || ((await this.mgrs.idb.set("oldIcons", this.IE.ds.new)) && (this.IE.ds.old = this.IE.ds.new))
    this.signaler.signal("update")
  }
  IEshow() {
    this.IE.showOld = this.IE.ds.old[this.IE.select.Cat][this.IE.select.Icon]
    this.IE.showNew = this.IE.ds.new[this.IE.select.Cat][this.IE.select.Icon]
    this.signaler.signal("update")
  }
  async IEfiled() {
    let convert = async function(data) {
      var a = new FileReader()
      return new Promise( (res) => {
        a.onload = () => {
          res(a.result)
        }
        a.readAsDataURL(data)
      })
    }
    this.IE.fileBlob = await convert(this.IE.file[0])
  }
  newIcon() {
    if(!this.newName || this.newName.indexOf("@")==-1) {
      this.newName = undefined
      console.log('cancel')
      return
    }
    let [cat, name] = this.newName.split("@")
    this.IE.ds.new[cat][name] = null
    this.IE.select.Cat = cat
    this.IE.select.Icon = name
    debugger
  }
  IEStore() {
    this.IE.ds.new[this.IE.select.Cat][this.IE.select.Icon] = this.IE.fileBlob
  }
  async saveIconEditor() {
    await this.mgrs.idb.set("Icons", this.IE.ds.new)
  }
  revertIcon() {
    this.IE.ds.new[this.IE.select.Cat][this.IE.select.Icon] = this.IE.ds.old[this.IE.select.Cat][this.IE.select.Icon]
  }
  dlIconEditor() {
    let a = document.createElement('a')
    a.download = "icons.json"
    a.href = "data:application/octet-stream:base64,"+JSON.stringify(this.IE.ds.new)
    a.style = "display:none"
    document.body.appendChild(a)
    a.click()
  }
  async ulIconEditor() {
    if(!this.IE.upload) return
    let convert = async function(icon) {
      var a = new FileReader()
      return new Promise( (res) => {
        a.onload = () => {
          res(a.result)
        }
        a.readAsText(icon)
      })
    }
    let data = JSON.parse(await convert(this.IE.upload[0]))
    this.mgrs.idb.set("Icons", data)
    console.log('loaded')
  }  
}
