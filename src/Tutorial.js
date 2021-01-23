import {mgrs} from "managers"

let steps = [0, "0.1", 1, 2, 3]

class tutorial {
  atStep = 0
  start() {
    $("#tutorial").addClass("Block")
    $("#tut_button").click( () => { this.nextStep()})
    this.setStep(steps[this.atStep])
  }
  nextStep() {
    $(".tutStep").removeClass("tutStep")
    $("#tut_button").hide()
    $("#tut_text").text("")
    this.setStep(steps[++this.atStep])
  }
  setStep(num) {
    console.log("running step: "+num)
    switch(num) {
      case 0:
        $("#tut_text").text("The Factory Must Grow")
        $("#tut_button").text("Let's build it").show()
        break;
      case "0.1": 
        $("#resources").addClass("tutStep")
        $("#tut_text").text("You can mine (click) these by hand")
        $("#tut_button").text("Got it").show()
        break;
      case 1:
        $("#tut_button").hide()
        mgrs.Ticker.resume()
        $("#resources icon-base[title='stone']").addClass("tutStep")
        $("#tut_text").text("Mine 5 stone")
        mgrs.baseApp.player.inv.when({name:"stone", count:5}, ()=>{this.nextStep()})
        break;
      case 2:
        $("#resources icon-base[title='stone']").removeClass("tutStep")

        $("#tut_text").text("Now build a furnace to melt metal to plates")
        $("#recipes icon-base[title='stone-furnace']").addClass("tutStep")
        mgrs.baseApp.player.inv.when({name:"stone-furnace", count: 1}, ()=>{this.nextStep()})
        break;
      default:
        $("#tutorial").hide()
        console.log('default, reset')
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
