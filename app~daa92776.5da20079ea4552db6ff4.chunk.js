(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{"v3/l":function(e,t,o){"use strict";var s=o("7jDb");s.a.setStatic("itemStackCost.resBlock_foundation",[{name:"stone",count:5},{name:"transport-belt",count:4}]),s.a.setStatic("itemStackCost.resBlock_miner",[{name:"burner-mining-drill",count:1}]);var c={New:function(e,t,o){var s=o.getNamedObject("global").land,c=o.processTEMP(null,"facBlock.__tooltips",{which:"factoryBlock"});if(s.total-s.used<c.landCost)return o.view.warnToast("Not enough land to build a new factory block"),[];var r=o.getNamedObject("global").activeFeatures.factoryBlocks;s.used+=c.landCost,s.complexity+=c.complexity,t.name=e.name.string,t.size=c.landCost,t.complexity=c.complexity,t.connections={sources:[],drains:[],maxSources:r.blocksMaxSources||1,maxDrains:r.blocksMaxDrains||1};var n={restrictable:!0,stacks:1,stackSize:5};return t.buffers={},t.buffers.in=o.newComponent("entity.buffer",n,t),t.buffers.internal=o.newComponent("entity.buffer",n,t),t.buffers.out=o.newComponent("entity.buffer",n,t),t.processingList={},t.subIcon="stone",t.factoryLines=[],t.factoryLines.push(o.newComponent("FactoryLine",{source:t.buffers.in,drain:t.buffers.out,internal:t.buffers.internal,parent:t.$_id,order:t.factoryLines.length})),t.$_tags.push("tick","processing"),[t]}};c.New.signature={},c.New._signal="generalUpdate",c.NewCCC=function(e,t){t.addNewObject(t.getNamedObject("global").facBlocks.blocks,"FactoryBlock",e)},c.NewCCC.signature={name:"string"},c.NewCCC.CC_provide="facBlock.newBlock",c.NewBusCCC=function(e,t){t.addNewObject(t.getNamedObject("global").facBlocks.buses,"FactoryBus",e)},c.NewBusCCC.signature={name:"string"},c.NewBusCCC.CC_provide="facBlock.newBus",c.NewResBlock=function(e,t){t.addNewObject(t.getNamedObject("global").facBlocks.resBlocks,"ResourceBlock",e)},c.NewResBlock.signature={name:"string"},c.NewResBlock.CC_provide="facBlock.newResBlock",c.NewTechBlock=function(e,t){t.addNewObject(t.getNamedObject("global").facBlocks.techBlocks,"TechBlock",e)},c.NewTechBlock.signature={name:"string"},c.NewTechBlock.CC_provide="facBlock.newTechBlock",c.__tooltips=function(e,t,o,s){e&&s.getId(e);var c={tool:"blockCosts",list:[],tip:null};switch(t.which){case"resBlock":c.landCost="resource",c.complexity=5,c.tip="Next ResourceBlock";break;case"techBlock":c.landCost=10,c.complexity=5,c.tip="Next Tech Block";break;case"busLine":c.landCost=10,c.complexity=5,c.tip="Next Bus Line";break;case"factoryBlock":c.landCost=10,c.complexity=1,c.tip="Next Factory Block";break;case"addLine":c.landCost=5,c.complexity=2,c.tip=t.return?"Reclaim Factory Line":"New Factory Line";break;case"bufferUpgrade":c.list=[{name:"iron-chest",count:1}],c.tip="Buffer Upgrade",c.tool="stackArray"}o._result=c},c.__tooltips.CC_utility="facBlock.__tooltips",c.__tooltips.Igor_operation="facBlock.__tooltips",c.SetupSystem=function(e,t){},c.SetupSystem.Igor_Event={system:"facBlock",event:"system_setup"},c.FeatureUpdate=function(e,t){if("factoryBlocks"==e.feature){var o=t.getNamedObject("global").facBlocks.blocks;e.blocksMaxSources&&o.forEach((function(o){t.getId(o).connections.maxSources=e.blocksMaxSources})),e.blocksMaxDrains&&o.forEach((function(o){t.getId(o).connections.maxDrains=e.blocksMaxDrains}))}Object.assign(features[e.feature],e)},c.FeatureUpdate.Igor_Event={name:"facBlock",event:"system_update"},c.tick=function(e,t,o){e.connections.drains},c.tick.signature={},c.SelectSubIcon=function(e,t,o){e.at.factoryBlock.subIcon=e.which.icon},c.SelectSubIcon.signature={at:"factoryBlock",which:"icon"},c.SelectSubIcon.CC_provide="factoryBlock.selectSubIcon",c.ConsumeStacks=function(e,t,o,s){var c=t.itemStacks.reduce((function(t,o){if(-1==t)return-1;e.processingList[o.name];var c=s.processTEMP(s.getId(e.processingList[o.name].at).items,"inventory.total",{name:o.name});return c<o.amount?-1:Math.min(t,Math.floor(c/o.amount))}),t.multi);c>=1&&t.itemStacks.forEach((function(t){s.processTEMP(s.getId(e.processingList[t.name].at),"inventory.consume",{itemStacks:t,multi:c})})),o._result=c},c.ConsumeStacks.signature={},c.ConsumeStacks.Igor_operation="factoryBlock.consumeStacks",c.ProduceStacks=function(e,t,o,s){var c=t.itemStacks.reduce((function(t,o){if(-1==t)return-1;var c=s.getId(e.processingList[o.name].at),r=c.stackSize-s.processTEMP(c.items,"inventory.total",{name:o.name});return r<o.amount?-1:Math.min(t,Math.floor(r/o.amount))}),t.multi);c>=1&&t.itemStacks.forEach((function(t){s.processTEMP(s.getId(e.processingList[t.name].at),"inventory.add",{itemStacks:t,multi:c})})),o._result=c},c.ProduceStacks.signature={},c.ProduceStacks.Igor_operation="factoryBlock.produceStacks",c.SetConnection=function(e,t){var o="source"==e.dir.string?"Drain":"Source";e.at.factoryBlock.connections[e.dir.string+"s"]!=e.to_which.factoryBus?(t.processTEMP(e.to_which.factoryBus,"factoryBus.add"+o,{who:e.at.factoryBlock.$_id})&&(e.at.factoryBlock.connections[e.dir.string+"s"]=e.to_which.factoryBus),t.processTEMP(e.to_which.factoryBus,"factoryBus.connectTo",{})):t.processTEMP(e.to_which.factoryBus,"factoryBus.clear"+o,{who:e.at.factoryBlock.$_id})},c.SetConnection.signature={at:"factoryBlock",to_which:"factoryBus",dir:"string"},c.SetConnection.CC_provide="factoryBlock.setConnection",c.AddFactoryLine=function(e,t){var o=t.processTEMP(e.at.factoryBlock,"facBlock.__tooltips",{which:"addLine"}),s=t.getNamedObject("global").land;if(s.used+o.landCost>s.total)return t.view.warnToast("Not enough land to add factory line");e.at.factoryBlock.factoryLines.push(t.newComponent("FactoryLine",{source:e.at.factoryBlock.buffers.in,drain:e.at.factoryBlock.buffers.out,internal:e.at.factoryBlock.buffers.internal,parent:e.at.factoryBlock.$_id,order:e.at.factoryBlock.factoryLines.length||0})),e.at.factoryBlock.size+=o.landCost,s.used+=o.landCost,e.at.factoryBlock.complexity+=o.complexity,s.complexity+=o.complexity,t.view.signaler.signal("generalUpdate")},c.AddFactoryLine.signature={at:"factoryBlock"},c.AddFactoryLine.CC_provide="factoryBlock.addLine",c.SetProcessItems=function(e,t,o,s){console.log("set process"),t.lists.consume.forEach((function(o){e.processingList[o]?e.processingList[o].at==e.buffers.out&&(e.processingList[o].at=e.buffers.internal,e.processingList[o].consume=[]):e.processingList[o]={at:e.buffers.in,consume:[]},e.processingList[o].consume.push(t.listId)})),t.lists.produce.forEach((function(o){e.processingList[o]?e.processingList[o].at==e.buffers.in&&(e.processingList[o].at=e.buffers.internal,e.processingList[o].produce=[]):e.processingList[o]={at:e.buffers.out,produce:[]},e.processingList[o].produce.push(t.listId)})),s.processTEMP(e.buffers.in,"buffer.restrictList",{list:Object.keys(e.processingList).filter((function(t){return e.processingList[t].at==e.buffers.in}))}),s.processTEMP(e.buffers.internal,"buffer.restrictList",{list:Object.keys(e.processingList).filter((function(t){return e.processingList[t].at==e.buffers.internal}))}),s.processTEMP(e.buffers.out,"buffer.restrictList",{list:Object.keys(e.processingList).filter((function(t){return e.processingList[t].at==e.buffers.out}))})},c.SetProcessItems.Igor_operation="factoryBlock.setProcessItems",c.ClearProcessItems=function(e,t,o,s){t.lists.consume.forEach((function(o){var s,c=e.processingList[o];(c.consume.splice(c.consume.indexOf(t.listId),1),0==c.consume.length)&&(c.at==e.buffers.internal&&(null==(s=c.produce)?void 0:s.length)>0?c.at=e.buffers.out:delete e.processingList[o])})),t.lists.produce.forEach((function(o){var s,c=e.processingList[o];(c.produce.splice(c.produce.indexOf(t.listId),1),0==c.produce.length)&&(c.at==e.buffers.internal&&(null==(s=c.consume)?void 0:s.length)>0?c.at=e.buffers.in:delete e.processingList[o])})),s.processTEMP(e.buffers.in,"buffer.restrictList",{list:Object.keys(e.processingList).filter((function(t){return e.processingList[t].at==e.buffers.in}))}),s.processTEMP(e.buffers.internal,"buffer.restrictList",{list:Object.keys(e.processingList).filter((function(t){return e.processingList[t].at==e.buffers.internal}))}),s.processTEMP(e.buffers.out,"buffer.restrictList",{list:Object.keys(e.processingList).filter((function(t){return e.processingList[t].at==e.buffers.out}))})},c.ClearProcessItems.Igor_operation="factoryBlock.clearProcessItems",s.a.defineObj("FactoryBlock",c.New,c);var r={New:function(e,t,o){return t.prepped=0,t.built=0,t.buildingType=null,t.recipe=null,t.itemTargets=null,t.processing_time=-1,t.processing_count=0,t.connections={source:e.source,drain:e.drain,internal:e.internal},t.order=e.order,t.$_parent=e.parent,[t]}};r.New.signature={source:"entity.buffer",drain:"entity.buffer",internal:"entity.buffer"},r.New._signal="generalUpdate",r.__delete=function(e,t){e.$_tags.delete("tick");var o=t.getId(e.$_parent),s=t.getNamedObject("global").land;if(e.recipe&&t.processTEMP(e.$_parent,"factoryBlock.clearProcessItems",{lists:e.processList}),e.buildingType&&(t.processTEMP("player.inventory","inventory.add",{itemStacks:{name:e.buildingType,count:e.built}}),e.prepped+=e.built,e.built=0),e.prepped)for(var c=null,r=e.prepped;r>0;r--)c=t.processTEMP(e,"factoryLine.toolTips",{which:"foundation",return:!0}),console.log(c.list),t.processTEMP("player.inventory","inventory.add",{itemStacks:c.list}),o.size-=c.landCost,s.used-=c.landCost,o.complexity-=c.complexity,s.complexity-=c.complexity,e.prepped--;e.processing_count&&t.processTEMP("player.inventory","inventory.add",{itemStacks:e.recipe.ingredients,multi:e.processing_count});var n=t.processTEMP(e,"facBlock.__tooltips",{which:"addLine",return:!0});o.size-=n.landCost,s.used-=n.landCost,o.complexity-=n.complexity,s.complexity-=n.complexity;var i=o.factoryLines.indexOf(e.$_id);o.factoryLines.splice(i,1),o.factoryLines.forEach((function(e,o){t.getId(e).order<i||t.getId(e).order--})),t.view.signaler.signal("generalUpdate")},r.__delete.Igor_operation="FactoryLine.delete",r.BuildingSelectDialog=function(e,t){var o={list:[],type:"building",custom:{}};return Object.entries(t.data.entity).forEach((function(e){var t=e[0],s=e[1];s.crafting_categories&&o.list.push({name:s.name,space:s.space,categories:s.crafting_categories.join(", "),id:t})})),o},r.BuildingSelectDialog.CC_dialogList="building",r.SetType=function(e,t){var o=t.data.entity[e.which.building];e.at.factoryLine.buildingType=o.name,e.at.factoryLine.crafting_categories=o.crafting_categories,e.at.factoryLine.buildingSize=o.space},r.SetType.signature={at:["factoryLine","factoryBlock"],which:"building"},r.SetType.CC_provide="factoryLine.setBuilding",r.Prep=function(e,t){var o=t.processTEMP(e.at.factoryLine,"factoryLine.toolTips",{which:"foundation"});if(!t.processTEMP(e.player.inventory,"inventory.consume",{itemStacks:o.list}))return t.view.warnToast("Cannot consume foundation costs");var s=t.getNamedObject("global").land;if(s.used+o.landCost>s.total)return t.view.errorToast("There is not enough secured land for this");e.at.factoryLine.prepped++,e.at.factoryBlock.size+=o.landCost,s.used+=o.landCost,e.at.factoryBlock.complexity+=o.complexity,s.complexity+=o.complexity},r.Prep.signature={at:["factoryLine","factoryBlock"],player:"inventory"},r.Prep.CC_provide="factoryLine.prep",r.Expand=function(e,t){if(0!=e.at.factoryLine.prepped){if(!t.processTEMP(e.player.inventory,"inventory.consume",{itemStacks:{name:e.at.factoryLine.buildingType,count:1}}))return t.view.warnToast("Building not in inventory");if(e.at.factoryLine.built++,e.at.factoryLine.prepped--,e.at.factoryLine.recipe){if(Number.isInteger(e.at.factoryLine.processing_ticks))t.processTEMP(e.at.factoryBlock,"factoryBlock.consumeStacks",{itemStacks:e.at.factoryLine.recipe.ingredients,multi:1})&&(e.at.factoryLine.processing_ticks*=(e.at.factoryLine.built-1)/e.at.factoryLine.built,e.at.factoryLine.processing_count++);e.at.factoryLine.$_tags.push("tick","processing")}}},r.Expand.signature={at:["factoryLine","factoryBlock"],player:"inventory"},r.Expand.CC_provide="factoryLine.addBuilding",r.SetRecipe=function(e,t){if(e.at.factoryLine.recipe&&(t.processTEMP(e.at.factoryBlock,"factoryBlock.clearProcessItems",{lists:e.at.factoryLine.processList}),e.at.factoryLine.recipe==e.which.recipe))return e.at.factoryLine.recipe=null,void e.at.factoryLine.$_tags.delete("tick");var o=t.data.recipe[e.which.recipe],s={consume:o.ingredients.map((function(e){return e.name})),produce:o.results.map((function(e){return e.name}))};t.processTEMP(e.at.factoryBlock,"factoryBlock.setProcessItems",{lists:s,listId:e.at.factoryLine.$_id})?(e.at.factoryLine.processList=s,e.at.factoryLine.recipe=o,e.at.factoryLine.processing_time=o.crafting_speed/t.data.entity[e.at.factoryLine.buildingType].crafting_speed*t.getStatic("config.TICKS_PER_SECOND"),e.at.factoryLine.processing_ticks=NaN,e.at.factoryLine.built&&e.at.factoryLine.$_tags.push("tick","processing")):console.error("Couldn't set my items on the parent factoryBlock")},r.SetRecipe.signature={at:["factoryLine","factoryBlock"],which:"recipe",player:"inventory"},r.SetRecipe.CC_provide="factoryLine.setRecipe",r.__tooltips=function(e,t,o,s){var c=e?s.getId(e):{prepped:0,built:0},r={tool:"blockCosts",list:[]};switch(t.which){case"foundation":var n=c.prepped+c.built;t.return&&n--,r.landCost=c.buildingSize?+c.buildingSize+n:5,r.complexity=Math.min(Math.floor((+c.buildingSize||4)/4),1),r.list.push({name:"stone",count:r.landCost}),r.list.push({name:"inserter",count:2}),r.tip=t.return?"Land Refund":"Foundation Cost"}o._result=r},r.__tooltips.Igor_operation="factoryLine.toolTips",r.__tooltips.CC_utility="factoryLine.toolTips",r.tick=function(e,t,o){if(0!=e.built&&e.processing_time&&e.recipe)if(Number.isNaN(e.processing_ticks)||null==e.processing_ticks){var s=o.processTEMP(e.$_parent,"factoryBlock.consumeStacks",{itemStacks:e.recipe.ingredients,multi:e.built});s>0?(e.processing_count=s,e.processing_ticks=e.processing_time,e.stalled=!1):(e.processing_ticks=Math.ceil(.1*e.processing_time),e.stalled=!0)}else if(e.processing_ticks&&e.processing_ticks--,e.processing_ticks<=0)if(e.processing_count){var c=o.processTEMP(e.$_parent,"factoryBlock.produceStacks",{itemStacks:e.recipe.results,multi:e.processing_count});c==e.processing_count?(e.processing_ticks=NaN,e.processing_count=0):(e.processing_ticks=Math.ceil(.1*e.processing_time),e.stalled=!0,c>0&&(e.processing_count=c))}else e.processing_ticks=NaN},s.a.defineObj("FactoryLine",r.New,r);var n={New:function(e,t,o){var s=o.getNamedObject("global").land;return s.total-s.used<10?o.view.warnToast("Not enough land to build a bus line"):(s.used+=10,s.complexity+=5,t.name=e.name.string,t.size=10,t.complexity=5,t.connections={sources:[],drains:[],maxSources:0,maxDrains:0},t.processors={source:{xferTicks:120,xferTimer:0,xferTarget:0,xferQty:0},drain:{xferTicks:120,xferTimer:0,xferTarget:0,xferQty:0},central:o.newComponent("entity.buffer",{stacks:1,stackSize:5},t.$_id)},t.clogged=!1,t.subIcon="stone",[t])}};n.New._signal="generalUpdate",n.SelectSubIcon=function(e,t,o){e.at.factoryBus.subIcon=e.which.icon},n.SelectSubIcon.signature={at:"factoryBus",which:"icon"},n.SelectSubIcon.CC_provide="factoryBus.selectSubIcon",n.DialogSelect=function(e,t){var o=t.getNamedObject("global"),s=[];o.facBlocks.buses.forEach((function(e){var o=t.getId(e);s.push({name:o.name,icon:o.subIcon,id:e})}));var c={list:s,type:"bus",custom:{}};return e.showSpecials&&o.facBlocks.defenseBus&&(c.custom.showDefense=!0),e.showSpecials&&o.facBlocks.offenseBus&&(c.custom.showOffense=!0),e.showSpecials&&o.facBlocks.market&&(c.custom.showMarket=!0),e.showDisconnect&&(c.custom.showDisconnect=!0),c},n.DialogSelect.CC_dialogList="factoryBus",n.ClearConnection=function(e,t,o,s){var c=e.connections[t.dir+"s"].indexOf(t.id);-1==c&&console.log("couldn't find index"),e.connections[t.dir+"s"].splice(c,1),e.processors[t.dir].xferTarget=0},n.ClearConnection.Igor_operation="factoryBus.clearConnection",n.ConnectTo=function(e,t){var o=t.getId(e.connectTo.factoryBus),s=t.getId(e.connectTo.block);if("@none"==e.connectTo.factoryBus){var c="output"==e.dir.string?"drains":"sources";return t.processTEMP(e.current.bus,"factoryBus.clearConnection",{id:e.connectTo.block,dir:"output"==e.dir.string?"source":"drain"}),void s.connections[c].splice(s.connections[c].indexOf(e.current.bus),1)}if("output"==e.dir.string){if(o.connections.sources.length==o.connections.maxSources)return t.view.warnToast("No available drains at target bus");if(-1!=e.current.bus&&s.connections.drains.includes(e.current.bus)){var r=s.connections.drains.indexOf(e.current.bus);s.connections.drains.splice(r,1);var n=t.getId(e.current.bus);r=n.connections.sources.indexOf(s.$_id),n.connections.sources.splice(r,1),n.processors.source.xferTarget=0}s.connections.drains.push(e.connectTo.factoryBus),o.connections.sources.push(e.connectTo.block)}else{if(o.connections.drains.length==o.connections.maxDrains)return t.view.warnToast("No available drains at target bus");if(-1!=e.current.bus&&s.connections.sources.includes(e.current.bus)){var i=s.connections.sources.indexOf(e.current.bus);s.connections.sources.splice(i,1);var a=t.getId(e.current.bus);i=a.connections.drains.indexOf(s.$_id),a.connections.drains.splice(i,1),a.processors.drain.xferTarget=0}s.connections.sources.push(e.connectTo.factoryBus),o.connections.drains.push(e.connectTo.block)}t.view.signaler.signal("generalUpdate")},n.ConnectTo.signature={dir:"string",connectTo:["factoryBus","block"],current:"bus"},n.ConnectTo.CC_provide="factoryBus.connectTo",n.ExpandBus=function(e,t){var o=t.getNamedObject("global").land,s=t.processTEMP(e.at.factoryBus,"factoryBus.tooltips",{which:"expand"+e.dir.string});return o.used+s.landCost>o.max?t.view.warnToast("No more land available"):t.processTEMP(e.player.inventory,"inventory.consume",{itemStacks:s.list})?("source"==e.dir.string?e.at.factoryBus.connections.maxSources+=1:"drain"==e.dir.string&&(e.at.factoryBus.connections.maxDrains+=1),e.at.factoryBus.size+=s.landCost,e.at.factoryBus.complexity+=s.complexity,o.used+=s.landCost,o.complexity+=s.complexity,e.at.factoryBus.connections.maxSources&&e.at.factoryBus.connections.maxDrains&&e.at.factoryBus.$_tags.push("tick","processing"),void(t.getId(e.at.factoryBus.processors.central).maxStacks=Math.min(Math.ceil(e.at.factoryBus.size/50),15))):t.view.warnToast("Unable to consume costs to expand bus")},n.ExpandBus.signature={at:"factoryBus",dir:"string",player:"inventory"},n.ExpandBus.CC_provide="factoryBus.expandBus",n.ExpandProcessing=function(e,t){var o=t.getNamedObject("global").land,s=t.processTEMP(e.at.factoryBus,"factoryBus.tooltips",{which:"processing"+e.dir.string});return o.used+s.landCost>o.max?t.view.warnToast("No more land available"):t.processTEMP(e.player.inventory,"inventory.consume",{itemStacks:s.list})?(e.at.factoryBus.processors[e.dir.string].xferQty+=2,e.at.factoryBus.size+=s.landCost,e.at.factoryBus.complexity+=s.complexity,o.used+=s.landCost,void(o.complexity+=s.complexity)):t.view.warnToast("Unable to consume costs to expand bus")},n.ExpandProcessing.signature={at:"factoryBus",dir:"string",player:"inventory"},n.ExpandProcessing.CC_provide="factoryBus.expandProcessing",n.__tooltips=function(e,t,o,s){if(e){var c=s.getId(e),r={tool:"blockCosts",list:[]};switch(t.which){case"processingsource":case"input_processing":r.list.push({name:"inserter",count:2}),r.landCost=2,r.complexity=1,r.tip="Input Processing";break;case"expandsource":case"expand_input_sources":r.list.push({name:"iron-chest",count:2}),c.connections.maxSources&&r.list.push({name:"transport-belt",count:5*c.connections.maxSources}),r.landCost=10,r.complexity=5,r.tip="Expand Source Points";break;case"processingdrain":case"output_processing":r.list.push({name:"inserter",count:2}),r.landCost=2,r.complexity=1,r.tip="Output Processing";break;case"expanddrain":case"expand_output_drains":r.list.push({name:"iron-chest",count:2}),c.connections.maxDrains&&r.list.push({name:"transport-belt",count:5*c.connections.maxDrains}),r.landCost=10,r.complexity=5,r.tip="Expand Drain Points"}o._result=r}},n.__tooltips.CC_utility="busLine_Costs",n.__tooltips.Igor_operation="factoryBus.tooltips",n.ClearClog=function(e,t){t.getId(e.at.factoryBus.processors.central).items.forEach((function(e){t.processTEMP("player.inventory","inventory.add",{itemStacks:e}),e.count=0,e.icon=void 0})),e.at.factoryBus.clogged=!1},n.ClearClog.signature={at:"factoryBus"},n.ClearClog.CC_provide="factoryBus.clearClog",n.tick=function(e,t,o){var s,c;e.connections.sources.length>0&&(null==(s=e.processors.source)?void 0:s.xferQty)>0&&(e.processors.source.xferTimer>=e.processors.source.xferTicks?(o.processTEMP(o.getId(e.connections.sources[e.processors.source.xferTarget],"buffers.out"),"buffer.busXfer",{xferCount:e.processors.source.xferQty,toBus:e.processors.central}).full&&(e.clogged=!0),++e.processors.source.xferTarget==e.connections.sources.length&&(e.processors.source.xferTarget=0),e.processors.source.xferTimer=0):e.processors.source.xferTimer++);e.connections.drains.length>0&&(null==(c=e.processors.drain)?void 0:c.xferQty)>0&&(e.processors.drain.xferTimer>=e.processors.drain.xferTicks?(o.processTEMP(o.getId(e.connections.drains[e.processors.drain.xferTarget],"buffers.in"),"buffer.busXfer",{xferCount:e.processors.drain.xferQty,fromBus:e.processors.central}).full,++e.processors.drain.xferTarget==e.connections.drains.length&&(e.processors.drain.xferTarget=0),e.processors.drain.xferTimer=0):e.processors.drain.xferTimer++)},s.a.defineObj("FactoryBus",n.New,n);var i={New:function(e,t,o){var s=o.getNamedObject("global").land;return s.res_patches-s.res_patches_used==0?(o.view.warnToast("No resource patches available"),[]):(s.res_patches_used++,t.name=e.name.string,t.patchProperties={},t.size=0,t.complexity=1,s.complexity+=1,t.connections={drains:[],maxDrains:1},t.prepped=0,t.built=0,t.mining_ticks=NaN,t.mining_drill="burner-mining-drill",t.buffers={},t.buffers.out=o.newComponent("entity.buffer",{restrictable:!0,stacks:1,stackSize:0,dir:"out"},t),[t])}};i.New._signal="generalUpdate",i.SetResource=function(e,t){var o=e.at.ResourceBlock;if(e.at.ResourceBlock.patchProperties.resource){var s=t.getId(o.buffers.out);t.processTEMP(t.getNamedObject("player.inventory"),"inventory.add",{itemStacks:s.items}),s.items=[]}e.at.ResourceBlock.$_tags.push("tick","processing"),e.at.ResourceBlock.patchProperties.resource=e.which.resource,e.at.ResourceBlock.mining_drill&&(e.at.ResourceBlock.patchProperties.mining_time=t.data.resource[e.which.resource].mining_time/t.data.entity[e.at.ResourceBlock.mining_drill].mining_speed*t.getStatic("config.TICKS_PER_SECOND"),e.at.ResourceBlock.mining_ticks=e.at.ResourceBlock.patchProperties.mining_time,e.at.ResourceBlock.subIcon=e.at.ResourceBlock.patchProperties.resource),t.processTEMP(e.at.ResourceBlock.buffers.out,"buffer.restrictList",{list:[e.at.ResourceBlock.patchProperties.resource]})},i.SetResource.signature={at:"ResourceBlock",which:"resource"},i.SetResource.CC_provide="resBlock.setResource",i.PrepSpace=function(e,t){var o=t.processTEMP(e.at.ResourceBlock,"resBlock.__toolTips",{which:"foundation"});if(!t.processTEMP(e.player.inventory,"inventory.consume",{itemStacks:o.list}))return t.view.warnToast("Unable to consume foundation costs");e.at.ResourceBlock.prepped++,e.at.ResourceBlock.size+=o.landCost,e.at.ResourceBlock.complexity+=o.complexity},i.PrepSpace.signature={at:"ResourceBlock",player:"inventory"},i.PrepSpace.CC_provide="resBlock.prepSpace",i.BuildMine=function(e,t){if(0!=e.at.ResourceBlock.prepped){if(!t.processTEMP(e.player.inventory,"inventory.consume",{itemStacks:[{name:e.at.ResourceBlock.mining_drill,count:1}]}))return t.view.warnToast("Unable to consume mining drill");e.at.ResourceBlock.prepped--,e.at.ResourceBlock.built++,t.getId(e.at.ResourceBlock.buffers.out).stackSize+=5}},i.BuildMine.signature={at:"ResourceBlock",player:"inventory"},i.BuildMine.CC_provide="resBlock.buildMine",i.__toolTips=function(e,t,o,s){var c=e?s.getId(e):null,r={tool:"blockCosts",list:[],tip:null};switch(t.which){case"foundation":r.tip="Foundation Cost";var n=c.built+c.prepped;t.return&&n--,r.list.push({name:"stone",count:+s.data.entity[c.mining_drill].space}),r.list.push({name:"transport-belt",count:2*(n+1)}),r.landCost=3*(n+1),r.complexity=1;break;case"miner":r.tip="Miner Cost",r.list.push({name:c.mining_drill,count:1})}o._result=r},i.__toolTips.CC_utility="resBlock.__toolTips",i.__toolTips.Igor_operation="resBlock.__toolTips",i.tick=function(e,t,o){if(0!=e.built&&e.patchProperties.mining_time)if(0==e.mining_ticks){var s=o.processTEMP(e.buffers.out,"inventory.add",{itemStacks:{name:e.patchProperties.resource,count:e.storedResources||e.built}});s.complete?(e.mining_ticks=e.patchProperties.mining_time,e.stalled=!1):(e.stalled=!0,e.storedResources=s.part[0].count,e.mining_ticks=Math.ceil(.1*e.patchProperties.mining_time))}else e.mining_ticks--},s.a.defineObj("ResourceBlock",i.New,i);var a={New:function(e,t,o){return t.name=e.name.string,t.spaceUsed=0,t.complexity=1,t.prepped=0,t.built=0,t.connections={sources:[],maxSources:1},t.buffers={},t.buffers.in=o.newComponent("entity.buffer",{restrictable:!0,stackSize:10,maxStack:2,dir:"in"},t.$_id),t.techTreeClass="main",t.subIcon="automation-science-pack",t.research_speed=1,t.research_ticks=NaN,t.research_time=0,t.buildingType="lab",t.foundationType="",[t]}};a.New._signal="generalUpdate",a.prepSpace=function(e,t){var o=t.processTEMP(e.at.TechBlock,"techBlock.__toolTips",{which:"foundation"}),s=t.getNamedObject("global").land;if(console.log(o),s.used+o.landCost>s.total)return t.view.warnToast("There is not enough secured land");t.processTEMP("player.inventory","inventory.consume",{itemStacks:o.list})||t.view.warnToast("Not enough materials for foundation"),e.at.techBlock.prepped++,e.at.techBlock.spaceUsed+=o.landCost,s.used+=o.landCost,e.at.techBlock.complexity+=o.complexity,s.complexity+=o.complexity},a.prepSpace.signature={at:"techBlock"},a.prepSpace.CC_provide="techBlock.prepSpace",a.BuildTech=function(e,t){if(0!=e.at.techBlock.prepped){var o=t.processTEMP(e.at.techBlock,"techBlock.__toolTips",{which:"buildLab"});t.processTEMP("player.inventory","inventory.consume",{itemStacks:o.list})||t.view.warnToast("Not enough materials to build lab"),e.at.techBlock.prepped--,e.at.techBlock.built++,t.getId(e.at.techBlock.buffers.in).stackSize+=5,e.at.techBlock.bufferSet||(t.processTEMP(e.at.techBlock.buffers.in,"buffer.restrictList",{list:["automation-science-pack","logistic-science-pack"]}),e.at.techBlock.bufferSet=!0),e.at.techBlock.$_tags.push("tick","processing")}},a.BuildTech.signature={at:"techBlock"},a.BuildTech.CC_provide="techBlock.buildLab",a.SetTree=function(e,t){t.view.errorToast("Not Yet Implemented")},a.SetTree.signature={at:"techBlock"},a.SetTree.CC_provide="techBlock.setTree",a.__tooltips=function(e,t,o,s){var c=c?s.getId(e):null,r={list:[],tool:"blockCosts"};switch(t.which){case"foundation":r.list.push({name:"inserter",count:2}),r.list.push({name:"stone",count:5}),r.complexity=1,r.landCost=20,r.tip="Lab foundation";break;case"buildLab":r.list.push({name:"lab",count:1}),r.tip="Lab building"}o._result=r},a.__tooltips.Igor_operation="techBlock.__toolTips",a.__tooltips.CC_utility="techBlock.__toolTips",a.tick=function(e,t,o){var s=o.getNamedObject("research").progressing;if(!s)return e.research_ticks=NaN;if(Number.isNaN(e.research_ticks)||null===e.research_ticks){var c=s.cost.ingredients.map((function(e){return{name:e[0],count:e[1]}})),r=o.processTEMP(e.buffers.in,"inventory.consume",{itemStacks:c,multi:e.built});if(e.research_time=s.cost.time*o.getStatic("config.TICKS_PER_SECOND")*e.research_speed,!r)return e.research_consumed=0,e.research_ticks=.1*e.research_time,void(e.stalled=!0);e.stalled=!1,e.research_ticks=e.research_time,e.research_consumed=r}else if(e.research_ticks)--e.research_ticks;else if(e.research_ticks<=0){if(e.research_consumed){var n=o.processTEMP(s,"research.update",{count:e.research_consumed,me:e.$_id});if(n){var i=s.cost.ingredients.map((function(e){return{name:e[0],count:e[1]}}));o.processTEMP(e.buffers.in,"inventory.add",{itemStacks:i,force:!0,multi:n})}}e.research_ticks=NaN}},s.a.defineObj("TechBlock",a.New,a)}}]);
//# sourceMappingURL=app~daa92776.5da20079ea4552db6ff4.bundle.map