(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{iVgR:function(e,t,r){"use strict";r.d(t,"a",(function(){return g}));var n=r("7jDb"),i=r("463H"),s=r("Kh/G"),c=r("6juG");n.a.defineObj("player.entity",(function(e,t,r){return t.buffers={},Object.assign(t,r.data.entity[e.name]),"miner"!=t.subType&&"crafter"!=t.subType||(t.buffers.out=r.newComponent("entity.buffer",{})),"crafter"!=t.subType&&"research"!=t.subType||(t.buffers.in=r.newComponent("entity.buffer",{}),"research"==t.subType&&(t.inputs.forEach((function(e){return t.buffers.in.items.push({name:e,count:0})})),t.research_timer=null,t.$_tags.push("researchTicker",!0))),//!  This won't work when Igor is in a webworker
c.b.signaler.signal("addedEntity"),[t]}),{tick:function(e,t,r){e.processing?Number.isNaN(e.process_timer)||null===e.process_timer?"miner"==e.subType||r.processTEMP(e.buffers.in,"inventory.consume",{itemStacks:e.processing.ingredients})?e.process_timer=e.process_ticks:e.$_tags.delete("tick"):(e.process_timer&&--e.process_timer,0===e.process_timer&&r.processTEMP(e.buffers.out,"inventory.add",{itemStacks:e.processing.results||{name:e.processing.mining_results,count:1}})&&(e.process_timer=NaN)):e.$_tags.delete("ticking")}}),n.a.addObjectTickHandler("player.entity",(//!  These should be combined into the entity.buffer tick()
function(e,t,r){if(0==e.buffers.in.xferTimer--){var n=Math.min(e.buffers.in.xfer,e.buffers.in.stackSize-e.buffers.in.items[0].count),i=r.processTEMP(r.getNamedObject("player.inventory"),"inventory.consume",{itemStacks:{name:e.buffers.in.items[0].name,count:n},partial:!0});i&&(e.buffers.in.items[0].count+=i[0].count,e.$_tags.push("tick","processing")),e.buffers.in.xferTimer=e.buffers.in.xferTicks}}),"inputTicker",{chain:["inputTicker","tick"],num:-5}),n.a.addObjectTickHandler("player.entity",(function(e,t,r){if(0==e.buffers.out.xferTimer--){var n=Math.min(e.buffers.out.xfer,e.buffers.out.items[0].count);r.processTEMP(r.getNamedObject("player.inventory"),"inventory.add",{itemStacks:{name:e.buffers.out.items[0].name,count:n}})&&(e.buffers.out.items[0].count-=n),e.buffers.out.xferTimer=e.buffers.out.xferTicks}}),"outputTicker",{chain:["tick","outputTicker"],num:5}),n.a.addObjectTickHandler("player.entity",(function(e,t,r){var n=r.getNamedObject("research").progressing;if(n){if(Number.isNaN(e.research_timer)||null===e.research_timer){if(!n.cost.ingredients.every((function(t){var n=t[0],i=t[1];return r.processTEMP(e.buffers.in.items,"inventory.total",{name:n})>i})))return;return console.log("consuming"),n.cost.ingredients.forEach((function(t){var n=t[0],i=t[1];r.processTEMP(e.buffers.in,"inventory.consume",{itemStacks:{name:n,count:i}})})),void(e.research_timer=120)}e.research_timer&&--e.research_timer,0===e.research_timer&&(r.processTEMP(n,"research.update",{}),e.research_timer=NaN)}}),"researchTicker",{chain:["tick","researchTicker"],num:3});var o=function(e,t,r){r.res?(window.clearTimeout(r.timeout),t.view.animsUpdate(r.res,null,null),r.res=void 0):(r.timeout=window.setTimeout((function(){t.processTEMP(e.player.inventory,"inventory.add",{itemStacks:[{name:e.which.resource.mining_results,count:1}]}),t.view.animsUpdate(r.res,null,null),r.res=void 0}),1e3*e.which.resource.mining_time),r.res=e.which.resource,t.view.animsUpdate(e.which.resource,"isMining",e.which.resource.mining_time))};window.ResourceMine=o,o.signature={which:"resource",player:"inventory"},n.a.provide_CCC("resources.mine",o,o.signature);n.a.provide_CCC("entity.setProcess",(function(e,t){if(!e.at.entity.processing&&null!=e.which.process||(t.processTEMP(e.at.entity,"entity.clearProcess",{returnTo:e.player.inventory}),e.which.process))if(e.at.entity.processing=e.which.process,e.at.entity.$_tags.push("tick","processing"),"mining"==e.type.class)e.at.entity.process_ticks=e.which.process.mining_time/e.at.entity.mining_speed*t.config.TICKS_PER_SECOND,e.at.entity.process_timer=e.at.entity.process_ticks;else if("crafting"==e.type.class){if(e.at.entity.process_ticks=e.which.process.crafting_speed/e.at.entity.crafting_speed*t.config.TICKS_PER_SECOND,e.at.entity.buffers.in){var r=t.getId(e.at.entity.buffers.in);if(r.stacks<e.which.process.ingredients.length)return void console.error("cannot fit ingredients");e.which.process.ingredients.forEach((function(e,t){r.items[t]={name:e.name,count:0}}))}if(e.at.entity.buffers.out){var n=t.getId(e.at.entity.buffers.out);if(n.stacks<e.which.process.results.length)return void console.error("cannot fit results");e.which.process.results.forEach((function(e,t){n.items[t]={name:e.name,count:0}}))}e.at.entity.process_timer=NaN}}),{at:"entity",which:"process",type:"class",player:"inventory"}),n.a.addOperation("entity.clearProcess",(function(e,t,r,n){e.buffers.in&&(n.processTEMP(t.returnTo,"inventory.add",{itemStacks:e.buffers.in.items}),//! If args.returnTo is full, 'inventory.add' will fail silently
e.buffers.in.items.length=0),e.buffers.out&&(n.processTEMP(t.returnTo,"inventory.add",{itemStacks:e.buffers.out.items}),//! If args.returnTo is full, 'inventory.add' will fail silently
e.buffers.out.items.length=0),e.processing=null}));var a={Collect:function(e,t){var r=t.getId(e.which.buffer);t.processTEMP(e.player.inventory,"inventory.add",{itemStacks:r.items[e.item.idx]}),r.items[e.item.idx].count=0,"temp_null"!=e.at.entity&&e.at.entity.$_tags.push("tick","processing")}};a.Collect.signature={which:"buffer",item:"idx",at:"entity",player:"inventory"},a.Collect.CC_provide="entity.bufferCollect",a.Fill=function(e,t){var r=t.getId(e.which.buffer),n=t.processTEMP(e.player.inventory.items,"inventory.total",{name:r.items[e.item.idx].name});if(0!==n){var i=e.service.rounder.calc(r.items[e.item.idx].count,r.stackSize,n);t.processTEMP(e.player.inventory,"inventory.consume",{itemStacks:{name:r.items[e.item.idx].name,count:i}}),r.items[e.item.idx].count+=i,"temp_null"!=e.at.entity&&e.at.entity.$_tags.push("tick","processing")}},a.Fill.signature={which:"buffer",item:"idx",at:"entity",service:"rounder",player:"inventory"},a.Fill.CC_provide="entity.bufferFill",n.a.setStatic("entity.buffer.BUFFER_SIZE",[5,10,20,30,40,50]),n.a.setStatic("entity.buffer.BUFFER_SIZE.MAX",50),a.Upgrade=function(e,t){if("autoload"==e.type.string){if(t.processTEMP(e.player.inventory,"inventory.consume",{itemStacks:{name:"inserter",count:1}})){!e.which.buffer.upgrades.loader&&(e.which.buffer.upgrades.loader={count:0}),e.which.buffer.upgrades.loader.count++,e.which.buffer.xferTimer||(e.which.buffer.xferTimer=e.which.buffer.xferTicks),e.which.buffer.xfer++;var r;r=e.at.entity.buffers.in==e.which.buffer?"inputTicker":"outputTicker",e.at.entity.$_tags.push(r,!0)}}else"buffer"==e.type.string&&t.processTEMP(e.player.inventory,"inventory.consume",{itemStacks:{name:"iron-chest",count:1}})&&(!e.which.buffer.upgrades.bufferSize&&(e.which.buffer.upgrades.bufferSize={count:0}),e.which.buffer.upgrades.bufferSize.count++,e.which.buffer.stackSize=t.getStatic("entity.buffer.BUFFER_SIZE")[e.which.buffer.upgrades.bufferSize.count]||t.getStatic("entity.buffer.BUFFER_SIZE.MAX"),e.at.entity.$_tags.push("tick","processing"))},a.Upgrade.signature={which:"buffer",type:"string",at:"entity",player:"inventory"},a.Upgrade.CC_provide="entity.bufferUpgrade",a.SetRestrictions=function(e,t,r,n){e.restrictable||(r._result=!1);for(var i=[],s=[],c=0;c<e.items.length;c++){var o=e.items[c];o?t.list.includes(o.name)?i.push(o.name):(o.count>0&&n.processTEMP(n.getNamedObject("player.inventory"),"inventory.add",{itemStacks:o}),e.items.splice(c,1,void 0),s.push(c)):s.push(c)}t.list.forEach((function(t){i.includes(t)||e.items.splice(s.splice(0,1),1,{name:t,count:0})}))},a.SetRestrictions.Igor_operation="buffer.restrictList",a.HasRestriction=function(e,t,r,n){e.restrictable?e.items.forEach((function(e){e.name==t.itemName&&(e.restrictedBy.includes(t.lineId)?r._result={found:!0,restricted:!0}:r._result={found:!0,restricted:!1})})):r._result=!1,!r._result&&(r._result={found:!1,restricted:!1})},a.HasRestriction.Igor_operation="buffer.hasRestriction",a.ClearRestriction=function(e,t,r,n){e.restrictable||(r._result=!1);for(var i=-1;!("_result"in r);){var s=e.items[++i];s.name==t.itemName&&(s.restrictedBy.splice(s.restrictedBy.indexOf(t.lineId),1),0==s.restrictedBy.length?(e.items[i]=null,r._result={found:!0,cleared:!0}):r._result={found:!0,cleared:!1})}!r._result&&(r._result={found:!1,cleared:!1})},a.ClearRestriction.Igor_operation="buffer.clearRestriction",n.a.defineObj("entity.buffer",(function(e,t,r){return t.upgrades={},t.stacks=e.stacks||1,t.stackSize=e.stackSize||5,t.items=Array(t.stackSize),t.xfer=0,t.xferTicks=120,t.xferTimer=NaN,t.restrictable=e.restrictable||!1,[t]}),a);n.a.provide_CCC("research.set",(function(e,t,r){e.global.game.research.progressing=e.which.tech,e.global.game.research.progressing.completeUnits=0}),{which:"tech",global:"game"});n.a.provide_CCC("research.clear",(function(e,t,r){e.global.game.research.progressing=null}),{global:"game"});n.a.addOperation("research.update",(function(e,t,r,n){e.completeUnits++,e.completeUnits==e.cost.count&&(console.log("complete tech"),n.getNamedObject("research").progressing=null,e.researched=!0,e.unlocks.forEach((function(e){"string"==typeof e&&n.processTEMP(e,"recipe.unlock"),"object"==typeof e&&n.processTEMP(e,"feature.unlock")})),c.b.signaler.signal("generalUpdate"))}));n.a.addOperation("recipe.unlock",(function(e,t,r,n){n.data.recipe[e].enabled=!0}));n.a.addOperation("feature.unlock",(function(e,t,r,n){n.getNamedObject("global").activeFeatures[e.feature]=e}));r("uH5N");var u={New:function(e,t,r){t.name=e.name.string,t.size=100,t.complexity=100,t.connections={source:null,drain:null};var n={restrictable:!0,stacks:1,stackSize:10};return t.buffers={},t.buffers.in=r.newComponent("entity.buffer",n),t.buffers.internal=r.newComponent("entity.buffer",n),t.buffers.out=r.newComponent("entity.buffer",n),t.processingList={},t.factoryLines=[],t.factoryLines.push(r.newComponent("FactoryLine",{source:t.buffers.in,drain:t.buffers.out,internal:t.buffers.internal,parent:t.$_id})),t.$_tags.push("tick","processing"),[t]}};u.New.signature={},u.NewCCC=function(e,t){t.addNewObject(t.getNamedObject("global").facBlocks.blocks,"FactoryBlock",e)},u.NewCCC.signature={name:"string"},u.NewCCC.CC_provide="facBlock.newBlock",u.NewBusCCC=function(e,t){t.addNewObject(t.getNamedObject("global").facBlocks.buses,"FactoryBus",e)},u.NewBusCCC.signature={name:"string"},u.NewBusCCC.CC_provide="facBlock.newBus",u.NewResBlock=function(e,t){t.addNewObject(t.getNamedObject("global").facBlocks.resBlocks,"ResourceBlock",e)&&t.getNamedObject("global").land.res_patches_used++},u.NewResBlock.signature={name:"string"},u.NewResBlock.CC_provide="facBlock.newResBlock",u.NewTechBlock=function(e,t){t.addNewObject(t.getNamedObject("globals").facBlocks.tech,"FactoryBlockRes",e)},u.NewTechBlock.signature={name:"string"},u.NewTechBlock.CC_provide="facBlock.newTechBlock",u.tick=function(e,t,r){e.connections.drain},u.tick.signature={},u.ConsumeStacks=function(e,t,r,n){var i=t.itemStacks.reduce((function(t,r){if(-1==t)return-1;var i=n.processTEMP(n.getId(e.processingList[r.name].at).items,"inventory.total",{name:r.name});return i<r.amount?-1:Math.min(t,Math.floor(i/r.amount))}),t.multi);i>=1&&t.itemStacks.forEach((function(t){n.processTEMP(n.getId(e.processingList[t.name].at),"inventory.consume",{itemStacks:t,multi:i})})),r._result=i},u.ConsumeStacks.signature={},u.ConsumeStacks.Igor_operation="factoryBlock.consumeStacks",u.ProduceStacks=function(e,t,r,n){var i=t.itemStacks.reduce((function(t,r){if(-1==t)return-1;var i=n.getId(e.processingList[r.name].at),s=i.stackSize-n.processTEMP(i.items,"inventory.total",{name:r.name});return s<r.amount?-1:Math.min(t,Math.floor(s/r.amount))}),t.multi);i>=1&&t.itemStacks.forEach((function(t){n.processTEMP(n.getId(e.processingList[t.name].at),"inventory.add",{itemStacks:t,multi:i})})),r._result=i},u.ProduceStacks.signature={},u.ProduceStacks.Igor_operation="factoryBlock.produceStacks",u.SetConnection=function(e,t){var r="source"==e.dir.string?"Drain":"Source";e.at.factoryBlock.connections[e.dir.string]!=e.to_which.factoryBus?t.processTEMP(e.to_which.factoryBus,"factoryBus.add"+r,{who:e.at.factoryBlock.$_id})&&(e.at.factoryBlock.connections[e.dir.string]=e.to_which.factoryBus):t.processTEMP(e.to_which.factoryBus,"factoryBus.clear"+r,{who:e.at.factoryBlock.$_id})},u.SetConnection.signature={at:"factoryBlock",to_which:"factoryBus",dir:"string"},u.SetConnection.CC_provide="factoryBlock.setConnection",u.AddFactoryLine=function(e,t){e.at.factoryBlock.factoryLines.push(t.newComponent("FactoryLine",{source:e.at.factoryBlock.buffers.in,drain:e.at.factoryBlock.buffers.out,internal:e.at.factoryBlock.buffers.internal,parent:e.at.factoryBlock.$_id}))},u.AddFactoryLine.signature={at:"factoryBlock"},u.AddFactoryLine.CC_provide="factoryBlock.addLine",u.SetProcessItems=function(e,t,r,n){console.log("set process"),r.consumes={},t.lists.consume.forEach((function(r){e.processingList[r]?e.processingList[r].at==e.buffers.internal?e.processingList[r].consume.push(t.listId):e.processingList[r].at==e.buffers.out?(e.processingList[r].at=e.buffers.internal,e.processingList[r].consume=[],e.processingList[r].consume.push(t.listId)):console.error("target at not found"):e.processingList[r]={at:e.buffers.in,consume:[t.listId]}})),t.lists.produce.forEach((function(r){e.processingList[r]?e.processingList[r].at==e.buffers.internal?e.processingList[r].produce.push(t.listId):e.processingList[r].at==e.buffers.in&&(e.processingList[r].at=e.buffers.internal,e.processingList[r].produce=[],e.processingList[r].produce.push(t.listId)):e.processingList[r]={at:e.buffers.out,produce:[t.listId]}})),n.processTEMP(e.buffers.in,"buffer.restrictList",{list:Object.keys(e.processingList).filter((function(t){return e.processingList[t].at==e.buffers.in}))}),n.processTEMP(e.buffers.internal,"buffer.restrictList",{list:Object.keys(e.processingList).filter((function(t){return e.processingList[t].at==e.buffers.internal}))}),n.processTEMP(e.buffers.out,"buffer.restrictList",{list:Object.keys(e.processingList).filter((function(t){return e.processingList[t].at==e.buffers.out}))})},u.SetProcessItems.Igor_operation="factoryBlock.setProcessItems",u.ClearProcessItems=function(e,t,r,n){t.lists.consume.forEach((function(r){var n,i=e.processingList[r];(i.consume.splice(i.consume.indexOf(t.listId),1),0==i.consume.length)&&(i.at==e.buffers.internal&&(null==(n=i.produce)?void 0:n.length)>0?i.at=e.buffers.out:e.processingList[r]=void 0)})),t.lists.produce.forEach((function(r){var n,i=e.processingList[r];(i.produce.splice(i.produce.indexOf(t.listId),1),0==i.produce.length)&&(i.at==e.buffers.internal&&(null==(n=i.consume)?void 0:n.length)>0?i.at=e.buffers.in:e.processingList[r]=void 0)})),n.processTEMP(n.getId(e.buffers.in),"buffer.restrictList",{list:Object.keys(e.processingList).filter((function(t){return"in"==e.processingList[t].at}))}),n.processTEMP(n.getId(e.buffers.internal),"buffer.restrictList",{list:Object.keys(e.processingList).filter((function(t){return"internal"==e.processingList[t].at}))}),n.processTEMP(n.getId(e.buffers.out),"buffer.restrictList",{list:Object.keys(e.processingList).filter((function(t){return"out"==e.processingList[t].at}))})},u.ClearProcessItems.Igor_operation="factoryBlock.clearProcessItems",n.a.defineObj("FactoryBlock",u.New,u);var f={New:function(e,t,r){return t.prepped=0,t.built=0,t.buildingType=null,t.recipe=null,t.itemTargets=null,t.processing_time=-1,t.connections={source:e.source,drain:e.drain,internal:e.internal},t.$_parent=e.parent,[t]}};f.New.signature={source:"entity.buffer",drain:"entity.buffer",internal:"entity.buffer"},f.SetType=function(e,t){e.at.factoryLine.buildingType=e.which.building.name,e.at.factoryLine.crafting_categories=e.which.building.crafting_categories,e.at.factoryLine.foundationCost=[{name:"stone",count:5}]},f.SetType.signature={at:["factoryLine","factoryBlock"],which:"building"},f.SetType.CC_provide="factoryLine.setBuilding",f.Prep=function(e,t){e.at.factoryLine.foundationCost&&(t.processTEMP(e.player.inventory,"inventory.consume",{itemStacks:e.at.factoryLine.foundationCost})?(e.at.factoryLine.prepped++,e.at.factoryBlock.size+=10,e.at.factoryBlock.complexity+=5):console.error("Cannot consume foundation costs"))},f.Prep.signature={at:["factoryLine","factoryBlock"],player:"inventory"},f.Prep.CC_provide="factoryLine.prep",f.Expand=function(e,t){if(t.processTEMP(e.player.inventory,"inventory.consume",{itemStacks:{name:e.at.factoryLine.buildingType,count:1}})){if(e.at.factoryLine.prepped>0&&(e.at.factoryLine.built++,e.at.factoryLine.prepped--,e.at.factoryLine.recipe)){if(Number.isInteger(e.at.factoryLine.processing_ticks))console.log("currently processing "+e.at.factoryLine.processing_count),console.log("ticks: "+e.at.factoryLine.processing_ticks),console.log("timer: "+e.at.factoryLine.processing_time),t.processTEMP(e.at.factoryBlock,"factoryBlock.consumeStacks",{itemStacks:e.at.factoryLine.recipe.ingredients,multi:1})&&(e.at.factoryLine.processing_ticks*=(e.at.factoryLine.built-1)/e.at.factoryLine.built,e.at.factoryLine.processing_count++,console.log("new ticks: "+e.at.factoryLine.processing_ticks));e.at.factoryLine.$_tags.push("tick","processing")}}else console.error("Building not in inventory")},f.Expand.signature={at:["factoryLine","factoryBlock"],player:"inventory"},f.Expand.CC_provide="factoryLine.addBuilding",f.SetRecipe=function(e,t){if(e.at.factoryLine.recipe){if(e.at.factoryLine.recipe===e.which.recipe)return e.at.factoryLine.recipe=null,void e.at.factoryLine.$_tags.delete("tick");t.processTEMP(e.at.factoryBlock,"factoryBlock.clearProcessItems",{lists:e.at.factoryLine.processList})}var r=t.data.recipe[e.which.recipe],n={consume:r.ingredients.map((function(e){return e.name})),produce:r.results.map((function(e){return e.name}))},i=t.processTEMP(e.at.factoryBlock,"factoryBlock.setProcessItems",{lists:n,listId:e.at.factoryLine.$_id});i?(e.at.factoryLine.processList=i,e.at.factoryLine.recipe=r,e.at.factoryLine.processing_time=r.crafting_speed/t.data.entity[e.at.factoryLine.buildingType].crafting_speed*t.getStatic("config.TICKS_PER_SECOND"),e.at.factoryLine.processing_ticks=NaN,e.at.factoryLine.built&&e.at.factoryLine.$_tags.push("tick","processing")):console.error("Couldn't set my items on the parent factoryBlock")},f.SetRecipe.signature={at:["factoryLine","factoryBlock"],which:"recipe",player:"inventory"},f.SetRecipe.CC_provide="factoryLine.setRecipe",f.tick=function(e,t,r){if(0!=e.built&&e.processing_time)if(Number.isNaN(e.processing_ticks)){var n=r.processTEMP(e.$_parent,"factoryBlock.consumeStacks",{itemStacks:e.recipe.ingredients,multi:e.built});n>0&&(e.processing_ticks=0,e.processing_count=n)}else e.processing_ticks>=e.processing_time?(r.processTEMP(e.$_parent,"factoryBlock.produceStacks",{itemStacks:e.recipe.results,multi:e.processing_count}),e.processing_ticks=NaN):e.processing_ticks++},f.signature={},n.a.defineObj("FactoryLine",f.New,f);var l={New:function(e,t,r){return t.name=e.name.string,t.size=50,t.complexity=50,t.connections={sources:[],drains:[]},[t]},//! These are called from FactoryBlock's persepective,
//! that's what the Igor call names are reversed
AddSource:function(e,t,r,n){e.connections.sources.push(t.who),r._result=!0}};l.AddSource.Igor_operation="factoryBus.addDrain",l.AddDrain=function(e,t,r,n){e.connections.drains.push(t.who),r._result=!0},l.AddDrain.Igor_operation="factoryBus.addSource",l.ClearSource=function(){target.connections.sources.slice(target.connections.sources.indexOf(args.who),1),returnObj._result=!0},l.ClearDrain=function(){target.connections.drains.slice(target.connections.drains.indexOf(args.who),1),returnObj._result=!0},n.a.defineObj("FactoryBus",l.New,l);var p=void 0,d={land:{total:100,used:0,complexity:0,res_patches:1,res_patches_used:0,fac_block_costs:{factory:100,bus:100,research:100}},scanning:{nextCost:100,currentCost:0},attackWaves:{nextTimer:100,nextStrength:100,currentTimer:0},facBlocks:{defenses:null,defenseBus:null,offense:null,offenseBus:null,resBlocks:[],buses:[],blocks:[]},player:s.a,activeFeatures:[],research:{completed:{},progressing:null},version:i.a},g=function(){n.a.defineObj("#",d),n.a.defineObj("#.facBlocks","factoryBlocksBase"),n.a.defineObj("player","player"),n.a.amendObject("FactoryBlocksBase",{tickFn:function(e,t){m(e,t)}}),console.log("setup complete")},m=function(e,t){var r,n,i,s;e.ticks%100||((null==t||null==(r=t.offenses)||null==(n=r.machines.radar)?void 0:n.count)&&(p.globals.scanning.currentCost+=1*t.offenses.machines.radar.count,p.globals.scanning.currentCost>=p.globals.scanning.nextCost&&(p.globals.scanning.currentCost-=p.globals.scanning.nextCost,p.globals.scanning.nextCost+=20,p.globals.land.total+=10,p.globals.land.res_patches=Math.floor(p.globals.land.total/100))),(null==t||null==(i=t.defenses)||null==(s=i.machines.turret)?void 0:s.count)&&(p.globals.attackWaves.currentTimer>p.globals.attackWaves.nextTimer?(p.globals.attackWaves.nextTimer=1.2^p.globals.attackWaves.nextTimer,p.globals.attackWaves.currentTime=0):p.globals.attackWaves.currentTimer++))}}}]);
//# sourceMappingURL=app~fa1e48bf.2b222e076479bddff947.bundle.map