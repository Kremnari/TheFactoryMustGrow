(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{app:function(e,n,i){"use strict";i.r(n),i.d(n,"App",(function(){return u}));var t,r=i("aurelia-templating-resources"),a=i("aurelia-framework"),s=i("5DIH"),o=i("uShe");function c(e,n,i,t,r,a,s){try{var o=e[a](s),c=o.value}catch(e){return void i(e)}o.done?n(c):Promise.resolve(c).then(t,r)}function l(e,n){var i;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(i=function(e,n){if(!e)return;if("string"==typeof e)return d(e,n);var i=Object.prototype.toString.call(e).slice(8,-1);"Object"===i&&e.constructor&&(i=e.constructor.name);if("Map"===i||"Set"===i)return Array.from(e);if("Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))return d(e,n)}(e))||n&&e&&"number"==typeof e.length){i&&(e=i);var t=0;return function(){return t>=e.length?{done:!0}:{done:!1,value:e[t++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return(i=e[Symbol.iterator]()).next.bind(i)}function d(e,n){(null==n||n>e.length)&&(n=e.length);for(var i=0,t=new Array(n);i<n;i++)t[i]=e[i];return t}function h(e,n){for(var i=0;i<n.length;i++){var t=n[i];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}var u=Object(a.c)(r.a,o.a)(t=function(){function e(e,n){var i=this;this.viewPane={main:"home",showingItem:null},this.dataBase={},this.rounder={ones:1,tens:0,huns:0,abs:!1,fail:!1,get val(){return 100*this.huns+10*this.tens+this.ones},calc_val:function(e){return Math.min(this.val,e)},calc:function(e,n,i){return Math.min(this.val,Math.min(i,n-e))}},this.viewRecCat=!1,this.tooltip=null,window.tfmg=this,this.signaler=e,n.onLoadComplete((function(e){i.init(e)})),n.beginLoad(),this.saveGame=n.saveGame}var n,i,t,r=e.prototype;return r.init=function(e){var n=this;if(this.mgrs=e.mgrs,this.mgrs.signaler=this.signaler,e.save)if("0.01"==e.save.version){this.player=s.a.deserialize(this.mgrs,e.save.player),this.parcels=[];for(var i,t=l(e.save.parcels);!(i=t()).done;){var r=i.value;this.parcels.push(s.a.deserialize(this.mgrs,r))}}else console.log("idb save data out of date"),this.parcels=[],this.player=new s.a(10,this.mgrs,!0),this.jumpStart(),this.save();else this.parcels=[],this.player=new s.a(10,this.mgrs,!0),this.jumpStart();this.mgrs.entity.set_player(this.player),this.mgrs.rec.set_player(this.player),this.mgrs.rec.sub_ticker(this.mgrs.Ticker),this.selectParcel(this.player),this.viewPane.entities=function(e){var i,t,r,a;return Array.from((null==(i=n.viewPane.parcel.entityStore)||null==(t=i.entityTags)||null==(r=t.get("type"))||null==(a=r.get(e))?void 0:a.values())||[])}},r.vrcToggle=function(e){this.viewRecCat=this.viewRecCat!=e&&e},r.resetSave=function(){this.saveGame()},r.showing=function(e,n){var i=this;this.viewPane.showingItem&&(this.viewPane.showingItem.selectedClass="");var t=this.viewPane.showingItem;this.viewPane.showingItem=null,this.viewPane.showingCat="",e&&t!=e&&window.setTimeout((function(){e.selectedClass="selected",i.viewPane.showingItem=e,i.viewPane.showingCat=n}),0)},r.addParcel=function(){this.parcels.push(new s.a(0,this.mgrs,!1))},r.selectParcel=function(e){this.showItem=null,this.viewPane.parcel=e},r.save=function(){var e,n=(e=regeneratorRuntime.mark((function e(){var n,i,t,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(n={player:{}},console.log("saving..."),n.version="0.01",n.techs=this.mgrs.tech.serialize(),n.player=this.player.serialize(),n.parcels=[],i=l(this.parcels);!(t=i()).done;)r=t.value,n.parcels.push(r.serialize());this.saveGame(n),console.log("...done");case 9:case"end":return e.stop()}}),e,this)})),function(){var n=this,i=arguments;return new Promise((function(t,r){var a=e.apply(n,i);function s(e){c(a,t,r,s,o,"next",e)}function o(e){c(a,t,r,s,o,"throw",e)}s(void 0)}))});return function(){return n.apply(this,arguments)}}(),r.jumpStart=function(){this.player.inv.add("burner-mining-drill",2),this.player.inv.add("assembling-machine-1",2),this.player.inv.add("lab",2),this.player.inv.add("automation-science-pack",200)},n=e,(i=[{key:"showItem",set:function(e){var n=this;this.viewPane.showingItem&&(this.viewPane.showingItem.selectedClass="");var i=this.viewPane.showingItem;this.viewPane.showingItem=null,this.viewPane.showingCat="",e&&i!=e.item&&window.setTimeout((function(){e.item.selectedClass="selected",n.viewPane.showingItem=e.item,n.viewPane.showingCat=e.cat}),0)}}])&&h(n.prototype,i),t&&h(n,t),e}())||t},"app.html":function(e,n,i){e.exports='<template>\n  <require from="bootstrap/dist/css/bootstrap.min.css"></require>\n  <require from="@fortawesome/fontawesome-free/css/all.min.css"></require>\n  <require from="./styles.scss"></require>\n  <require from="./tfmg.css"></require>\n\n  <require from="resources/elements/icon-base"></require>\n  <require from="resources/elements/tool-tip"></require>\n  <require from="resources/value-converters/lib/ObjectFilters"></require>\n  <require from="resources/value-converters/CanMine"></require>\n  <require from="resources/value-converters/isVisible"></require>\n  <require from="resources/value-converters/valueconverters"></require>\n\n  <header id="selector">\n    <div id="devControls">\n      <button click.delegate="save()">Save GH</button>\n      <button click.delegate="resetSave()">Start Anew</button>\n      <button click.delegate="mgrs.Ticker.toggle()">${mgrs.Ticker.isRunning ? "Pause" : "Resume"}</button>\n    </div>\n    <div id="playerControls">\n      <h4 click.delegate="viewPane.main = \'home\'">Home</h4>\n      <h4 click.delegate="viewPane.main = \'entities\'">Machina</h4>\n      <h4 click.delegate="viewPane.main = \'parcels\'">Blocks</h4>\n      <h4 click.delegate="viewPane.main = \'research\'">Research</h4>\n    </div>\n    <div id="parcelControls" show.bind="viewPane.parcel">\n      <div show.bind="viewPane.main == \'entities\'">\n        <h5 click.delegate="viewPane.entityPane = \'mining\'">Mining</h5>\n        <h5 click.delegate="viewPane.entityPane = \'manuf\'">Manufacturing</h5>\n        <h5 click.delegate="viewPane.entityPane = \'labs\'">Labs</h5>\n      </div>\n    </div>\n    <tool-tip display.bind="tooltip" item-mgr.bind="mgrs.item" recipe-mgr.bind="mgrs.rec"></tool-tip>\n  </header>\n  <div id="mainView">\n    <article class="leftside">\n      <section id="recipes" show.bind="viewPane.main == \'home\'">\n        <h3>Crafting categories</h3>\n        <div>\n          <h4>Hand Craft</h4>\n          <icon-base repeat.for="rec of mgrs.rec.recipes_by_cats[\'crafting\']  | objectValues " item.bind="rec" click.delegate="mgrs.rec.startCraft(rec, player.inv, \' \')"\n          show.bind="rec.enabled" class.bind="rec.classesStr" anim_class.bind="rec.style" mouseenter.trigger="tooltip = rec" mouseleave.trigger="tooltip = null"></icon-base>\n        </div>\n      </section>\n      <section id="resources" show.bind="viewPane.main == \'home\'">\n        <h3>Mineables</h3>\n        <icon-base repeat.for="res of mgrs.res.resList | canMine | objectValues" item.bind="res" click.delegate="mgrs.res.mine(res.name, player.inv)"\n                  class="${res.mining ? \'mining\': null}" anim_style.bind="res.miningStyle"></icon-base> \n      </section>\n      <section id="technologies"  show.bind="viewPane.main == \'research\'">\n        <h3>Research</h3>\n        <require from="./resources/elements/byModule/tech-infopane.html"></require>\n        <tech-infopane if.bind="viewPane.showingCat==\'tech\'" tech.bind="viewPane.showingItem" tech-mgr.bind="mgrs.tech" tooltip.bind="tooltip"></tech-infopane>\n        <icon-base repeat.for="tech of mgrs.tech.shownTechs & signal:\'techUpdate\'" click.delegate="showItem = {item: tech, cat: \'tech\'}"\n                    item.bind="tech" count.bind="tech.prerequisites.length"\n                    class="${mgrs.tech.researching==tech ? \'researching\' : \'\'} ${tech.researched ? \'researched\': \'\'} ${viewPane.showingItem==tech ? \'selected\': \'\'}"\n        >\n        </icon-base>\n        <div>\n          <h5>Filters</h5>\n          <p>Filter Complete<button click.delegate="mgrs.tech.toggleFilter(\'complete\')">${mgrs.tech.filters.ShowComplete? "Hide":"Show"}</button></p>\n          <p>Filter Pack:\n            <span repeat.for="pack of mgrs.tech.filters.ShowPack | objectEntries & signal:\'techUpdate\'"\n              class="${pack[1]? \'selected\':\'\'}" click.delegate="mgrs.tech.toggleFilter(\'byPack\', pack[0])"\n              >\n              <img src.bind="mgrs.icon.getSrc(\'item\', pack[0])" height="16px">\n            </span>\n          </p>\n        </div>\n      </section>\n      <section id="parcels" show.bind="viewPane.main == \'parcels\'">\n        <h3>Factory Blocks</h3>\n        <div click.delegate="selectParcel(player)" class=\'${viewPane.parcel==player ? "selected":""}\'>player</div>\n        <div repeat.for="parcel of parcels" click.delegate="selectParcel(parcel)" class=\'${viewPane.parcel==parcel ? "selected":""}\'>\n          ${$index}\n        </div>\n        <div>\n          <button click.delegate="addParcel()">Add Factory Block</button>\n        </div>\n      </section>\n      <section id="machines" if.bind="viewPane.main == \'entities\'">\n        <div show.bind="viewPane.entityPane == \'mining\'">\n          <h4>Mining</h4>\n          <require from="./resources/elements/byModule/mining-infopane.html"></require>\n          <mining-infopane if.bind="viewPane.showingCat==\'miner\'" miner.bind="viewPane.showingItem" actor.bind="player" res-mgr.bind="mgrs.res" rounder.bind="rounder"></mining-infopane>\n          <div class="entityList">\n            <icon-base repeat.for="miner of viewPane.entities(\'mining\') & signal:\'addedEntity\'" item.bind="miner" alt-image.bind="miner.mining.icon"\n                      click.delegate="showing(miner, \'miner\')" class.bind="miner.selectedClass"></icon-base>\n          </div>\n        </div>\n        <div show.bind="viewPane.entityPane == \'manuf\'">\n          <h4>Manufacturing</h4>\n          <require from="./resources/elements/byModule/crafting-infopane.html"></require>\n          <crafting-infopane if.bind="viewPane.showingCat==\'crafter\'" crafter.bind="viewPane.showingItem" rec-mgr.bind="mgrs.rec" item-mgr.bind="mgrs.item" inventory.bind="viewPane.parcel.inv" rounder.bind="rounder"></crafting-infopane>\n          <div class="entityList">\n            <icon-base repeat.for="crafter of viewPane.entities(\'crafting\') & signal:\'addedEntity\'" item.bind="crafter" alt-image.bind="crafter.recipe.icon" click.delegate="showing(crafter, \'crafter\')" class.bind="crafter.selectedClass"></icon-base>\n          </div>\n        </div>\n        <div show.bind="viewPane.entityPane == \'labs\'">\n          <h4>Labs</h4>\n          <require from="./resources/elements/byModule/lab-infopane.html"></require>\n          <lab-infopane if.bind="viewPane.showingCat==\'labs\'" lab.bind="viewPane.showingItem" item-mgr.bind="mgrs.item" rounder.bind="rounder"></lab-infopane>\n          <div class="entityList">\n            <icon-base repeat.for="labee of viewPane.entities(\'lab\') & signal:\'addedEntity\'" item.bind="labee" click.delegate="showing(labee, \'labs\')" class.bind="labee.selectedClass"></icon-base>\n          </div>\n        </div>\n      </section>\n    </article>\n    <article class="rightside">\n      <section id="inventoryList" if.bind="!viewPane.parcel.isPlayer">\n        <h3>Inventory</h3>\n        <icon-base repeat.for="item of viewPane.parcel.inv.items" item.bind="item" show.bind="item.count>0" count.bind="item.count" click.delegate="viewPane.parcel.inv.click({where:viewPane.parcel, which:item, who:player, what:\'move\', rounder})">\n        </icon-base>\n      </section>\n    </article>\n  </div>\n  <section id="inventoryList">\n    <h3>Inventory</h3>\n    <icon-base repeat.for="item of player.inv.items" item.bind="item" show.bind="item.count>0" count.bind="item.count" click.delegate="player.inv.click({where:viewPane.parcel, which:item, who:player, what:\'use\'})">\n    </icon-base>\n  </section>\n  <section id="numSelectors">\n    <input type="checkbox" id="numSelToggle" style="display:none">\n    <label for="numSelToggle">Rounder&nbsp<span class="tabOnly">${rounder.huns}${rounder.tens}${rounder.ones}</span>\n    </label>\n    <input id="huns" type="range" min="0" max="9" step="1" value.bind="rounder.huns">\n    <input id="tens" type="range" min="0" max="9" step="1" value.bind="rounder.tens">\n    <input id="ones" type="range" min="0" max="9" step="1" value.bind="rounder.ones">\n    <span>${rounder.huns}${rounder.tens}${rounder.ones}</span>\n    <label class="switch"><input type="checkbox" value.bind="rounder.abs"><span class="slider text_abs_mod"></span></label>\n    <label class="switch"><input type="checkbox" value.bind="rounder.fail"><span class="slider text_full_part"></span></label>\n  </section>\n\n</template>\n'},main:function(e,n,i){"use strict";i.d(n,"configure",(function(){return r}));i("ls82"),i("SYky");var t=i("BEPO");i("70NS");function r(e){e.use.standardConfiguration().plugin("aurelia-animator-css").feature("resources/index"),e.use.developmentLogging(t.a?"debug":"warn"),t.b&&e.use.plugin("aurelia-testing"),e.start().then((function(){return e.setRoot("app")}))}}}]);
//# sourceMappingURL=app~f71cff67.d4e52147703499ed5fce.bundle.map