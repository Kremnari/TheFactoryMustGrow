(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{app:function(e,n,a){"use strict";a.r(n),a.d(n,"App",(function(){return h}));var s,i=a("aurelia-templating-resources"),t=a("aurelia-framework"),c=a("uShe"),o=a("3Qvj"),l=a("463H"),r=a("0d46"),d=a("6juG"),v=a("7jDb"),m=a("iVgR"),p=a("Evr9");function u(e,n,a,s,i,t,c){try{var o=e[t](c),l=o.value}catch(e){return void a(e)}o.done?n(l):Promise.resolve(l).then(s,i)}function f(e,n){for(var a=0;a<n.length;a++){var s=n[a];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}var h=Object(t.d)(i.a,c.a,o.a,t.b)(s=function(){function e(e,n,a,s){var i=this;this.viewPane={main:"home",showingItem:null,version:"beta",loaded:!1},this.showTut=!0,this.dataBase={},this.viewRecCat=!1,this.tooltip=null,window.tfmg=this,this.signaler=e,this.IgorJs=v.a,v.a.initialize({commandTasker:r.b,viewTasker:d.b,ticker:{ticks_perSec:l.d,ticks_maxPhase:l.c},dbName:"TheFactoryMustGrow",saveName:"SaveGame"}),n.onLoadComplete((function(e){i.init(e,a)})),n.beginLoad(),this.CCC=r.a,this.Tutorial=p.a,this.save=function(){v.a.saveGame(),i.autoSave(),i.autoSave()},s.expressionObserver(this,"viewPane.main").subscribe((function(e,n){i.whenCheck(e,n,"main")}))}var n,a,s,i=e.prototype;return i.init=function(){var e,n=(e=regeneratorRuntime.mark((function e(n,a){var s=this;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.mgrs=n.mgrs,this.mgrs.baseApp=this,this.mgrs.signaler=this.signaler,this.mgrs.Ticker=v.a.Ticker,d.b.signaler=this.signaler,this.ChameView=d.b,r.b.initialize({dialogSvc:a,dataSet:n.mgrs.data}),Object(m.a)(),e.next=10,v.a.loadDatabase(n.mgrs.data);case 10:return this.dataSet=v.a.dataSet,this.globals=v.a.globalObject,r.b.setRunner(v.a.getRunner()),this.IgorRunner=v.a.getRunner(),v.a.setNamed("player.inventory",this.globals.player.inv),v.a.setNamed("research",this.globals.research),v.a.setNamed("global",this.globals),r.a.staticProvide("player","inventory",this.globals.player.inv),r.a.staticProvide("service","rounder",this.mgrs.rounder),d.a.setClassFn("canCraft",(function(e){return e.ingredients.every((function(e){return s.IgorRunner.processTEMP(s.globals.player.inv.items,"inventory.total",{name:e.name})>=e.amount}))?"recipeEnabled":"recipeDisabled"})),d.a.setViewFn("recipeFilter",(function(e){return Object.values(s.IgorRunner.data.recipe).filter((function(n){return(void 0===n.enabled||n.enabled||s.globals.unlocked_recipes.includes(n.name))&&(Array.isArray(e)&&e.includes(n.category)||n.category==e)}))})),d.a.setViewFn("objectValues",(function(e){return Object.values(e)})),d.a.setViewFn("technologyFilter",(function(e){return Object.values(tfmg.dataSet.technology).filter((function(n){return!n.prerequisites||n.prerequisites.every((function(n){return e[n]}))}))})),this.signaler.signal("generalUpdate"),e.next=26,this.mgrs.idb.get("dev");case 26:this.showDev=e.sent,this.showDev||(v.a.setState("start"),this.globals.activeFeatures.tutorial?p.a.start(this):this.autoSave());case 28:case"end":return e.stop()}}),e,this)})),function(){var n=this,a=arguments;return new Promise((function(s,i){var t=e.apply(n,a);function c(e){u(t,s,i,c,o,"next",e)}function o(e){u(t,s,i,c,o,"throw",e)}c(void 0)}))});return function(e,a){return n.apply(this,arguments)}}(),i.autoSave=function(){var e=this;this.autoSave.sub?(this.mgrs.Ticker.dispose(this.autoSave.sub),this.autoSave.secs=function(){return 0},this.autoSave.sub=null):(this.autoSave.sub=this.mgrs.Ticker.subscribe((function(){v.a.saveGame()}),l.c),this.autoSave.secs=function(){return Math.floor((l.c-v.a.Ticker.ticks+e.autoSave.sub.phase)/l.d)})},i.when=function(e,n){this.whenTarg={targ:e,cb:n},console.log("whenSet")},i.whenCheck=function(e,n,a){this.whenTarg&&(this.whenTarg.targ.entityPane&&this.viewPane.entityPane!=this.whenTarg.targ.entityPane||this.whenTarg.targ.main&&this.viewPane.main!=this.whenTarg.targ.main||(this.whenTarg.cb(),this.whenTarg=void 0))},i.nukeCache=function(){this.mgrs.idb.clear(),window.location.reload()},i.hideTutorial=function(){p.a.clearTut()},i.resetDS=function(){this.mgrs.idb.del("last_ds"),location.reload()},i.toggleDev=function(e){this.mgrs.idb.set("dev",!this.showDev),this.showDev=!this.showDev},i.resetSave=function(){v.a.commands("resetSave")&&location.reload()},i.jumpStart=function(){this.globals.player.inv.items.push({name:"lab",count:10}),this.globals.player.inv.items.push({name:"automation-science-pack",count:200}),this.globals.player.inv.items.push({name:"inserter",count:50}),this.globals.player.inv.items.push({name:"iron-chest",count:50}),this.globals.player.inv.items.push({name:"stone",count:25}),this.globals.player.inv.items.push({name:"burner-mining-drill",count:5})},n=e,(a=[{key:"showItem",set:function(e){var n=this,a=this.viewPane.showingItem;this.viewPane.showingItem=null,this.viewPane.showingCat="",e&&a!=e.item&&window.setTimeout((function(){n.viewPane.showingItem=e.item,n.viewPane.showingCat=e.cat,e.view&&(n.viewPane.main=e.view)}),0)}}])&&f(n.prototype,a),s&&f(n,s),e}())||s},"app.html":function(e,n,a){e.exports='<template>\n  <require from="bootstrap/dist/css/bootstrap.min.css"></require>\n  <require from="@fortawesome/fontawesome-free/css/all.min.css"></require>\n  <require from="./styles.scss"></require>\n  <require from="./tfmg.scss"></require>\n  <require from="resources/elements/tool-tip"></require>\n  \x3c!-- from="resources/attributes/activeWhen"></!--\x3e\n\n  <div if.bind="viewPane.version==\'beta\'" beta>\n    <require from="./tfmg-beta.scss"></require>\n    <section class="statusBox"> \n      <div if.bind="!tooltip && viewPane.main!=\'facBlocks\'" click.delegate="viewPane.main=\'overview\'">\n        status box<br> \n        Land, pollution, enemies, oh my!<br>\n        AutoSave: <span>${autoSave.secs() & signal:\'generalUpdate\'}s</span>\n      </div>\n      <div if.bind="viewPane.main==\'facBlocks\'" class="container facBlockStats">\n        <div class="row align-items-center justify-content-around">\n          <div class="col">\n            <div>Land available: ${globals.land.total-globals.land.used}</div>\n            <div>Land use: ${globals.land.used}</div>\n          </div>\n          <div class="col">\n            <div>Complexity Total: ${globals.land.complexity}</div>\n            <div>Available resource patches: ${globals.land.res_patches-globals.land.res_patch_used}</div>\n          </div>\n        </div>\n      </div>\n      <tool-tip\n        display.bind="tooltip"\n        item-mgr.bind="mgrs.item"\n        recipe-mgr.bind="mgrs.rec"\n        if.bind="tooltip"\n      ></tool-tip>\n    </section>\n    <nav>\n      <span click.delegate="viewPane.main=\'nav\'" class="fas fa-level-up-alt fa-rotate-90 ${viewPane.main==\'nav\'?\'selected\':\'\'}"></span>\n      <span click.delegate="viewPane.main=\'menu\'" class="fas fa-bars ${viewPane.main==\'menu\'?\'selected\':\'\'}" ></span>\n      <span click.delegate="viewPane.main=\'dev\'" class="fab fa-dev ${viewPane.main==\'dev\'?\'selected\':\'\'}" if.bind="showDev"></span>\n      <span class="fas spacer"></span>\n      <span click.delegate="viewPane.main=\'home\'" class="fas fa-user navHome ${viewPane.main==\'home\'?\'selected\':\'\'}"></span>\n      <span click.delegate="viewPane.main=\'entities\'" class="fas fa-toolbox navEntities ${viewPane.main==\'entities\'?\'selected\':\'\'}"></span>\n      <span click.delegate="viewPane.main=\'research\'" class="fas fa-drafting-compass navTechs ${viewPane.main==\'research\'?\'selected\':\'\'}"></span>\n      <span\n        click.delegate="globals.activeFeatures[\'factoryBlocks\'] && (viewPane.main=\'facBlocks\')"\n        class="far fa-object-ungroup navFacBlocks ${viewPane.main==\'facBlocks\'?\'selected\':\'\'} ${globals.activeFeatures[\'factoryBlocks\']? \'\': \'NYI\' & signal:\'generalUpdate\'}"\n      ></span>\n      <span\n        click.delegate="globals.activeFeatures[\'factoryBlocks\'] && (viewPane.main=\'viewFacBlock\')"\n        class="fas fa-industry navFacBlocks ${viewPane.main==\'viewFacBlock\'?\'selected\':\'\'} ${globals.activeFeatures[\'factoryBlocks\']? \'\': \'NYI\' & signal:\'generalUpdate\'}"\n      ></span>\n      <span class="fas spacer"></span>\n      <span active-when.bind="globals.activeFeatures[\'defense\']" click.delegate="globals.activeFeatures[\'defense\'] && (viewPane.main=\'defense\')" class="fab fa-fort-awesome navDefense ${viewPane.main==\'defense\'?\'selected\':\'\'} ${globals.activeFeatures[\'defense\']? \'\': \'NYI\'}"></span>\n      <span active-when.bind="globals.activeFeatures[\'offense\']" click.delegate="globals.activeFeatures[\'offense\'] && (viewPane.main=\'offense\')" class="fas fa-fighter-jet  navOffense ${viewPane.main==\'offense\'?\'selected\':\'\'} ${globals.activeFeatures[\'offense\']? \'\': \'NYI\'}"></span>\n    </nav>\n    <main class="tfmg" click.capture="CCC.provide($event, \'global\', \'game\', globals)">\n      <section id="nav" if.bind="viewPane.main==\'nav\'">\n        <p click.delegate="viewPane.main=\'nav\'"><span class="fas fa-level-up-alt fa-rotate-90 selected" alt="verbose nav"></span>Expanded Nav</p>\n        <p click.delegate="viewPane.main=\'menu\'"><span class="fas fa-bars" ></span>Menu</p>\n        <p click.delegate="viewPane.main=\'dev\'"><span class="fab fa-dev" if.bind="showDev"></span>Dev Menu</p>\n        <p class="fas spacer"></p>\n        <p click.delegate="viewPane.main=\'home\'"><span class="fas fa-user navHome"></span>Player Home</p>\n        <p click.delegate="viewPane.main=\'entities\'"><span class="fas fa-toolbox navEntities"></span>Workshop</p>\n        <p click.delegate="viewPane.main=\'research\'"><span class="fas fa-drafting-compass navTechs"></span>Technologies</p>\n        <p click.delegate="viewPane.main=\'facBlocks\'"><span class="far fa-object-ungroup navFacBlocks"></span>Factory Blocks List</p>\n        <p click.delegate="viewPane.main=\'viewFacBlock\'"><span class="fas fa-industry navFacBlocks"></span>View Factory Block</p>\n        <p class="fas spacer"></p> \n        <p click.delegate="globals.activeFeatures[\'defense\'] && (viewPane.main=\'defense\')"><span class="fab fa-fort-awesome navDefense"></span>Defenses</p>\n        <p click.delegate="globals.activeFeatures[\'offense\'] && (viewPane.main=\'offense\')"><span class="fas fa-fighter-jet navOffense"></span>Offenses</p>\n      </section>\n      <section id="menu" if.bind="viewPane.main==\'menu\'" style="z-index:2000">\n        <div click.delegate="save()">Save</div>\n        <div click.delegate="resetSave()">Reset Save</div>\n        <div click.delegate="resetDS()">Reset DataSource</div>\n        <div click.delegate="toggleDev()" if.bind="!showDev">Dev On</div>\n        <a class="notLink" target="_blank" href="https://digitalpsigen.tech/biz_plans/TFMG_welcome.html">Investor Options <span class="fas fa-external-link-alt"></span></a>\n        <div class="iconRow">\n          <span class="fas fa-external-link-alt"></span>-&gt;\n          <a class="notLink" target="_blank" href="https://github.com/Kremnari/TheFactoryMustGrow"><span class="fab fa-github"></span></a>\n        </div>\n        <div id="email_sub">\n          <span click.delegate="showSubUp=!showSubUp">Subscribe for updates <span class="fas fa-chevron-down"></span>\n          <div if.bind="showSubUp">\n            \x3c!-- Begin Mailchimp Signup Form --\x3e\n            <link href="//cdn-images.mailchimp.com/embedcode/classic-10_7.css" rel="stylesheet" type="text/css">\n            <style type="text/css">\n              #mc_embed_signup{background:darkslategrey; clear:left; font:14px Helvetica,Arial,sans-serif; }\n              /* Add your own Mailchimp form style overrides in your site stylesheet or in this style block.\n                We recommend moving this block and the preceding CSS link to the HEAD of your HTML file. */\n            </style>\n            <div id="mc_embed_signup">\n            <form action="https://digitalpsigen.us1.list-manage.com/subscribe/post?u=cf2e664fb607fff9109a1e9ec&amp;id=9fca87efa8" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>\n                <div id="mc_embed_signup_scroll">\n              <h2>Subscribe for updates</h2>\n            <div class="indicates-required"><span class="asterisk">*</span> indicates required</div>\n            <div class="mc-field-group">\n              <label for="mce-EMAIL">Email Address  <span class="asterisk">*</span>\n            </label>\n              <input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL">\n            </div>\n            <div class="mc-field-group">\n              <label for="mce-FNAME">First Name </label>\n              <input type="text" value="" name="FNAME" class="" id="mce-FNAME">\n            </div>\n            <div class="mc-field-group">\n              <label for="mce-LNAME">Last Name </label>\n              <input type="text" value="" name="LNAME" class="" id="mce-LNAME">\n            </div>\n              <div id="mce-responses" class="clear">\n                <div class="response" id="mce-error-response" style="display:none"></div>\n                <div class="response" id="mce-success-response" style="display:none"></div>\n              </div>    \x3c!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups--\x3e\n                <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_cf2e664fb607fff9109a1e9ec_9fca87efa8" tabindex="-1" value=""></div>\n                <div class="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button"></div>\n                </div>\n                <span>Service provided by MailChimp</span>\n            </form>\n            </div>\n            <script type=\'text/javascript\' src=\'//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js\'><\/script><script type=\'text/javascript\'>(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]=\'EMAIL\';ftypes[0]=\'email\';fnames[1]=\'FNAME\';ftypes[1]=\'text\';fnames[2]=\'LNAME\';ftypes[2]=\'text\';}(jQuery));var $mcj = jQuery.noConflict(true);<\/script>\n            \x3c!--End mc_embed_signup--\x3e\n          </div>\n        </div>\n      </section>\n      <section id="devControls" if.bind="viewPane.main==\'dev\'">\n        <div click.delegate="IgorJs.setState(\'tick\')">Tick 1</div>\n        <div click.delegate="IgorJs.setState(\'toggle\')">${IgorJs.Ticker.isRunning ? "Pause" : "Resume"}</div>\n        <div click.delegate="jumpStart()">JumpStart()</div>\n        <div click.delegate="testing()">Testing()</div>\n        <div click.delegate="nukeCache()">NukeCache</div>\n        <div click.delegate="viewPane.version = \'editData\'">Edit DataSource</div>\n        <div click.delegate="toggleDev()" if.bind="showDev">Dev Off</div>\n      </section>\n      <compose if.bind="viewPane.main==\'offense\' && globals.activeFeatures[\'offense\']" view="./resources/elements/mainPanes/offensePane.html"></compose>\n      <compose if.bind="viewPane.main==\'defense\' && globals.activeFeatures[\'defense\']" view="./resources/elements/mainPanes/defensePane.html"></compose>\n      <section id="playerHome" show.bind="viewPane.main==\'home\'">\n        <h3>Craftables</h3>\n        <div class="overflow" id="recipes">\n          <icon-base\n            repeat.for="rec of ChameView.viewFn.recipeFilter(\'crafting\') & signal: \'generalUpdate\'"\n            item.bind="rec"\n            title = "${rec.name}"\n            click.delegate="CCC.issue(\'player.craft\', {\'which.recipe\': rec } )"\n            class.bind="ChameView.classFn.canCraft(rec) & signal:\'generalUpdate\'"\n            metas.bind="{showEntity: true}"\n            mouseenter.trigger="tooltip = rec"\n            mouseleave.trigger="tooltip = null"\n          ></icon-base>\n        </div>\n        <div id="resources">\n          <h3>Mineables</h3>\n          <icon-base\n            repeat.for="res of dataSet.resource | canMine | objectValues"\n            item.bind="res"\n            click.delegate="CCC.issue(\'resources.mine\', { \'which.resource\': res })"\n            class2="${res.mining ? \'mining\': null} "\n          ></icon-base> \n        </div>\n      </section>\n      <section id="machines" show.bind="viewPane.main==\'entities\'" click.capture="CCC.provide($event, \'at\', \'entity\', viewPane.showingItem)">\n          <h4>Workshop</h4>\n          <compose if.bind="viewPane.showingItem[\'crafting_speed\']" view="./resources/elements/byModule/crafting-infopane.html"></compose>\n          <compose if.bind="viewPane.showingItem[\'mining_speed\']" view="./resources/elements/byModule/mining-infopane.html"></compose>\n          <compose if.bind="viewPane.showingItem[\'researching_speed\']" view="./resources/elements/byModule/lab-infopane.html"></compose>\n          <div class="entityList">\n            <icon-base\n              repeat.for="machina of IgorJs.arrayFromIds(globals.player.workshop.entities) & signal:\'addedEntity\'"\n              item.bind="machina"\n              alt-image.bind="machina.recipe.icon || machina.mining.icon"\n              click.delegate="showItem = {item: machina}"\n              class="${viewPane.showingItem == machina ? \'selected\':\'\'}"\n            ></icon-base>\n          </div>\n      </section>\n      <section id="facBlocks" show.bind="viewPane.main==\'facBlocks\'" class="container">\n        <h3>Factory Blocks</h3>\n        <div class="row">\n          <div click.delegate="select_FacBlock(facBlocks.defenses)" class="${viewPane.facBlock==facBlocks.defenses ? \'selected\': \'\'}" if.bind="facBlocks.defenses">Defenses</div>\n          <div click.delegate="select_FacBlock(facBlocks.offenses)" class="${viewPane.facBlock==facBlocks.offenses ? \'selected\': \'\'}" if.bind="facBlocks.offenses">Offenses</div>\n        </div>\n        <div class="row">\n          <div click.delegate="select_FacBlock(facBlocks.defenseBus)" class="${viewPane.facBlock==facBlocks.defenseBus ? \'selected\': \'\'}" if.bind="facBlocks.defenseBus">Defense Bus</div>\n          <div click.delegate="select_FacBlock(facBlocks.offenseBus)" class="${viewPane.facBlock==facBlocks.offenseBus ? \'selected\': \'\'}" if.bind="facBlocks.offenseBus">Offenses Bus</div>\n        </div>\n        <div class="row">\n          <div class="card">\n            <div class="card-header">\n              <h5>Resource Patch</h5>\n              <span click.delegate="CCC.issue(\'facBlock.newResBlock\', {}, $event)" class="newFacBlock resBlock">Add New...</span>\n            </div>\n            <div class="card-body">\n              <div\n                repeat.for="resBlock of IgorJs.arrayFromIds(globals.facBlocks.resBlocks) & signal:\'addedEntity\'"\n                click.delegate="showItem={item: resBlock, view: \'viewFacBlock\'}"\n                class="${viewPane.showingItem==resBlock ? \'selected\':\'\'} resBlockList"\n              >${resBlock.name}</div>\n            </div>\n          </div>\n          <div class="card">\n            <div class="card-header">\n              <h5>Buses</h5>\n              <span click.delegate="CCC.issue(\'facBlock.newBus\', {}, $event)" class="newFacBlock busLine">New cost ${globals.land.fac_block_costs.bus}</span>\n            </div>\n            <div class="card-body">\n              <div\n                repeat.for="facBus of IgorJs.arrayFromIds(globals.facBlocks.buses) & signal:\'addedEntity\'"\n                click.delegate="showItem={item: facBus, view: \'viewFacBlock\'}"\n                class="${viewPane.showingItem==facBus ? \'selected\':\'\'} busLineList">\n                ${facBus.name}\n              </div>\n            </div>\n          </div>\n          <div class="card">\n            <div class="card-header">\n              <h5>Factory Blocks</h5>\n              <span click.delegate="CCC.issue(\'facBlock.newBlock\', {}, $event)" class="newFacBlock facBlock">New cost ${globals.land.fac_block_costs.factory}</span>\n            </div>\n            <div class="card-body">\n              <div\n                repeat.for="facBlock of IgorJs.arrayFromIds(globals.facBlocks.blocks) & signal:\'addedEntity\'"\n                click.delegate="showItem={item: facBlock, view: \'viewFacBlock\'}"\n                class=\'${viewPane.showingItem==facBlock ? "selected":""} facBlockList\'>\n                ${facBlock.name}\n              </div>\n            </div>\n          </div>\n          <div class="card">\n            <div class="card-header">\n              <h5>Tech Blocks</h5>\n              <span click.delegate="CCC.issue(\'facBlock.newTechBlock\', {}, $event)" class="newFacBlock techBlock">New cost ${globals.land.fac_block_costs.research}</span>\n            </div>\n            <div class="card-body">\n              <div\n                repeat.for="techBlock of IgorJs.arrayFromIds(globals.facBlocks.techBlocks) & signal:\'addedEntity\'"\n                click.delegate="showItem={item: techBlock, view: \'viewFacBlock\'}"\n                class="${viewPane.showingItem==techBlock ? \'selected\':\'\'} techBlockList"\n              >${techBlock.name}</div>\n            </div>\n          </div>\n        </div>\n      </section>\n      <section show.bind="viewPane.main==\'viewFacBlock\'">\n        <compose\n          id="viewFacBlock"\n          class="container"\n          if.bind="viewPane.main==\'viewFacBlock\' && viewPane.showingItem.$_type==\'FactoryBlock\'"\n          view="./resources/elements/factoryBlocks/mainView.html"\n        ></compose>\n        <compose\n          id="viewBusLine"\n          class="container"\n          if.bind="viewPane.main==\'viewFacBlock\' && viewPane.showingItem.$_type==\'FactoryBus\'"\n          view="./resources/elements/factoryBlocks/busView.html"\n        ></compose>\n        <compose\n          id="viewResBlock"\n          class="container"\n          if.bind="viewPane.main==\'viewFacBlock\' && viewPane.showingItem.$_type==\'ResourceBlock\'"\n          view="./resources/elements/factoryBlocks/resView.html"\n        ></compose>\n      </section>\n      <section id="technologies" show.bind="viewPane.main==\'research\'">\n        <h3>Research</h3>\n        <compose view="./resources/elements/byModule/tech-infopane.html" if.bind="viewPane.showingCat==\'tech\'" tech.bind="viewPane.showingItem" tech-mgr.bind="mgrs.tech" tooltip.bind="tooltip"></compose>\n        <div class="overflow">\n          <icon-base\n            repeat.for="tech of ChameView.viewFn.technologyFilter(globals.research.completed) & signal:\'generalUpdate\'"\n            click.delegate="showItem = {item: tech, cat: \'tech\'}"\n            item.bind="tech"\n            class="${globals.research.progressing.name==tech.name ? \'researching\' : \'\'} ${globals.research.completed[tech.name] ? \'researched\': \'\'} ${viewPane.showingItem==tech ? \'selected\': \'\'}"\n          >\n          </icon-base>\n        </div>\n        <div class="sem_removed">\n          <h5>Filters</h5>\n          <p>Filter Complete<button click.delegate="mgrs.tech.toggleFilter(\'complete\')">${mgrs.tech.filters.ShowComplete? "Hide":"Show"}</button></p>\n          <p>Filter Pack:\n            <span\n              repeat.for="pack of mgrs.tech.filters.ShowPack | objectEntries & signal:\'techUpdate\'"\n              class="${pack[1]? \'selected\':\'\'}"\n              click.delegate="mgrs.tech.toggleFilter(\'byPack\', pack[0])"\n              >\n              <img src.bind="mgrs.icon.getSrc(\'item\', pack[0])" height="16px">\n            </span>\n          </p>\n        </div>\n      </section>\n      <section id="overview" show.bind="viewPane.main==\'overview\'">\n        <span>Available land: ${globals.land.total-globals.land.used}</span>\n        <span>Pollution:</span>\n        <span>Scan Progress: ${globals.scanning.currentCost}/${globals.scanning.nextCost}</span><br>\n        <span>Attack Timer: ${globals.attackWaves.currentTimer}/${globals.attackWaves.nextTimer}</span><br>\n        <span>Enemy Strength: </span>\n      </section>\n      <div id="inventoryList">\n        \x3c!-- TODO create a delete mode, but should utilize a command wheel --\x3e\n        <h3>Inventory</h3>\n        <inventory\n          items.bind="globals.player.inv.items"\n          click-call.call="CCC.issue(\'player.inventoryPush\', {\n            \'which.itemStack\': item,\n            \'to.entities\': globals.player.workshop.entities\n          })"\n          ></inventory>\n      </div>\n\n    </main>\n    <div id="tutorial">\n      <scope-var var.bind="Tutorial.checkConditions() & signal:\'generalUpdate\'"></scope-var>\n      <div id="tut_pos" class="center">\n        <span id="tut_text"></span>\n        <button id="tut_button" class="center"></button>\n      </div>\n      <span click.delegate="hideTutorial()" note="off">X</span>\n    </div>\n    <div id="ChameleonModal">\n      <div class="center">\n        <span id="ChameleonMessage"></span><br>\n        <button id="ChameleonButton" class="btn">Close</button>\n      </div>\n    </div>\n    <section class="tabs">\n      <require from="resources/components/tabPopout"></require>\n      <tab-popout class="tab_bottom_left" id="numSelectors">\n        <div slot="tab">\n          Rounder&nbsp<span class="tabOnly">${mgrs.rounder.huns}${mgrs.rounder.tens}${mgrs.rounder.ones}</span>\n        </div>\n        <div slot="content">\n          <compose view="resources/elements/rounderTab.html"></compose>\n        </div>\n      </tab-popout>\n      <tab-popout class="tab_bottom_right">\n        <div slot="tab">\n          Filters\n        </div>\n        <require from="resources/elements/popouts/filtersPopout.html"></require>\n        <filtersPopout slot="content"></filtersPopout>\n      </tab-popout>\n    </section>\n  </div>\n  <div id="editDataSource" if.bind="viewPane.version==\'editData\'">\n    <require from="resources/elements/dataEditor"></require>\n    <data-editor></data-editor>\n  </div>\n  \x3c!-- div id="loadingAnim">\n    I\'m loading!\n  </!--\x3e\n</template>\n'}}]);
//# sourceMappingURL=app~f84a0d13.7c9f280ed7ade394ab2b.bundle.map