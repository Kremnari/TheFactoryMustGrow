(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{"app.html":function(e,n,i){e.exports='<template>\n  <require from="bootstrap/dist/css/bootstrap.min.css"></require>\n  <require from="@fortawesome/fontawesome-free/css/all.min.css"></require>\n  <require from="./styles.scss"></require>\n  <require from="./tfmg.scss"></require>\n  <require from="resources/elements/tool-tip"></require>\n\n  <div if.bind="viewPane.version==\'beta\'" beta>\n    <require from="./tfmg-beta.scss"></require>\n    <section class="statusBox">\n      <div if.bind="!tooltip">\n        status box<br>\n        Here there will be dragons\n      </div>\n      <tool-tip display.bind="tooltip" item-mgr.bind="mgrs.item" recipe-mgr.bind="mgrs.rec"></tool-tip>\n    </section>\n    <nav>\n      <span click.delegate="viewPane.main=\'nav\'" class="fas fa-level-up-alt fa-rotate-90 ${viewPane.main==\'nav\'?\'selected\':\'\'}"></span>\n      <span click.delegate="viewPane.main=\'menu\'" class="fas fa-bars ${viewPane.main==\'menu\'?\'selected\':\'\'}" ></span>\n      <span click.delegate="viewPane.main=\'dev\'" class="fab fa-dev ${viewPane.main==\'dev\'?\'selected\':\'\'}" if.bind="showDev"></span>\n      <span class="fas spacer"></span>\n      <span click.delegate="viewPane.main=\'home\'" class="fas fa-user navHome ${viewPane.main==\'home\'?\'selected\':\'\'}"></span>\n      <span click.delegate="viewPane.main=\'entities\'" class="fas fa-toolbox navEntities ${viewPane.main==\'entities\'?\'selected\':\'\'}"></span>\n\n      <span click.delegate="viewPane.entityPane=\'mining\'" class="fas fa-mountain navE_Mining ${viewPane.entityPane==\'mining\' ? \'selected\': \'\'}" show.bind="viewPane.main==\'entities\' && viewPane.facBlock==player"></span>\n      <span click.delegate="viewPane.entityPane=\'manuf\'" class="fas fa-warehouse navE_Manuf ${viewPane.entityPane==\'manuf\' ? \'selected\': \'\'}" show.bind="viewPane.main==\'entities\' && viewPane.facBlock==player"></span>\n      <span click.delegate="viewPane.entityPane=\'labs\'" class="fas fa-flask navE_Lab ${viewPane.entityPane==\'labs\' ? \'selected\': \'\'}" show.bind="viewPane.main==\'entities\' && viewPane.facBlock==player"></span>\n      <span class="fas spacer" show.bind="viewPane.main==\'entities\' && viewPane.facBlock==player"></span>\n\n      <span click.delegate="viewPane.main=\'facBlocks\'" class="fas fa-industry navFacBlocks ${viewPane.main==\'facBlocks\'?\'selected\':\'\'}"></span>\n      <span click.delegate="viewPane.main=\'research\'" class="fas fa-drafting-compass navTechs ${viewPane.main==\'research\'?\'selected\':\'\'}"></span>\n    </nav>\n    <main>\n      <section id="nav" if.bind="viewPane.main==\'nav\'">\n        <p click.delegate="viewPane.main=\'nav\'"><span class="fas fa-level-up-alt fa-rotate-90 selected"></span>Expanded Nav</p>\n        <p click.delegate="viewPane.main=\'menu\'"><span class="fas fa-bars" ></span>Menu</p>\n        <p click.delegate="viewPane.main=\'dev\'"><span class="fab fa-dev" if.bind="showDev"></span>Dev Menu</p>\n        <p class="fas spacer"></p>\n        <p click.delegate="viewPane.main=\'home\'"><span class="fas fa-user navHome"></span>Player Home</p>\n        <p click.delegate="viewPane.main=\'entities\'"><span class="fas fa-toolbox navEntities"></span>Workshop</p>\n  \n        <li click.delegate="viewHelpers.PlayerBlock(\'mining\')"><span class="fas fa-mountain navE_Mining"></span>Player Mining</li>\n        <li click.delegate="viewHelpers.PlayerBlock(\'manuf\')"><span class="fas fa-warehouse navE_Manuf"></span>Player Manufacturing</li>\n        <li click.delegate="viewHelpers.PlayerBlock(\'labs\')"><span class="fas fa-flask navE_Lab"></span>Player Labs</li>\n        <p class="fas spacer"></p>\n  \n        <p click.delegate="viewPane.main=\'facBlocks\'"><span class="fas fa-industry navFacBlocks"></span>Factory Blocks</p>\n        <p click.delegate="viewPane.main=\'research\'"><span class="fas fa-drafting-compass navTechs"></span>Technologies</p>\n      </section>\n      <section id="menu" if.bind="viewPane.main==\'menu\'" style="z-index:2000">\n          <div click.delegate="resetSave()">Reset Save</div>\n          <div click.delegate="resetDS()">Reset DataSource</div>\n          <div click.delegate="viewPane.version = \'alpha\'">Alpha</div>\n          <div click.delegate="setDev()" if.bind="!showDev">Set Dev</div>\n          <div click.delegate="unsetDev()" if.bind="showDev">Unset Dev</div>\n          <div click.delegate="jumpStart()">JumpStart</div>\n          <div click.delegate="testing()">Testing()</div>\n      </section>\n      <section id="devControls" if.bind="viewPane.main==\'dev\'">\n        <button click.delegate="save()">Save</button>\n        <button click.delegate="resetSave()">Start Anew</button>\n        <button click.delegate="mgrs.Ticker.once()">Tick 1</button>\n        <button click.delegate="mgrs.Ticker.toggle()">${mgrs.Ticker.isRunning ? "Pause" : "Resume"}</button>\n        <button click.delegate="testing()">Testing...</button>\n        <button click.delegate="iconEditor()">Edit Icons</button>\n      </section>\n      <section id="playerHome" show.bind="viewPane.main==\'home\'">\n        <h3>Craftables</h3>\n        <div class="overflow" id="recipes">\n          <icon-base\n            repeat.for="rec of mgrs.rec.recipes_by_cats[\'crafting\']  | objectValues "\n            item.bind="rec"\n            title = "${rec.name}"\n            click.delegate="mgrs.rec.startCraft(rec, player.inv, \' \')"\n            show.bind="rec.enabled"\n            class.bind="rec.classesStr"\n            anim_class.bind="rec.style"\n            mouseenter.trigger="tooltip = rec"\n            mouseleave.trigger="tooltip = null"\n          ></icon-base>\n        </div>\n        <div id="resources">\n          <h3>Mineables</h3>\n          <icon-base repeat.for="res of mgrs.res.resList | canMine | objectValues" item.bind="res" click.delegate="mgrs.res.mine(res.name, player.inv)"\n                    class="${res.mining ? \'mining\': null}" anim_style.bind="res.miningStyle"></icon-base> \n        </div>\n        <div id="inventoryList">\n          <h3>Inventory</h3>\n          <inventory\n            items.bind="player.inv.items"\n            click-call.call="player.inv.click({\n              where:viewPane.facBlock, which: item\n              ,who: player, what:\'use\'\n              })"\n            ></inventory>\n        </div>\n      </section>\n      <section id="machines" show.bind="viewPane.main==\'entities\'">\n        <div show.bind="viewPlayer">\n          <div show.bind="viewPane.entityPane == \'mining\'">\n            <h4>Mining</h4>\n            <require from="./resources/elements/byModule/mining-infopane.html"></require>\n            <mining-infopane if.bind="viewPane.showingCat==\'miner\'" miner.bind="viewPane.showingItem" actor.bind="player" res-mgr.bind="mgrs.res" rounder.bind="rounder"></mining-infopane>\n            <div class="entityList">\n              <icon-base repeat.for="miner of viewPane.facBlock.getEntities(\'mining\') & signal:\'addedEntity\'" item.bind="miner" alt-image.bind="miner.mining.icon"\n                        click.delegate="showing(miner, \'miner\')" class.bind="miner.selectedClass"></icon-base>\n            </div>\n          </div>\n          <div show.bind="viewPane.entityPane == \'manuf\'">\n            <h4>Manufacturing</h4>\n            <require from="./resources/elements/byModule/crafting-infopane.html"></require>\n            <crafting-infopane if.bind="viewPane.showingCat==\'crafter\'" crafter.bind="viewPane.showingItem" rec-mgr.bind="mgrs.rec" item-mgr.bind="mgrs.item" actor.bind="player" inventory.bind="viewPane.facBlock.inv" rounder.bind="rounder"></crafting-infopane>\n            <div class="entityList">\n              <icon-base\n                repeat.for="crafter of viewPane.facBlock.getEntities(\'crafting\') & signal:\'addedEntity\'"\n                item.bind="crafter"\n                title.bind="crafter.name"\n                alt-image.bind="crafter.recipe.icon"\n                click.delegate="showing(crafter, \'crafter\')"\n                class.bind="crafter.selectedClass"\n              ></icon-base>\n            </div>\n          </div>\n          <div show.bind="viewPane.entityPane == \'labs\'">\n            <h4>Labs</h4>\n            <require from="./resources/elements/byModule/lab-infopane.html"></require>\n            <lab-infopane if.bind="viewPane.showingCat==\'labs\'" lab.bind="viewPane.showingItem" item-mgr.bind="mgrs.item" rounder.bind="rounder"></lab-infopane>\n            <div class="entityList">\n              <icon-base repeat.for="labee of viewPane.facBlock.getEntities(\'lab\') & signal:\'addedEntity\'" item.bind="labee" click.delegate="showing(labee, \'labs\')" class.bind="labee.selectedClass"></icon-base>\n            </div>\n          </div>\n        </div>\n        <div show.bind="!viewPlayer">\n          <require from="resources/elements/factoryBlocks/transportLine.html" as="transport-line"></require>\n          <require from="resources/elements/factoryBlocks/entityLine" as="entity-line"></require>\n          <require from="resources/elements/factoryBlocks/TransportLineUpgrades.html" as="tlu"></require>\n          Block Name: ${viewPane.facBlock.name}\n          <div if.bind="viewPane.facBlock.inputLine">\n            <p>\n              Feed From: ${viewPane.facBlock.feeds[0].name}\n              <span click.delegate="viewPane.facBlock.SelectBusFeed()">(Change)</span>\n            </p>\n            <transport-line\n              if.bind="viewPane.facBlock.inputLine"\n              line.bind="viewPane.facBlock.inputLine"\n              inv-click.call="CC.InvXFer(inv, player.inv, {stacks: [item]})"\n              type="input"\n            ></transport-line>\n            <tlu \n              upgrades.bind="viewPane.facBlock.upgrades.input"\n              apply-upgrade.call="viewPane.facBlock.ApplyUpgrade({\n                upgrade\n                ,inv: player.inv\n                ,line: viewPane.facBlock.inputLine\n              })"\n            ></tlu>\n            <hr>\n          </div>\n          <div repeat.for="line of viewPane.facBlock.lines">\n            <transport-line\n              if.bind="line.items"\n              line.bind="line"\n              type="internal"\n            ></transport-line>\n            <entity-line\n              if.bind="line.entities"\n              line.bind="line"\n            ></entity-line>\n          </div>\n          <div if.bind="viewPane.facBlock.outputLine">\n            <hr>\n            <p>\n              Drains To: ${viewPane.facBlock.drains[0].name}\n              <span click.delegate="viewPane.facBlock.SelectBusDrain()">(Change)</span>\n            </p>\n            <tlu\n              upgrades.bind="viewPane.facBlock.upgrades.output"\n              apply-upgrade.call="viewPane.facBlock.ApplyUpgrade({\n                upgrade\n                ,inv: player.inv\n                ,line: viewPane.facBlock.outputLine\n              })"\n            ></tlu>\n            <transport-line\n              if.bind="viewPane.facBlock.outputLine"\n              line.bind="viewPane.facBlock.outputLine"\n              inv-click.call="CC.InvXFer(inv, player.inv, {stacks: [item]})"\n              type="output"\n            ></transport-line>\n          </div>\n        </div>\n      </section>\n      <section id="facBlocks" show.bind="viewPane.main==\'facBlocks\'">\n        <h3>Factory Blocks</h3>\n        <div click.delegate="select_FacBlock(player, true)" class=\'${viewPane.facBlock==player ? "selected":""}\'>player</div>\n        <div repeat.for="facBlock of facBlocks" click.delegate="select_FacBlock(facBlock)" class=\'${viewPane.facBlock==facBlock ? "selected":""}\'>\n          ${facBlock.name}:${facBlock.type}\n        </div>\n        <div>\n          <span class="button" click.delegate="add_FacBlock(\'factory\')">Add Factory Block</span>\n          <span class="button" click.delegate="add_FacBlock(\'bus\')">Add Bus Block</span>\n          <span class="button" click.delegate="add_FacBlock(\'resource\')">Add Resource Block</span>\n          <span class="button" click.delegate="add_FacBlock(\'research\')">Add Lab Block</span>\n        </div>\n      </section>\n      <section id="technologies" show.bind="viewPane.main==\'research\'">\n        <h3>Research</h3>\n        <require from="./resources/elements/byModule/tech-infopane.html"></require>\n        <tech-infopane if.bind="viewPane.showingCat==\'tech\'" tech.bind="viewPane.showingItem" tech-mgr.bind="mgrs.tech" tooltip.bind="tooltip"></tech-infopane>\n        <div class="overflow">\n          <icon-base repeat.for="tech of mgrs.tech.shownTechs & signal:\'techUpdate\'" click.delegate="showItem = {item: tech, cat: \'tech\'}"\n                      item.bind="tech" count.bind="tech.prerequisites.length"\n                      class="${mgrs.tech.researching==tech ? \'researching\' : \'\'} ${tech.researched ? \'researched\': \'\'} ${viewPane.showingItem==tech ? \'selected\': \'\'}"\n          >\n          </icon-base>\n        </div>\n        <div>\n          <h5>Filters</h5>\n          <p>Filter Complete<button click.delegate="mgrs.tech.toggleFilter(\'complete\')">${mgrs.tech.filters.ShowComplete? "Hide":"Show"}</button></p>\n          <p>Filter Pack:\n            <span repeat.for="pack of mgrs.tech.filters.ShowPack | objectEntries & signal:\'techUpdate\'"\n              class="${pack[1]? \'selected\':\'\'}" click.delegate="mgrs.tech.toggleFilter(\'byPack\', pack[0])"\n              >\n              <img src.bind="mgrs.icon.getSrc(\'item\', pack[0])" height="16px">\n            </span>\n          </p>\n        </div>\n      </section>\n    </main>\n    <div id="tutorial">\n      <div id="tut_pos" class="center">\n        <span id="tut_text"></span>\n        <button id="tut_button" class="center"></button>\n      </div>\n      <span click.delegate="hideTutorial()" note="off">X</span>\n    </div>\n    <section class="tabs">\n      <div id="numSelectors" class="tab tab_bottom_left">\n        <input type="checkbox" class="tab_toggle" id="numSelToggle">\n        <div class="tab_content">\n          <input id="huns" type="range" min="0" max="9" step="1" value.bind="mgrs.rounder.huns">\n          <input id="tens" type="range" min="0" max="9" step="1" value.bind="mgrs.rounder.tens">\n          <input id="ones" type="range" min="0" max="9" step="1" value.bind="mgrs.rounder.ones">\n          <span>${mgrs.rounder.huns}${mgrs.rounder.tens}${mgrs.rounder.ones}</span>\n          <label class="switch"><input type="checkbox" value.bind="mgrs.rounder.abs"><span class="slider text_abs_mod"></span></label>\n          <label class="switch"><input type="checkbox" value.bind="mgrs.rounder.fail"><span class="slider text_full_part"></span></label>\n        </div>\n        <label for="numSelToggle">Rounder&nbsp<span class="tabOnly">${mgrs.rounder.huns}${mgrs.rounder.tens}${mgrs.rounder.ones}</span></label>\n      </div>\n      <div id="filterSelectors" class="tab tab_bottom_right">\n        <input type="checkbox" class="tab_toggle" id="filterSelectorToggle">\n        <div class="tab_content">\n          Yay! Filters\n        </div>\n        <label for="filterSelectorToggle">Filters</label>\n      </div>\n    </section>\n  </div>\n  <div if.bind="viewPane.version!=\'beta\'">\n    <header id="selector">\n      <div id="devControls" if.bind="showDev">\n        <button click.delegate="save()">Save</button>\n        <button click.delegate="resetSave()">Start Anew</button>\n        <button click.delegate="mgrs.Ticker.once()">Tick 1</button>\n        <button click.delegate="mgrs.Ticker.toggle()">${mgrs.Ticker.isRunning ? "Pause" : "Resume"}</button>\n        <button click.delegate="testing()">Testing...</button>\n        <button click.delegate="iconEditor()">Edit Icons</button>\n      </div>\n      <div id="playerControls">\n        <h4 click.delegate="viewPane.main = \'menu\'">&#9776;</h4>\n        <h4 click.delegate="viewPane.main = \'home\'">Home</h4>\n        <h4 click.delegate="viewPane.main = \'entities\'">Workshop</h4>\n        <h4 click.delegate="viewPane.main = \'facBlocks\'">Blocks</h4>\n        <h4 click.delegate="viewPane.main = \'research\'">Research</h4>\n      </div>\n      <div id="facBlockControls" show.bind="viewPane.facBlock==player">\n        <div show.bind="viewPane.main == \'entities\'">\n          <h5 click.delegate="viewPane.entityPane = \'mining\'">Mining</h5>\n          <h5 click.delegate="viewPane.entityPane = \'manuf\'">Manufacturing</h5>\n          <h5 click.delegate="viewPane.entityPane = \'labs\'">Labs</h5>\n        </div>\n      </div>\n      <tool-tip display.bind="tooltip" item-mgr.bind="mgrs.item" recipe-mgr.bind="mgrs.rec"></tool-tip>\n    </header>\n    <div id="mainView" if.bind="viewPane!=\'iconEditor\'">\n      <article>\n        <section id="recipes" show.bind="viewPane.main == \'home\'">\n          <h4>Craftables</h4>\n          <div class="overflow">\n            <icon-base\n              repeat.for="rec of mgrs.rec.recipes_by_cats[\'crafting\']  | objectValues "\n              item.bind="rec"\n              title = "${rec.name}"\n              click.delegate="mgrs.rec.startCraft(rec, player.inv, \' \')"\n              show.bind="rec.enabled"\n              class.bind="rec.classesStr"\n              anim_class.bind="rec.style"\n              mouseenter.trigger="tooltip = rec"\n              mouseleave.trigger="tooltip = null"\n            ></icon-base>\n          </div>\n        </section>\n        <section id="resources" show.bind="viewPane.main == \'home\'">\n          <h3>Mineables</h3>\n          <icon-base repeat.for="res of mgrs.res.resList | canMine | objectValues" item.bind="res" click.delegate="mgrs.res.mine(res.name, player.inv)"\n                    class="${res.mining ? \'mining\': null}" anim_style.bind="res.miningStyle"></icon-base> \n        </section>\n        <section id="technologies"  show.bind="viewPane.main == \'research\'">\n          <h3>Research</h3>\n          <require from="./resources/elements/byModule/tech-infopane.html"></require>\n          <tech-infopane if.bind="viewPane.showingCat==\'tech\'" tech.bind="viewPane.showingItem" tech-mgr.bind="mgrs.tech" tooltip.bind="tooltip"></tech-infopane>\n          <div class="overflow">\n            <icon-base repeat.for="tech of mgrs.tech.shownTechs & signal:\'techUpdate\'" click.delegate="showItem = {item: tech, cat: \'tech\'}"\n                        item.bind="tech" count.bind="tech.prerequisites.length"\n                        class="${mgrs.tech.researching==tech ? \'researching\' : \'\'} ${tech.researched ? \'researched\': \'\'} ${viewPane.showingItem==tech ? \'selected\': \'\'}"\n            >\n            </icon-base>\n          </div>\n          <div>\n            <h5>Filters</h5>\n            <p>Filter Complete<button click.delegate="mgrs.tech.toggleFilter(\'complete\')">${mgrs.tech.filters.ShowComplete? "Hide":"Show"}</button></p>\n            <p>Filter Pack:\n              <span repeat.for="pack of mgrs.tech.filters.ShowPack | objectEntries & signal:\'techUpdate\'"\n                class="${pack[1]? \'selected\':\'\'}" click.delegate="mgrs.tech.toggleFilter(\'byPack\', pack[0])"\n                >\n                <img src.bind="mgrs.icon.getSrc(\'item\', pack[0])" height="16px">\n              </span>\n            </p>\n          </div>\n        </section>\n        <section id="facBlocks" show.bind="viewPane.main == \'facBlocks\'">\n          <h3>Factory Blocks</h3>\n          <div click.delegate="select_FacBlock(player, true)" class=\'${viewPane.facBlock==player ? "selected":""}\'>player</div>\n          <div repeat.for="facBlock of facBlocks" click.delegate="select_FacBlock(facBlock)" class=\'${viewPane.facBlock==facBlock ? "selected":""}\'>\n            ${facBlock.name}:${facBlock.type}\n          </div>\n          <div>\n            <span class="button" click.delegate="add_FacBlock(\'factory\')">Add Factory Block</span>\n            <span class="button" click.delegate="add_FacBlock(\'bus\')">Add Bus Block</span>\n            <span class="button" click.delegate="add_FacBlock(\'resource\')">Add Resource Block</span>\n            <span class="button" click.delegate="add_FacBlock(\'research\')">Add Lab Block</span>\n          </div>\n        </section>\n        <section id="machines" if.bind="viewPane.main == \'entities\' && viewPlayer">\n          <div show.bind="viewPane.entityPane == \'mining\'">\n            <h4>Mining</h4>\n            <require from="./resources/elements/byModule/mining-infopane.html"></require>\n            <mining-infopane if.bind="viewPane.showingCat==\'miner\'" miner.bind="viewPane.showingItem" actor.bind="player" res-mgr.bind="mgrs.res" rounder.bind="rounder"></mining-infopane>\n            <div class="entityList">\n              <icon-base repeat.for="miner of viewPane.facBlock.getEntities(\'mining\') & signal:\'addedEntity\'" item.bind="miner" alt-image.bind="miner.mining.icon"\n                        click.delegate="showing(miner, \'miner\')" class.bind="miner.selectedClass"></icon-base>\n            </div>\n          </div>\n          <div show.bind="viewPane.entityPane == \'manuf\'">\n            <h4>Manufacturing</h4>\n            <require from="./resources/elements/byModule/crafting-infopane.html"></require>\n            <crafting-infopane if.bind="viewPane.showingCat==\'crafter\'" crafter.bind="viewPane.showingItem" rec-mgr.bind="mgrs.rec" item-mgr.bind="mgrs.item" actor.bind="player" inventory.bind="viewPane.facBlock.inv" rounder.bind="rounder"></crafting-infopane>\n            <div class="entityList">\n              <icon-base\n                repeat.for="crafter of viewPane.facBlock.getEntities(\'crafting\') & signal:\'addedEntity\'"\n                item.bind="crafter"\n                title.bind="crafter.name"\n                alt-image.bind="crafter.recipe.icon"\n                click.delegate="showing(crafter, \'crafter\')"\n                class.bind="crafter.selectedClass"\n              ></icon-base>\n            </div>\n          </div>\n          <div show.bind="viewPane.entityPane == \'labs\'">\n            <h4>Labs</h4>\n            <require from="./resources/elements/byModule/lab-infopane.html"></require>\n            <lab-infopane if.bind="viewPane.showingCat==\'labs\'" lab.bind="viewPane.showingItem" item-mgr.bind="mgrs.item" rounder.bind="rounder"></lab-infopane>\n            <div class="entityList">\n              <icon-base repeat.for="labee of viewPane.facBlock.getEntities(\'lab\') & signal:\'addedEntity\'" item.bind="labee" click.delegate="showing(labee, \'labs\')" class.bind="labee.selectedClass"></icon-base>\n            </div>\n          </div>\n        </section>\n        <section if.bind="viewPane.main == \'entities\' && !viewPlayer">\n          <require from="resources/elements/factoryBlocks/transportLine.html" as="transport-line"></require>\n          <require from="resources/elements/factoryBlocks/entityLine" as="entity-line"></require>\n          <require from="resources/elements/factoryBlocks/TransportLineUpgrades.html" as="tlu"></require>\n          Block Name: ${viewPane.facBlock.name}\n          <div if.bind="viewPane.facBlock.inputLine">\n            <p>\n              Feed From: ${viewPane.facBlock.feeds[0].name}\n              <span click.delegate="viewPane.facBlock.SelectBusFeed()">(Change)</span>\n            </p>\n            <transport-line\n              if.bind="viewPane.facBlock.inputLine"\n              line.bind="viewPane.facBlock.inputLine"\n              inv-click.call="CC.InvXFer(inv, player.inv, {stacks: [item]})"\n              type="input"\n            ></transport-line>\n            <tlu \n              upgrades.bind="viewPane.facBlock.upgrades.input"\n              apply-upgrade.call="viewPane.facBlock.ApplyUpgrade({\n                upgrade\n                ,inv: player.inv\n                ,line: viewPane.facBlock.inputLine\n              })"\n            ></tlu>\n            <hr>\n          </div>\n          <div repeat.for="line of viewPane.facBlock.lines">\n            <transport-line\n              if.bind="line.items"\n              line.bind="line"\n              type="internal"\n            ></transport-line>\n            <entity-line\n              if.bind="line.entities"\n              line.bind="line"\n            ></entity-line>\n          </div>\n          <div if.bind="viewPane.facBlock.outputLine">\n            <hr>\n            <p>\n              Drains To: ${viewPane.facBlock.drains[0].name}\n              <span click.delegate="viewPane.facBlock.SelectBusDrain()">(Change)</span>\n            </p>\n            <tlu\n              upgrades.bind="viewPane.facBlock.upgrades.output"\n              apply-upgrade.call="viewPane.facBlock.ApplyUpgrade({\n                upgrade\n                ,inv: player.inv\n                ,line: viewPane.facBlock.outputLine\n              })"\n            ></tlu>\n            <transport-line\n              if.bind="viewPane.facBlock.outputLine"\n              line.bind="viewPane.facBlock.outputLine"\n              inv-click.call="CC.InvXFer(inv, player.inv, {stacks: [item]})"\n              type="output"\n            ></transport-line>\n          </div>\n        </section>\n        <section id="menu" show.bind="viewPane.main==\'menu\'" style="z-index: 2000">\n          <div click.delegate="resetSave()">Reset Save</div>\n          <div click.delegate="resetDS()">Reset DataSource</div>\n          <div click.delegate="viewPane.version = \'beta\'">Beta</div>\n          <div click.delegate="setDev()" if.bind="!showDev">Set Dev</div>\n          <div click.delegate="unsetDev()" if.bind="showDev">Unset Dev</div>\n          <div click.delegate="jumpStart()">JumpStart</div>\n          <div click.delegate="testing()">Testing()</div>\n\n        </section>\n      </article>\n    </div>\n    <div id="iconEditor" if.bind="viewPane==\'iconEditor\'">\n      <select value.bind="IE.select.Cat">\n        <option repeat.for="cat of IE.ds.old | objectKeys & signal:\'update\'" model.bind="cat">${cat}</option>\n      </select>\n      <select value.bind="IE.select.Icon">\n        <option repeat.for="icon of IE.ds.old[IE.select.Cat] | objectKeys & signal:\'update\'" model.bind="icon">${icon}</option>\n      </select>\n      <button click.delegate="IEshow()">Show</button><br>\n      <figcaption class="inline">Old</figcaption>\n      <img src.bind="IE.showOld & signal:\'update\'" height="64px" width="64px"/>\n      <img src.bind="IE.showNew & signal:\'update\'" height="64px" width="64px"/>\n      <figcaption class="inline">New</figcaption><br>\n      <input type="file" files.bind="IE.file" accept="image/*" change.delegate="IEfiled()">Select replace</input>\n      <img src.bind="IE.fileBlob"></img><br>\n      <button click.delegate="IEStore()">Store</button>\n      <button click.delegate="saveIconEditor()">SaveDB</button><br>\n      <button click.delegate="dlIconEditor()">Download</button>\n      <input type="file" name="name" files.bind="IE.upload" style="display:none" id="IconFileSelect" accept=".json" change.delegate="ulIconEditor()">\n      <button onclick="document.getElementById(\'IconFileSelect\').click();">Upload</button>\n    </div>\n    <section id="inventoryList">\n      <h3>Inventory</h3>\n      <inventory\n        items.bind="player.inv.items"\n        click-call.call="player.inv.click({\n          where:viewPane.facBlock, which: item\n          ,who: player, what:\'use\'\n          })"\n        ></inventory>\n    </section>\n    <div id="tutorial">\n      <div id="tut_pos" class="center">\n        <span id="tut_text"></span>\n        <button id="tut_button" class="center"></button>\n      </div>\n      <span click.delegate="hideTutorial()" note="off">X</span>\n    </div>\n    <section id="numSelectors">\n      <input type="checkbox" id="numSelToggle" style="display:none">\n      <label for="numSelToggle">Rounder&nbsp<span class="tabOnly">${mgrs.rounder.huns}${mgrs.rounder.tens}${mgrs.rounder.ones}</span>\n      </label>\n      <input id="huns" type="range" min="0" max="9" step="1" value.bind="mgrs.rounder.huns">\n      <input id="tens" type="range" min="0" max="9" step="1" value.bind="mgrs.rounder.tens">\n      <input id="ones" type="range" min="0" max="9" step="1" value.bind="mgrs.rounder.ones">\n      <span>${mgrs.rounder.huns}${mgrs.rounder.tens}${mgrs.rounder.ones}</span>\n      <label class="switch"><input type="checkbox" value.bind="mgrs.rounder.abs"><span class="slider text_abs_mod"></span></label>\n      <label class="switch"><input type="checkbox" value.bind="mgrs.rounder.fail"><span class="slider text_full_part"></span></label>\n    </section>\n    \x3c!-- section id="tagFilter">\n      <input id="drawer-toggle" type="checkbox" />\n      <label for="drawer-toggle" id="drawer-toggle-label">\n        <span>Filters</span>\n      </label>\n      <div id="drawer">\n        More Data!\n      </div> \n    </!--\x3e\n    \x3c!-- div id="commands" class="drawer bottom center" hidden>\n      <input type="checkbox" id="show_command_drawer">\n      <label class="cmd_label" for="show_command_drawer">\n        <span id="cmd_text">?</span>\n        <img src="xxxHTMLLINKxxx0.66067060473304550.1398955736348857xxx" id="cmd_icon" hidden>\n      </label>\n      <div class="content">\n        potatoes\n      </div>\n    </!--\x3e\n  </section>\n</template>\n'}}]);
//# sourceMappingURL=app~752ba38f.f0c14ea52e250a05e3f3.bundle.map