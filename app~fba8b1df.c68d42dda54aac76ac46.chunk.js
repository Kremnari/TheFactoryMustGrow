(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{"3Qvj":function(e,n,t){"use strict";t.d(n,"a",(function(){return r}));var i=t("aurelia-dialog"),s=t("resources/dialogs/SelectBus"),o=t("resources/dialogs/SelectRecipe"),c=t("resources/dialogs/SelectX"),r=function(){function e(e){this.ds=e,this.modals={SelectBus:s.SelectBus,SelectRecipe:o.SelectRecipe,SelectX:c.SelectX}}return e.prototype.open=function(e,n,t){var i=this;return void 0===t&&(t=!1),new Promise((function(s,o){i.ds.open({viewModel:i.modals[e],model:n,lock:t}).whenClosed((function(e){return s(e.output)}))}))},e}();r.inject=[i.DialogService]},"resources/attributes/loading":function(e,n,t){"use strict";var i;t.r(n),t.d(n,"LoadingAnimCustomAttribute",(function(){return s}));var s=function(){function e(e){this.element=e,this.inner=e.cloneNode(!0)}return e.prototype.valueChanged=function(e){e&&this.element.replaceWith(this.inner),e||this.element.replaceWith(i)},e}();s.inject=[Element],s.setLoadingElem=function(e){i=document.querySelector(e).cloneNode(!0)}},"resources/components/tabPopout":function(e,n,t){"use strict";t.r(n),t.d(n,"TabPopout",(function(){return i}));var i=function(){this.id="tabPopout"+Math.ceil(1e3*Math.random())}},"resources/components/tabPopout.html":function(e,n,t){e.exports='<template>\n  <require from="./tabPopout.scss"></require>\n  <input type="checkbox" class="tab_toggle" id.one-time="id">\n  <label for.one-time="id">\n    <slot name="tab">\n      Tab Name Goes Here\n    </slot>\n  </label>\n  <slot name="content">\n    Random Content!\n  </slot>\n</template>\n'},"resources/components/tabPopout.scss":function(e,n,t){(n=t("JPst")(!1)).push([e.i,"tab-popout{position:fixed}tab-popout>.tab_toggle{display:none}tab-popout>label{background-color:hsla(0,0%,49.8%,.5);text-align:center;margin:0;position:absolute;display:inline-block;width:16vh}tab-popout>label .tabOnly{display:inline}tab-popout [slot=content]{display:none}tab-popout>input[type=checkbox]:checked~[slot=content]{display:block;background-color:#2f4f4f;border:1px dashed #000;border-radius:8px}tab-popout>input[type=checkbox]:checked~[slot=content]>*{display:inline-block}tab-popout>input[type=checkbox]:checked~label .tabOnly{display:none}tab-popout.tab_bottom_left{bottom:0;left:0}tab-popout.tab_bottom_left>label{transform:translateX(-100%) rotate(90deg);transform-origin:bottom right;bottom:1vh;left:min(1vw,10px)}tab-popout.tab_bottom_left>.tab_toggle:checked~label{left:70px;padding:2px 75%;transform:translate(-100%,-150%) rotate(90deg)}tab-popout.tab_bottom_right{bottom:0;right:0}tab-popout.tab_bottom_right>label{transform:translateX(100%) rotate(-90deg);transform-origin:bottom left;bottom:1vh;right:min(1vw,10px)}tab-popout.tab_bottom_right>.tab_toggle:checked~label{right:70px;padding:2px 75%;transform:translate(100%,-150%) rotate(-90deg);bottom:unst}",""]),e.exports=n},"resources/dialogs/SelectBus":function(e,n,t){"use strict";t.r(n),t.d(n,"SelectBus",(function(){return s}));var i=t("aurelia-dialog"),s=function(){function e(e){this.controller=e}var n=e.prototype;return n.activate=function(e){var n;this.options=(null==(n=e.base)?void 0:n.facBlocks)||e.buses,this.selected=null},n.selectedChanged=function(e){console.log(e)},n.complete=function(){this.controller.ok({selected:this.selected})},e}();s.inject=[i.DialogController]},"resources/dialogs/SelectBus.html":function(e,n){e.exports='<template>\n  <ux-dialog>\n    <ux-dialog-header>Select Bus</ux-dialog-header>\n    <ux-dialog-body>\n      <div repeat.for="block of options" click.trigger="selected = (block == selected && undefined ) || block">\n        <span class.bind="block==selected && \'button\'">\n        ${block.name+":"+block.type}\n        </span>\n      </div>\n    </ux-dialog-body>\n    <ux-dialog-footer>\n      <button click.trigger="complete()">Close</button>\n    </ux-dialog-footer>\n  </ux-dialog>\n</template>\n'},"resources/dialogs/SelectRecipe":function(e,n,t){"use strict";t.r(n),t.d(n,"SelectRecipe",(function(){return o}));var i=t("aurelia-dialog"),s=t("+Aae"),o=function(){function e(e,n){this.selected=null,this.controller=e,this.mgrs=n}var n=e.prototype;return n.activate=function(e){var n,t=this;this.model=e,Object.entries(e.tags).forEach((function(e){var i=e[0],s=e[1];n=t.mgrs.rec.recipesByTags(i,s,n)})),this.recList=n},n.select=function(e){this.selected=e==this.selected?null:e},n.complete=function(){this.controller.ok({recipe:this.selected})},e}();o.inject=[i.DialogController,s.a]},"resources/dialogs/SelectRecipe.html":function(e,n){e.exports='<template>\n  <ux-dialog>\n    <ux-dialog-header>Select Recipe</ux-dialog-header>\n    <ux-dialog-body>\n      <icon-base\n        repeat.for="rec of recList"\n        item.bind="rec"\n        click.delegate="select(rec)"\n        class="${rec==selected ? \'selected\' : \'\'}"\n      ></icon-base>\n    </ux-dialog-body>\n    <ux-dialog-footer>\n      <button click.trigger="complete()">Done</button>\n    </ux-dialog-footer>\n  </ux-dialog>\n</template>\n'},"resources/dialogs/SelectX":function(e,n,t){"use strict";t.r(n),t.d(n,"SelectX",(function(){return o}));var i=t("aurelia-dialog"),s=t("+Aae"),o=function(){function e(e,n){this.selected=null,this.controller=e,this.mgrs=n}var n=e.prototype;return n.activate=function(e){this.list=e.list,this.type=e.type,this.custom=e.custom,this.selected=e.default},n.select=function(e){this.selected=e==this.selected?null:e},n.complete=function(){this.selected?this.custom?this.controller.ok({item:this.selected.id}):this.selected.icon||"icon"==this.type?this.controller.ok({item:this.selected}):this.controller.ok({item:this.selected.$_id}):this.controller.ok({})},e}();o.inject=[i.DialogController,s.a]},"resources/dialogs/SelectX.html":function(e,n){e.exports='<template>\n  <ux-dialog>\n    <ux-dialog-header>Select ${type}</ux-dialog-header>\n    <ux-dialog-body>\n      <div if.bind="custom && type==\'bus\'" class="container">\n        <div class="row">\n          <div\n            repeat.for="each of list"\n            click.delegate="select(each)"\n            class="${each.name==selected.name && \'selected\'} col"\n          >\n              ${each.name}\n              <icon-base item.bind="each" class="half"></icon-base>\n          </div>\n        </div>\n        <hr>\n        <div class="row">\n          <div class="col">\n            <p\n              if.bind="custom.showDefense"\n              click.delegate="select({custom: \'defense\', id: \'@defense\'})"\n              class="${selected.custom==\'defense\' && \'selected\'}"\n            >Defense</p>\n          </div>\n          <div class="col">\n            <p\n              if.bind="custom.showMarket"\n              click.delegate="select({custom: \'market\', id: \'@market\'})"\n              class="${selected.custom==\'market\' && \'selected\'}"\n            >Market</p>\n          </div>\n          <div class="col">\n            <p\n              if.bind="custom.showOffense"\n              click.delegate="select({custom: \'offense\', id: \'@offense\'})"\n              class="${selected.custom==\'offense\' && \'selected\'}"\n            >Offense</p>\n          </div>\n        </div>\n        <div class="row">\n          <div class="col"></div>\n          <div class="col"></div>\n          <div class="col">\n            <p\n              if.bind="custom.showDisconnect"\n              click.delegate="select({custom: \'disconnect\', id: \'@none\'})"\n              class="${selected.custom==\'disconnect\' && \'selected\'}"\n            >Disconnect</p>\n          </div>\n        </div>\n      </div>\n      <div if.bind="!custom && (list[0].icon || type==\'icon\')">\n        <icon-base\n          repeat.for="each of list"\n          item.bind="each"\n          click.delegate="select(each)"\n          class="${each==selected ? \'selected\' : \'\'}"\n        >${each.name}</icon-base>\n      </div>\n      <div if.bind="!custom && !list[0].icon && type!=\'icon\'">\n        <p  \n          repeat.for="each of list"\n          click.delegate="select(each)"\n          class="${each==selected ? \'selected\' : \'\'}"\n          >${each.name}</p>\n      </div>\n    </ux-dialog-body>\n    <ux-dialog-footer>\n      <button click.trigger="complete()">Close</button>\n    </ux-dialog-footer>\n  </ux-dialog>\n</template>\n'},"resources/elements/active-trigger.html":function(e,n){e.exports='<template bindable="entity, tag">\n  <span\n    if.bind="entity[tag]"\n    click.delegate="entity[tag] = false"\n  >On</span>\n  <span\n    if.bind="!entity[tag]"\n    click.delegate="entity[tag] = true"\n  >Off</span>\n</template>\n'},"resources/elements/byModule/crafting-infopane.html":function(e,n,t){e.exports='<template>\n  <scope-var var.bind="$scope = {crafter: viewPane.showingItem}"></scope-var>\n  <require from="../../value-converters/lib/ObjectFilters"></require>\n  <style>\n    .overflow.recipe {\n      max-height: 8rem;\n    }\n  </style>\n  <div class="row mx-0">\n    <div class="container-fluid">\n      <div class="row">\n        <div \n          class="showRecipe col-7"\n          if.bind="$scope.crafter.processing"\n        >\n          <div\n            class="row ${$scope.crafter.process_timer!=NaN && \'progressBarBase\'}"\n            css="border-image-source: linear-gradient(to left, red ${$scope.crafter.process_timer/$scope.crafter.process_ticks*100}%, green ${$scope.crafter.process_timer/$scope.crafter.process_ticks*100}%)"\n          > \n            <span class="col">\n              <icon-base\n                repeat.for="ing of $scope.crafter.processing.ingredients | objectValues"\n                item.bind="ing.name"\n                required.bind="ing.amount"\n                count.bind="CCC.utilityFn(\'inventory.total\', $scope.crafter.buffers.in, {name: ing.name}) & signal:\'bufferUpdate\'"\n                click.delegate="CCC.issue(\'entity.bufferFill\', {\'which.buffer\': $scope.crafter.buffers.in, \'item.name\': ing.name}, $event)"\n              ></icon-base>\n            </span>\n            <span class="cycleTime">[${($scope.crafter.process_ticks/30).toFixed(1)}s]</span>\n            <span class="recipeBreak">=&gtcc;</span>\n            <span class="col">\n              <icon-base\n                repeat.for="res of $scope.crafter.processing.results | objectValues"\n                item.bind="res.name"\n                required.bind="res.amount"\n                count.bind="CCC.utilityFn(\'inventory.total\', $scope.crafter.buffers.out, {name: res.name}) & signal:\'bufferUpdate\'"\n                click.delegate="CCC.issue(\'entity.bufferCollect\', {\'which.buffer\': $scope.crafter.buffers.out, \'item.name\': res.name}, $event)"\n              ></icon-base>\n            </span>\n          </div>\n          <div class="row">\n            <span class="col">In Max: ${IgorJs.getObjId($scope.crafter.buffers.in).stackSize}</span>\n            <span class="col">Out Max: ${IgorJs.getObjId($scope.crafter.buffers.out).stackSize}</span>\n          </div>\n          <p click.delegate="CCC.issue(\'entity.setProcess\', {\'which.process\': null, \'type.class\': null}, $event)" class="text-center">Clear recipe</p>\n        </div>\n        <div if.bind="!$scope.crafter.processing" id="recipeSelect" class="col-7">\n          <p>Select recipe to craft</p>\n          <div class="overflow recipe">\n            <icon-base\n              repeat.for="rec of ChameView.viewFn.recipeFilter($scope.crafter.crafting_categories) | objectValues & signal:\'techResearched\'"\n              item.bind="rec"\n              click.delegate="CCC.issue(\'entity.setProcess\', {\'which.process\': rec, \'type.class\': \'crafting\'}, $event)"\n              class="${rec==$scope.crafter.processing ? \'selected\': \'\'}"\n              mouseenter.bind="(tooltip = rec) & debounce:2000"\n              mouseleave.bind="(tooltip = null) & debounce:2000"\n            ></icon-base>\n          </div>\n        </div>\n        <div class="col-5">\n          <compose view="resources/elements/byModule/upgrades-infopane.html"></compose>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class="row mx-0">\n    <div class="col">\n      <compose view="resources/elements/byModule/workshop-controls.html"></compose>\n    </div>\n  </div>\n</template>\n'},"resources/elements/byModule/lab-infopane.html":function(e,n,t){e.exports='<template>\n  <scope-var var.bind="$scope = {lab: viewPane.showingItem}"></scope-var>\n  <require from="./upgrades-infopane"></require>\n  <div class="container">\n    Max Buffer: ${IgorJs.getObjId($scope.lab.buffers.in).stackSize}\n    <div class="row">\n      <div class="col">\n        <div\n          class="labInput progressBarBase"\n          click.capture="CCC.provide($event, \'which\', \'buffer\', $scope.lab.buffers.in)"\n          css="border-image-source: linear-gradient(to left, red ${$scope.lab.research_timer/$scope.lab.research_time*100}%, green ${$scope.lab.research_timer/$scope.lab.research_time*100}%)"\n        >\n          <icon-base\n            repeat.for="input of $scope.lab.inputs"\n            item.bind="input"\n            count.bind="CCC.utilityFn(\'inventory.total\', $scope.lab.buffers.in, {name: input}) & signal:\'bufferUpdate\'"\n            click.delegate="CCC.issue(\'entity.bufferFill\', {\'item.name\': input}, $event)"\n            title="Click to add ${input}"\n          ></icon-base>\n        </div>\n      </div>\n      <div class="col">\n        <span if.bind="globals.research.progressing">\n          ${globals.research.progressing.name}<br>\n          [${$scope.lab.research_time/30}s]<br>\n          ${globals.research[globals.research.progressing.name].completeUnits}/\n          ${globals.research.progressing.cost.count}\n        </span>\n      </div>\n      <div class="col">\n        <compose view="resources/elements/byModule/upgrades-infopane.html"></compose>\n      </div>\n    </div>\n    <div class="row">\n      <div class="col">\n        <compose view="resources/elements/byModule/workshop-controls.html"></compose>\n      </div>\n    </div>\n  </div>\n</template>\n'},"resources/elements/byModule/mining-infopane.html":function(e,n,t){e.exports='<template bindable="item">\n  <require from="./upgrades-infopane"></require>\n  <scope-var var.bind="$scope = {miner: viewPane.showingItem}"></scope-var>\n  <div class="container">\n    <div class="minable-resources row">\n      <div class="col-7">\n        <div\n          if.bind="!$scope.miner.processing"\n        >\n          <p>Select Resource to Mine</p>\n          <icon-base\n            repeat.for="res of dataSet.resource | filter:{key:\'category\', value:$scope.miner.resource_categories, includeUndefs: true} | objectValues"\n            item.bind="res"\n            click.delegate="CCC.issue(\'entity.setProcess\', {\'which.process\': res, \'type.class\':\'mining\'}, $event)"\n            class="${res==$scope.miner.processing ? \'selected\': \'\'}"\n          ></icon-base>\n        </div>\n        <div\n          if.bind="$scope.miner.processing"\n        >\n          <span\n            click.delegate="CCC.issue(\'entity.bufferCollect\', {\'which.buffer\': $scope.miner.buffers.out, \'item.name\': $scope.miner.processing.mining_results}, $event)"\n            class="progressBarBase"\n            css="border-image-source: linear-gradient(to left, red ${$scope.miner.process_timer}%, green ${$scope.miner.process_timer}%)"\n          >\n            <icon-base\n              item.bind="$scope.miner.processing.mining_results"\n              count.bind="CCC.utilityFn(\'inventory.total\', $scope.miner.buffers.out, {name: $scope.miner.processing.mining_results}) & signal:\'bufferUpdate\'"\n              title="Click to collect"\n            ></icon-base>\n            /${IgorJs.getObjId($scope.miner.buffers.out).stackSize}\n            \x3c!-- # magic number --\x3e\n            [${($scope.miner.process_ticks/30).toFixed(1) }s]\n          </span>\n          <span click.delegate="CCC.issue(\'entity.setProcess\', {\'which.process\': null, \'type.class\': null}, $event)">\n            Change\n          </span>\n        </div>\n      </div>\n      <div class="col-5">\n        <compose view="resources/elements/byModule/upgrades-infopane.html" entity.bind="$scope.miner" parcel.bind="$scope.miner.parent"></compose>\n      </div>\n    </div>\n    <div class="row">\n      <div class="col">\n        <compose view="resources/elements/byModule/workshop-controls.html"></compose>\n      </div>\n    </div>\n  </div>\n</template>\n'},"resources/elements/byModule/tech-infopane.html":function(e,n){e.exports='<template>\n  <scope-var var.bind="$scope = {tech: viewPane.showingItem}"></scope-var>\n  <div click.capture="CCC.provide($event, \'which\', \'tech\', $scope.tech)">\n    <h5><icon-base item.bind="$scope.tech"></icon-base>${$scope.tech.name}</h5>\n    <button click.delegate="CCC.issue(\'research.set\', {}, $event)" if.bind="!globals.research.progressing && !globals.research[$scope.tech.name].complete" id="StartResearch">Research</button>\n    <button click.delegate="CCC.issue(\'research.clear\', {}, $event)" if.bind="globals.research.progressing.name == $scope.tech.name">Cancel</button>\n    <div if.bind="!globals.research[$scope.tech.name].complete & signal:\'techResearched\'">\n      <strong>Cost</strong>\n      <icon-base repeat.for="unit of $scope.tech.cost.ingredients" item.bind="unit[0]"></icon-base>\n      x${$scope.tech.cost.count - globals.research[$scope.tech.name].completeUnits}\n      <br>\n      <strong>Unlocks</strong>\n      <div repeat.for="unlock of $scope.tech.unlocks">\n        <icon-base if.bind="typeof unlock === \'string\'" item.bind="unlock" mouseenter.trigger="tooltip = unlock" mouseleave.trigger="tooltip = null"></icon-base>\n        <span if.bind="typeof unlock === \'object\'">\n          Feature: ${unlock.feature}<br>\n          ${unlock.text}\n        </span>\n      </div>\n    </div>\n    <div if.bind="globals.research[$scope.tech.name].complete & signal:\'techResearched\'">\n      <strong>Unlocked</strong>\n      <div repeat.for="unlock of $scope.tech.unlocks">\n        <icon-base if.bind="typeof unlock === \'string\'" item.bind="unlock" mouseenter.trigger="tooltip = unlock" mouseleave.trigger="tooltip = null"></icon-base>\n        <span if.bind="typeof unlock === \'object\'">Feature: ${unlock.feature}</span>\n      </div>\n    </div>\n  </div>\n</template>\n'},"resources/elements/byModule/upgrades-infopane":function(e,n,t){"use strict";t.r(n),t.d(n,"upgradesInfopaneCustomElement",(function(){return d}));var i,s,o,c=t("aurelia-framework"),r=t("+Aae");function a(e,n,t,i){t&&Object.defineProperty(e,n,{enumerable:t.enumerable,configurable:t.configurable,writable:t.writable,value:t.initializer?t.initializer.call(i):void 0})}function l(e,n,t,i,s){var o={};return Object.keys(i).forEach((function(e){o[e]=i[e]})),o.enumerable=!!o.enumerable,o.configurable=!!o.configurable,("value"in o||o.initializer)&&(o.writable=!0),o=t.slice().reverse().reduce((function(t,i){return i(e,n,t)||t}),o),s&&void 0!==o.initializer&&(o.value=o.initializer?o.initializer.call(s):void 0,o.initializer=void 0),void 0===o.initializer&&(Object.defineProperty(e,n,o),o=null),o}var d=(s=l((i=function(){a(this,"entity",s,this),a(this,"parcel",o,this),this.EM=r.a.entity}).prototype,"entity",[c.c],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),o=l(i.prototype,"parcel",[c.c],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),i)},"resources/elements/byModule/upgrades-infopane.html":function(e,n){e.exports='<template>\n  <scope-var var.bind="$scope.entity = viewPane.showingItem"></scope-var>\n  <style>\n    .upgrades-infopane icon-base {\n      width: 32px;\n      height: 32px;\n    }\n    .upgrades-infopane {\n      font-size: 0.9rem;\n    }\n  </style>\n  <div class="upgrades-infopane container">\n    <div\n      class="row"\n      if.bind="$scope.entity.buffers.in"\n      click.capture="CCC.provide($event, \'which\', \'buffer\', $scope.entity.buffers.in)"\n      >\n      <div>\n        <scope-var var.bind="$scope.inBuffer = IgorJs.getObjId($scope.entity.buffers.in)"></scope-var>\n        Input Upgrades\n      </div>\n      <div>\n        <icon-base\n          item="iron-chest"\n          count.bind="$scope.inBuffer.upgrades.bufferSize.count"\n          click.delegate="CCC.issue(\'entity.bufferUpgrade\', {\'type.string\': \'buffer\'}, $event)"\n          class="${$scope.inBuffer.upgrades.bufferSize.count>=6 && \'countFull\'}"\n        ></icon-base>\n        <icon-base\n          item="inserter"\n          if.bind="!parcel.isPlayer"\n          count.bind="$scope.inBuffer.upgrades.loader.count"\n          stalled.bind="$scope.inBuffer.upgrades.loader.count>0 && $scope.inBuffer.stalled"\n          progress.bind="($scope.inBuffer.xferTicks-$scope.inBuffer.xferTimer)/$scope.inBuffer.xferTicks*100"\n          click.delegate="CCC.issue(\'entity.bufferUpgrade\', {\'type.string\': \'autoload\'}, $event)"\n          class="${$scope.inBuffer.upgrades.loader.count>=10 && \'countFull\'}"\n        ></icon-base>\n        <active-trigger\n          entity.bind="$scope.inBuffer"\n          tag="active"\n          if.bind="$scope.inBuffer.xfer>0"\n        ></active-trigger>\n      </div>\n    </div>\n    <div\n      class="row"\n      if.bind="$scope.entity.buffers.out"\n      click.capture="CCC.provide($event, \'which\', \'buffer\', $scope.entity.buffers.out)"\n    >\n      <div>\n        <scope-var var.bind="$scope.outBuffer = IgorJs.getObjId($scope.entity.buffers.out)"></scope-var>\n        Output Upgrades\n      </div>\n      <div>\n        <icon-base\n          item="iron-chest"\n          count.bind="$scope.outBuffer.upgrades.bufferSize.count"\n          click.delegate="CCC.issue(\'entity.bufferUpgrade\', {\'type.string\': \'buffer\'}, $event)"\n          class="${$scope.outBuffer.upgrades.bufferSize.count>=6 && \'countFull\'}"\n        ></icon-base>\n        <icon-base\n          item="inserter"\n          if.bind="!parcel.isPlayer"\n          count.bind="$scope.outBuffer.upgrades.loader.count"\n          stalled.bind="$scope.outBuffer.upgrades.loader.count>0 && $scope.outBuffer.stalled"\n          progress.bind="(($scope.outBuffer.xferTicks-$scope.outBuffer.xferTimer)/$scope.outBuffer.xferTicks*100)"\n          click.delegate="CCC.issue(\'entity.bufferUpgrade\', {\'type.string\': \'autoload\'}, $event)"\n          class="${$scope.outBuffer.upgrades.loader.count>=10 && \'countFull\'}"\n        ></icon-base>\n        <active-trigger\n          entity.bind="$scope.outBuffer"\n          tag="active"\n          if.bind="$scope.outBuffer.xfer>0"\n        ></active-trigger>\n      </div>\n    </div>\n  </div>\n</template>\n'},"resources/elements/byModule/workshop-controls.html":function(e,n){e.exports='<template>\n    <scope-var var.bind="$scope.entity = viewPane.showingItem"></scope-var>\n    <style>\n        .wc-input {\n            width: 2.5em\n        }\n        #work_controls {\n            text-align: center;\n        }\n        #work_controls .fas {\n            width: 32px;\n            height: 32px;\n        }\n        .editActive {\n            color: green;\n        }\n    </style>\n    <span\n        class="${$scope.editPos && \'editActive\'}"\n        if.bind="IgorRunner.getNamedObject(\'global\').player.workshop.entities.length-1"\n        click.delegate="$scope.editPos=!$scope.editPos"\n    >Edit Position</span>\n    <section id="work_controls" if.bind="$scope.editPos">\n        <div class="row">\n            <div class="col align-self-center">\n                Move Spaces\n            </div>\n        </div>\n        <div class="row">\n            <div class="col">\n                <span\n                    show.bind="$scope.entity.order<IgorRunner.getNamedObject(\'global\').player.workshop.entities.length-1"\n                    class="fas fa-angle-right fa-rotate-180 fa-2x"\n                    click.delegate="CCC.utilityFn(\'workshop.moveEntity\', null, {which: $scope.entity.$_id, to: $scope.entity.order+orderStep})"\n                ></span>\n            </div>\n            <div class="col">\n                <input type="hidden" value.one-time="orderStep = 1">\n                <input  class="wc-input" type="number"\n                min="1" max="10"\n                step="1" value.bind="orderStep">\n            </div>\n            <div class="col">\n                <span\n                    show.bind="$scope.entity.order>0"\n                    class="fas fa-angle-right fa-2x"\n                    click.delegate="CCC.utilityFn(\'workshop.moveEntity\', null, {which: $scope.entity.$_id, to: $scope.entity.order-orderStep})"\n                ></span>\n            </div>\n        </div>\n        <div class="row">\n            <div\n                class="col align-self-center"\n                click.delegate="CCC.issue(\'workshop.recover\', {\'which.entity\': $scope.entity.$_id}, $event)"\n            >\n                Remove Building\n            </div>\n        </div>\n    </section>\n</template>'}}]);
//# sourceMappingURL=app~fba8b1df.c68d42dda54aac76ac46.bundle.map