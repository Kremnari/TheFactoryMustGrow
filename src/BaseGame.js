import {IgorUtils as IgorJs} from "IgorJs/main"
import * as CONFIG from './Config'


//* these two setup the base game data,
// possibly combine them to a single function
//
export const newGame = () => {
  IgorJs.globalObject = {
    land: {
      total: 100,
      used: 0,
      complexity: 0,
      res_patches: 1,
      res_patch_used: 0,
      fac_block_costs: {
        factory: 100,
        bus: 100,
        research: 100,
      }
    },
    scanning: {
      nextCost: 100,
      currentCost: 0
    },
    attackWaves: {
      nextTimer: 100,
      nextStrength: 100,
      currentTimer: 0,
    }
  }
  setupIgor()
}
export const loadGame = (saveData) => {
  IgorJs.globalObject = saveData.global
  setupIgor()
}
//* This sets up the references Igor needs to run
const setupIgor = () => {
  IgorJs.addObjectTickFunction("FactoryBlocksBase", (td, obj) => { tickBase(td, obj) })
  IgorJs.finalize({
    ticker: {
      ticks_perSec: CONFIG.TICKS_PER_SECOND,
      ticks_maxPhase: cONFIG.TICKS_MAX_PHASE
    }
  })
}

//* saves data, should eventually take an object with a save(json) function 
export const save = () => {
  return 
}
export const game = {
  new: newGame,
  load: loadGame,
  save: saveGame,
}


//SMELL
//This should be split among the individual objects,
// and probably moved to Function() calls
const tickBase = (tickData, facBlocks) => {
    if(tickData.ticks%100) { return }
    if(facBlocks?.offenses?.machines.radar?.count) {
      this.globals.scanning.currentCost += facBlocks.offenses.machines.radar.count * 1
      if(this.globals.scanning.currentCost>=this.globals.scanning.nextCost) {
        this.globals.scanning.currentCost -= this.globals.scanning.nextCost
        this.globals.scanning.nextCost += 20
        //NYI generate land /resource patch and enemies
        this.globals.land.total += 10
        this.globals.land.res_patches = Math.floor(this.globals.land.total/100)

      }
    }
    if(facBlocks?.defenses?.machines.turret?.count) {
      //next wave
      if(this.globals.attackWaves.currentTimer>this.globals.attackWaves.nextTimer) {
        this.globals.attackWaves.nextTimer = this.globals.attackWaves.nextTimer ^ 1.2
        this.globals.attackWaves.currentTime = 0
        //Process some attack
      } else {
        this.globals.attackWaves.currentTimer++
      }
    }
}
