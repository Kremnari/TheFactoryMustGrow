(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{app:function(e,t,n){"use strict";n.r(t),n.d(t,"App",(function(){return d}));var i,a=n("aurelia-templating-resources"),s=n("aurelia-framework"),r=n("uShe"),o=n("3Qvj"),c=n("463H"),u=n("0d46"),h=n("6juG"),l=n("7jDb"),v=n("iVgR"),m=n("Evr9");function g(e,t,n,i,a,s,r){try{var o=e[s](r),c=o.value}catch(e){return void n(e)}o.done?t(c):Promise.resolve(c).then(i,a)}function w(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var d=Object(s.d)(a.a,r.a,o.a,s.b)(i=function(){function e(e,t,n,i){var a=this;this.showTut=!0,this.dataBase={},this.viewRecCat=!1,window.tfmg=this,this.Math=Math,this.signaler=e,this.IgorJs=l.a,h.a.signaler=this.signaler,h.a.app=this,this.view=h.c,l.a.initialize({commandTasker:u.b,viewTasker:h.b,ticker:{ticks_per_sec:c.e,ticks_max_phase:c.d},dbName:"TheFactoryMustGrow",saveName:"SaveGame"}),this.view.set({type:"view",which:"main",what:"home"}),t.onLoadComplete((function(e){a.init(e,n)})),t.beginLoad(),this.CCC=u.a,this.Tutorial=m.a,this.save=function(){l.a.saveGame(),a.autoSave(),a.autoSave()},i.expressionObserver(this,"view.ctrl.main").subscribe((function(e,t){a.whenCheck(e,t,"main")}))}var t,n,i,a=e.prototype;return a.init=function(){var e,t=(e=regeneratorRuntime.mark((function e(t,n){var i=this;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.mgrs=t.mgrs,this.mgrs.baseApp=this,u.b.initialize({dialogSvc:n,dataSet:t.mgrs.data}),Object(v.a)(l.a),e.next=6,l.a.loadDatabase(t.mgrs.data);case 6:return this.dataSet=l.a.dataSet,this.globals=l.a.globalObject,u.b.setRunner(l.a.getRunner()),this.IgorRunner=l.a.getRunner(),this.globals=l.a.getNamed("global"),u.a.staticProvide("player","inventory",this.globals.player.inv),u.a.staticProvide("service","rounder",this.mgrs.rounder),h.a.setClassFn("canCraft",(function(e){return e.ingredients.every((function(e){return i.IgorRunner.processTEMP(i.globals.player.inv.items,"inventory.total",{name:e.name})>=e.amount}))?"recipeEnabled":"recipeDisabled"})),h.a.setViewFn("recipeFilter",(function(e){return Object.values(i.IgorRunner.data.recipe).filter((function(t){return(void 0===t.enabled||t.enabled||i.globals.unlocked_recipes.includes(t.name))&&(Array.isArray(e)&&e.includes(t.category)||t.category==e)}))})),h.a.setViewFn("objectValues",(function(e){return Object.values(e)})),h.a.setViewFn("technologyFilter",(function(){return tfmg.showAllTechs?Object.values(tfmg.dataSet.technology):Object.values(tfmg.dataSet.technology).filter((function(e){var t;return(null==(t=i.globals.research[e.name])?void 0:t.complete)?tfmg.view.options.bDoneTechs:!e.prerequisites||e.prerequisites.every((function(e){var t;return null==(t=i.globals.research[e])?void 0:t.complete}))})).sort((function(e,t){return e.name>t.name?1:-1}))})),h.a.setViewFn("workshopEntities",(function(){var e=i.IgorJs.arrayFromIds(i.globals.player.workshop.entities);return e=e.sort((function(e,t){return e.order>t.order?-1:1}))})),h.a.setViewFn("playerInventory",(function(){var e=i.globals.player.inv.items;return e=e.sort((function(e,t){return e.name==t.name?e.count>t.count?-1:1:e.name>t.name?1:-1}))})),e.next=21,this.mgrs.idb.get("dev");case 21:this.showDev=e.sent,this.showDev||(l.a.setState("start"),this.globals.activeFeatures.tutorial?m.a.start(this):this.autoSave()),h.a.setViewFn("sort",(function(e){return e=e.sort((function(e,t){return e.order>t.order?1:-1}))}));case 24:case"end":return e.stop()}}),e,this)})),function(){var t=this,n=arguments;return new Promise((function(i,a){var s=e.apply(t,n);function r(e){g(s,i,a,r,o,"next",e)}function o(e){g(s,i,a,r,o,"throw",e)}r(void 0)}))});return function(e,n){return t.apply(this,arguments)}}(),a.hoverTest=function(){alert("test")}//! NUKE in favor of chameView
,a.autoSave=function(){var e=this;this.autoSave.sub?(this.IgorJs.Ticker.dispose(this.autoSave.sub),this.autoSave.secs=function(){return 0},this.autoSave.sub=null):(this.autoSave.sub=l.a.Ticker.subscribe((function(){l.a.saveGame()}),c.d/5),this.autoSave.secs=function(){return Math.floor((c.d/5-l.a.Ticker.ticks%(c.d/5)+e.autoSave.sub.phase)/c.e)})},a.when=function(e,t){this.whenTarg={targ:e,cb:t},console.log("whenSet")},a.whenCheck=function(e,t,n){this.whenTarg&&(this.whenTarg.targ.entityPane&&this.view.ctrl.entityPane!=this.whenTarg.targ.entityPane||this.whenTarg.targ.main&&this.view.ctrl.main!=this.whenTarg.targ.main||(this.whenTarg.cb(),this.whenTarg=void 0))},a.test=function(e){console.log(e)},a.isAwesome=function(){this.showAllTechs=!0,this.editDataSource=!0},a.nukeCache=function(){this.mgrs.idb.clear(),window.location.reload()},a.hideTutorial=function(){m.a.clearTut()},a.jumpTutorial=function(){this.globals.activeFeatures.factoryBlocks={},this.globals.activeFeatures.tutorial={step:49},m.a.jump(this)},a.resetDS=function(){this.mgrs.idb.del("last_ds"),location.reload()},a.toggleDev=function(e){this.mgrs.idb.set("dev",!this.showDev),this.showDev=!this.showDev},a.resetSave=function(){l.a.commands("resetSave")&&location.reload()},a.jumpStart=function(){this.IgorRunner.processTEMP("player.inventory","inventory.add",{itemStacks:[{name:"lab",count:10},{name:"automation-science-pack",count:200},{name:"inserter",count:50},{name:"iron-chest",count:50},{name:"stone",count:100},{name:"burner-mining-drill",count:10},{name:"stone-furnace",count:10},{name:"assembling-machine-1",count:10},{name:"transport-belt",count:100}]}),this.globals.activeFeatures.factoryBlocks={},this.signaler.signal("generalUpdate")},t=e,(n=[{key:"showTech",set:function(e){var t=this;console.error("SHOWEDTECH"),this.viewPane.showingTech=null,e&&window.setTimeout((function(){t.viewPane.showingTech=e}))}//! NUKE in favor of chameView
},{key:"showItem",set:function(e){var t=this;if(console.error("SHOWEDITEM"),e.item)if("string"==typeof e.item&&e.item.includes("id")&&(e.item=this.IgorJs.getObjId(e.item)),this.viewPane.showingItem==e.item&&e.double)this.viewPane.main=e.double.view;else{var n=this.viewPane.showingItem;this.viewPane.showingItem=null,this.viewPane.showingCat="",this.viewPane.connectedItems=null,e&&n!=e.item&&window.setTimeout((function(){t.viewPane.showingItem=e.item,t.viewPane.showingCat=e.cat,e.view&&(t.viewPane.main=e.view),e.setConnected&&(t.setConnectedItems=e)}),0)}}},{key:"setConnectedItems",set:function(e){var t,n,i={};null==(t=e.item.connections.drains)||t.forEach((function(e){i[e.parent||e]="drain"})),null==(n=e.item.connections.sources)||n.forEach((function(e){i[e.parent||e]+=" source"})),this.view.set({type:"scope",which:"connectedItems",what:i})}}])&&w(t.prototype,n),i&&w(t,i),e}())||i}}]);
//# sourceMappingURL=app~6154e0aa.0d8e1a22216a6bdc43f8.bundle.map