(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{0:function(t,e,i){i("GAND"),i("GmYv"),t.exports=i("b9nV")},"0d46":function(t,e,i){"use strict";i.d(e,"a",(function(){return r}));new(function(){function t(){}return t.prototype.register=function(t,e){},t}());var r={}},"463H":function(t,e,i){"use strict";i.d(e,"b",(function(){return r})),i.d(e,"a",(function(){return n}));var r=30,n=60*r*5},BEPO:function(t){t.exports=JSON.parse('{"a":false,"b":false}')},fcJs:function(t,e,i){"use strict";i.d(e,"a",(function(){return d})),i.d(e,"b",(function(){return v}));var r,n=i("By/q"),s=i("zYKg"),a=i("EfK0"),u=i("8p7n"),o=i("+Aae"),f=i("463H");function c(t,e){var i;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(i=function(t,e){if(!t)return;if("string"==typeof t)return h(t,e);var i=Object.prototype.toString.call(t).slice(8,-1);"Object"===i&&t.constructor&&(i=t.constructor.name);if("Map"===i||"Set"===i)return Array.from(t);if("Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))return h(t,e)}(t))||e&&t&&"number"==typeof t.length){i&&(t=i);var r=0;return function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return(i=t[Symbol.iterator]()).next.bind(i)}function h(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,r=new Array(e);i<e;i++)r[i]=t[i];return r}function m(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,t.__proto__=e}var d=function(){function t(){this.entities_base={},this.entity_cats=[]}var e=t.prototype;return e.import=function(t){var e=this;this.itemMgr=o.a.item,this.techMgr=o.a.tech,Object.entries(t).forEach((function(t){var i=t[0],r=t[1];e.itemMgr.itemList[i]?(e.itemMgr.itemList[i].hasEntity=!0,e.entities_base[i]=r,r.crafting_categories&&r.crafting_categories.forEach((function(t){e.entity_cats[t]||(e.entity_cats[t]=[]),e.entity_cats[t].push(r.name)}))):console.warn("cannot locate  item for entity: "+i)})),Object.defineProperty(this,"avail_cats",{get:function(){var t=this,e=[];return Object.entries(this.entity_cats).forEach((function(i){var r=i[0];i[1].some((function(e){return t.itemMgr.itemList[e].count>0}))&&e.push(r)})),e}}),o.a.Ticker.DataProvider((function(t){e.TickerProvider(t)}))},e.TickerProvider=function(t){t.entities||(t.entities={}),t.entities.types||(t.entities.types=[]),t.entities.types.push("crafting"),t.entities.types.push("mining")},e.EntityType=function(t){var e=this.entities_base[t];return e.resource_categories?"mining":e.crafting_categories?"crafting":!!e.inputs&&"research"},e.GenerateEntity=function(t,e,i){var r=this.entities_base[t];return r.resource_categories?new p(r,e,i):r.crafting_categories?new l(r,e,i):!!r.inputs&&new b(r,e,i)},e.RestoreEntity=function(t,e,i){var r=this.entities_base[t.name],n=null;return"mining"==t.type?(n=new p(r,e,i),""!=t.mining&&n.set_mining(o.a.res.resList[t.mining],t.mining_timer)):"crafting"==t.type?(n=new l(r,e,i),""!=t.recipe&&n.set_recipe(o.a.rec.recipeList[t.recipe],t.crafting_timer)):"lab"==t.type&&((n=new b(r,e,i)).research_timer=t.research_timer),n.restoreBuffers(t.buffers),n},e.upgrade=function(t){var e=t.who.buffers.upgrades[t.dir];if("buffers"==t.type){var i=o.a.baseApp.player.inv.consumeAll([new a.b("iron-chest",1)],!0);i&&!Array.isArray(i)&&(e.size++,t.who.buffers["max_"+t.dir]+=10)}else if("autoload"==t.type){var r=o.a.baseApp.player.inv.consumeAll([new a.b("inserter",1)],!0);r&&!Array.isArray(r)&&(e.xfer++,e.xferAt||(e.xferAt=0))}},e.craftingCats=function(t){return this.entities_base[t].crafting_categories},t}(),g=function(){function t(t,e,i,r){void 0===r&&(r=null),this.buffers={out:void 0,in:void 0,upgrades:{out:{size:0,xfer:0,xferMod:120,xferProgress:NaN},in:{size:0,xfer:0,xferMod:120,xferProgress:NaN}}},Object.assign(this,t),this.inv=e,this.tags=Object(n.a)({to:i,entity:this}),r&&this.tags.push("type",r),"mining-drill"!=t.type&&Object.defineProperty(this.buffers,"max_in",{get:function(){return this.in.max_stack},set:function(t){this.in.max_stack=t}}),"lab"!=t.type&&Object.defineProperty(this.buffers,"max_out",{get:function(){return this.out.max_stack},set:function(t){this.out.max_stack=t}})}var e=t.prototype;return e.deserialize=function(t){throw new Error("Abstract method, please override")},e.serialize=function(){throw new Error("Abstract method, please override")},e.tick=function(t){console.warn("base entity ticked")},e.restoreBuffers=function(t){t.out&&(this.buffers.out=new a.a(t.out.items,t.out.max_stack)),t.in&&(this.buffers.in=new a.a(t.in.items,t.in.max_stack)),this.buffers.upgrades=t.upgrades,t.max_in&&(this.buffers.max_in=t.max_in),t.max_out&&(this.buffers.max_out=t.max_out)},t}(),p=function(t){function e(e,i,r){var n;return(n=t.call(this,e,i,r,"mining")||this).mining=null,n.buffers.out=new a.a(1),n.buffers.max_out=5,n}m(e,t);var i=e.prototype;return i.deserialize=function(t){Object.assign(this,t)},i.serialize=function(){var t,e={};return e.name=this.name,e.type="mining",e.mining=(null==(t=this.mining)?void 0:t.name)||"",e.buffers={out:this.buffers.out.serialize(),upgrades:this.buffers.upgrades,max_out:this.buffers.max_out},e.mining_timer=this.mining_timer,e},i.tick_outXfer=function(t){++this.buffers.upgrades.out.xferAt>this.buffers.upgrades.out.xferMod&&(InvXFer(this.buffers.out,t.fromParent.drain,{maxXfer:this.buffers.upgrades.out.xfer}),this.buffers.upgrades.out.xferAt=0),this.buffers.upgrades.out.xferProgress=this.buffers.upgrades.out.xferAt/this.buffers.upgrades.out.xferMod*100},i.tick=function(t){this.mining&&this.buffers.out.total(this.mining.mining_results)!=this.buffers.max_out&&(++this.mining_timer>this.mining_time&&(this.buffers.out.add(this.mining.mining_results,1),this.mining_timer=0,o.a.signaler.signal("generalUpdate")),this.progress=this.mining_timer/this.mining_time*100)},i.set_mining=function(t,e){this.mining&&this.collectBuffer(),this.mining&&this.buffers.out.removeFilter(this.mining.mining_results),t!=this.mining?(this.mining=t,this.mining_time=t.mining_time/this.mining_speed*f.b,this.mining_timer=e||0,this.buffers.out.addFilter(this.mining.mining_results),this.tags.push("ticking","mining")):(this.mining=null,this.tags.delete("ticking"))},i.collectBuffer=function(t,e){if(void 0===t&&(t=this),void 0===e&&(e=this.buffers.out.total(this.mining.mining_results)),0!=e){var i=t.inv.add(this.mining.mining_results,e);this.buffers.out.consume(this.mining.mining_results,e-i),o.a.signaler.signal("generalUpdate")}},e}(g),l=function(t){function e(e,i,r){var n;(n=t.call(this,e,i,r,"crafting")||this).recipe=null,n.outputFull=!1;var s="furnace"==n.type?1:5;return n.buffers.in=new a.a(s),n.buffers.max_in=5,n.buffers.out=new a.a(s),n.buffers.max_out=5,n.crafting_timer=NaN,n}m(e,t);var i=e.prototype;return i.tick_outXfer=function(t){++this.buffers.upgrades.out.xferAt>this.buffers.upgrades.out.xferMod&&(InvXFer(this.buffers.out,t.fromParent.drain,{maxXfer:this.buffers.upgrades.out.xfer}),this.buffers.upgrades.out.xferAt=0),this.buffers.upgrades.out.xferProgress=this.buffers.upgrades.out.xferAt/this.buffers.upgrades.out.xferMod*100},i.tick_inXfer=function(t){++this.buffers.upgrades.in.xferAt>this.buffers.upgrades.in.xferMod&&(InvXFer(t.fromParent.feed,this.buffers.in,{types:this.recipe.ingredients.map((function(t){return t.name})),maxXfer:this.buffers.upgrades.in.xfer}),this.outputFull=!1,this.buffers.upgrades.in.xferAt=0),this.buffers.upgrades.in.xferProgress=this.buffers.upgrades.in.xferAt/this.buffers.upgrades.in.xferMod*100},i.tick=function(t){Number.isNaN(this.crafting_timer)?!0===this.buffers.in.consumeAll(this.recipe.ingredients)&&(this.crafting_timer=0):!this.outputFull&&++this.crafting_timer>this.crafting_time&&(this.buffers.out.addAllOrFail(this.recipe.results)?(this.crafting_timer=NaN,this.progress=0,o.a.signaler.signal("generalUpdate")):this.outputFull=!0);this.crafting_timer&&(this.progress=this.crafting_timer/this.crafting_time*100)},i.deserialize=function(t){Object.assign(this,t)},i.serialize=function(){var t,e={};return e.name=this.name,e.type="crafting",e.buffers={out:this.buffers.out.serialize(),in:this.buffers.in.serialize(),upgrades:this.buffers.upgrades,max_out:this.buffers.max_out,max_in:this.buffers.max_in},e.crafting_timer=this.crafting_timer,e.recipe=(null==(t=this.recipe)?void 0:t.name)||"",e},i.dump=function(t,e){t.inv.absorbFrom(this.buffers.out,e.name),this.outputFull=!1},i.clear_recipe=function(){o.a.baseApp.player.inv.absorbFrom(this.buffers.in),o.a.baseApp.player.inv.absorbFrom(this.buffers.out),this.tags.delete("ticking"),this.recipe=null},i.consumeFrom=function(t,e){var i=o.a.rounder.calc(this.buffers.in.total(e.name),this.buffers.max_in,t.total(e.name));t.consume(e.name,i),this.buffers.in.add(e.name,i),this.tags.push("ticking","crafting"),o.a.signaler.signal("generalUpdate")},i.set_recipe=function(t){var e=this;this.recipe&&this.recipe.name!=t.name&&this.clear_recipe(),this.recipe=t,this.crafting_time=t.crafting_speed/this.crafting_speed*f.b,t.ingredients.forEach((function(t,i){e.buffers.in.setFilter(i,t.name)})),t.results.forEach((function(t,i){e.buffers.out.setFilter(i,t.name)})),this.buffers.in.items.length=t.ingredients.length,this.buffers.out.items.length=t.ingredients.length,this.tags.push("ticking","crafting")},e}(g),b=function(t){function e(e,i,r){var n;return(n=t.call(this,e,i,r,"lab")||this).buffers.in=new a.a(n.inputs.length),n.buffers.max_in=5,n.inputs.forEach((function(t,e){return n.buffers.in.setFilter(e,t)})),n.research_timer=NaN,n.tags.push("ticking","lab"),n}m(e,t);var i=e.prototype;return i.deserialize=function(t){Object.assign(this,t)},i.serialize=function(){var t={};return t.name=this.name,t.type="lab",t.buffers={in:this.buffers.in.serialize(),upgrades:this.buffers.upgrades,max_in:this.buffers.max_in},t.research_timer=this.research_timer,t},i.canAdd=function(t){return 0!=this.inv.total(t)&&this.buffers.in.total(t)!=this.buffers.max_in},i.addPotion=function(t){if(this.canAdd(t)){var e=o.a.rounder.calc(this.buffers.in.total(t),this.buffers.max_in,this.inv.total(t));e-=this.inv.consume(t,e),this.buffers.in.add(t,e)}},i.tick_inXfer=function(t){InvXFer(t.fromParent.feed,this.buffers.in)},i.tick=function(t){o.a.tech.researching&&(Number.isNaN(this.research_timer)?this.nextUnit(o.a.tech.nextIngredients):++this.research_timer%o.a.tech.researching.cost.time==0&&(o.a.tech.increment_research(),this.research_timer=NaN),this.progress=this.research_timer/o.a.tech.researching.cost.time*100)},i.nextUnit=function(t){var e=this;t&&(t.every((function(t){var i=t[0],r=t[1];return e.buffers.in.total(i)>=r}))&&(t.forEach((function(t){var i=t[0],r=t[1];return e.buffers.in.consume(i,r)})),this.research_timer=0))},e}(g);r=Symbol.iterator;var v=function(){function t(t,e){void 0===e&&(e=!1),this.entities=[],this.entityTags=new s.a,this.mgr=o.a.entity,this.parent=t.parent||t,this.restricted=e}var e=t.prototype;return e[r]=function(){return this.entities},t.deserialize=function(e,i){var r,n=new t(e);if(i.restricted&&(n.restricted={},n.restricted.type=i.restricted.type,i.restricted.feed&&u.a.acquire(i.restricted.feed,(function(t){n.restricted.feed=t})),i.restricted.drain&&u.a.acquire(i.restricted.drain,(function(t){n.restricted.drain=t}))),i.setFn){var s,a=i.setFn.split(":"),f=a[0],c=a[1];s="resource"==f?o.a.res.resList[c]:o.a.rec.recipeList[c],n.setFn=s}return i.entities.forEach((function(t){r=o.a.entity.RestoreEntity(t,e.inv,n.entityTags),n.entities.push(r),n.setFn&&n.ApplyEntityFn(r)})),n},e.deserialize=function(t){for(var e,i=null,r=c(t.entities);!(e=r()).done;){var n=e.value;(i=this.mgr.RestoreEntity(n,this.parent.inv,this.entityTags)).parent=this.parent,this.entities.push(i)}},e.serialize=function(){var t={entities:[]};for(var e in this.restricted&&(t.restricted={type:this.restricted.type},this.restricted.feed&&(t.restricted.feed=this.restricted.feed.name+":"+this.restricted.feed.type),this.restricted.drain&&(t.restricted.drain=this.restricted.drain.name+":"+this.restricted.drain.type)),this.entities)t.entities[e]=this.entities[e].serialize();return this.setFn&&(t.setFn=this.setFn.type+":"+this.setFn.name),t},e.SetEntityFn=function(t){var e=this;if(this.restricted){if(this.setFn){if("crafting"==this.restricted.type){for(var i,r=c(this.setFn.results);!(i=r()).done;){var n=i.value;this.restricted.drain.removeFilter(n.name,!0)}for(var s,a=c(this.setFn.ingredients);!(s=a()).done;){var u=s.value;this.restricted.feed.removeFilter(u.name,!0)}}"mining"==this.restricted.type&&this.restricted.drain.removeFilter(this.setFn.mining_results,!0)}if(this.setFn=t,this.entities.forEach((function(t){return e.ApplyEntityFn(t)})),"crafting"==this.restricted.type){for(var o,f=c(this.setFn.results);!(o=f()).done;){var h=o.value;this.restricted.drain.addFilter(h.name)}for(var m,d=c(this.setFn.ingredients);!(m=d()).done;){var g=m.value;this.restricted.feed.addFilter(g.name)}}"mining"==this.restricted.type&&this.restricted.drain.addFilter(this.setFn.mining_results)}},e.ApplyEntityFn=function(t){this.restricted&&("crafting"!=this.restricted.type?"mining"==this.restricted.type&&t.set_mining(this.setFn):t.set_recipe(this.setFn))},e.AddEntity=function(t){if(!this.restricted||this.mgr.EntityType(t)==this.restricted.type){var e=this.mgr.GenerateEntity(t,this.parent.inv,this.entityTags);return e.parent=this.parent,this.entities.push(e),this.restricted&&this.setFn&&this.ApplyEntityFn(e),e}},e.recieveItem=function(t){for(var e,i,r,n,s=Math.floor(t.count/this.entities.length),a=t.count%this.entities.length,u=0,o=c(this.entities);!(r=o()).done;){var f=r.value;n=void 0,n=s,a>0&&n++&&a--,u+=n,e=n,i=f.buffers.in.add(t.name,e),u-=i}return u},e.tick=function(t){for(var e,i=c(t.entities.types);!(e=i()).done;){var r=e.value;this.entityTags.getSetValues("outputTicker",!0).forEach((function(e){return e.tick_outXfer(t)})),this.entityTags.getSetValues("ticking",r).forEach((function(e){e.tick(t)})),this.entityTags.getSetValues("inputTicker",!0).forEach((function(e){return e.tick_inXfer(t)}))}},t}()},uShe:function(t,e,i){"use strict";i.d(e,"a",(function(){return a}));var r=i("+Aae");function n(t,e,i,r,n,s,a){try{var u=t[s](a),o=u.value}catch(t){return void i(t)}u.done?e(o):Promise.resolve(o).then(r,n)}function s(t){return function(){var e=this,i=arguments;return new Promise((function(r,s){var a=t.apply(e,i);function u(t){n(a,r,s,u,o,"next",t)}function o(t){n(a,r,s,u,o,"throw",t)}u(void 0)}))}}var a={onLoadComplete:function(t){a.loadCb=t},beginLoad:function(){return s(regeneratorRuntime.mark((function t(){var e,i,n,s;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,r.a.idb.get("dataSet");case 2:if(e=t.sent){t.next=15;break}return t.next=6,fetch(location.href+"/data_source.json");case 6:return i=t.sent,t.next=9,i.json();case 9:return e=t.sent,console.log("loaded from file"),t.next=13,r.a.idb.set("dataSet",e);case 13:t.next=16;break;case 15:console.log("loaded from db");case 16:return t.next=18,r.a.idb.get("Icons");case 18:return(n=t.sent)&&(e.icons=n),t.next=22,r.a.idb.get("SaveGame");case 22:if(t.t0=t.sent,t.t0){t.next=25;break}t.t0=null;case 25:s=t.t0,a.init(e,s);case 27:case"end":return t.stop()}}),t)})))()},init:function(t,e){return s(regeneratorRuntime.mark((function i(){return regeneratorRuntime.wrap((function(i){for(;;)switch(i.prev=i.next){case 0:r.a.icon.import(t.icons),r.a.item.import(r.a.icon.restoreIcons(t.item)),r.a.res.import(r.a.icon.restoreIcons(t.resource)),r.a.rec.import(r.a.icon.restoreIcons(t.recipe),r.a.item),r.a.tech.import(r.a.icon.restoreIcons(t.technology),null==e?void 0:e.techs),r.a.entity.import(r.a.icon.restoreIcons(t.entity),r.a),a.loadCb({mgrs:r.a,save:e});case 7:case"end":return i.stop()}}),i)})))()},saveGame:function(t){t?r.a.idb.set("SaveGame",t):(r.a.idb.del("SaveGame"),window.location.reload())}}}}]);
//# sourceMappingURL=app~f075b844.5f5c1a276dbb95ef2d7b.bundle.map