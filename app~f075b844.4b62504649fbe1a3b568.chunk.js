(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{0:function(e,t,n){n("GAND"),n("GmYv"),e.exports=n("b9nV")},"0d46":function(e,t,n){"use strict";n.d(t,"b",(function(){return u})),n.d(t,"a",(function(){return l}));n("+Aae");function r(e,t){var n;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return i(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return i(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0;return function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return(n=e[Symbol.iterator]()).next.bind(n)}function i(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function a(e,t,n,r,i,a,o){try{var s=e[a](o),c=s.value}catch(e){return void n(e)}s.done?t(c):Promise.resolve(c).then(r,i)}var o,s,c={repo:{},sigs:{},valids:{},runner:null,utilityFns:{}},u={provide:function(e,t,n,r){c.repo[e]=t,n&&(c.sigs[e]=n),r&&(c.valids[e]=r)},setRunner:function(e){c.runner=e},utilityFn:function(e,t){c.utilityFns[e]=t},initialize:function(e){c.dialogSvc=e.dialogSvc,c.dataSet=e.dataSet,c.viewer=e.viewer}},l={statics:{},issue:(o=regeneratorRuntime.mark((function e(t,n,i){var a,o,s,u,f,d,p,b,v,m,g,w,h,y,x,C,k,S,O,F,j,T,A,G,P,_,$;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(c.repo[t]){e.next=3;break}return console.warn("nothing for: "+t),e.abrupt("return");case 3:if(!c.sigs[t]){e.next=87;break}a={},o=[],debugIf(c,"caller_start"),s=0,u=Object.entries(c.sigs[t]);case 8:if(!(s<u.length)){e.next=77;break}f=u[s],d=f[0],p=f[1],b={},d.indexOf(".")>-1&&(
//! For some bizarre reason, destructuring wasn't working here
v=d.split("."),b=p,p=v[1],d=v[0]),!Array.isArray(p)&&(p=[p]),m=r(p);case 14:if((g=m()).done){e.next=74;break}//! The above used to be condensed, but it negated possible nulls
if(k=g.value,S=void 0,n&&void 0!==n[d+"."+k]?
//! Weirdness, chrome stopped accepting the shorthand of this if
S=n[d+"."+k]:(null==i||null==(w=i.CCC)||null==(h=w[d])?void 0:h[k])?S=i.CCC[d][k]:(null==(y=l.statics[d])?void 0:y[k])&&(S=null==(x=l.statics[d])?void 0:x[k]),void 0!==S){e.next=70;break}if(!n||!n[k+".dialog"]){e.next=28;break}return e.next=22,c.dialogSvc.open("SelectX",c.utilityFns[k](n[k+".dialog"],c.runner),k);case 22:if((S=e.sent)&&(S.item||(null==(O=b)?void 0:O.optional))){e.next=25;break}return e.abrupt("return");case 25:S=S.item,e.next=70;break;case 28:if(!n||!n["$_"+k+"Xlist"]){e.next=37;break}return e.next=31,c.dialogSvc.open("SelectX",{list:n["$_"+k+"Xlist"],type:k});case 31:if((S=e.sent)&&(S.item||(null==(F=b)?void 0:F.optional))){e.next=34;break}return e.abrupt("return");case 34:S=(null==(j=S.item)?void 0:j.name)||S.item,e.next=70;break;case 37:if("recipe"!=k){e.next=46;break}return e.next=40,c.dialogSvc.open("SelectX",{list:Object.values(c.dataSet.recipe),type:k});case 40:if((S=e.sent)||(null==(T=b)?void 0:T.optional)){e.next=43;break}return e.abrupt("return");case 43:S=null==(A=S.item)?void 0:A.name,e.next=70;break;case 46:if("building"!=k){e.next=55;break}return e.next=49,c.dialogSvc.open("SelectX",{list:Object.values(c.dataSet.entity).filter((function(e){return"crafter"==e.subType})),type:k});case 49:if((S=e.sent)||(null==(G=b)?void 0:G.optional)){e.next=52;break}return e.abrupt("return");case 52:S=S.item,e.next=70;break;case 55:if("string"!=k){e.next=62;break}if(S=prompt("Enter "+d+":"),c.viewer.unset({which:"tooltip"}),S||(null==(P=b)?void 0:P.optional)){e.next=60;break}return e.abrupt("return");case 60:e.next=70;break;case 62:if("icon"!=k){e.next=70;break}return $=Object.keys(c.dataSet.item),e.next=66,c.dialogSvc.open("SelectX",{list:$,type:"icon"});case 66:if((S=e.sent)||(null==(_=b)?void 0:_.optional)){e.next=69;break}return e.abrupt("return");case 69:S=S.item;case 70:debugIf(c,"caller_found"),void 0!==S?(!a[d]&&(a[d]={}),a[d][k]=S):(null==(C=b)?void 0:C.optional)||o.push(d+"."+k);case 72:e.next=14;break;case 74:s++,e.next=8;break;case 77:if(!(o.length>0)){e.next=82;break}return console.warn("missing args for "+t+": "),console.warn(o),e.abrupt("return");case 82:if(!c.valids[t]||c.valids[t](a,c.runner)){e.next=84;break}return e.abrupt("return",console.log(t+" failed validator"));case 84:c.repo[t](a,c.runner,c.repo[t]),e.next=88;break;case 87:c.repo[t](n,null==i?void 0:i.CCC);case 88:case"end":return e.stop()}}),e)})),s=function(){var e=this,t=arguments;return new Promise((function(n,r){var i=o.apply(e,t);function s(e){a(i,n,r,s,c,"next",e)}function c(e){a(i,n,r,s,c,"throw",e)}s(void 0)}))},function(e,t,n){return s.apply(this,arguments)}),provide:function(e,t,n,r){e.CCC||(e.CCC={}),e.CCC[t]||(e.CCC[t]={}),e.CCC[t][n]=r},utilityFn:function(e,t,n){var r={};return c.utilityFns[e](t,n,r,c.runner),"_result"in r?r._result:r},staticProvide:function(e,t,n){l.statics[e]||(l.statics[e]={}),l.statics[e][t]=n}};window.CCC=c},"463H":function(e,t,n){"use strict";n.d(t,"e",(function(){return r})),n.d(t,"d",(function(){return i})),n.d(t,"a",(function(){return a})),n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return s}));var r=30,i=60*r*5,a="0.03",o="20211201",s="20211201"},"6juG":function(e,t,n){"use strict";n.d(t,"a",(function(){return o})),n.d(t,"c",(function(){return s})),n.d(t,"b",(function(){return c}));var r=n("EVdn"),i=n.n(r),a={GameObjects:{tagged:{},base:{}},GameObjectFromPointer:function(e){console.warn("GOFP");var t=e.split("@"),n=t[0],r=t[1];return r?a.GameObjects.tagged[r][n]():a.GameObjects.base[e]()},SetModalBox:function(e){a.modalSelector=document.querySelector(e)},classFns:{},viewFns:{},signaler:null,baseApp:null,viewControl:{},viewScope:{},viewOptions:{},viewFilters:{}};window.chame=a;var o={signaler:a.signaler,app:a.baseApp,AddGameObjectClass:function(e,t,n){var r=JSON.stringify(t);n.category?(a.GameObjects.tagged[n.category]||(a.GameObjects.tagged[n.category]={}),a.GameObjects.tagged[n.category][e]=function(){return JSON.parse(r)}):a.GameObjects.base[e]=function(){return JSON.parse(r)}},setClassFn:function(e,t){a.classFns[e]=t},setViewFn:function(e,t){a.viewFns[e]=t},setViewFnGetter:function(e,t){Object.defineProperty(a.viewFns,e,{get:t})}};Object.defineProperty(o,"app",{set:function(e){a.app=e}}),Object.defineProperty(o,"signaler",{set:function(e){a.signaler=e}});var s={ctrl:a.viewControl,options:a.viewOptions,filters:a.viewFilters,$scope:a.viewScope,toasts:[],toastTimer:0,set:function(e){if((!e.hasOwnProperty("if")||e.if)&&(!e.$double||!s.__checkDouble(e)))switch(e.type){case"view":a.viewControl[e.which]=e.what;break;case"scope":a.viewScope[e.which]=e.what,"tooltip"==e.which&&(a.viewControl.statusBox="tooltip")}},__checkDouble:function(e){var t,n;return s.$double&&s.$double.type==e.type&&s.$double.which==e.which&&(null==(t=s.$double.what)?void 0:t.$_id)==(null==(n=e.what)?void 0:n.$_id)?(s.set(e.$double),!0):(s.$double=e,!1)},unset:function(e){switch(e.which){case"tooltip":a.viewScope.tooltip=null,a.viewControl.statusBox="statusBox";break;case"showingEntity":a.viewScope.showingEntity=null;break;case"showingBlock":a.viewScope.showingBlock=null}}};Object.defineProperty(s,"Fn",{get:function(){return a.viewFns}}),Object.defineProperty(s,"classFn",{get:function(){return a.classFns}});var c={error:function(e){i()("#ChameleonModal").show(),i()("#ChameleonMessage").removeClass().addClass("error").text(e),i()("#ChameleonButton").removeClass().addClass(["btn","btn-error"]).on("click",(function(){i()("#ChameleonModal").hide()}))},errorToast:function(e,t,n){void 0===n&&(n="fa-exclamation-triangle");var r={class:"danger-bg",msg:e,icon:t,fa:n,timer:400,_alert:c.showAlert};s.toasts.push(r),s.toastTimerSet()},warnToast:function(e,t,n){void 0===n&&(n="fa-exclamation");var r={class:"warning-bg",msg:e,icon:t,fa:n,timer:100,_alert:c.showAlert};s.toasts.push(r),c.toastTimerSet()},goodToast:function(e,t,n){void 0===n&&(n="fa-thumbs-up");var r={class:"primary-bg",msg:e,icon:t,fa:n,timer:400,_alert:c.showAlert};s.toasts.push(r),c.toastTimerSet()},toast:function(e,t,n){void 0===n&&(n="fa-question");var r={class:"light-bg"};r.msg=e,r.icon=t,r.fa=n,r.timer=200,r._alert=c.showAlert,s.toasts.push(r),c.toastTimerSet()},showAlert:function(e){alert(e.msg),c.clearToast(e)},clearToast:function(e){var t=s.toasts.findIndex((function(t){return t==e}));s.toasts.splice(t,1),window.clearInterval(s.toastTimer.timeout),s.toastTimer=null,s.toasts.length>0&&c.toastTimerSet()},toastTimerSet:function(){s.toastTimer||(s.toastTimer={ticks:0},s.toastTimer.timeout=window.setInterval((function(){s.toastTimer.ticks>=100?c.clearToast(s.toasts[0]):s.toastTimer.ticks+=1}),50*s.toasts[0].timer/100))},animsUpdate:function(e,t,n){e.animClass=t,e.animTime="animation-duration: "+n+"s",c.signaler.signal("animsUpdate")},clearShowing:function(){s.unset({which:"showingEntity"}),s.unset({which:"showingBlock"})},GameObjectFromPointer:a.GameObjectFromPointer,classFn:a.classFns,viewFn:a.viewFns};Object.defineProperty(c,"app",{get:function(){return a.baseApp}}),Object.defineProperty(c,"signaler",{get:function(){return a.signaler}})},BEPO:function(e){e.exports=JSON.parse('{"a":false,"b":false}')}}]);
//# sourceMappingURL=app~f075b844.4b62504649fbe1a3b568.bundle.map