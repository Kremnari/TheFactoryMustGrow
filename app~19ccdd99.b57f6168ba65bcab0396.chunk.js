(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{"++kE":function(e,t,i){"use strict";i.d(t,"a",(function(){return n}));var n={ones:1,tens:0,huns:0,abs:!1,fail:!1,get val(){return 100*this.huns+10*this.tens+this.ones},calc_val:function(e){return Math.min(this.val,e)},calc:function(e,t,i){return Math.min(this.val,Math.min(i,t-e))}}},"59E+":function(e,t,i){"use strict";i.d(t,"a",(function(){return a}));var n,s=i("aurelia-framework"),r=i("aurelia-event-aggregator"),c=i("+Aae"),a=Object(s.c)(r.a)(n=function(){function e(e){this.techList={},this.shownTechs=[],this.visFilters=[],this.filters={ShowComplete:!0,ShowPack:{"automation-science-pack":!0,"logistic-science-pack":!1,"military-science-pack":!1,"chemical-science-pack":!1,"production-science-pack":!1,"utility-science-pack":!1,"space-science-pack":!1}},this.researching=null,this.events=e}var t=e.prototype;return t.import=function(e,t){var i=this;this.recipeMgr=c.a.rec,Object.entries(e).forEach((function(e){var n=e[0],s=e[1],r=new o(s,null==t?void 0:t[n]);i.techList[n]=r})),this.applyFilter("prereqs",{count:0}),this.applyFilter("byPack",{pack:"automation-science-pack"}),this.updateVisible(),c.a.Ticker.DataProvider((function(e){i.TickerProvider(e)}))},t.serialize=function(){for(var e={},t=0,i=Object.values(this.techList);t<i.length;t++){var n=i[t];if(n.researched||n.completeUnits){var s={name:n.name,type:n.type,researched:n.researched,completeUnits:n.completeUnits};e[n.name]=s}}return e},t.TickerProvider=function(e){e.entities||(e.entities={}),e.entities.types||(e.entities.types=[]),this.researching&&e.entities.types.push("lab"),e.mgrs||(e.mgrs={}),e.mgrs.tech=this},t.select_research=function(e){this.researching=e,this.nextIngredients=this.researching.cost.ingredients},t.cancel_research=function(){this.researching=null,this.nextIngredients=null},t.increment_research=function(){this.researching.completeUnits++,this.researching.completeUnits==this.researching.cost.count&&this.complete_research()},t.complete_research=function(){var e=this;this.researching.researched=!0,this.researching.unlocks.forEach((function(t){return e.recipeMgr.recipeList[t].enabled=!0})),this.researching=null,this.nextIngredients=null,this.updateVisible()},t.applyFilter=function(e,t){return this.visFilters.push({type:e,args:t})-1},t.hasFilter=function(e){return this.visFilters.findIndex((function(t){return t.type==e}))>-1},t.removeFilter=function(e){var t=this.visFilters.findIndex((function(t){return t.type==e}));this.visFilters.splice(t,1)},t.updateVisible=function(){var e,t,i=this,n=[];Object.entries(this.techList).forEach((function(e){e[0];var t=e[1];i.visFilters.every((function(e){switch(e.type){case"prereqs":if(0==e.args.count&&(!t.prerequisites||0==t.prerequisites.count))return!0;return t.prerequisites.reduce((function(e,t){return i.techList[t]||console.log(t),e+!i.techList[t].researched}),0)==e.args.count;case"byPack":return t.cost.ingredients.some((function(t){var i=t[0];t[1];return i==e.args.pack}));case"complete":return!t.researched}return!1}))&&n.push(t)})),this.shownTechs=n,null==(e=this.mgrs)||null==(t=e.signaler)||t.signal("techUpdate")},t.toggleFilter=function(e,t){switch(e){case"complete":this.hasFilter("complete")?(this.removeFilter("complete"),this.filters.ShowComplete=!1):(this.applyFilter("complete",{}),this.filters.ShowComplete=!0);break;case"byPack":this.filters.ShowPack[t]=!this.filters.ShowPack[t]}this.updateVisible()},e}())||n,o=function(e,t){Object.assign(this,e),this.completeUnits=(null==t?void 0:t.completeUnits)||0,this.researched=!1,(null==t?void 0:t.researched)&&(this.researched=!0,this.unlocks.forEach((function(e){return c.a.rec.recipeList[e]&&(c.a.rec.recipeList[e].enabled=!0)})))}},MJ0g:function(e,t,i){"use strict";i.d(t,"a",(function(){return s}));var n=i("+Aae"),s=function(){function e(){this.recipeList={},this.recipes_by_cats={" ":[]},this.showing_item=null,this.crafting={}}var t=e.prototype;return t.import=function(e,t){var i=this;this.itemMgr=t,Object.entries(e).forEach((function(e){var n=e[0],s=e[1],a=new r(s,t,i);a&&(a.ingCheck=function(e){a.ingredients.every((function(t){return e.total(t.name)>=t.amount}),i)?a.classes[c.enabled]="recipeEnabled":a.classes[c.enabled]="recipeDisabled"},a.classes[c.enabled]="recipeDisabled",i.recipeList[n]=a,a.category?(i.recipes_by_cats[a.category]||(i.recipes_by_cats[a.category]=[],i.crafting[a.category]=null),i.recipes_by_cats[a.category].push(a)):i.recipes_by_cats[" "].push(a))}))},t.set_player=function(e){this.player=e},t.sub_ticker=function(e){var t=this;this.TickSub=e.subscribe((function(e){t.tick(e)}))},t.tick=function(){for(var e=0,t=Object.values(this.recipeList);e<t.length;e++){t[e].ingCheck(this.player.inv)}},t.canProduce=function(e,t){return e.ingredients.every((function(e){return t.total(e.name)>=e.amount||!1}))},t.canProduceMax=function(e,t){return e.ingredients.reduce((function(e,i){return Math.min(e,function(e){return Math.floor(t.total(e.name)/e.amount)}(i))}),1/0)},t.consumeIngs=function(e,t,i,n){void 0===i&&(i=1),void 0===n&&(n=!1),e.ingredients.forEach((function(e){n?t.add(e.name,e.amount*i):t.consume(e.name,e.amount*i)}))},t.startCraft=function(e,t,i){var n=this,s=this.crafting[i];if(null!=s&&(window.clearTimeout(s.timer),s.recipe.style="",s.recipe.classes[c.crafting]="",this.consumeIngs(s.recipe,t,1,!0),e.name==s.recipe.name))return this.crafting[i]=null,!1;if(this.canProduce(e,t)){s={},this.consumeIngs(e,t);var r=e.crafting_speed||e.crafting_time;s.timer=window.setTimeout((function(){n.crafting[i]=null,e.style="",e.classes[c.crafting]="",n.craft(e,t)}),1e3*r),s.recipe=e,this.crafting[i]=s,e.style="animation: testXform "+r+"s",e.classes[c.crafting]="crafting"}},t.craft=function(e,t){e.results.forEach((function(e){t.add(e.name,e.amount||1)}))},t.recipesByTags=function(e,t,i){return void 0===i&&(i=this.recipeList),null==t?[]:(Array.isArray(t)||(t=[t]),Object.values(i).filter((function(i){return(null==i.enabled||i.enabled)&&(t.includes(i[e])||!i[e])})))},e}(),r=function(){function e(e){var t,i=this;if(this.style="",this.classes=[],Object.assign(this,e),this.enabled=null==e.enabled||e.enabled,Object.defineProperty(this,"classesStr",{get:function(){return i.classes.join(" ")}}),this.category||(this.category="crafting"),""==this.icon&&(this.icon=null==(t=n.a.item.itemList[this.results[0].name])?void 0:t.icon),""==this.icon)return!1}return e.prototype.getClassesX=function(){return console.log("computed"),this.classes.join(" ")},e}(),c={enabled:0,crafting:1}},O9YP:function(e,t,i){"use strict";i.d(t,"a",(function(){return c}));var n,s=i("EfK0"),r=i("aurelia-framework"),c=Object(r.c)(s.c)(n=function(){function e(e){this.resList={},this.mining=!1,this.ItemMgr=e}var t=e.prototype;return t.import=function(e){var t=this;Object.entries(e).forEach((function(e){var i=e[0],n=e[1];t.resList[i]=n}))},t.mine=function(e,t){var i=this,n=this.resList[e];this.mining?(window.clearTimeout(this.mining),this.mining=!1,n.miningStyle=""):(this.mining=window.setTimeout((function(){t.add(n.mining_results,1),i.mining=!1,n.miningStyle=""}),1e3*n.mining_time),n.miningStyle="animation: testXform "+n.mining_time+"s")},t.resListByTag=function(e,t){return null==t?[]:Object.values(this.resList).filter((function(i){return null==i[e]||t.includes(i[e])}))},e}())||n}}]);
//# sourceMappingURL=app~19ccdd99.b57f6168ba65bcab0396.bundle.map