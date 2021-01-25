(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{"3Qvj":function(e,i,n){"use strict";n.d(i,"a",(function(){return s}));var t=n("aurelia-dialog"),r=n("resources/dialogs/SelectBus"),a=n("resources/dialogs/SelectRecipe"),o=n("resources/dialogs/SelectX"),s=function(){function e(e){this.ds=e,this.modals={SelectBus:r.SelectBus,SelectRecipe:a.SelectRecipe,SelectX:o.SelectX}}return e.prototype.open=function(e,i,n){var t=this;return void 0===n&&(n=!1),new Promise((function(r,a){t.ds.open({viewModel:t.modals[e],model:i,lock:n}).whenClosed((function(e){return r(e.output)}))}))},e}();s.inject=[t.DialogService]},"resources/dialogs/SelectBus":function(e,i,n){"use strict";n.r(i),n.d(i,"SelectBus",(function(){return r}));var t=n("aurelia-dialog"),r=function(){function e(e){this.controller=e}var i=e.prototype;return i.activate=function(e){this.options=e.base.facBlocks,this.selected=null},i.selectedChanged=function(e){console.log(e)},i.complete=function(){this.controller.ok({selected:this.selected})},e}();r.inject=[t.DialogController]},"resources/dialogs/SelectBus.html":function(e,i){e.exports='<template>\n  <ux-dialog>\n    <ux-dialog-header>Select Bus</ux-dialog-header>\n    <ux-dialog-body>\n      <div repeat.for="block of options" click.trigger="selected = (block == selected && undefined ) || block">\n        <span class.bind="block==selected && \'button\'">\n        ${block.name+":"+block.type}\n        </span>\n      </div>\n    </ux-dialog-body>\n    <ux-dialog-footer>\n      <button click.trigger="complete()">Close</button>\n    </ux-dialog-footer>\n  </ux-dialog>\n</template>\n'},"resources/dialogs/SelectRecipe":function(e,i,n){"use strict";n.r(i),n.d(i,"SelectRecipe",(function(){return a}));var t=n("aurelia-dialog"),r=n("+Aae"),a=function(){function e(e,i){this.selected=null,this.controller=e,this.mgrs=i}var i=e.prototype;return i.activate=function(e){var i,n=this;this.model=e,Object.entries(e.tags).forEach((function(e){var t=e[0],r=e[1];i=n.mgrs.rec.recipesByTags(t,r,i)})),this.recList=i},i.select=function(e){this.selected=e==this.selected?null:e},i.complete=function(){this.controller.ok({recipe:this.selected})},e}();a.inject=[t.DialogController,r.a]},"resources/dialogs/SelectRecipe.html":function(e,i){e.exports='<template>\n  <ux-dialog>\n    <ux-dialog-header>Select Recipe</ux-dialog-header>\n    <ux-dialog-body>\n      <icon-base\n        repeat.for="rec of recList"\n        item.bind="rec"\n        click.delegate="select(rec)"\n        class="${rec==selected ? \'selected\' : \'\'}"\n      ></icon-base>\n    </ux-dialog-body>\n    <ux-dialog-footer>\n      <button click.trigger="complete()">Done</button>\n    </ux-dialog-footer>\n  </ux-dialog>\n</template>\n'},"resources/dialogs/SelectX":function(e,i,n){"use strict";n.r(i),n.d(i,"SelectX",(function(){return a}));var t=n("aurelia-dialog"),r=n("+Aae"),a=function(){function e(e,i){this.selected=null,this.controller=e,this.mgrs=i}var i=e.prototype;return i.activate=function(e){this.list=e.list,this.type=e.type,this.selected=e.default},i.select=function(e){this.selected=e==this.selected?null:e},i.complete=function(){this.controller.ok({item:this.selected})},e}();a.inject=[t.DialogController,r.a]},"resources/dialogs/SelectX.html":function(e,i){e.exports='<template>\n  <ux-dialog>\n    <ux-dialog-header>Select ${type}</ux-dialog-header>\n    <ux-dialog-body>\n      <icon-base\n        repeat.for="each of list"\n        item.bind="each"\n        click.delegate="select(each)"\n        class="${each==selected ? \'selected\' : \'\'}"\n      >${each.name}</icon-base>\n    </ux-dialog-body>\n    <ux-dialog-footer>\n      <button click.trigger="complete()">Close</button>\n    </ux-dialog-footer>\n  </ux-dialog>\n</template>\n'},"resources/elements/active-trigger.html":function(e,i){e.exports='<template bindable="entity, tag">\n  <span\n    if.bind="entity.tags.getValue(tag) & signal:\'generalUpdate\'"\n    click.delegate="entity.tags.delete(tag)"\n  >On</span>\n  <span\n    if.bind="!entity.tags.getValue(tag) & signal:\'generalUpdate\'"\n    click.delegate="entity.tags.push(tag, true)"\n  >Off</span>\n</template>\n'},"resources/elements/byModule/crafting-infopane.html":function(e,i,n){e.exports='<template bindable="crafter, recMgr, itemMgr, actor">\n  <require from="../../value-converters/lib/ObjectFilters"></require>\n  <require from="./upgrades-infopane"></require>\n  <div \n    class="showRecipe ${crafter.crafting_timer!=NaN && \'progressBarBase\'}"\n    if.bind="crafter.recipe"\n    css="border-image-source: linear-gradient(to right, green ${crafter.progress}%, red ${crafter.progress}%)"> \n      Recipe:\n      <icon-base\n        repeat.for="ing of crafter.recipe.ingredients | objectValues"\n        item.bind="itemMgr.itemList[ing.name]"\n        required.bind="ing.amount"\n        count.bind="crafter.buffers.in.total(ing.name) & signal:\'generalUpdate\'"\n        click.delegate="crafter.consumeFrom(actor.inv, ing)"\n      ></icon-base>\n      =&gtcc;\n      <icon-base\n        repeat.for="res of crafter.recipe.results | objectValues"\n        item.bind="itemMgr.itemList[res.name]"\n        required.bind="res.amount"\n        count.bind="crafter.buffers.out.total(res.name) & signal:\'generalUpdate\'"\n        click.delegate="crafter.dump(actor, res)"\n      ></icon-base>\n    </p>\n    <p click.delegate="crafter.clear_recipe()">Clear recipe</p>\n  </div>\n  <div if.bind="!crafter.recipe">\n    <p>Select recipe to craft</p>\n    <div class="overflow">\n      <icon-base repeat.for="rec of recMgr.recipesByTags(\'category\', crafter.crafting_categories)" item.bind="rec" click.delegate="crafter.set_recipe(rec)"\n      class="${rec==crafter.recipe ? \'selected\': \'\'}" mouseenter.bind="(tooltip = rec) & debounce:2000" mouseleave.bind="(tooltip = null) & debounce:2000"></icon-base>\n    </div>\n  </div>\n  <upgrades-infopane entity.bind="crafter" parcel.bind="crafter.parent"></upgrades-infopane>\n</template>\n'},"resources/elements/byModule/lab-infopane.html":function(e,i,n){e.exports='<template bindable="lab, itemMgr, rounder">\n  <require from="./upgrades-infopane"></require>\n  <p>\n    Max Buffer: ${lab.buffers.max_in}\n  </p>\n  <div\n    class="labInput, progressBarBase"\n    css="border-image-source: linear-gradient(to right, green ${lab.progress}%, red ${lab.progress}%)"\n  >\n    <icon-base\n      repeat.for="input of lab.inputs"\n      item.bind="itemMgr.itemList[input]"\n      count.bind="lab.buffers.in.items[$index].count"\n      class="${lab.canAdd(input) ? \'fillable\': \'\'}"\n      click.delegate="lab.addPotion(input, rounder)"\n      title="Click to add ${input}"\n    ></icon-base>\n  </div>\n  <upgrades-infopane entity.bind="lab" parcel.bind="lab.parent"></upgrades-infopane>\n</template>\n'},"resources/elements/byModule/mining-infopane.html":function(e,i,n){e.exports='<template bindable="miner, resMgr, actor">\n  <require from="./upgrades-infopane"></require>\n  <div>\n    <p>Select Resource to Mine</p>\n    <icon-base\n      repeat.for="res of resMgr.resListByTag(\'category\', miner.resource_categories)"\n      item.bind="res"\n      click.delegate="miner.set_mining(res)"\n      class="${res==miner.mining? \'selected\': \'\'}"\n    ></icon-base>\n    <p\n      click.delegate="miner.collectBuffer(actor)"\n      if.bind="miner.mining"\n      class="progressBarBase"\n      css="border-image-source: linear-gradient(to right, green ${miner.progress}%, red ${miner.progress}%)"\n      title="Click to collect">\n      <icon-base\n        item.bind="miner.mining.mining_results"\n        count.bind="miner.buffers.out.total(miner.mining.mining_results) & signal:\'generalUpdate\'"\n      ></icon-base>\n      /${miner.buffers.max_out} (max)\n    </p>\n    <upgrades-infopane entity.bind="miner" parcel.bind="miner.parent"></upgrades-infopane>\n  </div>\n</template>\n'},"resources/elements/byModule/tech-infopane.html":function(e,i){e.exports='<template bindable="tech, techMgr, tooltip">\n  <div>\n    <div><icon-base item.bind="tech"></icon-base>${tech.name}</div>\n    <div if.bind="!tech.researched">\n      <b>Cost</b>\n      <icon-base repeat.for="unit of tech.cost.ingredients" item.bind="unit[0]"></icon-base>\n      x${tech.cost.count - tech.completeUnits}\n    </div>\n    <div>\n      <b>Unlocks</b>\n      <icon-base repeat.for="unlock of tech.unlocks" item.bind="unlock" mouseenter.trigger="tooltip = unlock" mouseleave.trigger="tooltip = null"></icon-base>\n    </div>\n    <button click.delegate="techMgr.select_research(tech)" if.bind="!techMgr.researching && !tech.researched">Research</button>\n    <button click.delegate="techMgr.cancel_research()" if.bind="techMgr.researching == tech">Cancel</button>\n  </div>\n</template>\n'},"resources/elements/byModule/upgrades-infopane":function(e,i,n){"use strict";n.r(i),n.d(i,"upgradesInfopaneCustomElement",(function(){return u}));var t,r,a,o=n("aurelia-framework"),s=n("+Aae");function l(e,i,n,t){n&&Object.defineProperty(e,i,{enumerable:n.enumerable,configurable:n.configurable,writable:n.writable,value:n.initializer?n.initializer.call(t):void 0})}function c(e,i,n,t,r){var a={};return Object.keys(t).forEach((function(e){a[e]=t[e]})),a.enumerable=!!a.enumerable,a.configurable=!!a.configurable,("value"in a||a.initializer)&&(a.writable=!0),a=n.slice().reverse().reduce((function(n,t){return t(e,i,n)||n}),a),r&&void 0!==a.initializer&&(a.value=a.initializer?a.initializer.call(r):void 0,a.initializer=void 0),void 0===a.initializer&&(Object.defineProperty(e,i,a),a=null),a}var u=(r=c((t=function(){l(this,"entity",r,this),l(this,"parcel",a,this),this.EM=s.a.entity}).prototype,"entity",[o.c],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),a=c(t.prototype,"parcel",[o.c],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),t)},"resources/elements/byModule/upgrades-infopane.html":function(e,i){e.exports='<template bindable="entity, parcel">\n  <div>\n      <h5>Upgrades</h5>\n      <p if.bind="entity.buffers.in">\n        Input Buffers\n        <icon-base\n          item="iron-chest"\n          count.bind="entity.buffers.upgrades.in.size"\n          click.delegate="EM.upgrade({type:\'buffers\', dir:\'in\', who: entity})"\n        ></icon-base>\n        <icon-base\n          item="inserter"\n          if.bind="!parcel.isPlayer"\n          count.bind="entity.buffers.upgrades.in.xfer"\n          progress.bind="entity.buffers.upgrades.in.xferProgress"\n          click.delegate="EM.upgrade({type:\'autoload\', dir:\'in\', who: entity})"\n        ></icon-base>\n        <active-trigger entity.bind="entity" tag="inputTicker" if.bind="entity.buffers.upgrades.in.xfer>0"></active-trigger>\n      </p>\n      <p if.bind="entity.buffers.out">\n        Output Buffers\n        <icon-base\n          item="iron-chest"\n          count.bind="entity.buffers.upgrades.out.size"\n          click.delegate="EM.upgrade({type:\'buffers\', dir:\'out\', who: entity})"\n        ></icon-base>\n        <icon-base\n          item="inserter"\n          count.bind="entity.buffers.upgrades.out.xfer"\n          if.bind="!parcel.isPlayer"\n          progress.bind="entity.buffers.upgrades.out.xferProgress"\n          click.delegate="EM.upgrade({type:\'autoload\', dir:\'out\', who: entity})"\n        ></icon-base>\n        <active-trigger entity.bind="entity" tag="outputTicker" if.bind="entity.buffers.upgrades.out.xfer>0"></active-trigger>\n      </p>\n    </div>\n</template>\n'},"resources/elements/factoryBlocks/TransportLineUpgrades.html":function(e,i){e.exports='<template bindable="upgrades, applyUpgrade">\n  Upgrades:\n  <td if.bind="upgrades.buffers">\n    <icon-base\n      item="iron-chest"\n      count="${upgrades.buffers.count}(${upgrades.buffers.max})"\n      click.delegate="applyUpgrade({upgrade:upgrades.buffers})"\n    ></icon-base>\n  </td>\n  <td if.bind="upgrades.loaders">\n    <icon-base\n      item="inserter"\n      count="${upgrades.loaders.count}(${upgrades.loaders.max})"\n      click.delegate="applyUpgrade({upgrade:upgrades.loaders})"\n    ></icon-base>\n  </td>\n</template>\n'},"resources/elements/factoryBlocks/entityLine":function(e,i,n){"use strict";n.r(i),n.d(i,"EntityLine",(function(){return m}));var t,r,a,o=n("aurelia-framework"),s=n("+Aae");function l(e,i,n,t,r,a,o){try{var s=e[a](o),l=s.value}catch(e){return void n(e)}s.done?i(l):Promise.resolve(l).then(t,r)}function c(e){return function(){var i=this,n=arguments;return new Promise((function(t,r){var a=e.apply(i,n);function o(e){l(a,t,r,o,s,"next",e)}function s(e){l(a,t,r,o,s,"throw",e)}o(void 0)}))}}var u,d,p,b,f,g,m=(a=function(){function e(){var e,i,n,t;e=this,i="line",t=this,(n=r)&&Object.defineProperty(e,i,{enumerable:n.enumerable,configurable:n.configurable,writable:n.writable,value:n.initializer?n.initializer.call(t):void 0})}var i=e.prototype;return i.clickX=function(){var e=c(regeneratorRuntime.mark((function e(i){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s.a.DS.open("SelectRecipe",{tags:{category:s.a.entity.craftingCats(i)}});case 2:n=e.sent,this.line.SetRecipe(n.recipe);case 4:case"end":return e.stop()}}),e,this)})));return function(i){return e.apply(this,arguments)}}(),i.click=function(){var e=c(regeneratorRuntime.mark((function e(i){var n,t,r,a,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("mining"!=this.line.restricted.type){e.next=4;break}return e.next=3,s.a.DS.open("SelectX",{list:Object.values(s.a.res.resList),type:"resource",default:null==(r=this.line.setFn)?void 0:r.name});case 3:t=e.sent;case 4:if("crafting"!=this.line.restricted.type){e.next=9;break}return o=Object.values(s.a.rec.recipeList),e.next=8,s.a.DS.open("SelectX",{list:o,type:"recipe",default:null==(a=this.line.setFn)?void 0:a.name});case 8:t=e.sent;case 9:if(null==(n=t)?void 0:n.item){e.next=11;break}return e.abrupt("return");case 11:this.line.SetEntityFn(t.item);case 12:case"end":return e.stop()}}),e,this)})));return function(i){return e.apply(this,arguments)}}(),e}(),u=(t=a).prototype,d="line",p=[o.c],b={configurable:!0,enumerable:!0,writable:!0,initializer:null},g={},Object.keys(b).forEach((function(e){g[e]=b[e]})),g.enumerable=!!g.enumerable,g.configurable=!!g.configurable,("value"in g||g.initializer)&&(g.writable=!0),g=p.slice().reverse().reduce((function(e,i){return i(u,d,e)||e}),g),f&&void 0!==g.initializer&&(g.value=g.initializer?g.initializer.call(f):void 0,g.initializer=void 0),void 0===g.initializer&&(Object.defineProperty(u,d,g),g=null),r=g,t)},"resources/elements/factoryBlocks/entityLine.html":function(e,i){e.exports='<template>\n  <span\n    click.delegate="click(line)"\n    if.bind="line.restricted.type==\'crafting\'"\n  >Set Recipe</span>\n  <span\n    click.delegate="click(line)"\n    if.bind="line.restricted.type==\'mining\'"\n  >Set Resource</span>\n  <div>\n    <icon-base\n      if.bind="line.setFn & signal:\'generalUpdate\'"\n      item.bind="line.setFn.name"\n    ></icon-base>\n    <span if.bind="line.setFn">:</span>\n    <icon-base\n      repeat.for="e of line.entities"\n      item.bind="e"\n      alt-image.bind="line.recipe.icon"\n      progress.bind="e.progress"\n    ></icon-base>\n  </div>\n</template>\n'},"resources/elements/factoryBlocks/transportLine.html":function(e,i){e.exports='<template bindable="line, type, upgrades, invClick">\n  <div if.bind="type==\'output\'">\n  </div>\n  <div if.bind="type==\'internal\'">Internal</div>\n  <icon-base\n    repeat.for="item of line.items"\n    item.bind="item"\n    count.bind="item.count"\n    click.delegate="invClick({inv: line, item})"\n  ></icon-base>\n  <div if.bind="type==\'input\'">\n  </div>\n</template>\n'},"resources/elements/icon-base":function(e,i,n){"use strict";n.r(i),n.d(i,"IconBaseCustomElement",(function(){return g}));var t,r,a,o,s,l,c,u,d=n("aurelia-framework");function p(e,i,n,t){n&&Object.defineProperty(e,i,{enumerable:n.enumerable,configurable:n.configurable,writable:n.writable,value:n.initializer?n.initializer.call(t):void 0})}function b(e,i,n,t,r){var a={};return Object.keys(t).forEach((function(e){a[e]=t[e]})),a.enumerable=!!a.enumerable,a.configurable=!!a.configurable,("value"in a||a.initializer)&&(a.writable=!0),a=n.slice().reverse().reduce((function(n,t){return t(e,i,n)||n}),a),r&&void 0!==a.initializer&&(a.value=a.initializer?a.initializer.call(r):void 0,a.initializer=void 0),void 0===a.initializer&&(Object.defineProperty(e,i,a),a=null),a}var f=n("+Aae").a,g=(r=b((t=function(){function e(){p(this,"item",r,this),p(this,"anim_style",a,this),p(this,"debug",o,this),p(this,"count",s,this),p(this,"altImage",l,this),p(this,"progress",c,this),p(this,"showName",u,this),this.parsedCount=null,this.mgrs=f}var i=e.prototype;return i.bind=function(e,i){if(this.item){if("string"==typeof this.item){this.altTip=this.item;try{this.item=f.item.get(this.item),this.hasEntity=this.item.hasEntity}catch(e){console.warn(this.item)}if(!this.item)return}else if("object"==typeof this.item){var n;this.altTip=this.item.name,this.hasEntity=this.item.hasEntity||(null==(n=f.item.get(this.item.name))?void 0:n.hasEntity)}this.item.icon||(this.item.icon="item@"+this.item.name)}},i.itemChanged=function(e){e&&("string"==typeof e?(this.altTip=e,this.item=f.item.get(e)):"object"==typeof e&&(this.altTip=e.name))},i.altImageChanged2=function(e){e&&e.includes("@")&&(console.log("lookup "+e),this.altImage=f.item.get(e),console.log(this.altImage))},e}()).prototype,"item",[d.c],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),a=b(t.prototype,"anim_style",[d.c],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),o=b(t.prototype,"debug",[d.c],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),s=b(t.prototype,"count",[d.c],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),l=b(t.prototype,"altImage",[d.c],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),c=b(t.prototype,"progress",[d.c],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),u=b(t.prototype,"showName",[d.c],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),t)},"resources/elements/icon-base.html":function(e,i,n){e.exports='<template title.bind="altTip">\n  <require from="./icon-base.scss"> </require>\n  <div class="${item.filtered && \'ghosted\'}">\n    <img src.bind="mgrs.icon.getSrc(item.icon)" height="32px"/>\n    <span if.bind="showName">${item.name}</span>\n  </div>\n  <div class="modifiers"> \n    <span if.bind="altImage" class="altImage"><img src="${mgrs.icon.getSrc(altImage)}" /></span>\n    <span if.bind="count!=undefined">${count}</span>\n    <span if.bind="required" class="required">${required}</span>\n    <span></span>\n  </div>\n  <div class="modifiers2">\n    <span if.bind="hasEntity" class="entityIcon">E</span>\n  </div>\n  <div if.bind="progress" class="progressBarBase" css="border-image-source: linear-gradient(to right, green ${progress}%, red ${progress}%)">\n  </div>\n  <div>\n    <span class="animTarget" style.bind="anim_style"></span> \n  </div>\n</template>\n'},"resources/elements/icon-base.scss":function(e,i,n){(i=n("JPst")(!1)).push([e.i,"icon-base{display:inline-block;color:#49fb35;font-size:16px;text-align:center;font-weight:700;-webkit-text-stroke:1px #006400;width:32px;height:32px;position:relative;padding:2px;box-sizing:content-box;margin-right:5px}icon-base .modifiers2 span.entityIcon{color:red;font-weight:700;bottom:-16px;font-size:1.5em;left:0;right:0;position:absolute;text-align:center}icon-base>div{display:inline-block;position:absolute;top:0;left:0;right:0;bottom:0}icon-base span.animTarget{width:32px;height:32px;position:absolute;left:0;top:0}icon-base>.modifiers>span{position:absolute;width:16px;height:16px}icon-base>.modifiers>span:first-of-type{bottom:0;right:0}icon-base>.modifiers>span:nth-of-type(2){bottom:0;left:0}icon-base>.modifiers>span:nth-of-type(3){top:0;right:0}icon-base>.modifiers>span:nth-of-type(4){top:0;left:0}icon-base>div.modifiers>span.altImage{height:24px;-webkit-backdrop-filter:blur(1px) hue-rotate(-45deg);backdrop-filter:blur(1px) hue-rotate(-45deg)}.altImage>img{height:100%}icon-base>.required{color:red}.ghosted{border:1px dashed grey;border-radius:4px}",""]),e.exports=i},"resources/elements/inventory.html":function(e,i){e.exports='<template bindable="items, clickCall">\n  <icon-base\n    repeat.for="item of items & signal:\'generalUpdate\'"\n    item.bind="item"\n    if.bind="item.filtered || item.count>0"\n    count.bind="item.count"\n    click.delegate="clickCall({item})"\n  ></icon-base>\n</template>\n'},"resources/elements/tool-tip":function(e,i,n){"use strict";n.r(i),n.d(i,"ToolTipCustomElement",(function(){return u}));var t,r,a,o,s=n("aurelia-framework");function l(e,i,n,t){n&&Object.defineProperty(e,i,{enumerable:n.enumerable,configurable:n.configurable,writable:n.writable,value:n.initializer?n.initializer.call(t):void 0})}function c(e,i,n,t,r){var a={};return Object.keys(t).forEach((function(e){a[e]=t[e]})),a.enumerable=!!a.enumerable,a.configurable=!!a.configurable,("value"in a||a.initializer)&&(a.writable=!0),a=n.slice().reverse().reduce((function(n,t){return t(e,i,n)||n}),a),r&&void 0!==a.initializer&&(a.value=a.initializer?a.initializer.call(r):void 0,a.initializer=void 0),void 0===a.initializer&&(Object.defineProperty(e,i,a),a=null),a}var u=(r=c((t=function(){function e(){l(this,"display",r,this),l(this,"itemMgr",a,this),l(this,"recipeMgr",o,this)}return e.prototype.displayChanged=function(){},e}()).prototype,"display",[s.c],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),a=c(t.prototype,"itemMgr",[s.c],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),o=c(t.prototype,"recipeMgr",[s.c],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),t)},"resources/elements/tool-tip.html":function(e,i,n){e.exports='<template>\n  <require from="../value-converters/lib/ObjectFilters"></require>\n  <require from="./icon-base"></require>\n  <div show.bind="display">\n    <div if.bind="display.type==\'recipe\'">\n      <icon-base repeat.for="ing of display.ingredients | objectValues" item.bind="ing.name" count.bind="ing.amount"></icon-base>\n      =>\n      <icon-base repeat.for="result of display.results | objectValues" item.bind="result.name" count.bind="result.amount"></icon-base>\n    </div>\n    <div if.bind="display.type==\'technology\'">\n      <h5>${display.name}</h5>\n      <icon-base repeat.for="unit of display.cost.ingredients" item.bind="unit[0]"></icon-base>\n      x${display.cost.count - display.completeUnits}\n      <p>\n        <icon-base repeat.for="unlock of display.unlocks" item.bind="unlock" show-name.bind="true"></icon-base>\n      </p>\n    </div> \n  </div>\n</template>\n'},"resources/index":function(e,i,n){"use strict";n.r(i),n.d(i,"configure",(function(){return t}));n("70NS");function t(e){e.globalResources(["resources/elements/icon-base","resources/elements/inventory.html","resources/elements/active-trigger.html","resources/value-converters/lib/ObjectFilters","resources/value-converters/valueconverters","resources/value-converters/CanMine","resources/value-converters/isVisible"])}}},[[0,8,27,24,12,25,26,9,10,11,13,14,15,16,17,18,19,20,21,22,23,28,29,30,31,32,33,6,5,1,7,2,3]]]);
//# sourceMappingURL=app~d055f38d.f057aefa9e635d329168.bundle.map