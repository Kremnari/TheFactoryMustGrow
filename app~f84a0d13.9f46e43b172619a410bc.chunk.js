(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{app:function(e,s,n){"use strict";n.r(s),n.d(s,"App",(function(){return B}));var a,i=n("aurelia-templating-resources"),t=n("aurelia-framework"),c=n("/tIO"),o=n("8p7n"),l=n("uShe"),r=n("3Qvj"),d=n("Evr9"),f=n("463H"),h=n("0d46"),m=n("6juG"),u=n("7jDb"),v=n("FzzP");function p(e,s){var n;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=function(e,s){if(!e)return;if("string"==typeof e)return g(e,s);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return g(e,s)}(e))||s&&e&&"number"==typeof e.length){n&&(e=n);var a=0;return function(){return a>=e.length?{done:!0}:{done:!1,value:e[a++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return(n=e[Symbol.iterator]()).next.bind(n)}function g(e,s){(null==s||s>e.length)&&(s=e.length);for(var n=0,a=new Array(s);n<s;n++)a[n]=e[n];return a}function b(e,s,n,a,i,t,c){try{var o=e[t](c),l=o.value}catch(e){return void n(e)}o.done?s(l):Promise.resolve(l).then(a,i)}function k(e){return function(){var s=this,n=arguments;return new Promise((function(a,i){var t=e.apply(s,n);function c(e){b(t,a,i,c,o,"next",e)}function o(e){b(t,a,i,c,o,"throw",e)}c(void 0)}))}}function w(e,s){for(var n=0;n<s.length;n++){var a=s[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}var B=Object(t.d)(i.a,l.a,r.a,t.b)(a=function(){function e(e,s,n,a){var i=this;this.viewPane={main:"home",showingItem:null,version:"beta",loaded:!1},this.activeFeatures=Object(v.a)(),this.globals={land:{total:100,used:0,complexity:0,res_patches:1,res_patch_used:0,fac_block_costs:{factory:100,bus:100,research:100}},scanning:{nextCost:100,currentCost:0},attackWaves:{nextTimer:100,nextStrength:100,currentTimer:0}},this.viewHelpers={PlayerBlock:function(e){tfmg.select_FacBlock(tfmg.player,!0),tfmg.viewPane.main="entities"}},this.showTut=!0,this.dataBase={},this.viewRecCat=!1,this.tooltip=null,window.tfmg=this,this.signaler=e,s.onLoadComplete((function(e){i.init(e,n)})),s.beginLoad(),this.CCC=h.a,this.saveGame=s.saveGame,a.expressionObserver(this,"viewPane.main").subscribe((function(e,s){i.whenCheck(e,s,"main")}))}var s,n,a,i=e.prototype;return i.init=function(){var e=k(regeneratorRuntime.mark((function e(s,n){var a,i,t,l=this;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this.mgrs=s.mgrs,this.mgrs.DS=n,this.mgrs.baseApp=this,this.mgrs.signaler=this.signaler,s.save&&s.save.version==f.a){if(this.player=o.a.player.deserialize(this.mgrs,s.save.player),this.facBlocks=[],this.global=s.save.global,this.activeFeatures=s.save.features||Object(v.a)(),this.facBlocks.player=this.player,this.showTut=!1,s.save.facBlocks){for(a=p(s.save.facBlocks.set);!(i=a()).done;)t=i.value,this.facBlocks.push(c.a.deserialize(t));this.facBlocks.defenses=s.save.facBlocks.d,this.facBlocks.defenseBus=s.save.facBlocks.dbus,this.facBlocks.offenses=s.save.facBlocks.o,this.facBlocks.offenseBus=s.save.facBlocks.obus}}else this.facBlocks=[],this.player=new o.a.player(20),h.a.staticProvide("from","inventory",this.player.inv),this.mgrs.signaler.signal("generalUpdate");return this.mgrs.rec.set_player(this.player),this.mgrs.rec.sub_ticker(this.mgrs.Ticker),this.select_FacBlock(this.player,!0),u.a.Ticker_temp(this.mgrs.Ticker),u.a.addToTicker(this.facBlocks),this.mgrs.Ticker.subscribe((function(e){l.tickMine(e)})),e.next=13,this.mgrs.idb.get("dev");case 13:this.showDev=e.sent,this.showDev||(this.showTut&&d.a.start(),!this.showTut&&this.autoSave(),this.mgrs.Ticker.toggle());case 15:case"end":return e.stop()}}),e,this)})));return function(s,n){return e.apply(this,arguments)}}(),i.vrcToggle=function(e){this.viewRecCat=this.viewRecCat!=e&&e},i.autoSave=function(){var e=this;this.autoSave.sub?(this.mgrs.Ticker.dispose(this.autoSave.sub),this.autoSave.sub=null):this.autoSave.sub=this.mgrs.Ticker.subscribe((function(){e.save()}),f.c)},i.showing=function(e,s){var n=this;this.viewPane.showingItem&&(this.viewPane.showingItem.selectedClass="");var a=this.viewPane.showingItem;this.viewPane.showingItem=null,this.viewPane.showingCat="",e&&a!=e&&window.setTimeout((function(){e.selectedClass="selected",n.viewPane.showingItem=e,n.viewPane.showingCat=s}),0)},i.add_FacBlock=function(e,s){if(!(s=s||prompt("Enter Block Name")))return!1;if("resource"!=e){if(!(this.globals.land.available-this.globals.land.used<this.globals.land.fac_block_costs[e])){this.globals.land.used+=this.globals.land.fac_block_costs[e],this.globals.land.fac_block_costs[e]=Math.floor(1.2*this.globals.land.fac_block_costs[e]);var n=c.a.new(e,s);return this.facBlocks.push(n),n}m.c.error("not enough land available")}else globals.land.res_patches-globals.land.res_patch_used>0&&this.facBlocks.push(new c.a("resource",s))},i.select_FacBlock=function(e,s){void 0===s&&(s=!1),this.showItem=null,this.viewPane.facBlock=e,this.viewPlayer=s},i.adjustFeature=function(e){switch(e.feature){case"defense":this.activeFeatures.defense||(this.activeFeatures.defense=!0,this.facBlocks.defenses=o.a.DefenseBlock(),this.facBlocks.defenseBus=o.a.DefenseBus()),this.facBlocks.defenses.machines.turret=m.b.GameObjectFromPointer(e.go_pointer);break;case"offense":this.activeFeatures.offense||(this.activeFeatures.offense=!0,this.facBlocks.offenses=o.a.OffenseBlock(),this.facBlocks.offenseBus=o.a.OffenseBus()),this.facBlocks.offenses.radar=m.b.GameObjectFromPointer(e.go_pointer);break;case"factoryBlocks":this.activeFeatures.factoryBlocks=!0}},i.tickMine=function(e){var s,n,a,i,t,c;e.ticks%100||((null==(s=this.facBlocks)||null==(n=s.offenses)||null==(a=n.machines.radar)?void 0:a.count)&&(this.globals.scanning.currentCost+=1*this.facBlocks.offenses.machines.radar.count,this.globals.scanning.currentCost>=this.globals.scanning.nextCost&&(this.globals.scanning.currentCost-=this.globals.scanning.nextCost,this.globals.scanning.nextCost+=20,this.globals.land.total+=10,this.globals.land.res_patches=Math.floor(this.globals.land.total/100))),(null==(i=this.facBlocks)||null==(t=i.defenses)||null==(c=t.machines.turret)?void 0:c.count)&&(this.globals.attackWaves.currentTimer>this.globals.attackWaves.nextTimer?(this.globals.attackWaves.nextTimer=1.2^this.globals.attackWaves.nextTimer,this.globals.attackWaves.currentTime=0):this.globals.attackWaves.currentTimer++))},i.when=function(e,s){this.whenTarg={targ:e,cb:s},console.log("whenSet")},i.whenCheck=function(e,s,n){this.whenTarg&&(this.whenTarg.targ.entityPane&&this.viewPane.entityPane!=this.whenTarg.targ.entityPane||this.whenTarg.targ.main&&this.viewPane.main!=this.whenTarg.targ.main||(this.whenTarg.cb(),this.whenTarg=void 0))},i.save=function(){var e=k(regeneratorRuntime.mark((function e(){var s,n,a,i;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(s={player:{}},console.log("saving..."),s.version=f.a,s.techs=this.mgrs.tech.serialize(),s.player=this.player.serialize(),s.features=this.activeFeatures,s.facBlocks={set:[],d:this.facBlocks.defenses,dbus:this.facBlocks.defenseBus,o:this.facBlocks.offenses,obus:this.facBlocks.offenseBus},n=p(this.facBlocks);!(a=n()).done;)i=a.value,s.facBlocks.set.push(i.serialize&&i.serialize||i);s.global=this.global,this.saveGame(s),console.log("...done");case 11:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}(),i.jumpStart=function(){this.player.inv.add("inserter",10),this.player.inv.add("lab",10),this.player.inv.add("automation-science-pack",200),this.mgrs.tech.complete_research("steel-processing")},i.testing=function(){confirm("Initialize Testing?")&&(this.add_FacBlock("resource","iron-mine"),this.facBlocks[0].lines[0].AddEntity("burner-mining-drill"),this.facBlocks[0].lines[0].AddEntity("burner-mining-drill"),this.facBlocks[0].lines[0].SetEntityFn(this.mgrs.res.resList["iron-ore"]),this.add_FacBlock("factory","iron-plates"),this.facBlocks[1].lines[0].AddEntity("stone-furnace"),this.facBlocks[1].lines[0].AddEntity("stone-furnace"),this.facBlocks[1].lines[0].SetEntityFn(this.mgrs.rec.recipeList["iron-plate"]),this.add_FacBlock("resource","copper-mine"),this.facBlocks[2].lines[0].AddEntity("burner-mining-drill"),this.facBlocks[2].lines[0].AddEntity("burner-mining-drill"),this.facBlocks[2].lines[0].SetEntityFn(this.mgrs.res.resList["copper-ore"]),this.add_FacBlock("factory","copper-plates"),this.facBlocks[3].lines[0].AddEntity("stone-furnace"),this.facBlocks[3].lines[0].AddEntity("stone-furnace"),this.facBlocks[3].lines[0].SetEntityFn(this.mgrs.rec.recipeList["copper-plate"]),this.add_FacBlock("bus","plates"),this.facBlocks[0].AddBusDrain(this.facBlocks[1]),this.facBlocks[1].AddBusDrain(this.facBlocks[4]),this.facBlocks[2].AddBusDrain(this.facBlocks[3]),this.facBlocks[3].AddBusDrain(this.facBlocks[4]),this.player.inv.add("inserter",10))},i.nukeCache=function(){this.mgrs.idb.clear(),window.location.reload()},i.hideTutorial=function(){d.a.hide()},i.resetDS=function(){this.mgrs.idb.del("last_ds"),location.reload()},i.toggleDev=function(e){this.mgrs.idb.set("dev",!this.showDev),this.showDev=!this.showDev},i.resetSave=function(){this.saveGame()},s=e,(n=[{key:"showItem",set:function(e){var s=this;this.viewPane.showingItem&&(this.viewPane.showingItem.selectedClass="");var n=this.viewPane.showingItem;this.viewPane.showingItem=null,this.viewPane.showingCat="",e&&n!=e.item&&window.setTimeout((function(){e.item.selectedClass="selected",s.viewPane.showingItem=e.item,s.viewPane.showingCat=e.cat}),0)}}])&&w(s.prototype,n),a&&w(s,a),e}())||a},"app.html":function(e,s,n){e.exports='<template>\n  <require from="bootstrap/dist/css/bootstrap.min.css"></require>\n  <require from="@fortawesome/fontawesome-free/css/all.min.css"></require>\n  <require from="./styles.scss"></require>\n  <require from="./tfmg.scss"></require>\n  <require from="resources/elements/tool-tip"></require>\n  \x3c!-- from="resources/attributes/activeWhen"></!--\x3e\n\n  <div if.bind="viewPane.version==\'beta\'" beta>\n    <require from="./tfmg-beta.scss"></require>\n    <section class="statusBox"> \n      <div if.bind="!tooltip" click.delegate="viewPane.main=\'overview\'">\n        status box<br> \n        Land, pollution, enemies, oh my!<br>\n      </div>\n      <tool-tip display.bind="tooltip" item-mgr.bind="mgrs.item" recipe-mgr.bind="mgrs.rec"></tool-tip>\n    </section>\n    <nav>\n      <span click.delegate="viewPane.main=\'nav\'" class="fas fa-level-up-alt fa-rotate-90 ${viewPane.main==\'nav\'?\'selected\':\'\'}"></span>\n      <span click.delegate="viewPane.main=\'menu\'" class="fas fa-bars ${viewPane.main==\'menu\'?\'selected\':\'\'}" ></span>\n      <span click.delegate="viewPane.main=\'dev\'" class="fab fa-dev ${viewPane.main==\'dev\'?\'selected\':\'\'}" if.bind="showDev"></span>\n      <span class="fas spacer"></span>\n      <span click.delegate="viewPane.main=\'home\'" class="fas fa-user navHome ${viewPane.main==\'home\'?\'selected\':\'\'}"></span>\n      <span click.delegate="viewPane.main=\'entities\'" class="fas fa-toolbox navEntities ${viewPane.main==\'entities\'?\'selected\':\'\'}"></span>\n      <span click.delegate="viewPane.main=\'research\'" class="fas fa-drafting-compass navTechs ${viewPane.main==\'research\'?\'selected\':\'\'}"></span>\n      <span active-when.bind="activeFeatures[\'factoryBlocks\']" click.delegate="viewPane.main= activeFeatures[\'factoryBlocks\'] && \'facBlocks\'" class="fas fa-industry navFacBlocks ${viewPane.main==\'facBlocks\'?\'selected\':\'\'} ${activeFeatures[\'factoryBlocks\']? \'\': \'NYI\'}"></span>\n      <span click.delegate="viewPane.main= activeFeatures[\'factoryBlocks\'] && \'viewFacBlock\'" class="fas fa-industry navFacBlocks ${viewPane.main==\'viewFacBlock\'?\'selected\':\'\'} ${activeFeatures[\'factoryBlocks\']? \'\': \'NYI\'}"></span>\n      <span class="fas spacer"></span>\n      <span active-when.bind="activeFeatures[\'defense\']" click.delegate="viewPane.main= activeFeatures[\'defense\'] && \'defense\'" class="fab fa-fort-awesome navDefense ${viewPane.main==\'defense\'?\'selected\':\'\'} ${activeFeatures[\'defense\']? \'\': \'NYI\'}"></span>\n      <span active-when.bind="activeFeatures[\'offense\']" click.delegate="viewPane.main= activeFeatures[\'offense\'] && \'offense\'" class="fas fa-fighter-jet  navOffense ${viewPane.main==\'offense\'?\'selected\':\'\'} ${activeFeatures[\'offense\']? \'\': \'NYI\'}"></span>\n    </nav>\n    <main class="tfmg">\n      <section id="nav" if.bind="viewPane.main==\'nav\'">\n        <p click.delegate="viewPane.main=\'nav\'"><span class="fas fa-level-up-alt fa-rotate-90 selected" alt="verbose nav"></span>Expanded Nav</p>\n        <p click.delegate="viewPane.main=\'menu\'"><span class="fas fa-bars" ></span>Menu</p>\n        <p click.delegate="viewPane.main=\'dev\'"><span class="fab fa-dev" if.bind="showDev"></span>Dev Menu</p>\n        <p class="fas spacer"></p>\n        <p click.delegate="viewPane.main=\'home\'"><span class="fas fa-user navHome"></span>Player Home</p>\n        <p click.delegate="viewPane.main=\'entities\'"><span class="fas fa-toolbox navEntities"></span>Workshop</p>\n        <p click.delegate="viewPane.main=\'research\'"><span class="fas fa-drafting-compass navTechs"></span>Technologies</p>\n        <p click.delegate="viewPane.main= activeFeatures[\'factoryBlocks\'] && \'facBlocks\'"><span class="fas fa-industry navFacBlocks"></span>Factory Blocks List</p>\n        <p click.delegate="viewPane.main= activeFeatures[\'factoryBlocks\'] && \'viewFacBlock\'"><span class="fas fa-industry navFacBlocks"></span>View Factory Block</p>\n        <p class="fas spacer"></p> \n        <p click.delegate="viewPane.main= activeFeatures[\'defense\'] && \'defense\'"><span class="fab fa-fort-awesome navDefense"></span>Defenses</p>\n        <p click.delegate="viewPane.main= activeFeatures[\'offense\'] && \'offense\'"><span class="fas fa-fighter-jet navOffense"></span>Offenses</p>\n      </section>\n      <section id="menu" if.bind="viewPane.main==\'menu\'" style="z-index:2000">\n          <div click.delegate="resetSave()">Reset Save</div>\n          <div click.delegate="resetDS()">Reset DataSource</div>\n          <div click.delegate="toggleDev()" if.bind="!showDev">Dev On</div>\n          <a class="notLink" target="_blank" href="https://digitalpsigen.tech/biz_plans/TFMG_welcome.html">Investor Options <span class="fas fa-external-link-alt"></span></a>\n          <div class="iconRow">\n            <span class="fas fa-external-link-alt"></span>-&gt;\n            <a class="notLink" target="_blank" href="https://github.com/Kremnari/TheFactoryMustGrow"><span class="fab fa-github"></span></a>\n          </div>\n          <div id="email_sub">\n            <span click.delegate="showSubUp=!showSubUp">Subscribe for updates <span class="fas fa-chevron-down"></span>\n            <div if.bind="showSubUp">\n              \x3c!-- Begin Mailchimp Signup Form --\x3e\n              <link href="//cdn-images.mailchimp.com/embedcode/classic-10_7.css" rel="stylesheet" type="text/css">\n              <style type="text/css">\n                #mc_embed_signup{background:darkslategrey; clear:left; font:14px Helvetica,Arial,sans-serif; }\n                /* Add your own Mailchimp form style overrides in your site stylesheet or in this style block.\n                  We recommend moving this block and the preceding CSS link to the HEAD of your HTML file. */\n              </style>\n              <div id="mc_embed_signup">\n              <form action="https://digitalpsigen.us1.list-manage.com/subscribe/post?u=cf2e664fb607fff9109a1e9ec&amp;id=9fca87efa8" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>\n                  <div id="mc_embed_signup_scroll">\n                <h2>Subscribe for updates</h2>\n              <div class="indicates-required"><span class="asterisk">*</span> indicates required</div>\n              <div class="mc-field-group">\n                <label for="mce-EMAIL">Email Address  <span class="asterisk">*</span>\n              </label>\n                <input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL">\n              </div>\n              <div class="mc-field-group">\n                <label for="mce-FNAME">First Name </label>\n                <input type="text" value="" name="FNAME" class="" id="mce-FNAME">\n              </div>\n              <div class="mc-field-group">\n                <label for="mce-LNAME">Last Name </label>\n                <input type="text" value="" name="LNAME" class="" id="mce-LNAME">\n              </div>\n                <div id="mce-responses" class="clear">\n                  <div class="response" id="mce-error-response" style="display:none"></div>\n                  <div class="response" id="mce-success-response" style="display:none"></div>\n                </div>    \x3c!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups--\x3e\n                  <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_cf2e664fb607fff9109a1e9ec_9fca87efa8" tabindex="-1" value=""></div>\n                  <div class="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button"></div>\n                  </div>\n                  <span>Service provided by MailChimp</span>\n              </form>\n              </div>\n              <script type=\'text/javascript\' src=\'//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js\'><\/script><script type=\'text/javascript\'>(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]=\'EMAIL\';ftypes[0]=\'email\';fnames[1]=\'FNAME\';ftypes[1]=\'text\';fnames[2]=\'LNAME\';ftypes[2]=\'text\';}(jQuery));var $mcj = jQuery.noConflict(true);<\/script>\n              \x3c!--End mc_embed_signup--\x3e\n            </div>\n          </div>\n      </section>\n      <section id="devControls" if.bind="viewPane.main==\'dev\'">\n        <div click.delegate="save()">Save</div>\n        <div click.delegate="mgrs.Ticker.once()">Tick 1</div>\n        <div click.delegate="mgrs.Ticker.toggle()">${mgrs.Ticker.isRunning ? "Pause" : "Resume"}</div>\n        <div click.delegate="jumpStart()">JumpStart()</div>\n        <div click.delegate="testing()">Testing()</div>\n        <div click.delegate="nukeCache()">NukeCache</div>\n        <div click.delegate="viewPane.version = \'editData\'">Edit DataSource</div>\n        <div click.delegate="toggleDev()" if.bind="showDev">Dev Off</div>\n      </section>\n      <compose if.bind="viewPane.main==\'offense\' && activeFeatures[\'offense\']" view="./resources/elements/mainPanes/offensePane.html"></compose>\n      <compose if.bind="viewPane.main==\'defense\' && activeFeatures[\'defense\']" view="./resources/elements/mainPanes/defensePane.html"></compose>\n      <section id="playerHome" show.bind="viewPane.main==\'home\'">\n        <h3>Craftables</h3>\n        <div class="overflow" id="recipes">\n          <icon-base\n            repeat.for="rec of mgrs.rec.recipes_by_cats[\'hand_only\']  | objectValues "\n            item.bind="rec"\n            title = "${rec.name}"\n            click.delegate="mgrs.rec.startCraft(rec, player.inv, \' \')"\n            show.bind="rec.enabled"\n            class.bind="rec.classesStr"\n            anim_style.bind="rec.style"\n            metas.bind="{showEntity: true}"\n            mouseenter.trigger="tooltip = rec"\n            mouseleave.trigger="tooltip = null"\n          ></icon-base>\n        </div>\n        <div id="resources">\n          <h3>Mineables</h3>\n          <icon-base repeat.for="res of mgrs.res.resList | canMine | objectValues" item.bind="res" click.delegate="mgrs.res.mine(res.name, player.inv)"\n                    class="${res.mining ? \'mining\': null}" anim_style.bind="res.miningStyle"></icon-base> \n        </div>\n      </section>\n      <section id="machines" show.bind="viewPane.main==\'entities\'">\n          <h4>Workshop</h4>\n          <require from="./resources/elements/byModule/mining-infopane.html"></require>\n          <require from="./resources/elements/byModule/lab-infopane.html"></require>\n          <require from="./resources/elements/byModule/crafting-infopane.html"></require>\n          <mining-infopane if.bind="viewPane.showingItem[\'mining_speed\']" miner.bind="viewPane.showingItem" actor.bind="player" res-mgr.bind="mgrs.res" rounder.bind="rounder"></mining-infopane>\n          <crafting-infopane if.bind="viewPane.showingItem[\'crafting_speed\']" crafter.bind="viewPane.showingItem" rec-mgr.bind="mgrs.rec" item-mgr.bind="mgrs.item" actor.bind="player" inventory.bind="viewPane.facBlock.inv" rounder.bind="rounder"></crafting-infopane>\n          <lab-infopane if.bind="viewPane.showingItem[\'researching_speed\']" lab.bind="viewPane.showingItem" item-mgr.bind="mgrs.item" rounder.bind="rounder"></lab-infopane>\n          <div class="entityList">\n            <icon-base\n              repeat.for="machina of viewPane.facBlock.getEntities() & signal:\'addedEntity\'"\n              item.bind="machina"\n              alt-image.bind="machina.recipe.icon || machina.mining.icon"\n              click.delegate="showing(machina)"\n              class.bind="machina.selectedClass"\n            ></icon-base>\n          </div>\n      </section>\n      <section id="facBlocks" show.bind="viewPane.main==\'facBlocks\' && activeFeatures[\'factoryBlocks\']">\n        <h3>Factory Blocks</h3>\n        <div id="facBlocks stats">\n          <ul>\n            <li>Land use: ${globals.land.used}</li>\n            <li>Land available: ${globals.land.total-globals.land.used}</li>\n            <li>Complexity Rating: ${globals.land.complexity}</li>\n          </ul>\n        </div>\n        <table>\n          <tr><th>Block Type</th><th>Land Cost</th></tr>\n          \x3c!--# need to replace the numbers in column 2  --\x3e\n          <tr><td>Factory Block</td> <td>${globals.land.fac_block_costs.factory}</td> <td class="btn" click.delegate="add_FacBlock(\'factory\')">Add</td></tr>\n          <tr><td>Bus Block</td>     <td>${globals.land.fac_block_costs.bus}</td>     <td class="btn" click.delegate="add_FacBlock(\'bus\')">Add</td></tr>\n          <tr><td>Lab Block</td>     <td>${globals.land.fac_block_costs.research}</td><td class="btn" click.delegate="add_FacBlock(\'research\')">Add</td></tr>\n        </table>\n        <span class="button" click.delegate="add_FacBlock(\'resource\')">Add Resource Block</span>\n        <span>Available resource patches: ${globals.land.res_patches-globals.land.res_patch_used}</span>\n        \x3c!-- div>\n          <span click.delegate="select_FacBlock(facBlocks.defenses)" class="${viewPane.facBlock==facBlocks.defenses ? \'selected\': \'\'}" if.bind="facBlocks.defenses">Defenses</span>\n          <span click.delegate="select_FacBlock(facBlocks.defenseBus)" class="${viewPane.facBlock==facBlocks.defenseBus ? \'selected\': \'\'}" if.bind="facBlocks.defenseBus">Defense Bus</span>\n          <span click.delegate="select_FacBlock(facBlocks.offenses)" class="${viewPane.facBlock==facBlocks.offenses ? \'selected\': \'\'}" if.bind="facBlocks.offenses">Defenses</span>\n          <span click.delegate="select_FacBlock(facBlocks.offenseBus)" class="${viewPane.facBlock==facBlocks.offenseBus ? \'selected\': \'\'}" if.bind="facBlocks.offenseBus">Defenses</span>\n        </!--\x3e\n        <div>\n          <div repeat.for="facBlock of facBlocks" click.delegate="select_FacBlock(facBlock)" class=\'${viewPane.facBlock==facBlock ? "selected":""}\'>\n            ${facBlock.name}:${facBlock.type}\n          </div>\n        </div>\n      </section>\n      <compose id="viewFacBlock" if.bind="viewPane.main==\'viewFacBlock\'" view="./resources/elements/factoryBlocks/mainView.html" containerless></compose>\n      <compose id="viewBusLine"  if.bind="viewPane.main==\'viewBusLine\'"  view="./resources/elements/factoryBlocks/busView.html"></compose>\n\n      <section id="technologies" show.bind="viewPane.main==\'research\'">\n        <h3>Research</h3>\n        <require from="./resources/elements/byModule/tech-infopane.html"></require>\n        <tech-infopane if.bind="viewPane.showingCat==\'tech\'" tech.bind="viewPane.showingItem" tech-mgr.bind="mgrs.tech" tooltip.bind="tooltip"></tech-infopane>\n        <div class="overflow">\n          <icon-base\n            repeat.for="tech of mgrs.tech.shownTechs & signal:\'techUpdate\'"\n            click.delegate="showItem = {item: tech, cat: \'tech\'}"\n            item.bind="tech"\n            class="${mgrs.tech.researching==tech ? \'researching\' : \'\'} ${tech.researched ? \'researched\': \'\'} ${viewPane.showingItem==tech ? \'selected\': \'\'}"\n          >\n          </icon-base>\n        </div>\n        <div class="sem_removed">\n          <h5>Filters</h5>\n          <p>Filter Complete<button click.delegate="mgrs.tech.toggleFilter(\'complete\')">${mgrs.tech.filters.ShowComplete? "Hide":"Show"}</button></p>\n          <p>Filter Pack:\n            <span repeat.for="pack of mgrs.tech.filters.ShowPack | objectEntries & signal:\'techUpdate\'"\n              class="${pack[1]? \'selected\':\'\'}" click.delegate="mgrs.tech.toggleFilter(\'byPack\', pack[0])"\n              >\n              <img src.bind="mgrs.icon.getSrc(\'item\', pack[0])" height="16px">\n            </span>\n          </p>\n        </div>\n      </section>\n      <section id="overview" show.bind="viewPane.main==\'overview\'">\n        <span>Available land: ${globals.land.total-globals.land.used}</span>\n        <span>Pollution:</span>\n        <span>Scan Progress: ${globals.scanning.currentCost}/${globals.scanning.nextCost}</span><br>\n        <span>Attack Timer: ${globals.attackWaves.currentTimer}/${globals.attackWaves.nextTimer}</span><br>\n        <span>Enemy Strength: </span>\n      </section>\n      <div id="inventoryList">\n        \x3c!-- TODO create a delete mode, but should utilize a command wheel --\x3e\n        <h3>Inventory</h3>\n        <inventory\n          items.bind="player.inv.items"\n          click-call.call="player.inv.click({\n            where:viewPane.facBlock, which: item\n            ,who: player, what:\'use\'\n            })"\n          ></inventory>\n      </div>\n\n    </main>\n    <div id="tutorial">\n      <div id="tut_pos" class="center">\n        <span id="tut_text"></span>\n        <button id="tut_button" class="center"></button>\n      </div>\n      <span click.delegate="hideTutorial()" note="off">X</span>\n    </div>\n    <div id="ChameleonModal">\n      <div class="center">\n        <span id="ChameleonMessage"></span><br>\n        <button id="ChameleonButton" class="btn">Close</button>\n      </div>\n    </div>\n    <section class="tabs">\n      <require from="resources/components/tabPopout"></require>\n      <tab-popout class="tab_bottom_left" id="numSelectors" if.bind="activeFeatures[\'rounder\']">\n        <div slot="tab">\n          Rounder&nbsp<span class="tabOnly">${mgrs.rounder.huns}${mgrs.rounder.tens}${mgrs.rounder.ones}</span>\n        </div>\n        <div slot="content">\n          <compose view="resources/elements/rounderTab.html"></compose>\n        </div>\n      </tab-popout>\n      <tab-popout class="tab_bottom_right">\n        <div slot="tab">\n          Filters\n        </div>\n        <require from="resources/elements/popouts/filtersPopout.html"></require>\n        <filtersPopout slot="content"></filtersPopout>\n      </tab-popout>\n    </section>\n  </div>\n  <div id="editDataSource" if.bind="viewPane.version==\'editData\'">\n    <require from="resources/elements/dataEditor"></require>\n    <data-editor></data-editor>\n  </div>\n  \x3c!-- div id="loadingAnim">\n    I\'m loading!\n  </!--\x3e\n</template>\n'}}]);
//# sourceMappingURL=app~f84a0d13.9f46e43b172619a410bc.bundle.map