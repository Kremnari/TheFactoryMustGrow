(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{"++kE":function(t,e,i){"use strict";i.d(e,"a",(function(){return a}));var a={ones:1,tens:0,huns:0,abs:!1,fail:!1,get val(){return 100*this.huns+10*this.tens+this.ones},calc_val:function(t){return Math.min(this.val,t)},calc:function(t,e,i){return Math.min(this.val,Math.min(i,e-t))}}},"59E+":function(t,e,i){"use strict";i.d(e,"a",(function(){return o}));var a,s=i("aurelia-framework"),n=i("aurelia-event-aggregator"),r=i("+Aae"),o=Object(s.d)(n.a)(a=function(){function t(t){this.techList={},this.shownTechs=[],this.visFilters=[],this.filters={ShowComplete:!0,ShowPack:{"automation-science-pack":!0,"logistic-science-pack":!1,"military-science-pack":!1,"chemical-science-pack":!1,"production-science-pack":!1,"utility-science-pack":!1,"space-science-pack":!1}},this.researching=null,this.events=t}var e=t.prototype;return e.import=function(t,e){var i=this;this.recipeMgr=r.a.rec,Object.entries(t).forEach((function(t){var a=t[0],s=t[1],n=new c(s,null==e?void 0:e[a]);i.techList[a]=n})),this.applyFilter("prereqs",{count:0}),this.applyFilter("byPack",{pack:"automation-science-pack"}),this.updateVisible(),r.a.Ticker.DataProvider((function(t){i.TickerProvider(t)}))},e.serialize=function(){for(var t={},e=0,i=Object.values(this.techList);e<i.length;e++){var a=i[e];if(a.researched||a.completeUnits){var s={name:a.name,type:a.type,researched:a.researched,completeUnits:a.completeUnits};t[a.name]=s}}return t},e.TickerProvider=function(t){t.entities||(t.entities={}),t.entities.types||(t.entities.types=[]),this.researching&&t.entities.types.push("lab"),t.mgrs||(t.mgrs={}),t.mgrs.tech=this},e.select_research=function(t){this.researching=t,this.nextIngredients=this.researching.cost.ingredients},e.cancel_research=function(){this.researching=null,this.nextIngredients=null},e.increment_research=function(){this.researching.completeUnits++,this.researching.completeUnits==this.researching.cost.count&&this.complete_research()},e.complete_research=function(){this.researching.researched=!0,this.researching.unlocks.forEach((function(t){return r.a.rec.recipeList[t]&&(r.a.rec.recipeList[t].enabled=!0)})),this.researching=null,this.nextIngredients=null,this.updateVisible()},e.applyFilter=function(t,e){return this.visFilters.push({type:t,args:e})-1},e.hasFilter=function(t){return this.visFilters.findIndex((function(e){return e.type==t}))>-1},e.removeFilter=function(t){var e=this.visFilters.findIndex((function(e){return e.type==t}));this.visFilters.splice(e,1)},e.updateVisible=function(){var t,e,i=this,a=[];Object.entries(this.techList).forEach((function(t){t[0];var e=t[1];i.visFilters.every((function(t){switch(t.type){case"prereqs":if(0==t.args.count&&(!e.prerequisites||0==e.prerequisites.count))return!0;return e.prerequisites.reduce((function(t,e){return i.techList[e]||console.log(e),t+!i.techList[e].researched}),0)==t.args.count;case"byPack":return e.cost.ingredients.some((function(e){var i=e[0];e[1];return i==t.args.pack}));case"complete":return!e.researched}return!1}))&&a.push(e)})),this.shownTechs=a,null==(t=this.mgrs)||null==(e=t.signaler)||e.signal("techUpdate")},e.toggleFilter=function(t,e){switch(t){case"complete":this.hasFilter("complete")?(this.removeFilter("complete"),this.filters.ShowComplete=!1):(this.applyFilter("complete",{}),this.filters.ShowComplete=!0);break;case"byPack":this.filters.ShowPack[e]=!this.filters.ShowPack[e]}this.updateVisible()},t}())||a,c=function(t,e){Object.assign(this,t),this.completeUnits=(null==e?void 0:e.completeUnits)||0,this.researched=!1,(null==e?void 0:e.researched)&&(this.researched=!0,this.unlocks.forEach((function(t){return r.a.rec.recipeList[t]&&(r.a.rec.recipeList[t].enabled=!0)})))}},Evr9:function(t,e,i){"use strict";i.d(e,"a",(function(){return c}));var a,s=i("+Aae"),n=i("EVdn"),r=i.n(n),o=[0,.1,.2,.3,.4,.9,1,1.1,1.2,2,2.1,2.2,2.3,2.4,3,3.1,3.2,3.21,3.3,3.4,3.5,3.6,3.7,3.75,3.8,3.81,3.9,3.91,4,4.1,4.2,4.3,4.4,4.41,4.42,4.43,4.44,4.45,4.5,4.51,4.52,100];window.jq=r.a;var c=new(function(){function t(){this.atStep=0,this.tutClicks=0,a=this}var e=t.prototype;return e.start=function(){var t=this;r()("#tutorial").addClass("Block"),r()("#tut_button").click((function(){t.nextStep()})),this.setStep(o[this.atStep])},e.jumpTo=function(t){this.atStep=o.indexOf(t),this.start()},e.nextStep=function(){var t=this;r()(".tutStep").removeClass("tutStep").off("click"),r()("#tut_button").hide(),r()("#tut_text").text(""),setTimeout((function(){t.setStep(o[++t.atStep])}),10)},e.setStep=function(t){switch(t){case 0:r()("#tut_text").text("The Factory Must Grow"),r()("#tut_button").text("Let's build it").show();break;case.1:r()("#tut_text").text("This alpha is about the mechanics, most everything else is slated to be improved"),r()("#tut_button").text("I won't judge!").show();break;case.2:r()("#tut_text").text("You can cancel the tutorial by clicking the 'X' in the upper right corner"),r()("#tut_button").text("Just don't condescend me, and we'll be fine").show();break;case.3:a.tutText("This button shows a verbose navligation menu."),a.tutStep(".fa-level-up-alt"),a.tutButton("In case I forget what the icons mean.");break;case.4:a.tutText("This menu has a number of options, including a subscription to my mailing list. "),a.tutStep(".fa-bars"),a.tutButton("Maybe I'll want to stay updated...");break;case.9:r()("#resources").addClass("tutStep"),r()("#tut_text").text("You can mine (click) these by hand"),r()("#tut_button").text("Got it").show();break;case 1:s.a.Ticker.resume(),r()("#resources icon-base[title='stone']").addClass("tutStep"),r()("#tut_text").text("Mine 5 stone"),this.playerInvWait({name:"stone",count:5});break;case 1.1:r()("#tut_text").text("Machines will be used for the bulk of your production."),r()("#tut_button").text("Which are the machines?").show();break;case 1.2:r()("#tut_text").text("Machines have a red 'M' at the bottom of their icon"),r()("#tut_button").text("So many options").show();break;case 2:r()("#tut_text").text("Now build a furnace to melt metal to plates"),r()("#recipes icon-base[title='stone-furnace']").addClass("tutStep"),this.playerInvWait({name:"stone-furnace",count:1});break;case 2.1:r()("#tut_text").text("Clicking on the furnace in your inventory will add it to your production machines"),r()("#inventoryList icon-base[title='stone-furnace']").addClass("tutStep"),this.setTutClick();break;case 2.2:r()(".navEntities").addClass("tutStep"),this.setTutClick();break;case 2.3:r()("#machines .entityList icon-base[title='stone-furnace']").addClass("tutStep"),this.setTutClick();break;case 2.4:r()("#tut_text").html("For your machines, you must set a recipe.<br>Lets start with iron plates"),r()("crafting-infopane icon-base[title='iron-plate']").addClass("tutStep"),this.setTutClick();break;case 3:r()("#tut_text").text("Now head back and mine 5 iron ore"),r()(".navHome").addClass("tutStep"),this.setTutClick();break;case 3.1:r()("#resources icon-base[title='iron-ore']").addClass("tutStep"),this.playerInvWait({name:"iron-ore",count:5});break;case 3.2:r()("#tut_text").text("Good, let's turn that ore into plates!"),r()("#tut_button").text("Back to my furnace I go").show();break;case 3.21:r()("#tutorial").hide(),r()(".navEntities").addClass("tutStep"),this.setTutClick();break;case 3.3:r()("crafting-infopane .showRecipe icon-base[title='iron-ore']").addClass("tutStep"),this.setTutClick(5);break;case 3.4:r()("#tutorial").show(),r()("#tut_text").text("Now watch your furnace produce the plates"),r()("#tut_button").text("At least it's faster than paint drying").show();break;case 3.5:r()("crafting-infopane .showRecipe icon-base[title='iron-plate']").addClass("tutStep"),this.playerInvWait({name:"iron-plate",count:5});break;case 3.6:r()("#tut_text").text("Mining by hand takes a while, lets get a mining-drill set up"),r()("#tut_button").text("I can dig it").show();break;case 3.7:s.a.baseApp.viewPane.main="home",s.a.baseApp.tooltip=s.a.rec.recipeList["burner-mining-drill"],r()("#recipes icon-base[title='burner-mining-drill']").addClass("tutTarget"),r()("#tut_text").html("A mining drill requires the following:<br>3 gears, a furnace and 3 plates<br>build away"),r()("#tut_button").text("Hi ho, it's off to work I go").show();break;case 3.75:r()("#tutorial").hide(),this.playerInvWait({name:"burner-mining-drill",count:1});break;case 3.8:r()(".tutTarget").removeClass("tutTarget"),r()("#tutorial").show(),r()("#tut_text").text("A mining drill can produce resources automatically.\nAdd it to your machines and lets take a look at it"),r()("#tut_button").text("I'll see you shortly").show();break;case 3.81:r()("#tutorial").hide(),r()(".navEntities").addClass("tutStep"),this.playerInvWait({name:"burner-mining-drill",count:0});break;case 3.9:r()("#machines .entityList icon-base[title='burner-mining-drill']").addClass("tutStep"),this.setTutClick();break;case 3.91:r()("#tutorial").show(),r()("#tut_text").text("Now select iron to begin automagical mining"),r()("mining-infopane icon-base[title='iron-ore']").addClass("tutStep"),this.setTutClick();break;case 4:r()("upgrades-infopane icon-base[title='iron-chest']").addClass("tutStep"),r()("#tut_text").text("Each item buffer can only hold so much.  Add iron chests to increase that capacity"),r()("#tut_button").text("Useful to not have to babysit").show(),this.setTutClick();break;case 4.1:r()("upgrades-infopane icon-base[title='inserter']").addClass("tutStep"),r()("#tut_text").text("Item buffers can be improved with inserters to create some basic automation"),r()("#tut_button").text("Too bad I can't watch them move back and forth like some other game I know").show(),this.setTutClick();break;case 4.2:s.a.baseApp.viewPane.main="home",s.a.baseApp.tooltip=s.a.rec.recipeList.lab,r()("#tut_text").html("These paltry machines are a start, but won't hold you forever.<br>Keep expanding, but you're next goal should be a research lab."),r()("#recipes icon-base[title='lab']").addClass("tutTarget"),r()("#tut_button").text("The Factory...Is Growing...").show(),this.setTutClick();break;case 4.3:r()("#tutorial").hide(),this.playerInvWait({name:"lab",count:1});break;case 4.4:r()("#inventoryList icon-base[title='lab']").addClass("tutStep"),this.setTutClick();break;case 4.41:r()(".navEntities").addClass("tutStep"),r()(".navE_Lab").addClass("tutStep"),r()("#machines .entityList icon-base[title='lab']:first").addClass("tutStep"),a.setTutClick();break;case 4.42:r()("#tut_text").text("This is a research lab.  You will need to add [science-packs] for it to consume to process research."),a.tutButton("Are these machines or magic?");break;case 4.43:a.tutText("I was going to tell you to make 5, but for that comment make 10 'automation science packs'"),a.tutButton("*grumble*");break;case 4.44:s.a.baseApp.viewPane.main="home",s.a.baseApp.tooltip=s.a.rec.recipeList["automation-science-pack"],a.playerInvWait({name:"automation-science-pack",count:10});break;case 4.45:a.tutText("Now go back to your lab and add the [science-packs]"),a.tutStep(".navEntities"),a.tutStep(".navE_Lab"),a.tutStep(".labInput icon-base[title='automation-science-pack']");break;case 4.5:a.tutStep(".navTechs");break;case 4.51:a.tutText("This tab allows you to direct technology research.<br>We should start with automation"),a.tutButton("I hope there's more than this");break;case 4.52:a.tutText("More techs will become available with each research"),a.tutStep("#technologies icon-base[title='automation']");break;case 4.53:break;case 100:r()("#tut_text").text("End of tutorial...so far"),r()("#tut_button").text("But now what...?").show();break;default:r()("#tutorial").hide(),console.log("default, reset"),s.a.baseApp.autoSave()}},e.tutStep=function(t){r()(t).addClass("tutStep")},e.tutText=function(t){r()("#tut_text").html(t)},e.tutButton=function(t){r()("#tut_button").html(t).show(),this.setTutClick()},e.hide=function(){r()(".tutStep").off("click"),r()("#tutorial").removeClass("Block"),s.a.baseApp.autoSave()},e.setTutClick=function(t){var e=this;void 0===t&&(t=0),this.tutClicks=t,r()(".tutStep").click((function(){--e.tutClicks>0||e.nextStep()}))},e.playerInvWait=function(t){var e=this;s.a.baseApp.player.inv.when(t,(function(){return e.nextStep()}))},e.runStep=function(t){t.block?r()(".tutorial").addClass("Block"):r()(".tutorial").removeClass("Block"),r()(t.highlight).css("z-index",2e3)},t}());s.a.tut=c}}]);
//# sourceMappingURL=app~19ccdd99.7d7eeb8acccf91b8dbf6.bundle.map