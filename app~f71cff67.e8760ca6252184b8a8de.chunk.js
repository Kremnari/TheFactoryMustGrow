(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{app:function(e,n,t){"use strict";t.r(n),t.d(n,"App",(function(){return v}));var i,a=t("aurelia-templating-resources"),r=t("aurelia-framework"),s=t("8p7n"),o=t("uShe"),c=t("3Qvj"),l=t("Evr9"),d=t("463H"),u=t("0d46");function h(e,n){var t;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(t=function(e,n){if(!e)return;if("string"==typeof e)return m(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return m(e,n)}(e))||n&&e&&"number"==typeof e.length){t&&(e=t);var i=0;return function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return(t=e[Symbol.iterator]()).next.bind(t)}function m(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,i=new Array(n);t<n;t++)i[t]=e[t];return i}function p(e,n,t,i,a,r,s){try{var o=e[r](s),c=o.value}catch(e){return void t(e)}o.done?n(c):Promise.resolve(c).then(i,a)}function f(e){return function(){var n=this,t=arguments;return new Promise((function(i,a){var r=e.apply(n,t);function s(e){p(r,i,a,s,o,"next",e)}function o(e){p(r,i,a,s,o,"throw",e)}s(void 0)}))}}function g(e,n){for(var t=0;t<n.length;t++){var i=n[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var v=Object(r.d)(a.a,o.a,c.a,r.b)(i=function(){function e(e,n,t,i){var a=this;this.viewPane={main:"home",entityPane:"",showingItem:null},this.showTut=!0,this.dataBase={},this.viewRecCat=!1,this.tooltip=null,window.tfmg=this,this.signaler=e,n.onLoadComplete((function(e){a.init(e,t)})),n.beginLoad(),this.CC=u.a,this.saveGame=n.saveGame,i.expressionObserver(this,"viewPane.main").subscribe((function(e,n){a.whenCheck(e,n,"main")})),i.expressionObserver(this,"viewPane.entityPane").subscribe((function(e,n){a.whenCheck(e,n,"entityPane")}))}var n,t,i,a=e.prototype;return a.init=function(){var e=f(regeneratorRuntime.mark((function e(n,t){var i,a,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this.mgrs=n.mgrs,this.mgrs.DS=t,this.mgrs.baseApp=this,this.mgrs.signaler=this.signaler,n.save&&n.save.version==d.a)for(this.player=s.b.deserialize(this.mgrs,n.save.player),this.facBlocks=[],this.showTut=!1,i=h(n.save.facBlocks);!(a=i()).done;)r=a.value,this.facBlocks.push(s.a.deserialize(r));else this.facBlocks=[],this.player=new s.b(20),this.mgrs.signaler.signal("generalUpdate");return this.mgrs.rec.set_player(this.player),this.mgrs.rec.sub_ticker(this.mgrs.Ticker),this.select_FacBlock(this.player,!0),e.next=10,this.mgrs.idb.get("dev");case 10:this.showDev=e.sent,this.showDev||(this.showTut&&l.a.start(),!this.showTut&&this.autoSave(),this.mgrs.Ticker.toggle());case 12:case"end":return e.stop()}}),e,this)})));return function(n,t){return e.apply(this,arguments)}}(),a.vrcToggle=function(e){this.viewRecCat=this.viewRecCat!=e&&e},a.hideTutorial=function(){l.a.hide()},a.resetDS=function(){this.mgrs.idb.del("last_ds"),location.href=location.href},a.setDev=function(){this.mgrs.idb.set("dev",!0),this.showDev=!0},a.unsetDev=function(){this.mgrs.idb.set("dev",!1),this.showDev=!1},a.autoSave=function(){var e=this;this.autoSave.sub?(this.mgrs.Ticker.dispose(this.autoSave.sub),this.autoSave.sub=null):this.autoSave.sub=this.mgrs.Ticker.subscribe((function(){e.save()}),d.c)},a.resetSave=function(){this.saveGame()},a.showing=function(e,n){var t=this;this.viewPane.showingItem&&(this.viewPane.showingItem.selectedClass="");var i=this.viewPane.showingItem;this.viewPane.showingItem=null,this.viewPane.showingCat="",e&&i!=e&&window.setTimeout((function(){e.selectedClass="selected",t.viewPane.showingItem=e,t.viewPane.showingCat=n}),0)},a.add_FacBlock=function(e,n){if(!(n=n||prompt("Enter Block Name")))return!1;var t=new s.a(e,n);return this.facBlocks.push(t),t},a.select_FacBlock=function(e,n){void 0===n&&(n=!1),this.showItem=null,this.viewPane.facBlock=e,this.viewPlayer=n},a.when=function(e,n){this.whenTarg={targ:e,cb:n},console.log("whenSet")},a.whenCheck=function(e,n,t){this.whenTarg&&(this.whenTarg.targ.entityPane&&this.viewPane.entityPane!=this.whenTarg.targ.entityPane||this.whenTarg.targ.main&&this.viewPane.main!=this.whenTarg.targ.main||(this.whenTarg.cb(),this.whenTarg=void 0))},a.save=function(){var e=f(regeneratorRuntime.mark((function e(){var n,t,i,a;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(n={player:{}},console.log("saving..."),n.version=d.a,n.techs=this.mgrs.tech.serialize(),n.player=this.player.serialize(),n.facBlocks=[],t=h(this.facBlocks);!(i=t()).done;)a=i.value,n.facBlocks.push(a.serialize());this.saveGame(n),console.log("...done");case 9:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}(),a.jumpStart=function(){this.player.inv.add("burner-mining-drill",2),this.player.inv.add("assembling-machine-1",2),this.player.inv.add("lab",2),this.player.inv.add("automation-science-pack",200)},a.testing=function(){this.player2=new s.b(10),this.add_FacBlock("resource","iron-mine"),this.facBlocks[0].lines[0].AddEntity("burner-mining-drill"),this.facBlocks[0].lines[0].AddEntity("burner-mining-drill"),this.facBlocks[0].lines[0].SetEntityFn(this.mgrs.res.resList["iron-ore"]),this.add_FacBlock("factory","iron-plates"),this.facBlocks[1].lines[0].AddEntity("stone-furnace"),this.facBlocks[1].lines[0].AddEntity("stone-furnace"),this.facBlocks[1].lines[0].SetEntityFn(this.mgrs.rec.recipeList["iron-plate"]),this.add_FacBlock("resource","copper-mine"),this.facBlocks[2].lines[0].AddEntity("burner-mining-drill"),this.facBlocks[2].lines[0].AddEntity("burner-mining-drill"),this.facBlocks[2].lines[0].SetEntityFn(this.mgrs.res.resList["copper-ore"]),this.add_FacBlock("factory","copper-plates"),this.facBlocks[3].lines[0].AddEntity("stone-furnace"),this.facBlocks[3].lines[0].AddEntity("stone-furnace"),this.facBlocks[3].lines[0].SetEntityFn(this.mgrs.rec.recipeList["copper-plate"]),this.add_FacBlock("bus","plates"),this.facBlocks[0].AddBusDrain(this.facBlocks[1]),this.facBlocks[1].AddBusDrain(this.facBlocks[4]),this.facBlocks[2].AddBusDrain(this.facBlocks[3]),this.facBlocks[3].AddBusDrain(this.facBlocks[4]),this.player.inv.add("inserter",10)},a.iconEditor=function(){var e=f(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("iconEditor"!=this.viewPane){e.next=3;break}return this.viewPane={main:"home",showingItem:null},e.abrupt("return");case 3:return this.viewPane="iconEditor",this.IE={ds:{old:{},new:{}},select:{}},e.next=7,this.mgrs.idb.get("Icons");case 7:if(e.t0=e.sent,e.t0){e.next=12;break}return e.next=11,this.mgrs.idb.get("dataSet");case 11:e.t0=e.sent.icons;case 12:return this.IE.ds.new=e.t0,e.next=15,this.mgrs.idb.get("oldIcons");case 15:if(this.IE.ds.old=e.sent,e.t1=this.IE.ds.old,e.t1){e.next=23;break}return e.next=20,this.mgrs.idb.set("oldIcons",this.IE.ds.new);case 20:if(e.t2=e.sent,!e.t2){e.next=23;break}this.IE.ds.old=this.IE.ds.new;case 23:this.signaler.signal("update");case 24:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}(),a.IEshow=function(){this.IE.showOld=this.IE.ds.old[this.IE.select.Cat][this.IE.select.Icon],this.IE.showNew=this.IE.ds.new[this.IE.select.Cat][this.IE.select.Icon],this.signaler.signal("update")},a.IEfiled=function(){var e=f(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=function(){var e=f(regeneratorRuntime.mark((function e(n){var t;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=new FileReader,e.abrupt("return",new Promise((function(e){t.onload=function(){e(t.result)},t.readAsDataURL(n)})));case 2:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),e.next=3,n(this.IE.file[0]);case 3:this.IE.fileBlob=e.sent;case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}(),a.IEStore=function(){this.IE.ds.new[this.IE.select.Cat][this.IE.select.Icon]=this.IE.fileBlob},a.saveIconEditor=function(){var e=f(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.mgrs.idb.set("Icons",this.IE.ds.new);case 2:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}(),a.dlIconEditor=function(){var e=document.createElement("a");e.download="icons.json",e.href="data:application/octet-stream:base64,"+JSON.stringify(this.IE.ds.new),e.style="display:none",document.body.appendChild(e),e.click()},a.ulIconEditor=function(){var e=f(regeneratorRuntime.mark((function e(){var n,t;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this.IE.upload){e.next=2;break}return e.abrupt("return");case 2:return n=function(){var e=f(regeneratorRuntime.mark((function e(n){var t;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=new FileReader,e.abrupt("return",new Promise((function(e){t.onload=function(){e(t.result)},t.readAsText(n)})));case 2:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),e.t0=JSON,e.next=6,n(this.IE.upload[0]);case 6:e.t1=e.sent,t=e.t0.parse.call(e.t0,e.t1),this.mgrs.idb.set("Icons",t),console.log("loaded");case 10:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}(),n=e,(t=[{key:"showItem",set:function(e){var n=this;this.viewPane.showingItem&&(this.viewPane.showingItem.selectedClass="");var t=this.viewPane.showingItem;this.viewPane.showingItem=null,this.viewPane.showingCat="",e&&t!=e.item&&window.setTimeout((function(){e.item.selectedClass="selected",n.viewPane.showingItem=e.item,n.viewPane.showingCat=e.cat}),0)}}])&&g(n.prototype,t),i&&g(n,i),e}())||i},"app.html":function(e,n,t){e.exports='<template>\n  <require from="bootstrap/dist/css/bootstrap.min.css"></require>\n  <require from="@fortawesome/fontawesome-free/css/all.min.css"></require>\n  <require from="./styles.scss"></require>\n  <require from="./tfmg.scss"></require>\n\n  <header id="selector">\n    <div id="devControls" if.bind="showDev">\n      <button click.delegate="save()">Save</button>\n      <button click.delegate="resetSave()">Start Anew</button>\n      <button click.delegate="mgrs.Ticker.once()">Tick 1</button>\n      <button click.delegate="mgrs.Ticker.toggle()">${mgrs.Ticker.isRunning ? "Pause" : "Resume"}</button>\n      <button click.delegate="testing()">Testing...</button>\n      <button click.delegate="iconEditor()">Edit Icons</button>\n    </div>\n    <div id="playerControls">\n      <h4 click.delegate="viewPane.main = \'menu\'">&#9776;</h4>\n      <h4 click.delegate="viewPane.main = \'home\'">Home</h4>\n      <h4 click.delegate="viewPane.main = \'entities\'">Workshop</h4>\n      <h4 click.delegate="viewPane.main = \'facBlocks\'">Blocks</h4>\n      <h4 click.delegate="viewPane.main = \'research\'">Research</h4>\n    </div>\n    <div id="facBlockControls" show.bind="viewPane.facBlock==player">\n      <div show.bind="viewPane.main == \'entities\'">\n        <h5 click.delegate="viewPane.entityPane = \'mining\'">Mining</h5>\n        <h5 click.delegate="viewPane.entityPane = \'manuf\'">Manufacturing</h5>\n        <h5 click.delegate="viewPane.entityPane = \'labs\'">Labs</h5>\n      </div>\n    </div>\n    <require from="resources/elements/tool-tip"></require>\n    <tool-tip display.bind="tooltip" item-mgr.bind="mgrs.item" recipe-mgr.bind="mgrs.rec"></tool-tip>\n  </header>\n  <div id="mainView" if.bind="viewPane!=\'iconEditor\'">\n    <article>\n      <section id="recipes" show.bind="viewPane.main == \'home\'">\n        <h4>Craftables</h4>\n        <div class="overflow">\n          <icon-base\n            repeat.for="rec of mgrs.rec.recipes_by_cats[\'crafting\']  | objectValues "\n            item.bind="rec"\n            title = "${rec.name}"\n            click.delegate="mgrs.rec.startCraft(rec, player.inv, \' \')"\n            show.bind="rec.enabled"\n            class.bind="rec.classesStr"\n            anim_class.bind="rec.style"\n            mouseenter.trigger="tooltip = rec"\n            mouseleave.trigger="tooltip = null"\n          ></icon-base>\n        </div>\n      </section>\n      <section id="resources" show.bind="viewPane.main == \'home\'">\n        <h3>Mineables</h3>\n        <icon-base repeat.for="res of mgrs.res.resList | canMine | objectValues" item.bind="res" click.delegate="mgrs.res.mine(res.name, player.inv)"\n                  class="${res.mining ? \'mining\': null}" anim_style.bind="res.miningStyle"></icon-base> \n      </section>\n      <section id="technologies"  show.bind="viewPane.main == \'research\'">\n        <h3>Research</h3>\n        <require from="./resources/elements/byModule/tech-infopane.html"></require>\n        <tech-infopane if.bind="viewPane.showingCat==\'tech\'" tech.bind="viewPane.showingItem" tech-mgr.bind="mgrs.tech" tooltip.bind="tooltip"></tech-infopane>\n        <div class="overflow">\n          <icon-base repeat.for="tech of mgrs.tech.shownTechs & signal:\'techUpdate\'" click.delegate="showItem = {item: tech, cat: \'tech\'}"\n                      item.bind="tech" count.bind="tech.prerequisites.length"\n                      class="${mgrs.tech.researching==tech ? \'researching\' : \'\'} ${tech.researched ? \'researched\': \'\'} ${viewPane.showingItem==tech ? \'selected\': \'\'}"\n          >\n          </icon-base>\n        </div>\n        <div>\n          <h5>Filters</h5>\n          <p>Filter Complete<button click.delegate="mgrs.tech.toggleFilter(\'complete\')">${mgrs.tech.filters.ShowComplete? "Hide":"Show"}</button></p>\n          <p>Filter Pack:\n            <span repeat.for="pack of mgrs.tech.filters.ShowPack | objectEntries & signal:\'techUpdate\'"\n              class="${pack[1]? \'selected\':\'\'}" click.delegate="mgrs.tech.toggleFilter(\'byPack\', pack[0])"\n              >\n              <img src.bind="mgrs.icon.getSrc(\'item\', pack[0])" height="16px">\n            </span>\n          </p>\n        </div>\n      </section>\n      <section id="facBlocks" show.bind="viewPane.main == \'facBlocks\'">\n        <h3>Factory Blocks</h3>\n        <div click.delegate="select_FacBlock(player, true)" class=\'${viewPane.facBlock==player ? "selected":""}\'>player</div>\n        <div repeat.for="facBlock of facBlocks" click.delegate="select_FacBlock(facBlock)" class=\'${viewPane.facBlock==facBlock ? "selected":""}\'>\n          ${facBlock.name}:${facBlock.type}\n        </div>\n        <div>\n          <span class="button" click.delegate="add_FacBlock(\'factory\')">Add Factory Block</span>\n          <span class="button" click.delegate="add_FacBlock(\'bus\')">Add Bus Block</span>\n          <span class="button" click.delegate="add_FacBlock(\'resource\')">Add Resource Block</span>\n          <span class="button" click.delegate="add_FacBlock(\'research\')">Add Lab Block</span>\n        </div>\n      </section>\n      <section id="machines" if.bind="viewPane.main == \'entities\' && viewPlayer">\n        <div show.bind="viewPane.entityPane == \'mining\'">\n          <h4>Mining</h4>\n          <require from="./resources/elements/byModule/mining-infopane.html"></require>\n          <mining-infopane if.bind="viewPane.showingCat==\'miner\'" miner.bind="viewPane.showingItem" actor.bind="player" res-mgr.bind="mgrs.res" rounder.bind="rounder"></mining-infopane>\n          <div class="entityList">\n            <icon-base repeat.for="miner of viewPane.facBlock.getEntities(\'mining\') & signal:\'addedEntity\'" item.bind="miner" alt-image.bind="miner.mining.icon"\n                      click.delegate="showing(miner, \'miner\')" class.bind="miner.selectedClass"></icon-base>\n          </div>\n        </div>\n        <div show.bind="viewPane.entityPane == \'manuf\'">\n          <h4>Manufacturing</h4>\n          <require from="./resources/elements/byModule/crafting-infopane.html"></require>\n          <crafting-infopane if.bind="viewPane.showingCat==\'crafter\'" crafter.bind="viewPane.showingItem" rec-mgr.bind="mgrs.rec" item-mgr.bind="mgrs.item" actor.bind="player" inventory.bind="viewPane.facBlock.inv" rounder.bind="rounder"></crafting-infopane>\n          <div class="entityList">\n            <icon-base\n              repeat.for="crafter of viewPane.facBlock.getEntities(\'crafting\') & signal:\'addedEntity\'"\n              item.bind="crafter"\n              title.bind="crafter.name"\n              alt-image.bind="crafter.recipe.icon"\n              click.delegate="showing(crafter, \'crafter\')"\n              class.bind="crafter.selectedClass"\n            ></icon-base>\n          </div>\n        </div>\n        <div show.bind="viewPane.entityPane == \'labs\'">\n          <h4>Labs</h4>\n          <require from="./resources/elements/byModule/lab-infopane.html"></require>\n          <lab-infopane if.bind="viewPane.showingCat==\'labs\'" lab.bind="viewPane.showingItem" item-mgr.bind="mgrs.item" rounder.bind="rounder"></lab-infopane>\n          <div class="entityList">\n            <icon-base repeat.for="labee of viewPane.facBlock.getEntities(\'lab\') & signal:\'addedEntity\'" item.bind="labee" click.delegate="showing(labee, \'labs\')" class.bind="labee.selectedClass"></icon-base>\n          </div>\n        </div>\n      </section>\n      <section if.bind="viewPane.main == \'entities\' && !viewPlayer">\n        <require from="resources/elements/factoryBlocks/transportLine.html" as="transport-line"></require>\n        <require from="resources/elements/factoryBlocks/entityLine" as="entity-line"></require>\n        <require from="resources/elements/factoryBlocks/TransportLineUpgrades.html" as="tlu"></require>\n        Block Name: ${viewPane.facBlock.name}\n        <div if.bind="viewPane.facBlock.inputLine">\n          <p>\n            Feed From: ${viewPane.facBlock.feeds[0].name}\n            <span click.delegate="viewPane.facBlock.SelectBusFeed()">(Change)</span>\n          </p>\n          <transport-line\n            if.bind="viewPane.facBlock.inputLine"\n            line.bind="viewPane.facBlock.inputLine"\n            inv-click.call="CC.InvXFer(inv, player.inv, {stacks: [item]})"\n            type="input"\n          ></transport-line>\n          <tlu \n            upgrades.bind="viewPane.facBlock.upgrades.input"\n            apply-upgrade.call="viewPane.facBlock.ApplyUpgrade({\n              upgrade\n              ,inv: player.inv\n              ,line: viewPane.facBlock.inputLine\n            })"\n          ></tlu>\n          <hr>\n        </div>\n        <div repeat.for="line of viewPane.facBlock.lines">\n          <transport-line\n            if.bind="line.items"\n            line.bind="line"\n            type="internal"\n          ></transport-line>\n          <entity-line\n            if.bind="line.entities"\n            line.bind="line"\n          ></entity-line>\n        </div>\n        <div if.bind="viewPane.facBlock.outputLine">\n          <hr>\n          <p>\n            Drains To: ${viewPane.facBlock.drains[0].name}\n            <span click.delegate="viewPane.facBlock.SelectBusDrain()">(Change)</span>\n          </p>\n          <tlu\n            upgrades.bind="viewPane.facBlock.upgrades.output"\n            apply-upgrade.call="viewPane.facBlock.ApplyUpgrade({\n              upgrade\n              ,inv: player.inv\n              ,line: viewPane.facBlock.outputLine\n            })"\n          ></tlu>\n          <transport-line\n            if.bind="viewPane.facBlock.outputLine"\n            line.bind="viewPane.facBlock.outputLine"\n            inv-click.call="CC.InvXFer(inv, player.inv, {stacks: [item]})"\n            type="output"\n          ></transport-line>\n        </div>\n      </section>\n      <section id="menu" show.bind="viewPane.main==\'menu\'" style="z-index: 2000">\n        <div click.delegate="resetSave()">Reset Save</div>\n        <div click.delegate="resetDS()">Reset DataSource</div>\n        <div click.delegate="setDev()" if.bind="!showDev">Set Dev</div>\n        <div click.delegate="unsetDev()" if.bind="showDev">Unset Dev</div>\n        <div click.delegate="jumpStart()">JumpStart</div>\n        <div click.delegate="testing()">Testing()</div>\n\n      </section>\n    </article>\n  </div>\n  <div id="iconEditor" if.bind="viewPane==\'iconEditor\'">\n    <select value.bind="IE.select.Cat">\n      <option repeat.for="cat of IE.ds.old | objectKeys & signal:\'update\'" model.bind="cat">${cat}</option>\n    </select>\n    <select value.bind="IE.select.Icon">\n      <option repeat.for="icon of IE.ds.old[IE.select.Cat] | objectKeys & signal:\'update\'" model.bind="icon">${icon}</option>\n    </select>\n    <button click.delegate="IEshow()">Show</button><br>\n    <figcaption class="inline">Old</figcaption>\n    <img src.bind="IE.showOld & signal:\'update\'" height="64px" width="64px"/>\n    <img src.bind="IE.showNew & signal:\'update\'" height="64px" width="64px"/>\n    <figcaption class="inline">New</figcaption><br>\n    <input type="file" files.bind="IE.file" accept="image/*" change.delegate="IEfiled()">Select replace</input>\n    <img src.bind="IE.fileBlob"></img><br>\n    <button click.delegate="IEStore()">Store</button>\n    <button click.delegate="saveIconEditor()">SaveDB</button><br>\n    <button click.delegate="dlIconEditor()">Download</button>\n    <input type="file" name="name" files.bind="IE.upload" style="display:none" id="IconFileSelect" accept=".json" change.delegate="ulIconEditor()">\n    <button onclick="document.getElementById(\'IconFileSelect\').click();">Upload</button>\n  </div>\n  <section id="inventoryList">\n    <h3>Inventory</h3>\n    <inventory\n      items.bind="player.inv.items"\n      click-call.call="player.inv.click({\n         where:viewPane.facBlock, which: item\n        ,who: player, what:\'use\'\n        })"\n      ></inventory>\n  </section>\n  <div id="tutorial">\n    <div id="tut_pos" class="center">\n      <span id="tut_text"></span>\n      <button id="tut_button" class="center"></button>\n    </div>\n    <span click.delegate="hideTutorial()" note="off">X</span>\n  </div>\n  <section id="numSelectors">\n    <input type="checkbox" id="numSelToggle" style="display:none">\n    <label for="numSelToggle">Rounder&nbsp<span class="tabOnly">${mgrs.rounder.huns}${mgrs.rounder.tens}${mgrs.rounder.ones}</span>\n    </label>\n    <input id="huns" type="range" min="0" max="9" step="1" value.bind="mgrs.rounder.huns">\n    <input id="tens" type="range" min="0" max="9" step="1" value.bind="mgrs.rounder.tens">\n    <input id="ones" type="range" min="0" max="9" step="1" value.bind="mgrs.rounder.ones">\n    <span>${mgrs.rounder.huns}${mgrs.rounder.tens}${mgrs.rounder.ones}</span>\n    <label class="switch"><input type="checkbox" value.bind="mgrs.rounder.abs"><span class="slider text_abs_mod"></span></label>\n    <label class="switch"><input type="checkbox" value.bind="mgrs.rounder.fail"><span class="slider text_full_part"></span></label>\n  </section>\n  \x3c!-- section id="tagFilter">\n    <input id="drawer-toggle" type="checkbox" />\n    <label for="drawer-toggle" id="drawer-toggle-label">\n      <span>Filters</span>\n    </label>\n    <div id="drawer">\n      More Data!\n    </div> \n  </!--\x3e\n  \x3c!-- div id="commands" class="drawer bottom center" hidden>\n    <input type="checkbox" id="show_command_drawer">\n    <label class="cmd_label" for="show_command_drawer">\n      <span id="cmd_text">?</span>\n      <img src="xxxHTMLLINKxxx0.119695348654872640.15490667059629515xxx" id="cmd_icon" hidden>\n    </label>\n    <div class="content">\n      potatoes\n    </div>\n  </!--\x3e\n</template>\n'},wb4v:function(e,n,t){"use strict";t.d(n,"a",(function(){return s}));t("+Aae");var i=t("EfK0");function a(e,n){var t;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(t=function(e,n){if(!e)return;if("string"==typeof e)return r(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return r(e,n)}(e))||n&&e&&"number"==typeof e.length){t&&(e=t);var i=0;return function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return(t=e[Symbol.iterator]()).next.bind(t)}function r(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,i=new Array(n);t<n;t++)i[t]=e[t];return i}function s(e,n,t){if((null==t?void 0:t.debug)&&(console.log("debug:"),console.log(e),console.log(n),console.log(t)),0!=(null==t?void 0:t.maxXfer)){var r="entity"==(null==t?void 0:t.toAs)?"recieveItem":"addStack",s=0,o=function(a){(null==t?void 0:t.debug)&&console.log(a);var s=n[r](a);return(null==t?void 0:t.debug)&&console.log(s),s&&e.consumeAll(new i.b(a.name,s)),null==t||t.debug,s},c=(null==t?void 0:t.maxXfer)?function(e){return Math.min(e,t.maxXfer-s)}:function(e){return e};if(null==t?void 0:t.stacks)for(var l,d=a(t.stacks);!(l=d()).done;){o(l.value)}else for(var u,h=a(e.items);!(u=h()).done;){var m=u.value;if(m&&m.name&&0!=m.count&&((!(null==t?void 0:t.types)||t.types.includes(m.name))&&(s+=o({name:m.name,count:c(m.count)}),(null==t?void 0:t.debug)&&console.log("accum: "+s),(null==t?void 0:t.maxXfer)&&t.maxXfer==s)))return}}}t("0d46").a.InvXFer=s,globalThis.InvXFer=s}}]);
//# sourceMappingURL=app~f71cff67.e8760ca6252184b8a8de.bundle.map