(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{0:function(e,n,t){t("GAND"),t("GmYv"),e.exports=t("b9nV")},"0d46":function(e,n,t){"use strict";t.d(n,"b",(function(){return u})),t.d(n,"a",(function(){return f}));var a=t("+Aae");function r(e,n){var t;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(t=function(e,n){if(!e)return;if("string"==typeof e)return s(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return s(e,n)}(e))||n&&e&&"number"==typeof e.length){t&&(e=t);var a=0;return function(){return a>=e.length?{done:!0}:{done:!1,value:e[a++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return(t=e[Symbol.iterator]()).next.bind(t)}function s(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,a=new Array(n);t<n;t++)a[t]=e[t];return a}function o(e,n,t,a,r,s,o){try{var c=e[s](o),l=c.value}catch(e){return void t(e)}c.done?n(l):Promise.resolve(l).then(a,r)}var c,l,i={repo:{},sigs:{}},u={provide:function(e,n,t,a){i.repo[e]=n,t&&(i.sigs[e]=t),a&&(i.valids[e]=a)}},f={statics:{},issue:(c=regeneratorRuntime.mark((function e(n,t,s){var o,c,l,u,b,d,g,p,v,m,y,C,k,x,h,O,j,w;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(i.repo[n]){e.next=3;break}return console.warn("nothing for: "+n),e.abrupt("return");case 3:if(!i.sigs[n]){e.next=51;break}o={},c=[],debugIf(i,"caller_start"),l=0,u=Object.entries(i.sigs[n]);case 8:if(!(l<u.length)){e.next=43;break}b=u[l],d=b[0],g=b[1],!Array.isArray(g)&&(g=[g]),p=r(g);case 12:if((v=p()).done){e.next=40;break}if(C=v.value,o[d]||(o[d]={}),k=(null==t?void 0:t[d+"."+C])||(null==s||null==(m=s.CCC[d])?void 0:m[C])||(null==(y=f.statics[d])?void 0:y[C])){e.next=36;break}if("recipe"!=C){e.next=24;break}return e.next=20,a.a.DS.open("SelectX",{list:Object.values(a.a.rec.recipeList),type:C});case 20:k=e.sent,k=null==(x=k)||null==(h=x.item)?void 0:h.name,e.next=36;break;case 24:if("building"!=C){e.next=31;break}return e.next=27,a.a.DS.open("SelectX",{list:Object.values(a.a.entity.entity_cats.crafting),type:C});case 27:k=e.sent,k=null==(O=k)?void 0:O.item,e.next=36;break;case 31:if("factoryBus"!=C){e.next=36;break}return e.next=34,a.a.DS.open("SelectBus",{buses:a.a.baseApp.facBlocks.filter((function(e){return"bus"==e.type}))});case 34:k=e.sent,k=null==(j=k)||null==(w=j.selected)?void 0:w.name;case 36:debugIf(i,"caller_found"),k?(!o[d]&&(o[d]={}),o[d][C]=k):c.push(d+"."+C);case 38:e.next=12;break;case 40:l++,e.next=8;break;case 43:if(!(c.length>0)){e.next=48;break}return console.warn("missing args for "+n+": "),console.warn(c),e.abrupt("return");case 48:i.repo[n](o),e.next=52;break;case 51:i.repo[n](t,null==s?void 0:s.CCC);case 52:case"end":return e.stop()}}),e)})),l=function(){var e=this,n=arguments;return new Promise((function(t,a){var r=c.apply(e,n);function s(e){o(r,t,a,s,l,"next",e)}function l(e){o(r,t,a,s,l,"throw",e)}s(void 0)}))},function(e,n,t){return l.apply(this,arguments)}),provide:function(e,n,t,a){e.CCC||(e.CCC={}),e.CCC[n]||(e.CCC[n]={}),e.CCC[n][t]=a},staticProvide:function(e,n,t){f.statics[e]||(f.statics[e]={}),f.statics[e][n]=t}};window.CCC=i},"463H":function(e,n,t){"use strict";t.d(n,"d",(function(){return a})),t.d(n,"c",(function(){return r})),t.d(n,"a",(function(){return s})),t.d(n,"b",(function(){return o}));var a=30,r=60*a*5,s="0.02",o="08072021"},"6juG":function(e,n,t){"use strict";t.d(n,"b",(function(){return s})),t.d(n,"a",(function(){return o})),t.d(n,"c",(function(){return c}));var a=t("EVdn"),r=t.n(a),s={GameObjects:{tagged:{},base:{}},GameObjectFromPointer:function(e){var n=e.split("@"),t=n[0],a=n[1];return a?s.GameObjects.tagged[a][t]():s.GameObjects.base[e]()},SetModalBox:function(e){s.modalSelector=document.querySelector(e)}},o={AddGameObjectClass:function(e,n,t){var a=JSON.stringify(n);t.category?(s.GameObjects.tagged[t.category]||(s.GameObjects.tagged[t.category]={}),s.GameObjects.tagged[t.category][e]=function(){return JSON.parse(a)}):s.GameObjects.base[e]=function(){return JSON.parse(a)}}},c={signaler:null,error:function(e){r()("#ChameleonModal").show(),r()("#ChameleonMessage").removeClass().addClass("error").text(e),r()("#ChameleonButton").removeClass().addClass(["btn","btn-error"]).on("click",(function(){r()("#ChameleonModal").hide()}))},animsUpdate:function(){c.signaler.signal("animsUpdate")}}},BEPO:function(e){e.exports=JSON.parse('{"a":false,"b":false}')},"YX+J":function(e,n,t){"use strict";t.d(n,"a",(function(){return c}));var a=t("7jDb"),r=t("463H"),s=(t("/tIO"),t("8p7n")),o=void 0,c={new:function(){a.a.setGlobal({land:{total:100,used:0,complexity:0,res_patches:1,res_patch_used:0,fac_block_costs:{factory:100,bus:100,research:100}},scanning:{nextCost:100,currentCost:0},attackWaves:{nextTimer:100,nextStrength:100,currentTimer:0},facBlocks:{defenses:null,defenseBus:null,offense:null,offenseBus:null,buses:[],blocks:[]},player:new s.a.player(20),activeFeatures:[],version:r.a})},load:function(e){var n=e;n.player=s.a.player.deserialize(n.player),//! Hate this, need to reduce player to pure json with CephlaComm hooks
a.a.setGlobal(n)},save:function(e){console.log("constructing save"),e.set("SaveGame_Igor",a.a.globalObject),console.log("save complete")},setup:function(){a.a.defineObj("factoryBlocksBase","global.facBlocks"),a.a.defineObj("player","player"),a.a.addObjectTickFunction("FactoryBlocksBase",(function(e,n){l(e,n)}))}},l=function(e,n){var t,a,r,s;e.ticks%100||((null==n||null==(t=n.offenses)||null==(a=t.machines.radar)?void 0:a.count)&&(o.globals.scanning.currentCost+=1*n.offenses.machines.radar.count,o.globals.scanning.currentCost>=o.globals.scanning.nextCost&&(o.globals.scanning.currentCost-=o.globals.scanning.nextCost,o.globals.scanning.nextCost+=20,o.globals.land.total+=10,o.globals.land.res_patches=Math.floor(o.globals.land.total/100))),(null==n||null==(r=n.defenses)||null==(s=r.machines.turret)?void 0:s.count)&&(o.globals.attackWaves.currentTimer>o.globals.attackWaves.nextTimer?(o.globals.attackWaves.nextTimer=1.2^o.globals.attackWaves.nextTimer,o.globals.attackWaves.currentTime=0):o.globals.attackWaves.currentTimer++))}}}]);
//# sourceMappingURL=app~f075b844.6d6bedf35adefc482108.bundle.map