(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{"7jDb":function(e,t,n){"use strict";n.d(t,"a",(function(){return g}));var r=n("rOV7"),a=n("ztCj"),i=n("zYKg"),o=n("By/q");function c(e,t,n,r,a,i,o){try{var c=e[i](o),s=c.value}catch(e){return void n(e)}c.done?t(s):Promise.resolve(s).then(r,a)}function s(e){return function(){var t=this,n=arguments;return new Promise((function(r,a){var i=e.apply(t,n);function o(e){c(i,r,a,o,s,"next",e)}function s(e){c(i,r,a,o,s,"throw",e)}o(void 0)}))}}function u(e,t){var n;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return d(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return d(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0;return function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return(n=e[Symbol.iterator]()).next.bind(n)}function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var f={tick_entities:[],object_tickers:{},hardTickers:{},eventHandlers:{},game:{},objs:new Map,namedObjs:[],$_tags:new i.a,meta:{},ops:{},statics:{},control:{obj_counter:0},metaDefines:{},Tick:function(e){for(var t,n=function(){var n=t.value;if(!n._tags.tick)return"continue";var r=f.object_tickers[n.$_type].$_signalOrders;r?r.forEach((function(t){n._tags[t]&&f.object_tickers[n.$_type][t].fn(n,e,b)})):f.object_tickers[n.$_type].tick.fn(n,e,b)},r=u(f.tick_entities.values());!(t=r()).done;)n();for(var a=0,i=Object.values(f.eventHandlers.tick);a<i.length;a++){(0,i[a])(e,b)}},Tick_Builder:function(e){var t={};return Object.assign(t,e),t},IgorBuilder:l,config:{}},l={get data(){return f.data},getNamedObject:function(e){return"global"==e||"game"==e?f.game:Object.walkPath(f.game,f.namedObjs[e])},newObject:function(e,t,n){var r={$_id:"id_"+f.control.obj_counter++,$_type:e,$_subType:t,$_parent:(null==n?void 0:n.$_id)||n};return r.$_tags=Object(o.a)({to:f.$_tags,entity:r}),f.objs.set(r.$_id,r),r},newComponent:function(e,t,n){if(f.metaDefines[e]){var r=f.metaDefines[e].new(t,l.newObject(e,"",n),l),a=r[0];r[1];return f.object_tickers[e]&&f.tick_entities.push(a),a.$_id}return console.warn("cannot find object type"),!1}},g={initialize:function(e){f.graphics=e.viewTasker,f.command=e.commandTasker,f.ticker=new r.a(e.ticker,f.graphics.signaler),g.Ticker=f.ticker,f.ticker_sub=f.ticker.subscribe(f.Tick),f.dbName=e.dbName,f.saveName=e.saveName,f.db=new a.a(f.dbName,"store"),f._provideTemp&&f._provideTemp.forEach((function(e){f.command.provide(e.item,e.fn,e.sig,e.valid)})),f._utilityTemp&&f._utilityTemp.forEach((function(e){return f.command.utilityFn(e.named,e.fn)}))},provide_CCC:function(e,t,n,r){
//! Provides temporary passthrough for game commands
f.command?f.command.provide(e,t,n,r):(f._provideTemp||(f._provideTemp=[]),f._provideTemp.push({item:e,fn:t,sig:n,valid:r}))},CCC_addUtility:function(e,t){f.command?f.command.utilityFn(e,t):(f._utilityTemp||(f._utilityTemp=[]),f._utilityTemp.push({named:e,fn:t}))},defineObj:function(e,t,n){f.metaDefines[e]={new:t,_delete:t._delete,_signal:t._signal,actions:n},(null==n?void 0:n.tick)&&(!f.object_tickers[e]&&(f.object_tickers[e]={}),f.object_tickers[e].tick={type:e,fn:n.tick}),n&&Object.entries(n).forEach((function(e){e[0];var t=e[1];t&&t.CC_provide&&g.provide_CCC(t.CC_provide,t,t.signature,t.validator),t&&t.Igor_operation&&g.addOperation(t.Igor_operation,t),t&&t.CC_utility&&g.CCC_addUtility(t.CC_utility,t),t&&t.CC_dialogList&&g.CCC_addUtility(t.CC_dialogList,t)}))},setStatic:function(e,t){Object.defineProperty(f.statics,e,{value:t,writable:!1})},addOperation:function(e,t){f.ops[e]={fn:t}},addEventHandler:function(e,t){f.eventHandlers[e]||(f.eventHandlers[e]=[]),f.eventHandlers[e].push(t)},
//! I don't really like this implementation
addObjectTickHandler:function(e,t,n,r){!f.object_tickers[e]&&(f.object_tickers[e]={});var a=f.object_tickers[e];a[n]={type:e,fn:t,priority:r};var i=a.$_signalOrders||["tick"],o=i.findIndex((function(e){return"tick"==e}));r.chain?
//! Lots more needed for this...
[].splice.apply(i,[o,1].concat(r.chain)):r.num,a.$_signalOrders=i},loadDatabase:function(e){return s(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return f.data=e,t.next=3,Object(a.d)(f.saveName,f.db);case 3:f.save=t.sent,f.save?(f.game=JSON.parse(f.save.game),f.objs=new Map(JSON.parse(f.save.objs)),f.save.control&&(f.control=JSON.parse(f.save.control)),f.objs.forEach((function(e){e.$_tags=Object(o.a)({to:f.$_tags,entity:e,load:e.$_tags}),f.object_tickers[e.$_type]&&f.tick_entities.push(e)})),f.eventHandlers.gameLoad&&f.eventHandlers.gameLoad.forEach((function(e){return e(g)}))):f.game=f.metaDefines["#"].new;case 5:case"end":return t.stop()}}),t)})))()},setNamed:function(e,t){f.namedObjs[e]=t},getNamed:function(e){return"global"==e||"game"==e?f.game:Object.walkPath(f.game,f.namedObjs[e])},getObjId:function(e,t){if(!t)return f.objs.get(e);var n=f.objs.get(e);return n=Object.walkPath(n,t),f.objs.get(n)},arrayFromIds:function(e){if(!e)return[];var t=[];return e.forEach((function(e){t.push(f.objs.get(e))})),t},getRunner:function(){return b},get globalObject(){return f.game},get dataSet(){return f.data},saveGame:function(){console.log("Game saving..."),f.eventHandlers.gameSave&&f.eventHandlers.gameSave.forEach((function(e){e(g)}));var e={game:JSON.stringify(f.game),objs:JSON.stringify(Array.from(f.objs.entries())),control:JSON.stringify(f.control)};Object(a.f)(f.saveName,e,f.db)},backupSave:function(){var e={game:JSON.stringify(f.game),objs:JSON.stringify(Array.from(f.objs.entries()))};Object(a.f)("SaveGame_bak",e,f.db)},loadBackup:function(){return s(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(a.d)("SaveGame_bak",f.db);case 2:t=e.sent,f.game=JSON.parse(t.game),f.objs=new Map(JSON.parse(t.objs)),f.objs.forEach((function(e){e.$_tags=Object(o.a)({to:f.$_tags,entity:e,load:e.$_tags}),f.object_tickers[e.$_type]&&f.tick_entities.push(e)})),console.log("backup loaded");case 7:case"end":return e.stop()}}),e)})))()},setState:function(e){switch(e){case"start":f.graphics.signaler.signal("generalUpdate"),f.graphics.signaler.signal("entityUpdate"),f.graphics.signaler.signal("techResearched"),f.ticker.resume();break;case"stop":f.ticker.pause();break;case"tick":f.ticker.once();break;case"toggle":f.ticker.toggle(),f.ticker.isRunning&&(f.graphics.signaler.signal("generalUpdate"),f.graphics.signaler.signal("entityUpdate"),f.graphics.signaler.signal("techResearched"));break;default:console.warn("IGOR: setting unknown state")}},commands:function(e,t){return s(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:n.t0=e,n.next="resetSave"===n.t0?3:"copySave"===n.t0?6:"storeSave"===n.t0?10:"backupSave"===n.t0?13:"restoreBackupSave"===n.t0?15:20;break;case 3:return n.next=5,Object(a.c)(f.saveName,f.db);case 5:return n.abrupt("return",!0);case 6:return n.next=8,Object(a.d)(f.saveName,f.db);case 8:return window.tfmg_save=n.sent,n.abrupt("return","done");case 10:return n.next=12,Object(a.f)(f.saveName,t,f.db);case 12:return n.abrupt("return","done");case 13:return g.backupSave(),n.abrupt("return","done");case 15:return n.next=17,Object(a.d)("SaveGame_bak",f.db);case 17:return r=n.sent,Object(a.f)(f.saveName,r,f.db),n.abrupt("return","done");case 20:case"end":return n.stop()}}),n)})))()}},b={emit:function(){},get data(){return f.data},get view(){return f.graphics},get config(){return f.config},get ticker(){return f.ticker},processTEMP:function(e,t,n){var r={};if("string"==typeof e)if(e.includes("id"))e=f.objs.get(e);else{var a=b.getNamedObject(e);a&&(e=a)}return f.ops[t]||console.error("operation not found: "+t),f.ops[t].fn(e,n,r,b,f.ops[t].fn),"_result"in r?r._result:r},getNamedObject:function(e){return"global"==e||"game"==e?f.game:Object.walkPath(f.game,f.namedObjs[e])},getId:function(e,t){if(!t)return f.objs.get(e);var n=f.objs.get(e);return n=Object.walkPath(n,t),f.objs.get(n)},getStatic:function(e){return f.statics[e]},updateStatic:function(e,t){f.statics[e]=t},newComponent:function(e,t){if(f.metaDefines[e]){var n=f.metaDefines[e].new(t,l.newObject(e,""),l),r=n[0];n[1];return f.object_tickers[e]&&f.tick_entities.push(r),r.$_id}return console.warn("cannot find object type"),!1},addNewObject:function(e,t,n){var r=f.metaDefines[t];if(r){var a=r.new(n,l.newObject(t,"",e.$_id),l),i=a[0];a[1];return e.push(i.$_id),f.object_tickers[t]&&f.tick_entities.push(i),r._signal&&f.graphics.signaler.signal(r._signal),!0}return console.warn("cannot find object type"),!1},deleteObject:function(e){"string"==typeof e&&e.includes("id")&&(e=f.objs.get(e));var t=f.metaDefines[e.$_type],n=t._delete;n&&n(e,b);var r=f.tick_entities.findIndex((function(t){return t.$_id==e.$_id}));f.tick_entities.splice(r,1),f.objs.delete(e.$_id),b.view.clearShowing(),t._signal&&f.graphics.signaler.signal(t._signal)}};window.IgorCore=f},mUjK:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var r=function(){function e(){this.iconList={}}var t=e.prototype;return t.import=function(e){this.iconList=e;for(var t=0,n=Object.entries(this.iconList.tool);t<n.length;t++){var r=n[t],a=r[0],i=r[1];this.iconList.item[a]=i}},t.getSrc=function(e,t){if(!e)return"";if(-1==e.indexOf("@"))return this.iconList.item[e];if(e.indexOf("@")>-1&&!t){var n=e.split("@");e=n[0],t=n[1]}return this.iconList[e]&&this.iconList[e][t]||this.iconList.item[t]||null},e}()},uShe:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var r=n("+Aae"),a=n("463H");function i(e,t,n,r,a,i,o){try{var c=e[i](o),s=c.value}catch(e){return void n(e)}c.done?t(s):Promise.resolve(s).then(r,a)}function o(e){return function(){var t=this,n=arguments;return new Promise((function(r,a){var o=e.apply(t,n);function c(e){i(o,r,a,c,s,"next",e)}function s(e){i(o,r,a,c,s,"throw",e)}c(void 0)}))}}var c=r.a,s={onLoadComplete:function(e){s.loadCb=e},beginLoad:function(){return o(regeneratorRuntime.mark((function e(){var t,n,r,i,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c.idb.get("last_ds");case 2:if(e.t0=e.sent,e.t1=a.b,e.t0==e.t1){e.next=16;break}return n=location.href.slice(0,location.href.lastIndexOf("/")),e.next=8,fetch(n+"/data_source.json");case 8:return r=e.sent,e.next=11,r.json();case 11:t=e.sent,c.idb.set("last_ds",a.b),c.idb.set("dataSet",t),e.next=19;break;case 16:return e.next=18,c.idb.get("dataSet");case 18:t=e.sent;case 19:return e.next=21,c.idb.get("Icons");case 21:return(i=e.sent)&&(t.icons=i),e.next=25,c.idb.get("SaveGame");case 25:if(e.t2=e.sent,e.t2){e.next=28;break}e.t2=null;case 28:if(o=e.t2){e.next=37;break}return e.next=32,c.idb.get("SaveGame_Igor");case 32:if(e.t3=e.sent,e.t3){e.next=35;break}e.t3=null;case 35:(o=e.t3)&&!o.version&&(o.version=a.a);case 37:s.init(t,o);case 38:case"end":return e.stop()}}),e)})))()},init:function(e,t){return o(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:c.icon.import(e.icons),c.item.import(e.item),c.data=e,s.loadCb({mgrs:c,save:t});case 4:case"end":return n.stop()}}),n)})))()},saveGame:function(e){e?c.idb.set("SaveGame",e):(c.idb.del("SaveGame"),window.location.reload())}}}}]);
//# sourceMappingURL=app~2c2561fe.848440cece484ba0e7bc.bundle.map