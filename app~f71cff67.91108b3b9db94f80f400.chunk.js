(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{app:function(e,t,n){"use strict";n.r(t),n.d(t,"App",(function(){return p}));var i,r=n("aurelia-templating-resources"),s=n("aurelia-framework"),a=n("8p7n"),o=n("uShe"),c=n("3Qvj"),u=n("Evr9"),l=n("463H"),h=n("0d46");function d(e,t){var n;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return f(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return f(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var i=0;return function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return(n=e[Symbol.iterator]()).next.bind(n)}function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,i=new Array(t);n<t;n++)i[n]=e[n];return i}function m(e,t,n,i,r,s,a){try{var o=e[s](a),c=o.value}catch(e){return void n(e)}o.done?t(c):Promise.resolve(c).then(i,r)}function v(e){return function(){var t=this,n=arguments;return new Promise((function(i,r){var s=e.apply(t,n);function a(e){m(s,i,r,a,o,"next",e)}function o(e){m(s,i,r,a,o,"throw",e)}a(void 0)}))}}function g(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var p=Object(s.d)(r.a,o.a,c.a,s.b)(i=function(){function e(e,t,n,i){var r=this;this.viewPane={main:"home",entityPane:"mining",showingItem:null,version:"beta",showSubUp:!1},this.viewHelpers={PlayerBlock:function(e){tfmg.select_FacBlock(tfmg.player,!0),tfmg.viewPane.main="entities",tfmg.viewPane.entityPane=e}},this.showTut=!0,this.dataBase={},this.viewRecCat=!1,this.tooltip=null,window.tfmg=this,this.signaler=e,t.onLoadComplete((function(e){r.init(e,n)})),t.beginLoad(),this.CC=h.a,this.saveGame=t.saveGame,i.expressionObserver(this,"viewPane.main").subscribe((function(e,t){r.whenCheck(e,t,"main")})),i.expressionObserver(this,"viewPane.entityPane").subscribe((function(e,t){r.whenCheck(e,t,"entityPane")}))}var t,n,i,r=e.prototype;return r.init=function(){var e=v(regeneratorRuntime.mark((function e(t,n){var i,r,s;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this.mgrs=t.mgrs,this.mgrs.DS=n,this.mgrs.baseApp=this,this.mgrs.signaler=this.signaler,t.save&&t.save.version==l.a)for(this.player=a.b.deserialize(this.mgrs,t.save.player),this.facBlocks=[],this.showTut=!1,i=d(t.save.facBlocks);!(r=i()).done;)s=r.value,this.facBlocks.push(a.a.deserialize(s));else this.facBlocks=[],this.player=new a.b(20),this.mgrs.signaler.signal("generalUpdate");return this.mgrs.rec.set_player(this.player),this.mgrs.rec.sub_ticker(this.mgrs.Ticker),this.select_FacBlock(this.player,!0),e.next=10,this.mgrs.idb.get("dev");case 10:this.showDev=e.sent,this.showDev||(this.showTut&&u.a.start(),!this.showTut&&this.autoSave(),this.mgrs.Ticker.toggle());case 12:case"end":return e.stop()}}),e,this)})));return function(t,n){return e.apply(this,arguments)}}(),r.vrcToggle=function(e){this.viewRecCat=this.viewRecCat!=e&&e},r.hideTutorial=function(){u.a.hide()},r.resetDS=function(){this.mgrs.idb.del("last_ds"),location.reload()},r.setDev=function(){this.mgrs.idb.set("dev",!0),this.showDev=!0},r.unsetDev=function(){this.mgrs.idb.set("dev",!1),this.showDev=!1},r.autoSave=function(){var e=this;this.autoSave.sub?(this.mgrs.Ticker.dispose(this.autoSave.sub),this.autoSave.sub=null):this.autoSave.sub=this.mgrs.Ticker.subscribe((function(){e.save()}),l.c)},r.resetSave=function(){this.saveGame()},r.showing=function(e,t){var n=this;this.viewPane.showingItem&&(this.viewPane.showingItem.selectedClass="");var i=this.viewPane.showingItem;this.viewPane.showingItem=null,this.viewPane.showingCat="",e&&i!=e&&window.setTimeout((function(){e.selectedClass="selected",n.viewPane.showingItem=e,n.viewPane.showingCat=t}),0)},r.add_FacBlock=function(e,t){if(!(t=t||prompt("Enter Block Name")))return!1;var n=new a.a(e,t);return this.facBlocks.push(n),n},r.select_FacBlock=function(e,t){void 0===t&&(t=!1),this.showItem=null,this.viewPane.facBlock=e,this.viewPlayer=t},r.when=function(e,t){this.whenTarg={targ:e,cb:t},console.log("whenSet")},r.whenCheck=function(e,t,n){this.whenTarg&&(this.whenTarg.targ.entityPane&&this.viewPane.entityPane!=this.whenTarg.targ.entityPane||this.whenTarg.targ.main&&this.viewPane.main!=this.whenTarg.targ.main||(this.whenTarg.cb(),this.whenTarg=void 0))},r.save=function(){var e=v(regeneratorRuntime.mark((function e(){var t,n,i,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(t={player:{}},console.log("saving..."),t.version=l.a,t.techs=this.mgrs.tech.serialize(),t.player=this.player.serialize(),t.facBlocks=[],n=d(this.facBlocks);!(i=n()).done;)r=i.value,t.facBlocks.push(r.serialize());this.saveGame(t),console.log("...done");case 9:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}(),r.jumpStart=function(){this.player.inv.add("burner-mining-drill",2),this.player.inv.add("assembling-machine-1",2),this.player.inv.add("lab",2),this.player.inv.add("automation-science-pack",200)},r.testing=function(){this.player2=new a.b(10),this.add_FacBlock("resource","iron-mine"),this.facBlocks[0].lines[0].AddEntity("burner-mining-drill"),this.facBlocks[0].lines[0].AddEntity("burner-mining-drill"),this.facBlocks[0].lines[0].SetEntityFn(this.mgrs.res.resList["iron-ore"]),this.add_FacBlock("factory","iron-plates"),this.facBlocks[1].lines[0].AddEntity("stone-furnace"),this.facBlocks[1].lines[0].AddEntity("stone-furnace"),this.facBlocks[1].lines[0].SetEntityFn(this.mgrs.rec.recipeList["iron-plate"]),this.add_FacBlock("resource","copper-mine"),this.facBlocks[2].lines[0].AddEntity("burner-mining-drill"),this.facBlocks[2].lines[0].AddEntity("burner-mining-drill"),this.facBlocks[2].lines[0].SetEntityFn(this.mgrs.res.resList["copper-ore"]),this.add_FacBlock("factory","copper-plates"),this.facBlocks[3].lines[0].AddEntity("stone-furnace"),this.facBlocks[3].lines[0].AddEntity("stone-furnace"),this.facBlocks[3].lines[0].SetEntityFn(this.mgrs.rec.recipeList["copper-plate"]),this.add_FacBlock("bus","plates"),this.facBlocks[0].AddBusDrain(this.facBlocks[1]),this.facBlocks[1].AddBusDrain(this.facBlocks[4]),this.facBlocks[2].AddBusDrain(this.facBlocks[3]),this.facBlocks[3].AddBusDrain(this.facBlocks[4]),this.player.inv.add("inserter",10)},r.iconEditor=function(){var e=v(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("iconEditor"!=this.viewPane){e.next=3;break}return this.viewPane={main:"home",showingItem:null},e.abrupt("return");case 3:return this.viewPane="iconEditor",this.IE={ds:{old:{},new:{}},select:{}},e.next=7,this.mgrs.idb.get("Icons");case 7:if(e.t0=e.sent,e.t0){e.next=12;break}return e.next=11,this.mgrs.idb.get("dataSet");case 11:e.t0=e.sent.icons;case 12:return this.IE.ds.new=e.t0,e.next=15,this.mgrs.idb.get("oldIcons");case 15:if(this.IE.ds.old=e.sent,e.t1=this.IE.ds.old,e.t1){e.next=23;break}return e.next=20,this.mgrs.idb.set("oldIcons",this.IE.ds.new);case 20:if(e.t2=e.sent,!e.t2){e.next=23;break}this.IE.ds.old=this.IE.ds.new;case 23:this.signaler.signal("update");case 24:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}(),r.IEshow=function(){this.IE.showOld=this.IE.ds.old[this.IE.select.Cat][this.IE.select.Icon],this.IE.showNew=this.IE.ds.new[this.IE.select.Cat][this.IE.select.Icon],this.signaler.signal("update")},r.IEfiled=function(){var e=v(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=function(){var e=v(regeneratorRuntime.mark((function e(t){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=new FileReader,e.abrupt("return",new Promise((function(e){n.onload=function(){e(n.result)},n.readAsDataURL(t)})));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),e.next=3,t(this.IE.file[0]);case 3:this.IE.fileBlob=e.sent;case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}(),r.IEStore=function(){this.IE.ds.new[this.IE.select.Cat][this.IE.select.Icon]=this.IE.fileBlob},r.saveIconEditor=function(){var e=v(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.mgrs.idb.set("Icons",this.IE.ds.new);case 2:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}(),r.dlIconEditor=function(){var e=document.createElement("a");e.download="icons.json",e.href="data:application/octet-stream:base64,"+JSON.stringify(this.IE.ds.new),e.style="display:none",document.body.appendChild(e),e.click()},r.ulIconEditor=function(){var e=v(regeneratorRuntime.mark((function e(){var t,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this.IE.upload){e.next=2;break}return e.abrupt("return");case 2:return t=function(){var e=v(regeneratorRuntime.mark((function e(t){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=new FileReader,e.abrupt("return",new Promise((function(e){n.onload=function(){e(n.result)},n.readAsText(t)})));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),e.t0=JSON,e.next=6,t(this.IE.upload[0]);case 6:e.t1=e.sent,n=e.t0.parse.call(e.t0,e.t1),this.mgrs.idb.set("Icons",n),console.log("loaded");case 10:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}(),t=e,(n=[{key:"showItem",set:function(e){var t=this;this.viewPane.showingItem&&(this.viewPane.showingItem.selectedClass="");var n=this.viewPane.showingItem;this.viewPane.showingItem=null,this.viewPane.showingCat="",e&&n!=e.item&&window.setTimeout((function(){e.item.selectedClass="selected",t.viewPane.showingItem=e.item,t.viewPane.showingCat=e.cat}),0)}}])&&g(t.prototype,n),i&&g(t,i),e}())||i},wb4v:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));n("+Aae");var i=n("EfK0");function r(e,t){var n;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return s(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return s(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var i=0;return function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return(n=e[Symbol.iterator]()).next.bind(n)}function s(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,i=new Array(t);n<t;n++)i[n]=e[n];return i}function a(e,t,n){if((null==n?void 0:n.debug)&&(console.log("debug:"),console.log(e),console.log(t),console.log(n)),0!=(null==n?void 0:n.maxXfer)){var s="entity"==(null==n?void 0:n.toAs)?"recieveItem":"addStack",a=0,o=function(r){(null==n?void 0:n.debug)&&console.log(r);var a=t[s](r);return(null==n?void 0:n.debug)&&console.log(a),a&&e.consumeAll(new i.b(r.name,a)),null==n||n.debug,a},c=(null==n?void 0:n.maxXfer)?function(e){return Math.min(e,n.maxXfer-a)}:function(e){return e};if(null==n?void 0:n.stacks)for(var u,l=r(n.stacks);!(u=l()).done;){o(u.value)}else for(var h,d=r(e.items);!(h=d()).done;){var f=h.value;if(f&&f.name&&0!=f.count&&((!(null==n?void 0:n.types)||n.types.includes(f.name))&&(a+=o({name:f.name,count:c(f.count)}),(null==n?void 0:n.debug)&&console.log("accum: "+a),(null==n?void 0:n.maxXfer)&&n.maxXfer==a)))return}}}n("0d46").a.InvXFer=a,globalThis.InvXFer=a}}]);
//# sourceMappingURL=app~f71cff67.91108b3b9db94f80f400.bundle.map