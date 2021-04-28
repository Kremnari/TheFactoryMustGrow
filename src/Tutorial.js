import {mgrs} from "managers"
import $ from "jquery"

let steps = [0, 0.1, 0.2, 0.3, 0.4, 0.9 //Intro ..3
            ,1, 1.1, 1.2 //Basic info ..6
            ,2, 2.1, 2.2, 2.3, 2.4 //  ..11
            ,3, 3.1, 3.2, 3.21, 3.3, 3.4, 3.5, 3.6  // ..19
              , 3.7, 3.75, 3.8, 3.81, 3.9, 3.91  // ..25
            ,4, 4.1, 4.2, 4.3, 4.4  // ..30
              ,4.41, 4.42, 4.43, 4.44, 4.45  //  ..35
              ,4.5, 4.51, 4.52
            //
            ,100]
window.jq = $
let __
console.log($().jquery)
class tutorial {
  atStep = 0
  tutClicks = 0
  constructor() {
    __ = this
  }
  start() {
    $("#tutorial").addClass("Block")
    $("#tut_button").click( () => { this.nextStep()})
    this.setStep(steps[this.atStep])
  }
  jumpTo(stepID) {
    this.atStep = steps.indexOf(stepID)
    this.start()    
  }
  nextStep() {
    $(".tutStep").removeClass("tutStep").off("click")
    $("#tut_button").hide()
    $("#tut_text").text("")
    setTimeout( ()=> {
      this.setStep(steps[++this.atStep])
    }, 10)
  }
  setStep(num) {
    //console.log("running step: "+num)
    switch(num) {
      case 0:
        //lego
        $("#tut_text").text("The Factory Must Grow")
        $("#tut_button").text("Let's build it").show()
        break;
      case 0.1:
        $("#tut_text").text("This alpha is about the mechanics, most everything else is slated to be improved")
        $("#tut_button").text("I won't judge!").show()
        break;
      case 0.2:
        $("#tut_text").text("You can cancel the tutorial by clicking the 'X' in the upper right corner")
        $("#tut_button").text("Just don't condescend me, and we'll be fine").show()
        break;
      case 0.3:
        __.tutText("This button shows a verbose navligation menu.")
        __.tutStep(".fa-level-up-alt")
        __.tutButton("In case I forget what the icons mean.")
        break;
      case 0.4:
        __.tutText("This menu has a number of options, including a subscription to my mailing list. ")
        __.tutStep()
        __.tutButton("Maybe I'll want to stay updated...")
        break;
      case 0.9: 
        $("#resources").addClass("tutStep")
        $("#tut_text").text("You can mine (click) these by hand")
        $("#tut_button").text("Got it").show()
        break;
      case 1:
        mgrs.Ticker.resume()
        $("#resources icon-base[title='stone']").addClass("tutStep")
        $("#tut_text").text("Mine 5 stone")
        this.playerInvWait({name:"stone", count: 5})
        break;
      case 1.1:
        $("#tut_text").text("Machines will be used for the bulk of your production.")        
        $("#tut_button").text("Which are the machines?").show()
        break;
      case 1.2:
        $("#tut_text").text("Machines have a red 'M' at the bottom of their icon")
        $("#tut_button").text("So many options").show()
        break;
      case 2:
        $("#tut_text").text("Now build a furnace to melt metal to plates")
        $("#recipes icon-base[title='stone-furnace']").addClass("tutStep")
        this.playerInvWait({name:"stone-furnace", count: 1})
        break;
      case 2.1:
        $("#tut_text").text("Clicking on the furnace in your inventory will add it to your production machines")
        $("#inventoryList icon-base[title='stone-furnace']").addClass("tutStep")
        this.setTutClick()
        break;
      case 2.2:
        //$("#playerControls h4:contains('Workshop')").addClass("tutStep")
        //$("#facBlockControls h5:contains('Manufacturing')").addClass("tutStep")
        $(".navEntities").addClass("tutStep");
        $(".navE_Manuf").addClass("tutStep")
        mgrs.baseApp.when({entityPane: 'manuf'}, ()=>{this.nextStep()})
        break;
      case 2.3:
        $("#machines .entityList icon-base[title='stone-furnace']").addClass("tutStep")
        this.setTutClick()
        break;
      case 2.4:
        $("#tut_text").html("For your machines, you must set a recipe.<br>Lets start with iron plates")
        $("crafting-infopane icon-base[title='iron-plate']").addClass("tutStep")
        this.setTutClick()
        break;
      case 3:
        $("#tut_text").text("Now head back and mine 5 iron ore")
        $(".navHome").addClass("tutStep")
        this.setTutClick()
        break;
      case 3.1:
        $("#resources icon-base[title='iron-ore']").addClass("tutStep")
        this.playerInvWait({name:"iron-ore", count: 5})
        break;
      case 3.2:
        $("#tut_text").text("Good, let's turn that ore into plates!")
        $("#tut_button").text("Back to my furnace I go").show()
        break;
      case 3.21:
        $("#tutorial").hide()
        $(".navEntities").addClass("tutStep")
        mgrs.baseApp.when({entityPane: 'manuf'}, ()=>{this.nextStep()})
        break;
      case 3.3:
        $("crafting-infopane .showRecipe icon-base[title='iron-ore']").addClass('tutStep')
        this.setTutClick(5)
        break;
      case 3.4:
        $("#tutorial").show()
        $("#tut_text").text("Now watch your furnace produce the plates")
        $("#tut_button").text("At least it's faster than paint drying").show()
        break;
      case 3.5:
        $("crafting-infopane .showRecipe icon-base[title='iron-plate']").addClass('tutStep')
        this.playerInvWait({name:"iron-plate", count:5})
        break;
      case 3.6:
        $("#tut_text").text("Mining by hand takes a while, lets get a mining-drill set up")
        $("#tut_button").text("I can dig it").show()
        break;
      case 3.7:
        mgrs.baseApp.viewPane.main = "home"
        mgrs.baseApp.tooltip = mgrs.rec.recipeList["burner-mining-drill"]
        $("#recipes icon-base[title='burner-mining-drill']").addClass('tutTarget')
        $("#tut_text").html("A mining drill requires the following:<br>3 gears, a furnace and 3 plates<br>build away")
        $("#tut_button").text("Hi ho, it's off to work I go").show()
        break;
      case 3.75:
        $("#tutorial").hide()
        this.playerInvWait({name:"burner-mining-drill", count: 1})
        break;
      case 3.8:
        $(".tutTarget").removeClass("tutTarget")
        $("#tutorial").show()
        $("#tut_text").text("A mining drill can produce resources automatically.\nAdd it to your machines and lets take a look at it")
        $("#tut_button").text("I'll see you shortly").show()
        break;
      case 3.81:
        //DEBUG this doesn't quite show up
        $("#tutorial").hide()
        $(".navEntities").addClass("tutStep")
        $(".navE_Mining").addClass("tutStep")
        this.playerInvWait({name:"burner-mining-drill", count:0})
        //mgrs.baseApp.when({entityPane: 'mining'}, ()=>{this.nextStep()})
        break;
      case 3.9:
        $("#machines .entityList icon-base[title='burner-mining-drill']").addClass("tutStep")
        this.setTutClick()
        break;
      case 3.91:
        $("#tutorial").show()
        $("#tut_text").text("Now select iron to begin automagical mining")
        $("mining-infopane icon-base[title='iron-ore']").addClass('tutStep')
        this.setTutClick()
        break;
      case 4:
        $("upgrades-infopane icon-base[title='iron-chest']").addClass("tutStep")
        $("#tut_text").text("Each item buffer can only hold so much.  Add iron chests to increase that capacity")
        $("#tut_button").text("Useful to not have to babysit").show()
        this.setTutClick()
        break;
      case 4.1:
        $("upgrades-infopane icon-base[title='inserter']").addClass('tutStep')
        $("#tut_text").text("Item buffers can be improved with inserters to create some basic automation")
        $("#tut_button").text("Too bad I can't watch them move back and forth like some other game I know").show()
        this.setTutClick()
        break;
      case 4.2:
        mgrs.baseApp.viewPane.main = "home"
        mgrs.baseApp.tooltip = mgrs.rec.recipeList["lab"]
        $("#tut_text").html("These paltry machines are a start, but won't hold you forever.<br>Keep expanding, but you're next goal should be a research lab.")
        $("#recipes icon-base[title='lab']").addClass('tutTarget')
        $("#tut_button").text("The Factory...Is Growing...").show()
        this.setTutClick()
        break;
      case 4.3: 
        $("#tutorial").hide()
        this.playerInvWait({name:"lab", count: 1})
        break;
      case 4.4:
        $("#inventoryList icon-base[title='lab']").addClass("tutStep")
        this.setTutClick()
        break;
      case 4.41:
        $(".navEntities").addClass("tutStep")
        $(".navE_Lab").addClass("tutStep")
        $("#machines .entityList icon-base[title='lab']:first").addClass("tutStep")
        __.setTutClick()
        break;
      case 4.42:
        $("#tut_text").text("This is a research lab.  You will need to add [science-packs] for it to consume to process research.")
        __.tutButton("Are these machines or magic?")
        break;
      case 4.43:
        __.tutText("I was going to tell you to make 5, but for that comment make 10 'automation science packs'")
        __.tutButton("*grumble*")
        break;
      case 4.44:
        mgrs.baseApp.viewPane.main = "home"
        mgrs.baseApp.tooltip = mgrs.rec.recipeList["automation-science-pack"]
        __.playerInvWait({name:"automation-science-pack", count: 10})
        break;
      case 4.45:
        __.tutText("Now go back to your lab and add the [science-packs]")
        __.tutStep(".navEntities")
        __.tutStep(".navE_Lab")
        __.tutStep(".labInput icon-base[title='automation-science-pack']")
        break;
      case 4.5:
        __.tutStep(".navTechs")
        break;
      case 4.51:
        __.tutText("This tab allows you to direct technology research.<br>We should start with automation")
        __.tutButton("I hope there's more than this")
        break;
      case 4.52:
        __.tutText("More techs will become available with each research")
        __.tutStep("#technologies icon-base[title='automation']")
        break;
      case 4.53:
        break;
      case 100:
        $("#tut_text").text("End of tutorial...so far")
        $("#tut_button").text("But now what...?").show()
        break;
      default:
        $("#tutorial").hide()
        console.log('default, reset')
        mgrs.baseApp.autoSave()
        break;
    }
  }
  tutStep(selector) {
    $(selector).addClass("tutStep")
  }
  tutText(text) {
    $("tut_text").html(text)
  }
  tutButton(text) {
    $("#tut_button").html(text).show()
    this.setTutClick()
  }
  hide() {
    $(".tutStep").off("click")
    $("#tutorial").removeClass("Block")
    mgrs.baseApp.autoSave()
  }
  setTutClick(num = 0) {
    this.tutClicks = num
    $(".tutStep").click( ()=>{
      if(--this.tutClicks>0) {
        //console.log("not there yet")
        return
      }
      this.nextStep()
    })
  }
  playerInvWait(IS) {
    mgrs.baseApp.player.inv.when(IS, ()=>this.nextStep())
  }
  //NYI - for running a step using a json object
  runStep(json) {
    json.block ? $(".tutorial").addClass("Block") : $(".tutorial").removeClass("Block")
    $(json.highlight).css("z-index", 2000)
  }
}
export const Tutorial = new tutorial();
mgrs.tut = Tutorial
