(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{rOV7:function(e,t,a){"use strict";a.d(t,"a",(function(){return i}));a("+Aae");var i=function(){function e(e,t,a){this._cbs={subscribers:new Set,providers:new Set},this.debugging=!1,this.winTerval=null,this.ticks=0,this.isRunning=!1,this.config={ticks_per_sec:e,ticks_max_phase:t},this.mspt=1e3/this.config.ticks_per_sec,this.signaler=a}var t=e.prototype;return t.pause=function(){this.isRunning=!1,window.clearInterval(this.winTerval),this.winTerval=null},t.once=function(){this.isRunning=!0,this.onTick(),this.isRunning=!1},t.resume=function(){var e=this;this.isRunning=!0,this.winTerval=window.setInterval((function(){e.onTick()}),this.mspt)},t.toggle=function(){this.isRunning?this.pause():this.resume()},t.onTick=function(){var e=this;if(this.isRunning){this.ticks++,this.debugging&&console.log("tick"),this.ticks>=this.config.ticks_max_phase&&(this.ticks=0);var t={ticks:this.ticks};this._cbs.providers.forEach((function(e){e(t)})),this._cbs.subscribers.forEach((function(a){e.ticks%a.nth==a.phase&&a.cb(t)})),this.signaler.signal("generalUpdate")}return!0},t.DataProvider=function(e){this._cbs.providers.add(e)},t.subscribe=function(e,t){if(void 0===t&&(t=1),this.config.ticks_max_phase%t!=0)return!1;var a={cb:e,nth:t,phase:this.ticks%t};return Object.freeze(a),this._cbs.subscribers.add(a),a},t.dispose=function(e){this._cbs.subscribers.delete(e)},e}()},"styles.scss":function(e,t,a){(t=a("JPst")(!1)).push([e.i,"body{margin:0}.page-host{position:absolute;left:0;right:0;top:56px;bottom:0;overflow-x:hidden;overflow-y:auto}@media print{.page-host{position:absolute;left:10px;right:0;top:56px;bottom:0;overflow-y:inherit;overflow-x:inherit}}section{margin:1rem}.navbar-nav li.loader{margin:12px 24px 0 6px}.pictureDetail{max-width:425px}section.au-enter-active{-webkit-animation:fadeInRight 1s;animation:fadeInRight 1s}div.au-stagger{-webkit-animation-delay:50ms;animation-delay:50ms}.user-card-container.au-enter{opacity:0}.user-card-container.au-enter-active{-webkit-animation:fadeIn 2s;animation:fadeIn 2s}.user-card{overflow:hidden;position:relative;border:1px solid #ccc;border-radius:8px;text-align:center;padding:0;background-color:#337ab7;color:#88acd9;margin-bottom:32px;box-shadow:0 0 5px rgba(0,0,0,.5)}.user-card .content{margin-top:10px}.user-card .content .name{color:#fff;text-shadow:0 0 6px rgba(0,0,0,.5);font-size:18px}.user-card .header-bg{position:absolute;top:0;left:0;width:100%;height:70px;border-bottom:1px solid #fff;border-radius:6px 6px 0 0}.user-card .avatar{position:relative;margin-top:15px;z-index:100}.user-card .avatar img{width:100px;height:100px;border-radius:50%;border:2px solid #fff}@-webkit-keyframes fadeInRight{0%{opacity:0;transform:translate3d(100%,0,0)}to{opacity:1;transform:none}}@keyframes fadeInRight{0%{opacity:0;transform:translate3d(100%,0,0)}to{opacity:1;transform:none}}@-webkit-keyframes fadeIn{0%{opacity:0}to{opacity:1}}@keyframes fadeIn{0%{opacity:0}to{opacity:1}}",""]),e.exports=t},"tfmg-beta.scss":function(e,t,a){(t=a("JPst")(!1)).push([e.i,'[beta] *{box-sizing:border-box}[beta] section{margin:auto}[beta]>.statusBox{position:absolute;height:10vh;text-align:center;width:100%}[beta]>.statusBox>.facBlockStats{padding:0 10vw}[beta]>.statusBox>#toaster{top:0;left:0;position:absolute;text-align:left;padding:0 2vw;height:10vh;width:max(10vh,15vw);overflow-y:auto}[beta]>.statusBox>#toaster>toasted{display:inline-block;width:24px;height:24px}[beta]>.statusBox>#toaster>toasted .fas{font-size:16px;text-align:center;vertical-align:middle}[beta]>.statusBox>#toaster .toastTicker{display:inline;border-left:3px solid #000;height:20px;width:4px;left:1vw;margin-right:3px;position:absolute}[beta]>.statusBox>#toaster span{width:100%;height:100%}[beta]>.statusBox>#toaster toasted>span{border-radius:6px}[beta]>.statusBox>#toaster .light-bg{background-color:rgba(97,98,98,.2);color:#616262}[beta]>.statusBox>#toaster .warning-bg{background-color:rgba(255,193,7,.2);color:#ffc107}[beta]>.statusBox>#toaster .danger-bg{background-color:rgba(220,53,69,.2);color:#dc3545}[beta]>.statusBox>#toaster .primary-bg{background-color:rgba(40,167,69,.2);color:#28a745}[beta]>nav{position:absolute;top:10vh;width:100%;display:flex;justify-content:space-evenly;overflow:hidden}[beta]>nav>*{flex:1;text-align:center;margin:0 4px;padding:2px 4px}[beta]>nav>.selected{border:1px solid #add8e6;border-radius:8px}[beta]>nav>.fa-bars{flex-grow:2}[beta]>nav:after,[beta]>nav:before{border-top:3px solid #000;content:"";display:table-cell;position:relative;top:.5em;width:40%}[beta]>nav:before{right:2.5%}[beta]>nav:after{left:2.5%}[beta]>main{overflow-y:auto;position:absolute;width:calc(100% - 5vw);margin:0 .5rem;top:calc(10vh + 1.5rem);bottom:calc(20vh + 5px)}[beta]>main #nav,[beta]>main>*{position:relative}[beta]>main #nav{left:20vw;width:60vw}[beta]>main #playerHome h3{text-align:center}[beta]>main #playerHome #recipes{height:30vh}[beta]>main #machines{padding:.2rem;position:relative;height:100%}[beta]>main #machines .details{display:block;height:50%}[beta]>main #machines .entityList{overflow-y:auto;max-height:100px;min-height:40px;bottom:0;position:absolute;left:0;right:0;margin:auto;border-radius:8px;border:2px solid #000}[beta]>main #machines .entityList div{display:inline}[beta]>main #machines .cycleTime{position:absolute}[beta]>main #facBlocks .col.facBlockList{border:2px solid #000;border-radius:8px;overflow-y:auto}[beta]>main #facBlocks .col.facBlockList.resBlocks,[beta]>main #facBlocks .col.facBlockList.techBlocks{min-height:40px;max-height:80px}[beta]>main #facBlocks .col.facBlockList.busLines{min-height:80px;max-height:160px}[beta]>main #facBlocks .col.facBlockList.facBlocks{min-height:120px;max-height:280px}[beta]>main #facBlocks .col.facBlockList .blockItem{width:32px;height:32px;display:inline-block;margin-right:4px}[beta]>main #facBlocks .col.facBlockList .blockItem.drain{background:radial-gradient(circle,transparent 60%,rgba(0,128,0,.75) 85%,hsla(0,0%,100%,0) 100%)}[beta]>main #facBlocks .col.facBlockList .blockItem.source{background:radial-gradient(circle,transparent 60%,rgba(128,0,0,.75) 85%,hsla(0,0%,100%,0) 100%)}[beta]>main #facBlocks .col.facBlockList .blockItem.drain.source{background:linear-gradient(45deg,transparent,rgba(128,0,0,.75) 7%,hsla(0,0%,100%,0) 20%,transparent 80%,rgba(128,0,0,.75) 93%,transparent),linear-gradient(-45deg,transparent,rgba(0,128,0,.75) 7%,hsla(0,0%,100%,0) 20%,transparent 80%,rgba(0,128,0,.75) 93%,transparent)}[beta]>main #facBlocks .col.facBlockList .blockItem icon-base .altImage{zoom:75%}[beta]>main #viewBlocks #viewBusLine h5.bus_header{display:inline}[beta]>main #viewBlocks #viewBusLine h5.bus_header icon-base{zoom:60%;bottom:-20%;padding:0;display:inline-block}[beta]>main #viewBlocks #viewFacBlock h5{display:inline}[beta]>main #viewBlocks #viewFacBlock h5 icon-base{zoom:60%;bottom:-20%;padding:0;display:inline-block}[beta]>main #viewBlocks #viewFacBlock .interItem{padding:0}[beta]>main #viewBlocks #viewFacBlock .interItem span.fa-level-up-alt{position:absolute;left:0;top:0}[beta]>main #viewBlocks #viewFacBlock .interItem span.fa-level-down-alt{position:absolute;left:0;bottom:8px}[beta]>main #viewBlocks #viewFacBlock .fa-creative-commons-sa{text-align:center;border-bottom:1px dashed orange}[beta]>main #viewBlocks .fa-sign-in-alt,[beta]>main #viewBlocks .fa-sign-out-alt{color:#28a745}[beta]>#inventoryList{border:2px solid #000;border-radius:8px;height:16vh;position:absolute;display:inline-block;bottom:1vh;right:7.5vw;left:7.5vw;box-sizing:border-box}[beta]>#inventoryList h3{font-size:1.5rem;margin-bottom:.25rem}[beta]>#inventoryList inventory{position:absolute;overflow-y:auto;height:calc(100% - 2rem)}[beta]>#ChameleonModal{display:none;position:absolute;top:0;left:0;right:0;bottom:0;background-color:rgba(0,0,0,.7)}[beta]>#ChameleonModal #ChameleonMessage{text-align:center;vertical-align:middle}[beta]>#ChameleonModal #ChameleonButton{background-color:#d3d3d3}[beta]>#ChameleonModal>.center{position:absolute;top:calc(50% - 50px);left:30%}[beta]>#tutorial{display:none}[beta]>#tutorial.Block{width:100%;height:100%;display:block;top:0;left:0;background:rgba(0,0,0,.3);z-index:1000;position:fixed}[beta]>#tutorial.Block #tut_text{display:block;-webkit-backdrop-filter:blur(3px);backdrop-filter:blur(3px)}[beta]>#tutorial.Block>#tut_pos{width:100%;height:100px;font-size:2em;text-align:center;vertical-align:middle;position:absolute}[beta]>#tutorial.Block>#tut_pos.center{top:calc(50% - 50px)}[beta]>#tutorial.Block>#tut_pos.top{top:calc(25% - 50px)}[beta]>#tutorial.Block>#tut_pos.bottom{top:calc(75% - 50px)}[beta]>#tutorial span[note=off]{position:fixed;top:2vh;right:2vw;font-size:2em}[clickxx\\.delegate]{border:2px solid #000;-webkit-clip-path:polygon(0 15%,2% 2%,15% 0,85% 0,98% 2%,100% 15%,100% 85%,98% 98%,85% 100%,15% 100%,2% 98%,0 85%);clip-path:polygon(0 15%,2% 2%,15% 0,85% 0,98% 2%,100% 15%,100% 85%,98% 98%,85% 100%,15% 100%,2% 98%,0 85%)}[click\\.delegate]:not(button){background-color:rgba(0,0,0,.05)}.productionLines{border:2px dashed #000;border-radius:8}.fa_icon{font-size:24px}.fa_icon_sm{font-size:16px}.card{background-color:unset}',""]),e.exports=t},"tfmg.scss":function(e,t,a){(t=a("JPst")(!1)).push([e.i,'body{color:#daa520;background-color:#2f4f4f;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}a.notLink{color:inherit}a.notLink:hover{text-decoration:none}.NYI{cursor:not-allowed;color:#8b0000}.recipeDisabled{-webkit-filter:saturate(.2);filter:saturate(.2);border:2px dashed red;border-radius:8px}.recipeEnabled{-webkit-filter:saturate(1.5);filter:saturate(1.5);border:2px dashed green;border-radius:8px}.fillable{border:2px groove #b0c4de}header#selector{height:15vh}header#selector h4,header#selector h5{display:inline-block;position:relative}header#selector tool-tip{height:80px}header#selector #facBlockControls>div{display:inline}.leftside{width:100%;left:0}.leftside,.rightside{box-sizing:border-box;margin:0;position:relative}.rightside{display:none;width:50%;right:0}.selected{border:2px dashed #00f;border-radius:4px}.progressBarBase{border-bottom:2px solid #000;border-image-slice:0 0 10 0;display:inline-block}.progressBarBase.stalled{-o-border-image:repeating-linear-gradient(-45deg,#ff0,#ff0 4px,#000 0 8px) 2;border-image:repeating-linear-gradient(-45deg,#ff0,#ff0 4px,#000 0 8px) 2}.switch{position:relative;display:inline-block;width:30px;height:17px}.switch input{display:none}.slider{cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#ccc}.slider,.slider:before{position:absolute;transition:.4s}.slider:before{content:"";height:10px;width:10px;left:4px;bottom:4px;background-color:#fff;color:#fff}input:checked+.slider{background-color:#2196f3}input:focus+.slider{box-shadow:0 0 1px #2196f3}input:checked+.slider:before{transform:translateX(10px)}.slider:after{color:#000;display:block;position:absolute;transform:translate(-50%,-50%);left:50%;top:50%}.slider.text_abs_mod:after{content:"abs"}input:checked+.slider.text_abs_mod:after{content:"mod"}.slider.text_full_part:after{content:"full"}input:checked+.slider.text_full_part:after{content:"part"}div.overflow{overflow-y:auto}icon-base.researched{border:2px solid #000;border-radius:4px}icon-base.researching{border:2px dashed green;border-radius:4px}span.button{border:2px solid #000;border-radius:4px}.inline{display:inline}.sem_removed{display:none}.tutStep{border:2px solid red}.tutStep,.tutTarget{z-index:2000;isolation:isolate;position:relative}.tutTarget{border:2px dashed red}.tutTarget.recipeDisabled{-webkit-filter:saturate(1);filter:saturate(1)}.tutTarget.recipeEnabled{-o-border-image:repeating-linear-gradient(90deg,red,red 1px,transparent 0,transparent 2px,green 0,green 3px,transparent 0,transparent 4px);border-image:repeating-linear-gradient(90deg,red,red 1px,transparent 0,transparent 2px,green 0,green 3px,transparent 0,transparent 4px);border-image-slice:16;border-image-width:2px 0}.tutTarget.recipeEnabled:after{content:"";top:0;position:absolute;-o-border-image:repeating-linear-gradient(180deg,transparent 0,transparent 1px,green transparent 1px,green 2px,transparent 0,transparent 3px,red 0,red 4px);border-image:repeating-linear-gradient(180deg,transparent 0,transparent 1px,green transparent 1px,green 2px,transparent 0,transparent 3px,red 0,red 4px);border-image-slice:16;border-image-width:0 2px}.tutHighlight.tutHighlight{border:3px ridge #0f0;border-radius:6px}.cmd_label{font-size:2em}#commands .content{border:2px dashed #000}.isCrafting .animTarget,.isMining .animTarget{-webkit-animation-name:testXform;animation-name:testXform}.isCrafting,.isMining{border:1px dashed #00f}@-webkit-keyframes testXform{0%{border-color:#00f;top:0;height:100%;width:100%;left:0;background:rgba(25,25,25,.5)}to{border-color:#00f;top:100%;height:0%;left:0;width:100%;background:hsla(0,0%,78.4%,.5)}}@keyframes testXform{0%{border-color:#00f;top:0;height:100%;width:100%;left:0;background:rgba(25,25,25,.5)}to{border-color:#00f;top:100%;height:0%;left:0;width:100%;background:hsla(0,0%,78.4%,.5)}}hr.bus{border-top:2px dashed #daa520;border-bottom:2px dashed #ae841a}.inActiveOption{opacity:.5}.recipeBreak{font-size:1.5rem}',""]),e.exports=t}},[[0,13,32,29,17,30,31,14,15,16,18,19,20,21,22,23,24,25,26,27,28,33,34,35,36,37,38,9,1,8,10,4,11,6,12,5,2,3]]]);
//# sourceMappingURL=app~ea1f58e8.a36a0e36abd38093d766.bundle.map