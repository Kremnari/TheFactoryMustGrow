(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{EfK0:function(t,e,n){"use strict";n.d(e,"c",(function(){return o})),n.d(e,"b",(function(){return c})),n.d(e,"a",(function(){return m}));var i=n("+Aae"),r=n("wb4v");function a(t,e){var n;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(n=function(t,e){if(!t)return;if("string"==typeof t)return s(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return s(t,e)}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var i=0;return function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return(n=t[Symbol.iterator]()).next.bind(n)}function s(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,i=new Array(e);n<e;n++)i[n]=t[n];return i}globalThis.InvXFer=r.a;var o=function(){function t(){this.itemList={}}var e=t.prototype;return e.import=function(t){var e=this;Object.entries(t).forEach((function(t){var n=t[0],i=t[1],r=new u(i);e.itemList[n]=r}))},e.get=function(t){return this.itemList[t]},e.incrementX=function(t){return++this.itemList[t].count},e.addNotifyX=function(t,e){var n;null==(n=this.itemList[t])||n.notifys.push(e)},t}(),u=function(t,e){this.isVisible=!1,this.isCraftable=!1,this.entity=!1,this.notifys=[],this.set_count_callbacks=["ItemNotifys"],Object.assign(this,t)},c=function(){function t(t,e,n){void 0===n&&(n=!1),"string"==typeof t&&(this.name=t),"Object"==typeof t&&(this.name=t.name,this.item=t),this.count=e,this.filtered=n}return t.convert=function(e){return e.count?e:new t(e.name||e.item,e.amount)},t}(),m=function(){function t(t,e){void 0===t&&(t=0),this.items=Array.isArray(t)?t:new Array(t),this.max_stack=e,this.itemMgr=i.a.item,this.recMgr=i.a.rec,this.signaler=i.a.signaler}var e=t.prototype;return e.serialize=function(){return{items:this.items,max_stack:this.max_stack}},t.deserialize=function(e){return new t(e.items,e.max_stack)},e.deserialize=function(t){this.items=t.items,this.max_stack=t.max_stack},e[Symbol.iterator]=function(){return this.items},e.addAll=function(t,e,n){void 0===e&&(e=!0),void 0===n&&(n=1),Array.isArray(t)||(t=[t]);for(var i,r=[],s=0,o=a(t);!(i=o()).done;){var u=i.value;(s=this.add(u.item||u.name,(u.amount||u.count)*n))>0&&r.push(new c(u.name||u.item,s))}if(e)return r},e.addAllOrFail=function(t){for(
//! assume itemStacks is array
var e,n,i=[],r=0,s=!1,o=a(t);!(n=o()).done;){var u=n.value;if(e=c.convert(u),(r=this.add(e.name,e.count))>0){s=!0,e.count-=r,i.push(e);break}i.push(e)}if(s){for(var m,f=a(i);!(m=f()).done;){var h=m.value;this.consume(h.name,h.count)}return!1}return!0},e.consumeAll=function(t,e,n){void 0===e&&(e=!0),void 0===n&&(n=1),Array.isArray(t)||(t=[t]);for(var i,r=[],s=a(t);!(i=s()).done;){var o=i.value,u=c.convert(o);if(0===this.consume(u.name,u.count*n))r.push(u);else if(e)return r.length>=1&&this.addAll(r,!1,n),t}return!!e||[]},e.absorbFrom=function(t,e){for(var n,r=a(t.items);!(n=r()).done;){var s=n.value;if(s){var o;e&&s.name!=e||0!=s.count&&(o=this.add(s.name,s.count),t.consume(s.name,s.count-o))}}i.a.signaler.signal("generalUpdate")},e.setFilter=function(t,e,n){if(void 0===n&&(n=i.a.baseApp.player),t>this.items.length)return!1;var r=new c(e,0,!0);if(this.items[t])if(this.items[t].name==e)this.items[t].filtered=!0;else{var a=this.items[t];this.items.splice(t,1,r),n.inv.addAll(a,!1)}else this.items.splice(t,1,r);return!0},e.addFilter=function(t,e){void 0===e&&(e=i.a.baseApp.player);for(var n,r=a(this.items.entries());!(n=r()).done;){var s=n.value,o=s[0],u=s[1];if(!u)return this.items.splice(o,1,new c(t,0,!0)),!0;if(!(u.filtered||u.name!=t&&u.name))return u.filtered=!0,u.name=t,!0}return!1},e.seeFilteredItems=function(){var t=[];return this.items.forEach((function(e){return e.filtered&&t.push(e.name)})),t},e.removeFilter=function(t,e,n){void 0===n&&(n=i.a.baseApp.player);for(var r,s=a(this.items);!(r=s()).done;){var o=r.value;if(o.filtered&&o.name==t)return o.filtered=!1,e&&n.inv.addAll(o),0==o.count&&(o.name=void 0),!0}return!1},e.getTypes=function(t){void 0===t&&(t=!0);for(var e,n=[],i=a(this.items);!(e=i()).done;){var r=e.value;r&&!n.includes(r.name)&&(t||!t&&r.count>0)&&n.push(r.name)}return n},e.total=function(t,e){return void 0===e&&(e=!1),this.items.reduce((function(e,n){return n&&n.name==t?e+n.count:e}),0)},e.addStack=function(t){return 0==t.count?0:t.count-this.add(t.name,t.count)},e.add=function(t,e){if(0!=e){var n=this.max_stack||this.itemMgr.get(t).stack_size,i=this._GetAddStack(t,n);if(!i)return e;var r=Math.min(n-i.count,e);return i.count+=r,e-r>0?this.add(t,e-r):0}},e.consume=function(t,e){var n=this._GetSubStack(t,!1);return n?n.count>=e&&(n.count-=e,0):e},e._GetAddStack=function(t,e){for(var n=-1,i=0,r=[function(n){return n&&n.name==t&&n.count<e},function(t){return t&&0==t.count},function(t){return!t}];i<r.length;i++){var a,s=r[i];if((n=this.items.findIndex(s))>-1&&(!(null==(a=this.items[n])?void 0:a.filtered)||this.items[n].name==t))break}return n>-1&&(!this.items[n]||this.items[n].name!=t)&&this.items.splice(n,1,{name:t,count:0}),this.items[n]},e._GetSubStack=function(t,e){void 0===e&&(e=!0);var n=this.items.length-1-this.items.slice().reverse().findIndex((function(e){return e&&e.name==t}));return e?n:this.items[n]},e.click=function(t){switch(t.what){case"use":var e=t.which.item||this.itemMgr.get(t.which.name);if(t.which.count>0&&e.hasEntity)return t.where.useItem(t.which.name)&&t.which.count--,void this.signaler.signal("addedEntity");break;case"move":var n=t.rounder.val,i=t.where.inv.consume(t.which.name,n),r=t.who.inv.add(t.which.name,n-i);t.where.inv.add(t.which.name,r)}},t}()},mUjK:function(t,e,n){"use strict";n.d(e,"a",(function(){return i}));var i=function(){function t(){this.iconList={}}var e=t.prototype;return e.import=function(t){this.iconList=t;for(var e=0,n=Object.entries(this.iconList.tool);e<n.length;e++){var i=n[e],r=i[0],a=i[1];this.iconList.item[r]=a}},e.getSrc=function(t,e){var n;if(!t)return"";if(t.indexOf("@")>-1&&!e){var i=t.split("@");t=i[0],e=i[1]}return(null==(n=this.iconList[t])?void 0:n[e])?this.iconList[t][e]:null},e.restoreIcons=function(t){var e=this;return Object.values(t).forEach((function(t){var n;if(t.icon){var i=t.icon.split("@"),r=i[0],a=i[1];t.icon=(null==(n=e.iconList[r])?void 0:n[a])||e.iconList.item[a]}})),t},t}()}}]);
//# sourceMappingURL=app~62866266.e98e5049ed2841c43862.bundle.map