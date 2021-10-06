(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{iVpH:function(e,t,r){"use strict";var i=r("7jDb"),n=r("6juG");i.a.defineObj("player.entity",(function(e,t,r){return t.buffers={},Object.assign(t,r.data.entity[e.name]),"miner"!=t.subType&&"crafter"!=t.subType||(t.buffers.out=r.newComponent("entity.buffer",{})),"crafter"!=t.subType&&"research"!=t.subType||("research"==t.subType?(t.buffers.in=r.newComponent("entity.buffer",{staticStacks:t.inputs}),t.research_timer=null,t.$_tags.push("researchTicker",!0)):t.buffers.in=r.newComponent("entity.buffer",{})),//!  This won't work when Igor is in a webworker
n.b.signaler.signal("addedEntity"),[t]}),{tick:function(e,t,r){if(e.processing){if(Number.isNaN(e.process_timer)||null===e.process_timer)"miner"==e.subType||r.processTEMP(e.buffers.in,"inventory.consume",{itemStacks:e.processing.ingredients})?e.process_timer=e.process_ticks:e.$_tags.delete("tick");else if(e.process_timer&&--e.process_timer,0===e.process_timer){var i=r.getId(e.buffers.out),n=r.processTEMP(i,"inventory.add",{itemStacks:e.buffers.stalled||e.processing.results||{name:e.processing.mining_results,count:1}});n.complete?(e.buffers.stalled=null,e.process_timer=NaN):(e.buffers.stalled=n.part,e.process_timer=0)}}else e.$_tags.delete("ticking")}}),i.a.addObjectTickHandler("player.entity",(//!  These should be combined into the entity.buffer tick()
function(e,t,r){var i=r.getId(e.buffers.in);if(0!=i.items.length)if(0==i.xferTimer){var n=Math.min(i.xfer,i.stackSize-i.items[i.xferStack].count),s=r.processTEMP(r.getNamedObject("player.inventory"),"inventory.consume",{itemStacks:{name:i.items[i.xferStack].name,count:n},partial:!0});s&&s[0].count>0&&(i.items[i.xferStack].count+=s[0].count,e.$_tags.push("tick","processing")),i.xferTimer=i.xferTicks,++i.xferStack==i.items.length&&(i.xferStack=0)}else i.xferTimer--}),"inputTicker",{chain:["inputTicker","tick"],num:-5}),i.a.addObjectTickHandler("player.entity",(function(e,t,r){var i=r.getId(e.buffers.out);if(0!=i.items.length)if(0==i.xferTimer){var n=Math.min(i.xfer,i.items[i.xferStack].count);r.processTEMP(r.getNamedObject("player.inventory"),"inventory.add",{itemStacks:{name:i.items[i.xferStack].name,count:n}}).complete&&(i.items[i.xferStack].count-=n),i.xferTimer=i.xferTicks,++i.xferStack==i.items.length&&(i.xferStack=0)}else i.xferTimer--}),"outputTicker",{chain:["tick","outputTicker"],num:5}),i.a.addObjectTickHandler("player.entity",(function(e,t,r){var i=r.getNamedObject("research").progressing;if(i){if(Number.isNaN(e.research_timer)||null===e.research_timer){if(!i.cost.ingredients.every((function(t){var i=t[0],n=t[1];return r.processTEMP(e.buffers.in,"inventory.total",{name:i})>=n})))return;return i.cost.ingredients.forEach((function(t){var i=t[0],n=t[1];r.processTEMP(e.buffers.in,"inventory.consume",{itemStacks:{name:i,count:n}})})),e.research_time=i.cost.time*r.config.TICKS_PER_SECOND*e.researching_speed,void(e.research_timer=e.research_time)}e.research_timer&&--e.research_timer,0===e.research_timer&&(r.processTEMP(i,"research.update",{}),e.research_timer=NaN)}}),"researchTicker",{chain:["tick","researchTicker"],num:3});var s=function(e,t,r){r.res?(window.clearTimeout(r.timeout),t.view.animsUpdate(r.res,null,null),r.res=void 0):(r.timeout=window.setTimeout((function(){t.processTEMP(e.player.inventory,"inventory.add",{itemStacks:[{name:e.which.resource.mining_results,count:1}]}),t.view.animsUpdate(r.res,null,null),r.res=void 0}),1e3*e.which.resource.mining_time),r.res=e.which.resource,t.view.animsUpdate(e.which.resource,"isMining",e.which.resource.mining_time))};window.ResourceMine=s,s.signature={which:"resource",player:"inventory"},i.a.provide_CCC("resources.mine",s,s.signature);i.a.provide_CCC("entity.setProcess",(function(e,t){if(!e.at.entity.processing&&null!=e.which.process||(t.processTEMP(e.at.entity,"entity.clearProcess",{returnTo:e.player.inventory}),e.which.process))if(e.at.entity.processing=e.which.process,e.at.entity.$_tags.push("tick","processing"),"mining"==e.type.class)e.at.entity.process_ticks=e.which.process.mining_time/e.at.entity.mining_speed*t.config.TICKS_PER_SECOND,e.at.entity.process_timer=e.at.entity.process_ticks;else if("crafting"==e.type.class){if(e.at.entity.process_ticks=e.which.process.crafting_speed/e.at.entity.crafting_speed*t.config.TICKS_PER_SECOND,e.at.entity.buffers.in){var r=t.getId(e.at.entity.buffers.in);if(r.stacks<e.which.process.ingredients.length)return void console.error("cannot fit ingredients");e.which.process.ingredients.forEach((function(e,t){r.items[t]={name:e.name,count:0}}))}if(e.at.entity.buffers.out){var i=t.getId(e.at.entity.buffers.out);if(i.stacks<e.which.process.results.length)return void console.error("cannot fit results");e.which.process.results.forEach((function(e,t){i.items[t]={name:e.name,count:0}}))}e.at.entity.process_timer=NaN}}),{at:"entity",which:"process",type:"class",player:"inventory"}),i.a.addOperation("entity.clearProcess",(function(e,t,r,i){var n=i.getNamedObject("player.inventory");if(e.buffers.in){e.process_timer&&i.processTEMP(n,"inventory.add",{itemStacks:e.processing.ingredients});var s=i.getId(e.buffers.in);i.processTEMP(n,"inventory.add",{itemStacks:s.items}),//! If args.returnTo is full, 'inventory.add' will fail silently
s.items.length=0}if(e.buffers.out){var c=i.getId(e.buffers.out);i.processTEMP(n,"inventory.add",{itemStacks:c.items}),//! If args.returnTo is full, 'inventory.add' will fail silently
c.items.length=0}e.buffers.stalled&&(i.processTEMP(n,"inventory.add",{itemStacks:e.buffers.stalled}),e.buffers.stalled=null),e.processing=null}));var c={Collect:function(e,t){var r=t.getId(e.which.buffer),i=r.items.findIndex((function(t){return t.name==e.item.name}));0!==r.items[i].count&&(t.processTEMP(e.player.inventory,"inventory.add",{itemStacks:r.items[i]}),r.items[i].count=0,"temp_null"!=e.at.entity&&e.at.entity.$_tags.push("tick","processing"))}};c.Collect.signature={which:"buffer",item:"name",at:"entity",player:"inventory"},c.Collect.CC_provide="entity.bufferCollect",c.Fill=function(e,t){var r=t.getId(e.which.buffer),i=r.items.findIndex((function(t){return t.name==e.item.name})),n=t.processTEMP(e.player.inventory.items,"inventory.total",{name:r.items[i].name});if(0!==n){var s=e.service.rounder.calc(r.items[i].count,r.stackSize,n);t.processTEMP(e.player.inventory,"inventory.consume",{itemStacks:{name:r.items[i].name,count:s}}),r.items[i].count+=s,"temp_null"!=e.at.entity&&e.at.entity.$_tags.push("tick","processing")}},c.Fill.signature={which:"buffer",item:"name",at:"entity",service:"rounder",player:"inventory"},c.Fill.CC_provide="entity.bufferFill",i.a.setStatic("entity.buffer.BUFFER_SIZE",[5,10,20,30,40,50]),i.a.setStatic("entity.buffer.BUFFER_SIZE.MAX",50),c.Upgrade=function(e,t){if(e.which.buffer=t.getId(e.which.buffer),"autoload"==e.type.string){if(t.processTEMP(e.player.inventory,"inventory.consume",{itemStacks:{name:"inserter",count:1}})){!e.which.buffer.upgrades.loader&&(e.which.buffer.upgrades.loader={count:0}),e.which.buffer.upgrades.loader.count++,e.which.buffer.xferTimer||(e.which.buffer.xferTimer=e.which.buffer.xferTicks),e.which.buffer.xfer++;var r;r=e.at.entity.buffers.in==e.which.buffer.$_id?"inputTicker":"outputTicker",e.at.entity.$_tags.push(r,!0)}}else"buffer"==e.type.string&&t.processTEMP(e.player.inventory,"inventory.consume",{itemStacks:{name:"iron-chest",count:1}})&&(!e.which.buffer.upgrades.bufferSize&&(e.which.buffer.upgrades.bufferSize={count:0}),e.which.buffer.upgrades.bufferSize.count++,e.which.buffer.stackSize=t.getStatic("entity.buffer.BUFFER_SIZE")[e.which.buffer.upgrades.bufferSize.count]||t.getStatic("entity.buffer.BUFFER_SIZE.MAX"),e.at.entity.$_tags.push("tick","processing"))},c.Upgrade.signature={which:"buffer",type:"string",at:"entity",player:"inventory"},c.Upgrade.CC_provide="entity.bufferUpgrade",c.SetRestrictions=function(e,t,r,i){e.restrictable||(r._result=!1);for(var n=[],s=[],c=0;c<e.items.length;c++){var a=e.items[c];a?t.list.includes(a.name)?n.push(a.name):(a.count>0&&i.processTEMP(i.getNamedObject("player.inventory"),"inventory.add",{itemStacks:a}),e.items.splice(c,1,void 0),s.push(c)):s.push(c)}t.list.forEach((function(t){n.includes(t)||e.items.splice(s.splice(0,1),1,{name:t,count:0})}))},c.SetRestrictions.Igor_operation="buffer.restrictList",c.HasRestriction=function(e,t,r,i){e.restrictable?e.items.forEach((function(e){e.name==t.itemName&&(e.restrictedBy.includes(t.lineId)?r._result={found:!0,restricted:!0}:r._result={found:!0,restricted:!1})})):r._result=!1,!r._result&&(r._result={found:!1,restricted:!1})},c.HasRestriction.Igor_operation="buffer.hasRestriction",c.ClearRestriction=function(e,t,r,i){e.restrictable||(r._result=!1);for(var n=-1;!("_result"in r);){var s=e.items[++n];s.name==t.itemName&&(s.restrictedBy.splice(s.restrictedBy.indexOf(t.lineId),1),0==s.restrictedBy.length?(e.items[n]=null,r._result={found:!0,cleared:!0}):r._result={found:!0,cleared:!1})}!r._result&&(r._result={found:!1,cleared:!1})},c.ClearRestriction.Igor_operation="buffer.clearRestriction",c.BusXfer=function(e,t,r,i){if(t.toBus)for(;t.xferCount>0;){if(!e.items[e.busShift])return;var n=i.processTEMP(t.toBus,"inventory.add",{itemStacks:[{name:e.items[e.busShift].name,count:t.xferCount}]});if(n.complete)i.processTEMP(e,"inventory.consume",{itemStacks:[{name:e.items[e.busShift].name,count:t.xferCount}]}),t.xferCount=0;else{if(n.part[0].count==t.xferCount)return;i.processTEMP(e,"inventory.consume",{itemStacks:[{name:e.items[e.busShift].name,count:t.xferCount-n.part[0].count}]}),t.xferCount=n.part[0].count}++e.busShift==e.items.length&&(e.busShift=0)}else if(t.fromBus)for(;t.xferCount>0;){if(!e.items[e.busShift])return;var s=i.processTEMP(e,"inventory.add",{itemStacks:[{name:e.items[e.busShift].name,count:t.xferCount}]});if(s.complete)i.processTEMP(t.fromBus,"inventory.consume",{itemStacks:[{name:e.items[e.busShift].name,count:t.xferCount}]}),t.xferCount=0;else{if(s.part[0].count==t.xferCount)return;i.processTEMP(t.fromBus,"inventory.consume",{itemStacks:[{name:e.items[e.busShift].name,count:t.xferCount-s.part[0].count}]}),t.xferCount=s.part[0].count}++e.busShift==e.items.length&&(e.busShift=0)}else console.warn("BusXfer called __ no bus target")},c.BusXfer.Igor_operation="buffer.busXfer",i.a.defineObj("entity.buffer",(function(e,t,r){var i,n;return t.upgrades={},t.maxStacks=(null==(i=e.staticStacks)?void 0:i.length)||e.stacks||1,t.stackSize=e.stackSize||5,t.items=(null==(n=e.staticStacks)?void 0:n.map((function(e){return{name:e,count:0}})))||[],t.xfer=0,t.xferTicks=120,t.xferStack=0,t.busShift=0,t.xferTimer=NaN,t.restrictable=e.restrictable||!1,t.$_parent=e.$_parent,t.connection=null,[t]}),c);i.a.provide_CCC("research.set",(function(e,t,r){e.global.game.research.progressing=e.which.tech,e.global.game.research.progressing.completeUnits=0}),{which:"tech",global:"game"});i.a.provide_CCC("research.clear",(function(e,t,r){e.global.game.research.progressing=null}),{global:"game"});i.a.addOperation("research.update",(function(e,t,r,i){var s=i.getNamedObject("global");e.completeUnits++,e.completeUnits==e.cost.count&&(console.log("complete tech"),i.getNamedObject("research").progressing=null,e.researched=!0,s.research.completed[e.name]=!0,e.unlocks.forEach((function(e){"string"==typeof e&&i.processTEMP(e,"recipe.unlock"),"object"==typeof e&&i.processTEMP(e,"feature.unlock")})),n.b.signaler.signal("generalUpdate"))}));i.a.addOperation("recipe.unlock",(function(e,t,r,i){i.getNamedObject("global").unlocked_recipes.push(e)}));i.a.addOperation("feature.unlock",(function(e,t,r,i){i.getNamedObject("global").activeFeatures[e.feature]=e}))}}]);
//# sourceMappingURL=app~e525728c.1b51d37ef30a6a64c94e.bundle.map