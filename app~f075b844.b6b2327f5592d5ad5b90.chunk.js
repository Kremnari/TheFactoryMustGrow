(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{0:function(e,t,n){n("GAND"),n("GmYv"),e.exports=n("b9nV")},"0d46":function(e,t,n){"use strict";n.d(t,"b",(function(){return l})),n.d(t,"a",(function(){return f}));var r=n("+Aae");function a(e,t){var n;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return o(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return o(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0;return function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return(n=e[Symbol.iterator]()).next.bind(n)}function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function i(e,t,n,r,a,o,i){try{var c=e[o](i),s=c.value}catch(e){return void n(e)}c.done?t(s):Promise.resolve(s).then(r,a)}var c,s,u={repo:{},sigs:{}},l={provide:function(e,t,n,r){u.repo[e]=t,n&&(u.sigs[e]=n),r&&(u.valids[e]=r)}},f={statics:{},issue:(c=regeneratorRuntime.mark((function e(t,n,o){var i,c,s,l,b,d,p,g,v,m,y,C,x,h,O,S,k,w;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(u.repo[t]){e.next=3;break}return console.warn("nothing for: "+t),e.abrupt("return");case 3:if(!u.sigs[t]){e.next=50;break}i={},c=[],debugIf(u,"caller_start"),s=0,l=Object.entries(u.sigs[t]);case 8:if(!(s<l.length)){e.next=43;break}b=l[s],d=b[0],p=b[1],!Array.isArray(p)&&(p=[p]),g=a(p);case 12:if((v=g()).done){e.next=40;break}if(C=v.value,i[d]||(i[d]={}),x=(null==n?void 0:n[d+"."+C])||(null==o||null==(m=o.CCC[d])?void 0:m[C])||(null==(y=f.statics[d])?void 0:y[C])){e.next=36;break}if("recipe"!=C){e.next=24;break}return e.next=20,r.a.DS.open("SelectX",{list:Object.values(r.a.rec.recipeList),type:C});case 20:x=e.sent,x=null==(h=x)||null==(O=h.item)?void 0:O.name,e.next=36;break;case 24:if("building"!=C){e.next=31;break}return e.next=27,r.a.DS.open("SelectX",{list:Object.values(r.a.entity.entity_cats.crafting),type:C});case 27:x=e.sent,x=null==(S=x)?void 0:S.item,e.next=36;break;case 31:if("factoryBus"!=C){e.next=36;break}return e.next=34,r.a.DS.open("SelectBus",{buses:r.a.baseApp.facBlocks.filter((function(e){return"bus"==e.type}))});case 34:x=e.sent,x=null==(k=x)||null==(w=k.selected)?void 0:w.name;case 36:debugIf(u,"caller_found"),x?(!i[d]&&(i[d]={}),i[d][C]=x):c.push(d+"."+C);case 38:e.next=12;break;case 40:s++,e.next=8;break;case 43:if(!(c.length>0)){e.next=47;break}return console.warn("missing args for "+t+": "),console.warn(c),e.abrupt("return");case 47:u.repo[t](i),e.next=51;break;case 50:u.repo[t](n,null==o?void 0:o.CCC);case 51:case"end":return e.stop()}}),e)})),s=function(){var e=this,t=arguments;return new Promise((function(n,r){var a=c.apply(e,t);function o(e){i(a,n,r,o,s,"next",e)}function s(e){i(a,n,r,o,s,"throw",e)}o(void 0)}))},function(e,t,n){return s.apply(this,arguments)}),provide:function(e,t,n,r){e.CCC||(e.CCC={}),e.CCC[t]||(e.CCC[t]={}),e.CCC[t][n]=r,console.log("caught: "+t+"_"+n)},staticProvide:function(e,t,n){f.statics[e]||(f.statics[e]={}),f.statics[e][t]=n}};window.CCC=u},"463H":function(e,t,n){"use strict";n.d(t,"d",(function(){return r})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return o})),n.d(t,"b",(function(){return i}));var r=30,a=60*r*5,o="0.02",i="29052021"},"6juG":function(e,t,n){"use strict";n.d(t,"b",(function(){return r})),n.d(t,"a",(function(){return a})),n.d(t,"c",(function(){return o}));var r={GameObjects:{tagged:{},base:{}},GameObjectFromPointer:function(e){var t=e.split("@"),n=t[0],a=t[1];return a?r.GameObjects.tagged[a][n]():r.GameObjects.base[e]()},SetModalBox:function(e){r.modalSelector=document.querySelector(e)}},a={AddGameObjectClass:function(e,t,n){var a=JSON.stringify(t);n.category?(r.GameObjects.tagged[n.category]||(r.GameObjects.tagged[n.category]={}),r.GameObjects.tagged[n.category][e]=function(){return JSON.parse(a)}):r.GameObjects.base[e]=function(){return JSON.parse(a)}}},o={error:function(e){}}},BEPO:function(e){e.exports=JSON.parse('{"a":false,"b":false}')}}]);
//# sourceMappingURL=app~f075b844.b6b2327f5592d5ad5b90.bundle.map