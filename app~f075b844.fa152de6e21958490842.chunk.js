(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{0:function(e,t,n){n("GAND"),n("GmYv"),e.exports=n("b9nV")},"0d46":function(e,t,n){"use strict";n.d(t,"b",(function(){return l})),n.d(t,"a",(function(){return f}));var r=n("+Aae");function a(e,t){var n;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return o(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return o(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0;return function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return(n=e[Symbol.iterator]()).next.bind(n)}function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function i(e,t,n,r,a,o,i){try{var s=e[o](i),c=s.value}catch(e){return void n(e)}s.done?t(c):Promise.resolve(c).then(r,a)}var s,c,u={repo:{},sigs:{}},l={provide:function(e,t,n,r){u.repo[e]=t,n&&(u.sigs[e]=n),r&&(u.valids[e]=r)}},f={statics:{},issue:(s=regeneratorRuntime.mark((function e(t,n,o){var i,s,c,l,d,b,p,m,v,g,C,y,h,x,k,w,O,S;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(u.repo[t]){e.next=3;break}return console.warn("nothing for: "+t),e.abrupt("return");case 3:if(!u.sigs[t]){e.next=50;break}i={},s=[],debugIf(u,"caller_start"),c=0,l=Object.entries(u.sigs[t]);case 8:if(!(c<l.length)){e.next=43;break}d=l[c],b=d[0],p=d[1],!Array.isArray(p)&&(p=[p]),m=a(p);case 12:if((v=m()).done){e.next=40;break}if(y=v.value,i[b]||(i[b]={}),h=(null==n?void 0:n[b+"."+y])||(null==o||null==(g=o.CCC[b])?void 0:g[y])||(null==(C=f.statics[b])?void 0:C[y])){e.next=36;break}if("recipe"!=y){e.next=24;break}return e.next=20,r.a.DS.open("SelectX",{list:Object.values(r.a.rec.recipeList),type:y});case 20:h=e.sent,h=null==(x=h)||null==(k=x.item)?void 0:k.name,e.next=36;break;case 24:if("building"!=y){e.next=31;break}return e.next=27,r.a.DS.open("SelectX",{list:Object.values(r.a.entity.entity_cats.crafting),type:y});case 27:h=e.sent,h=null==(w=h)?void 0:w.item,e.next=36;break;case 31:if("factoryBus"!=y){e.next=36;break}return e.next=34,r.a.DS.open("SelectBus",{buses:r.a.baseApp.facBlocks.filter((function(e){return"bus"==e.type}))});case 34:h=e.sent,h=null==(O=h)||null==(S=O.selected)?void 0:S.name;case 36:debugIf(u,"caller_found"),h?(!i[b]&&(i[b]={}),i[b][y]=h):s.push(b+"."+y);case 38:e.next=12;break;case 40:c++,e.next=8;break;case 43:if(!(s.length>0)){e.next=47;break}return console.warn("missing args for "+t+": "),console.warn(s),e.abrupt("return");case 47:u.repo[t](i),e.next=51;break;case 50:u.repo[t](n,null==o?void 0:o.CCC);case 51:case"end":return e.stop()}}),e)})),c=function(){var e=this,t=arguments;return new Promise((function(n,r){var a=s.apply(e,t);function o(e){i(a,n,r,o,c,"next",e)}function c(e){i(a,n,r,o,c,"throw",e)}o(void 0)}))},function(e,t,n){return c.apply(this,arguments)}),provide:function(e,t,n,r){e.CCC||(e.CCC={}),e.CCC[t]||(e.CCC[t]={}),e.CCC[t][n]=r},staticProvide:function(e,t,n){f.statics[e]||(f.statics[e]={}),f.statics[e][t]=n}};window.CCC=u},"463H":function(e,t,n){"use strict";n.d(t,"d",(function(){return r})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return o})),n.d(t,"b",(function(){return i}));var r=30,a=60*r*5,o="0.02",i="29052021"},"6juG":function(e,t,n){"use strict";n.d(t,"b",(function(){return o})),n.d(t,"a",(function(){return i})),n.d(t,"c",(function(){return s}));var r=n("EVdn"),a=n.n(r),o={GameObjects:{tagged:{},base:{}},GameObjectFromPointer:function(e){var t=e.split("@"),n=t[0],r=t[1];return r?o.GameObjects.tagged[r][n]():o.GameObjects.base[e]()},SetModalBox:function(e){o.modalSelector=document.querySelector(e)}},i={AddGameObjectClass:function(e,t,n){var r=JSON.stringify(t);n.category?(o.GameObjects.tagged[n.category]||(o.GameObjects.tagged[n.category]={}),o.GameObjects.tagged[n.category][e]=function(){return JSON.parse(r)}):o.GameObjects.base[e]=function(){return JSON.parse(r)}}},s={error:function(e){a()("#ChameleonModal").show(),a()("#ChameleonMessage").removeClass().addClass("error").text(e),a()("#ChameleonButton").removeClass().addClass(["btn","btn-error"]).on("click",(function(){a()("#ChameleonModal").hide()}))}}},BEPO:function(e){e.exports=JSON.parse('{"a":false,"b":false}')}}]);
//# sourceMappingURL=app~f075b844.fa152de6e21958490842.bundle.map