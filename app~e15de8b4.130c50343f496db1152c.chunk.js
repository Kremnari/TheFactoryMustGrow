(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{"resources/elements/mainPanes/defensePane.html":function(e,n){e.exports='<template>\n  <div class="container">\n    <div class="row defenses">\n      <icon-base\n        repeat.for="turret of globals.defense.turrets | objectValues"\n        item.bind="turret"\n        click.delegate="CCC.issue(\'defense.AddTurret\', {which: turret.name}, $event)"\n        count.bind="turret.count"\n      ></icon-base>\n    </div>\n    <div class="row infoText">\n      Time to next attack: <span class="time">~${globals.defense.nextAttackSecs}s</span>\n    </div>\n    <div class="row enemyWave">\n\n    </div>\n  </div>\n</template>\n'},"resources/elements/mainPanes/offensePane.html":function(e,n,s){e.exports='<template>\n  <require from="./offensePane.scss"></require>\n  <section class="container">\n    <div class="row radar" if.bind="globals.activeFeatures.offenseBlocks.radar">\n      <icon-base\n        item="radar"\n        click.delegate="CCC.issue(\'expansion.AddRadar\', {}, $event)"\n        count.bind="globals.scanning.radarCount"\n      ></icon-base>\n      <div if.bind="globals.scanning.radarCount">\n        <span if.bind="!globals.scanning.penetrateHold">\n          Scanning Progress: ${globals.scanning.currentAccum} / ${globals.scanning.nextCost} (+${globals.scanning.radarCount})\n        </span> \n        <span if.bind="globals.scanning.penetrateEnemy">\n          Our scans are blocked by enemy defenses\n        </span>\n        <span if.bind="globals.scanning.penetrateDepth">\n          Our scans cannot penetrate further, we must secure more land first\n        </span>\n        <br>Survey results:\n        <ul class="survey_results">\n          <li repeat.for="each of globals.scanning.landsSurveyed" class="${each.type} ${each.class}">\n          </li>\n        </ul>\n        <div class="legend">\n          <p>Legend</p>\n          <span style="border-color: tan">Free</span>\n          <span style="border-color: green">Resource</span>\n          <span style="border-color: red">Enemy</span>\n          <span style="border-color: darkred">Strong Enemy</span>\n        </div>\n      </div>\n    </div>\n    <div class="row playerOffense" if.bind="globals.activeFeatures.offenseBlocks.offense">\n      <span repeat.for="each of globals.offense.bots | objectValues">\n        <icon-base\n          item.bind="each.name"\n          click.delegate="CCC.issue(\'offense.AddOffenseBot\', {\'which.string\': each.name}, $event)"\n          required="10"\n          count.bind="each.count"\n        ></icon-base>\n        Power: ${each.count * 10}\n      </span>\n    </div>\n    <div class="row playerControls" if.bind="globals.scanning.landsSurveyed[0] & signal:\'generalUpdate\'">\n      <hr>\n      <span\n        class="col"\n        show.bind="globals.scanning.landsSurveyed[0].type!=\'enemy\' || globals.offense.target.strength==0 & signal:\'generalUpdate\'"\n        click.delegate="CCC.issue(\'offense.Secure\', {}, $event)"\n        >Secure</span>\n      <span\n        show.bind="globals.offense && !globals.offense.target && globals.scanning.landsSurveyed[0].type==\'enemy\' & signal:\'generalUpdate\'"\n        class="col"\n        click.delegate="CCC.issue(\'offense.Scout\', {}, $event)"\n      >Scout</span>\n      <div\n        class="col"\n        if.bind="globals.offense.target.strength & signal:\'generalUpdate\'"\n        click.delegate="CCC.issue(\'offense.Attack\', {}, $event)"\n      >\n        <span class="mr-10">Strength: ${globals.offense.target.strength}</span>\n        <span>Attack</span>\n      </div>\n    </div>\n    <div class="row offenseEnemies" if.bind="globals.offense.target & signal:\'generalUpdate\'">\n      <hr >\n      <icon-base\n        item="item@enemy_unit"\n        class="col"\n        count.bind="globals.offense.target.units"\n      ></icon-base>\n      <icon-base\n        item="item@enemy_base"\n        class="col"\n        count.bind="globals.offense.target.bases"></icon-basee>\n    </div>\n  </section>\n</template>\n'},"resources/elements/mainPanes/offensePane.scss":function(e,n,s){(n=s("JPst")(!1)).push([e.i,".survey_results li{list-style-type:none;display:inline-block;width:10px;height:10px;margin-right:4px}.survey_results .enemy{background-color:red}.survey_results .enemy.hightened{background-color:#8b0000}.survey_results .resource{background-color:green}.survey_results .empty{background-color:tan}.legend span{border-width:1px 6px;border-radius:8px;border-style:solid;padding-inline:4px}",""]),e.exports=n},"resources/elements/mainPanes/saveGameSelect.html":function(e,n){e.exports="<template>\n    <div if.bind=\"view.ctrl.newGameSetup\">\n        New Game\n        <span>\n            Something something dark side\n        </span>\n        <button click.delegate=\"view.set({type:'view', which: 'newGameSetup', what: false})\">Cancel</button>\n    </div>\n    <div if.bind=\"!view.ctrl.newGameSetup\">\n        <span click.delegate=\"view.set({type:'view', which: 'newGameSetup', what: true})\">\n            New Game\n        </span><br>\n        Load:\n        <ul>\n            <li repeat.for=\"game of IgorJs.gameList\" click.delegate=\"CCC.issue('core.loadGame', {'name.game': game})\">\n                ${game}\n            </li>\n        </ul>\n    </div>\n</template>"},"resources/elements/micro/scopeVar.html":function(e,n){e.exports='<template bindable="var">\n  <input type="hidden" value.one-time="var & signal:\'generalUpdate\'">\n</template>\n'},"resources/elements/micro/toasted.html":function(e,n){e.exports='<template bindable="toast, c-view">\n    <span\n        class="${toast.class}"\n        click.delegate="toast._alert(toast)"\n    >\n        <image if.bind="toast.icon" src="${toast.icon}"></image>\n        <span if.bind="!toast.icon && toast.fa" class="fas ${toast.fa}"></span>\n    </span>\n</template>'},"resources/elements/popouts/filtersPopout.html":function(e,n){e.exports="<template>\n Yay! Filters!\n</template>\n"},"resources/elements/rounderTab.html":function(e,n,s){e.exports='<template>\n  <require from="resources/elements/rounderTab.scss"></require>\n  <div class="container">\n    <div class="row sliders">\n      <div class="vert-slider">\n        <input id="huns" class="vertical" type="range" min="0" max="9" step="1" value.bind="mgrs.rounder.huns">\n      </div>\n      <div class="vert-slider">\n        <input id="tens" class="vertical" type="range" min="0" max="9" step="1" value.bind="mgrs.rounder.tens">\n      </div>\n      <div class="vert-slider">\n        <input id="ones" class="vertical" type="range" min="0" max="9" step="1" value.bind="mgrs.rounder.ones">\n      </div>\n    </div>\n    <div class="row">\n      <span class="col text-center">${mgrs.rounder.huns}${mgrs.rounder.tens}${mgrs.rounder.ones}</span>\n    </div>\n    <div class="row">\n      <label class="switch">\n        <input type="checkbox" value.bind="mgrs.rounder.abs">\n        <span class="slider text_abs_mod"></span>\n      </label>\n      <label class="switch">\n        <input type="checkbox" value.bind="mgrs.rounder.fail">\n        <span class="slider text_full_part"></span>\n      </label>\n    </div>\n  </div>\n</template>\n'},"resources/elements/rounderTab.scss":function(e,n,s){(n=s("JPst")(!1)).push([e.i,"#numSelectors .row{margin:0}#numSelectors input.vertical[type=range]{transform:rotate(-90deg);transform-origin:bottom left;position:absolute;left:100%;bottom:0;width:14vh}#numSelectors .row.sliders{height:15vh}#numSelectors .row.sliders .vert-slider{padding:0;margin-left:6px;height:15vh;width:16px;bottom:0;position:relative}#numSelectors>.tab_toggle:checked~[slot=content]>compose{width:70px}#numSelectors>.tab_toggle:checked~[slot=content]>compose>*{height:20vh;padding:0;display:inline-block}#numSelectors>.tab_toggle:checked~[slot=content]>compose>span{width:100%;text-align:center}",""]),e.exports=n},"resources/elements/tool-tip":function(e,n,s){"use strict";s.r(n),s.d(n,"ToolTipCustomElement",(function(){return c}));var i,t,a,r=s("aurelia-framework");function l(e,n,s,i){s&&Object.defineProperty(e,n,{enumerable:s.enumerable,configurable:s.configurable,writable:s.writable,value:s.initializer?s.initializer.call(i):void 0})}function o(e,n,s,i,t){var a={};return Object.keys(i).forEach((function(e){a[e]=i[e]})),a.enumerable=!!a.enumerable,a.configurable=!!a.configurable,("value"in a||a.initializer)&&(a.writable=!0),a=s.slice().reverse().reduce((function(s,i){return i(e,n,s)||s}),a),t&&void 0!==a.initializer&&(a.value=a.initializer?a.initializer.call(t):void 0,a.initializer=void 0),void 0===a.initializer&&(Object.defineProperty(e,n,a),a=null),a}var c=(t=o((i=function(){function e(){l(this,"display",t,this),l(this,"recipeMgr",a,this)}var n=e.prototype;return n.displayChanged=function(){},n.showRec=function(e){mgrs.baseApp.view.set({type:"scope",which:"tooltip",what:this.recipeMgr.recipeList[e]})},e}()).prototype,"display",[r.c],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),a=o(i.prototype,"recipeMgr",[r.c],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),i)},"resources/elements/tool-tip.html":function(e,n,s){e.exports='<template>\n  <require from="../value-converters/lib/ObjectFilters"></require>\n  <require from="./icon-base"></require>\n  <scope-var var.bind="display = view.$scope.tooltip"></scope-var>\n  <div show.bind="display" class="toolTip">\n    <h5 class="d-inline">${display.tip}${display.name}: </h5>\n    <div if.bind="display.type==\'recipe\'">\n      <icon-base repeat.for="ing of display.ingredients | objectValues" item.bind="ing.name" count.bind="ing.amount"\n        click2.delegate="showRec(ing.name)"></icon-base>\n      =>\n      <icon-base repeat.for="result of display.results | objectValues" item.bind="result.name"\n        count.bind="result.amount"></icon-base>\n    </div>\n    <div if.bind="display.type==\'technology\'">\n      <icon-base repeat.for="unit of display.cost.ingredients" item.bind="unit[0]"></icon-base>\n      x${display.cost.count - global.research[display.name].completeUnits}\n      <p>\n        <icon-base repeat.for="unlock of display.unlocks" item.bind="unlock" show-name.bind="true"></icon-base>\n      </p>\n    </div>\n    <div if.bind="display.tool==\'entity\' && display.item" class="entityTip container">\n    <div class="row">\n      <div class="col">\n        <p>Space ${display.item.space}\n          <span\n            class="${display.item.space > globals.land.total - globals.land.used ? \'text-danger\' : \'text-success\'}"\n          >(${globals.land.total - globals.land.used})</span>\n        </p>\n        <p if.bind="display.item.crafting_categories">Speed: ${display.item.crafting_speed}x | Crafting:\n          ${display.item.crafting_categories}</p>\n        <p if.bind="display.item.inputs">Speed: ${display.item.researching_speed}x | Inputs: ${display.item.inputs}\n        </p>\n        <p if.bind="display.item.resource_categories">Speed: ${display.item.mining_speed}x | Resource Types:\n          ${display.item.resource_categories}</p>\n      </div>\n      <div class="col" if.bind="display.rec">\n        <icon-base repeat.for="ing of display.rec.ingredients | objectValues" item.bind="ing.name"\n          count.bind="ing.amount"></icon-base>\n      </div>\n      <div class="col" if.bind="display.rec">\n        =>\n        <icon-base repeat.for="result of display.rec.results | objectValues" item.bind="result.name"\n          count.bind="result.amount"></icon-base>\n      </div>\n    </div>\n    </div>\n      <div if.bind="display.tool==\'stackArray\'">\n        <h5 class="d-inline">${display.tip}:</h5>\n        <icon-base repeat.for="item of display.list" item.bind="item.name" show-name.bind="true"\n          required.bind="item.count" class="pr-5"></icon-base>\n      </div>\n      <div if.bind="display.tool==\'blockCosts\'" class="container">\n        <span class="row">\n          <div class="stackedText col">\n            <span>Land: ${display.landCost}</span><br>\n            <span>Complexity: +${display.complexity}</span>\n          </div>\n          <div class="col">\n            <icon-base repeat.for="item of display.list" item.bind="item.name" show-name.bind="true"\n              required.bind="item.count" class="pr-5"></icon-base>\n          </div>\n        </span>\n      </div>\n    </div>\n</template>'},"resources/index":function(e,n,s){"use strict";s.r(n),s.d(n,"configure",(function(){return i}));s("70NS");function i(e){e.globalResources(["resources/elements/icon-base","resources/elements/inventory.html","resources/elements/active-trigger.html","resources/elements/micro/scopeVar.html","resources/value-converters/lib/ObjectFilters","resources/value-converters/valueconverters","resources/value-converters/isVisible","resources/value-converters/filter","resources/attributes/loading"])}}}]);
//# sourceMappingURL=app~e15de8b4.130c50343f496db1152c.bundle.map