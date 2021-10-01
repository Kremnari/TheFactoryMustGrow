(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{"resources/elements/factoryBlocks/busView.html":function(e,n){e.exports='<template>\n  <scope-var var.bind="$scope={busLine: viewPane.showingItem}"></scope-var>\n  I\'m a bus\n</template>\n'},"resources/elements/factoryBlocks/mainView.html":function(e,n){e.exports='<template>\n<scope-var var.bind="$scope={facBlock: viewPane.showingItem}"></scope-var>\n<section id="viewFacBlock" click.capture="CCC.provide($event, \'at\', \'factoryBlock\', $scope.facBlock )" class="container">\n  <div class=\'row\'>\n    <span class="col-sm">Land Size : ${$scope.facBlock.size}</span>\n    <span class="col-sm">-- ${$scope.facBlock.name} --</span>\n    <span class="col-sm">Complexity: ${$scope.facBlock.complexity}</span>\n  </div>\n  <div class="row">\n    <div\n        if.bind="$scope.facBlock.buffers.in"\n        click.capture="CCC.provide($event, \'at\', \'factoryXput\', $scope.facBlock.connections.source)"\n        class="col-4">\n      Input:\n      <span\n            class="connection"\n            click.delegate="CCC.issue(\'factoryBlock.setConnection\', \n              {\'dir.string\': \'source\', \'$_factoryBusXlist\': IgorJs.arrayFromIds(globals.facBlocks.buses)}, $event)">\n        ${IgorJs.getObjId($scope.facBlock.connections.source).name || "none"}</span>\n      <div>\n        <span repeat.for="item of IgorJs.getObjId($scope.facBlock.buffers.in).items & signal:\'generalUpdate\'">\n          <span\n              class="fas fa-level-up-alt fa-rotate-90"\n              if.bind="item.name"\n              click.delegate="CCC.issue(\'entity.bufferFill\', {\'which.buffer\': IgorJs.getObjId($scope.facBlock.buffers.in), \'item.buffer\': item, \'at.entity\': \'temp_null\'}, $event)"\n            ></span>\n        <icon-base if.bind="item" item.bind="item" count.bind="item.count"></icon-base>\n        </span>\n      </div>\n    </div>\n    <div\n        if.bind="$scope.facBlock.buffers.internal"\n        click.capture="CCC.provide($event, \'at\', \'factoryXput\', $scope.facBlock.buffers.internal)"\n        class="col-4">\n      Internal:\n      <div>\n        <span repeat.for="item of IgorJs.getObjId($scope.facBlock.buffers.internal).items & signal:\'generalUpdate\'">\n          <span\n              class="fas fa-level-up-alt fa-rotate-90"\n              if.bind="item.name"\n              click.delegate="CCC.issue(\'entity.bufferFill\', {\'which.buffer\': IgorJs.getObjId($scope.facBlock.buffers.internale), \'item.buffer\': item, \'at.entity\': \'temp_null\'}, $event)"\n            ></span>\n          <icon-base if.bind="item" item.bind="item" count.bind="item.count"></icon-base>\n          <span\n            class="fas fa-level-down-alt"\n            if.bind="item.name"\n            click.delegate="CCC.issue(\'entity.bufferCollect\', {\'which.buffer\': item, \'at.entity\': \'temp_null\'}, $event)"\n          ></span>\n        </span>\n      </div>\n    </div>\n    <div\n        if.bind="$scope.facBlock.buffers.out"\n        click.capture="CCC.provide($event, \'at\', \'factoryXput\', $scope.facBlock.buffers.out)"\n        class="col-4">\n      Outputs:\n      <span\n          class="connection"\n          click.delegate="CCC.issue(\'factoryBlock.setConnection\',\n          {\'dir.string\': \'drain\', \'$_factoryBusXlist\': IgorJs.arrayFromIds(globals.facBlocks.buses)}, $event)">\n      ${IgorJs.getObjId($scope.facBlock.connections.drain).name || "none"}</span>\n      <div>\n        <span repeat.for="item of IgorJs.getObjId($scope.facBlock.buffers.out).items & signal:\'generalUpdate\'">\n          <span\n              class="fas fa-level-down-alt"\n              if.bind="item.name"\n              click.delegate="CCC.issue(\'entity.bufferCollect\', {\'which.buffer\': item, \'at.entity\': \'temp_null\'}, $event)"\n            ></span>\n          <icon-base if.bind="item" item.bind="item" count.bind="item.count"></icon-base>\n        </span>\n      </div>\n    </div>\n  </div>\n  <div class="productionLines row" repeat.for="line of IgorJs.arrayFromIds($scope.facBlock.factoryLines) & signal:\'generalUpdate\'" click.capture="CCC.provide($event, \'at\', \'factoryLine\', line)">\n    <span\n      if.bind="line.buildingType"\n      click.delegate="CCC.issue(\'factoryLine.setRecipe\', {$_recipeXlist: ChameView.viewFn.recipeFilter(line.crafting_categories, true)}, $event)"\n      >\n      Recipe: \n        <icon-base\n          if.bind="line.recipe"\n          item.bind="line.recipe"\n          css="border-image-source: linear-gradient(to left, red ${$scope.facBlock.processing_ticks/processing_timer*100}%, green ${$scope.facBlock.processing_ticks/processing_timer*100}%)"\n        ></icon-base>\n        <span if.bind="!line.recipe">None</span>\n    </span>\n    <br>\n    <span>\n      <span if.bind="!line.buildingType" click.delegate="CCC.issue(\'factoryLine.setBuilding\', null, $event)">Set Building Type...</span>\n      <span if.bind=" line.buildingType" click.delegate="CCC.issue(\'factoryLine.addBuilding\', null, $event)">\n        <icon-base item.bind="line.buildingType"></icon-base>\n        : ${line.built}\n      </span>\n    </span>\n    <span>\n      Prepped spaces: ${line.prepped}\n      <span click.delegate="CCC.issue(\'factoryLine.prep\', null, $event)">Expand</span>\n    </span>\n  </div>\n  <div note="add new line to factory block" class="row">\n    <span click.delegate="CCC.issue(\'factoryBlock.addLine\', null, $event)">Add Line</span>\n  </div>\n</section>\n</template>\n'},"resources/elements/factoryBlocks/resView.html":function(e,n){e.exports='<template>\n    <scope-var var.bind="$scope={resBlock: viewPane.showingItem}"></scope-var>\n    I\'m a resource block\n</template>'},"resources/elements/icon-base":function(e,n,t){"use strict";t.r(n),t.d(n,"IconBaseCustomElement",(function(){return g}));var i,s,a,o,r,c,l,u,p,d,m=t("aurelia-framework");function f(e,n,t,i){t&&Object.defineProperty(e,n,{enumerable:t.enumerable,configurable:t.configurable,writable:t.writable,value:t.initializer?t.initializer.call(i):void 0})}function b(e,n,t,i,s){var a={};return Object.keys(i).forEach((function(e){a[e]=i[e]})),a.enumerable=!!a.enumerable,a.configurable=!!a.configurable,("value"in a||a.initializer)&&(a.writable=!0),a=t.slice().reverse().reduce((function(t,i){return i(e,n,t)||t}),a),s&&void 0!==a.initializer&&(a.value=a.initializer?a.initializer.call(s):void 0,a.initializer=void 0),void 0===a.initializer&&(Object.defineProperty(e,n,a),a=null),a}var h=t("+Aae").a,g=(s=b((i=function(){function e(){f(this,"item",s,this),f(this,"anim_style",a,this),f(this,"debug",o,this),f(this,"count",r,this),f(this,"altImage",c,this),f(this,"progress",l,this),f(this,"required",u,this),f(this,"metas",p,this),f(this,"showName",d,this),this.parsedCount=null,this.mgrs=h}var n=e.prototype;return n.bind=function(e,n){if(this.item){if("string"==typeof this.item){this.altTip=this.item;try{this.item=h.item.get(this.item),this.hasEntity=this.item.hasEntity}catch(e){console.warn(this.item)}if(!this.item)return}else if("object"==typeof this.item){var t;this.altTip=this.item.name,this.hasEntity=this.item.hasEntity||(null==(t=h.item.get(this.item.name))?void 0:t.hasEntity)}this.item.icon||(this.item.icon=h.item.get(this.item.name).icon)}},n.itemChanged=function(e){e&&("string"==typeof e?(this.altTip=e,this.item=h.item.get(e)):"object"==typeof e&&(this.altTip=e.name))},n.altImageChanged2=function(e){e&&e.includes("@")&&(console.log("lookup "+e),this.altImage=h.item.get(e),console.log(this.altImage))},e}()).prototype,"item",[m.c],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),a=b(i.prototype,"anim_style",[m.c],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),o=b(i.prototype,"debug",[m.c],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),r=b(i.prototype,"count",[m.c],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),c=b(i.prototype,"altImage",[m.c],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),l=b(i.prototype,"progress",[m.c],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),u=b(i.prototype,"required",[m.c],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),p=b(i.prototype,"metas",[m.c],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),d=b(i.prototype,"showName",[m.c],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),i)},"resources/elements/icon-base.html":function(e,n,t){e.exports='<template title.bind="altTip">\n  <require from="./icon-base.scss"> </require>\n  <div class="${item.filtered && \'ghosted\'}">\n    <img src.bind="mgrs.icon.getSrc(item.icon)" height="32px"/>\n    <span if.bind="showName">${item.name}</span>\n  </div>\n  <div class="modis"> \n    <span if.bind="altImage" class="altImage"><img src="${mgrs.icon.getSrc(altImage)}" /></span>\n    <span if.bind="required" class="required">x${required}</span>\n    <span if.bind="count!=undefined">${count}</span>\n    <span></span>\n  </div>\n  <div class="metas">\n    <span if.bind="metas.showEntity && hasEntity" class="entityIcon">M</span>\n  </div>\n  <div if.bind="progress" class="progressBarBase" css="border-image-source: linear-gradient(to right, green ${progress}%, red ${progress}%)">\n  </div>\n  <div>\n    <span class="animTarget ${item.animClass}" style.bind="item.animTime"></span>\n  </div>\n</template>\n'},"resources/elements/icon-base.scss":function(e,n,t){(n=t("JPst")(!1)).push([e.i,"icon-base{display:inline-block;color:#49fb35;font-size:16px;text-align:center;font-weight:700;-webkit-text-stroke:1px #006400;width:40px;height:40px;position:relative;padding:2px;box-sizing:content-box;margin-right:5px}icon-base .metas span.entityIcon{color:red;font-weight:700;bottom:-12px;font-size:1.2em;left:0;right:0;position:absolute;text-align:center}icon-base>div{display:inline-block;position:absolute;top:0;left:0;right:0;bottom:0}icon-base span.animTarget{width:32px;height:32px;position:absolute;left:0;top:0}icon-base>.modis>span{position:absolute;width:16px;height:16px}icon-base>.modis>span.required{color:red}icon-base>.modis>span:first-of-type{bottom:0;right:0}icon-base>.modis>span:nth-of-type(2){bottom:0;left:0}icon-base>.modis>span:nth-of-type(3){top:0;right:0}icon-base>.modis>span:nth-of-type(4){top:0;left:0}icon-base>.modis>span.altImage{height:24px;-webkit-backdrop-filter:blur(1px) hue-rotate(-45deg);backdrop-filter:blur(1px) hue-rotate(-45deg)}.altImage>img{height:100%}.ghosted{border:1px dashed grey;border-radius:4px}",""]),e.exports=n},"resources/elements/iconEditor":function(e,n,t){"use strict";t.r(n),t.d(n,"IconEditor",(function(){return l}));var i,s=t("+Aae"),a=t("aurelia-templating-resources"),o=t("aurelia-framework");function r(e,n,t,i,s,a,o){try{var r=e[a](o),c=r.value}catch(e){return void t(e)}r.done?n(c):Promise.resolve(c).then(i,s)}function c(e){return function(){var n=this,t=arguments;return new Promise((function(i,s){var a=e.apply(n,t);function o(e){r(a,i,s,o,c,"next",e)}function c(e){r(a,i,s,o,c,"throw",e)}o(void 0)}))}}var l=Object(o.d)(a.a)(i=function(){function e(e){this.IE={ds:{old:{},new:{}},select:{},show:"old"},this.show_on=!1,this.mgrs=s.a,this.mgrs.IE=this,this.iconEditor(),this.signaler=e}var n=e.prototype;return n.iconEditor=function(){var e=c(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.mgrs.idb.get("Icons");case 2:if(e.t0=e.sent,e.t0){e.next=7;break}return e.next=6,this.mgrs.idb.get("dataSet");case 6:e.t0=e.sent.icons;case 7:return this.IE.ds.new=e.t0,e.next=10,this.mgrs.idb.get("oldIcons");case 10:if(this.IE.ds.old=e.sent,e.t1=this.IE.ds.old,e.t1){e.next=18;break}return e.next=15,this.mgrs.idb.set("oldIcons",this.IE.ds.new);case 15:if(e.t2=e.sent,!e.t2){e.next=18;break}this.IE.ds.old=this.IE.ds.new;case 18:this.signaler.signal("update");case 19:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}(),n.IEshow=function(){this.IE.showOld=this.IE.ds.old[this.IE.select.Cat][this.IE.select.Icon],this.IE.showNew=this.IE.ds.new[this.IE.select.Cat][this.IE.select.Icon],this.signaler.signal("update")},n.IEfiled=function(){var e=c(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=function(){var e=c(regeneratorRuntime.mark((function e(n){var t;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=new FileReader,e.abrupt("return",new Promise((function(e){t.onload=function(){e(t.result)},t.readAsDataURL(n)})));case 2:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),e.next=3,n(this.IE.file[0]);case 3:this.IE.fileBlob=e.sent;case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}(),n.newIcon=function(){if(!this.newName||-1==this.newName.indexOf("@"))return this.newName=void 0,void console.log("cancel");var e=this.newName.split("@"),n=e[0],t=e[1];this.IE.ds.new[n][t]=null,this.IE.select.Cat=n,this.IE.select.Icon=t,this.show_on=!0,this.signaler.signal("update")},n.deleteNew=function(){this.IE.ds.new[this.IE.select.Cat][this.IE.select.Icon]=null,this.IE.select.Icon=null,this.signaler.signal("update")},n.IEStore=function(){this.IE.ds.new[this.IE.select.Cat][this.IE.select.Icon]=this.IE.fileBlob,this.IE.fileBlob=null,this.signaler.signal("update")},n.saveIconEditor=function(){var e=c(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.mgrs.idb.set("Icons",this.IE.ds.new);case 2:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}(),n.revertIcon=function(){this.IE.ds.new[this.IE.select.Cat][this.IE.select.Icon]=this.IE.ds.old[this.IE.select.Cat][this.IE.select.Icon]},n.dlIcon=function(e){var n=document.createElement("a");n.download=this.IE.select.Icon+".jpg",n.href="new"==e?this.IE.showNew:this.IE.showOld,n.style="display:none",document.body.appendChild(n),n.click(),n.remove()},n.dlIconEditor=function(){var e=document.createElement("a");e.download="icons.json",e.href="data:application/octet-stream:base64,"+JSON.stringify(this.IE.ds.new),e.style="display:none",document.body.appendChild(e),e.click(),e.remove()},n.ulIconEditor=function(){var e=c(regeneratorRuntime.mark((function e(){var n,t;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this.IE.upload){e.next=2;break}return e.abrupt("return");case 2:return n=function(){var e=c(regeneratorRuntime.mark((function e(n){var t;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=new FileReader,e.abrupt("return",new Promise((function(e){t.onload=function(){e(t.result)},t.readAsText(n)})));case 2:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),e.t0=JSON,e.next=6,n(this.IE.upload[0]);case 6:e.t1=e.sent,t=e.t0.parse.call(e.t0,e.t1),this.mgrs.idb.set("Icons",t),console.log("loaded");case 10:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}(),e}())||i},"resources/elements/iconEditor.html":function(e,n){e.exports='<template>\n  New: <input type="text" placeholder="New Icon cat@name" value.bind="newName"><span click.delegate="newIcon()">Add</span><br>\n\n  New Source?:<input type="checkbox" checked.bind="show_on"></input>\n  <select value.bind="IE.select.Cat">\n    <option repeat.for="cat of IE.ds[show_on ? \'new\': \'old\'] | objectKeys & signal:\'update\'" model.bind="cat">${cat}</option>\n  </select>\n  <select value.bind="IE.select.Icon">\n    <option repeat.for="icon of IE.ds[show_on ? \'new\': \'old\'][IE.select.Cat] | objectKeys & signal:\'update\'" model.bind="icon">${icon}</option>\n  </select>\n  <button click.delegate="IEshow()">Show</button><br>\n  <figcaption class="inline">Old</figcaption>\n  <span class="btn" click.delegate="revertIcon()">Revert</span>\n  <img src.bind="IE.showOld & signal:\'update\'" click.delegate="dlIcon(\'old\')" height="64px" width="64px"/>\n  <img src.bind="IE.showNew & signal:\'update\'" click.delegate="dlIcon(\'new\')" height="64px" width="64px"/>\n  <span class="btn" click.delegate="deleteNew()">Delete</span>\n  <figcaption class="inline">New</figcaption><br>\n  <input type="file" files.bind="IE.file" accept="image/*" change.delegate="IEfiled()">Select replacement</input>\n  <img src.bind="IE.fileBlob & signal:\'update\'"></img><br>\n  <button click.delegate="IEStore()">Store</button>\n  <button click.delegate="saveIconEditor()">SaveDB</button><br>\n  <button click.delegate="dlIconEditor()">Download Json</button>\n  <input type="file" name="name" files.bind="IE.upload" style="display:none" id="IconFileSelect" accept=".json" change.delegate="ulIconEditor()">\n  <button onclick="document.getElementById(\'IconFileSelect\').click();">Upload Json</button>\n</template>\n'},"resources/elements/inventory.html":function(e,n){e.exports='<template bindable="items, clickCall">\n  <icon-base\n    repeat.for="item of items & signal:\'generalUpdate\'"\n    item.bind="item"\n    if.bind="item.filtered || item.count>0"\n    count.bind="item.count"\n    modis.bind="{count: item.count}"\n    metas.bind="{showEntity: true}"\n    click.delegate="clickCall({item})"\n  ></icon-base>\n</template>\n'},"resources/elements/mainPanes/defensePane.html":function(e,n){e.exports='<template>\n  <icon-base repeat.for="machine of facBlocks.defenses.machines | objectValues"\n    item.bind="machine.name"\n    click.delegate="CCC.issue(\'invUse\', {\n      how:\'sub-n-crement\',\n      from: player.inv,\n      what: machine.name, \n      count: 1,\n      to: machine,\n      to_prop: \'count\'\n    })"\n    count.bind="machine.count"\n  >\n  </icon-base>\n</template>\n'},"resources/elements/mainPanes/offensePane.html":function(e,n){e.exports="<template>\n  Radar\n  <icon-base item.bind=\"facBlocks.offenses.radar\"\n    click.delegate=\"CCC.issue('invUse', {\n      how:'sub-n-crement',\n      from: player.inv,\n      what: 'radar', \n      count: 1,\n      to: facBlocks.offenses.radar,\n      to_prop: 'count'\n    })\"\n    count.bind=\"facBlocks.offenses.radar.count\"\n  >\n  </icon-base>\n  <br>\n  Offensive bots\n  <icon-base repeat.for=\"machine of facBlocks.offenses.machines | objectValues\"\n    item.bind=\"machine.name\"\n    click.delegate=\"CCC.issue('invUse', {\n      how:'sub-n-crement',\n      from: player.inv,\n      what: machine.name, \n      count: 1,\n      to: machine,\n      to_prop: 'count'\n    })\"\n    count.bind=\"machine.count\"\n  >\n  </icon-base>\n</template>\n"},"resources/elements/micro/scopeVar.html":function(e,n){e.exports='<template bindable="var">\n  <input type="hidden" value.one-time="var">\n</template>\n'},"resources/elements/popouts/filtersPopout.html":function(e,n){e.exports="<template>\n Yay! Filters!\n</template>\n"},"resources/elements/rounderTab.html":function(e,n,t){e.exports='<template>\n  <require from="resources/elements/rounderTab.scss"></require>\n  <input id="huns" type="range" min="0" max="9" step="1" value.bind="mgrs.rounder.huns">\n  <input id="tens" type="range" min="0" max="9" step="1" value.bind="mgrs.rounder.tens">\n  <input id="ones" type="range" min="0" max="9" step="1" value.bind="mgrs.rounder.ones">\n  <span>${mgrs.rounder.huns}${mgrs.rounder.tens}${mgrs.rounder.ones}</span>\n  <label class="switch"><input type="checkbox" value.bind="mgrs.rounder.abs"><span class="slider text_abs_mod"></span></label>\n  <label class="switch"><input type="checkbox" value.bind="mgrs.rounder.fail"><span class="slider text_full_part"></span></label>\n</template>\n'},"resources/elements/rounderTab.scss":function(e,n,t){(n=t("JPst")(!1)).push([e.i,"#numSelectors input[type=range]{-webkit-appearance:slider-vertical;-moz-appearance:slider-vertical;appearance:slider-vertical;width:16px}#numSelectors>.tab_toggle:checked~[slot=content]>compose{width:70px}#numSelectors>.tab_toggle:checked~[slot=content]>compose>*{display:inline-block}#numSelectors>.tab_toggle:checked~[slot=content]>compose>span{width:100%;text-align:center}",""]),e.exports=n},"resources/elements/tool-tip":function(e,n,t){"use strict";t.r(n),t.d(n,"ToolTipCustomElement",(function(){return p}));var i,s,a,o,r=t("aurelia-framework"),c=t("+Aae");function l(e,n,t,i){t&&Object.defineProperty(e,n,{enumerable:t.enumerable,configurable:t.configurable,writable:t.writable,value:t.initializer?t.initializer.call(i):void 0})}function u(e,n,t,i,s){var a={};return Object.keys(i).forEach((function(e){a[e]=i[e]})),a.enumerable=!!a.enumerable,a.configurable=!!a.configurable,("value"in a||a.initializer)&&(a.writable=!0),a=t.slice().reverse().reduce((function(t,i){return i(e,n,t)||t}),a),s&&void 0!==a.initializer&&(a.value=a.initializer?a.initializer.call(s):void 0,a.initializer=void 0),void 0===a.initializer&&(Object.defineProperty(e,n,a),a=null),a}var p=(s=u((i=function(){function e(){l(this,"display",s,this),l(this,"itemMgr",a,this),l(this,"recipeMgr",o,this)}var n=e.prototype;return n.displayChanged=function(){},n.showRec=function(e){c.a.baseApp.tooltip=this.recipeMgr.recipeList[e]},e}()).prototype,"display",[r.c],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),a=u(i.prototype,"itemMgr",[r.c],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),o=u(i.prototype,"recipeMgr",[r.c],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),i)},"resources/elements/tool-tip.html":function(e,n,t){e.exports='<template>\n  <require from="../value-converters/lib/ObjectFilters"></require>\n  <require from="./icon-base"></require>\n  <div show.bind="display">\n    <div if.bind="display.type==\'recipe\'">\n      <h5>${display.name}</h5>\n      <icon-base repeat.for="ing of display.ingredients | objectValues" item.bind="ing.name" count.bind="ing.amount" click.delegate="showRec(ing.name)"></icon-base>\n      =>\n      <icon-base repeat.for="result of display.results | objectValues" item.bind="result.name" count.bind="result.amount"></icon-base>\n    </div>\n    <div if.bind="display.type==\'technology\'">\n      <h5>${display.name}</h5>\n      <icon-base repeat.for="unit of display.cost.ingredients" item.bind="unit[0]"></icon-base>\n      x${display.cost.count - display.completeUnits}\n      <p>\n        <icon-base repeat.for="unlock of display.unlocks" item.bind="unlock" show-name.bind="true"></icon-base>\n      </p>\n    </div> \n  </div>\n</template>\n'},"resources/index":function(e,n,t){"use strict";t.r(n),t.d(n,"configure",(function(){return i}));t("70NS");function i(e){e.globalResources(["resources/elements/icon-base","resources/elements/inventory.html","resources/elements/active-trigger.html","resources/elements/micro/scopeVar.html","resources/value-converters/lib/ObjectFilters","resources/value-converters/valueconverters","resources/value-converters/CanMine","resources/value-converters/isVisible","resources/value-converters/filter","resources/attributes/loading"])}}},[[0,14,33,30,18,31,32,15,16,17,19,20,21,22,23,24,25,26,27,28,29,34,35,36,37,38,39,10,2,9,4,1,11,12,8,5,3,6,13]]]);
//# sourceMappingURL=app~e15de8b4.14d6c90dd1adaa8518de.bundle.map