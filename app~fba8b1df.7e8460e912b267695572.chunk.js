(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{"3Qvj":function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var i=n("aurelia-dialog"),a=n("resources/dialogs/SelectBus"),r=n("resources/dialogs/SelectRecipe"),o=n("resources/dialogs/SelectX"),s=function(){function e(e){this.ds=e,this.modals={SelectBus:a.SelectBus,SelectRecipe:r.SelectRecipe,SelectX:o.SelectX}}return e.prototype.open=function(e,t,n){var i=this;return void 0===n&&(n=!1),new Promise((function(a,r){i.ds.open({viewModel:i.modals[e],model:t,lock:n}).whenClosed((function(e){return a(e.output)}))}))},e}();s.inject=[i.DialogService]},"resources/attributes/loading":function(e,t,n){"use strict";var i;n.r(t),n.d(t,"LoadingAnimCustomAttribute",(function(){return a}));var a=function(){function e(e){this.element=e,this.inner=e.cloneNode(!0)}return e.prototype.valueChanged=function(e){e&&this.element.replaceWith(this.inner),e||this.element.replaceWith(i)},e}();a.inject=[Element],a.setLoadingElem=function(e){i=document.querySelector(e).cloneNode(!0)}},"resources/components/tabPopout":function(e,t,n){"use strict";n.r(t),n.d(t,"TabPopout",(function(){return i}));var i=function(){this.id="tabPopout"+Math.ceil(1e3*Math.random())}},"resources/components/tabPopout.html":function(e,t,n){e.exports='<template>\n  <require from="./tabPopout.scss"></require>\n  <input type="checkbox" class="tab_toggle" id.one-time="id">\n  <label for.one-time="id">\n    <slot name="tab">\n      Tab Name Goes Here\n    </slot>\n  </label>\n  <slot name="content">\n    Random Content!\n  </slot>\n</template>\n'},"resources/components/tabPopout.scss":function(e,t,n){(t=n("JPst")(!1)).push([e.i,"tab-popout{position:fixed}tab-popout>.tab_toggle{display:none}tab-popout>label{padding:2px 3vh;background-color:hsla(0,0%,49.8%,.5);text-align:center;margin:0;position:absolute;display:inline-block}tab-popout>label .tabOnly{display:inline}tab-popout [slot=content]{display:none}tab-popout>input[type=checkbox]:checked~[slot=content]{display:block}tab-popout>input[type=checkbox]:checked~[slot=content]>*{display:inline-block}tab-popout>input[type=checkbox]:checked~label .tabOnly{display:none}tab-popout.tab_bottom_left{bottom:0;left:0}tab-popout.tab_bottom_left>label{transform:translateX(-100%) rotate(90deg);transform-origin:bottom right;bottom:0;left:0}tab-popout.tab_bottom_left>.tab_toggle:checked~label{left:70px;padding:2px 75%;transform:translate(-100%,-150%) rotate(90deg)}tab-popout.tab_bottom_right{bottom:0;right:0}tab-popout.tab_bottom_right>label{transform:translateX(100%) rotate(-90deg);transform-origin:bottom left;bottom:0;right:0}tab-popout.tab_bottom_right>.tab_toggle:checked~label{right:70px;padding:2px 75%;transform:translate(100%,-150%) rotate(-90deg);bottom:unst}",""]),e.exports=t},"resources/dialogs/SelectBus":function(e,t,n){"use strict";n.r(t),n.d(t,"SelectBus",(function(){return a}));var i=n("aurelia-dialog"),a=function(){function e(e){this.controller=e}var t=e.prototype;return t.activate=function(e){var t;this.options=(null==(t=e.base)?void 0:t.facBlocks)||e.buses,this.selected=null},t.selectedChanged=function(e){console.log(e)},t.complete=function(){this.controller.ok({selected:this.selected})},e}();a.inject=[i.DialogController]},"resources/dialogs/SelectBus.html":function(e,t){e.exports='<template>\n  <ux-dialog>\n    <ux-dialog-header>Select Bus</ux-dialog-header>\n    <ux-dialog-body>\n      <div repeat.for="block of options" click.trigger="selected = (block == selected && undefined ) || block">\n        <span class.bind="block==selected && \'button\'">\n        ${block.name+":"+block.type}\n        </span>\n      </div>\n    </ux-dialog-body>\n    <ux-dialog-footer>\n      <button click.trigger="complete()">Close</button>\n    </ux-dialog-footer>\n  </ux-dialog>\n</template>\n'},"resources/dialogs/SelectRecipe":function(e,t,n){"use strict";n.r(t),n.d(t,"SelectRecipe",(function(){return r}));var i=n("aurelia-dialog"),a=n("+Aae"),r=function(){function e(e,t){this.selected=null,this.controller=e,this.mgrs=t}var t=e.prototype;return t.activate=function(e){var t,n=this;this.model=e,Object.entries(e.tags).forEach((function(e){var i=e[0],a=e[1];t=n.mgrs.rec.recipesByTags(i,a,t)})),this.recList=t},t.select=function(e){this.selected=e==this.selected?null:e},t.complete=function(){this.controller.ok({recipe:this.selected})},e}();r.inject=[i.DialogController,a.a]},"resources/dialogs/SelectRecipe.html":function(e,t){e.exports='<template>\n  <ux-dialog>\n    <ux-dialog-header>Select Recipe</ux-dialog-header>\n    <ux-dialog-body>\n      <icon-base\n        repeat.for="rec of recList"\n        item.bind="rec"\n        click.delegate="select(rec)"\n        class="${rec==selected ? \'selected\' : \'\'}"\n      ></icon-base>\n    </ux-dialog-body>\n    <ux-dialog-footer>\n      <button click.trigger="complete()">Done</button>\n    </ux-dialog-footer>\n  </ux-dialog>\n</template>\n'},"resources/dialogs/SelectX":function(e,t,n){"use strict";n.r(t),n.d(t,"SelectX",(function(){return r}));var i=n("aurelia-dialog"),a=n("+Aae"),r=function(){function e(e,t){this.selected=null,this.controller=e,this.mgrs=t}var t=e.prototype;return t.activate=function(e){this.list=e.list,this.type=e.type,this.selected=e.default},t.select=function(e){this.selected=e==this.selected?null:e},t.complete=function(){this.controller.ok({item:this.selected})},e}();r.inject=[i.DialogController,a.a]},"resources/dialogs/SelectX.html":function(e,t){e.exports='<template>\n  <ux-dialog>\n    <ux-dialog-header>Select ${type}</ux-dialog-header>\n    <ux-dialog-body>\n      <icon-base\n        repeat.for="each of list"\n        item.bind="each"\n        click.delegate="select(each)"\n        class="${each==selected ? \'selected\' : \'\'}"\n      >${each.name}</icon-base>\n    </ux-dialog-body>\n    <ux-dialog-footer>\n      <button click.trigger="complete()">Close</button>\n    </ux-dialog-footer>\n  </ux-dialog>\n</template>\n'},"resources/elements/active-trigger.html":function(e,t){e.exports='<template bindable="entity, tag">\n  <span\n    if.bind="entity.tags.getValue(tag) & signal:\'generalUpdate\'"\n    click.delegate="entity.tags.delete(tag)"\n  >On</span>\n  <span\n    if.bind="!entity.tags.getValue(tag) & signal:\'generalUpdate\'"\n    click.delegate="entity.tags.push(tag, true)"\n  >Off</span>\n</template>\n'},"resources/elements/byModule/crafting-infopane.html":function(e,t,n){e.exports='<template bindable="crafter, recMgr, itemMgr, actor">\n  <require from="../../value-converters/lib/ObjectFilters"></require>\n  <require from="./upgrades-infopane"></require>\n  <div \n    class="showRecipe ${crafter.crafting_timer!=NaN && \'progressBarBase\'}"\n    if.bind="crafter.recipe"\n    css="border-image-source: linear-gradient(to right, green ${crafter.progress}%, red ${crafter.progress}%)"> \n      Recipe:\n      <icon-base\n        repeat.for="ing of crafter.recipe.ingredients | objectValues"\n        item.bind="itemMgr.itemList[ing.name]"\n        required.bind="ing.amount"\n        count.bind="crafter.buffers.in.total(ing.name) & signal:\'generalUpdate\'"\n        click.delegate="crafter.consumeFrom(actor.inv, ing)"\n      ></icon-base>\n      =&gtcc;\n      <icon-base\n        repeat.for="res of crafter.recipe.results | objectValues"\n        item.bind="itemMgr.itemList[res.name]"\n        required.bind="res.amount"\n        count.bind="crafter.buffers.out.total(res.name) & signal:\'generalUpdate\'"\n        click.delegate="crafter.dump(actor, res)"\n      ></icon-base>\n    </p>\n    <p click.delegate="crafter.clear_recipe()">Clear recipe</p>\n  </div>\n  <div if.bind="!crafter.recipe">\n    <p>Select recipe to craft</p>\n    <div class="overflow">\n      <icon-base repeat.for="rec of recMgr.recipesByTags(\'category\', crafter.crafting_categories)" item.bind="rec" click.delegate="crafter.set_recipe(rec)"\n      class="${rec==crafter.recipe ? \'selected\': \'\'}" mouseenter.bind="(tooltip = rec) & debounce:2000" mouseleave.bind="(tooltip = null) & debounce:2000"></icon-base>\n    </div>\n  </div>\n  <upgrades-infopane entity.bind="crafter" parcel.bind="crafter.parent"></upgrades-infopane>\n</template>\n'},"resources/elements/byModule/lab-infopane.html":function(e,t,n){e.exports='<template bindable="lab, itemMgr, rounder">\n  <require from="./upgrades-infopane"></require>\n  <p>\n    Max Buffer: ${lab.buffers.max_in}\n  </p>\n  <div\n    class="labInput, progressBarBase"\n    css="border-image-source: linear-gradient(to right, green ${lab.progress}%, red ${lab.progress}%)"\n  >\n    <icon-base\n      repeat.for="input of lab.inputs"\n      item.bind="itemMgr.itemList[input]"\n      count.bind="lab.buffers.in.items[$index].count"\n      class="${lab.canAdd(input) ? \'fillable\': \'\'}"\n      click.delegate="lab.addPotion(input, rounder)"\n      title="Click to add ${input}"\n    ></icon-base>\n  </div>\n  <upgrades-infopane entity.bind="lab" parcel.bind="lab.parent"></upgrades-infopane>\n</template>\n'},"resources/elements/byModule/mining-infopane.html":function(e,t,n){e.exports='<template bindable="miner, resMgr, actor">\n  <require from="./upgrades-infopane"></require>\n  <div>\n    <p>Select Resource to Mine</p>\n    <icon-base\n      repeat.for="res of resMgr.resListByTag(\'category\', miner.resource_categories)"\n      item.bind="res"\n      click.delegate="miner.set_mining(res)"\n      class="${res==miner.mining? \'selected\': \'\'}"\n    ></icon-base>\n    <p\n      click.delegate="miner.collectBuffer(actor)"\n      if.bind="miner.mining"\n      class="progressBarBase"\n      css="border-image-source: linear-gradient(to right, green ${miner.progress}%, red ${miner.progress}%)"\n      title="Click to collect">\n      <icon-base\n        item.bind="miner.mining.mining_results"\n        count.bind="miner.buffers.out.total(miner.mining.mining_results) & signal:\'generalUpdate\'"\n      ></icon-base>\n      /${miner.buffers.max_out} (max)\n    </p>\n    <upgrades-infopane entity.bind="miner" parcel.bind="miner.parent"></upgrades-infopane>\n  </div>\n</template>\n'},"resources/elements/byModule/tech-infopane.html":function(e,t){e.exports='<template bindable="tech, techMgr, tooltip">\n  <div>\n    <div><icon-base item.bind="tech"></icon-base>${tech.name}</div>\n    <div if.bind="!tech.researched">\n      <b>Cost</b>\n      <icon-base repeat.for="unit of tech.cost.ingredients" item.bind="unit[0]"></icon-base>\n      x${tech.cost.count - tech.completeUnits}\n    </div>\n    <div>\n      <b>Unlocks</b>\n      <div repeat.for="unlock of tech.unlocks">\n        <icon-base if.bind="typeof unlock === \'string\'" item.bind="unlock" mouseenter.trigger="tooltip = unlock" mouseleave.trigger="tooltip = null"></icon-base>\n        <span if.bind="typeof unlock === \'object\'">${unlock.feature}</span>\n      </div>\n    </div>\n    <button click.delegate="techMgr.select_research(tech)" if.bind="!techMgr.researching && !tech.researched">Research</button>\n    <button click.delegate="techMgr.cancel_research()" if.bind="techMgr.researching == tech">Cancel</button>\n  </div>\n</template>\n'},"resources/elements/byModule/upgrades-infopane":function(e,t,n){"use strict";n.r(t),n.d(t,"upgradesInfopaneCustomElement",(function(){return d}));var i,a,r,o=n("aurelia-framework"),s=n("+Aae");function c(e,t,n,i){n&&Object.defineProperty(e,t,{enumerable:n.enumerable,configurable:n.configurable,writable:n.writable,value:n.initializer?n.initializer.call(i):void 0})}function l(e,t,n,i,a){var r={};return Object.keys(i).forEach((function(e){r[e]=i[e]})),r.enumerable=!!r.enumerable,r.configurable=!!r.configurable,("value"in r||r.initializer)&&(r.writable=!0),r=n.slice().reverse().reduce((function(n,i){return i(e,t,n)||n}),r),a&&void 0!==r.initializer&&(r.value=r.initializer?r.initializer.call(a):void 0,r.initializer=void 0),void 0===r.initializer&&(Object.defineProperty(e,t,r),r=null),r}var d=(a=l((i=function(){c(this,"entity",a,this),c(this,"parcel",r,this),this.EM=s.a.entity}).prototype,"entity",[o.c],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),r=l(i.prototype,"parcel",[o.c],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),i)},"resources/elements/byModule/upgrades-infopane.html":function(e,t){e.exports='<template bindable="entity, parcel">\n  <div>\n    <p if.bind="entity.buffers.in">\n      Input Upgrades\n      <icon-base\n        item="iron-chest"\n        count.bind="entity.buffers.upgrades.in.size"\n        click.delegate="EM.upgrade({type:\'buffers\', dir:\'in\', who: entity})"\n      ></icon-base>\n      <icon-base\n        item="inserter"\n        if.bind="!parcel.isPlayer"\n        count.bind="entity.buffers.upgrades.in.xfer"\n        progress.bind="entity.buffers.upgrades.in.xferProgress"\n        click.delegate="EM.upgrade({type:\'autoload\', dir:\'in\', who: entity})"\n      ></icon-base>\n      <active-trigger entity.bind="entity" tag="inputTicker" if.bind="entity.buffers.upgrades.in.xfer>0"></active-trigger>\n    </p>\n    <p if.bind="entity.buffers.out">\n      Output Upgrades\n      <icon-base\n        item="iron-chest"\n        count.bind="entity.buffers.upgrades.out.size"\n        click.delegate="EM.upgrade({type:\'buffers\', dir:\'out\', who: entity})"\n      ></icon-base>\n      <icon-base\n        item="inserter"\n        count.bind="entity.buffers.upgrades.out.xfer"\n        if.bind="!parcel.isPlayer"\n        progress.bind="entity.buffers.upgrades.out.xferProgress"\n        click.delegate="EM.upgrade({type:\'autoload\', dir:\'out\', who: entity})"\n      ></icon-base>\n      <active-trigger entity.bind="entity" tag="outputTicker" if.bind="entity.buffers.upgrades.out.xfer>0"></active-trigger>\n    </p>\n  </div>\n</template>\n'},"resources/elements/dataEditor":function(e,t,n){"use strict";n.r(t),n.d(t,"DataEditor",(function(){return f})),n.d(t,"ListSuggestionService",(function(){return m}));var i,a,r,o=n("aurelia-framework"),s=n("+Aae"),c=n("Iab2");var l,d,u,p,g,b,f=(r=function(){function e(){var e,t,n,i;this.editList=null,this.eTypes=["crafter","miner","research","defense","offense"],e=this,t="editType",i=this,(n=a)&&Object.defineProperty(e,t,{enumerable:n.enumerable,configurable:n.configurable,writable:n.writable,value:n.initializer?n.initializer.call(i):void 0}),s.a.de=this,this.mgrs=s.a}var t=e.prototype;return t.detached=function(){this.editing=null,this.editList=null,this.editType=null},t.editTypeChanged=function(e){if(e){if("icons"==e)return this.editList=null,void(this.editing=null);this.editList=s.a.data[e],this.editing=null}},t.selectEdit=function(e){this.editing=s.a.data[this.editType][e],"entity"==this.editType&&(this.editing.crafting_categories?(this.eTypeSelect="crafter",this.editing.subType="crafter"):this.editing.resource_categories?(this.eTypeSelect="miner",this.editing.subType="miner"):this.editing.inputs?(this.eTypeSelect="research",this.editing.subType="research"):this.editing.defense_value?(this.eTypeSelect="defense",this.editing.subType="defense"):this.editing.offense_value&&(this.eTypeSelect="offense",this.editing.subType="offense"))},t.addNew=function(){this.editing={type:this.editType},"recipe"==this.editType&&(this.editing.ingredients=[{name:"__someitem__",amount:1}],this.editing.category="crafting",this.editing.results=[{name:"__someitem__",amount:1}],this.editing.enabled=!1),"technology"==this.editType&&(this.editing.prerequisites=["__sometech__"],this.editing.unlocks=["__somerecipe__"],this.editing.cost={ingredients:[["automation-science-pack",1]]})},t.saveItem=function(){"research"==this.eTypeSelect&&"string"==typeof this.editing.inputs&&(this.editing.inputs=this.editing.inputs.split(",")),s.a.data[this.editType][this.editing.name]=this.editing,this.editing=null},t.deleteItem=function(){delete s.a.data[this.editType][this.editing.name],delete this.editList[this.editing.name],this.editing=null},t.saveDataSet=function(){s.a.idb.set("dataSet",s.a.data),this.editList=null,this.editType=null},t.dlDataSet=function(){var e=new File([JSON.stringify(s.a.data)],"data_source.json",{type:"application/json"});Object(c.saveAs)(e)},t.close=function(){s.a.baseApp.viewPane.version="beta"},e}(),l=(i=r).prototype,d="editType",u=[o.e],p={configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}},b={},Object.keys(p).forEach((function(e){b[e]=p[e]})),b.enumerable=!!b.enumerable,b.configurable=!!b.configurable,("value"in b||b.initializer)&&(b.writable=!0),b=u.slice().reverse().reduce((function(e,t){return t(l,d,e)||e}),b),g&&void 0!==b.initializer&&(b.value=b.initializer?b.initializer.call(g):void 0,b.initializer=void 0),void 0===b.initializer&&(Object.defineProperty(l,d,b),b=null),a=b,i),m=function(){function e(e){this.type=e}var t=e.prototype;return t.suggest=function(e){if(""===e)return Promise.resolve([]);e=e.toLowerCase();var t=s.a.data[this.type].filter((function(t){return 0===t.name.toLowerCase().indexOf(e)})).map((function(e){return e.name}));return Promise.resolve(t)},t.getName=function(e){return e},e}()},"resources/elements/dataEditor.html":function(e,t,n){e.exports='<template>\n  <require from="./dataEditor.scss"></require>\n  <require from="./iconEditor"></require>\n  <header>\n    <h5 click.delegate="editType=\'item\'">Items</h5>\n    <h5 click.delegate="editType=\'recipe\'">Recipes</h5>\n    <h5 click.delegate="editType=\'technology\'">Technologies</h5>\n    <h5 click.delegate="editType=\'resource\'">Resources</h5>\n    <h5 click.delegate="editType=\'entity\'">Entities</h5>\n    <h5 click.delegate="editType=\'icons\'">Icons</h5>\n  </header>\n  <main>\n    <div if.bind="!editing">\n      <ul class="icon-list">\n        <img\n          repeat.for="each of editList | objectValues"\n          src.bind="mgrs.icon.getSrc(each.icon)"\n          click.delegate="selectEdit(each.name)"\n          >\n        </img>\n      </ul>\n    </div>\n    <div if.bind="editType==\'icons\'">\n      <icon-editor></icon-editor>\n    </div>\n    <div if.bind="editing">\n      Name: <input type="text" value.bind="editing.name"><br>\n      Icon: <input type="text" value.bind="editing.icon"><br>\n      <img src.bind="mgrs.icon.getSrc(editing.icon)"></img>\n    <div if.bind="editType==\'item\'">\n        StackSize: <input type="text" value.bind="editing.stack_size">\n      </div>\n      <div if.bind="editType==\'recipe\'">\n        Time: <input type="number" value.bind="editing.crafting_speed">\n        Enabled: <input type="checkbox" checked.bind="editing.enabled"><br>\n        Category: <input type="text" value.bind="editing.category"><br>\n        Ingredients: <textarea value.bind="editing.ingredients | jsonString" rows="6"></textarea><br>\n        Results: <textarea value.bind="editing.results | jsonString" rows="6"></textarea><br>\n      </div>\n      <div if.bind="editType==\'technology\'">\n        Enabled: <input type="checkbox" checked.bind="editing.enabled">\n        Hidden: <input type="checkbox" checked.bind="editing.hidden"><br>\n        Prereqs:<textarea value.bind="editing.prerequisites | jsonString" rows="6"></textarea><br>\n        Unlocks:<textarea value.bind="editing.unlocks | jsonString" rows="6"></textarea><br>\n        Cost: <input type="number" value.bind="editing.cost.count">\n        Time: <input type="number" value.bind="editing.cost.time"><br>\n        Ingredients: <textarea value.bind="editing.cost.ingredients | jsonString" rows="6"></textarea>\n      </div>\n      <div if.bind="editType==\'resource\'">\n        Time: <input type="numebr" value.bind="editing.mining_time">\n        Results: <input type="text" value.bind="editing.mining_results"><br>\n        Cat:  <input type="text" value.bind="editing.category">\n      </div>\n      <div if.bind="editType==\'entity\'">\n        Space used: <input value.bind="editing.space"></input>\n        <fieldset>\n          <label repeat.for="eType of eTypes">\n            <input type="radio" name="eType" value.bind="eType" checked.bind="eTypeSelect">\n            ${eType}\n          </label>\n        </fieldset>\n        <div if.bind="eTypeSelect==\'crafter\'">\n          <h5>Crafter</h5>\n          CraftCats: <textarea value.bind="editing.crafting_categories"></textarea>\n          Speed:<input type="number" value.bind="editing.crafting_speed">\n        </div>\n        <div if.bind="eTypeSelect==\'miner\'">\n          <h5>Miner</h5>\n          ResCats: <textarea value.bind="editing.resource_categories"></textarea>\n          Speed:<input type="number" value.bind="editing.mining_speed">\n        </div>\n        <div if.bind="eTypeSelect==\'research\'">\n          <h5>Researcher</h5>\n          Inputs: <textarea value.bind="editing.inputs"></textarea>\n          Speed: <input type="number" value.bind="editing.researching_speed">\n        </div>\n        <div if.bind="eTypeSelect==\'defense\'">\n          <h5>Defense</h5>\n          Value: <input type="number" value.bind="editing.defense_value">\n          Range: <input type="number" value.bind="editing.defense_range">\n        </div>\n        <div if.bind="eTypeSelect==\'offense\'">\n          <h5>Offense</h5>\n          Attack: <input type="number" value.bind="editing.offense_value">\n          Supply: <input type="number" value.bind="editing.offense_supply">\n          Radar: <input type="number" value.bind="editing.radar">\n        </div>\n      </div>\n    </div>\n    <div if.bind="editType==\'icons\'">\n      <div if.bind="editing">\n        ${editing.name}\n      </div>\n      <div if.bind="!editing">\n        Icons\n      </div>\n    </div>\n  </main>\n  <footer class="btn-group">\n    <span class="btn btn-secondary" click.delegate="editing = null" if.bind="editing">cancel</span>\n    <span class="btn btn-danger" click.delegate="deleteItem()" if.bind="editing">Delete</span>\n    <span class="btn btn-success" click.delegate="saveItem()" if.bind="editing">save Item</span>\n    \n    <span class="btn btn-secondary" click.delegate="close()" if.bind="!editing">Close</span>\n    <span class="btn btn-primary" click.delegate="addNew()" if.bind="!editing && editType">Add</span>\n    <span class="btn btn-info" click.delegate="saveDataSet()" if.bind="!editing">save list</span>\n    <span class="btn btn-light" click.delegate="dlDataSet()" if.bind="!editing">download</span>\n  </footer>\n</template>\n'},"resources/elements/dataEditor.scss":function(e,t,n){(t=n("JPst")(!1)).push([e.i,"data-editor{width:100%;height:100%;position:relative;display:grid;grid-template-columns:20% auto;grid-template-rows:10% auto max(8%,15px);-moz-column-gap:10px;column-gap:10px;row-gap:5px}data-editor header{overflow-x:auto;grid-row:1/2;grid-column:1/3}data-editor header h5{display:inline-block}data-editor aside{overflow-y:scroll;overflow-x:auto;grid-row:2/3;grid-column:1/2}data-editor aside::-webkit-scrollbar{width:10px}data-editor aside ol{list-style-type:none;-webkit-padding-start:0;padding-inline-start:0}data-editor main{grid-row:2/3;grid-column:1/3;overflow-y:auto}data-editor footer{grid-row:3/4;grid-column:1/3}data-editor textarea{resize:both;width:100%}data-editor input,data-editor textarea{background-color:#483d8b;color:#db7093}data-editor .list-group .list-group-item{padding:2px 4px;background-color:#483d8b}data-editor img{max-height:48px;max-width:48px;min-width:16px;min-height:16px;border:2px dotted #006400;border-radius:4px}#editDataSource{height:100vh;width:100vw}",""]),e.exports=t},"resources/elements/factoryBlocks/busView.html":function(e,t){e.exports="<template>\n  I'm a bus\n</template>\n"},"resources/elements/factoryBlocks/mainView.html":function(e,t){e.exports='<template>\n<section id="viewFacBlock" click.capture="CCC.provide($event, \'at\', \'factoryBlock\', viewPane.facBlock )">\n  Block Name: ${viewPane.facBlock.name}\n  Land Size : ${viewPane.facBlock.size}\n  Complexity: ${viewPane.facBlock.complexity}\n  <div if.bind="viewPane.facBlock.inputLine" click.capture="CCC.provide($event, \'at\', \'factoryXput\', viewPane.facBlock.inputLine)">\n    Inputs:\n    <div class="connection" click.delegate="CCC.issue(\'factoryBlock.setConnection\', {\'dir.string\': \'in\'}, $event)">${viewPane.facBlock.inputLine.connection.name || "none"}</div>\n    <icon-base repeat.for="item of viewPane.facBlock.inputLine.items" item.bind="item"></icon-base>\n  </div>\n  <div if.bind="viewPane.facBlock.outputLine" click.capture="CCC.provide($event, \'at\', \'factoryXput\', viewPane.facBlock.outputLine)">\n    Outputs:\n    <div class="connection" click.delegate="CCC.issue(\'factoryBlock.setConnection\', {\'dir.string\': \'out\'}, $event)">${viewPane.facBlock.outputLine.connection.name || "none"}</div>\n    <icon-base repeat.for="item of viewPane.facBlock.outputLine.items" item.bind="item"></icon-base>\n  </div>\n  <div class="productionLines" repeat.for="line of viewPane.facBlock.processingLines" click.capture="CCC.provide($event, \'at\', \'factoryLine\', line)">\n    <span click.delegate="CCC.issue(\'factoryLine.setRecipe\', null, $event)">Recipe: \n      <icon-base if.bind="line.recipe" item.bind="line.recipe"></icon-base>\n      <span if.bind="!line.recipe">None</span>\n    </span>\n    <br>\n    <span>\n      <span if.bind="!line.building" click.delegate="CCC.issue(\'factoryLine.setBuilding\', null, $event)">Set Building Type...</span>\n      <span if.bind="line.building" click.delegate="CCC.issue(\'factoryLine.addBuilding\', null, $event)">\n        <icon-base item.bind="line.building"></icon-base>\n        : ${line.counts.buildings}\n      </span>\n    </span>\n    <span click.delegate="CCC.issue(\'factoryLine.prepLine\', null, $event)">Prepped spaces: ${line.counts.prepped}</span>\n  </div>\n  <div note="add new line to factory block">\n    <span click.delegate="CCC.issue(\'factoryBlock.addProdLine\', null, $event)">Add Line</span>\n  </div>\n</section>\n</template>\n'}}]);
//# sourceMappingURL=app~fba8b1df.7e8460e912b267695572.bundle.map