(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{app:function(e,n,i){"use strict";i.r(n),i.d(n,"App",(function(){return k}));var s,a=i("aurelia-templating-resources"),t=i("aurelia-framework"),c=i("8p7n"),r=i("uShe"),l=i("3Qvj"),o=i("Evr9"),d=i("463H"),f=i("0d46"),p=i("6juG"),v=i("FzzP");function u(e,n){var i;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(i=function(e,n){if(!e)return;if("string"==typeof e)return h(e,n);var i=Object.prototype.toString.call(e).slice(8,-1);"Object"===i&&e.constructor&&(i=e.constructor.name);if("Map"===i||"Set"===i)return Array.from(e);if("Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))return h(e,n)}(e))||n&&e&&"number"==typeof e.length){i&&(e=i);var s=0;return function(){return s>=e.length?{done:!0}:{done:!1,value:e[s++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return(i=e[Symbol.iterator]()).next.bind(i)}function h(e,n){(null==n||n>e.length)&&(n=e.length);for(var i=0,s=new Array(n);i<n;i++)s[i]=e[i];return s}function m(e,n,i,s,a,t,c){try{var r=e[t](c),l=r.value}catch(e){return void i(e)}r.done?n(l):Promise.resolve(l).then(s,a)}function g(e){return function(){var n=this,i=arguments;return new Promise((function(s,a){var t=e.apply(n,i);function c(e){m(t,s,a,c,r,"next",e)}function r(e){m(t,s,a,c,r,"throw",e)}c(void 0)}))}}function b(e,n){for(var i=0;i<n.length;i++){var s=n[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}var k=Object(t.d)(a.a,r.a,l.a,t.b)(s=function(){function e(e,n,i,s){var a=this;this.viewPane={main:"home",showingItem:null,version:"beta"},this.activeFeatures=Object(v.a)(),this.globals={land:{total:100,used:0,complexity:0,res_patches:1}},this.viewHelpers={PlayerBlock:function(e){tfmg.select_FacBlock(tfmg.player,!0),tfmg.viewPane.main="entities",tfmg.viewPane.entityPane=e}},this.showTut=!0,this.dataBase={},this.viewRecCat=!1,this.tooltip=null,window.tfmg=this,this.signaler=e,n.onLoadComplete((function(e){a.init(e,i)})),n.beginLoad(),this.CC=f.a,this.Cham=p.b,this.saveGame=n.saveGame,s.expressionObserver(this,"viewPane.main").subscribe((function(e,n){a.whenCheck(e,n,"main")})),s.expressionObserver(this,"viewPane.entityPane").subscribe((function(e,n){a.whenCheck(e,n,"entityPane")}))}var n,i,s,a=e.prototype;return a.init=function(){var e=g(regeneratorRuntime.mark((function e(n,i){var s,a,t;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this.mgrs=n.mgrs,this.mgrs.DS=i,this.mgrs.baseApp=this,this.mgrs.signaler=this.signaler,n.save&&n.save.version==d.a){if(this.player=c.b.player.deserialize(this.mgrs,n.save.player),this.facBlocks=[],this.global=n.save.global,this.facBlocks.player=this.player,this.showTut=!1,n.save.facBlocks){for(s=u(n.save.facBlocks.set);!(a=s()).done;)t=a.value,this.facBlocks.push(c.a.deserialize(t));this.facBlocks.defenses=n.save.facBlocks.d,this.facBlocks.defenseBus=n.save.facBlocks.dbus,this.facBlocks.offenses=n.save.facBlocks.o,this.facBlocks.offenseBus=n.save.facBlocks.obus}}else this.facBlocks=[],this.player=new c.b.player(20),this.mgrs.signaler.signal("generalUpdate");return this.mgrs.rec.set_player(this.player),this.mgrs.rec.sub_ticker(this.mgrs.Ticker),this.select_FacBlock(this.player,!0),e.next=10,this.mgrs.idb.get("dev");case 10:this.showDev=e.sent,this.showDev||(this.showTut&&o.a.start(),!this.showTut&&this.autoSave(),this.mgrs.Ticker.toggle());case 12:case"end":return e.stop()}}),e,this)})));return function(n,i){return e.apply(this,arguments)}}(),a.vrcToggle=function(e){this.viewRecCat=this.viewRecCat!=e&&e},a.hideTutorial=function(){o.a.hide()},a.resetDS=function(){this.mgrs.idb.del("last_ds"),location.reload()},a.setDev=function(){this.mgrs.idb.set("dev",!0),this.showDev=!0},a.unsetDev=function(){this.mgrs.idb.set("dev",!1),this.showDev=!1},a.autoSave=function(){var e=this;this.autoSave.sub?(this.mgrs.Ticker.dispose(this.autoSave.sub),this.autoSave.sub=null):this.autoSave.sub=this.mgrs.Ticker.subscribe((function(){e.save()}),d.c)},a.resetSave=function(){this.saveGame()},a.showing=function(e,n){var i=this;this.viewPane.showingItem&&(this.viewPane.showingItem.selectedClass="");var s=this.viewPane.showingItem;this.viewPane.showingItem=null,this.viewPane.showingCat="",e&&s!=e&&window.setTimeout((function(){e.selectedClass="selected",i.viewPane.showingItem=e,i.viewPane.showingCat=n}),0)},a.add_FacBlock=function(e,n){if(!(n=n||prompt("Enter Block Name")))return!1;if(!(this.globals.land.available-this.globals.land.used<10)){this.globals.land.used+=10;var i=new c.a(e,n);return this.facBlocks.push(i),i}console.log("not enough land available")},a.select_FacBlock=function(e,n){void 0===n&&(n=!1),this.showItem=null,this.viewPane.facBlock=e,this.viewPlayer=n},a.adjustFeature=function(e){switch(e.feature){case"defense":this.activeFeatures.defense||(this.activeFeatures.defense=!0,this.facBlocks.defenses=c.b.DefenseBlock(),this.facBlocks.defenseBus=c.b.DefenseBus()),this.facBlocks.defenses.machines.turret=p.b.GameObjectFromPointer(e.go_pointer);break;case"offense":this.activeFeatures.offense||(this.activeFeatures.offense=!0,this.facBlocks.offenses=c.b.OffenseBlock(),this.facBlocks.offenseBus=c.b.OffenseBus());break;case"factoryBlocks":this.activeFeatures.factoyBlocks=!0}},a.when=function(e,n){this.whenTarg={targ:e,cb:n},console.log("whenSet")},a.whenCheck=function(e,n,i){this.whenTarg&&(this.whenTarg.targ.entityPane&&this.viewPane.entityPane!=this.whenTarg.targ.entityPane||this.whenTarg.targ.main&&this.viewPane.main!=this.whenTarg.targ.main||(this.whenTarg.cb(),this.whenTarg=void 0))},a.save=function(){var e=g(regeneratorRuntime.mark((function e(){var n,i,s,a;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(n={player:{}},console.log("saving..."),n.version=d.a,n.techs=this.mgrs.tech.serialize(),n.player=this.player.serialize(),n.facBlocks={set:[],d:this.facBlocks.defenses.serialize(),dbus:this.facBlocks.defenseBus.serialize(),o:this.facBlocks.offenses.serialize(),obus:this.facBlocks.offenseBus.serialize()},i=u(this.facBlocks);!(s=i()).done;)a=s.value,n.facBlocks.set.push(a.serialize());n.global=this.global,this.saveGame(n),console.log("...done");case 10:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}(),a.jumpStart=function(){this.player.inv.add("burner-mining-drill",2),this.player.inv.add("assembling-machine-1",2),this.player.inv.add("lab",2),this.player.inv.add("automation-science-pack",200)},a.testing=function(){confirm("Initialize Testing?")&&(this.player2=new PlayerBlock(10),this.add_FacBlock("resource","iron-mine"),this.facBlocks[0].lines[0].AddEntity("burner-mining-drill"),this.facBlocks[0].lines[0].AddEntity("burner-mining-drill"),this.facBlocks[0].lines[0].SetEntityFn(this.mgrs.res.resList["iron-ore"]),this.add_FacBlock("factory","iron-plates"),this.facBlocks[1].lines[0].AddEntity("stone-furnace"),this.facBlocks[1].lines[0].AddEntity("stone-furnace"),this.facBlocks[1].lines[0].SetEntityFn(this.mgrs.rec.recipeList["iron-plate"]),this.add_FacBlock("resource","copper-mine"),this.facBlocks[2].lines[0].AddEntity("burner-mining-drill"),this.facBlocks[2].lines[0].AddEntity("burner-mining-drill"),this.facBlocks[2].lines[0].SetEntityFn(this.mgrs.res.resList["copper-ore"]),this.add_FacBlock("factory","copper-plates"),this.facBlocks[3].lines[0].AddEntity("stone-furnace"),this.facBlocks[3].lines[0].AddEntity("stone-furnace"),this.facBlocks[3].lines[0].SetEntityFn(this.mgrs.rec.recipeList["copper-plate"]),this.add_FacBlock("bus","plates"),this.facBlocks[0].AddBusDrain(this.facBlocks[1]),this.facBlocks[1].AddBusDrain(this.facBlocks[4]),this.facBlocks[2].AddBusDrain(this.facBlocks[3]),this.facBlocks[3].AddBusDrain(this.facBlocks[4]),this.player.inv.add("inserter",10))},a.nukeCache=function(){this.mgrs.idb.clear(),window.reload()},n=e,(i=[{key:"showItem",set:function(e){var n=this;this.viewPane.showingItem&&(this.viewPane.showingItem.selectedClass="");var i=this.viewPane.showingItem;this.viewPane.showingItem=null,this.viewPane.showingCat="",e&&i!=e.item&&window.setTimeout((function(){e.item.selectedClass="selected",n.viewPane.showingItem=e.item,n.viewPane.showingCat=e.cat}),0)}}])&&b(n.prototype,i),s&&b(n,s),e}())||s},"app.html":function(e,n,i){e.exports='<template>\n  <require from="bootstrap/dist/css/bootstrap.min.css"></require>\n  <require from="@fortawesome/fontawesome-free/css/all.min.css"></require>\n  <require from="./styles.scss"></require>\n  <require from="./tfmg.scss"></require>\n  <require from="resources/elements/tool-tip"></require>\n  \x3c!-- from="resources/attributes/activeWhen"></!--\x3e\n\n  <div if.bind="viewPane.version==\'beta\'" beta>\n    <require from="./tfmg-beta.scss"></require>\n    <section class="statusBox"> \n      <div if.bind="!tooltip" click.delegate="viewPane.main=\'overview\'">\n        status box<br> \n        Land, pollution, enemies, oh my!\n      </div>\n      <tool-tip display.bind="tooltip" item-mgr.bind="mgrs.item" recipe-mgr.bind="mgrs.rec"></tool-tip>\n    </section>\n    <nav>\n      <span click.delegate="viewPane.main=\'nav\'" class="fas fa-level-up-alt fa-rotate-90 ${viewPane.main==\'nav\'?\'selected\':\'\'}"></span>\n      <span click.delegate="viewPane.main=\'menu\'" class="fas fa-bars ${viewPane.main==\'menu\'?\'selected\':\'\'}" ></span>\n      <span click.delegate="viewPane.main=\'dev\'" class="fab fa-dev ${viewPane.main==\'dev\'?\'selected\':\'\'}" if.bind="showDev"></span>\n      <span class="fas spacer"></span>\n      <span click.delegate="viewPane.main=\'home\'" class="fas fa-user navHome ${viewPane.main==\'home\'?\'selected\':\'\'}"></span>\n      <span click.delegate="viewPane.main=\'entities\'" class="fas fa-toolbox navEntities ${viewPane.main==\'entities\'?\'selected\':\'\'}"></span>\n\n\n      <span active-when.bind="activeFeatures[\'factoryBlocks\']" click.delegate="viewPane.main=\'facBlocks\'" class="fas fa-industry navFacBlocks ${viewPane.main==\'facBlocks\'?\'selected\':\'\'} ${activeFeatures[\'factoryBlocks\']? \'\': \'NYI\'}"></span>\n      <span click.delegate="viewPane.main=\'research\'" class="fas fa-drafting-compass navTechs ${viewPane.main==\'research\'?\'selected\':\'\'}"></span>\n      <span class="fas spacer"></span>\n      <span active-when.bind="activeFeatures[\'defense\']" click2.when_active="viewPane.main=\'defense\'" class="fab fa-fort-awesome navDefense ${viewPane.main==\'defense\'?\'selected\':\'\'} ${activeFeatures[\'defense\']? \'\': \'NYI\'}" class2.when_inactive="NYI"></span>\n      <span active-when.bind="activeFeatures[\'offense\']" click2.when_active="viewPane.main=\'offense\'" class="fas fa-fighter-jet  navOffense ${viewPane.main==\'offense\'?\'selected\':\'\'} ${activeFeatures[\'offense\']? \'\': \'NYI\'}" class2.when_inactive="NYI"></span>\n    </nav>\n    <main class="tfmg">\n      <section id="nav" if.bind="viewPane.main==\'nav\'">\n        <p click.delegate="viewPane.main=\'nav\'"><span class="fas fa-level-up-alt fa-rotate-90 selected" alt="verbose nav"></span>Expanded Nav</p>\n        <p click.delegate="viewPane.main=\'menu\'"><span class="fas fa-bars" ></span>Menu</p>\n        <p click.delegate="viewPane.main=\'dev\'"><span class="fab fa-dev" if.bind="showDev"></span>Dev Menu</p>\n        <p class="fas spacer"></p>\n\n        <p click.delegate="viewPane.main=\'home\'"><span class="fas fa-user navHome"></span>Player Home</p>\n        <p click.delegate="viewPane.main=\'entities\'"><span class="fas fa-toolbox navEntities"></span>Workshop</p>\n        <p class="fas spacer"></p>\n  \n        <p click.delegate="viewPane.main=\'facBlocks\'"><span class="fas fa-industry navFacBlocks"></span>Factory Blocks</p>\n        <p click.delegate="viewPane.main=\'research\'"><span class="fas fa-drafting-compass navTechs"></span>Technologies</p>\n      </section>\n      <section id="menu" if.bind="viewPane.main==\'menu\'" style="z-index:2000">\n          <div click.delegate="resetSave()">Reset Save</div>\n          <div click.delegate="resetDS()">Reset DataSource</div>\n          <div click.delegate="setDev()" if.bind="!showDev">Set Dev</div>\n          <div click.delegate="unsetDev()" if.bind="showDev">Unset Dev</div>\n          <div click.delegate="jumpStart()">JumpStart()</div>\n          <div click.delegate="testing()">Testing()</div>\n          <a class="notLink" target="_blank" href="https://digitalpsigen.tech/biz_plans/TFMG_welcome.html">Investor Options <span class="fas fa-external-link-alt"></span></a>\n          <div class="iconRow">\n            <span class="fas fa-external-link-alt"></span>-&gt;\n            <a class="notLink" target="_blank" href="https://github.com/Kremnari/TheFactoryMustGrow"><span class="fab fa-github"></span></a>\n          </div>\n          <div id="email_sub">\n            <span click.delegate="showSubUp=!showSubUp">Subscribe for updates <span class="fas fa-chevron-down"></span>\n            <div if.bind="showSubUp">\n              \x3c!-- Begin Mailchimp Signup Form --\x3e\n              <link href="//cdn-images.mailchimp.com/embedcode/classic-10_7.css" rel="stylesheet" type="text/css">\n              <style type="text/css">\n                #mc_embed_signup{background:darkslategrey; clear:left; font:14px Helvetica,Arial,sans-serif; }\n                /* Add your own Mailchimp form style overrides in your site stylesheet or in this style block.\n                  We recommend moving this block and the preceding CSS link to the HEAD of your HTML file. */\n              </style>\n              <div id="mc_embed_signup">\n              <form action="https://digitalpsigen.us1.list-manage.com/subscribe/post?u=cf2e664fb607fff9109a1e9ec&amp;id=9fca87efa8" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>\n                  <div id="mc_embed_signup_scroll">\n                <h2>Subscribe for updates</h2>\n              <div class="indicates-required"><span class="asterisk">*</span> indicates required</div>\n              <div class="mc-field-group">\n                <label for="mce-EMAIL">Email Address  <span class="asterisk">*</span>\n              </label>\n                <input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL">\n              </div>\n              <div class="mc-field-group">\n                <label for="mce-FNAME">First Name </label>\n                <input type="text" value="" name="FNAME" class="" id="mce-FNAME">\n              </div>\n              <div class="mc-field-group">\n                <label for="mce-LNAME">Last Name </label>\n                <input type="text" value="" name="LNAME" class="" id="mce-LNAME">\n              </div>\n                <div id="mce-responses" class="clear">\n                  <div class="response" id="mce-error-response" style="display:none"></div>\n                  <div class="response" id="mce-success-response" style="display:none"></div>\n                </div>    \x3c!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups--\x3e\n                  <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_cf2e664fb607fff9109a1e9ec_9fca87efa8" tabindex="-1" value=""></div>\n                  <div class="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button"></div>\n                  </div>\n                  <span>Service provided by MailChimp</span>\n              </form>\n              </div>\n              <script type=\'text/javascript\' src=\'//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js\'><\/script><script type=\'text/javascript\'>(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]=\'EMAIL\';ftypes[0]=\'email\';fnames[1]=\'FNAME\';ftypes[1]=\'text\';fnames[2]=\'LNAME\';ftypes[2]=\'text\';}(jQuery));var $mcj = jQuery.noConflict(true);<\/script>\n              \x3c!--End mc_embed_signup--\x3e\n            </div>\n          </div>\n      </section>\n      <section id="devControls" if.bind="viewPane.main==\'dev\'">\n        <div click.delegate="save()">Save</div>\n        <div click.delegate="resetSave()">Start Anew</div>\n        <div click.delegate="mgrs.Ticker.once()">Tick 1</div>\n        <div click.delegate="mgrs.Ticker.toggle()">${mgrs.Ticker.isRunning ? "Pause" : "Resume"}</div>\n        <div click.delegate="testing()">Testing...</div>\n        <div click.delegate="nukeCache()">NukeCache</div>\n        <div click.delegate="viewPane.version = \'editData\'">Edit DataSource</div>\n      </section>\n      <compose if.bind="viewPane.main==\'offense\'" view="./resources/elements/mainPanes/offensePane.html"></compose>\n      <compose if.bind="viewPane.main==\'defense\'" view="./resources/elements/mainPanes/defensePane.html"></compose>\n      <section id="playerHome" show.bind="viewPane.main==\'home\'">\n        <h3>Craftables</h3>\n        <div class="overflow" id="recipes">\n          <icon-base\n            repeat.for="rec of mgrs.rec.recipes_by_cats[\'hand_only\']  | objectValues "\n            item.bind="rec"\n            title = "${rec.name}"\n            click.delegate="mgrs.rec.startCraft(rec, player.inv, \' \')"\n            show.bind="rec.enabled"\n            class.bind="rec.classesStr"\n            anim_class.bind="rec.style"\n            mouseenter.trigger="tooltip = rec"\n            mouseleave.trigger="tooltip = null"\n          ></icon-base>\n        </div>\n        <div id="resources">\n          <h3>Mineables</h3>\n          <icon-base repeat.for="res of mgrs.res.resList | canMine | objectValues" item.bind="res" click.delegate="mgrs.res.mine(res.name, player.inv)"\n                    class="${res.mining ? \'mining\': null}" anim_style.bind="res.miningStyle"></icon-base> \n        </div>\n        <div id="inventoryList">\n          <h3>Inventory</h3>\n          <inventory\n            items.bind="player.inv.items"\n            click-call.call="player.inv.click({\n              where:viewPane.facBlock, which: item\n              ,who: player, what:\'use\'\n              })"\n            ></inventory>\n        </div>\n      </section>\n      <section id="machines" show.bind="viewPane.main==\'entities\'">\n        <div show.bind="viewPlayer">\n          <h4>Workshop</h4>\n          <require from="./resources/elements/byModule/mining-infopane.html"></require>\n          <require from="./resources/elements/byModule/lab-infopane.html"></require>\n          <require from="./resources/elements/byModule/crafting-infopane.html"></require>\n          <mining-infopane if.bind="viewPane.showingItem[\'mining_speed\']" miner.bind="viewPane.showingItem" actor.bind="player" res-mgr.bind="mgrs.res" rounder.bind="rounder"></mining-infopane>\n          <crafting-infopane if.bind="viewPane.showingItem[\'crafting_speed\']" crafter.bind="viewPane.showingItem" rec-mgr.bind="mgrs.rec" item-mgr.bind="mgrs.item" actor.bind="player" inventory.bind="viewPane.facBlock.inv" rounder.bind="rounder"></crafting-infopane>\n          <lab-infopane if.bind="viewPane.showingItem[\'researching_speed\']" lab.bind="viewPane.showingItem" item-mgr.bind="mgrs.item" rounder.bind="rounder"></lab-infopane>\n          <div class="entityList">\n            <icon-base\n              repeat.for="machina of viewPane.facBlock.getEntities() & signal:\'addedEntity\'"\n              item.bind="machina"\n              alt-image.bind="machina.recipe.icon || machina.mining.icon"\n              click.delegate="showing(machina)"\n              class.bind="machina.selectedClass"\n            ></icon-base>\n          </div>\n          <div id="inventoryList">\n            <h3>Inventory</h3>\n            <inventory\n              items.bind="player.inv.items"\n              click-call.call="player.inv.click({\n                where:viewPane.facBlock, which: item\n                ,who: player, what:\'use\'\n                })"\n              ></inventory>\n          </div>\n        </div>\n        <div show.bind="!viewPlayer">\n          <require from="resources/elements/factoryBlocks/transportLine.html" as="transport-line"></require>\n          <require from="resources/elements/factoryBlocks/entityLine" as="entity-line"></require>\n          <require from="resources/elements/factoryBlocks/TransportLineUpgrades.html" as="tlu"></require>\n          Block Name: ${viewPane.facBlock.name}\n          <div if.bind="viewPane.facBlock.inputLine">\n            <p>\n              Feed From: ${viewPane.facBlock.feeds[0].name}\n              <span click.delegate="viewPane.facBlock.SelectBusFeed()">(Change)</span>\n            </p>\n            <transport-line\n              if.bind="viewPane.facBlock.inputLine"\n              line.bind="viewPane.facBlock.inputLine"\n              inv-click.call="CC.InvXFer(inv, player.inv, {stacks: [item]})"\n              type="input"\n            ></transport-line>\n            <tlu \n              upgrades.bind="viewPane.facBlock.upgrades.input"\n              apply-upgrade.call="viewPane.facBlock.ApplyUpgrade({\n                upgrade\n                ,inv: player.inv\n                ,line: viewPane.facBlock.inputLine\n              })"\n            ></tlu>\n            <hr>\n          </div>\n          <div repeat.for="line of viewPane.facBlock.lines">\n            <transport-line\n              if.bind="line.items"\n              line.bind="line"\n              type="internal"\n            ></transport-line>\n            <entity-line\n              if.bind="line.entities"\n              line.bind="line"\n            ></entity-line>\n          </div>\n          <div if.bind="viewPane.facBlock.outputLine">\n            <hr>\n            <p>\n              Drains To: ${viewPane.facBlock.drains[0].name}\n              <span click.delegate="viewPane.facBlock.SelectBusDrain()">(Change)</span>\n            </p>\n            <tlu\n              upgrades.bind="viewPane.facBlock.upgrades.output"\n              apply-upgrade.call="viewPane.facBlock.ApplyUpgrade({\n                upgrade\n                ,inv: player.inv\n                ,line: viewPane.facBlock.outputLine\n              })"\n            ></tlu>\n            <transport-line\n              if.bind="viewPane.facBlock.outputLine"\n              line.bind="viewPane.facBlock.outputLine"\n              inv-click.call="CC.InvXFer(inv, player.inv, {stacks: [item]})"\n              type="output"\n            ></transport-line>\n          </div>\n        </div>\n      </section>\n      <section id="facBlocks" show.bind="viewPane.main==\'facBlocks\'">\n        <h3>Factory Blocks</h3>\n        <div id="facBlocks stats">\n          <ul>\n            <li>Land use: ${globals.land.used}</li>\n            <li>Land available: ${globals.land.total-globals.land.used}</li>\n            <li>Complexity Rating: ${globals.land.complexity</li>\n          </ul>\n        </div>\n        <div>\n          <span click.delegate="select_FacBlock(player, true)" class=\'${viewPane.facBlock==player ? "selected":""}\'>Player Workshop</span>\n          <span click.delegate="select_FacBlock(facBlocks.defenses)" class="${viewPane.facBlock==facBlocks.defenses ? \'selected\': \'\'}" if.bind="facBlocks.defenses">Defenses</span>\n          <span click.delegate="select_FacBlock(facBlocks.defenseBus)" class="${viewPane.facBlock==facBlocks.defenseBus ? \'selected\': \'\'}" if.bind="facBlocks.defenseBus">Defense Bus</span>\n          <span click.delegate="select_FacBlock(facBlocks.offenses)" class="${viewPane.facBlock==facBlocks.offenses ? \'selected\': \'\'}" if.bind="facBlocks.offenses">Defenses</span>\n          <span click.delegate="select_FacBlock(facBlocks.offenseBus)" class="${viewPane.facBlock==facBlocks.offenseBus ? \'selected\': \'\'}" if.bind="facBlocks.offenseBus">Defenses</span>\n        </div>\n        <div>\n          <div repeat.for="facBlock of facBlocks" click.delegate="select_FacBlock(facBlock)" class=\'${viewPane.facBlock==facBlock ? "selected":""}\'>\n            ${facBlock.name}:${facBlock.type}\n          </div>\n        </div>\n\n        <table>\n          <caption>Classify new Factory Block</caption>\n          <tr><th>Block Type</th><th>Land Cost</th></tr>\n          <tr class="button"><td>Factory Block</td> <td>25</td><td class="btn" click.delegate="add_FacBlock(\'factory\')">Add</td></tr>\n          <tr class="button"><td>Bus Block</td>     <td>10</td><td class="btn" click.delegate="add_FacBlock(\'bus\')">Add</td></tr>\n          <tr class="button"><td>Lab Block</td>     <td>25</td><td class="btn" click.delegate="add_FacBlock(\'research\')">Add</td></tr>\n        </table>\n        <span class="button" click.delegate="add_FacBlock(\'resource\')">Add Resource Block</span>\n        <span>Available resource patches: ${globals.land.res_patches}</span>\n      </section>\n      <section id="technologies" show.bind="viewPane.main==\'research\'">\n        <h3>Research</h3>\n        <require from="./resources/elements/byModule/tech-infopane.html"></require>\n        <tech-infopane if.bind="viewPane.showingCat==\'tech\'" tech.bind="viewPane.showingItem" tech-mgr.bind="mgrs.tech" tooltip.bind="tooltip"></tech-infopane>\n        <div class="overflow">\n          <icon-base\n            repeat.for="tech of mgrs.tech.shownTechs & signal:\'techUpdate\'"\n            click.delegate="showItem = {item: tech, cat: \'tech\'}"\n            item.bind="tech"\n            count.bind="tech.prerequisites.length"\n            class="${mgrs.tech.researching==tech ? \'researching\' : \'\'} ${tech.researched ? \'researched\': \'\'} ${viewPane.showingItem==tech ? \'selected\': \'\'}"\n          >\n          </icon-base>\n        </div>\n        <div>\n          <h5>Filters</h5>\n          <p>Filter Complete<button click.delegate="mgrs.tech.toggleFilter(\'complete\')">${mgrs.tech.filters.ShowComplete? "Hide":"Show"}</button></p>\n          <p>Filter Pack:\n            <span repeat.for="pack of mgrs.tech.filters.ShowPack | objectEntries & signal:\'techUpdate\'"\n              class="${pack[1]? \'selected\':\'\'}" click.delegate="mgrs.tech.toggleFilter(\'byPack\', pack[0])"\n              >\n              <img src.bind="mgrs.icon.getSrc(\'item\', pack[0])" height="16px">\n            </span>\n          </p>\n        </div>\n      </section>\n      <section id="overview" show.bind="viewPane.main==\'overview\'">\n        Overview stats\n      </section>\n    </main>\n    <div id="tutorial">\n      <div id="tut_pos" class="center">\n        <span id="tut_text"></span>\n        <button id="tut_button" class="center"></button>\n      </div>\n      <span click.delegate="hideTutorial()" note="off">X</span>\n    </div>\n    <section class="tabs">\n      <require from="resources/components/tabPopout"></require>\n      <tab-popout class="tab_bottom_left" id="numSelectors">\n        <div slot="tab">\n          Rounder&nbsp<span class="tabOnly">${mgrs.rounder.huns}${mgrs.rounder.tens}${mgrs.rounder.ones}</span>\n        </div>\n        <div slot="content">\n          <compose view="resources/elements/rounderTab.html"></compose>\n        </div>\n      </tab-popout>\n      <tab-popout class="tab_bottom_right">\n        <div slot="tab">\n          Filters\n        </div>\n        <require from="resources/elements/popouts/filtersPopout.html"></require>\n        <filtersPopout slot="content"></filtersPopout>\n      </tab-popout>\n    </section>\n  </div>\n  <div id="editDataSource" if.bind="viewPane.version==\'editData\'">\n    <require from="resources/elements/dataEditor"></require>\n    <data-editor></data-editor>\n  </div>\n</template>\n'}}]);
//# sourceMappingURL=app~f84a0d13.fa916e5f53013a5f12ec.bundle.map