(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{"7jDb":function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var r,i,a=n("rOV7"),o=n("ztCj"),c=n("zYKg"),s=n("By/q");function u(e,t,n,r,i,a,o){try{var c=e[a](o),s=c.value}catch(e){return void n(e)}c.done?t(s):Promise.resolve(s).then(r,i)}function f(e){return function(){var t=this,n=arguments;return new Promise((function(r,i){var a=e.apply(t,n);function o(e){u(a,r,i,o,c,"next",e)}function c(e){u(a,r,i,o,c,"throw",e)}o(void 0)}))}}function m(e,t){var n;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return d(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return d(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0;return function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return(n=e[Symbol.iterator]()).next.bind(n)}function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var b={tick_entities:[],object_tickers:{},game:{},objs:new Map,namedObjs:[],$_tags:new c.a,meta:{},ops:{},metaDefines:{},Tick:function(e){for(var t,n=function(){var n=t.value;b.object_tickers[n.$_type].$_signalOrders.forEach((function(t){n.$_tags.has(t)&&b.object_tickers[n.$_type][t].fn(n,e,g)}))},r=m(b.tick_entities.values());!(t=r()).done;)n()},Tick_Builder:function(e){var t={};return Object.assign(t,e),t},IgorBuilder:p,config:{}},p={get data(){return b.data},newObject:function(e,t,n){var r={$_id:"id_"+b.objs.size,$_type:e,$_subType:t};return r.$_tags=Object(s.a)({to:b.$_tags,entity:r}),b.objs.set(r.$_id,r),n.push(r.$_id),r}},l={initialize:function(e){b.ticker=new a.a(e.ticker.ticks_perSec,e.ticker.ticks_maxPhase),b.config.TICKS_PER_SECOND=e.ticker.ticks_perSec,l.Ticker=b.ticker,b.ticker_sub=b.ticker.subscribe(b.Tick),b.graphics=e.viewTasker,b.command=e.commandTasker,b.dbName=e.dbName,b.saveName=e.saveName,b.db=new o.a(b.dbName,"store"),b._provideTemp&&b._provideTemp.forEach((function(e){b.command.provide(e.item,e.fn,e.sig)})),b._utilityTemp&&b._utilityTemp.forEach((function(e){return b.command.utilityFn(e.named,e.fn)}))},provide_CCC:function(e,t,n){
//! Provides temporary passthrough for game commands
b.command?b.command.provide(e,t,n):(b._provideTemp||(b._provideTemp=[]),b._provideTemp.push({item:e,fn:t,sig:n}))},addUtility_CCC:function(e,t){b.command?b.command.utilityFn(e,t):(b._utilityTemp||(b._utilityTemp=[]),b._utilityTemp.push({named:e,fn:t}))},defineObj:function(e,t,n){b.metaDefines[e]={new:t,actions:n},(null==n?void 0:n.tick)&&(!b.object_tickers[e]&&(b.object_tickers[e]={}),b.object_tickers[e].tick={type:e,fn:n.tick})},addOperation:function(e,t){b.ops[e]={fn:t}},amendObject:function(e,t){},
//!
addObjectTickHandler:function(e,t,n,r){!b.object_tickers[e]&&(b.object_tickers[e]={});var i=b.object_tickers[e];i[n]={type:e,fn:t,priority:r};var a=i.$_signalOrders||["tick"],o=a.findIndex((function(e){return"tick"==e}));r.chain?
//! Lots more needed for this...
[].splice.apply(a,[o,1].concat(r.chain)):r.num,i.$_signalOrders=a},loadDatabase:function(e){return f(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return b.data=e,t.next=3,Object(o.d)(b.saveName,b.db);case 3:b.save=t.sent,b.save?(b.game=JSON.parse(b.save.game),b.objs=new Map(JSON.parse(b.save.objs)),b.objs.forEach((function(e){e.$_tags=Object(s.a)({to:b.$_tags,entity:e,load:e.$_tags})})),console.log("found save")):(b.game=b.metaDefines["#"].new,console.log("new game")),console.log("db loaded");case 6:case"end":return t.stop()}}),t)})))()},setNamed:function(e,t){b.namedObjs[e]=t},getObjId:function(e){return b.objs[e]},arrayFromIds:function(e){if(!e)return[];var t=[];return e.forEach((function(e){t.push(b.objs.get(e))})),t},getRunner:function(){return g},get globalObject(){return b.game},get dataSet(){return b.data},get:function(e,t){return b.objects_by_name()},saveGame:function(){var e={game:JSON.stringify(b.game),objs:JSON.stringify(Array.from(b.objs.entries()))};Object(o.f)(b.saveName,e,b.db)},setState:function(e){switch(e){case"start":b.ticker.resume();break;case"stop":b.ticker.pause();break;case"toggle":b.ticker.toggle();break;default:console.warn("IGOR: setting unknown state")}},commands:function(e,t){return f(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:t.t0=e,t.next="resetSave"===t.t0?3:7;break;case 3:return t.next=5,Object(o.c)(b.saveName,b.db);case 5:return t.abrupt("return",!0);case 7:case"end":return t.stop()}}),t)})))()}},g=(r={emit:function(){},get view(){return b.graphics},get data(){return b.data}},"view",(i={}).view=i.view||{},i.view.get=function(){return b.graphics},"config",i.config=i.config||{},i.config.get=function(){return b.config},r.processTEMP=function(e,t,n){var r={};return b.ops[t].fn(e,n,r,g,b.ops[t].fn),"_result"in r?r._result:r},r.getNamedObject=function(e){return b.namedObjs[e]},r.addNewObject=function(e,t,n){if(b.metaDefines[t]){var r=b.metaDefines[t].new(n,p.newObject(t,"",e),p),i=r[0];r[1];return b.object_tickers[t]&&b.tick_entities.push(i),!0}return console.warn("cannot find object type"),!1},function(e,t){for(var n in t){(a=t[n]).configurable=a.enumerable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,n,a)}if(Object.getOwnPropertySymbols)for(var r=Object.getOwnPropertySymbols(t),i=0;i<r.length;i++){var a,o=r[i];(a=t[o]).configurable=a.enumerable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,o,a)}}(r,i),r);window.IgorCore=b},mUjK:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var r=function(){function e(){this.iconList={}}var t=e.prototype;return t.import=function(e){this.iconList=e;for(var t=0,n=Object.entries(this.iconList.tool);t<n.length;t++){var r=n[t],i=r[0],a=r[1];this.iconList.item[i]=a}},t.getSrc=function(e,t){if(!e)return"";if(e.indexOf("@")>-1&&!t){var n=e.split("@");e=n[0],t=n[1]}return this.iconList[e]&&this.iconList[e][t]||this.iconList.item[t]||null},e}()}}]);
//# sourceMappingURL=app~62866266.6ac3b4fd68e6aa374928.bundle.map