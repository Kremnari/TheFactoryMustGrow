(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{0:function(e,t,n){n("GAND"),n("GmYv"),e.exports=n("b9nV")},"0d46":function(e,t,n){"use strict";n.d(t,"b",(function(){return c})),n.d(t,"a",(function(){return l}));n("+Aae");function r(e,t){var n;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return a(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return a(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0;return function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return(n=e[Symbol.iterator]()).next.bind(n)}function a(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function i(e,t,n,r,a,i,s){try{var o=e[i](s),u=o.value}catch(e){return void n(e)}o.done?t(u):Promise.resolve(u).then(r,a)}var s,o,u={repo:{},sigs:{},valids:{},runner:null,utilityFns:{}},c={provide:function(e,t,n,r){u.repo[e]=t,n&&(u.sigs[e]=n),r&&(u.valids[e]=r)},setRunner:function(e){u.runner=e},utilityFn:function(e,t){u.utilityFns[e]=t},initialize:function(e){u.dialogSvc=e.dialogSvc,u.dataSet=e.dataSet}},l={statics:{},issue:(s=regeneratorRuntime.mark((function e(t,n,a){var i,s,o,c,f,d,m,b,v,p,g,w,y,C,h,x,S,k;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(u.repo[t]){e.next=3;break}return console.warn("nothing for: "+t),e.abrupt("return");case 3:if(!u.sigs[t]){e.next=69;break}i={},s=[],debugIf(u,"caller_start"),o=0,c=Object.entries(u.sigs[t]);case 8:if(!(o<c.length)){e.next=61;break}f=c[o],d=f[0],m=f[1],!Array.isArray(m)&&(m=[m]),b=r(m);case 12:if((v=b()).done){e.next=58;break}//! The above used to be condensed, but it negated possible nulls
if(C=v.value,h=void 0,void 0!==(null==n?void 0:n[d+"."+C])?h=null==n?void 0:n[d+"."+C]:(null==a||null==(p=a.CCC[d])?void 0:p[C])?h=null==a||null==(g=a.CCC[d])?void 0:g[C]:(null==(w=l.statics[d])?void 0:w[C])&&(h=null==(y=l.statics[d])?void 0:y[C]),void 0!==h){e.next=54;break}if(!n||!n["$_"+C+"Xlist"]){e.next=26;break}return e.next=20,u.dialogSvc.open("SelectX",{list:n["$_"+C+"Xlist"],type:C});case 20:if((h=e.sent)&&h.item){e.next=23;break}return e.abrupt("return");case 23:h=(null==(x=h.item)?void 0:x.name)||h.item,e.next=54;break;case 26:if("recipe"!=C){e.next=35;break}return e.next=29,u.dialogSvc.open("SelectX",{list:Object.values(u.dataSet.recipe),type:C});case 29:if(h=e.sent){e.next=32;break}return e.abrupt("return");case 32:h=null==(S=h.item)?void 0:S.name,e.next=54;break;case 35:if("building"!=C){e.next=44;break}return e.next=38,u.dialogSvc.open("SelectX",{list:Object.values(u.dataSet.entity).filter((function(e){return"crafter"==e.subType})),type:C});case 38:if(h=e.sent){e.next=41;break}return e.abrupt("return");case 41:h=h.item,e.next=54;break;case 44:if("factoryBus"!=C){e.next=53;break}return e.next=47,u.dialogSvc.open("SelectBus",{bus:["yikes"]});case 47:if(h=e.sent){e.next=50;break}return e.abrupt("return");case 50:h=null==(k=h.selected)?void 0:k.name,e.next=54;break;case 53:"string"==C&&(h=prompt("Enter "+d+":"));case 54:debugIf(u,"caller_found"),void 0!==h?(!i[d]&&(i[d]={}),i[d][C]=h):s.push(d+"."+C);case 56:e.next=12;break;case 58:o++,e.next=8;break;case 61:if(!(s.length>0)){e.next=66;break}return console.warn("missing args for "+t+": "),console.warn(s),e.abrupt("return");case 66:u.valids[t]&&u.valids[t](i,u.runner),u.repo[t](i,u.runner,u.repo[t]),e.next=70;break;case 69:u.repo[t](n,null==a?void 0:a.CCC);case 70:case"end":return e.stop()}}),e)})),o=function(){var e=this,t=arguments;return new Promise((function(n,r){var a=s.apply(e,t);function o(e){i(a,n,r,o,u,"next",e)}function u(e){i(a,n,r,o,u,"throw",e)}o(void 0)}))},function(e,t,n){return o.apply(this,arguments)}),provide:function(e,t,n,r){e.CCC||(e.CCC={}),e.CCC[t]||(e.CCC[t]={}),e.CCC[t][n]=r},utilityFn:function(e,t,n){var r={};return u.utilityFns[e](t,n,r,u.runner),"_result"in r?r._result:r},staticProvide:function(e,t,n){l.statics[e]||(l.statics[e]={}),l.statics[e][t]=n}};window.CCC=u},"463H":function(e,t,n){"use strict";n.d(t,"d",(function(){return r})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return i})),n.d(t,"b",(function(){return s}));var r=30,a=60*r*5,i="0.02",s="15102021"},"6juG":function(e,t,n){"use strict";n.d(t,"a",(function(){return s})),n.d(t,"b",(function(){return o}));var r=n("EVdn"),a=n.n(r),i={GameObjects:{tagged:{},base:{}},GameObjectFromPointer:function(e){var t=e.split("@"),n=t[0],r=t[1];return r?i.GameObjects.tagged[r][n]():i.GameObjects.base[e]()},SetModalBox:function(e){i.modalSelector=document.querySelector(e)},classFns:{},viewFns:{}},s={AddGameObjectClass:function(e,t,n){var r=JSON.stringify(t);n.category?(i.GameObjects.tagged[n.category]||(i.GameObjects.tagged[n.category]={}),i.GameObjects.tagged[n.category][e]=function(){return JSON.parse(r)}):i.GameObjects.base[e]=function(){return JSON.parse(r)}},setClassFn:function(e,t){i.classFns[e]=t},setViewFn:function(e,t){i.viewFns[e]=t},setViewFnGetter:function(e,t){Object.defineProperty(i.viewFns,e,{get:t})}},o={app:null,signal:null,toasts:[],toastTimer:NaN,error:function(e){a()("#ChameleonModal").show(),a()("#ChameleonMessage").removeClass().addClass("error").text(e),a()("#ChameleonButton").removeClass().addClass(["btn","btn-error"]).on("click",(function(){a()("#ChameleonModal").hide()}))},errorToast:function(e,t,n){void 0===n&&(n="fa-exclamation-triangle");var r={class:"danger-bg",msg:e,icon:t,fa:n,timer:200,_alert:o.showAlert};o.toasts.push(r),o.toastTimerSet()},warnToast:function(e,t,n){void 0===n&&(n="fa-exclamation");var r={class:"warning-bg",msg:e,icon:t,fa:n,timer:50,_alert:o.showAlert};o.toasts.push(r),o.toastTimerSet()},goodToast:function(e,t,n){void 0===n&&(n="fa-thumbs-up");var r={class:"primary-bg",msg:e,icon:t,fa:n,timer:200,_alert:o.showAlert};o.toasts.push(r),o.toastTimerSet()},toast:function(e,t,n){void 0===n&&(n="fa-question");var r={class:"light-bg"};r.msg=e,r.icon=t,r.fa=n,r.timer=100,r._alert=o.showAlert,o.toasts.push(r),o.toastTimerSet()},showAlert:function(e){alert(e.msg),o.clearToast(e)},clearToast:function(e){var t=o.toasts.findIndex((function(t){return t==e}));o.toasts.splice(t,1),window.clearInterval(o.toastTimer.timeout),o.toastTimer=null,o.toasts.length>0&&o.toastTimerSet()},toastTimerSet:function(){o.toastTimer||(o.toastTimer={ticks:0},o.toastTimer.timeout=window.setInterval((function(){o.toastTimer.ticks>=100?o.clearToast(o.toasts[0]):o.toastTimer.ticks+=1}),50*o.toasts[0].timer/100))},animsUpdate:function(e,t,n){e.animClass=t,e.animTime="animation-duration: "+n+"s",o.signaler.signal("animsUpdate")},clearShowing:function(){o.app.viewPane.showingItem=null},GameObjectFromPointer:i.GameObjectFromPointer,classFn:i.classFns,viewFn:i.viewFns}},BEPO:function(e){e.exports=JSON.parse('{"a":false,"b":false}')}}]);
//# sourceMappingURL=app~f075b844.9aab5ec08d7490b949c4.bundle.map