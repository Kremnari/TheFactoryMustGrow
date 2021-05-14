(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{"resources/elements/factoryBlocks/TransportLineUpgrades.html":function(e,t){e.exports='<template bindable="upgrades, applyUpgrade">\n  Upgrades:\n  <td if.bind="upgrades.buffers">\n    <icon-base\n      item="iron-chest"\n      count="${upgrades.buffers.count}(${upgrades.buffers.max})"\n      click.delegate="applyUpgrade({upgrade:upgrades.buffers})"\n    ></icon-base>\n  </td>\n  <td if.bind="upgrades.loaders">\n    <icon-base\n      item="inserter"\n      count="${upgrades.loaders.count}(${upgrades.loaders.max})"\n      click.delegate="applyUpgrade({upgrade:upgrades.loaders})"\n    ></icon-base>\n  </td>\n</template>\n'},"resources/elements/factoryBlocks/entityLine":function(e,t,n){"use strict";n.r(t),n.d(t,"EntityLine",(function(){return h}));var i,r,a,s=n("aurelia-framework"),o=n("+Aae");function l(e,t,n,i,r,a,s){try{var o=e[a](s),l=o.value}catch(e){return void n(e)}o.done?t(l):Promise.resolve(l).then(i,r)}function c(e){return function(){var t=this,n=arguments;return new Promise((function(i,r){var a=e.apply(t,n);function s(e){l(a,i,r,s,o,"next",e)}function o(e){l(a,i,r,s,o,"throw",e)}s(void 0)}))}}var u,d,p,f,b,m,h=(a=function(){function e(){var e,t,n,i;e=this,t="line",i=this,(n=r)&&Object.defineProperty(e,t,{enumerable:n.enumerable,configurable:n.configurable,writable:n.writable,value:n.initializer?n.initializer.call(i):void 0})}var t=e.prototype;return t.clickX=function(){var e=c(regeneratorRuntime.mark((function e(t){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.a.DS.open("SelectRecipe",{tags:{category:o.a.entity.craftingCats(t)}});case 2:n=e.sent,this.line.SetRecipe(n.recipe);case 4:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}(),t.click=function(){var e=c(regeneratorRuntime.mark((function e(t){var n,i,r,a,s;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("mining"!=this.line.restricted.type){e.next=4;break}return e.next=3,o.a.DS.open("SelectX",{list:Object.values(o.a.res.resList),type:"resource",default:null==(r=this.line.setFn)?void 0:r.name});case 3:i=e.sent;case 4:if("crafting"!=this.line.restricted.type){e.next=9;break}return s=Object.values(o.a.rec.recipeList),e.next=8,o.a.DS.open("SelectX",{list:s,type:"recipe",default:null==(a=this.line.setFn)?void 0:a.name});case 8:i=e.sent;case 9:if(null==(n=i)?void 0:n.item){e.next=11;break}return e.abrupt("return");case 11:this.line.SetEntityFn(i.item);case 12:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}(),e}(),u=(i=a).prototype,d="line",p=[s.c],f={configurable:!0,enumerable:!0,writable:!0,initializer:null},m={},Object.keys(f).forEach((function(e){m[e]=f[e]})),m.enumerable=!!m.enumerable,m.configurable=!!m.configurable,("value"in m||m.initializer)&&(m.writable=!0),m=p.slice().reverse().reduce((function(e,t){return t(u,d,e)||e}),m),b&&void 0!==m.initializer&&(m.value=m.initializer?m.initializer.call(b):void 0,m.initializer=void 0),void 0===m.initializer&&(Object.defineProperty(u,d,m),m=null),r=m,i)},"resources/elements/factoryBlocks/entityLine.html":function(e,t){e.exports='<template>\n  <span\n    click.delegate="click(line)"\n    if.bind="line.restricted.type==\'crafting\'"\n  >Set Recipe</span>\n  <span\n    click.delegate="click(line)"\n    if.bind="line.restricted.type==\'mining\'"\n  >Set Resource</span>\n  <div>\n    <icon-base\n      if.bind="line.setFn & signal:\'generalUpdate\'"\n      item.bind="line.setFn.name"\n    ></icon-base>\n    <span if.bind="line.setFn">:</span>\n    <icon-base\n      repeat.for="e of line.entities"\n      item.bind="e"\n      alt-image.bind="line.recipe.icon"\n      progress.bind="e.progress"\n    ></icon-base>\n  </div>\n</template>\n'},"resources/elements/factoryBlocks/transportLine.html":function(e,t){e.exports='<template bindable="line, type, upgrades, invClick">\n  <div if.bind="type==\'output\'">\n  </div>\n  <div if.bind="type==\'internal\'">Internal</div>\n  <icon-base\n    repeat.for="item of line.items"\n    item.bind="item"\n    count.bind="item.count"\n    click.delegate="invClick({inv: line, item})"\n  ></icon-base>\n  <div if.bind="type==\'input\'">\n  </div>\n</template>\n'},"resources/elements/icon-base":function(e,t,n){"use strict";n.r(t),n.d(t,"IconBaseCustomElement",(function(){return m}));var i,r,a,s,o,l,c,u,d=n("aurelia-framework");function p(e,t,n,i){n&&Object.defineProperty(e,t,{enumerable:n.enumerable,configurable:n.configurable,writable:n.writable,value:n.initializer?n.initializer.call(i):void 0})}function f(e,t,n,i,r){var a={};return Object.keys(i).forEach((function(e){a[e]=i[e]})),a.enumerable=!!a.enumerable,a.configurable=!!a.configurable,("value"in a||a.initializer)&&(a.writable=!0),a=n.slice().reverse().reduce((function(n,i){return i(e,t,n)||n}),a),r&&void 0!==a.initializer&&(a.value=a.initializer?a.initializer.call(r):void 0,a.initializer=void 0),void 0===a.initializer&&(Object.defineProperty(e,t,a),a=null),a}var b=n("+Aae").a,m=(r=f((i=function(){function e(){p(this,"item",r,this),p(this,"anim_style",a,this),p(this,"debug",s,this),p(this,"count",o,this),p(this,"altImage",l,this),p(this,"progress",c,this),p(this,"showName",u,this),this.parsedCount=null,this.mgrs=b}var t=e.prototype;return t.bind=function(e,t){if(this.item){if("string"==typeof this.item){this.altTip=this.item;try{this.item=b.item.get(this.item),this.hasEntity=this.item.hasEntity}catch(e){console.warn(this.item)}if(!this.item)return}else if("object"==typeof this.item){var n;this.altTip=this.item.name,this.hasEntity=this.item.hasEntity||(null==(n=b.item.get(this.item.name))?void 0:n.hasEntity)}this.item.icon||(this.item.icon="item@"+this.item.name)}},t.itemChanged=function(e){e&&("string"==typeof e?(this.altTip=e,this.item=b.item.get(e)):"object"==typeof e&&(this.altTip=e.name))},t.altImageChanged2=function(e){e&&e.includes("@")&&(console.log("lookup "+e),this.altImage=b.item.get(e),console.log(this.altImage))},e}()).prototype,"item",[d.c],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),a=f(i.prototype,"anim_style",[d.c],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),s=f(i.prototype,"debug",[d.c],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),o=f(i.prototype,"count",[d.c],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),l=f(i.prototype,"altImage",[d.c],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),c=f(i.prototype,"progress",[d.c],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),u=f(i.prototype,"showName",[d.c],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),i)},"resources/elements/icon-base.html":function(e,t,n){e.exports='<template title.bind="altTip">\n  <require from="./icon-base.scss"> </require>\n  <div class="${item.filtered && \'ghosted\'}">\n    <img src.bind="mgrs.icon.getSrc(item.icon)" height="32px"/>\n    <span if.bind="showName">${item.name}</span>\n  </div>\n  <div class="modifiers"> \n    <span if.bind="altImage" class="altImage"><img src="${mgrs.icon.getSrc(altImage)}" /></span>\n    <span if.bind="count!=undefined">${count}</span>\n    <span if.bind="required" class="required">${required}</span>\n    <span></span>\n  </div>\n  <div class="modifiers2">\n    <span if.bind="hasEntity" class="entityIcon">M</span>\n  </div>\n  <div if.bind="progress" class="progressBarBase" css="border-image-source: linear-gradient(to right, green ${progress}%, red ${progress}%)">\n  </div>\n  <div>\n    <span class="animTarget" style.bind="anim_style"></span> \n  </div>\n</template>\n'},"resources/elements/icon-base.scss":function(e,t,n){(t=n("JPst")(!1)).push([e.i,"icon-base{display:inline-block;color:#49fb35;font-size:16px;text-align:center;font-weight:700;-webkit-text-stroke:1px #006400;width:32px;height:32px;position:relative;padding:2px;box-sizing:content-box;margin-right:5px}icon-base .modifiers2 span.entityIcon{color:red;font-weight:700;bottom:-12px;font-size:1.2em;left:0;right:0;position:absolute;text-align:center}icon-base>div{display:inline-block;position:absolute;top:0;left:0;right:0;bottom:0}icon-base span.animTarget{width:32px;height:32px;position:absolute;left:0;top:0}icon-base>.modifiers>span{position:absolute;width:16px;height:16px}icon-base>.modifiers>span:first-of-type{bottom:0;right:0}icon-base>.modifiers>span:nth-of-type(2){bottom:0;left:0}icon-base>.modifiers>span:nth-of-type(3){top:0;right:0}icon-base>.modifiers>span:nth-of-type(4){top:0;left:0}icon-base>div.modifiers>span.altImage{height:24px;-webkit-backdrop-filter:blur(1px) hue-rotate(-45deg);backdrop-filter:blur(1px) hue-rotate(-45deg)}.altImage>img{height:100%}icon-base>.required{color:red}.ghosted{border:1px dashed grey;border-radius:4px}",""]),e.exports=t},"resources/elements/iconEditor":function(e,t,n){"use strict";n.r(t),n.d(t,"IconEditor",(function(){return c}));var i,r=n("+Aae"),a=n("aurelia-templating-resources"),s=n("aurelia-framework");function o(e,t,n,i,r,a,s){try{var o=e[a](s),l=o.value}catch(e){return void n(e)}o.done?t(l):Promise.resolve(l).then(i,r)}function l(e){return function(){var t=this,n=arguments;return new Promise((function(i,r){var a=e.apply(t,n);function s(e){o(a,i,r,s,l,"next",e)}function l(e){o(a,i,r,s,l,"throw",e)}s(void 0)}))}}var c=Object(s.d)(a.a)(i=function(){function e(e){this.IE={ds:{old:{},new:{}},select:{},show:"old"},this.show_on=!1,this.mgrs=r.a,this.mgrs.IE=this,this.iconEditor(),this.signaler=e}var t=e.prototype;return t.iconEditor=function(){var e=l(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.mgrs.idb.get("Icons");case 2:if(e.t0=e.sent,e.t0){e.next=7;break}return e.next=6,this.mgrs.idb.get("dataSet");case 6:e.t0=e.sent.icons;case 7:return this.IE.ds.new=e.t0,e.next=10,this.mgrs.idb.get("oldIcons");case 10:if(this.IE.ds.old=e.sent,e.t1=this.IE.ds.old,e.t1){e.next=18;break}return e.next=15,this.mgrs.idb.set("oldIcons",this.IE.ds.new);case 15:if(e.t2=e.sent,!e.t2){e.next=18;break}this.IE.ds.old=this.IE.ds.new;case 18:this.signaler.signal("update");case 19:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}(),t.IEshow=function(){this.IE.showOld=this.IE.ds.old[this.IE.select.Cat][this.IE.select.Icon],this.IE.showNew=this.IE.ds.new[this.IE.select.Cat][this.IE.select.Icon],this.signaler.signal("update")},t.IEfiled=function(){var e=l(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=function(){var e=l(regeneratorRuntime.mark((function e(t){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=new FileReader,e.abrupt("return",new Promise((function(e){n.onload=function(){e(n.result)},n.readAsDataURL(t)})));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),e.next=3,t(this.IE.file[0]);case 3:this.IE.fileBlob=e.sent;case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}(),t.newIcon=function(){if(!this.newName||-1==this.newName.indexOf("@"))return this.newName=void 0,void console.log("cancel");var e=this.newName.split("@"),t=e[0],n=e[1];this.IE.ds.new[t][n]=null,this.IE.select.Cat=t,this.IE.select.Icon=n},t.IEStore=function(){this.IE.ds.new[this.IE.select.Cat][this.IE.select.Icon]=this.IE.fileBlob},t.saveIconEditor=function(){var e=l(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.mgrs.idb.set("Icons",this.IE.ds.new);case 2:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}(),t.revertIcon=function(){this.IE.ds.new[this.IE.select.Cat][this.IE.select.Icon]=this.IE.ds.old[this.IE.select.Cat][this.IE.select.Icon]},t.dlIconEditor=function(){var e=document.createElement("a");e.download="icons.json",e.href="data:application/octet-stream:base64,"+JSON.stringify(this.IE.ds.new),e.style="display:none",document.body.appendChild(e),e.click()},t.ulIconEditor=function(){var e=l(regeneratorRuntime.mark((function e(){var t,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this.IE.upload){e.next=2;break}return e.abrupt("return");case 2:return t=function(){var e=l(regeneratorRuntime.mark((function e(t){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=new FileReader,e.abrupt("return",new Promise((function(e){n.onload=function(){e(n.result)},n.readAsText(t)})));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),e.t0=JSON,e.next=6,t(this.IE.upload[0]);case 6:e.t1=e.sent,n=e.t0.parse.call(e.t0,e.t1),this.mgrs.idb.set("Icons",n),console.log("loaded");case 10:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}(),e}())||i},"resources/elements/iconEditor.html":function(e,t){e.exports='<template>\n  New: <input type="text" placeholder="New Icon cat@name" value.bind="newName"><span click.delegate="newIcon()">Add</span><br>\n\n  <input type="checkbox" checked.bind="show_on"></input>\n  <select value.bind="IE.select.Cat">\n    <option repeat.for="cat of IE.ds[show_on ? \'new\': \'old\'] | objectKeys & signal:\'update\'" model.bind="cat">${cat}</option>\n  </select>\n  <select value.bind="IE.select.Icon">\n    <option repeat.for="icon of IE.ds[show_on ? \'new\': \'old\'][IE.select.Cat] | objectKeys & signal:\'update\'" model.bind="icon">${icon}</option>\n  </select>\n  <button click.delegate="IEshow()">Show</button><br>\n  <figcaption class="inline">Old</figcaption>\n  <span class="btn" click.delegate="revertIcon()">Revert</span>\n  <img src.bind="IE.showOld & signal:\'update\'" height="64px" width="64px"/>\n  <img src.bind="IE.showNew & signal:\'update\'" height="64px" width="64px"/>\n  <figcaption class="inline">New</figcaption><br>\n  <input type="file" files.bind="IE.file" accept="image/*" change.delegate="IEfiled()">Select replace</input>\n  <img src.bind="IE.fileBlob"></img><br>\n  <button click.delegate="IEStore()">Store</button>\n  <button click.delegate="saveIconEditor()">SaveDB</button><br>\n  <button click.delegate="dlIconEditor()">Download</button>\n  <input type="file" name="name" files.bind="IE.upload" style="display:none" id="IconFileSelect" accept=".json" change.delegate="ulIconEditor()">\n  <button onclick="document.getElementById(\'IconFileSelect\').click();">Upload</button>\n</template>\n'},"resources/elements/inventory.html":function(e,t){e.exports='<template bindable="items, clickCall">\n  <icon-base\n    repeat.for="item of items & signal:\'generalUpdate\'"\n    item.bind="item"\n    if.bind="item.filtered || item.count>0"\n    count.bind="item.count"\n    click.delegate="clickCall({item})"\n  ></icon-base>\n</template>\n'},"resources/elements/tool-tip":function(e,t,n){"use strict";n.r(t),n.d(t,"ToolTipCustomElement",(function(){return u}));var i,r,a,s,o=n("aurelia-framework");function l(e,t,n,i){n&&Object.defineProperty(e,t,{enumerable:n.enumerable,configurable:n.configurable,writable:n.writable,value:n.initializer?n.initializer.call(i):void 0})}function c(e,t,n,i,r){var a={};return Object.keys(i).forEach((function(e){a[e]=i[e]})),a.enumerable=!!a.enumerable,a.configurable=!!a.configurable,("value"in a||a.initializer)&&(a.writable=!0),a=n.slice().reverse().reduce((function(n,i){return i(e,t,n)||n}),a),r&&void 0!==a.initializer&&(a.value=a.initializer?a.initializer.call(r):void 0,a.initializer=void 0),void 0===a.initializer&&(Object.defineProperty(e,t,a),a=null),a}var u=(r=c((i=function(){function e(){l(this,"display",r,this),l(this,"itemMgr",a,this),l(this,"recipeMgr",s,this)}return e.prototype.displayChanged=function(){},e}()).prototype,"display",[o.c],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),a=c(i.prototype,"itemMgr",[o.c],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),s=c(i.prototype,"recipeMgr",[o.c],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),i)},"resources/elements/tool-tip.html":function(e,t,n){e.exports='<template>\n  <require from="../value-converters/lib/ObjectFilters"></require>\n  <require from="./icon-base"></require>\n  <div show.bind="display">\n    <div if.bind="display.type==\'recipe\'">\n      <h5>${display.name}</h5>\n      <icon-base repeat.for="ing of display.ingredients | objectValues" item.bind="ing.name" count.bind="ing.amount"></icon-base>\n      =>\n      <icon-base repeat.for="result of display.results | objectValues" item.bind="result.name" count.bind="result.amount"></icon-base>\n    </div>\n    <div if.bind="display.type==\'technology\'">\n      <h5>${display.name}</h5>\n      <icon-base repeat.for="unit of display.cost.ingredients" item.bind="unit[0]"></icon-base>\n      x${display.cost.count - display.completeUnits}\n      <p>\n        <icon-base repeat.for="unlock of display.unlocks" item.bind="unlock" show-name.bind="true"></icon-base>\n      </p>\n    </div> \n  </div>\n</template>\n'}}]);
//# sourceMappingURL=app~678c7454.cdea1cc260674932c06a.bundle.map