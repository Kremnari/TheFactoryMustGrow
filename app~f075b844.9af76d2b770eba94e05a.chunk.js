(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{0:function(t,e,i){i("GAND"),i("GmYv"),t.exports=i("b9nV")},"463H":function(t,e,i){"use strict";i.d(e,"b",(function(){return n})),i.d(e,"a",(function(){return r}));var n=30,r=60*n*5},BEPO:function(t){t.exports=JSON.parse('{"a":false,"b":false}')},EfK0:function(t,e,i){"use strict";i.d(e,"c",(function(){return o})),i.d(e,"b",(function(){return u})),i.d(e,"a",(function(){return f}));var n=i("+Aae"),r=i("wb4v");function s(t,e){var i;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(i=function(t,e){if(!t)return;if("string"==typeof t)return a(t,e);var i=Object.prototype.toString.call(t).slice(8,-1);"Object"===i&&t.constructor&&(i=t.constructor.name);if("Map"===i||"Set"===i)return Array.from(t);if("Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))return a(t,e)}(t))||e&&t&&"number"==typeof t.length){i&&(t=i);var n=0;return function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return(i=t[Symbol.iterator]()).next.bind(i)}function a(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,n=new Array(e);i<e;i++)n[i]=t[i];return n}globalThis.InvXFer=r.a;var o=function(){function t(){this.itemList={}}var e=t.prototype;return e.import=function(t){var e=this;Object.entries(t).forEach((function(t){var i=t[0],n=t[1],r=new c(n);e.itemList[i]=r}))},e.get=function(t){return this.itemList[t]},e.incrementX=function(t){return++this.itemList[t].count},e.addNotifyX=function(t,e){var i;null==(i=this.itemList[t])||i.notifys.push(e)},t}(),c=function(t,e){this.isVisible=!1,this.isCraftable=!1,this.entity=!1,this.notifys=[],this.set_count_callbacks=["ItemNotifys"],Object.assign(this,t)},u=function(){function t(t,e,i){void 0===i&&(i=!1),"string"==typeof t&&(this.name=t),"Object"==typeof t&&(this.name=t.name,this.item=t),this.count=e,this.filtered=i}return t.convert=function(e){return e.count?e:new t(e.name||e.item,e.amount)},t}(),f=function(){function t(t,e){void 0===t&&(t=0),this.items=Array.isArray(t)?t:new Array(t),this.max_stack=e,this.itemMgr=n.a.item,this.recMgr=n.a.rec,this.signaler=n.a.signaler}var e=t.prototype;return e.serialize=function(){return{items:this.items,max_stack:this.max_stack}},e.deserialize=function(t){this.items=t.items,this.max_stack=t.max_stack},e[Symbol.iterator]=function(){return this.items},e.addAll=function(t,e,i){void 0===e&&(e=!0),void 0===i&&(i=1),Array.isArray(t)||(t=[t]);for(var n,r=[],a=0,o=s(t);!(n=o()).done;){var c=n.value;(a=this.add(c.item||c.name,(c.amount||c.count)*i))>0&&r.push(new u(c.name||c.item,a))}if(e)return r},e.consumeAll=function(t,e,i){void 0===e&&(e=!0),void 0===i&&(i=1),Array.isArray(t)||(t=[t]);for(var n,r=[],a=0,o=s(t);!(n=o()).done;){var c=n.value,f=u.convert(c);if(0===(a=this.consume(f.name,f.count*i)))r.push(f);else if(e)return r.length>=1?this.addAll(r,!1,i):this.add(f.item,f.count-a),r=null,t}return!!e||[]},e.absorbFrom=function(t,e){for(var i,r=s(t.items);!(i=r()).done;){var a=i.value;if(a){var o;e&&a.name!=e||0!=a.count&&(o=this.add(a.name,a.count),t.consume(a.name,a.count-o))}}n.a.signaler.signal("generalUpdate")},e.setFilter=function(t,e,i){if(void 0===i&&(i=n.a.baseApp.player),t>this.items.length)return!1;var r=new u(e,0,!0);if(this.items[t])if(this.items[t].name==e)this.items[t].filtered=!0;else{var s=this.items[t];this.items.splice(t,1,r),i.inv.addAll(s,!1)}else this.items.splice(t,1,r);return n.a.signaler.signal("generalUpdate"),!0},e.addFilter=function(t,e){void 0===e&&(e=n.a.baseApp.player);for(var i,r=s(this.items.entries());!(i=r()).done;){var a=i.value,o=a[0],c=a[1];if(!c)return this.items[o]=new u(t,0,!0),!0;if(!(c.filtered||c.name!=t&&c.name))return c.filtered=!0,c.name=t,!0}return!1},e.seeFilteredItems=function(){var t=[];return this.items.forEach((function(e){return e.filtered&&t.push(e.name)})),t},e.removeFilter=function(t,e,i){void 0===i&&(i=n.a.baseApp.player);for(var r,a=s(this.items);!(r=a()).done;){var o=r.value;if(o.filtered&&o.name==t)return o.filtered=!1,e&&i.inv.addAll(o),0==o.count&&(o.name=void 0),!0}return!1},e.getTypes=function(t){void 0===t&&(t=!0);for(var e,i=[],n=s(this.items);!(e=n()).done;){var r=e.value;r&&!i.includes(r.name)&&(t||!t&&r.count>0)&&i.push(r.name)}return i},e.total=function(t,e){return void 0===e&&(e=!1),this.items.reduce((function(e,i){return i&&i.name==t?e+i.count:e}),0)},e.addStack=function(t){return 0==t.count?0:t.count-this.add(t.name,t.count)},e.add=function(t,e){if(0!=e){var i=this.max_stack||this.itemMgr.get(t).stack_size,n=this._GetAddStack(t,i);if(!n)return e;var r=Math.min(i-n.count,e);return n.count+=r,e-r>0?this.add(t,e-r):0}},e.consume=function(t,e){var i=this._GetSubStack(t,!1);return i?i.count>=e&&(i.count-=e,0):e},e._GetAddStack=function(t,e){for(var i=-1,n=0,r=[function(i){return i&&i.name==t&&i.count<e},function(t){return t&&0==t.count},function(t){return!t}];n<r.length;n++){var s,a=r[n];if((i=this.items.findIndex(a))>-1&&(!(null==(s=this.items[i])?void 0:s.filtered)||this.items[i].name==t))break}return i>-1&&(!this.items[i]||this.items[i].name!=t)&&this.items.splice(i,1,{name:t,count:0}),this.items[i]},e._GetSubStack=function(t,e){void 0===e&&(e=!0);var i=this.items.length-1-this.items.slice().reverse().findIndex((function(e){return e&&e.name==t}));return e?i:this.items[i]},e.click=function(t){switch(t.what){case"use":var e=t.which.item||this.itemMgr.get(t.which.name);if(t.which.count>0&&e.hasEntity)return t.where.useItem(t.which.name)&&t.which.count--,void this.signaler.signal("addedEntity");break;case"move":var i=t.rounder.val,n=t.where.inv.consume(t.which.name,i),r=t.who.inv.add(t.which.name,i-n);t.where.inv.add(t.which.name,r)}},t}()},fcJs:function(t,e,i){"use strict";i.d(e,"a",(function(){return h})),i.d(e,"b",(function(){return v}));var n,r=i("By/q"),s=i("zYKg"),a=i("EfK0"),o=i("+Aae");function c(t,e){var i;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(i=function(t,e){if(!t)return;if("string"==typeof t)return u(t,e);var i=Object.prototype.toString.call(t).slice(8,-1);"Object"===i&&t.constructor&&(i=t.constructor.name);if("Map"===i||"Set"===i)return Array.from(t);if("Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))return u(t,e)}(t))||e&&t&&"number"==typeof t.length){i&&(t=i);var n=0;return function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return(i=t[Symbol.iterator]()).next.bind(i)}function u(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,n=new Array(e);i<e;i++)n[i]=t[i];return n}function f(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,t.__proto__=e}var h=function(){function t(){this.entities_base={},this.entity_cats=[]}var e=t.prototype;return e.import=function(t,e){var i=this;this.itemMgr=e.item,this.techMgr=e.tech,Object.entries(t).forEach((function(t){var e=t[0],n=t[1];i.itemMgr.itemList[e]?(i.itemMgr.itemList[e].hasEntity=!0,i.entities_base[e]=n,n.crafting_categories&&n.crafting_categories.forEach((function(t){i.entity_cats[t]||(i.entity_cats[t]=[]),i.entity_cats[t].push(n.name)}))):console.warn("cannot locate  item for entity: "+e)})),Object.defineProperty(this,"avail_cats",{get:function(){var t=this,e=[];return Object.entries(this.entity_cats).forEach((function(i){var n=i[0];i[1].some((function(e){return t.itemMgr.itemList[e].count>0}))&&e.push(n)})),e}}),e.Ticker.DataProvider((function(t){i.TickerProvider(t)}))},e.TickerProvider=function(t){t.entities||(t.entities={}),t.entities.types||(t.entities.types=[]),t.entities.types.push("crafting"),t.entities.types.push("mining")},e.EntityType=function(t){var e=this.entities_base[t];return e.resource_categories?"mining":e.crafting_categories?"crafting":!!e.inputs&&"research"},e.GenerateEntity=function(t,e,i){var n=this.entities_base[t];return n.resource_categories?new l(n,e,i):n.crafting_categories?new d(n,e,i):!!n.inputs&&new g(n,e,i)},e.RestoreEntity=function(t,e,i){var n=this.entities_base[t.name],r=null;return"mining"==t.type?(r=new l(n,e,i),""!=t.mining&&r.set_mining(o.a.res.resList[t.mining],t.mining_timer)):"crafting"==t.type?(r=new d(n,e,i),""!=t.recipe&&r.set_recipe(o.a.rec.recipeList[t.recipe],t.crafting_timer)):"lab"==t.type&&((r=new g(n,e,i)).research_timer=t.research_timer),r.restoreBuffers(t.buffers),r},e.upgrade=function(t){"buffers"==t.type?o.a.baseApp.player.inv.consumeAll([new a.b("iron-chest",2)],!0)?t.who.buffers["max_"+t.dir]+=10:console.log("not enough...awesome"):t.type},e.craftingCats=function(t){return this.entities_base[t].crafting_categories},t}(),m=function(){function t(t,e,i,n){var s,a,o;void 0===n&&(n=null),this.buffers={out:void 0,in:void 0},Object.assign(this,t),this.inv=e,this.tags=Object(r.a)({to:i,entity:this}),n&&this.tags.push("type",n),s=this,a=0,o=0,Object.defineProperty(s.buffers,"max_in",{get:function(){return a},set:function(t){a=t,s.buffers.in&&(s.buffers.in.max_stack=t)}}),Object.defineProperty(s.buffers,"max_out",{get:function(){return o},set:function(t){o=t,s.buffers.out&&(s.buffers.out.max_stack=t)}})}var e=t.prototype;return e.deserialize=function(t){throw new Error("Abstract method, please override")},e.serialize=function(){throw new Error("Abstract method, please override")},e.tick=function(t){console.warn("base entity ticked")},e.restoreBuffers=function(t){t.out&&(this.buffers.out=new a.a(t.out.items,t.out.max_stack)),t.in&&(this.buffers.in=new a.a(t.in.items,t.in.max_stack))},t}(),l=function(t){function e(e,i,n){var r;return(r=t.call(this,e,i,n,"mining")||this).mining=null,r.buffers.out=new a.a(1),r.buffers.max_out=5,r}f(e,t);var i=e.prototype;return i.deserialize=function(t){Object.assign(this,t)},i.serialize=function(){var t,e={};return e.name=this.name,e.type="mining",e.mining=(null==(t=this.mining)?void 0:t.name)||"",e.buffers={out:this.buffers.out.serialize()},e.mining_timer=this.mining_timer,e},i.tick=function(t){t.ticks%30==0&&InvXFer(this.buffers.out,t.fromParent.drain),this.mining&&this.buffers.out.total(this.mining.mining_results)!=this.buffers.max_out&&(++this.mining_timer>this.mining_time&&(this.buffers.out.add(this.mining.mining_results,1),console.log("adding one mined"),this.mining_timer=0,o.a.signaler.signal("generalUpdate")),this.progress=this.mining_timer/this.mining_time*100)},i.set_mining=function(t,e){this.mining&&this.collectBuffer(),t!=this.mining?(this.mining=null,this.mining=t,this.mining_time=t.mining_time/this.mining_speed,this.mining_timer=e||0,this.buffers.out.addFilter(this.mining.mining_results),this.tags.push("ticking","mining")):(this.mining=null,this.tags.delete("ticking"))},i.collectBuffer=function(t,e){if(void 0===t&&(t=this),void 0===e&&(e=this.buffers.out.total(this.mining.mining_results)),0!=e){var i=t.inv.add(this.mining.mining_results,e);this.buffers.out.consume(this.mining.mining_results,e-i)}},e}(m),d=function(t){function e(e,i,n){var r;return(r=t.call(this,e,i,n,"crafting")||this).recipe=null,r.buffers.in=new a.a(5),r.buffers.max_in=5,r.buffers.out=new a.a(5),r.buffers.max_out=5,r.crafting_timer=NaN,r}f(e,t);var i=e.prototype;return i.tick=function(t){t.ticks%30==0&&InvXFer(this.buffers.out,t.fromParent.drain),Number.isNaN(this.crafting_timer)?!0===this.buffers.in.consumeAll(this.recipe.ingredients)&&(this.crafting_timer=0):++this.crafting_timer>this.crafting_time&&this.buffers.out.addAll(this.recipe.results,!0)&&(this.crafting_timer=NaN,o.a.signaler.signal("generalUpdate")),this.crafting_timer&&(this.progress=this.crafting_timer/this.crafting_time*100)},i.deserialize=function(t){Object.assign(this,t)},i.serialize=function(){var t,e={};return e.name=this.name,e.type="crafting",e.buffers={out:this.buffers.out.serialize(),in:this.buffers.in.serialize()},e.crafting_timer=this.crafting_timer,e.recipe=(null==(t=this.recipe)?void 0:t.name)||"",e},i.clear_recipe=function(){this.inv.absorbFrom(this.buffers.in),this.inv.absorbFrom(this.buffers.out),this.tags.delete("ticking"),this.recipe=null},i.consumeFrom=function(t,e){var i=o.a.rounder.calc(this.buffers.in.total(e.name),this.buffers.max_in,t.total(e.name));t.consume(e.name,i),this.buffers.in.add(e.name,i),this.tags.push("ticking","crafting"),o.a.signaler.signal("generalUpdate")},i.set_recipe=function(t){var e=this;this.recipe&&this.clear_recipe(),this.recipe=t,this.crafting_time=t.crafting_speed/this.crafting_speed,t.ingredients.forEach((function(t,i){e.buffers.in.setFilter(i,t.name)})),t.results.forEach((function(t,i){e.buffers.out.setFilter(i,t.name)})),this.tags.push("ticking","crafting")},e}(m),g=function(t){function e(e,i,n){var r;return(r=t.call(this,e,i,n,"lab")||this).buffers.in=new a.a(r.inputs.length,r.buffers.max_in),r.buffers.max_in=5,r.inputs.forEach((function(t,e){return r.buffers.in.setFilter(e,t)})),r.research_timer=NaN,r}f(e,t);var i=e.prototype;return i.deserialize=function(t){Object.assign(this,t)},i.serialize=function(){var t={};return t.name=this.name,t.type="lab",t.buffers={in:this.buffers.in.serialize()},t.research_timer=this.research_timer,t},i.canAdd=function(t){return 0!=this.inv.total(t)&&this.buffers.in.total(t)!=this.buffers.max_in},i.addPotion=function(t,e){if(this.canAdd(t)){var i=e.calc(this.buffers.in.total(t),this.buffers.max_in,this.inv.total(t));i-=this.inv.consume(t,i),this.buffers.in.add(t,i),this.tags.push("ticking","lab")}},i.tick=function(t){t.ticks%30==0&&this.buffers.in(t.fromParent.feed),o.a.tech.researching&&(!Number.isNaN(this.research_timer)&&this.research_timer<16&&this.research_timer++,this.research_timer%16==0&&(o.a.tech.increment_research(),this.research_timer=NaN),Number.isNaN(this.research_timer)&&this.nextUnit(o.a.tech.nextIngredients))},i.nextUnit=function(t){var e=this;t&&(t.every((function(t){var i=t[0],n=t[1];return e.buffers.in.total(i)>=n}))?(t.forEach((function(t){var i=t[0],n=t[1];return e.buffers.in.consume(i,n)})),this.research_timer=0,this.tags.push("ticking","lab")):this.tags.delete("ticking"))},e}(m);n=Symbol.iterator;var v=function(){function t(t,e){void 0===e&&(e=!1),this.entities=[],this.entityTags=new s.a,this.mgr=o.a.entity,this.parent=t.parent||t,this.restricted=e}var e=t.prototype;return e[n]=function(){return this.entities},e.deserialize=function(t,e){for(var i,n=null,r=c(t);!(i=r()).done;){var s=i.value;(n=this.mgr.RestoreEntity(s,this.parent.inv,this.entityTags,e)).parent=this.parent,this.entities.push(n)}},e.serialize=function(){var t=[];for(var e in this.entities)t[e]=this.entities[e].serialize();return t},e.SetEntityFn=function(t){var e=this;if(this.restricted){if(this.setFn){if("crafting"==this.restricted.type){for(var i,n=c(this.setFn.results);!(i=n()).done;){var r=i.value;this.restricted.drain.removeFilter(r.name,!0)}for(var s,a=c(this.setFn.ingredients);!(s=a()).done;){var o=s.value;this.restricted.feed.removeFilter(o.name,!0)}}"mining"==this.restricted.type&&this.restricted.drain.removeFilter(this.setFn.mining_results,!0)}if(this.setFn=t,this.entities.forEach((function(t){return e.ApplyEntityFn(t)})),"crafting"==this.restricted.type){for(var u,f=c(this.setFn.results);!(u=f()).done;){var h=u.value;this.restricted.drain.addFilter(h.name)}for(var m,l=c(this.setFn.ingredients);!(m=l()).done;){var d=m.value;this.restricted.feed.addFilter(d.name)}}if("mining"==this.restricted.type)this.restricted.drain.addFilter(this.setFn.mining_results)}},e.ApplyEntityFn=function(t){this.restricted&&("crafting"!=this.restricted.type?"mining"==this.restricted.type&&t.set_mining(this.setFn):t.set_recipe(this.setFn))},e.AddEntity=function(t){if(!this.restricted||this.mgr.EntityType(t)==this.restricted.type){var e=this.mgr.GenerateEntity(t,this.parent.inv,this.entityTags);return e.parent=this.parent,this.entities.push(e),this.restricted&&this.setFn&&this.ApplyEntityFn(e),e}},e.recieveItem=function(t){for(var e,i,n,r,s=Math.floor(t.count/this.entities.length),a=t.count%this.entities.length,o=0,u=c(this.entities);!(n=u()).done;){var f=n.value;r=void 0,r=s,a>0&&r++&&a--,o-=r,e=r,i=f.buffers.in.add(t.name,e),from.consume(t.name,e-i)}return t.count-o},e.tick=function(t){for(var e,i=c(t.entities.types);!(e=i()).done;){var n=e.value;this.entityTags.getSetValues("ticking",n).forEach((function(e){e.tick(t)}))}},t}()},mUjK:function(t,e,i){"use strict";i.d(e,"a",(function(){return n}));var n=function(){function t(){this.iconList={}}var e=t.prototype;return e.import=function(t){this.iconList=t;for(var e=0,i=Object.entries(this.iconList.tool);e<i.length;e++){var n=i[e],r=n[0],s=n[1];this.iconList.item[r]=s}},e.getSrc=function(t,e){var i;if(!t)return"";if(t.indexOf("@")>-1&&!e){var n=t.split("@");t=n[0],e=n[1]}return(null==(i=this.iconList[t])?void 0:i[e])?this.iconList[t][e]:null},e.restoreIcons=function(t){var e=this;return Object.values(t).forEach((function(t){var i;if(t.icon){var n=t.icon.split("@"),r=n[0],s=n[1];t.icon=(null==(i=e.iconList[r])?void 0:i[s])||e.iconList.item[s]}})),t},t}()},uShe:function(t,e,i){"use strict";function n(t,e,i,n,r,s,a){try{var o=t[s](a),c=o.value}catch(t){return void i(t)}o.done?e(c):Promise.resolve(c).then(n,r)}function r(t){return function(){var e=this,i=arguments;return new Promise((function(r,s){var a=t.apply(e,i);function o(t){n(a,r,s,o,c,"next",t)}function c(t){n(a,r,s,o,c,"throw",t)}o(void 0)}))}}i.d(e,"a",(function(){return a}));var s=i("+Aae").a,a={onLoadComplete:function(t){a.loadCb=t},beginLoad:function(){return r(regeneratorRuntime.mark((function t(){var e,i,n,r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,s.idb.get("dataSet");case 2:if(e=t.sent){t.next=15;break}return t.next=6,fetch(location.href+"/data_source.json");case 6:return i=t.sent,t.next=9,i.json();case 9:return e=t.sent,console.log("loaded from file"),t.next=13,s.idb.set("dataSet",e);case 13:t.next=16;break;case 15:console.log("loaded from db");case 16:return t.next=18,s.idb.get("Icons");case 18:return(n=t.sent)&&(e.icons=n),t.next=22,s.idb.get("SaveGame");case 22:if(t.t0=t.sent,t.t0){t.next=25;break}t.t0={};case 25:r=t.t0,a.init(e,r);case 27:case"end":return t.stop()}}),t)})))()},init:function(t,e){return r(regeneratorRuntime.mark((function i(){return regeneratorRuntime.wrap((function(i){for(;;)switch(i.prev=i.next){case 0:s.icon.import(t.icons),s.item.import(s.icon.restoreIcons(t.item)),s.res.import(s.icon.restoreIcons(t.resource)),s.rec.import(s.icon.restoreIcons(t.recipe),s.item),s.tech.import(s.icon.restoreIcons(t.technology),s,null==e?void 0:e.techs),s.entity.import(s.icon.restoreIcons(t.entity),s),a.loadCb({mgrs:s,save:e});case 7:case"end":return i.stop()}}),i)})))()},saveGame:function(t){t?s.idb.set("SaveGame",t):(s.idb.del("SaveGame"),window.location.reload())}}}}]);
//# sourceMappingURL=app~f075b844.9af76d2b770eba94e05a.bundle.map