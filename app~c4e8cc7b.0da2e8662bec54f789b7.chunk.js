(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{Evr9:function(t,e,a){"use strict";a.d(e,"a",(function(){return c}));var i,s=a("+Aae"),o=a("EVdn"),n=a.n(o),u=[0,.1,.2,.3,.4,.9,1,1.1,1.2,2,2.1,2.2,2.3,2.4,3,3.1,3.2,3.21,3.3,3.4,3.5,3.6,3.7,3.75,3.8,3.81,3.82,3.9,3.91,4,4.1,4.2,4.3,4.4,4.41,4.411,4.42,4.43,4.44,4.45,4.452,4.46,4.5,4.51,4.52,4.53,4.54,4.55,4.6,5,5.05,5.1,5.15,5.2,5.25,5.3,5.35,5.4,5.42,5.45,5.5,5.55,5.6,5.65,5.7,5.75,5.8,5.85,5.9,5.91,6,6.05,6.055,6.06,6.065,6.07,6.075,6.08,6.085,6.09,6.095,6.096,6.1,6.15,6.16,6.17,6.18,100];window.jq=n.a;var c=new(function(){function t(){var t=this;this.atStep=0,this.tutClicks=0,this.gameWait=null,i=this,this.stepNum=function(e){return u[e||t.atStep]}}var e=t.prototype;return e.start=function(t){var e=this;this.baseApp=t,this.baseApp.globals.activeFeatures.tutorial.step||(this.baseApp.globals.activeFeatures.tutorial={step:0}),this.atStep=this.baseApp.globals.activeFeatures.tutorial.step,n()("#tutorial").addClass("Block"),n()("#tut_button").click((function(){e.nextStep()})),this.setStep(u[this.atStep])},e.jumpTo=function(t){this.atStep=u.indexOf(t),this.start()},e.nextStep=function(){var t=this;n()(".tutHighlight").removeClass("tutHighlight"),n()(".tutStep").removeClass("tutStep").off("click"),n()("#tut_button").hide(),n()("#tut_pos").removeClass(["top","bottom"]).addClass("center"),this.gameWait=null,i.tutText(""),setTimeout((function(){t.setStep(u[++t.atStep])}),10)},e.tutStep=function(t){n()(t).addClass("tutStep")},e.tutTarget=function(t){t?n()(t).addClass("tutTarget"):n()(".tutTarget").removeClass("tutTarget")},e.tutHighlight=function(t){n()(t).addClass("tutHighlight")},e.tutText=function(t){n()("#tut_text").html(t)},e.tutButton=function(t){n()("#tut_button").html(t).show(),this.setTutClick()},e.clearTut=function(){n()(".tutStep").off("click"),n()("#tutorial").removeClass("Block"),this.baseApp.globals.activeFeatures.tutorial=!1,this.baseApp.autoSave()},e.setTutClick=function(t){var e=this;void 0===t&&(t=0),this.tutClicks=t,n()(".tutStep").on("click",(function(){--e.tutClicks>0||e.nextStep()}))},e.checkConditions=function(){var t=this;if(this.gameWait)switch(this.gameWait.type){case"playerInv":var e=0;switch(this.gameWait.excludeInv||(e=this.baseApp.globals.player.inv.items.reduce((function(e,a){return a.name==t.gameWait.name?e+a.count:e}),0)),this.gameWait.buffered&&(e=this.baseApp.globals.player.workshop.entities.reduce((function(e,a){var i=t.baseApp.IgorJs.getObjId(a);i.name==t.gameWait.buffered&&t.baseApp.IgorJs.getObjId(i.buffers.in).items.forEach((function(a){a.name==t.gameWait.name&&(e+=a.count)}));return e}),e)),this.gameWait.compare){case"min":e>=this.gameWait.count&&this.waitComplete();break;case"max":e<=this.gameWait.count&&this.waitComplete();break;default:e==this.gameWait.count&&this.waitComplete()}break;case"techComplete":this.baseApp.globals.research[this.gameWait.name].complete&&this.waitComplete();break;case"gameState":this.gameWait.validator(Object.walkPath(this.baseApp,this.gameWait.path))&&this.waitComplete();break;default:console.warn("type handling undeclared:"+this.gameWait.type)}},e.waitComplete=function(){this.gameWait=null,n()("#tutorial").show(),this.nextStep()},e.hide=function(){n()("#tutorial").hide()},e.show=function(){n()("#tutorial").show()},e.setStep=function(t){var e=this;switch(this.baseApp.globals.activeFeatures.tutorial.step=u.indexOf(t),t){case 0:i.tutText("The Factory Must Grow"),i.tutButton("Let's build it");break;case.1:i.tutText("This alpha is about the mechanics, most everything else is slated to be improved"),i.tutButton("I won't judge!");break;case.2:i.tutText("You can cancel the tutorial by clicking the 'X' in the upper right corner"),i.tutButton("Just don't condescend me, and we'll be fine");break;case.3:i.tutText("This button expands the navigation menu."),i.tutHighlight(".fa-level-up-alt"),i.tutButton("...In case I forget what the icons mean.");break;case.4:i.tutText("This menu has a number of options, including a subscription to my mailing list. "),i.tutHighlight(".fa-bars"),i.tutButton("Maybe I'll want to stay updated...");break;case.9:i.tutStep("#resources"),n()("#tut_pos").addClass("top"),i.tutText("You can mine (click) these by hand"),i.tutButton("Got it");break;case 1:i.tutStep("#resources icon-base[title='stone']"),i.tutText("Mine 5 stone"),i.gameWait={name:"stone",count:5,type:"playerInv"};break;case 1.1:i.tutText("Machines will be used for the bulk of your production."),i.tutButton("Which are the machines?");break;case 1.2:i.tutText("Machines have a red 'M' at the bottom of their icon"),i.tutButton("So many options");break;case 2:i.tutText("Now build a furnace to melt metal to plates"),i.tutStep("#recipes icon-base[title='stone-furnace']"),this.gameWait={name:"stone-furnace",count:1,type:"playerInv"};break;case 2.1:i.tutText("Clicking on the furnace in your inventory will add it to your production machines"),i.tutStep("#inventoryList icon-base[title='stone-furnace']"),this.setTutClick();break;case 2.2:i.tutStep(".navEntities"),this.setTutClick();break;case 2.3:i.tutStep("#machines .entityList icon-base[title='stone-furnace']"),this.setTutClick();break;case 2.4:i.tutText("For your machines, you must set a recipe.<br>Lets start with iron plates"),i.tutStep("#recipeSelect icon-base[title='iron-plate']"),this.setTutClick();break;case 3:i.tutText("Now head back and mine 5 iron ore"),i.tutStep(".navHome"),this.setTutClick();break;case 3.1:i.tutStep("#resources icon-base[title='iron-ore']"),this.gameWait={name:"iron-ore",count:5,type:"playerInv"};break;case 3.2:i.tutText("Good, let's turn that ore into plates!"),i.tutButton("Back to my furnace I go");break;case 3.21:n()("#tutorial").hide(),i.tutStep(".navEntities"),this.setTutClick();break;case 3.3:i.tutStep(".showRecipe icon-base[title='iron-ore']"),this.setTutClick(5);break;case 3.4:n()("#tutorial").show(),i.tutText("Now watch your furnace produce the plates"),i.tutButton("At least it's faster than paint drying");break;case 3.5:i.tutStep(".showRecipe icon-base[title='iron-plate']"),this.gameWait={name:"iron-plate",count:5,type:"playerInv"};break;case 3.6:i.tutText("Mining by hand takes a while, lets get a mining-drill set up"),i.tutButton("I can dig it");break;case 3.7:s.a.baseApp.viewPane.main="home",s.a.baseApp.tooltip=s.a.rec.recipeList["burner-mining-drill"],n()("#recipes icon-base[title='burner-mining-drill']").addClass("tutTarget"),i.tutText("A mining drill requires the following:<br>1 gear, a furnace and 1 plate<br>build away"),i.tutButton("Hi ho, it's off to work I go");break;case 3.75:n()("#tutorial").hide(),this.gameWait={name:"burner-mining-drill",count:1,type:"playerInv"};break;case 3.8:n()(".tutTarget").removeClass("tutTarget"),n()("#tutorial").show(),i.tutText("A mining drill can produce resources automatically.\nAdd it to your machines and lets take a look at it"),i.tutButton("I'll see you shortly");break;case 3.81:n()("#tutorial").hide(),i.tutStep("inventory icon-base[title='burner-mining-drill']"),i.setTutClick();break;case 3.82:i.tutStep(".navEntities"),i.gameWait={type:"gameState",path:"viewPane.main",validator:function(t){return"entities"==t}},i.setTutClick();break;case 3.9:i.tutStep("#machines .entityList icon-base[title='burner-mining-drill']"),this.setTutClick();break;case 3.91:n()("#tutorial").show(),i.tutText("Now select iron to begin automagical mining"),i.tutStep(".minable-resources icon-base[title='iron-ore']"),this.setTutClick();break;case 4:i.tutHighlight(".upgrades-infopane icon-base[title='iron-chest']"),i.tutText("Each item buffer can only hold so much.  Add iron chests to increase that capacity"),i.tutButton("Useful to not have to babysit"),this.setTutClick();break;case 4.1:i.tutHighlight(".upgrades-infopane icon-base[title='inserter']"),i.tutText("Item buffers can be improved with inserters to create some basic automation"),i.tutButton("Too bad I can't watch them move back and forth like some other game I know"),this.setTutClick();break;case 4.2:s.a.baseApp.viewPane.main="home",s.a.baseApp.tooltip=s.a.rec.recipeList.lab,i.tutText("These paltry machines are a start, but won't hold you forever.<br>Keep expanding, but you're next goal should be a research lab."),n()("#recipes icon-base[title='lab']").addClass("tutTarget"),i.tutButton("The Factory...Is Growing..."),i.setTutClick();break;case 4.3:n()("#tutorial").hide(),i.gameWait={name:"lab",count:1,type:"playerInv",compare:"min"};break;case 4.4:n()(".tutTarget").removeClass("tutTarget"),i.tutStep("#inventoryList icon-base[title='lab']"),i.setTutClick();break;case 4.41:i.tutStep(".navEntities"),i.gameWait={type:"gameState",path:"viewPane.main",validator:function(t){return"entities"==t}},i.setTutClick();break;case 4.411:i.tutStep("#machines .entityList icon-base[title='lab']"),i.setTutClick();break;case 4.42:n()("#tutorial").show(),i.tutText("This is a research lab.  You will need to add 'science packs' for it to consume to process research."),i.tutButton("Are these machines or magic?");break;case 4.43:i.tutText("I was going to tell you to make 5, but for that comment make 10  of the 'automation science packs'"),i.tutButton("*grumble*");break;case 4.44:this.baseApp.viewPane.main="home",this.baseApp.tooltip=s.a.rec.recipeList["automation-science-pack"],n()("#tutorial").hide(),n()("#recipes icon-base[title='automation-science-pack']").addClass("tutTarget"),i.gameWait={name:"automation-science-pack",count:10,type:"playerInv",buffered:"lab",compare:"min"};break;case 4.45:n()("#tutorial").show(),n()(".tutTarget").removeClass("tutTarget"),i.tutText("Now go back to your lab and add the science packs"),s.a.baseApp.viewPane.showingItem=null,i.tutStep(".navEntities"),i.gameWait={type:"gameState",path:"viewPane.main",validator:function(t){return"entities"==t}};break;case 4.452:i.hide(),i.tutStep(".entityList icon-base[title='lab']"),i.setTutClick();break;case 4.46:i.tutStep(".labInput icon-base[title='automation-science-pack']"),i.gameWait={name:"automation-science-pack",count:5,type:"playerInv",buffered:"lab",compare:"min",excludeInv:!0};break;case 4.5:i.tutText("Good, now lets put those to use."),i.tutStep(".navTechs"),i.setTutClick();break;case 4.51:i.tutText("This tab allows you to direct technology research.<br>We should start with automation"),i.tutButton("I hope there's more than this");break;case 4.52:i.tutText("More techs will become available with each research"),i.tutStep("#technologies icon-base[title='automation']"),i.setTutClick();break;case 4.53:n()("#tutorial").hide(),i.tutStep("#StartResearch"),i.gameWait={name:"automation",type:"techComplete"};break;case 4.54:i.tutText("You can now start automating some equipment construction with the new assembling machine."),i.tutButton("Time to expand my labs");break;case 4.55:i.baseApp.viewPane.main="research",i.tutText("Your next goal is to research FactoryBlocks"),i.tutStep("#technologies icon-base[title='facBlocks']"),i.setTutClick();break;case 4.6:n()("#tutorial").hide(),i.tutTarget("#technologies icon-base[title='facBlocks']"),i.gameWait={name:"facBlocks",type:"techComplete"};break;case 5:i.tutTarget(!1),n()("#tutorial").show(),i.tutText("Factory Blocks are the core of this game, constantly producing the mass of materials you need"),i.tutStep(".fa-object-ungroup"),i.setTutClick();break;case 5.05:i.tutHighlight(".facBlockStats"),i.tutText("The upper section gives stats about what you can build.<br>At the moment, these are just for show."),i.tutButton("continue");break;case 5.1:i.tutHighlight(".newFacBlock"),i.tutText("There are four different factory blocks, each with their own focus."),i.tutButton("continue");break;case 5.15:i.tutText("The first step is to add a Resource Patch to begin your material exploits.<br>Give it a name to remember it by."),i.tutStep(".newFacBlock.resBlock"),i.setTutClick();break;case 5.2:i.tutStep(".resBlockItem:eq(0)"),i.setTutClick();break;case 5.25:i.tutText("This is a resource patch.  It's signifies a secured resource deposit"),i.baseApp.globals.player.inv.items.push({name:"stone",count:20}),i.baseApp.globals.player.inv.items.push({name:"transport-belt",count:5}),i.baseApp.globals.player.inv.items.push({name:"burner-mining-drill",count:1}),i.tutButton("continue");break;case 5.3:i.tutStep("#resBlock_foundation"),i.tutText("Before a drill can be added, you must prep a foundation"),i.setTutClick();break;case 5.35:i.tutStep("#resBlock_miners"),i.tutText("To add a drill to this patch, you need a prepped foundation"),i.setTutClick();break;case 5.4:i.tutStep(".resBlock_setResource"),i.tutText("You can set the resource being mined with this.<br>I'd suggest iron ore to start"),i.setTutClick();break;case 5.42:i.hide(),i.gameWait={type:"gameState",path:"viewPane.showingItem.patchProperties.resource",validator:function(t){return t}};break;case 5.45:i.show(),i.tutHighlight(".resBlock.connection"),i.tutText("A resource patch is great, but to make use of its materials, we will need to connect a bus from here"),i.tutButton("How do we establish a bus line?");break;case 5.5:i.tutStep(".fa-object-ungroup"),i.tutText("Let's go establish one of those now."),i.setTutClick();break;case 5.55:i.tutStep(".newFacBlock.busLine"),i.tutText("You should know what to do"),i.setTutClick();break;case 5.6:i.tutStep(".busLineItem:eq(0)"),i.setTutClick();break;case 5.65:i.tutText("Welcome to a bus line.  Its purpose is to transport items between factory blocks."),i.tutButton("continue");break;case 5.7:i.tutHighlight("#busLine_sources_add"),i.tutHighlight("#busLine_drains_add"),n()("#tutorial").addClass("bottom"),i.tutText("The bus line needs access points before connections can be made"),i.tutButton("continue");break;case 5.75:i.tutHighlight(".busLine_expandProcessing"),n()("#tutorial").addClass("bottom"),i.tutText("To actually process items, the bus line needs inserters"),i.tutButton("continue");break;case 5.8:i.tutHighlight(".busLine_tut_inProgress"),i.tutText("Items 'on the belt' are shown here, and will be deposited to the 'drains' in time"),i.tutButton("continue");break;case 5.85:i.tutText("Here's some free stuff, add an access point and expand the processing for both the source and drain."),i.baseApp.globals.player.inv.items.push({name:"inserter",count:8}),i.baseApp.globals.player.inv.items.push({name:"iron-chest",count:8}),i.baseApp.globals.player.inv.items.push({name:"transport-belt",count:10}),i.tutButton("Ah thanks!");break;case 5.9:n()("#tutorial").hide(),i.tutHighlight(".busLine_tut_inProgress"),i.tutStep(".fa-object-ungroup"),i.setTutClick();break;case 5.91:i.tutStep(".resBlockItem:eq(0)"),i.setTutClick();break;case 6:i.show(),i.tutStep(".resBlock.connection"),i.tutText("Now that we are back to your resource block, click and select the connection"),i.setTutClick();break;case 6.05:i.hide(),i.gameWait={type:"gameState",path:"viewPane.showingItem.output",validator:function(t){var a;return null==(a=e.baseApp.IgorJs.getObjId(t))?void 0:a.connection}};break;case 6.055:i.show(),i.tutText("Now that the resource block is connected, your bus line will acquire its output and transfer it"),i.tutButton("continue");break;case 6.06:i.tutText("Your bus line doesn't have drains, blocks to send the resources to.<br>So now to build a factory Block!"),i.tutStep(".fa-object-ungroup"),i.setTutClick();break;case 6.065:i.hide(),i.tutStep(".newFacBlock.facBlock"),i.setTutClick();break;case 6.07:i.tutStep(".facBlockItem:eq(0)"),i.setTutClick();break;case 6.075:i.show(),i.tutHighlight(".bufferRow"),i.tutText("This row provides information on the connections and buffers to bus lines"),i.tutButton("continue");break;case 6.08:i.tutHighlight(".bufferRow .fa-creative-commons-sa"),i.tutText("The internal buffer shows items that are built and used within this factory block"),i.tutButton("continue");break;case 6.085:i.tutHighlight(".productionLines:eq(0)"),i.tutText("Factory Blocks are built upon Factory Lines, a set of similar buildings producing the same thing."),i.tutButton("continue");break;case 6.09:i.tutHighlight(".fa-plus-square"),i.tutHighlight(".setBuildingType"),i.tutText("Before you can add buildings to a factory line, you need to select a building type and prep spaces"),i.tutButton("I should start with a furnace to process ores");break;case 6.095:i.hide(),i.baseApp.globals.player.inv.items.push({name:"stone-furnace",count:2}),i.gameWait={type:"gameState",path:"viewPane.showingItem.factoryLines[0]",validator:function(t){var a=e.baseApp.IgorJs.getObjId(t);return a.buildingType&&a.prepped>0}};break;case 6.096:i.show(),i.tutStep(".setRecipe"),i.tutText("With a building designated, you can then select the recipe it builds and add the buildings when there are available spaces"),i.setTutClick();break;case 6.1:i.hide(),i.tutStep(".setRecipe"),i.gameWait={type:"gameState",path:"viewPane.showingItem.factoryLines[0]",validator:function(t){return!!e.baseApp.IgorJs.getObjId(t).recipe}};break;case 6.15:i.show(),i.tutStep(".facBlockIn"),i.tutText("What's next is to establish an input connection, and watch some magic happen"),i.setTutClick();break;case 6.16:i.hide(),i.gameWait={type:"gameState",path:"viewPane.showingItem.buffers.in",validator:function(t){return i.baseApp.IgorJs.getObjId(t).connection}};break;case 6.17:i.show(),i.tutHighlight(".facBlockOut"),i.tutText("The factory block will now produce materials as they available.<br>You can select an output bus, or just click the icon to collect the items"),i.tutButton("continue");break;case 6.18:i.baseApp.viewPane.main="facBlocks",i.tutHighlight(".newFacBlock.techBlock"),i.tutText("A tech block is in development so a bus can provide science packs. It shall follow the same principles outlined here"),i.tutButton("The Factory Game...Is Growing...");break;case 100:n()("#tutorial").show(),i.tutText("End of tutorial...so far"),i.tutButton("But now what...?");break;default:this.clearTut(),this.baseApp.globals.activeFeatures.tutorial=!1}},e.runStep=function(t){t.block?n()(".tutorial").addClass("Block"):n()(".tutorial").removeClass("Block"),n()(t.highlight).css("z-index",2e3)},t}());s.a.tut=c}}]);
//# sourceMappingURL=app~c4e8cc7b.0da2e8662bec54f789b7.bundle.map