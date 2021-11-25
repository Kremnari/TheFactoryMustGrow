import {mgrs} from "managers"
import $ from "jquery"

let steps = [0, 0.1, 0.2, 0.3, 0.4, 0.9 //Intro ..5
            ,1, 1.1, 1.2 //Basic info ..8
            ,2, 2.1, 2.2, 2.3, 2.4 //  ..13
            ,3, 3.1, 3.2, 3.21, 3.3, 3.4, 3.5, 3.6  // ..21
              , 3.7, 3.75, 3.8, 3.81, 3.82, 3.9, 3.91  // ..28
            ,4, 4.1, 4.2, 4.3, 4.4  // ..33
              , 4.41, 4.411, 4.42, 4.43, 4.44, 4.45, 4.452, 4.46  //  ..41
              , 4.5, 4.51, 4.52, 4.53, 4.54, 4.55, 4.6 // ..48
            ,5, 5.05, 5.1, 5.15, 5.20, 5.25, 5.30, 5.35, 5.4, 5.42, 5.45 // ..55
              , 5.5, 5.55, 5.6, 5.65, 5.7, 5.75, 5.8, 5.85, 5.9, 5.91 // ..62
            ,6, 6.05, 6.055, 6.06, 6.065, 6.07, 6.075, 6.08, 6.085, 6.09, 6.095, 6.096 // ..69
              , 6.1, 6.15, 6.16, 6.17, 6.18 // ..73
            ,100]
