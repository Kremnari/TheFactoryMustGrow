(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{"app.html":function(e,s,n){e.exports='<template>\n  <require from="bootstrap/dist/css/bootstrap.min.css"></require>\n  <require from="@fortawesome/fontawesome-free/css/all.min.css"></require>\n  <require from="./styles.scss"></require>\n  <require from="./tfmg.scss"></require>\n  <require from="resources/elements/tool-tip"></require>\n  <require from="./tfmg-beta.scss"></require>\n\n  <div if.bind="!view.ctrl.version" beta mouseenter.trigger="view.unset({which: \'tooltip\'})">\n    <section class="statusBox"> \n      <div\n        if.bind="view.ctrl.statusBox==\'statusBox\'"\n        click.delegate="view.set({type: \'view\', which: \'main\', what: \'overview\'})"\n      >\n        <div>Land use: ${globals.land.used}</div>\n        <div>Available: ${globals.land.total-globals.land.used}</div>\n  \n        <span if.bind="autoSave.sub">AutoSave: <span>${autoSave.secs() & signal:\'generalUpdate\'}s</span></span>\n      </div>\n      <div if.bind="view.ctrl.statusBox==\'facBlock\'" class="container facBlockStats">\n        <div class="row align-items-center justify-content-around">\n          <div class="col">\n            <div>Land use: ${globals.land.used}</div>\n            <div>Available: ${globals.land.total-globals.land.used}</div>\n          </div>\n          <div class="col">\n            <div>Complexity Total: ${globals.land.complexity}</div>\n            <div>Resource Patches: ${globals.land.res_patches-globals.land.res_patch_used}</div>\n          </div>\n        </div>\n      </div>\n      <compose\n        if.bind="view.ctrl.statusBox==\'tooltip\'"\n        view="./resources/elements/tool-tip.html"\n      ></compose>\n      <div id="toaster">\n        <require from="./resources/elements/micro/toasted.html"></require>\n        <div\n          if.bind="view.toastTimer"\n          class="toastTicker"\n          css="border-image: linear-gradient(to bottom, rgba(255, 255, 255, 0) ${view.toastTimer.ticks}%, goldenrod ${view.toastTimer.ticks}%) 0 4"\n        ></div>\n        <toasted\n          repeat.for="toast of view.toasts"\n          toast.bind="toast"\n        ></toasted>\n      </div>\n    </section>\n    <nav>\n      <span click.delegate="view.set({type: \'view\', which: \'main\', what: \'nav\'})"      class="fas fa-level-up-alt fa-rotate-90 ${view.ctrl.main==\'nav\' && \'selected\'}"></span>\n      <span click.delegate="view.set({type: \'view\', which: \'main\', what: \'menu\'})"     class="fas fa-bars ${view.ctrl.main==\'menu\' && \'selected\'}" ></span>\n      <span click.delegate="view.set({type: \'view\', which: \'main\', what: \'dev\'})"      class="fab fa-dev ${view.ctrl.main==\'dev\' && \'selected\'}" if.bind="showDev"></span>\n      <span class="fas spacer"></span>\n      <span click.delegate="view.set({type: \'view\', which: \'main\', what: \'home\'})"     class="fas fa-user navHome ${view.ctrl.main==\'home\' && \'selected\'}"></span>\n      <span click.delegate="view.set({type: \'view\', which: \'main\', what: \'entities\'})" class="fas fa-toolbox navEntities ${view.ctrl.main==\'entities\' && \'selected\'}"></span>\n      <span click.delegate="view.set({type: \'view\', which: \'main\', what: \'research\'})" class="fas fa-drafting-compass navTechs ${view.ctrl.main==\'research\' && \'selected\'}"></span>\n      <span\n        click.delegate="globals.activeFeatures[\'factoryBlocks\'] && (view.set({type: \'view\', which: \'main\', what: \'facBlocks\'}))"\n        class="far fa-object-ungroup navFacBlocks ${view.ctrl.main==\'facBlocks\' && \'selected\'} ${!globals.activeFeatures[\'factoryBlocks\'] && \'NYI\' & signal:\'generalUpdate\'}"\n      ></span>\n      <span\n        click.delegate="globals.activeFeatures[\'factoryBlocks\'] && (view.set({type: \'view\', which: \'main\', what: \'viewFacBlock\'}))"\n        class="fas fa-industry navFacBlocks ${view.ctrl.main==\'viewFacBlock\' && \'selected\'} ${!globals.activeFeatures[\'factoryBlocks\'] && \'NYI\' & signal:\'generalUpdate\'}"\n      ></span>\n      <span class="fas spacer"></span>\n      <span\n        if.bind="!globals.activeFeatures[\'defenseBlocks\']"\n        class="fab fa-fort-awesome navDefense NYI"\n      ></span>\n      <span \n        if.bind="globals.activeFeatures[\'defenseBlocks\']"\n        click.delegate="globals.activeFeatures[\'defenseBlocks\'] && (view.set({type: \'view\', which: \'main\', what: \'defense\'}))"\n        class="fab fa-fort-awesome navDefense ${view.ctrl.main==\'defense\' && \'selected\'}"\n      ></span>\n      <span\n        if.bind="!globals.activeFeatures[\'offenseBlocks\']"\n        class="fas fa-fighter-jet navOffense NYI"\n      ></span>\n      <span\n        if.bind="globals.activeFeatures[\'offenseBlocks\']"\n        click.delegate="globals.activeFeatures[\'offenseBlocks\'] && (view.set({type: \'view\', which: \'main\', what: \'offense\'}))"\n        class="fas fa-fighter-jet navOffense ${view.ctrl.main==\'offense\' && \'selected\'}"\n      ></span>\n    </nav>\n    <main class="tfmg">\n      <section id="nav" if.bind="view.ctrl.main==\'nav\'">\n        <p click.delegate="view.set({type: \'view\', which: \'main\', what: \'nav\'})"><span class="fas fa-level-up-alt fa-rotate-90 selected" alt="verbose nav"></span>Expanded Nav</p>\n        <p click.delegate="view.set({type: \'view\', which: \'main\', what: \'menu\'})"><span class="fas fa-bars" ></span>Menu</p>\n        <p click.delegate="view.set({type: \'view\', which: \'main\', what: \'dev\'})"><span class="fab fa-dev" if.bind="showDev"></span>Dev Menu</p>\n        <p class="fas spacer"></p>\n        <p click.delegate="view.set({type: \'view\', which: \'main\', what: \'home\'})"><span class="fas fa-user navHome"></span>Player Home</p>\n        <p click.delegate="view.set({type: \'view\', which: \'main\', what: \'entities\'})"><span class="fas fa-toolbox navEntities"></span>Workshop</p>\n        <p click.delegate="view.set({type: \'view\', which: \'main\', what: \'research\'})"><span class="fas fa-drafting-compass navTechs"></span>Technologies</p>\n        <p click.delegate="view.set({type: \'view\', which: \'main\', what: \'facBlocks\'})"><span class="far fa-object-ungroup navFacBlocks"></span>Factory Blocks List</p>\n        <p click.delegate="view.set({type: \'view\', which: \'main\', what: \'viewFacBlocks\'})"><span class="fas fa-industry navFacBlocks"></span>View Factory Block</p>\n        <p class="fas spacer"></p> \n        <p click.delegate="globals.activeFeatures[\'defenseBlocks\'] && (view.set({type: \'view\', which: \'main\', what: \'defense\'}))"><span class="fab fa-fort-awesome navDefense"></span>Defenses</p>\n        <p click.delegate="globals.activeFeatures[\'offenseBlocks\'] && (view.set({type: \'view\', which: \'main\', what: \'offense\'}))"><span class="fas fa-fighter-jet navOffense"></span>Offenses</p>\n      </section>\n      <section id="menu" if.bind="view.ctrl.main==\'menu\'" style="z-index:2000">\n        <div click.delegate="save()">Save</div>\n        <div click.delegate="jumpTutorial()">FactoryBlock Tutorial</div>\n        <div click.delegate="resetSave()">Reset Save</div>\n        <div click.delegate="resetDS()">Reset DataSource</div>\n        <div click.delegate="toggleDev()" if.bind="!showDev">Dev On</div>\n        <div class="iconRow">\n          <span class="fas fa-external-link-alt"></span>-&gt;\n          <a class="notLink butIs" target="_blank" rel="noopener noreferrer" href="https://github.com/Kremnari/TheFactoryMustGrow"><span class="fab fa-github"></span></a>\n          <a class="notLink butIs" target="_blank" rel="noopener noreferrer" href="https://discord.gg/AQNKpxUjuP"><span class="fab fa-discord"></span></a>\n        </div>\n        <a class="notLink" target="_blank" rel="noopener noreferrer" href="https://digitalpsigen.tech/biz_plans/TFMG_welcome.html">Investor Options <span class="fas fa-external-link-alt"></span></a>\n        <div id="email_sub">\n          <span click.delegate="showSubUp=!showSubUp">Subscribe for updates <span class="fas fa-chevron-down"></span>\n          <div if.bind="showSubUp">\n            \x3c!-- Begin Mailchimp Signup Form --\x3e\n            <link href="//cdn-images.mailchimp.com/embedcode/classic-10_7.css" rel="stylesheet" type="text/css">\n            <style type="text/css">\n              #mc_embed_signup{background:darkslategrey; clear:left; font:14px Helvetica,Arial,sans-serif; }\n              /* Add your own Mailchimp form style overrides in your site stylesheet or in this style block.\n                We recommend moving this block and the preceding CSS link to the HEAD of your HTML file. */\n            </style>\n            <div id="mc_embed_signup">\n            <form action="https://digitalpsigen.us1.list-manage.com/subscribe/post?u=cf2e664fb607fff9109a1e9ec&amp;id=9fca87efa8" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>\n                <div id="mc_embed_signup_scroll">\n              <h2>Subscribe for updates</h2>\n            <div class="indicates-required"><span class="asterisk">*</span> indicates required</div>\n            <div class="mc-field-group">\n              <label for="mce-EMAIL">Email Address  <span class="asterisk">*</span>\n            </label>\n              <input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL">\n            </div>\n            <div class="mc-field-group">\n              <label for="mce-FNAME">First Name </label>\n              <input type="text" value="" name="FNAME" class="" id="mce-FNAME">\n            </div>\n            <div class="mc-field-group">\n              <label for="mce-LNAME">Last Name </label>\n              <input type="text" value="" name="LNAME" class="" id="mce-LNAME">\n            </div>\n              <div id="mce-responses" class="clear">\n                <div class="response" id="mce-error-response" style="display:none"></div>\n                <div class="response" id="mce-success-response" style="display:none"></div>\n              </div>    \x3c!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups--\x3e\n                <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_cf2e664fb607fff9109a1e9ec_9fca87efa8" tabindex="-1" value=""></div>\n                <div class="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button"></div>\n                </div>\n                <span>Service provided by MailChimp</span>\n            </form>\n            </div>\n            <script type=\'text/javascript\' src=\'//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js\'><\/script><script type=\'text/javascript\'>(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]=\'EMAIL\';ftypes[0]=\'email\';fnames[1]=\'FNAME\';ftypes[1]=\'text\';fnames[2]=\'LNAME\';ftypes[2]=\'text\';}(jQuery));var $mcj = jQuery.noConflict(true);<\/script>\n            \x3c!--End mc_embed_signup--\x3e\n          </div>\n        </div>\n      </section>\n      <section id="devControls" if.bind="view.ctrl.main==\'dev\'">\n        <div click.delegate="IgorJs.setState(\'tick\')">Tick 1</div>\n        <div click.delegate="IgorJs.setState(\'toggle\')">${IgorJs.Ticker.isRunning ? "Pause" : "Resume"}</div>\n        <div click.delegate="jumpStart()">JumpStart()</div>\n        <div click.delegate="testing()">Testing()</div>\n        <div click.delegate="nukeCache()">NukeCache</div>\n        <div click.delegate="view.set({type: \'view\', which: \'version\', what: \'editData\'})" if.bind="editDataSource">Edit DataSource</div>\n        <div click.delegate="toggleDev()" if.bind="showDev">Dev Off</div>\n      </section>\n      <compose if.bind="view.ctrl.main==\'offense\' && globals.activeFeatures.offenseBlocks" view="./resources/elements/mainPanes/offensePane.html"></compose>\n      <compose if.bind="view.ctrl.main==\'defense\' && globals.activeFeatures.defenseBlocks" view="./resources/elements/mainPanes/defensePane.html"></compose>\n      <section id="playerHome" show.bind="view.ctrl.main==\'home\'">\n        <h3>Craftables</h3>\n        <div class="overflow" id="recipes">\n          <icon-base\n            repeat.for="rec of view.Fn.recipeFilter(\'crafting\') & signal: \'generalUpdate\'"\n            item.bind="rec"\n            title = "${rec.name}"\n            click.delegate="CCC.issue(\'player.craft\', {\'which.recipe\': rec } )"\n            class.bind="view.classFn.canCraft(rec) & signal:\'generalUpdate\'"\n            class="${rec.animClass}"\n            metas.bind="{showEntity: true}"\n            mouseenter.trigger="view.set({type: \'scope\', which: \'tooltip\', what: rec})"\n            mouseleave.trigger="view.unset({which: \'tooltip\'})"\n          ></icon-base>\n          <div class="queue">\n            Max Queue: 5\n            <icon-base \n              repeat.for="toCraft of globals.player.crafting.list"\n              item.bind="toCraft.name"\n              title = "${toCraft.name}"\n              count.bind="toCraft.count"\n              progress.bind="$first && globals.player.crafting.timer/globals.player.crafting.time*100"\n              click.delegate="CCC.issue(\'player.cancelQueue\', {\'which.idx\':$index, \'which.queue\':\'crafting\'})"\n            ></icon-base>\n          </div>\n        </div>\n        <div id="resources">\n          <h3>Mineables</h3>\n          <icon-base\n            repeat.for="res of dataSet.resource | objectValues"\n            item.bind="res"\n            click.delegate="CCC.issue(\'resources.mine\', { \'which.resource\': res })"\n            class="${res.animClass}"\n          ></icon-base> \n          <div class="queue">\n            Max Queue: 5\n            <icon-base \n              repeat.for="toCraft of globals.player.mining.list"\n              item.bind="toCraft.name"\n              title = "${toCraft.name}"\n              count.bind="toCraft.count"\n              progress.bind="$first && globals.player.mining.timer/globals.player.mining.time*100"\n              click.delegate="CCC.issue(\'player.cancelQueue\', {\'which.idx\':$index, \'which.queue\':\'mining\'})"\n            ></icon-base>\n          </div>\n        </div>\n      </section>\n      <section id="machines" show.bind="view.ctrl.main==\'entities\'" click.capture="CCC.provide($event, \'at\', \'entity\', view.$scope.showingEntity)">\n          <h4>Workshop</h4>\n          <span class="details">\n            <compose if.bind="view.$scope.showingEntity[\'mining_speed\']" item.bind="view.$scope.showingEntity & signal:\'generalUpdate\'" view="./resources/elements/byModule/mining-infopane.html"></compose>\n            <compose if.bind="view.$scope.showingEntity[\'crafting_speed\']" item.bind="view.$scope.showingEntity & signal:\'generalUpdate\'" view="./resources/elements/byModule/crafting-infopane.html"></compose>\n            <compose if.bind="view.$scope.showingEntity[\'researching_speed\']" item.bind="view.$scope.showingEntity & signal:\'generalUpdate\'" view="./resources/elements/byModule/lab-infopane.html"></compose>\n          </span>\n          <div class="entityList">\n            <div repeat.for="machina of view.Fn.workshopEntities() & signal:\'entityUpdate\'">\n              <icon-base\n                item.bind="machina"\n                alt-image.bind="machina.processing.icon || machina.processing.name"\n                click.delegate="view.set({type: \'scope\', which: \'showingEntity\', what: machina })"\n                metas.bind="{stalled: !machina._tags[\'tick\']}"\n                class="${view.$scope.showingEntity == machina && \'selected\'}"\n              ></icon-base>\n            </div>\n          </div>\n      </section>\n      <section id="facBlocks" show.bind="view.ctrl.main==\'facBlocks\'" class="container">\n        <h3>Factory Blocks</h3>\n        <div class="row">\n          <div class="col facBlockList resBlocks">\n            <span\n              click.delegate="CCC.issue(\'facBlock.newResBlock\', {}, $event)"\n              mouseenter.trigger="view.set({type: \'scope\', which: \'tooltip\', what: CCC.utilityFn(\'facBlock.__tooltips\',null, {which: \'resBlock\'}) })"\n              mouseleave.trigger = "view.unset({which: \'tooltip\'})"\n              class="newFacBlock resBlock fas fa-plus-square fa_icon_sm_space"\n            > Resources</span><br>\n            <div\n              repeat.for="resBlock of IgorJs.arrayFromIds(globals.facBlocks.resBlocks) & signal:\'generalUpdate\'"\n              click.delegate="view.set({type:\'scope\', which: \'showingBlock\', what: resBlock, $double: {type: \'view\', which: \'main\', what: \'viewFacBlock\'}}) && (setConnectedItems = resBlock)"\n              class="blockItem resBlockItem\n                    ${view.$scope.showingBlock==resBlock && \'selected\'}\n                    ${view.$scope.connectedItems[resBlock.$_id]}"\n            >\n              <icon-base\n                item="technology@facBlocks"\n                alt-image.bind="resBlock.subIcon"\n              ></icon-base>\n            </div>\n          </div>\n          <div class="col specBuses">\n            <span>Special</span>\n            <div\n              click.delegate="view.set({type:\'scope\', which: \'showingBlock\', what: facBlocks.defenseBus})"\n              class="${view.$scope.showingBlock==facBlocks.defenseBus && \'selected\'} blockItem defBus"\n              if.bind="globals.activeFeatures.factoryBlocks.defenseBus"\n            >Defense Bus</div>\n            <div\n              click.delegate="view.set({type:\'scope\', which: \'showingBlock\', what: facBlocks.marketBus})"\n              class="${view.$scope.showingBlock==facBlocks.marketBus && \'selected\'} blockItem marBus"\n              if.bind="globals.activeFeatures.factoryBlocks.marketBus"\n            >Market Bus</div>\n            <div\n              click.delegate="view.set({type:\'scope\', which: \'showingBlock\', what: facBlocks.offenseBus})"\n              class="${view.$scope.showingBlock==facBlocks.offenseBus && \'selected\'} blockItem offBus"\n              if.bind="globals.activeFeatures.factoryBlocks.offenseBus"\n            >Offenses Bus</div>\n          </div>\n          <div class="col facBlockList techBlocks">\n            <span\n              click.delegate="CCC.issue(\'facBlock.newTechBlock\', {}, $event)"\n              mouseenter.trigger="view.set({type: \'scope\', which: \'tooltip\', what: CCC.utilityFn(\'facBlock.__tooltips\',null, {which: \'techBlock\'}) })"\n              class="newFacBlock techBlock fas fa-plus-square fa_icon_sm_space"\n            > Research</span><br>\n            <div\n              repeat.for="techBlock of IgorJs.arrayFromIds(globals.facBlocks.techBlocks) & signal:\'generalUpdate\'"\n              click.delegate="view.set({type:\'scope\', which: \'showingBlock\', what: techBlock, $double: {type: \'view\', which: \'main\', what: \'viewFacBlock\'}}) && (setConnectedItems = techBlock)"\n              class="blockItem techBlockItem\n                    ${view.$scope.showingBlock==techBlock && \'selected\'}\n                    ${view.$scope.connectedItems[techBlock.$_id]}"\n            >\n              <icon-base\n                item="technology@facBlocks"\n                alt-image.bind="techBlock.subIcon"\n              ></icon-base>\n            </div>\n          </div>\n        </div>\n        <div class="row">\n          <div class="col facBlockList busLines">\n            <span\n              click.delegate="CCC.issue(\'facBlock.newBus\', {}, $event)"\n              mouseenter.trigger="view.set({type: \'scope\', which: \'tooltip\', what: CCC.utilityFn(\'facBlock.__tooltips\',null, {which: \'busLine\'}) })"\n              class="newFacBlock busLine fas fa-plus-square fa_icon_sm_space"\n            > Factory Buses</span><br>\n            <div\n              repeat.for="facBus of IgorJs.arrayFromIds(globals.facBlocks.buses) & signal:\'generalUpdate\'"\n              click.delegate="view.set({type:\'scope\', which: \'showingBlock\', what: facBus, $double: {type: \'view\', which: \'main\', what: \'viewFacBlock\'}}) && (setConnectedItems = facBus)"\n              class="blockItem busLineItem\n                    ${view.$scope.showingBlock==facBus && \'selected\'}\n                    ${view.$scope.connectedItems[facBus.$_id]}"\n            >\n              <icon-base\n                item="technology@facBlocks"\n                alt-image.bind="facBus.subIcon"\n              ></icon-base>\n            </div>\n          </div>\n        </div>\n        <div class="row">\n          <div class="col facBlockList facBlocks">\n            <span\n              click.delegate="CCC.issue(\'facBlock.newBlock\', {}, $event)"\n              mouseenter.trigger="view.set({type: \'scope\', which: \'tooltip\', what: CCC.utilityFn(\'facBlock.__tooltips\',null, {which: \'factoryBlock\'}) })"\n              class="newFacBlock facBlock fas fa-plus-square fa_icon_sm_space"\n            > Factory Blocks</span><br>\n            <div\n              repeat.for="facBlock of IgorJs.arrayFromIds(globals.facBlocks.blocks) & signal:\'generalUpdate\'"\n              click.delegate="view.set({type:\'scope\', which: \'showingBlock\', what: facBlock, $double: {type: \'view\', which: \'main\', what: \'viewFacBlock\'}}) && (setConnectedItems = facBlock)"\n              class=\'blockItem facBlockItem\n                    ${view.$scope.showingBlock==facBlock && "selected"}\n                    ${view.$scope.connectedItems[facBlock.$_id]}\'\n            >\n              <icon-base\n                item="technology@facBlocks"\n                alt-image.bind="facBlock.subIcon"\n              ></icon-base>\n            </div>\n          </div>\n        </div>\n      </section>\n      <section id="viewBlocks" show.bind="view.ctrl.main==\'viewFacBlock\'">\n        <compose\n          id="viewFacBlock"\n          class="container"\n          if.bind="view.ctrl.main==\'viewFacBlock\' && view.$scope.showingBlock.$_type==\'FactoryBlock\'"\n          view="./resources/elements/factoryBlocks/mainView.html"\n        ></compose>\n        <compose\n          id="viewBusLine"\n          class="container"\n          if.bind="view.ctrl.main==\'viewFacBlock\' && view.$scope.showingBlock.$_type==\'FactoryBus\'"\n          view="./resources/elements/factoryBlocks/busView.html"\n        ></compose>\n        <compose\n          id="viewResBlock"\n          class="container"\n          if.bind="view.ctrl.main==\'viewFacBlock\' && view.$scope.showingBlock.$_type==\'ResourceBlock\'"\n          view="./resources/elements/factoryBlocks/resView.html"\n        ></compose>\n        <compose\n          id="viewTechBlock"\n          class="container"\n          if.bind="view.ctrl.main==\'viewFacBlock\' && view.$scope.showingBlock.$_type==\'TechBlock\'"\n          view="./resources/elements/factoryBlocks/techBlock.html"\n        ></compose>\n      </section>\n      <section id="technologies" show.bind="view.ctrl.main==\'research\'">\n        <h3>Research</h3>\n        <compose view="./resources/elements/byModule/tech-infopane.html" if.bind="view.$scope.showingTech"></compose>\n        <span class="${!view.options.bDoneTechs && \'inActiveOption\'}" click.delegate="view.options.bDoneTechs = !view.options.bDoneTechs">Show Completed</span>\n        <div class="overflow">\n          <icon-base\n            repeat.for="tech of view.Fn.technologyFilter(view.options.bDoneTechs) & signal:\'techResearched\'"\n            click.delegate="view.set({type: \'scope\', which: \'showingTech\', what: tech})"\n            item.bind="tech"\n            class="${globals.research.progressing.name==tech.name ? \'researching\' : \'\'} ${globals.research[tech.name].complete ? \'researched\': \'\'} ${view.$scope.showingTech==tech && \'selected\'}"\n          ></icon-base>\n        </div>\n      </section>\n      <section id="overview" show.bind="view.ctrl.main==\'overview\'">\n        <span>Available land: ${globals.land.total-globals.land.used}</span>\n        <span>Pollution:</span>\n        <span>Scan Progress: ${globals.scanning.currentCost}/${globals.scanning.nextCost}</span><br>\n        <span>Attack Timer: ${globals.attackWaves.currentTimer}/${globals.attackWaves.nextTimer}</span><br>\n        <span>Enemy Strength: </span>\n      </section>\n\n    </main>\n    <div id="inventoryList">\n      \x3c!-- TODO create a delete mode, but should utilize a command wheel --\x3e\n      <h3 class="text-center">Inventory</h3>\n      <div\n        class="top-right ${globals.control.fastForward && \'fastForward\'}"\n        if.bind="globals.control.bonusTicks>30"\n        pointerdown.delegate="CCC.issue(\'game.fastForward\', {\'to.string\': \'true\'})"\n        pointerup.delegate="CCC.issue(\'game.fastForward\', {\'to.string\': \'false\'})"\n      >\n        ${Math.floor(globals.control.bonusTicks/30)} secs\n        <span class="fas fa-angle-double-right"></span>\n      </div>\n      <compose view="./resources/elements/inventory.html"></compose>\n    </div>\n    <div id="tutorial">\n      <scope-var var.bind="Tutorial.checkConditions() & signal:\'generalUpdate\'"></scope-var>\n      <div id="tut_pos" class="center">\n        <span id="tut_text"></span>\n        <button id="tut_button" class="center"></button>\n      </div>\n      <span click.delegate="hideTutorial()" note="off">X</span>\n    </div>\n    <div id="ChameleonModal" mouseenter.trigger="view.unset({which:\'tooltip\'})">\n      <div class="center">\n        <span id="ChameleonMessage"></span><br>\n        <button id="ChameleonButton" class="btn">Close</button>\n      </div>\n    </div>\n    <section class="tabs">\n      <require from="resources/components/tabPopout"></require>\n      <tab-popout class="tab_bottom_left" id="numSelectors">\n        <div slot="tab">\n          Rounder&nbsp<span class="tabOnly">${mgrs.rounder.huns}${mgrs.rounder.tens}${mgrs.rounder.ones}</span>\n        </div>\n        <div slot="content">\n          <compose view="resources/elements/rounderTab.html"></compose>\n        </div>\n      </tab-popout>\n      <tab-popout class="tab_bottom_right">\n        <div slot="tab">\n          Filters\n        </div>\n        <require from="resources/elements/popouts/filtersPopout.html"></require>\n        <filtersPopout slot="content"></filtersPopout>\n      </tab-popout>\n    </section>\n  </div>\n  <div id="editDataSource" if.bind="view.ctrl.version==\'editData\'">\n    <require from="resources/elements/dataEditor"></require>\n    <data-editor></data-editor>\n  </div>\n</template>\n'}}]);
//# sourceMappingURL=app~752ba38f.79c87f2470668ee8eb36.bundle.map