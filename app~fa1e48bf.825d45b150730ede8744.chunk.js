(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{iVgR:function(e,t,s){"use strict";var o=s("7jDb"),r=s("463H"),c=s("Kh/G");s("iVpH"),s("uH5N");o.a.setStatic("itemStackCost.busExpansion",[{name:"iron-chest",count:2}]),o.a.setStatic("itemStackCost.busProcessing",[{name:"inserter",count:2}]),o.a.setStatic("itemStackCost.resBlock_foundation",[{name:"stone",count:5},{name:"transport-belt",count:4}]),o.a.setStatic("itemStackCost.resBlock_miner",[{name:"burner-mining-drill",count:1}]);var n={New:function(e,t,s){var o=s.getNamedObject("global").activeFeatures.factoryBlocks;t.name=e.name.string,t.size=50,t.complexity=10,t.connections={sources:[],drains:[],maxSources:o.blocksMaxSources||1,maxDrains:o.blocksMaxDrains||1};var r={restrictable:!0,stacks:1,stackSize:5};return t.buffers={},t.buffers.in=s.newComponent("entity.buffer",r,t),t.buffers.internal=s.newComponent("entity.buffer",r,t),t.buffers.out=s.newComponent("entity.buffer",r,t),t.processingList={},t.subIcon="stone",t.factoryLines=[],t.factoryLines.push(s.newComponent("FactoryLine",{source:t.buffers.in,drain:t.buffers.out,internal:t.buffers.internal,parent:t.$_id,order:t.factoryLines.length})),t.$_tags.push("tick","processing"),[t]}};n.New.signature={},n.New._signal="generalUpdate",n.NewCCC=function(e,t){t.addNewObject(t.getNamedObject("global").facBlocks.blocks,"FactoryBlock",e)},n.NewCCC.signature={name:"string"},n.NewCCC.CC_provide="facBlock.newBlock",n.NewBusCCC=function(e,t){t.addNewObject(t.getNamedObject("global").facBlocks.buses,"FactoryBus",e)},n.NewBusCCC.signature={name:"string"},n.NewBusCCC.CC_provide="facBlock.newBus",n.NewResBlock=function(e,t){t.addNewObject(t.getNamedObject("global").facBlocks.resBlocks,"ResourceBlock",e)&&t.getNamedObject("global").land.res_patches_used++},n.NewResBlock.signature={name:"string"},n.NewResBlock.CC_provide="facBlock.newResBlock",n.NewTechBlock=function(e,t){t.addNewObject(t.getNamedObject("global").facBlocks.techBlocks,"TechBlock",e)},n.NewTechBlock.signature={name:"string"},n.NewTechBlock.CC_provide="facBlock.newTechBlock",n.__tooltips=function(e,t,s,o){o.getId(e);var r=[],c="",n="blockCosts";switch(t.which){case"resBlock":r.landCost="resource",r.complexity=5,c="Next ResourceBlock";break;case"techBlock":r.landCost=50,r.complexity=5,c="Next Tech Block";break;case"busLine":r.landCost=25,r.complexity=5,c="Next Bus Line";break;case"factoryBlock":r.landCost=50,r.complexity=10,c="Next Factory Block";break;case"addLine":r.landCost="??",r.complexity="??",c="New Factory Line";break;case"bufferUpgrade":r=[{name:"iron-chest",count:1}],c="Buffer Upgrade",n="stackArray"}s._result={tool:n,tip:c,data:r}},n.__tooltips.CC_utility="facBlock.__tooltips",n.tick=function(e,t,s){e.connections.drains},n.tick.signature={},n.SelectSubIcon=function(e,t,s){e.at.factoryBlock.subIcon=e.which.icon},n.SelectSubIcon.signature={at:"factoryBlock",which:"icon"},n.SelectSubIcon.CC_provide="factoryBlock.selectSubIcon",n.ConsumeStacks=function(e,t,s,o){var r=t.itemStacks.reduce((function(t,s){if(-1==t)return-1;e.processingList[s.name];var r=o.processTEMP(o.getId(e.processingList[s.name].at).items,"inventory.total",{name:s.name});return r<s.amount?-1:Math.min(t,Math.floor(r/s.amount))}),t.multi);r>=1&&t.itemStacks.forEach((function(t){o.processTEMP(o.getId(e.processingList[t.name].at),"inventory.consume",{itemStacks:t,multi:r})})),s._result=r},n.ConsumeStacks.signature={},n.ConsumeStacks.Igor_operation="factoryBlock.consumeStacks",n.ProduceStacks=function(e,t,s,o){var r=t.itemStacks.reduce((function(t,s){if(-1==t)return-1;var r=o.getId(e.processingList[s.name].at),c=r.stackSize-o.processTEMP(r.items,"inventory.total",{name:s.name});return c<s.amount?-1:Math.min(t,Math.floor(c/s.amount))}),t.multi);r>=1&&t.itemStacks.forEach((function(t){o.processTEMP(o.getId(e.processingList[t.name].at),"inventory.add",{itemStacks:t,multi:r})})),s._result=r},n.ProduceStacks.signature={},n.ProduceStacks.Igor_operation="factoryBlock.produceStacks",n.SetConnection=function(e,t){var s="source"==e.dir.string?"Drain":"Source";e.at.factoryBlock.connections[e.dir.string+"s"]!=e.to_which.factoryBus?(t.processTEMP(e.to_which.factoryBus,"factoryBus.add"+s,{who:e.at.factoryBlock.$_id})&&(e.at.factoryBlock.connections[e.dir.string+"s"]=e.to_which.factoryBus),t.processTEMP(e.to_which.factoryBus,"factoryBus.connectTo",{})):t.processTEMP(e.to_which.factoryBus,"factoryBus.clear"+s,{who:e.at.factoryBlock.$_id})},n.SetConnection.signature={at:"factoryBlock",to_which:"factoryBus",dir:"string"},n.SetConnection.CC_provide="factoryBlock.setConnection",n.AddFactoryLine=function(e,t){e.at.factoryBlock.factoryLines.push(t.newComponent("FactoryLine",{source:e.at.factoryBlock.buffers.in,drain:e.at.factoryBlock.buffers.out,internal:e.at.factoryBlock.buffers.internal,parent:e.at.factoryBlock.$_id,order:e.at.factoryBlock.factoryLines.length||0})),t.view.signaler.signal("generalUpdate")},n.AddFactoryLine.signature={at:"factoryBlock"},n.AddFactoryLine.CC_provide="factoryBlock.addLine",n.SetProcessItems=function(e,t,s,o){console.log("set process"),t.lists.consume.forEach((function(s){e.processingList[s]?e.processingList[s].at==e.buffers.out&&(e.processingList[s].at=e.buffers.internal,e.processingList[s].consume=[]):e.processingList[s]={at:e.buffers.in,consume:[]},e.processingList[s].consume.push(t.listId)})),t.lists.produce.forEach((function(s){e.processingList[s]?e.processingList[s].at==e.buffers.in&&(e.processingList[s].at=e.buffers.internal,e.processingList[s].produce=[]):e.processingList[s]={at:e.buffers.out,produce:[]},e.processingList[s].produce.push(t.listId)})),o.processTEMP(e.buffers.in,"buffer.restrictList",{list:Object.keys(e.processingList).filter((function(t){return e.processingList[t].at==e.buffers.in}))}),o.processTEMP(e.buffers.internal,"buffer.restrictList",{list:Object.keys(e.processingList).filter((function(t){return e.processingList[t].at==e.buffers.internal}))}),o.processTEMP(e.buffers.out,"buffer.restrictList",{list:Object.keys(e.processingList).filter((function(t){return e.processingList[t].at==e.buffers.out}))})},n.SetProcessItems.Igor_operation="factoryBlock.setProcessItems",n.ClearProcessItems=function(e,t,s,o){t.lists.consume.forEach((function(s){var o,r=e.processingList[s];(r.consume.splice(r.consume.indexOf(t.listId),1),0==r.consume.length)&&(r.at==e.buffers.internal&&(null==(o=r.produce)?void 0:o.length)>0?r.at=e.buffers.out:delete e.processingList[s])})),t.lists.produce.forEach((function(s){var o,r=e.processingList[s];(r.produce.splice(r.produce.indexOf(t.listId),1),0==r.produce.length)&&(r.at==e.buffers.internal&&(null==(o=r.consume)?void 0:o.length)>0?r.at=e.buffers.in:delete e.processingList[s])})),o.processTEMP(e.buffers.in,"buffer.restrictList",{list:Object.keys(e.processingList).filter((function(t){return e.processingList[t].at==e.buffers.in}))}),o.processTEMP(e.buffers.internal,"buffer.restrictList",{list:Object.keys(e.processingList).filter((function(t){return e.processingList[t].at==e.buffers.internal}))}),o.processTEMP(e.buffers.out,"buffer.restrictList",{list:Object.keys(e.processingList).filter((function(t){return e.processingList[t].at==e.buffers.out}))})},n.ClearProcessItems.Igor_operation="factoryBlock.clearProcessItems",o.a.defineObj("FactoryBlock",n.New,n);var i={New:function(e,t,s){return t.prepped=0,t.built=0,t.buildingType=null,t.recipe=null,t.itemTargets=null,t.processing_time=-1,t.processing_count=0,t.connections={source:e.source,drain:e.drain,internal:e.internal},t.order=e.order,t.$_parent=e.parent,[t]}};i.New.signature={source:"entity.buffer",drain:"entity.buffer",internal:"entity.buffer"},i.New._signal="generalUpdate",i.__delete=function(e,t){e.$_tags.delete("tick"),e.recipe&&t.processTEMP(e.$_parent,"factoryBlock.clearProcessItems",{lists:e.processList}),e.buildingType&&t.processTEMP("player.inventory","inventory.add",{itemStacks:{name:e.buildingType,count:e.built}});var s=t.processTEMP(e,"factoryLine.toolTips",{which:"foundation"});e.built+e.prepped&&t.processTEMP("player.inventory","inventory.add",{itemStacks:s.data,multi:e.built+e.prepped}),e.processing_count&&t.processTEMP("player.inventory","inventory.add",{itemStacks:e.recipe.ingredients,multi:e.processing_count});var o=t.getId(e.$_parent),r=o.factoryLines.indexOf(e.$_id);o.factoryLines.splice(r,1),o.factoryLines.forEach((function(e,s){t.getId(e).order<r||t.getId(e).order--})),t.view.signaler.signal("generalUpdate")},i.__delete.Igor_operation="FactoryLine.delete",i.SetType=function(e,t){e.at.factoryLine.buildingType=e.which.building.name,e.at.factoryLine.crafting_categories=e.which.building.crafting_categories,e.at.factoryLine.foundationCost=[{name:"stone",count:5}]},i.SetType.signature={at:["factoryLine","factoryBlock"],which:"building"},i.SetType.CC_provide="factoryLine.setBuilding",i.Prep=function(e,t){e.at.factoryLine.foundationCost&&(t.processTEMP(e.player.inventory,"inventory.consume",{itemStacks:e.at.factoryLine.foundationCost})?(e.at.factoryLine.prepped++,e.at.factoryBlock.size+=10,e.at.factoryBlock.complexity+=5):t.view.warnToast("Cannot consume foundation costs"))},i.Prep.signature={at:["factoryLine","factoryBlock"],player:"inventory"},i.Prep.CC_provide="factoryLine.prep",i.Expand=function(e,t){if(0!=e.at.factoryLine.prepped)if(t.processTEMP(e.player.inventory,"inventory.consume",{itemStacks:{name:e.at.factoryLine.buildingType,count:1}})){if(e.at.factoryLine.built++,e.at.factoryLine.prepped--,e.at.factoryLine.recipe){if(Number.isInteger(e.at.factoryLine.processing_ticks))t.processTEMP(e.at.factoryBlock,"factoryBlock.consumeStacks",{itemStacks:e.at.factoryLine.recipe.ingredients,multi:1})&&(e.at.factoryLine.processing_ticks*=(e.at.factoryLine.built-1)/e.at.factoryLine.built,e.at.factoryLine.processing_count++);e.at.factoryLine.$_tags.push("tick","processing")}}else t.view.warnToast("Building not in inventory")},i.Expand.signature={at:["factoryLine","factoryBlock"],player:"inventory"},i.Expand.CC_provide="factoryLine.addBuilding",i.SetRecipe=function(e,t){if(e.at.factoryLine.recipe&&(t.processTEMP(e.at.factoryBlock,"factoryBlock.clearProcessItems",{lists:e.at.factoryLine.processList}),e.at.factoryLine.recipe==e.which.recipe))return e.at.factoryLine.recipe=null,void e.at.factoryLine.$_tags.delete("tick");var s=t.data.recipe[e.which.recipe],o={consume:s.ingredients.map((function(e){return e.name})),produce:s.results.map((function(e){return e.name}))};t.processTEMP(e.at.factoryBlock,"factoryBlock.setProcessItems",{lists:o,listId:e.at.factoryLine.$_id})?(e.at.factoryLine.processList=o,e.at.factoryLine.recipe=s,e.at.factoryLine.processing_time=s.crafting_speed/t.data.entity[e.at.factoryLine.buildingType].crafting_speed*t.getStatic("config.TICKS_PER_SECOND"),e.at.factoryLine.processing_ticks=NaN,e.at.factoryLine.built&&e.at.factoryLine.$_tags.push("tick","processing")):console.error("Couldn't set my items on the parent factoryBlock")},i.SetRecipe.signature={at:["factoryLine","factoryBlock"],which:"recipe",player:"inventory"},i.SetRecipe.CC_provide="factoryLine.setRecipe",i.__tooltips=function(e,t,s,o){o.getId(e);var r=[],c="";switch(t.which){case"foundation":r.push({name:"stone",count:5}),c="Foundation Cost"}s._result={tool:"stackArray",tip:c,data:r}},i.__tooltips.Igor_operation="factoryLine.toolTips",i.__tooltips.CC_utility="factoryLine.toolTips",i.tick=function(e,t,s){if(0!=e.built&&e.processing_time&&e.recipe)if(Number.isNaN(e.processing_ticks)||null==e.processing_ticks){var o=s.processTEMP(e.$_parent,"factoryBlock.consumeStacks",{itemStacks:e.recipe.ingredients,multi:e.built});o>0?(e.processing_count=o,e.processing_ticks=e.processing_time,e.stalled=!1):(e.processing_ticks=Math.ceil(.1*e.processing_time),e.stalled=!0)}else if(e.processing_ticks&&e.processing_ticks--,0===e.processing_ticks)if(e.processing_count){var r=s.processTEMP(e.$_parent,"factoryBlock.produceStacks",{itemStacks:e.recipe.results,multi:e.processing_count});r==e.processing_count?(e.processing_ticks=NaN,e.processing_count=0):(e.processing_ticks=Math.ceil(.1*e.processing_time),e.stalled=!0,r>0&&(e.processing_count=r))}else e.processing_ticks=NaN},o.a.defineObj("FactoryLine",i.New,i);var a={New:function(e,t,s){return t.name=e.name.string,t.size=25,t.complexity=5,t.connections={sources:[],drains:[],maxSources:0,maxDrains:0},t.processors={source:{xferTicks:120,xferTimer:0,xferTarget:0,xferQty:0},drain:{xferTicks:120,xferTimer:0,xferTarget:0,xferQty:0},central:s.newComponent("entity.buffer",{stacks:1,stackSize:5},t.$_id)},t.clogged=!1,t.subIcon="stone",[t]}};a.New._signal="generalUpdate",a.SelectSubIcon=function(e,t,s){e.at.factoryBus.subIcon=e.which.icon},a.SelectSubIcon.signature={at:"factoryBus",which:"icon"},a.SelectSubIcon.CC_provide="factoryBus.selectSubIcon",a.DialogSelect=function(e,t){var s=t.getNamedObject("global"),o=[];s.facBlocks.buses.forEach((function(e){var s=t.getId(e);o.push({name:s.name,icon:s.subIcon,id:e})}));var r={list:o,type:"bus",custom:{}};return e.showSpecials&&s.facBlocks.defenseBus&&(r.custom.showDefense=!0),e.showSpecials&&s.facBlocks.offenseBus&&(r.custom.showOffense=!0),e.showSpecials&&s.facBlocks.market&&(r.custom.showMarket=!0),r},a.DialogSelect.CC_dialogList="factoryBus",a.ClearConnection=function(e,t,s,o){var r="sources"==t.dir?"drains":"sources",c=e.connections[r].findIndex((function(e){return e.buffer==t.id}));-1==c&&console.log("couldn't find index"),e.connections[r].splice(c,1),e.processors[r].xferTarget=0},a.ClearConnection.Igor_operation="factoryBus.clearConnection",a.ConnectTo=function(e,t){var s=t.getId(e.connectTo.factoryBus),o=t.getId(e.connectTo.block);if("output"==e.dir.string){if(s.connections.sources.length==s.connections.maxSources)return t.view.warnToast("No available drains at target bus");if(-1!=e.current.bus&&o.connections.drains.includes(e.current.bus)){var r=o.connections.drains.indexOf(e.current.bus);o.connections.drains.splice(r,1);var c=t.getId(e.current.bus);r=c.connections.sources.indexOf(o.$_id),c.connections.sources.splice(r,1),c.processors.source.xferTarget=0}o.connections.drains.push(e.connectTo.factoryBus),s.connections.sources.push(e.connectTo.block)}else{if(s.connections.drains.length==s.connections.maxDrains)return t.view.warnToast("No available drains at target bus");if(-1!=e.current.bus&&o.connections.sources.includes(e.current.bus)){var n=o.connections.sources.indexOf(e.current.bus);o.connections.sources.splice(n,1);var i=t.getId(e.current.bus);n=i.connections.drains.indexOf(o.$_id),i.connections.drains.splice(n,1),i.processors.drain.xferTarget=0}o.connections.sources.push(e.connectTo.factoryBus),s.connections.drains.push(e.connectTo.block)}t.view.signaler.signal("generalUpdate")},a.ConnectTo.signature={dir:"string",connectTo:["factoryBus","block"],current:"bus"},a.ConnectTo.CC_provide="factoryBus.connectTo",a.ExpandBus=function(e,t){if(!t.processTEMP(e.player.inventory,"inventory.consume",{itemStacks:t.getStatic("itemStackCost.busExpansion")}))return t.view.warnToast("Unable to consume costs to expand bus");"source"==e.dir.string?(e.at.factoryBus.connections.maxSources+=1,e.at.factoryBus.complexity+=5,e.at.factoryBus.size+=10):"drain"==e.dir.string&&(e.at.factoryBus.connections.maxDrains+=1,e.at.factoryBus.size+=10,e.at.factoryBus.complexity+=5),e.at.factoryBus.connections.maxSources&&e.at.factoryBus.connections.maxDrains&&e.at.factoryBus.$_tags.push("tick","processing"),t.getId(e.at.factoryBus.processors.central).maxStacks=Math.min(Math.ceil(e.at.factoryBus.size/50),15)},a.ExpandBus.signature={at:"factoryBus",dir:"string",player:"inventory"},a.ExpandBus.CC_provide="factoryBus.expandBus",a.ExpandProcessing=function(e,t){if(!t.processTEMP(e.player.inventory,"inventory.consume",{itemStacks:t.getStatic("itemStackCost.busProcessing")}))return t.view.warnToast("Unable to consume costs to expand bus");"source"==e.dir.string?(e.at.factoryBus.processors.source.xferQty+=2,e.at.factoryBus.size+=10,e.at.factoryBus.complexity+=5):"drain"==e.dir.string&&(e.at.factoryBus.processors.drain.xferQty+=2,e.at.factoryBus.size+=10,e.at.factoryBus.complexity+=5)},a.ExpandProcessing.signature={at:"factoryBus",dir:"string",player:"inventory"},a.ExpandProcessing.CC_provide="factoryBus.expandProcessing",a.__tooltips=function(e,t,s,o){if(e){var r=o.getId(e),c=[],n="";switch(t.which){case"input_processing":c.push({name:"inserter",count:2}),n="Input Processing";break;case"expand_input_sources":c.push({name:"iron-chest",count:2}),r.connections.maxSources&&c.push({name:"transport-belt",count:5*r.connections.maxSources}),n="Expand Source Points";break;case"output_processing":c.push({name:"inserter",count:2}),n="Output Processing";break;case"expand_output_drains":c.push({name:"iron-chest",count:2}),r.connections.maxDrains&&c.push({name:"transport-belt",count:5*r.connections.maxDrains}),n="Expand Drain Points"}s._result={tool:"stackArray",tip:n,data:c}}},a.__tooltips.CC_utility="busLine_Costs",a.ClearClog=function(e,t){t.getId(e.at.factoryBus.processors.central).items.forEach((function(e){t.processTEMP("player.inventory","inventory.add",{itemStacks:e}),e.count=0,e.icon=void 0})),e.at.factoryBus.clogged=!1},a.ClearClog.signature={at:"factoryBus"},a.ClearClog.CC_provide="factoryBus.clearClog",a.tick=function(e,t,s){var o,r;e.connections.sources.length>0&&(null==(o=e.processors.source)?void 0:o.xferQty)>0&&(e.processors.source.xferTimer>=e.processors.source.xferTicks?(s.processTEMP(s.getId(e.connections.sources[e.processors.source.xferTarget],"buffers.out"),"buffer.busXfer",{xferCount:e.processors.source.xferQty,toBus:e.processors.central}).full&&(e.clogged=!0),++e.processors.source.xferTarget==e.connections.sources.length&&(e.processors.source.xferTarget=0),e.processors.source.xferTimer=0):e.processors.source.xferTimer++);e.connections.drains.length>0&&(null==(r=e.processors.drain)?void 0:r.xferQty)>0&&(e.processors.drain.xferTimer>=e.processors.drain.xferTicks?(s.processTEMP(s.getId(e.connections.drains[e.processors.drain.xferTarget],"buffers.in"),"buffer.busXfer",{xferCount:e.processors.drain.xferQty,fromBus:e.processors.central}).full,++e.processors.drain.xferTarget==e.connections.drains.length&&(e.processors.drain.xferTarget=0),e.processors.drain.xferTimer=0):e.processors.drain.xferTimer++)},o.a.defineObj("FactoryBus",a.New,a);var u={New:function(e,t,s){return t.name=e.name.string,t.patchProperties={},t.spaceUsed=50,t.complexity=1,t.connections={drains:[],maxDrains:1},t.prepped=0,t.built=0,t.mining_ticks=NaN,t.mining_drill="burner-mining-drill",t.buffers={},t.buffers.out=s.newComponent("entity.buffer",{restrictable:!0,stacks:1,stackSize:0,dir:"out"},t),[t]}};u.New._signal="generalUpdate",u.SetResource=function(e,t){var s=e.at.ResourceBlock;if(e.at.ResourceBlock.patchProperties.resource){var o=t.getId(s.buffers.out);t.processTEMP(t.getNamedObject("player.inventory"),"inventory.add",{itemStacks:o.items}),o.items=[]}e.at.ResourceBlock.$_tags.push("tick","processing"),e.at.ResourceBlock.patchProperties.resource=e.which.resource,e.at.ResourceBlock.mining_drill&&(e.at.ResourceBlock.patchProperties.mining_time=t.data.resource[e.which.resource].mining_time/t.data.entity[e.at.ResourceBlock.mining_drill].mining_speed*t.getStatic("config.TICKS_PER_SECOND"),e.at.ResourceBlock.mining_ticks=e.at.ResourceBlock.patchProperties.mining_time,e.at.ResourceBlock.subIcon=e.at.ResourceBlock.patchProperties.resource),t.processTEMP(e.at.ResourceBlock.buffers.out,"buffer.restrictList",{list:[e.at.ResourceBlock.patchProperties.resource]})},u.SetResource.signature={at:"ResourceBlock",which:"resource"},u.SetResource.CC_provide="resBlock.setResource",u.PrepSpace=function(e,t){t.processTEMP(e.player.inventory,"inventory.consume",{itemStacks:t.getStatic("itemStackCost.resBlock_foundation")})?(e.at.ResourceBlock.prepped++,e.at.ResourceBlock.spaceUsed+=10,e.at.ResourceBlock.complexity+=5):t.view.warnToast("Unable to consume foundation costs")},u.PrepSpace.signature={at:"ResourceBlock",player:"inventory"},u.PrepSpace.CC_provide="resBlock.prepSpace",u.BuildMine=function(e,t){if(0!=e.at.ResourceBlock.prepped)return t.processTEMP(e.player.inventory,"inventory.consume",{itemStacks:t.getStatic("itemStackCost.resBlock_miner")})?(e.at.ResourceBlock.prepped--,e.at.ResourceBlock.built++,void(t.getId(e.at.ResourceBlock.buffers.out).stackSize+=5)):t.view.warnToast("Mining drill not available")},u.BuildMine.signature={at:"ResourceBlock",player:"inventory"},u.BuildMine.CC_provide="resBlock.buildMine",u.__foundationCost=function(e,t,s,o){var r=o.getId(e),c=[{name:"stone",count:5}];c.push({name:"transport-belt",count:Math.floor(r.spaceUsed/10)}),s._result={tool:"stackArray",tip:"Foundation Cost",data:c}},u.__foundationCost.CC_utility="resBlock.__foundationCost",u.__minerCost=function(e,t,s,o){var r=[{name:o.getId(e).mining_drill,count:1}];s._result={tool:"stackArray",tip:"Foundation Cost",data:r}},u.__minerCost.CC_utility="resBlock.__minerCost",u.tick=function(e,t,s){if(0!=e.built&&e.patchProperties.mining_time)if(0==e.mining_ticks){s.processTEMP(e.buffers.out,"inventory.add",{itemStacks:{name:e.patchProperties.resource,count:e.storedResources||e.built}});e.mining_ticks=e.patchProperties.mining_time}else e.mining_ticks--},o.a.defineObj("ResourceBlock",u.New,u);var l={New:function(e,t,s){return t.name=e.name.string,t.spaceUsed=50,t.complexity=10,t.prepped=0,t.built=0,t.connections={sources:[],maxSources:1},t.buffers={},t.buffers.in=s.newComponent("entity.buffer",{restrictable:!0,stackSize:10,maxStack:2,dir:"in"},t.$_id),t.techTreeClass="main",t.subIcon="automation-science-pack",t.research_speed=1,t.research_ticks=NaN,t.research_time=0,t.buildingType="lab",t.foundationType="",[t]}};l.New._signal="generalUpdate",l.prepSpace=function(e,t){t.processTEMP("player.inventory","inventory.consume",{itemStacks:t.processTEMP(e.at.techBlock,"techBlock.toolTips",{which:"foundation"}).data})?(e.at.techBlock.prepped++,e.at.techBlock.spaceUsed+=10,e.at.techBlock.complexity+=5):t.view.warnToast("Not enough materials for foundation")},l.prepSpace.signature={at:"techBlock"},l.prepSpace.CC_provide="techBlock.prepSpace",l.BuildTech=function(e,t){0!=e.at.techBlock.prepped&&(t.processTEMP("player.inventory","inventory.consume",{itemStacks:t.processTEMP(e.at.techBlock,"techBlock.toolTips",{which:"buildLab"}).data})?(e.at.techBlock.prepped--,e.at.techBlock.built++,t.getId(e.at.techBlock.buffers.in).stackSize+=5):t.view.warnToast("Not enough materials to build lab"),e.at.techBlock.bufferSet||(t.processTEMP(e.at.techBlock.buffers.in,"buffer.restrictList",{list:["automation-science-pack","logistic-science-pack"]}),e.at.techBlock.bufferSet=!0),e.at.techBlock.$_tags.push("tick","processing"))},l.BuildTech.signature={at:"techBlock"},l.BuildTech.CC_provide="techBlock.buildLab",l.SetTree=function(e,t){t.view.errorToast("Not Yet Implemented")},l.SetTree.signature={at:"techBlock"},l.SetTree.CC_provide="techBlock.setTree",l.__tooltips=function(e,t,s,o){o.getId(e);var r=[],c="";switch(t.which){case"foundation":r.push({name:"inserter",count:2}),r.push({name:"stone",count:5}),c="Lab foundation";break;case"buildLab":r.push({name:"lab",count:1}),c="Lab building"}s._result={tool:"stackArray",tip:c,data:r}},l.__tooltips.Igor_operation="techBlock.toolTips",l.__tooltips.CC_utility="techBlock.toolTips",l.tick=function(e,t,s){var o=s.getNamedObject("research").progressing;if(o)if(Number.isNaN(e.research_ticks)||null===e.research_ticks){var r=o.cost.ingredients.map((function(e){return{name:e[0],count:e[1]}})),c=s.processTEMP(e.buffers.in,"inventory.consume",{itemStacks:r,multi:e.built});if(e.research_time=o.cost.time*s.getStatic("config.TICKS_PER_SECOND")*e.research_speed,!c)return e.research_consumed=0,e.research_ticks=.1*e.research_time,void(e.stalled=!0);e.stalled=!1,e.research_ticks=e.research_time,e.research_consumed=c}else if(e.research_ticks)--e.research_ticks;else if(e.research_ticks<=0){if(e.research_consumed){var n=s.processTEMP(o,"research.update",{count:e.research_consumed,me:e.$_id}),i=o.cost.ingredients.map((function(e){return{name:e[0],count:e[1]}}));s.processTEMP(e.buffers.in,"inventory.add",{itemStacks:i,force:!0,multi:n})}e.research_ticks=NaN}},o.a.defineObj("TechBlock",l.New,l);var p={land:{total:100,used:0,complexity:0,res_patches:1,res_patches_used:0,fac_block_costs:{factory:100,bus:100,research:100}},scanning:{nextCost:100,currentCost:0},attackWaves:{nextTimer:100,nextStrength:100,currentTimer:0},facBlocks:{defenses:null,defenseBus:null,offense:null,offenseBus:null,resBlocks:[],buses:[],blocks:[],techBlocks:[]},player:c.a,activeFeatures:{tutorial:!0},research:{completed:{},progressing:null},unlocked_recipes:[],version:r.a};o.a.defineObj("#",p)}}]);
//# sourceMappingURL=app~fa1e48bf.825d45b150730ede8744.bundle.map