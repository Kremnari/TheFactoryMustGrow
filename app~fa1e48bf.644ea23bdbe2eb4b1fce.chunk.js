(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{iVgR:function(e,t,o){"use strict";var s=o("7jDb"),r=o("463H"),n=o("Kh/G");o("iVpH"),o("uH5N"),o("6juG");s.a.setStatic("itemStackCost.busExpansion",[{name:"iron-chest",count:2}]),s.a.setStatic("itemStackCost.busProcessing",[{name:"inserter",count:2}]),s.a.setStatic("itemStackCost.resBlock_foundation",[{name:"stone",count:5},{name:"transport-belt",count:4}]),s.a.setStatic("itemStackCost.resBlock_miner",[{name:"burner-mining-drill",count:1}]);var c={New:function(e,t,o){t.name=e.name.string,t.size=100,t.complexity=100,t.connections={source:null,drain:null};var s={restrictable:!0,stacks:1,stackSize:10,$_parent:t.$_id};return t.buffers={},t.buffers.in=o.newComponent("entity.buffer",s),t.buffers.internal=o.newComponent("entity.buffer",s),t.buffers.out=o.newComponent("entity.buffer",s),t.processingList={},t.factoryLines=[],t.factoryLines.push(o.newComponent("FactoryLine",{source:t.buffers.in,drain:t.buffers.out,internal:t.buffers.internal,parent:t.$_id})),t.$_tags.push("tick","processing"),[t]}};c.New.signature={},c.New._signal="facBlockUpdate",c.NewCCC=function(e,t){t.addNewObject(t.getNamedObject("global").facBlocks.blocks,"FactoryBlock",e)},c.NewCCC.signature={name:"string"},c.NewCCC.CC_provide="facBlock.newBlock",c.NewBusCCC=function(e,t){t.addNewObject(t.getNamedObject("global").facBlocks.buses,"FactoryBus",e)},c.NewBusCCC.signature={name:"string"},c.NewBusCCC.CC_provide="facBlock.newBus",c.NewResBlock=function(e,t){t.addNewObject(t.getNamedObject("global").facBlocks.resBlocks,"ResourceBlock",e)&&t.getNamedObject("global").land.res_patches_used++},c.NewResBlock.signature={name:"string"},c.NewResBlock.CC_provide="facBlock.newResBlock",c.NewTechBlock=function(e,t){},c.NewTechBlock.signature={name:"string"},c.NewTechBlock.CC_provide="facBlock.newTechBlock",c.tick=function(e,t,o){e.connections.drain},c.tick.signature={},c.ConsumeStacks=function(e,t,o,s){var r=t.itemStacks.reduce((function(t,o){if(-1==t)return-1;var r=s.processTEMP(s.getId(e.processingList[o.name].at).items,"inventory.total",{name:o.name});return r<o.amount?-1:Math.min(t,Math.floor(r/o.amount))}),t.multi);r>=1&&t.itemStacks.forEach((function(t){s.processTEMP(s.getId(e.processingList[t.name].at),"inventory.consume",{itemStacks:t,multi:r})})),o._result=r},c.ConsumeStacks.signature={},c.ConsumeStacks.Igor_operation="factoryBlock.consumeStacks",c.ProduceStacks=function(e,t,o,s){var r=t.itemStacks.reduce((function(t,o){if(-1==t)return-1;var r=s.getId(e.processingList[o.name].at),n=r.stackSize-s.processTEMP(r.items,"inventory.total",{name:o.name});return n<o.amount?-1:Math.min(t,Math.floor(n/o.amount))}),t.multi);r>=1&&t.itemStacks.forEach((function(t){s.processTEMP(s.getId(e.processingList[t.name].at),"inventory.add",{itemStacks:t,multi:r})})),o._result=r},c.ProduceStacks.signature={},c.ProduceStacks.Igor_operation="factoryBlock.produceStacks",c.SetConnection=function(e,t){var o="source"==e.dir.string?"Drain":"Source";e.at.factoryBlock.connections[e.dir.string]!=e.to_which.factoryBus?(t.processTEMP(e.to_which.factoryBus,"factoryBus.add"+o,{who:e.at.factoryBlock.$_id})&&(e.at.factoryBlock.connections[e.dir.string]=e.to_which.factoryBus),t.processTEMP(e.to_which.factoryBus,"factoryBus.connectTo",{})):t.processTEMP(e.to_which.factoryBus,"factoryBus.clear"+o,{who:e.at.factoryBlock.$_id})},c.SetConnection.signature={at:"factoryBlock",to_which:"factoryBus",dir:"string"},c.SetConnection.CC_provide="factoryBlock.setConnection",c.AddFactoryLine=function(e,t){e.at.factoryBlock.factoryLines.push(t.newComponent("FactoryLine",{source:e.at.factoryBlock.buffers.in,drain:e.at.factoryBlock.buffers.out,internal:e.at.factoryBlock.buffers.internal,parent:e.at.factoryBlock.$_id}))},c.AddFactoryLine.signature={at:"factoryBlock"},c.AddFactoryLine.CC_provide="factoryBlock.addLine",c.SetProcessItems=function(e,t,o,s){console.log("set process"),o.consumes={},t.lists.consume.forEach((function(o){e.processingList[o]?e.processingList[o].at==e.buffers.internal?e.processingList[o].consume.push(t.listId):e.processingList[o].at==e.buffers.out?(e.processingList[o].at=e.buffers.internal,e.processingList[o].consume=[],e.processingList[o].consume.push(t.listId)):console.error("target at not found"):e.processingList[o]={at:e.buffers.in,consume:[t.listId]}})),t.lists.produce.forEach((function(o){e.processingList[o]?e.processingList[o].at==e.buffers.internal?e.processingList[o].produce.push(t.listId):e.processingList[o].at==e.buffers.in&&(e.processingList[o].at=e.buffers.internal,e.processingList[o].produce=[],e.processingList[o].produce.push(t.listId)):e.processingList[o]={at:e.buffers.out,produce:[t.listId]}})),s.processTEMP(e.buffers.in,"buffer.restrictList",{list:Object.keys(e.processingList).filter((function(t){return e.processingList[t].at==e.buffers.in}))}),s.processTEMP(e.buffers.internal,"buffer.restrictList",{list:Object.keys(e.processingList).filter((function(t){return e.processingList[t].at==e.buffers.internal}))}),s.processTEMP(e.buffers.out,"buffer.restrictList",{list:Object.keys(e.processingList).filter((function(t){return e.processingList[t].at==e.buffers.out}))})},c.SetProcessItems.Igor_operation="factoryBlock.setProcessItems",c.ClearProcessItems=function(e,t,o,s){t.lists.consume.forEach((function(o){var s,r=e.processingList[o];(r.consume.splice(r.consume.indexOf(t.listId),1),0==r.consume.length)&&(r.at==e.buffers.internal&&(null==(s=r.produce)?void 0:s.length)>0?r.at=e.buffers.out:e.processingList[o]=void 0)})),t.lists.produce.forEach((function(o){var s,r=e.processingList[o];(r.produce.splice(r.produce.indexOf(t.listId),1),0==r.produce.length)&&(r.at==e.buffers.internal&&(null==(s=r.consume)?void 0:s.length)>0?r.at=e.buffers.in:e.processingList[o]=void 0)})),s.processTEMP(s.getId(e.buffers.in),"buffer.restrictList",{list:Object.keys(e.processingList).filter((function(t){return"in"==e.processingList[t].at}))}),s.processTEMP(s.getId(e.buffers.internal),"buffer.restrictList",{list:Object.keys(e.processingList).filter((function(t){return"internal"==e.processingList[t].at}))}),s.processTEMP(s.getId(e.buffers.out),"buffer.restrictList",{list:Object.keys(e.processingList).filter((function(t){return"out"==e.processingList[t].at}))})},c.ClearProcessItems.Igor_operation="factoryBlock.clearProcessItems",c.__tooltips=function(e,t,o,s){s.getId(e);var r="";switch(t.which){case"addLine":r="New Factory Line"}o._result={tool:"stackArray",tip:r,data:[]}},c.__tooltips.CC_utility="factoryBlock.toolTips",s.a.defineObj("FactoryBlock",c.New,c);var i={New:function(e,t,o){return t.prepped=0,t.built=0,t.buildingType=null,t.recipe=null,t.itemTargets=null,t.processing_time=-1,t.connections={source:e.source,drain:e.drain,internal:e.internal},t.$_parent=e.parent,[t]}};i.New.signature={source:"entity.buffer",drain:"entity.buffer",internal:"entity.buffer"},i.New._signal="facBlockUpdate",i.SetType=function(e,t){e.at.factoryLine.buildingType=e.which.building.name,e.at.factoryLine.crafting_categories=e.which.building.crafting_categories,e.at.factoryLine.foundationCost=[{name:"stone",count:5}]},i.SetType.signature={at:["factoryLine","factoryBlock"],which:"building"},i.SetType.CC_provide="factoryLine.setBuilding",i.Prep=function(e,t){e.at.factoryLine.foundationCost&&(t.processTEMP(e.player.inventory,"inventory.consume",{itemStacks:e.at.factoryLine.foundationCost})?(e.at.factoryLine.prepped++,e.at.factoryBlock.size+=10,e.at.factoryBlock.complexity+=5):console.error("Cannot consume foundation costs"))},i.Prep.signature={at:["factoryLine","factoryBlock"],player:"inventory"},i.Prep.CC_provide="factoryLine.prep",i.Expand=function(e,t){if(t.processTEMP(e.player.inventory,"inventory.consume",{itemStacks:{name:e.at.factoryLine.buildingType,count:1}})){if(e.at.factoryLine.prepped>0&&(e.at.factoryLine.built++,e.at.factoryLine.prepped--,e.at.factoryLine.recipe)){if(Number.isInteger(e.at.factoryLine.processing_ticks))t.processTEMP(e.at.factoryBlock,"factoryBlock.consumeStacks",{itemStacks:e.at.factoryLine.recipe.ingredients,multi:1})&&(e.at.factoryLine.processing_ticks*=(e.at.factoryLine.built-1)/e.at.factoryLine.built,e.at.factoryLine.processing_count++);e.at.factoryLine.$_tags.push("tick","processing")}}else console.error("Building not in inventory")},i.Expand.signature={at:["factoryLine","factoryBlock"],player:"inventory"},i.Expand.CC_provide="factoryLine.addBuilding",i.SetRecipe=function(e,t){if(e.at.factoryLine.recipe){if(e.at.factoryLine.recipe===e.which.recipe)return e.at.factoryLine.recipe=null,void e.at.factoryLine.$_tags.delete("tick");t.processTEMP(e.at.factoryBlock,"factoryBlock.clearProcessItems",{lists:e.at.factoryLine.processList})}var o=t.data.recipe[e.which.recipe],s={consume:o.ingredients.map((function(e){return e.name})),produce:o.results.map((function(e){return e.name}))},r=t.processTEMP(e.at.factoryBlock,"factoryBlock.setProcessItems",{lists:s,listId:e.at.factoryLine.$_id});r?(e.at.factoryLine.processList=r,e.at.factoryLine.recipe=o,e.at.factoryLine.processing_time=o.crafting_speed/t.data.entity[e.at.factoryLine.buildingType].crafting_speed*t.getStatic("config.TICKS_PER_SECOND"),e.at.factoryLine.processing_ticks=NaN,e.at.factoryLine.built&&e.at.factoryLine.$_tags.push("tick","processing")):console.error("Couldn't set my items on the parent factoryBlock")},i.SetRecipe.signature={at:["factoryLine","factoryBlock"],which:"recipe",player:"inventory"},i.SetRecipe.CC_provide="factoryLine.setRecipe",i.__tooltips=function(e,t,o,s){s.getId(e);var r=[],n="";switch(t.which){case"foundation":r.push({name:"stone",count:5}),n="Foundation Cost"}o._result={tool:"stackArray",tip:n,data:r}},i.__tooltips.CC_utility="factoryLine.toolTips",i.tick=function(e,t,o){if(0!=e.built&&e.processing_time&&e.recipe)if(e.delay)0==--e.delay&&(e.delay=null);else if(Number.isNaN(e.processing_ticks)){var s=o.processTEMP(e.$_parent,"factoryBlock.consumeStacks",{itemStacks:e.recipe.ingredients,multi:e.built});s>0?(e.processing_ticks=0,e.processing_count=s):e.delay=Math.ceil(.1*e.processing_time)}else if(e.processing_ticks>=e.processing_time){o.processTEMP(e.$_parent,"factoryBlock.produceStacks",{itemStacks:e.recipe.results,multi:e.processing_count})>0?e.processing_ticks=NaN:e.delay=Math.ceil(.1*e.processing_time)}else e.processing_ticks++},s.a.defineObj("FactoryLine",i.New,i);var a={New:function(e,t,o){return t.name=e.name.string,t.size=50,t.complexity=50,t.connections={sources:[],drains:[],maxSources:0,maxDrains:0},t.processors={source:{xferTicks:120,xferTimer:0,xferTarget:0,xferQty:0},drain:{xferTicks:120,xferTimer:0,xferTarget:0,xferQty:0},central:o.newComponent("entity.buffer",{stacks:1,stackSize:10,$_parent:t.$_id})},t.clogged=!1,[t]}};a.New._signal="facBlockUpdate",a.ClearConnection=function(e,t,o,s){console.log("clear connection: "),console.log(t.dir)},a.ClearConnection.Igor_operation="factoryBus.clearConnection",a.ConnectTo=function(e,t){var o=t.getId(e.to.buffer);if(o.connection!=e.connectTo.factoryBus){var s=t.getId(e.connectTo.factoryBus);if("output"==e.dir.string){if(o.connection){var r=t.getId(o.connection);t.processTEMP(r,"factoryBus.clearConnection",{dir:"drains",id:o.$_id})}s.connections.sources.length<s.connections.maxSources?(s.connections.sources.push({buffer:e.to.buffer,parent:o.$_parent,named:t.getId(o.$_parent).name}),o.connection=s.$_id):console.warn("No available source connections")}else if("input"==e.dir.string){if(o.connection){var n=t.getId(o.connection);t.processTEMP(n,"factoryBus.clearConnection",{dir:"sources"})}s.connections.drains.length<s.connections.maxDrains?(s.connections.drains.push({buffer:e.to.buffer,parent:o.$_parent,named:t.getId(o.$_parent).name}),o.connection=s.$_id):console.warn("No available drain connections")}}},a.ConnectTo.signature={dir:"string",connectTo:"factoryBus",to:"buffer"},a.ConnectTo.CC_provide="factoryBus.connectTo",a.ExpandBus=function(e,t){if(t.processTEMP(e.player.inventory,"inventory.consume",{itemStacks:t.getStatic("itemStackCost.busExpansion")})){"source"==e.dir.string?(e.at.factoryBus.connections.maxSources+=1,e.at.factoryBus.complexity+=5,e.at.factoryBus.size+=10):"drain"==e.dir.string&&(e.at.factoryBus.connections.maxDrains+=1,e.at.factoryBus.size+=10,e.at.factoryBus.complexity+=5);var o=t.getId(e.at.factoryBus.processors.central);e.at.factoryBus.connections.maxSources>o.maxStacks&&e.at.factoryBus.connections.maxDrains>o.maxStacks&&o.maxStacks++}},a.ExpandBus.signature={at:"factoryBus",dir:"string",player:"inventory"},a.ExpandBus.CC_provide="factoryBus.expandBus",a.ExpandProcessing=function(e,t){t.processTEMP(e.player.inventory,"inventory.consume",{itemStacks:t.getStatic("itemStackCost.busProcessing")})&&("source"==e.dir.string?(e.at.factoryBus.processors.source.xferQty+=2,e.at.factoryBus.size+=10,e.at.factoryBus.complexity+=5):"drain"==e.dir.string&&(e.at.factoryBus.processors.drain.xferQty+=2,e.at.factoryBus.size+=10,e.at.factoryBus.complexity+=5))},a.ExpandProcessing.signature={at:"factoryBus",dir:"string",player:"inventory"},a.ExpandProcessing.CC_provide="factoryBus.expandProcessing",a.__tooltips=function(e,t,o,s){var r=s.getId(e),n=[],c="";switch(t.which){case"input_processing":n.push({name:"inserter",count:2}),c="Input Processing";break;case"expand_input_sources":n.push({name:"iron-chest",count:2}),r.connections.maxSources&&n.push({name:"transport-belt",count:5*r.connections.maxSources}),c="Expand Source Points";break;case"output_processing":n.push({name:"inserter",count:2}),c="Output Processing";break;case"expand_output_drains":n.push({name:"iron-chest",count:2}),r.connections.maxDrains&&n.push({name:"transport-belt",count:5*r.connections.maxDrains}),c="Expand Drain Points"}o._result={tool:"stackArray",tip:c,data:n}},a.__tooltips.CC_utility="busLine_Costs",a.tick=function(e,t,o){var s,r;if(e.connections.sources.length>0&&(null==(s=e.processors.source)?void 0:s.xferQty)>0)if(e.processors.source.xferTimer>=e.processors.source.xferTicks){var n=o.processTEMP(e.connections.sources[e.processors.source.xferTarget].buffer,"buffer.busXfer",{xferCount:e.processors.source.xferQty,toBus:e.processors.central});if(null==n?void 0:n.full)return void console.log("bus full");++e.processors.source.xferTarget==e.connections.sources.length&&(e.processors.source.xferTarget=0),e.processors.source.xferTimer=0}else e.processors.source.xferTimer++;if(e.connections.drains.length>0&&(null==(r=e.processors.drain)?void 0:r.xferQty)>0)if(e.processors.drain.xferTimer>=e.processors.drain.xferTicks){var c=o.processTEMP(e.connections.drains[e.processors.drain.xferTarget].buffer,"buffer.busXfer",{xferCount:e.processors.drain.xferQty,fromBus:e.processors.central});if(null==c?void 0:c.full)return void console.log("bus full");++e.processors.drain.xferTarget==e.connections.drains.length&&(e.processors.drain.xferTarget=0),e.processors.drain.xferTimer=0}else e.processors.drain.xferTimer++},s.a.defineObj("FactoryBus",a.New,a);var u={New:function(e,t,o){return t.name=e.name.string,t.patchProperties={},t.spaceUsed=50,t.complexity=1,t.prepped=0,t.built=0,t.mining_ticks=NaN,t.mining_drill="burner-mining-drill",t.output=o.newComponent("entity.buffer",{restrictable:!0,stacks:1,stackSize:0,$_parent:t.$_id}),t.$_tags.push("tick","processing"),[t]}};u.New._signal="facBlockUpdate",u.SetResource=function(e,t){var o=e.at.ResourceBlock;if(e.at.ResourceBlock.patchProperties.resource){var s=t.getId(o.output);t.processTEMP(t.getNamedObject("player.inventory"),"inventory.add",{itemStacks:s.items}),s.items=[]}e.at.ResourceBlock.patchProperties.resource=e.which.resource,e.at.ResourceBlock.mining_drill&&(e.at.ResourceBlock.patchProperties.mining_time=t.data.resource[e.which.resource].mining_time/t.data.entity[e.at.ResourceBlock.mining_drill].mining_speed*t.getStatic("config.TICKS_PER_SECOND"),e.at.ResourceBlock.mining_ticks=e.at.ResourceBlock.patchProperties.mining_time)},u.SetResource.signature={at:"ResourceBlock",which:"resource"},u.SetResource.CC_provide="resBlock.setResource",u.PrepSpace=function(e,t){t.processTEMP(e.player.inventory,"inventory.consume",{itemStacks:t.getStatic("itemStackCost.resBlock_foundation")})?(e.at.ResourceBlock.prepped++,e.at.ResourceBlock.spaceUsed+=10,e.at.ResourceBlock.complexity+=5):console.error("unable to consume foundation costs")},u.PrepSpace.signature={at:"ResourceBlock",player:"inventory"},u.PrepSpace.CC_provide="resBlock.prepSpace",u.BuildMine=function(e,t){0!=e.at.ResourceBlock.prepped&&t.processTEMP(e.player.inventory,"inventory.consume",{itemStacks:t.getStatic("itemStackCost.resBlock_miner")})&&(e.at.ResourceBlock.prepped--,e.at.ResourceBlock.built++,t.getId(e.at.ResourceBlock.output).stackSize+=5)},u.BuildMine.signature={at:"ResourceBlock",player:"inventory"},u.BuildMine.CC_provide="resBlock.buildMine",u.__foundationCost=function(e,t,o,s){var r=s.getId(e),n=[{name:"stone",count:5}];n.push({name:"transport-belt",count:Math.floor(r.spaceUsed/10)}),o._result={tool:"stackArray",tip:"Foundation Cost",data:n}},u.__foundationCost.CC_utility="resBlock.__foundationCost",u.__minerCost=function(e,t,o,s){var r=[{name:s.getId(e).mining_drill,count:1}];o._result={tool:"stackArray",tip:"Foundation Cost",data:r}},u.__minerCost.CC_utility="resBlock.__minerCost",u.tick=function(e,t,o){if(0!=e.built&&e.patchProperties.mining_time)if(0==e.mining_ticks){o.processTEMP(e.output,"inventory.add",{itemStacks:{name:e.patchProperties.resource,count:e.storedResources||e.built}});e.mining_ticks=e.patchProperties.mining_time}else e.mining_ticks--},s.a.defineObj("ResourceBlock",u.New,u);var f={land:{total:100,used:0,complexity:0,res_patches:1,res_patches_used:0,fac_block_costs:{factory:100,bus:100,research:100}},scanning:{nextCost:100,currentCost:0},attackWaves:{nextTimer:100,nextStrength:100,currentTimer:0},facBlocks:{defenses:null,defenseBus:null,offense:null,offenseBus:null,resBlocks:[],buses:[],blocks:[],techBlocks:[]},player:n.a,activeFeatures:{tutorial:!0},research:{completed:{},progressing:null},unlocked_recipes:[],version:r.a};s.a.defineObj("#",f)}}]);
//# sourceMappingURL=app~fa1e48bf.644ea23bdbe2eb4b1fce.bundle.map