import ItemMgr from 'ItemMgr'
import {inject} from 'aurelia-framework'

import {CephlaCommConstructor as CCC} from 'CephlaComm/main'

@inject(ItemMgr)
export default class ResMgr {
  resList = {}
  constructor(IM) {
    this.ItemMgr = IM
  }
  import(resources) {
    Object.entries(resources).forEach( ([name, resObj]) => {
      //let baseItem = this.ItemMgr.get(resObj.mining_results[0].name || resObj.mining_results)
      //this.resList[name] = new ResourceItem(resObj, baseItem)
      this.resList[name] = resObj
    })
  }
  mining = false
  mine(resName, inv) {
    let res = this.resList[resName]
    if(this.mining) {
      window.clearTimeout(this.mining)
      this.mining = false
      res.miningStyle = ""
    } else {
      this.mining = window.setTimeout(() => {
        //Fix for array
        inv.add(res.mining_results, 1)
        this.mining = false
        res.miningStyle = ""
      }, res.mining_time* 1000)
      res.miningStyle = "animation: testXform "+res.mining_time+"s"
    }
  }
  resListByTag(property, catList) {
    if(catList == null) return []
    let list = Object.values(this.resList).filter( (elm) => { return elm[property] == undefined || catList.includes(elm[property]) } )
    //console.log(Object.values(list))
    return list
  }
}

const ResourceMine = (obj) => {
  if(ResourceMine.res) {
    window.clearTimeout(ResourceMine.timeout)
    ResourceMine.res.miningStyle = ""
    ResourceMine.res = undefined
  } else {
    ResourceMine.timeout = window.setTimeout( () => {
      obj.to.add(obj.which.mining_results, 1)
    }, obj.which.mining_time * 1000)
    ResourceMine.res = obj.which
    ResourceMine.res.miningStyle = "animation: textxform "+obj.which.mining_time
  }
}



const ResourceMineSig = {
  which: "resource",
  player: "inventory"
}

CCC.provide("resources.mine", ResourceMine, ResourceMineSig)
