(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{0:function(e,n,t){t("GAND"),t("GmYv"),e.exports=t("b9nV")},"0d46":function(e,n,t){"use strict";t.d(n,"b",(function(){return u})),t.d(n,"a",(function(){return f}));var r=t("+Aae");function a(e,n){var t;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(t=function(e,n){if(!e)return;if("string"==typeof e)return s(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return s(e,n)}(e))||n&&e&&"number"==typeof e.length){t&&(e=t);var r=0;return function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return(t=e[Symbol.iterator]()).next.bind(t)}function s(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=new Array(n);t<n;t++)r[t]=e[t];return r}function o(e,n,t,r,a,s,o){try{var i=e[s](o),c=i.value}catch(e){return void t(e)}i.done?n(c):Promise.resolve(c).then(r,a)}var i,c,l={repo:{},sigs:{},runner:null,utilityFns:{}},u={provide:function(e,n,t,r){l.repo[e]=n,t&&(l.sigs[e]=t),r&&(l.valids[e]=r)},setRunner:function(e){l.runner=e},utilityFn:function(e,n){l.utilityFns[e]=n}},f={statics:{},issue:(i=regeneratorRuntime.mark((function e(n,t,s){var o,i,c,u,d,b,g,m,v,p,C,y,k,x,h,O,j,S,w,B;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(l.repo[n]){e.next=3;break}return console.warn("nothing for: "+n),e.abrupt("return");case 3:if(!l.sigs[n]){e.next=51;break}o={},i=[],debugIf(l,"caller_start"),c=0,u=Object.entries(l.sigs[n]);case 8:if(!(c<u.length)){e.next=43;break}d=u[c],b=d[0],g=d[1],!Array.isArray(g)&&(g=[g]),m=a(g);case 12:if((v=m()).done){e.next=40;break}//! The above used to be condensed, but it negated possible nulls
if(x=v.value,h=void 0,void 0!==(null==t?void 0:t[b+"."+x])?h=null==t?void 0:t[b+"."+x]:(null==s||null==(p=s.CCC[b])?void 0:p[x])?h=null==s||null==(C=s.CCC[b])?void 0:C[x]:(null==(y=f.statics[b])?void 0:y[x])&&(h=null==(k=f.statics[b])?void 0:k[x]),void 0!==h){e.next=36;break}if("recipe"!=x){e.next=24;break}return e.next=20,r.a.DS.open("SelectX",{list:Object.values(r.a.rec.recipeList),type:x});case 20:h=e.sent,h=null==(O=h)||null==(j=O.item)?void 0:j.name,e.next=36;break;case 24:if("building"!=x){e.next=31;break}return e.next=27,r.a.DS.open("SelectX",{list:Object.values(r.a.entity.entity_cats.crafting),type:x});case 27:h=e.sent,h=null==(S=h)?void 0:S.item,e.next=36;break;case 31:if("factoryBus"!=x){e.next=36;break}return e.next=34,r.a.DS.open("SelectBus",{buses:r.a.baseApp.facBlocks.filter((function(e){return"bus"==e.type}))});case 34:h=e.sent,h=null==(w=h)||null==(B=w.selected)?void 0:B.name;case 36:debugIf(l,"caller_found"),void 0!==h?(!o[b]&&(o[b]={}),o[b][x]=h):i.push(b+"."+x);case 38:e.next=12;break;case 40:c++,e.next=8;break;case 43:if(!(i.length>0)){e.next=48;break}return console.warn("missing args for "+n+": "),console.warn(i),e.abrupt("return");case 48:l.repo[n](o,l.runner,l.repo[n]),e.next=52;break;case 51:l.repo[n](t,null==s?void 0:s.CCC);case 52:case"end":return e.stop()}}),e)})),c=function(){var e=this,n=arguments;return new Promise((function(t,r){var a=i.apply(e,n);function s(e){o(a,t,r,s,c,"next",e)}function c(e){o(a,t,r,s,c,"throw",e)}s(void 0)}))},function(e,n,t){return c.apply(this,arguments)}),provide:function(e,n,t,r){e.CCC||(e.CCC={}),e.CCC[n]||(e.CCC[n]={}),e.CCC[n][t]=r},utilityFn:function(e,n,t){var r={};return l.utilityFns[e](n,t,r,l.runner),"_result"in r?r._result:r},staticProvide:function(e,n,t){f.statics[e]||(f.statics[e]={}),f.statics[e][n]=t}};window.CCC=l},"463H":function(e,n,t){"use strict";t.d(n,"d",(function(){return r})),t.d(n,"c",(function(){return a})),t.d(n,"a",(function(){return s})),t.d(n,"b",(function(){return o}));var r=30,a=60*r*5,s="0.02",o="08072021"},"6juG":function(e,n,t){"use strict";t.d(n,"a",(function(){return o})),t.d(n,"b",(function(){return i}));var r=t("EVdn"),a=t.n(r),s={GameObjects:{tagged:{},base:{}},GameObjectFromPointer:function(e){var n=e.split("@"),t=n[0],r=n[1];return r?s.GameObjects.tagged[r][t]():s.GameObjects.base[e]()},SetModalBox:function(e){s.modalSelector=document.querySelector(e)}},o={AddGameObjectClass:function(e,n,t){var r=JSON.stringify(n);t.category?(s.GameObjects.tagged[t.category]||(s.GameObjects.tagged[t.category]={}),s.GameObjects.tagged[t.category][e]=function(){return JSON.parse(r)}):s.GameObjects.base[e]=function(){return JSON.parse(r)}}},i={signaler:null,error:function(e){a()("#ChameleonModal").show(),a()("#ChameleonMessage").removeClass().addClass("error").text(e),a()("#ChameleonButton").removeClass().addClass(["btn","btn-error"]).on("click",(function(){a()("#ChameleonModal").hide()}))},animsUpdate:function(e,n,t){e.animClass=n,e.animTime="animation-duration: "+t+"s",i.signaler.signal("animsUpdate")},GameObjectFromPointer:s.GameObjectFromPointer}},BEPO:function(e){e.exports=JSON.parse('{"a":false,"b":false}')},"YX+J":function(e,n,t){"use strict";t.d(n,"a",(function(){return c}));var r=t("7jDb"),a=t("463H"),s=t("aSpa"),o=(t("JNnP"),void 0),i={land:{total:100,used:0,complexity:0,res_patches:1,res_patch_used:0,fac_block_costs:{factory:100,bus:100,research:100}},scanning:{nextCost:100,currentCost:0},attackWaves:{nextTimer:100,nextStrength:100,currentTimer:0},facBlocks:{defenses:null,defenseBus:null,offense:null,offenseBus:null,buses:[],blocks:[]},player:s.a,activeFeatures:[],version:a.a},c=function(){r.a.defineObj("#",i),r.a.defineObj("#.facBlocks","factoryBlocksBase"),r.a.defineObj("player","player"),r.a.defineObj(),r.a.amendObject("FactoryBlocksBase",{tickFn:function(e,n){l(e,n)}}),console.log("setup complete")},l=function(e,n){var t,r,a,s;e.ticks%100||((null==n||null==(t=n.offenses)||null==(r=t.machines.radar)?void 0:r.count)&&(o.globals.scanning.currentCost+=1*n.offenses.machines.radar.count,o.globals.scanning.currentCost>=o.globals.scanning.nextCost&&(o.globals.scanning.currentCost-=o.globals.scanning.nextCost,o.globals.scanning.nextCost+=20,o.globals.land.total+=10,o.globals.land.res_patches=Math.floor(o.globals.land.total/100))),(null==n||null==(a=n.defenses)||null==(s=a.machines.turret)?void 0:s.count)&&(o.globals.attackWaves.currentTimer>o.globals.attackWaves.nextTimer?(o.globals.attackWaves.nextTimer=1.2^o.globals.attackWaves.nextTimer,o.globals.attackWaves.currentTime=0):o.globals.attackWaves.currentTimer++))}}}]);
//# sourceMappingURL=app~f075b844.e0ee6dd1dac20486314e.bundle.map