(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{app:function(e,n,a){"use strict";a.r(n),a.d(n,"App",(function(){return f}));var s,i=a("aurelia-templating-resources"),t=a("aurelia-framework"),o=a("uShe"),c=a("3Qvj"),l=a("463H"),r=a("0d46"),d=a("6juG"),m=a("7jDb"),v=(a("iVgR"),a("Evr9"));function u(e,n,a,s,i,t,o){try{var c=e[t](o),l=c.value}catch(e){return void a(e)}c.done?n(l):Promise.resolve(l).then(s,i)}function p(e,n){for(var a=0;a<n.length;a++){var s=n[a];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}var f=Object(t.d)(i.a,o.a,c.a,t.b)(s=function(){function e(e,n,a,s){var i=this;this.viewPane={main:"home",showingItem:null,version:"beta",loaded:!1,options:{}},this.showTut=!0,this.dataBase={},this.tooltip=null,this.viewRecCat=!1,window.tfmg=this,this.Math=Math,this.signaler=e,this.IgorJs=m.a,d.b.signaler=this.signaler,d.b.app=this,this.ChameView=d.b,m.a.initialize({commandTasker:r.b,viewTasker:d.b,ticker:{ticks_perSec:l.d,ticks_maxPhase:l.c},dbName:"TheFactoryMustGrow",saveName:"SaveGame"}),n.onLoadComplete((function(e){i.init(e,a)})),n.beginLoad(),this.CCC=r.a,this.Tutorial=v.a,this.save=function(){m.a.saveGame(),i.autoSave(),i.autoSave()},s.expressionObserver(this,"viewPane.main").subscribe((function(e,n){i.whenCheck(e,n,"main")}))}var n,a,s,i=e.prototype;return i.init=function(){var e,n=(e=regeneratorRuntime.mark((function e(n,a){var s=this;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.mgrs=n.mgrs,this.mgrs.baseApp=this,r.b.initialize({dialogSvc:a,dataSet:n.mgrs.data}),e.next=5,m.a.loadDatabase(n.mgrs.data);case 5:return this.dataSet=m.a.dataSet,this.globals=m.a.globalObject,r.b.setRunner(m.a.getRunner()),this.IgorRunner=m.a.getRunner(),m.a.setNamed("player.inventory",this.globals.player.inv),m.a.setNamed("research",this.globals.research),m.a.setNamed("global",this.globals),r.a.staticProvide("player","inventory",this.globals.player.inv),r.a.staticProvide("service","rounder",this.mgrs.rounder),d.a.setClassFn("canCraft",(function(e){return e.ingredients.every((function(e){return s.IgorRunner.processTEMP(s.globals.player.inv.items,"inventory.total",{name:e.name})>=e.amount}))?"recipeEnabled":"recipeDisabled"})),d.a.setViewFn("recipeFilter",(function(e){return Object.values(s.IgorRunner.data.recipe).filter((function(n){return(void 0===n.enabled||n.enabled||s.globals.unlocked_recipes.includes(n.name))&&(Array.isArray(e)&&e.includes(n.category)||n.category==e)}))})),d.a.setViewFn("objectValues",(function(e){return Object.values(e)})),d.a.setViewFn("technologyFilter",(function(){return Object.values(tfmg.dataSet.technology).filter((function(e){var n;return(null==(n=s.globals.research[e.name])?void 0:n.complete)?tfmg.viewPane.options.bDoneTechs:!e.prerequisites||e.prerequisites.every((function(e){var n;return null==(n=s.globals.research[e])?void 0:n.complete}))})).sort((function(e,n){return e.name>n.name?1:-1}))})),d.a.setViewFn("workshopEntities",(function(){var e=s.IgorJs.arrayFromIds(s.globals.player.workshop.entities);return e=e.sort((function(e,n){return e.order>n.order?-1:1}))})),d.a.setViewFn("playerInventory",(function(){var e=s.globals.player.inv.items;return e=e.sort((function(e,n){return e.name==n.name?e.count>n.count?-1:1:e.name>n.name?1:-1}))})),e.next=22,this.mgrs.idb.get("dev");case 22:this.showDev=e.sent,this.showDev||(m.a.setState("start"),this.globals.activeFeatures.tutorial?v.a.start(this):this.autoSave()),d.a.setViewFn("sort",(function(e){return e=e.sort((function(e,n){return e.order>n.order?1:-1}))}));case 25:case"end":return e.stop()}}),e,this)})),function(){var n=this,a=arguments;return new Promise((function(s,i){var t=e.apply(n,a);function o(e){u(t,s,i,o,c,"next",e)}function c(e){u(t,s,i,o,c,"throw",e)}o(void 0)}))});return function(e,a){return n.apply(this,arguments)}}(),i.hoverTest=function(){alert("test")},i.autoSave=function(){var e=this;this.autoSave.sub?(this.IgorJs.Ticker.dispose(this.autoSave.sub),this.autoSave.secs=function(){return 0},this.autoSave.sub=null):(this.autoSave.sub=m.a.Ticker.subscribe((function(){m.a.saveGame()}),l.c/5),this.autoSave.secs=function(){return Math.floor((l.c/5-m.a.Ticker.ticks%(l.c/5)+e.autoSave.sub.phase)/l.d)})},i.when=function(e,n){this.whenTarg={targ:e,cb:n},console.log("whenSet")},i.whenCheck=function(e,n,a){this.whenTarg&&(this.whenTarg.targ.entityPane&&this.viewPane.entityPane!=this.whenTarg.targ.entityPane||this.whenTarg.targ.main&&this.viewPane.main!=this.whenTarg.targ.main||(this.whenTarg.cb(),this.whenTarg=void 0))},i.nukeCache=function(){this.mgrs.idb.clear(),window.location.reload()},i.hideTutorial=function(){v.a.clearTut()},i.resetDS=function(){this.mgrs.idb.del("last_ds"),location.reload()},i.toggleDev=function(e){this.mgrs.idb.set("dev",!this.showDev),this.showDev=!this.showDev},i.resetSave=function(){m.a.commands("resetSave")&&location.reload()},i.jumpStart=function(){this.IgorRunner.processTEMP("player.inventory","inventory.add",{itemStacks:[{name:"lab",count:10},{name:"automation-science-pack",count:200},{name:"inserter",count:50},{name:"iron-chest",count:50},{name:"stone",count:100},{name:"burner-mining-drill",count:10},{name:"stone-furnace",count:10},{name:"assembling-machine-1",count:10},{name:"transport-belt",count:100}]}),this.globals.activeFeatures.factoryBlocks={},this.signaler.signal("generalUpdate")},n=e,(a=[{key:"showItem",set:function(e){var n=this;if(e.item)if("string"==typeof e.item&&e.item.includes("id")&&(e.item=this.IgorJs.getObjId(e.item)),this.viewPane.showingItem==e.item&&e.double)this.viewPane.main=e.double.view;else{var a=this.viewPane.showingItem;this.viewPane.showingItem=null,this.viewPane.showingCat="",this.viewPane.connectedItems=null,e&&a!=e.item&&window.setTimeout((function(){n.viewPane.showingItem=e.item,n.viewPane.showingCat=e.cat,e.view&&(n.viewPane.main=e.view),e.setConnected&&(n.setConnectedItems=e)}),0)}}},{key:"setConnectedItems",set:function(e){var n,a,s=this;this.viewPane.connectedItems={},null==(n=e.item.connections.drains)||n.forEach((function(e){s.viewPane.connectedItems[e.parent||e]="drain"})),null==(a=e.item.connections.sources)||a.forEach((function(e){s.viewPane.connectedItems[e.parent||e]+=" source"}))}},{key:"clearConnectedItems",set:function(e){this.viewPane.connectedItems={}}}])&&p(n.prototype,a),s&&p(n,s),e}())||s},"app.html":function(e,n,a){e.exports='<template>\n  <require from="bootstrap/dist/css/bootstrap.min.css"></require>\n  <require from="@fortawesome/fontawesome-free/css/all.min.css"></require>\n  <require from="./styles.scss"></require>\n  <require from="./tfmg.scss"></require>\n  <require from="resources/elements/tool-tip"></require>\n\n  <div if.bind="viewPane.version==\'beta\'" beta mouseenter.trigger="tooltip = null">\n    <require from="./tfmg-beta.scss"></require>\n    <section class="statusBox"> \n      <div if.bind="!tooltip && viewPane.main!=\'facBlocks\'" click.delegate="viewPane.main=\'overview\'">\n        status box<br> \n        Land, pollution, enemies, oh my!<br>\n        <span if.bind="autoSave.sub">AutoSave: <span>${autoSave.secs() & signal:\'generalUpdate\'}s</span></span>\n      </div>\n      <div if.bind="viewPane.main==\'facBlocks\' && !tooltip" class="container facBlockStats">\n        <div class="row align-items-center justify-content-around">\n          <div class="col">\n            <div>Land use: ${globals.land.used}</div>\n            <div>Available: ${globals.land.total-globals.land.used}</div>\n          </div>\n          <div class="col">\n            <div>Complexity Total: ${globals.land.complexity}</div>\n            <div>Resource Patches: ${globals.land.res_patches-globals.land.res_patch_used}</div>\n          </div>\n        </div>\n      </div>\n      <tool-tip\n        display.bind="tooltip"\n        item-mgr.bind="mgrs.item"\n        recipe-mgr.bind="mgrs.rec"\n        if.bind="tooltip"\n      ></tool-tip>\n      <div id="toaster">\n        <require from="./resources/elements/micro/toasted.html"></require>\n        <div\n          if.bind="ChameView.toastTimer"\n          class="toastTicker"\n          css="border-image: linear-gradient(to bottom, rgba(255, 255, 255, 0) ${ChameView.toastTimer.ticks}%, goldenrod ${ChameView.toastTimer.ticks}%) 0 4"\n        ></div>\n        <toasted\n          repeat.for="toast of ChameView.toasts"\n          toast.bind="toast"\n        ></toasted>\n      </div>\n    </section>\n    <nav>\n      <span click.delegate="viewPane.main=\'nav\'" class="fas fa-level-up-alt fa-rotate-90 ${viewPane.main==\'nav\'?\'selected\':\'\'}"></span>\n      <span click.delegate="viewPane.main=\'menu\'" class="fas fa-bars ${viewPane.main==\'menu\'?\'selected\':\'\'}" ></span>\n      <span click.delegate="viewPane.main=\'dev\'" class="fab fa-dev ${viewPane.main==\'dev\'?\'selected\':\'\'}" if.bind="showDev"></span>\n      <span class="fas spacer"></span>\n      <span click.delegate="viewPane.main=\'home\'" class="fas fa-user navHome ${viewPane.main==\'home\'?\'selected\':\'\'}"></span>\n      <span click.delegate="viewPane.main=\'entities\'" class="fas fa-toolbox navEntities ${viewPane.main==\'entities\'?\'selected\':\'\'}"></span>\n      <span click.delegate="viewPane.main=\'research\'" class="fas fa-drafting-compass navTechs ${viewPane.main==\'research\'?\'selected\':\'\'}"></span>\n      <span\n        click.delegate="globals.activeFeatures[\'factoryBlocks\'] && (viewPane.main=\'facBlocks\')"\n        class="far fa-object-ungroup navFacBlocks ${viewPane.main==\'facBlocks\'?\'selected\':\'\'} ${globals.activeFeatures[\'factoryBlocks\']? \'\': \'NYI\' & signal:\'generalUpdate\'}"\n      ></span>\n      <span\n        click.delegate="globals.activeFeatures[\'factoryBlocks\'] && (viewPane.main=\'viewFacBlock\')"\n        class="fas fa-industry navFacBlocks ${viewPane.main==\'viewFacBlock\'?\'selected\':\'\'} ${globals.activeFeatures[\'factoryBlocks\']? \'\': \'NYI\' & signal:\'generalUpdate\'}"\n      ></span>\n      <span class="fas spacer"></span>\n      <span active-when.bind="globals.activeFeatures[\'defense\']" click.delegate="globals.activeFeatures[\'defense\'] && (viewPane.main=\'defense\')" class="fab fa-fort-awesome navDefense ${viewPane.main==\'defense\'?\'selected\':\'\'} ${globals.activeFeatures[\'defense\']? \'\': \'NYI\'}"></span>\n      <span active-when.bind="globals.activeFeatures[\'offense\']" click.delegate="globals.activeFeatures[\'offense\'] && (viewPane.main=\'offense\')" class="fas fa-fighter-jet  navOffense ${viewPane.main==\'offense\'?\'selected\':\'\'} ${globals.activeFeatures[\'offense\']? \'\': \'NYI\'}"></span>\n    </nav>\n    <main class="tfmg" click.capture="CCC.provide($event, \'global\', \'game\', globals)" mouseenter.trigger="tooltip = null">\n      <section id="nav" if.bind="viewPane.main==\'nav\'">\n        <p click.delegate="viewPane.main=\'nav\'"><span class="fas fa-level-up-alt fa-rotate-90 selected" alt="verbose nav"></span>Expanded Nav</p>\n        <p click.delegate="viewPane.main=\'menu\'"><span class="fas fa-bars" ></span>Menu</p>\n        <p click.delegate="viewPane.main=\'dev\'"><span class="fab fa-dev" if.bind="showDev"></span>Dev Menu</p>\n        <p class="fas spacer"></p>\n        <p click.delegate="viewPane.main=\'home\'"><span class="fas fa-user navHome"></span>Player Home</p>\n        <p click.delegate="viewPane.main=\'entities\'"><span class="fas fa-toolbox navEntities"></span>Workshop</p>\n        <p click.delegate="viewPane.main=\'research\'"><span class="fas fa-drafting-compass navTechs"></span>Technologies</p>\n        <p click.delegate="viewPane.main=\'facBlocks\'"><span class="far fa-object-ungroup navFacBlocks"></span>Factory Blocks List</p>\n        <p click.delegate="viewPane.main=\'viewFacBlock\'"><span class="fas fa-industry navFacBlocks"></span>View Factory Block</p>\n        <p class="fas spacer"></p> \n        <p click.delegate="globals.activeFeatures[\'defense\'] && (viewPane.main=\'defense\')"><span class="fab fa-fort-awesome navDefense"></span>Defenses</p>\n        <p click.delegate="globals.activeFeatures[\'offense\'] && (viewPane.main=\'offense\')"><span class="fas fa-fighter-jet navOffense"></span>Offenses</p>\n      </section>\n      <section id="menu" if.bind="viewPane.main==\'menu\'" style="z-index:2000">\n        <div click.delegate="save()">Save</div>\n        <div click.delegate="resetSave()">Reset Save</div>\n        <div click.delegate="resetDS()">Reset DataSource</div>\n        <div click.delegate="toggleDev()" if.bind="!showDev">Dev On</div>\n        <a class="notLink" target="_blank" href="https://digitalpsigen.tech/biz_plans/TFMG_welcome.html">Investor Options <span class="fas fa-external-link-alt"></span></a>\n        <div class="iconRow">\n          <span class="fas fa-external-link-alt"></span>-&gt;\n          <a class="notLink" target="_blank" href="https://github.com/Kremnari/TheFactoryMustGrow"><span class="fab fa-github"></span></a>\n        </div>\n        <div id="email_sub">\n          <span click.delegate="showSubUp=!showSubUp">Subscribe for updates <span class="fas fa-chevron-down"></span>\n          <div if.bind="showSubUp">\n            \x3c!-- Begin Mailchimp Signup Form --\x3e\n            <link href="//cdn-images.mailchimp.com/embedcode/classic-10_7.css" rel="stylesheet" type="text/css">\n            <style type="text/css">\n              #mc_embed_signup{background:darkslategrey; clear:left; font:14px Helvetica,Arial,sans-serif; }\n              /* Add your own Mailchimp form style overrides in your site stylesheet or in this style block.\n                We recommend moving this block and the preceding CSS link to the HEAD of your HTML file. */\n            </style>\n            <div id="mc_embed_signup">\n            <form action="https://digitalpsigen.us1.list-manage.com/subscribe/post?u=cf2e664fb607fff9109a1e9ec&amp;id=9fca87efa8" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>\n                <div id="mc_embed_signup_scroll">\n              <h2>Subscribe for updates</h2>\n            <div class="indicates-required"><span class="asterisk">*</span> indicates required</div>\n            <div class="mc-field-group">\n              <label for="mce-EMAIL">Email Address  <span class="asterisk">*</span>\n            </label>\n              <input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL">\n            </div>\n            <div class="mc-field-group">\n              <label for="mce-FNAME">First Name </label>\n              <input type="text" value="" name="FNAME" class="" id="mce-FNAME">\n            </div>\n            <div class="mc-field-group">\n              <label for="mce-LNAME">Last Name </label>\n              <input type="text" value="" name="LNAME" class="" id="mce-LNAME">\n            </div>\n              <div id="mce-responses" class="clear">\n                <div class="response" id="mce-error-response" style="display:none"></div>\n                <div class="response" id="mce-success-response" style="display:none"></div>\n              </div>    \x3c!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups--\x3e\n                <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_cf2e664fb607fff9109a1e9ec_9fca87efa8" tabindex="-1" value=""></div>\n                <div class="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button"></div>\n                </div>\n                <span>Service provided by MailChimp</span>\n            </form>\n            </div>\n            <script type=\'text/javascript\' src=\'//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js\'><\/script><script type=\'text/javascript\'>(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]=\'EMAIL\';ftypes[0]=\'email\';fnames[1]=\'FNAME\';ftypes[1]=\'text\';fnames[2]=\'LNAME\';ftypes[2]=\'text\';}(jQuery));var $mcj = jQuery.noConflict(true);<\/script>\n            \x3c!--End mc_embed_signup--\x3e\n          </div>\n        </div>\n      </section>\n      <section id="devControls" if.bind="viewPane.main==\'dev\'">\n        <div click.delegate="IgorJs.setState(\'tick\')">Tick 1</div>\n        <div click.delegate="IgorJs.setState(\'toggle\')">${IgorJs.Ticker.isRunning ? "Pause" : "Resume"}</div>\n        <div click.delegate="jumpStart()">JumpStart()</div>\n        <div click.delegate="testing()">Testing()</div>\n        <div click.delegate="nukeCache()">NukeCache</div>\n        <div click.delegate="viewPane.version = \'editData\'">Edit DataSource</div>\n        <div click.delegate="toggleDev()" if.bind="showDev">Dev Off</div>\n      </section>\n      <compose if.bind="viewPane.main==\'offense\' && globals.activeFeatures.offenseBlocks" view="./resources/elements/mainPanes/offensePane.html"></compose>\n      <compose if.bind="viewPane.main==\'defense\' && globals.activeFeatures.defenseBlocks" view="./resources/elements/mainPanes/defensePane.html"></compose>\n      <section id="playerHome" show.bind="viewPane.main==\'home\'">\n        <h3>Craftables</h3>\n        <div class="overflow" id="recipes">\n          <icon-base\n            repeat.for="rec of ChameView.viewFn.recipeFilter(\'crafting\') & signal: \'generalUpdate\'"\n            item.bind="rec"\n            title = "${rec.name}"\n            click.delegate="CCC.issue(\'player.craft\', {\'which.recipe\': rec } )"\n            class.bind="ChameView.classFn.canCraft(rec) & signal:\'generalUpdate\'"\n            class="${rec.animClass}"\n            metas.bind="{showEntity: true}"\n            mouseenter.trigger="tooltip = rec"\n            mouseleave.trigger="tooltip = null"\n          ></icon-base>\n        </div>\n        <div id="resources">\n          <h3>Mineables</h3>\n          <icon-base\n            repeat.for="res of dataSet.resource | objectValues"\n            item.bind="res"\n            click.delegate="CCC.issue(\'resources.mine\', { \'which.resource\': res })"\n            class="${res.animClass}"\n          ></icon-base> \n        </div>\n      </section>\n      <section id="machines" show.bind="viewPane.main==\'entities\'" click.capture="CCC.provide($event, \'at\', \'entity\', viewPane.showingItem)">\n          <h4>Workshop</h4>\n          <span class="details">\n            <compose if.bind="viewPane.showingItem[\'mining_speed\']" item.bind="viewPane.showingItem & signal:\'generalUpdate\'" view="./resources/elements/byModule/mining-infopane.html"></compose>\n            <compose if.bind="viewPane.showingItem[\'crafting_speed\']" item.bind="viewPane.showingItem & signal:\'generalUpdate\'" view="./resources/elements/byModule/crafting-infopane.html"></compose>\n            <compose if.bind="viewPane.showingItem[\'researching_speed\']" item.bind="viewPane.showingItem & signal:\'generalUpdate\'" view="./resources/elements/byModule/lab-infopane.html"></compose>\n          </span>\n          <div class="entityList">\n            <div repeat.for="machina of ChameView.viewFn.workshopEntities() & signal:\'entityUpdate\'">\n              <input type="hidden" value.bind="typeof machina.order==\'undefined\' ? machina.order=$index : \'\'">\n              <icon-base\n                item.bind="machina"\n                alt-image.bind="machina.processing.icon || machina.processing.name"\n                click.delegate="showItem = {item: machina}"\n                metas.bind="{stalled: !machina._tags[\'tick\']}"\n                class="${viewPane.showingItem == machina ? \'selected\':\'\'}"\n              ></icon-base>\n            </div>\n          </div>\n      </section>\n      <section id="facBlocks" show.bind="viewPane.main==\'facBlocks\'" class="container">\n        <h3>Factory Blocks</h3>\n        <div class="row">\n          <div class="col facBlockList resBlocks">\n            <span>Resources</span>\n            <span\n              click.delegate="CCC.issue(\'facBlock.newResBlock\', {}, $event)"\n              mouseenter.trigger="tooltip = CCC.utilityFn(\'facBlock.__tooltips\',null, {which: \'resBlock\'})"\n              class="newFacBlock resBlock fas fa-plus-square fa_icon_sm"\n            ></span><br>\n            <div\n              repeat.for="resBlock of IgorJs.arrayFromIds(globals.facBlocks.resBlocks) & signal:\'generalUpdate\'"\n              click.delegate="showItem={item: resBlock, double: {view: \'viewFacBlock\'}, setConnected:true}"\n              class="blockItem resBlockItem\n                    ${viewPane.showingItem==resBlock ? \'selected\':\'\'}\n                    ${viewPane.connectedItems[resBlock.$_id]}"\n            >\n              <icon-base\n                item="technology@facBlocks"\n                alt-image.bind="resBlock.subIcon"\n              ></icon-base>\n            </div>\n          </div>\n          <div class="col specBuses">\n            <span>Special</span>\n            <div\n              click.delegate="select_FacBlock(facBlocks.defenseBus)"\n              class="${viewPane.showingItem==facBlocks.defenseBus ? \'selected\': \'\'} blockItem defBus"\n              if.bind="globals.activeFeatures.factoryBlocks.defenseBus"\n            >Defense Bus</div>\n            <div\n              click.delegate="select_FacBlock(facBlocks.marketBus)"\n              class="${viewPane.showingItem==facBlocks.marketBus ? \'selected\': \'\'} blockItem marBus"\n              if.bind="globals.activeFeatures.factoryBlocks.marketBus"\n            >Market Bus</div>\n            <div\n              click.delegate="select_FacBlock(facBlocks.offenseBus)"\n              class="${viewPane.showingItem==facBlocks.offenseBus ? \'selected\': \'\'} blockItem offBus"\n              if.bind="globals.activeFeatures.factoryBlocks.offenseBus"\n            >Offenses Bus</div>\n          </div>\n          <div class="col facBlockList techBlocks">\n            <span>Research</span>\n            <span\n              click.delegate="CCC.issue(\'facBlock.newTechBlock\', {}, $event)"\n              mouseenter.trigger="tooltip = CCC.utilityFn(\'facBlock.__tooltips\',null, {which: \'techBlock\'})"\n              class="newFacBlock techBlock fas fa-plus-square fa_icon_sm"\n            ></span><br>\n            <div\n              repeat.for="techBlock of IgorJs.arrayFromIds(globals.facBlocks.techBlocks) & signal:\'generalUpdate\'"\n              click.delegate="showItem={item: techBlock, double: {view: \'viewFacBlock\'}, setConnected:true}"\n              class="blockItem techBlockItem\n                    ${viewPane.showingItem==techBlock ? \'selected\':\'\'}\n                    ${viewPane.connectedItems[techBlock.$_id]}"\n            >\n              <icon-base\n                item="technology@facBlocks"\n                alt-image.bind="techBlock.subIcon"\n              ></icon-base>\n            </div>\n          </div>\n        </div>\n        <div class="row">\n          <div class="col facBlockList busLines">\n            <span>Factory Buses</span>\n            <span\n              click.delegate="CCC.issue(\'facBlock.newBus\', {}, $event)"\n              mouseenter.trigger="tooltip = CCC.utilityFn(\'facBlock.__tooltips\',null, {which: \'busLine\'})"\n              class="newFacBlock busLine fas fa-plus-square fa_icon_sm"\n            ></span><br>\n            <div\n              repeat.for="facBus of IgorJs.arrayFromIds(globals.facBlocks.buses) & signal:\'generalUpdate\'"\n              click.delegate="showItem={item: facBus, double: {view: \'viewFacBlock\'}, setConnected:true}"\n              class="blockItem busLineItem\n                    ${viewPane.showingItem==facBus ? \'selected\':\'\'}\n                    ${viewPane.connectedItems[facBus.$_id]}"\n            >\n              <icon-base\n                item="technology@facBlocks"\n                alt-image.bind="facBus.subIcon"\n              ></icon-base>\n            </div>\n          </div>\n        </div>\n        <div class="row">\n          <div class="col facBlockList facBlocks">\n            <span>FactoryBlock</span>\n            <span\n              click.delegate="CCC.issue(\'facBlock.newBlock\', {}, $event)"\n              mouseenter.trigger="tooltip = CCC.utilityFn(\'facBlock.__tooltips\',null, {which: \'factoryBlock\'})"\n              class="newFacBlock facBlock fas fa-plus-square fa_icon_sm"\n            ></span><br>\n            <div\n              repeat.for="facBlock of IgorJs.arrayFromIds(globals.facBlocks.blocks) & signal:\'generalUpdate\'"\n              click.delegate="showItem={item: facBlock, double: {view: \'viewFacBlock\'}, setConnected:true}"\n              class=\'blockItem facBlockItem\n                    ${viewPane.showingItem==facBlock ? "selected":""}\n                    ${viewPane.connectedItems[facBlock.$_id]}\'\n            >\n              <icon-base\n                item="technology@facBlocks"\n                alt-image.bind="facBlock.subIcon"\n              ></icon-base>\n            </div>\n          </div>\n        </div>\n      </section>\n      <section id="viewBlocks" show.bind="viewPane.main==\'viewFacBlock\'">\n        <compose\n          id="viewFacBlock"\n          class="container"\n          if.bind="viewPane.main==\'viewFacBlock\' && viewPane.showingItem.$_type==\'FactoryBlock\'"\n          view="./resources/elements/factoryBlocks/mainView.html"\n        ></compose>\n        <compose\n          id="viewBusLine"\n          class="container"\n          if.bind="viewPane.main==\'viewFacBlock\' && viewPane.showingItem.$_type==\'FactoryBus\'"\n          view="./resources/elements/factoryBlocks/busView.html"\n        ></compose>\n        <compose\n          id="viewResBlock"\n          class="container"\n          if.bind="viewPane.main==\'viewFacBlock\' && viewPane.showingItem.$_type==\'ResourceBlock\'"\n          view="./resources/elements/factoryBlocks/resView.html"\n        ></compose>\n        <compose\n          id="viewTechBlock"\n          class="container"\n          if.bind="viewPane.main==\'viewFacBlock\' && viewPane.showingItem.$_type==\'TechBlock\'"\n          view="./resources/elements/factoryBlocks/techBlock.html"\n        ></compose>\n      </section>\n      <section id="technologies" show.bind="viewPane.main==\'research\'">\n        <h3>Research</h3>\n        <compose view="./resources/elements/byModule/tech-infopane.html" if.bind="viewPane.showingCat==\'tech\'" tech.bind="viewPane.showingItem" tech-mgr.bind="mgrs.tech" tooltip.bind="tooltip"></compose>\n        <span class="${!viewPane.options.bDoneTechs && \'inActiveOption\'}" click.delegate="viewPane.options.bDoneTechs = !viewPane.options.bDoneTechs">Show Completed</span>\n        <div class="overflow">\n          <icon-base\n            repeat.for="tech of ChameView.viewFn.technologyFilter(viewPane.options.bDoneTechs) & signal:\'techResearched\'"\n            click.delegate="showItem = {item: tech, cat: \'tech\'}"\n            item.bind="tech"\n            class="${globals.research.progressing.name==tech.name ? \'researching\' : \'\'} ${globals.research[tech.name].complete ? \'researched\': \'\'} ${viewPane.showingItem==tech ? \'selected\': \'\'}"\n          ></icon-base>\n        </div>\n      </section>\n      <section id="overview" show.bind="viewPane.main==\'overview\'">\n        <span>Available land: ${globals.land.total-globals.land.used}</span>\n        <span>Pollution:</span>\n        <span>Scan Progress: ${globals.scanning.currentCost}/${globals.scanning.nextCost}</span><br>\n        <span>Attack Timer: ${globals.attackWaves.currentTimer}/${globals.attackWaves.nextTimer}</span><br>\n        <span>Enemy Strength: </span>\n      </section>\n\n    </main>\n    <div id="inventoryList">\n      \x3c!-- TODO create a delete mode, but should utilize a command wheel --\x3e\n      <h3 class="text-center">Inventory</h3>\n      <inventory\n        items.bind="ChameView.viewFn.playerInventory() & signal:\'generalUpdate\'"\n        click-call.call="CCC.issue(\'player.inventoryPush\', {\n          \'which.itemStack\': item,\n          \'to.entities\': globals.player.workshop.entities\n        })"\n        ></inventory>\n    </div>\n    <div id="tutorial">\n      <scope-var var.bind="Tutorial.checkConditions() & signal:\'generalUpdate\'"></scope-var>\n      <div id="tut_pos" class="center">\n        <span id="tut_text"></span>\n        <button id="tut_button" class="center"></button>\n      </div>\n      <span click.delegate="hideTutorial()" note="off">X</span>\n    </div>\n    <div id="ChameleonModal">\n      <div class="center">\n        <span id="ChameleonMessage"></span><br>\n        <button id="ChameleonButton" class="btn">Close</button>\n      </div>\n    </div>\n    <section class="tabs">\n      <require from="resources/components/tabPopout"></require>\n      <tab-popout class="tab_bottom_left" id="numSelectors">\n        <div slot="tab">\n          Rounder&nbsp<span class="tabOnly">${mgrs.rounder.huns}${mgrs.rounder.tens}${mgrs.rounder.ones}</span>\n        </div>\n        <div slot="content">\n          <compose view="resources/elements/rounderTab.html"></compose>\n        </div>\n      </tab-popout>\n      <tab-popout class="tab_bottom_right">\n        <div slot="tab">\n          Filters\n        </div>\n        <require from="resources/elements/popouts/filtersPopout.html"></require>\n        <filtersPopout slot="content"></filtersPopout>\n      </tab-popout>\n    </section>\n  </div>\n  <div id="editDataSource" if.bind="viewPane.version==\'editData\'">\n    <require from="resources/elements/dataEditor"></require>\n    <data-editor></data-editor>\n  </div>\n  \x3c!-- div id="loadingAnim">\n    I\'m loading!\n  </div --\x3e\n</template>\n'}}]);
//# sourceMappingURL=app~f84a0d13.d2408459a06981a995f9.bundle.map