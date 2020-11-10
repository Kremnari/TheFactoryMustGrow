(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{"aurelia-animator-css":function(e,t,n){"use strict";n.r(t),n.d(t,"CssAnimator",(function(){return r})),n.d(t,"configure",(function(){return o}));var i=n("hij8"),a=n("70NS"),r=function(){function e(){this.useAnimationDoneClasses=!1,this.animationEnteredClass="au-entered",this.animationLeftClass="au-left",this.isAnimating=!1,this.verifyKeyframesExist=!0}return e.prototype._addMultipleEventListener=function(e,t,n){for(var i=t.split(" "),a=0,r=i.length;a<r;++a)e.addEventListener(i[a],n,!1)},e.prototype._removeMultipleEventListener=function(e,t,n){for(var i=t.split(" "),a=0,r=i.length;a<r;++a)e.removeEventListener(i[a],n,!1)},e.prototype._getElementAnimationDelay=function(e){var t=a.b.getComputedStyle(e),n=void 0,i=void 0;if(t.getPropertyValue("animation-delay"))n="animation-delay";else if(t.getPropertyValue("-webkit-animation-delay"))n="-webkit-animation-delay";else{if(!t.getPropertyValue("-moz-animation-delay"))return 0;n="-moz-animation-delay"}return i=t.getPropertyValue(n),1e3*(i=Number(i.replace(/[^\d\.]/g,"")))},e.prototype._getElementAnimationNames=function(e){var t=a.b.getComputedStyle(e),n=void 0;if(t.getPropertyValue("animation-name"))n="";else if(t.getPropertyValue("-webkit-animation-name"))n="-webkit-";else{if(!t.getPropertyValue("-moz-animation-name"))return[];n="-moz-"}var i=t.getPropertyValue(n+"animation-name");return i?i.split(" "):[]},e.prototype._performSingleAnimate=function(e,t){var n=this;return this._triggerDOMEvent(i.q.animateBegin,e),this.addClass(e,t,!0).then((function(a){return n._triggerDOMEvent(i.q.animateActive,e),!1!==a&&n.removeClass(e,t,!0).then((function(){n._triggerDOMEvent(i.q.animateDone,e)}))})).catch((function(){n._triggerDOMEvent(i.q.animateTimeout,e)}))},e.prototype._triggerDOMEvent=function(e,t){var n=a.b.createCustomEvent(e,{bubbles:!0,cancelable:!0,detail:t});a.b.dispatchEvent(n)},e.prototype._animationChangeWithValidKeyframe=function(e,t){var n=e.filter((function(e){return-1===t.indexOf(e)}));if(0===n.length)return!1;if(!this.verifyKeyframesExist)return!0;var i=window.CSSRule.KEYFRAMES_RULE||window.CSSRule.MOZ_KEYFRAMES_RULE||window.CSSRule.WEBKIT_KEYFRAMES_RULE,a=document.styleSheets;try{for(var r=0;r<a.length;++r){var o=null;try{o=a[r].cssRules}catch(e){}if(o)for(var s=0;s<o.length;++s){var m=o[s];if(m.type===i&&-1!==n.indexOf(m.name))return!0}}}catch(e){}return!1},e.prototype.animate=function(e,t){var n=this;return Array.isArray(e)?Promise.all(e.map((function(e){return n._performSingleAnimate(e,t)}))):this._performSingleAnimate(e,t)},e.prototype.runSequence=function(e){var t=this;return this._triggerDOMEvent(i.q.sequenceBegin,null),e.reduce((function(e,n){return e.then((function(){return t.animate(n.element,n.className)}))}),Promise.resolve(!0)).then((function(){t._triggerDOMEvent(i.q.sequenceDone,null)}))},e.prototype._stateAnim=function(e,t,n){var a=this,r="au-"+t,o=r+"-active";return new Promise((function(s,m){var v=e.classList;a._triggerDOMEvent(i.q[t+"Begin"],e),a.useAnimationDoneClasses&&(v.remove(a.animationEnteredClass),v.remove(a.animationLeftClass)),v.add(r);var l=a._getElementAnimationNames(e),u=void 0,g=!1;a._addMultipleEventListener(e,"webkitAnimationStart animationstart",u=function(n){n.target===e&&(g=!0,a.isAnimating=!0,a._triggerDOMEvent(i.q[t+"Active"],e),n.stopPropagation(),n.target.removeEventListener(n.type,u))},!1);var d=void 0;a._addMultipleEventListener(e,"webkitAnimationEnd animationend",d=function(m){g&&m.target===e&&(m.stopPropagation(),v.remove(o),v.remove(r),m.target.removeEventListener(m.type,d),a.useAnimationDoneClasses&&null!=n&&v.add(n),a.isAnimating=!1,a._triggerDOMEvent(i.q[t+"Done"],e),s(!0))},!1);var p=e.parentElement,c="data-animator-pending"+t,f=function(){var n=a._getElementAnimationNames(e);a._animationChangeWithValidKeyframe(n,l)||(v.remove(o),v.remove(r),a._removeMultipleEventListener(e,"webkitAnimationEnd animationend",d),a._removeMultipleEventListener(e,"webkitAnimationStart animationstart",u),a._triggerDOMEvent(i.q[t+"Timeout"],e),s(!1)),p&&p.setAttribute(c,+(p.getAttribute(c)||1)-1)};if(null!=p&&(p.classList.contains("au-stagger")||p.classList.contains("au-stagger-"+t))){var E=+(p.getAttribute(c)||0);p.setAttribute(c,E+1);var _=a._getElementAnimationDelay(p)*E;a._triggerDOMEvent(i.q.staggerNext,e),setTimeout((function(){v.add(o),f()}),_)}else v.add(o),f()}))},e.prototype.enter=function(e){return this._stateAnim(e,"enter",this.animationEnteredClass)},e.prototype.leave=function(e){return this._stateAnim(e,"leave",this.animationLeftClass)},e.prototype.removeClass=function(e,t){var n=this,a=!(arguments.length<=2||void 0===arguments[2])&&arguments[2];return new Promise((function(r,o){var s=e.classList;if(s.contains(t)||s.contains(t+"-add")){!0!==a&&n._triggerDOMEvent(i.q.removeClassBegin,e),s.contains(t+"-add")&&(s.remove(t+"-add"),s.add(t)),s.remove(t);var m=n._getElementAnimationNames(e),v=void 0,l=!1;n._addMultipleEventListener(e,"webkitAnimationStart animationstart",v=function(t){t.target===e&&(l=!0,n.isAnimating=!0,!0!==a&&n._triggerDOMEvent(i.q.removeClassActive,e),t.stopPropagation(),t.target.removeEventListener(t.type,v))},!1);var u=void 0;n._addMultipleEventListener(e,"webkitAnimationEnd animationend",u=function(o){l&&o.target===e&&(e.classList.contains(t+"-remove")||r(!0),o.stopPropagation(),s.remove(t),s.remove(t+"-remove"),o.target.removeEventListener(o.type,u),n.isAnimating=!1,!0!==a&&n._triggerDOMEvent(i.q.removeClassDone,e),r(!0))},!1),s.add(t+"-remove");var g=n._getElementAnimationNames(e);n._animationChangeWithValidKeyframe(g,m)||(s.remove(t+"-remove"),s.remove(t),n._removeMultipleEventListener(e,"webkitAnimationEnd animationend",u),n._removeMultipleEventListener(e,"webkitAnimationStart animationstart",v),!0!==a&&n._triggerDOMEvent(i.q.removeClassTimeout,e),r(!1))}else r(!1)}))},e.prototype.addClass=function(e,t){var n=this,a=!(arguments.length<=2||void 0===arguments[2])&&arguments[2];return new Promise((function(r,o){var s=e.classList;!0!==a&&n._triggerDOMEvent(i.q.addClassBegin,e),s.contains(t+"-remove")&&(s.remove(t+"-remove"),s.remove(t));var m=void 0,v=!1;n._addMultipleEventListener(e,"webkitAnimationStart animationstart",m=function(t){t.target===e&&(v=!0,n.isAnimating=!0,!0!==a&&n._triggerDOMEvent(i.q.addClassActive,e),t.stopPropagation(),t.target.removeEventListener(t.type,m))},!1);var l=void 0;n._addMultipleEventListener(e,"webkitAnimationEnd animationend",l=function(o){v&&o.target===e&&(e.classList.contains(t+"-add")||r(!0),o.stopPropagation(),s.add(t),s.remove(t+"-add"),o.target.removeEventListener(o.type,l),n.isAnimating=!1,!0!==a&&n._triggerDOMEvent(i.q.addClassDone,e),r(!0))},!1);var u=n._getElementAnimationNames(e);s.add(t+"-add");var g=n._getElementAnimationNames(e);n._animationChangeWithValidKeyframe(g,u)||(s.remove(t+"-add"),s.add(t),n._removeMultipleEventListener(e,"webkitAnimationEnd animationend",l),n._removeMultipleEventListener(e,"webkitAnimationStart animationstart",m),!0!==a&&n._triggerDOMEvent(i.q.addClassTimeout,e),r(!1))}))},e}();function o(e,t){var n=e.container.get(r);e.container.get(i.k).configureAnimator(n),"function"==typeof t&&t(n)}}}]);
//# sourceMappingURL=vendor.aurelia-animator-css~be6b90b8.bca4331d92fcbd1672de.bundle.map