window.jq = $
let __
class tutorial {
  atStep = 0
  tutClicks = 0
  constructor() {
    __ = this
    this.stepNum = (i) => {return steps[i || this.atStep]}
  }
  start(baseApp) {
    this.baseApp = baseApp
    if(!this.baseApp.globals.activeFeatures.tutorial.step) {
      this.baseApp.globals.activeFeatures.tutorial = {step: 0}
    }
    this.atStep = this.baseApp.globals.activeFeatures.tutorial.step
    $("#tutorial").addClass("Block")
    //$("#tut_button").hide()
    this.active = true
    $("#tut_button").on('click', () => { this.nextStep()})
    this.setStep(steps[this.atStep])
  }
  jump(baseApp) {
    $("#tut_button").hide()
    if(!this.active) { this.start(baseApp); return }
    this.atStep = this.baseApp.globals.activeFeatures.tutorial.step
    this.setStep(steps[this.atStep])
  }
  nextStep() {
    console.log('step')
    $(".tutHighlight").removeClass("tutHighlight")
    $(".tutStep").removeClass("tutStep").off("click")
    $("#tut_button").hide()
    $("#tut_pos").removeClass(["top", "bottom"]).addClass('center')
    this.gameWait = null
    __.tutText("")
    setTimeout( ()=> {
      this.setStep(steps[++this.atStep])
    }, 10)
  }
  tutStep(selector) { $(selector).addClass("tutStep");}
  tutTarget(selector) {
    if(selector) {
      $(selector).addClass("tutTarget")
    } else {
      $(".tutTarget").removeClass("tutTarget")
    }
  }
  tutHighlight(selector) { $(selector).addClass("tutHighlight") }
  tutText(text) { $("#tut_text").html(text) }
  tutButton(text) {
    $("#tut_button").html(text).show()
    this.setTutClick()
  }
  clearTut() {
    $(".tutStep").removeClass("tutStep").off("click")
    $("#tut_button").off("click")
    $(".tutHighlight").removeClass("tutHighlight")
    $("#tutorial").removeClass("Block")
    this.active = false
    this.baseApp.globals.activeFeatures.tutorial = false
    this.baseApp.autoSave()
  }
  setTutClick(num = 0) {
    this.tutClicks = num
    $(".tutStep").on('click', ()=>{
      if(--this.tutClicks>0) {
        //console.log("not there yet")
        return
      }
      this.nextStep()
    })
  }
  gameWait = null
  checkConditions() {
    //When aurelia does an update
    if(!this.gameWait) return
    switch(this.gameWait.type) {
      case "playerInv":
        let total = 0
        if(!this.gameWait.excludeInv) {
          total = this.baseApp.globals.player.inv.items.reduce( (acc, x) => {
            return x.name==this.gameWait.name ? acc+x.count : acc
          }, 0)
        }
        if(this.gameWait.buffered) {
          total = this.baseApp.globals.player.workshop.entities.reduce((acc, id) => {
            let obj = this.baseApp.IgorJs.getObjId(id)
            if(obj.name==this.gameWait.buffered) {
              let buffer = this.baseApp.IgorJs.getObjId(obj.buffers.in)
              buffer.items.forEach((item) => {
                if(item.name==this.gameWait.name) {
                  acc += item.count
                }
              })
            }
            return acc
          }, total)
        }
        switch(this.gameWait.compare) {
          case "min":
            if(total>=this.gameWait.count) this.waitComplete()
            break;
          case "max":
            if(total<=this.gameWait.count) this.waitComplete()
            break;
          default:
            if(total==this.gameWait.count) this.waitComplete()
        }
        break;
      case "techComplete":
        if(this.baseApp.globals.research[this.gameWait.name]?.complete) this.waitComplete()
        break;
      case "gameState":
        if(this.gameWait.validator(Object.walkPath(this.baseApp, this.gameWait.path))) {
          this.waitComplete()
        }
        break;
      default:
        console.warn("type handling undeclared:"+this.gameWait.type)
        break;
    }
  }
  waitComplete() {
    this.gameWait = null
    $("#tutorial").show()
    this.nextStep();
  }
  hide() {    $("#tutorial").hide()  }
  show() {    $("#tutorial").show()  }
  setStep(num) {
    //console.log("running step: "+num)
    this.baseApp.globals.activeFeatures.tutorial.step = steps.indexOf(num)
    switch(num) {
      case 0:
        //lego
        __.tutText("The Factory Must Grow")
        __.tutButton("Let's build it")
        break;
      case 0.1:
        __.tutText("This alpha is about the mechanics, most everything else is slated to be improved")
        __.tutButton("I won't judge!")
        break;
      case 0.2:
        __.tutText("You can cancel the tutorial by clicking the 'X' in the upper right corner")
        __.tutButton("Just don't condescend me, and we'll be fine")
        break;
      case 0.3:
        __.tutText("This button expands the navigation menu.")
        __.tutHighlight(".fa-level-up-alt")
        __.tutButton("...In case I forget what the icons mean.")
        break;
      case 0.4:
        __.tutText("This menu has a number of options, including a subscription to my mailing list. ")
        __.tutHighlight(".fa-bars")
        __.tutButton("Maybe I'll want to stay updated...")
        break;
      case 0.9: 
        __.tutStep("#resources")
        $("#tut_pos").addClass("top")
        __.tutText("You can mine (click) these by hand")
        __.tutButton("Got it")
        break;
      case 1:
        __.tutStep("#resources icon-base[title='stone']")
        __.tutText("Mine 5 stone")
        __.gameWait = {name:"stone", count: 5, type:"playerInv"}
        break;
      case 1.1:
        __.tutText("Machines will be used for the bulk of your production.")        
        __.tutButton("Which are the machines?")
        break;
      case 1.2:
        __.tutText("Machines have a red 'M' at the bottom of their icon")
        __.tutButton("So many options")
        break;
      case 2:
        __.tutText("Now build a furnace to melt metal to plates")
        __.tutStep("#recipes icon-base[title='stone-furnace']")
        this.gameWait = {name:"stone-furnace", count: 1, type:"playerInv"}
        break;
      case 2.1:
        __.tutText("Clicking on the furnace in your inventory will add it to your production machines")
        __.tutStep("#inventoryList icon-base[title='stone-furnace']")
        this.setTutClick()
        break;
      case 2.2:
        //$("#playerControls h4:contains('Workshop')").addClass("tutStep")
        //$("#facBlockControls h5:contains('Manufacturing')").addClass("tutStep")
        __.tutStep(".navEntities")
        this.setTutClick()
        break;
      case 2.3:
        __.tutStep("#machines .entityList icon-base[title='stone-furnace']")
        this.setTutClick()
        break;
      case 2.4:
        __.tutText("For your machines, you must set a recipe.<br>Lets start with iron plates")
        __.tutStep("#recipeSelect icon-base[title='iron-plate']")
        this.setTutClick()
        break;
      case 3:
        __.tutText("Now head back and mine 5 iron ore")
        __.tutStep(".navHome")
        this.setTutClick()
        break;
      case 3.1:
        __.tutStep("#resources icon-base[title='iron-ore']")
        this.gameWait = {name:"iron-ore", count: 5, type:"playerInv"}
        break;
      case 3.2:
        __.tutText("Good, let's turn that ore into plates!")
        __.tutButton("Back to my furnace I go")
        break;
      case 3.21:
        $("#tutorial").hide()
        __.tutStep(".navEntities")
        this.setTutClick()
        break;
      case 3.3:
        __.tutStep(".showRecipe icon-base[title='iron-ore']")
        this.setTutClick(5)
        break;
      case 3.4:
        $("#tutorial").show()
        __.tutText("Now watch your furnace produce the plates")
        __.tutButton("At least it's faster than paint drying")
        break;
      case 3.5:
        __.tutStep(".showRecipe icon-base[title='iron-plate']")
        this.gameWait = {name:"iron-plate", count:5, type:"playerInv"}
        break;
      case 3.6:
        __.tutText("Mining by hand takes a while, lets get a mining-drill set up")
        __.tutButton("I can dig it")
        break;
      case 3.7:
        mgrs.baseApp.view.set({type: 'view', which: 'main', what: 'home'})
        mgrs.baseApp.view.set({type: 'scope', which: 'tooltip', what: mgrs.data.recipe["burner-mining-drill"] })
        $("#recipes icon-base[title='burner-mining-drill']").addClass('tutTarget')
        __.tutText("A mining drill requires the following:<br>1 gear, a furnace and 1 plate<br>build away")
        __.tutButton("Hi ho, it's off to work I go")
        break;
      case 3.75:
        $("#tutorial").hide()
        this.gameWait = {name:"burner-mining-drill", count: 1, type:"playerInv"}
        break;
      case 3.8:
        $(".tutTarget").removeClass("tutTarget")
        $("#tutorial").show()
        __.tutText("A mining drill can produce resources automatically.\nAdd it to your machines and lets take a look at it")
        __.tutButton("I'll see you shortly")
        break;
      case 3.81:
        //DEBUG this doesn't quite show up
        $("#tutorial").hide()
        __.tutStep("inventory icon-base[title='burner-mining-drill']")
        __.setTutClick()
        break;
      case 3.82:
        __.tutStep(".navEntities")
        __.gameWait = {type:"gameState", path: "view.ctrl.main", validator: (val) => {return val=="entities"}}
        __.setTutClick()
        break;
      case 3.9:
        __.tutStep("#machines .entityList icon-base[title='burner-mining-drill']")
        this.setTutClick()
        break;
      case 3.91:
        $("#tutorial").show() 
        __.tutText("Now select iron to begin automagical mining")
        __.tutStep(".minable-resources icon-base[title='iron-ore']")
        this.setTutClick()
        break;
      case 4:
        __.tutHighlight(".upgrades-infopane icon-base[title='iron-chest']")
        __.tutText("Each item buffer can only hold so much.  Add iron chests to increase that capacity")
        __.tutButton("Useful to not have to babysit")
        this.setTutClick()
        break;
      case 4.1:
        __.tutHighlight(".upgrades-infopane icon-base[title='inserter']")
        __.tutText("Item buffers can be improved with inserters to create some basic automation")
        __.tutButton("Too bad I can't watch them move back and forth like some other game I know")
        this.setTutClick()
        break;
      case 4.2:
        mgrs.baseApp.view.set({type: 'view', which: 'main', what: 'home'})
        mgrs.baseApp.view.set({type: 'scope', which: 'tooltip', what: mgrs.data.recipe["lab"] })
        __.tutText("These paltry machines are a start, but won't hold you forever.<br>Keep expanding, but you're next goal should be a research lab.")
        $("#recipes icon-base[title='lab']").addClass('tutTarget')
        __.tutButton("The Factory...Is Growing...")
        __.setTutClick()
        break;
      case 4.3: 
        $("#tutorial").hide()
        __.gameWait = {name:"lab", count: 1, type:"playerInv", compare: "min"}
        break;
      case 4.4:
        $(".tutTarget").removeClass("tutTarget")
        __.tutStep("#inventoryList icon-base[title='lab']")
        __.setTutClick()
        break;
      case 4.41:
          //This step could be skippable
        __.tutStep(".navEntities")
        __.gameWait = {type:"gameState", path: "view.ctrl.main", validator: (val) => {return val=="entities"}}
        __.setTutClick()
        break;
      case 4.411:
        __.tutStep("#machines .entityList icon-base[title='lab']")
        __.setTutClick()
        break;
      case 4.42:
        $("#tutorial").show()
        __.tutText("This is a research lab.  You will need to add 'science packs' for it to consume to process research.")
        __.tutButton("Are these machines or magic?")
        break;
      case 4.43:
        __.tutText("I was going to tell you to make 5, but for that comment make 10  of the 'automation science packs'")
        __.tutButton("*grumble*")
        break;
      case 4.44:
        mgrs.baseApp.view.set({type: 'view', which: 'main', what: 'home'})
        this.baseApp.view.set({type: 'scope', which: 'tooltip', what: mgrs.data.recipe["automation-science-pack"] })
        $("#tutorial").hide();
        $("#recipes icon-base[title='automation-science-pack']").addClass('tutTarget')
        __.gameWait = {name:"automation-science-pack", count: 10, type:"playerInv", buffered:"lab", compare:"min"}
        break;
      case 4.45:
        $("#tutorial").show();
        $(".tutTarget").removeClass("tutTarget")
        __.tutText("Now go back to your lab and add the science packs")
        mgrs.baseApp.view.unset({which: 'showingEntity'})
        __.tutStep(".navEntities")
        __.gameWait = {type: "gameState", path: "view.ctrl.main", validator: (val) => {return val=="entities"}}
        break;
      case 4.452:
        __.hide()
        __.tutStep(".entityList icon-base[title='lab']")
        __.setTutClick();
        break;
      case 4.46:
        __.tutStep(".labInput icon-base[title='automation-science-pack']")
        //$("crafting-infopane .showRecipe icon-base[title='iron-ore']").addClass('tutStep')
        __.gameWait = {name:"automation-science-pack", count:5, type:"playerInv", buffered: "lab", compare: "min", excludeInv: true}
        break;
      case 4.5:
        __.tutText("Good, now lets put those to use.")
        __.tutStep(".navTechs")
        __.setTutClick()
        break;
      case 4.51:
        __.tutText("This tab allows you to direct technology research.<br>We should start with automation")
        __.tutButton("I hope there's more than this")
        break;
      case 4.52:
        __.tutText("More techs will become available with each research")
        __.tutStep("#technologies icon-base[title='automation']")
        __.setTutClick()
        break;
      case 4.53:
        $("#tutorial").hide()
        __.tutStep("#StartResearch")
        __.gameWait = {name:"automation", type:"techComplete"}
        break;
      case 4.54:
        __.tutText("You can now start automating some equipment construction with the new assembling machine.")
        __.tutButton("Time to expand my labs")
        break;
      case 4.55:
        mgrs.baseApp.view.set({type: 'view', which: 'main', what: 'research'})
        __.tutText("Your next goal is to research FactoryBlocks")
        __.tutStep("#technologies icon-base[title='facBlocks']")
        __.setTutClick()
        break;
      case 4.6:
        $("#tutorial").hide()
        __.tutTarget("#technologies icon-base[title='facBlocks']")
        __.gameWait = {name: "facBlocks", type:"techComplete"}
        break;
      case 5:
        __.tutTarget(false)
        $("#tutorial").show()
        __.tutText("Factory Blocks are the core of this game, constantly producing the mass of materials you need")
        __.tutStep(".fa-object-ungroup")
        __.setTutClick()
        break;
      case 5.05:
        __.tutHighlight(".facBlockStats")
        __.tutText("The upper section gives stats about what you can build.<br>At the moment, these are just for show.")
        __.tutButton("continue")
        break;
      case 5.1:
        __.tutHighlight(".newFacBlock")
        __.tutText("There are four different factory blocks, each with their own focus.")
        __.tutButton("continue")
        break;
      case 5.15:
        __.tutText("The first step is to add a Resource Patch to begin your material exploits.<br>Give it a name to remember it by.")
        __.tutStep(".newFacBlock.resBlock")
        __.setTutClick()
        break;
      case 5.20:
        __.tutStep(".resBlockItem:eq(0)")
        __.setTutClick(2)
        break;
      case 5.25:
        __.tutText("This is a resource patch.  It's signifies a secured resource deposit")
        __.baseApp.globals.player.inv.items.push({name: "stone", count: 20})
        __.baseApp.globals.player.inv.items.push({name: "transport-belt", count: 5})
        __.baseApp.globals.player.inv.items.push({name: "burner-mining-drill", count: 1})
        __.tutButton("continue")
        break;
      case 5.30:
        __.tutStep("#resBlock_foundation")
        __.tutText("The foundation consumes the exponential costs for the building")
        __.setTutClick()
        break;
      case 5.35:
        __.tutStep("#resBlock_miners")
        __.tutText("After creating a foundation, you can build the drill. Future updates will allow different buildings")
        __.setTutClick()
        break;
      case 5.4:
        __.tutStep(".resBlock_setResource")
        __.tutText("You can set the resource being mined with this.<br>I'd suggest iron ore to start")
        __.setTutClick()
        break;
      case 5.42:
        __.hide()
        // Validator just makes sure it exists
        __.gameWait = {type: "gameState", path:"view.$scope.showingBlock.patchProperties.resource", validator: (value)=>{return typeof value == 'string'}}
        break;
      case 5.45:
        __.show()
        __.tutHighlight(".resBlock.connection")
        __.tutText("A resource patch is great, but to make use of its materials, we will need to connect a bus from here")
        __.tutButton("How do we establish a bus line?")
        break;
      case 5.5:
        __.tutStep(".fa-object-ungroup")
        __.tutText("Let's go establish one of those now.")
        __.setTutClick()
        break;
      case 5.55:
        __.tutStep(".newFacBlock.busLine")
        __.tutText("You should know what to do")
        __.setTutClick()
        break;
      case 5.6:
        __.tutStep(".busLineItem:eq(0)")
        __.setTutClick(2)
        break;
      case 5.65:
        __.tutText("Welcome to a bus line.  Its purpose is to transport items between factory blocks.")
        __.tutButton("continue")
        break;
      case 5.7:
        __.tutHighlight("#busLine_sources_add")
        __.tutHighlight("#busLine_drains_add")
        $("#tutorial").addClass("bottom")
        __.tutText("The bus line needs access points before connections can be made")
        __.tutButton("continue")
        break;
      case 5.75:
        __.tutHighlight(".busLine_expandProcessing")
        $("#tutorial").addClass("bottom")
        __.tutText("To actually process items, the bus line needs inserters")
        __.tutButton("continue")
        break;
      case 5.8:
        __.tutHighlight(".busLine_tut_inProgress")
        __.tutText("Items 'on the belt' are shown here, and will be deposited to the 'drains' in time")
        __.tutButton("continue")
        break;
      case 5.85:
        __.tutText("Here's some free stuff, add an access point and expand the processing for both the source and drain.")
        __.baseApp.globals.player.inv.items.push({name: "inserter", count: 8})
        __.baseApp.globals.player.inv.items.push({name: "iron-chest", count: 8})
        __.baseApp.globals.player.inv.items.push({name: "transport-belt", count: 10})
        __.tutButton("Gee thanks!")
        break;
      case 5.9:
        $("#tutorial").hide()
        __.tutHighlight(".busLine_expandProcessing")
        __.tutHighlight(".busLineTut_addAccessPoint")
        __.tutStep(".fa-object-ungroup")
        __.setTutClick()
        break;
      case 5.91:
        __.tutStep(".resBlockItem:eq(0)")
        __.setTutClick(2)
        break;
      case 6:
        __.show()
        __.tutStep(".resBlock.connection")
        __.tutText("Now that we are back to your resource block, click and select the connection")
        __.setTutClick()
        break;
      case 6.05:
        __.hide()
        __.gameWait = {type: "gameState", path: "view.$scope.showingBlock.connections.drains[0]", validator: (val) => {return this.baseApp.IgorJs.getObjId(val)?.connections.sources[0]}}
        break;
      case 6.055:
        __.show()
        __.tutText("Now that the resource block is connected, your bus line will acquire its output and transfer it")
        __.tutButton("continue")
        break;
      case 6.06:
        __.tutText("Your bus line doesn't have drains, blocks to send the resources to.<br>So now to build a factory Block!")
        __.tutStep(".fa-object-ungroup")
        __.setTutClick()
        break;
      case 6.065:
        __.hide()
        __.tutStep(".newFacBlock.facBlock")
        __.setTutClick()
        break;
      case 6.07:
        __.tutStep(".facBlockItem:eq(0)")
        __.setTutClick(2)
        break;
      case 6.075:
        __.show()
        __.tutHighlight(".bufferRow")
        __.tutText("This row provides information on the connections and buffers to bus lines")
        __.tutButton("continue")
        break;
      case 6.08:
        __.tutHighlight(".bufferRow .fa-creative-commons-sa")
        __.tutText("The internal buffer shows items that are built and used within this factory block")
        __.tutButton("continue")
        break;
      case 6.085:
        __.tutHighlight(".productionLines:eq(0)")
        __.tutText("Factory Blocks are built upon Factory Lines, a set of similar buildings producing the same thing.")
        __.tutButton("continue")
        break;
      case 6.09:
        __.tutHighlight(".fa-plus-square")
        __.tutHighlight(".setBuildingType")
        __.tutText("Before you can add buildings to a factory line, you need to select a building type and prep spaces")
        __.tutButton("I should start with a furnace to process ores")
        __.baseApp.globals.player.inv.items.push({name: "stone-furnace", count: 2})
        break;
      case 6.095:
        __.hide()
        __.tutHighlight("")
        __.gameWait = {
          type: "gameState"
          ,path: "view.$scope.showingBlock.factoryLines[0]"
          ,validator: (val) => {
            let obj = this.baseApp.IgorJs.getObjId(val)
            return obj.buildingType && obj.prepped>0
          }}
        break;
      case 6.096:
        __.show()
        __.tutStep(".setRecipe")
        __.tutText("With a building designated, you can then select the recipe it builds and add the buildings when there are available spaces")
        __.setTutClick()
        break;
      case 6.1:
        __.hide()
        __.tutStep(".setRecipe")
        __.gameWait = {
          type: "gameState"
          ,path: "view.$scope.showingBlock.factoryLines[0]"
          ,validator: (val) => {
            let obj = this.baseApp.IgorJs.getObjId(val)
            return !!obj.recipe
          }
        }
        break;
      case 6.15:
        __.show()
        __.tutStep(".facBlockIn")
        __.tutText("What's next is to establish an input connection, and watch some magic happen")
        __.setTutClick()
        break;
      case 6.16:
        __.hide()
        __.gameWait = {
          type: "gameState"
          ,path: "view.$scope.showingBlock.connections.sources"
          ,validator: (val) => {
            let buffer = __.baseApp.IgorJs.getObjId(val[0])
            return buffer?.connections.drains[0]
          }
        }
        break;
      case 6.17:
        __.show()
        __.tutHighlight(".facBlockOut")
        __.tutText("The factory block will now produce materials as they available.<br>You can select an output bus, or just click the icon to collect the items")
        __.tutButton("continue")
        break;
      case 6.18:
        mgrs.baseApp.view.set({type: 'view', which: 'main', what: 'facBlocks'})
        __.tutHighlight(".newFacBlock.techBlock")
        __.tutText("A tech block is in development so a bus can provide science packs. It shall follow the same principles outlined here")
        __.tutButton("The Factory Game...Is Growing...")
        break;
      case 100:
        $("#tutorial").show()
        __.tutText("End of tutorial...so far")
        __.tutButton("But now what...?")
        break;
      default:
        this.clearTut();
        this.baseApp.globals.activeFeatures.tutorial = false
        break;
    }
  }
  //NYI - for running a step using a json object
  runStep(json) {
    json.block ? $(".tutorial").addClass("Block") : $(".tutorial").removeClass("Block")
    $(json.highlight).css("z-index", 2000)
  }
}
export const Tutorial = new tutorial();
mgrs.tut = Tutorial
