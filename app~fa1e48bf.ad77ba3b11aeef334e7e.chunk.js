(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{iVgR:function(e,t,o){"use strict";o.d(t,"a",(function(){return p}));var s=o("7jDb"),r=o("463H"),c=o("Kh/G");o("iVpH"),o("uH5N");s.a.setStatic("itemStackCost.busExpansion",[{name:"iron-chest",count:2}]),s.a.setStatic("itemStackCost.busProcessing",[{name:"inserter",count:2}]),s.a.setStatic("itemStackCost.resBlock_foundation",[{name:"stone",count:5},{name:"transport-belt",count:4}]),s.a.setStatic("itemStackCost.resBlock_miner",[{name:"burner-mining-drill",count:1}]);var n={New:function(e,t,o){var s=o.getNamedObject("global").activeFeatures.factoryBlocks;t.name=e.name.string,t.size=50,t.complexity=10,t.connections={sources:[],drains:[],maxSources:s.blocksMaxSources||1,maxDrains:s.blocksMaxDrains||1};var r={restrictable:!0,stacks:1,stackSize:5};return t.buffers={},t.buffers.in=o.newComponent("entity.buffer",r,t),t.buffers.internal=o.newComponent("entity.buffer",r,t),t.buffers.out=o.newComponent("entity.buffer",r,t),t.processingList={},t.subIcon="stone",t.factoryLines=[],t.factoryLines.push(o.newComponent("FactoryLine",{source:t.buffers.in,drain:t.buffers.out,internal:t.buffers.internal,parent:t.$_id,order:t.factoryLines.length})),t.$_tags.push("tick","processing"),[t]}};n.New.signature={},n.New._signal="generalUpdate",n.NewCCC=function(e,t){t.addNewObject(t.getNamedObject("global").facBlocks.blocks,"FactoryBlock",e)},n.NewCCC.signature={name:"string"},n.NewCCC.CC_provide="facBlock.newBlock",n.NewBusCCC=function(e,t){t.addNewObject(t.getNamedObject("global").facBlocks.buses,"FactoryBus",e)},n.NewBusCCC.signature={name:"string"},n.NewBusCCC.CC_provide="facBlock.newBus",n.NewResBlock=function(e,t){t.addNewObject(t.getNamedObject("global").facBlocks.resBlocks,"ResourceBlock",e)&&t.getNamedObject("global").land.res_patches_used++},n.NewResBlock.signature={name:"string"},n.NewResBlock.CC_provide="facBlock.newResBlock",n.NewTechBlock=function(e,t){t.addNewObject(t.getNamedObject("global").facBlocks.techBlocks,"TechBlock",e)},n.NewTechBlock.signature={name:"string"},n.NewTechBlock.CC_provide="facBlock.newTechBlock",n.__tooltips=function(e,t,o,s){s.getId(e);var r=[],c="",n="blockCosts";switch(t.which){case"resBlock":r.landCost="resource",r.complexity=5,c="Next ResourceBlock";break;case"techBlock":r.landCost=50,r.complexity=5,c="Next Tech Block";break;case"busLine":r.landCost=25,r.complexity=5,c="Next Bus Line";break;case"factoryBlock":r.landCost=50,r.complexity=10,c="Next Factory Block";break;case"addLine":r.landCost="??",r.complexity="??",c="New Factory Line";break;case"bufferUpgrade":r=[{name:"iron-chest",count:1}],c="Buffer Upgrade",n="stackArray"}o._result={tool:n,tip:c,data:r}},n.__tooltips.CC_utility="facBlock.__tooltips",n.tick=function(e,t,o){e.connections.drains},n.tick.signature={},n.SelectSubIcon=function(e,t,o){e.at.factoryBlock.subIcon=e.which.icon},n.SelectSubIcon.signature={at:"factoryBlock",which:"icon"},n.SelectSubIcon.CC_provide="factoryBlock.selectSubIcon",n.ConsumeStacks=function(e,t,o,s){var r=t.itemStacks.reduce((function(t,o){if(-1==t)return-1;e.processingList[o.name];var r=s.processTEMP(s.getId(e.processingList[o.name].at).items,"inventory.total",{name:o.name});return r<o.amount?-1:Math.min(t,Math.floor(r/o.amount))}),t.multi);r>=1&&t.itemStacks.forEach((function(t){s.processTEMP(s.getId(e.processingList[t.name].at),"inventory.consume",{itemStacks:t,multi:r})})),o._result=r},n.ConsumeStacks.signature={},n.ConsumeStacks.Igor_operation="factoryBlock.consumeStacks",n.ProduceStacks=function(e,t,o,s){var r=t.itemStacks.reduce((function(t,o){if(-1==t)return-1;var r=s.getId(e.processingList[o.name].at),c=r.stackSize-s.processTEMP(r.items,"inventory.total",{name:o.name});return c<o.amount?-1:Math.min(t,Math.floor(c/o.amount))}),t.multi);r>=1&&t.itemStacks.forEach((function(t){s.processTEMP(s.getId(e.processingList[t.name].at),"inventory.add",{itemStacks:t,multi:r})})),o._result=r},n.ProduceStacks.signature={},n.ProduceStacks.Igor_operation="factoryBlock.produceStacks",n.SetConnection=function(e,t){var o="source"==e.dir.string?"Drain":"Source";e.at.factoryBlock.connections[e.dir.string+"s"]!=e.to_which.factoryBus?(t.processTEMP(e.to_which.factoryBus,"factoryBus.add"+o,{who:e.at.factoryBlock.$_id})&&(e.at.factoryBlock.connections[e.dir.string+"s"]=e.to_which.factoryBus),t.processTEMP(e.to_which.factoryBus,"factoryBus.connectTo",{})):t.processTEMP(e.to_which.factoryBus,"factoryBus.clear"+o,{who:e.at.factoryBlock.$_id})},n.SetConnection.signature={at:"factoryBlock",to_which:"factoryBus",dir:"string"},n.SetConnection.CC_provide="factoryBlock.setConnection",n.AddFactoryLine=function(e,t){e.at.factoryBlock.factoryLines.push(t.newComponent("FactoryLine",{source:e.at.factoryBlock.buffers.in,drain:e.at.factoryBlock.buffers.out,internal:e.at.factoryBlock.buffers.internal,parent:e.at.factoryBlock.$_id,order:e.at.factoryBlock.factoryLines.length||0})),t.view.signaler.signal("generalUpdate")},n.AddFactoryLine.signature={at:"factoryBlock"},n.AddFactoryLine.CC_provide="factoryBlock.addLine",n.SetProcessItems=function(e,t,o,s){console.log("set process"),t.lists.consume.forEach((function(o){e.processingList[o]?e.processingList[o].at==e.buffers.out&&(e.processingList[o].at=e.buffers.internal,e.processingList[o].consume=[]):e.processingList[o]={at:e.buffers.in,consume:[]},e.processingList[o].consume.push(t.listId)})),t.lists.produce.forEach((function(o){e.processingList[o]?e.processingList[o].at==e.buffers.in&&(e.processingList[o].at=e.buffers.internal,e.processingList[o].produce=[]):e.processingList[o]={at:e.buffers.out,produce:[]},e.processingList[o].produce.push(t.listId)})),s.processTEMP(e.buffers.in,"buffer.restrictList",{list:Object.keys(e.processingList).filter((function(t){return e.processingList[t].at==e.buffers.in}))}),s.processTEMP(e.buffers.internal,"buffer.restrictList",{list:Object.keys(e.processingList).filter((function(t){return e.processingList[t].at==e.buffers.internal}))}),s.processTEMP(e.buffers.out,"buffer.restrictList",{list:Object.keys(e.processingList).filter((function(t){return e.processingList[t].at==e.buffers.out}))})},n.SetProcessItems.Igor_operation="factoryBlock.setProcessItems",n.ClearProcessItems=function(e,t,o,s){t.lists.consume.forEach((function(o){var s,r=e.processingList[o];(r.consume.splice(r.consume.indexOf(t.listId),1),0==r.consume.length)&&(r.at==e.buffers.internal&&(null==(s=r.produce)?void 0:s.length)>0?r.at=e.buffers.out:delete e.processingList[o])})),t.lists.produce.forEach((function(o){var s,r=e.processingList[o];(r.produce.splice(r.produce.indexOf(t.listId),1),0==r.produce.length)&&(r.at==e.buffers.internal&&(null==(s=r.consume)?void 0:s.length)>0?r.at=e.buffers.in:delete e.processingList[o])})),s.processTEMP(e.buffers.in,"buffer.restrictList",{list:Object.keys(e.processingList).filter((function(t){return e.processingList[t].at==e.buffers.in}))}),s.processTEMP(e.buffers.internal,"buffer.restrictList",{list:Object.keys(e.processingList).filter((function(t){return e.processingList[t].at==e.buffers.internal}))}),s.processTEMP(e.buffers.out,"buffer.restrictList",{list:Object.keys(e.processingList).filter((function(t){return e.processingList[t].at==e.buffers.out}))})},n.ClearProcessItems.Igor_operation="factoryBlock.clearProcessItems",s.a.defineObj("FactoryBlock",n.New,n);var i={New:function(e,t,o){return t.prepped=0,t.built=0,t.buildingType=null,t.recipe=null,t.itemTargets=null,t.processing_time=-1,t.processing_count=0,t.connections={source:e.source,drain:e.drain,internal:e.internal},t.order=e.order,t.$_parent=e.parent,[t]}};i.New.signature={source:"entity.buffer",drain:"entity.buffer",internal:"entity.buffer"},i.New._signal="generalUpdate",i.__delete=function(e,t){e.$_tags.delete("tick"),e.recipe&&t.processTEMP(e.$_parent,"factoryBlock.clearProcessItems",{lists:e.processList}),e.buildingType&&t.processTEMP("player.inventory","inventory.add",{itemStacks:{name:e.buildingType,count:e.built}});var o=t.processTEMP(e,"factoryLine.toolTips",{which:"foundation"});e.built+e.prepped&&t.processTEMP("player.inventory","inventory.add",{itemStacks:o.data,multi:e.built+e.prepped}),e.processing_count&&t.processTEMP("player.inventory","inventory.add",{itemStacks:e.recipe.ingredients,multi:e.processing_count});var s=t.getId(e.$_parent),r=s.factoryLines.indexOf(e.$_id);s.factoryLines.splice(r,1),s.factoryLines.forEach((function(e,o){t.getId(e).order<r||t.getId(e).order--})),t.view.signaler.signal("generalUpdate")},i.__delete.Igor_operation="FactoryLine.delete",i.SetType=function(e,t){e.at.factoryLine.buildingType=e.which.building.name,e.at.factoryLine.crafting_categories=e.which.building.crafting_categories,e.at.factoryLine.foundationCost=[{name:"stone",count:5}]},i.SetType.signature={at:["factoryLine","factoryBlock"],which:"building"},i.SetType.CC_provide="factoryLine.setBuilding",i.Prep=function(e,t){e.at.factoryLine.foundationCost&&(t.processTEMP(e.player.inventory,"inventory.consume",{itemStacks:e.at.factoryLine.foundationCost})?(e.at.factoryLine.prepped++,e.at.factoryBlock.size+=10,e.at.factoryBlock.complexity+=5):t.view.warnToast("Cannot consume foundation costs"))},i.Prep.signature={at:["factoryLine","factoryBlock"],player:"inventory"},i.Prep.CC_provide="factoryLine.prep",i.Expand=function(e,t){if(0!=e.at.factoryLine.prepped)if(t.processTEMP(e.player.inventory,"inventory.consume",{itemStacks:{name:e.at.factoryLine.buildingType,count:1}})){if(e.at.factoryLine.built++,e.at.factoryLine.prepped--,e.at.factoryLine.recipe){if(Number.isInteger(e.at.factoryLine.processing_ticks))t.processTEMP(e.at.factoryBlock,"factoryBlock.consumeStacks",{itemStacks:e.at.factoryLine.recipe.ingredients,multi:1})&&(e.at.factoryLine.processing_ticks*=(e.at.factoryLine.built-1)/e.at.factoryLine.built,e.at.factoryLine.processing_count++);e.at.factoryLine.$_tags.push("tick","processing")}}else t.view.warnToast("Building not in inventory")},i.Expand.signature={at:["factoryLine","factoryBlock"],player:"inventory"},i.Expand.CC_provide="factoryLine.addBuilding",i.SetRecipe=function(e,t){if(e.at.factoryLine.recipe&&(t.processTEMP(e.at.factoryBlock,"factoryBlock.clearProcessItems",{lists:e.at.factoryLine.processList}),e.at.factoryLine.recipe==e.which.recipe))return e.at.factoryLine.recipe=null,void e.at.factoryLine.$_tags.delete("tick");var o=t.data.recipe[e.which.recipe],s={consume:o.ingredients.map((function(e){return e.name})),produce:o.results.map((function(e){return e.name}))};t.processTEMP(e.at.factoryBlock,"factoryBlock.setProcessItems",{lists:s,listId:e.at.factoryLine.$_id})?(e.at.factoryLine.processList=s,e.at.factoryLine.recipe=o,e.at.factoryLine.processing_time=o.crafting_speed/t.data.entity[e.at.factoryLine.buildingType].crafting_speed*t.getStatic("config.TICKS_PER_SECOND"),e.at.factoryLine.processing_ticks=NaN,e.at.factoryLine.built&&e.at.factoryLine.$_tags.push("tick","processing")):console.error("Couldn't set my items on the parent factoryBlock")},i.SetRecipe.signature={at:["factoryLine","factoryBlock"],which:"recipe",player:"inventory"},i.SetRecipe.CC_provide="factoryLine.setRecipe",i.__tooltips=function(e,t,o,s){s.getId(e);var r=[],c="";switch(t.which){case"foundation":r.push({name:"stone",count:5}),c="Foundation Cost"}o._result={tool:"stackArray",tip:c,data:r}},i.__tooltips.Igor_operation="factoryLine.toolTips",i.__tooltips.CC_utility="factoryLine.toolTips",i.tick=function(e,t,o){if(0!=e.built&&e.processing_time&&e.recipe)if(Number.isNaN(e.processing_ticks)||null==e.processing_ticks){var s=o.processTEMP(e.$_parent,"factoryBlock.consumeStacks",{itemStacks:e.recipe.ingredients,multi:e.built});s>0?(e.processing_count=s,e.processing_ticks=e.processing_time,e.stalled=!1):(e.processing_ticks=Math.ceil(.1*e.processing_time),e.stalled=!0)}else if(e.processing_ticks&&e.processing_ticks--,e.processing_ticks<=0)if(e.processing_count){var r=o.processTEMP(e.$_parent,"factoryBlock.produceStacks",{itemStacks:e.recipe.results,multi:e.processing_count});r==e.processing_count?(e.processing_ticks=NaN,e.processing_count=0):(e.processing_ticks=Math.ceil(.1*e.processing_time),e.stalled=!0,r>0&&(e.processing_count=r))}else e.processing_ticks=NaN},s.a.defineObj("FactoryLine",i.New,i);var a={New:function(e,t,o){return t.name=e.name.string,t.size=25,t.complexity=5,t.connections={sources:[],drains:[],maxSources:0,maxDrains:0},t.processors={source:{xferTicks:120,xferTimer:0,xferTarget:0,xferQty:0},drain:{xferTicks:120,xferTimer:0,xferTarget:0,xferQty:0},central:o.newComponent("entity.buffer",{stacks:1,stackSize:5},t.$_id)},t.clogged=!1,t.subIcon="stone",[t]}};a.New._signal="generalUpdate",a.SelectSubIcon=function(e,t,o){e.at.factoryBus.subIcon=e.which.icon},a.SelectSubIcon.signature={at:"factoryBus",which:"icon"},a.SelectSubIcon.CC_provide="factoryBus.selectSubIcon",a.DialogSelect=function(e,t){var o=t.getNamedObject("global"),s=[];o.facBlocks.buses.forEach((function(e){var o=t.getId(e);s.push({name:o.name,icon:o.subIcon,id:e})}));var r={list:s,type:"bus",custom:{}};return e.showSpecials&&o.facBlocks.defenseBus&&(r.custom.showDefense=!0),e.showSpecials&&o.facBlocks.offenseBus&&(r.custom.showOffense=!0),e.showSpecials&&o.facBlocks.market&&(r.custom.showMarket=!0),e.showDisconnect&&(r.custom.showDisconnect=!0),r},a.DialogSelect.CC_dialogList="factoryBus",a.ClearConnection=function(e,t,o,s){var r=e.connections[t.dir+"s"].indexOf(t.id);-1==r&&console.log("couldn't find index"),e.connections[t.dir+"s"].splice(r,1),e.processors[t.dir].xferTarget=0},a.ClearConnection.Igor_operation="factoryBus.clearConnection",a.ConnectTo=function(e,t){var o=t.getId(e.connectTo.factoryBus),s=t.getId(e.connectTo.block);if("@none"==e.connectTo.factoryBus){var r="output"==e.dir.string?"drains":"sources";return t.processTEMP(e.current.bus,"factoryBus.clearConnection",{id:e.connectTo.block,dir:"output"==e.dir.string?"source":"drain"}),void s.connections[r].splice(s.connections[r].indexOf(e.current.bus),1)}if("output"==e.dir.string){if(o.connections.sources.length==o.connections.maxSources)return t.view.warnToast("No available drains at target bus");if(-1!=e.current.bus&&s.connections.drains.includes(e.current.bus)){var c=s.connections.drains.indexOf(e.current.bus);s.connections.drains.splice(c,1);var n=t.getId(e.current.bus);c=n.connections.sources.indexOf(s.$_id),n.connections.sources.splice(c,1),n.processors.source.xferTarget=0}s.connections.drains.push(e.connectTo.factoryBus),o.connections.sources.push(e.connectTo.block)}else{if(o.connections.drains.length==o.connections.maxDrains)return t.view.warnToast("No available drains at target bus");if(-1!=e.current.bus&&s.connections.sources.includes(e.current.bus)){var i=s.connections.sources.indexOf(e.current.bus);s.connections.sources.splice(i,1);var a=t.getId(e.current.bus);i=a.connections.drains.indexOf(s.$_id),a.connections.drains.splice(i,1),a.processors.drain.xferTarget=0}s.connections.sources.push(e.connectTo.factoryBus),o.connections.drains.push(e.connectTo.block)}t.view.signaler.signal("generalUpdate")},a.ConnectTo.signature={dir:"string",connectTo:["factoryBus","block"],current:"bus"},a.ConnectTo.CC_provide="factoryBus.connectTo",a.ExpandBus=function(e,t){if(!t.processTEMP(e.player.inventory,"inventory.consume",{itemStacks:t.getStatic("itemStackCost.busExpansion")}))return t.view.warnToast("Unable to consume costs to expand bus");"source"==e.dir.string?(e.at.factoryBus.connections.maxSources+=1,e.at.factoryBus.complexity+=5,e.at.factoryBus.size+=10):"drain"==e.dir.string&&(e.at.factoryBus.connections.maxDrains+=1,e.at.factoryBus.size+=10,e.at.factoryBus.complexity+=5),e.at.factoryBus.connections.maxSources&&e.at.factoryBus.connections.maxDrains&&e.at.factoryBus.$_tags.push("tick","processing"),t.getId(e.at.factoryBus.processors.central).maxStacks=Math.min(Math.ceil(e.at.factoryBus.size/50),15)},a.ExpandBus.signature={at:"factoryBus",dir:"string",player:"inventory"},a.ExpandBus.CC_provide="factoryBus.expandBus",a.ExpandProcessing=function(e,t){if(!t.processTEMP(e.player.inventory,"inventory.consume",{itemStacks:t.getStatic("itemStackCost.busProcessing")}))return t.view.warnToast("Unable to consume costs to expand bus");"source"==e.dir.string?(e.at.factoryBus.processors.source.xferQty+=2,e.at.factoryBus.size+=10,e.at.factoryBus.complexity+=5):"drain"==e.dir.string&&(e.at.factoryBus.processors.drain.xferQty+=2,e.at.factoryBus.size+=10,e.at.factoryBus.complexity+=5)},a.ExpandProcessing.signature={at:"factoryBus",dir:"string",player:"inventory"},a.ExpandProcessing.CC_provide="factoryBus.expandProcessing",a.__tooltips=function(e,t,o,s){if(e){var r=s.getId(e),c=[],n="";switch(t.which){case"input_processing":c.push({name:"inserter",count:2}),n="Input Processing";break;case"expand_input_sources":c.push({name:"iron-chest",count:2}),r.connections.maxSources&&c.push({name:"transport-belt",count:5*r.connections.maxSources}),n="Expand Source Points";break;case"output_processing":c.push({name:"inserter",count:2}),n="Output Processing";break;case"expand_output_drains":c.push({name:"iron-chest",count:2}),r.connections.maxDrains&&c.push({name:"transport-belt",count:5*r.connections.maxDrains}),n="Expand Drain Points"}o._result={tool:"stackArray",tip:n,data:c}}},a.__tooltips.CC_utility="busLine_Costs",a.ClearClog=function(e,t){t.getId(e.at.factoryBus.processors.central).items.forEach((function(e){t.processTEMP("player.inventory","inventory.add",{itemStacks:e}),e.count=0,e.icon=void 0})),e.at.factoryBus.clogged=!1},a.ClearClog.signature={at:"factoryBus"},a.ClearClog.CC_provide="factoryBus.clearClog",a.tick=function(e,t,o){var s,r;e.connections.sources.length>0&&(null==(s=e.processors.source)?void 0:s.xferQty)>0&&(e.processors.source.xferTimer>=e.processors.source.xferTicks?(o.processTEMP(o.getId(e.connections.sources[e.processors.source.xferTarget],"buffers.out"),"buffer.busXfer",{xferCount:e.processors.source.xferQty,toBus:e.processors.central}).full&&(e.clogged=!0),++e.processors.source.xferTarget==e.connections.sources.length&&(e.processors.source.xferTarget=0),e.processors.source.xferTimer=0):e.processors.source.xferTimer++);e.connections.drains.length>0&&(null==(r=e.processors.drain)?void 0:r.xferQty)>0&&(e.processors.drain.xferTimer>=e.processors.drain.xferTicks?(o.processTEMP(o.getId(e.connections.drains[e.processors.drain.xferTarget],"buffers.in"),"buffer.busXfer",{xferCount:e.processors.drain.xferQty,fromBus:e.processors.central}).full,++e.processors.drain.xferTarget==e.connections.drains.length&&(e.processors.drain.xferTarget=0),e.processors.drain.xferTimer=0):e.processors.drain.xferTimer++)},s.a.defineObj("FactoryBus",a.New,a);var u={New:function(e,t,o){return t.name=e.name.string,t.patchProperties={},t.spaceUsed=50,t.complexity=1,t.connections={drains:[],maxDrains:1},t.prepped=0,t.built=0,t.mining_ticks=NaN,t.mining_drill="burner-mining-drill",t.buffers={},t.buffers.out=o.newComponent("entity.buffer",{restrictable:!0,stacks:1,stackSize:0,dir:"out"},t),[t]}};u.New._signal="generalUpdate",u.SetResource=function(e,t){var o=e.at.ResourceBlock;if(e.at.ResourceBlock.patchProperties.resource){var s=t.getId(o.buffers.out);t.processTEMP(t.getNamedObject("player.inventory"),"inventory.add",{itemStacks:s.items}),s.items=[]}e.at.ResourceBlock.$_tags.push("tick","processing"),e.at.ResourceBlock.patchProperties.resource=e.which.resource,e.at.ResourceBlock.mining_drill&&(e.at.ResourceBlock.patchProperties.mining_time=t.data.resource[e.which.resource].mining_time/t.data.entity[e.at.ResourceBlock.mining_drill].mining_speed*t.getStatic("config.TICKS_PER_SECOND"),e.at.ResourceBlock.mining_ticks=e.at.ResourceBlock.patchProperties.mining_time,e.at.ResourceBlock.subIcon=e.at.ResourceBlock.patchProperties.resource),t.processTEMP(e.at.ResourceBlock.buffers.out,"buffer.restrictList",{list:[e.at.ResourceBlock.patchProperties.resource]})},u.SetResource.signature={at:"ResourceBlock",which:"resource"},u.SetResource.CC_provide="resBlock.setResource",u.PrepSpace=function(e,t){t.processTEMP(e.player.inventory,"inventory.consume",{itemStacks:t.getStatic("itemStackCost.resBlock_foundation")})?(e.at.ResourceBlock.prepped++,e.at.ResourceBlock.spaceUsed+=10,e.at.ResourceBlock.complexity+=5):t.view.warnToast("Unable to consume foundation costs")},u.PrepSpace.signature={at:"ResourceBlock",player:"inventory"},u.PrepSpace.CC_provide="resBlock.prepSpace",u.BuildMine=function(e,t){if(0!=e.at.ResourceBlock.prepped)return t.processTEMP(e.player.inventory,"inventory.consume",{itemStacks:t.getStatic("itemStackCost.resBlock_miner")})?(e.at.ResourceBlock.prepped--,e.at.ResourceBlock.built++,void(t.getId(e.at.ResourceBlock.buffers.out).stackSize+=5)):t.view.warnToast("Mining drill not available")},u.BuildMine.signature={at:"ResourceBlock",player:"inventory"},u.BuildMine.CC_provide="resBlock.buildMine",u.__foundationCost=function(e,t,o,s){var r=s.getId(e),c=[{name:"stone",count:5}];c.push({name:"transport-belt",count:Math.floor(r.spaceUsed/10)}),o._result={tool:"stackArray",tip:"Foundation Cost",data:c}},u.__foundationCost.CC_utility="resBlock.__foundationCost",u.__minerCost=function(e,t,o,s){var r=[{name:s.getId(e).mining_drill,count:1}];o._result={tool:"stackArray",tip:"Foundation Cost",data:r}},u.__minerCost.CC_utility="resBlock.__minerCost",u.tick=function(e,t,o){if(0!=e.built&&e.patchProperties.mining_time)if(0==e.mining_ticks){var s=o.processTEMP(e.buffers.out,"inventory.add",{itemStacks:{name:e.patchProperties.resource,count:e.storedResources||e.built}});s.complete?(e.mining_ticks=e.patchProperties.mining_time,e.stalled=!1):(e.stalled=!0,e.storedResources=s.part[0].count,e.mining_ticks=Math.ceil(.1*e.patchProperties.mining_time))}else e.mining_ticks--},s.a.defineObj("ResourceBlock",u.New,u);var l={New:function(e,t,o){return t.name=e.name.string,t.spaceUsed=50,t.complexity=10,t.prepped=0,t.built=0,t.connections={sources:[],maxSources:1},t.buffers={},t.buffers.in=o.newComponent("entity.buffer",{restrictable:!0,stackSize:10,maxStack:2,dir:"in"},t.$_id),t.techTreeClass="main",t.subIcon="automation-science-pack",t.research_speed=1,t.research_ticks=NaN,t.research_time=0,t.buildingType="lab",t.foundationType="",[t]}};l.New._signal="generalUpdate",l.prepSpace=function(e,t){t.processTEMP("player.inventory","inventory.consume",{itemStacks:t.processTEMP(e.at.techBlock,"techBlock.toolTips",{which:"foundation"}).data})?(e.at.techBlock.prepped++,e.at.techBlock.spaceUsed+=10,e.at.techBlock.complexity+=5):t.view.warnToast("Not enough materials for foundation")},l.prepSpace.signature={at:"techBlock"},l.prepSpace.CC_provide="techBlock.prepSpace",l.BuildTech=function(e,t){0!=e.at.techBlock.prepped&&(t.processTEMP("player.inventory","inventory.consume",{itemStacks:t.processTEMP(e.at.techBlock,"techBlock.toolTips",{which:"buildLab"}).data})?(e.at.techBlock.prepped--,e.at.techBlock.built++,t.getId(e.at.techBlock.buffers.in).stackSize+=5):t.view.warnToast("Not enough materials to build lab"),e.at.techBlock.bufferSet||(t.processTEMP(e.at.techBlock.buffers.in,"buffer.restrictList",{list:["automation-science-pack","logistic-science-pack"]}),e.at.techBlock.bufferSet=!0),e.at.techBlock.$_tags.push("tick","processing"))},l.BuildTech.signature={at:"techBlock"},l.BuildTech.CC_provide="techBlock.buildLab",l.SetTree=function(e,t){t.view.errorToast("Not Yet Implemented")},l.SetTree.signature={at:"techBlock"},l.SetTree.CC_provide="techBlock.setTree",l.__tooltips=function(e,t,o,s){s.getId(e);var r=[],c="";switch(t.which){case"foundation":r.push({name:"inserter",count:2}),r.push({name:"stone",count:5}),c="Lab foundation";break;case"buildLab":r.push({name:"lab",count:1}),c="Lab building"}o._result={tool:"stackArray",tip:c,data:r}},l.__tooltips.Igor_operation="techBlock.toolTips",l.__tooltips.CC_utility="techBlock.toolTips",l.tick=function(e,t,o){var s=o.getNamedObject("research").progressing;if(!s)return e.research_ticks=NaN;if(Number.isNaN(e.research_ticks)||null===e.research_ticks){var r=s.cost.ingredients.map((function(e){return{name:e[0],count:e[1]}})),c=o.processTEMP(e.buffers.in,"inventory.consume",{itemStacks:r,multi:e.built});if(e.research_time=s.cost.time*o.getStatic("config.TICKS_PER_SECOND")*e.research_speed,!c)return e.research_consumed=0,e.research_ticks=.1*e.research_time,void(e.stalled=!0);e.stalled=!1,e.research_ticks=e.research_time,e.research_consumed=c}else if(e.research_ticks)--e.research_ticks;else if(e.research_ticks<=0){if(e.research_consumed){var n=o.processTEMP(s,"research.update",{count:e.research_consumed,me:e.$_id});if(n){var i=s.cost.ingredients.map((function(e){return{name:e[0],count:e[1]}}));o.processTEMP(e.buffers.in,"inventory.add",{itemStacks:i,force:!0,multi:n})}}e.research_ticks=NaN}},s.a.defineObj("TechBlock",l.New,l);var f={land:{total:100,used:0,complexity:0,res_patches:1,res_patches_used:0,fac_block_costs:{factory:100,bus:100,research:100}},scanning:{nextCost:100,currentCost:0},attackWaves:{nextTimer:100,nextStrength:100,currentTimer:0},facBlocks:{defenses:null,defenseBus:null,offense:null,offenseBus:null,resBlocks:[],buses:[],blocks:[],techBlocks:[]},player:c.a,activeFeatures:{tutorial:!0},research:{completed:{},progressing:null},unlocked_recipes:[],control:{bonusTicks:0},version:r.a};s.a.defineObj("#",f),s.a.setNamed("player.inventory","player.inv"),s.a.setNamed("research","research"),s.a.setNamed("global",""),s.a.setStatic("config.TICKS_PER_SECOND",r.d),s.a.addEventHandler("gameLoad",(function(e){var t=s.a.getNamed("global");if(t.control){var o=(new Date).getTime()-t.control.lastSave,c=Math.floor(o/1e3*r.d);console.log("added: "+c),t.control.bonusTicks+=Math.floor(c/20)}else t.control={bonusTicks:0}})),s.a.addEventHandler("gameSave",(function(e){s.a.getNamed("global").control.lastSave=(new Date).getTime()})),s.a.provide_CCC("game.fastForward",(function(e,t){var o=t.getNamedObject("global");"true"==e.to.string&&o.control.bonusTicks>0?(o.control.fastForward=!0,t.ticker.fastForward()):(o.control.fastForward=!1,t.ticker.fastForward(!1))}),{to:"string"}),s.a.addEventHandler("tick",(function(e,t){var o=t.getNamedObject("global");o.control.fastForward&&(o.control.bonusTicks--,o.control.bonusTicks<=0&&(o.control.fastForward=!0,t.ticker.fastForward(!1),o.control.bonusTicks=0))}));var p=function(){}}}]);
//# sourceMappingURL=app~fa1e48bf.ad77ba3b11aeef334e7e.bundle.map