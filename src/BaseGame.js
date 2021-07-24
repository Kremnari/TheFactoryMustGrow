import {IgorUtils as IgorJs} from "IgorJs/main"
import * as CONFIG from './Config'

import * as PlayerWorkshop from './resources/StateDef/PlayerWorkshop'


//* these two setup the base game data,
// possibly combine them to a single function
//
export const newGame = () => {
  IgorJs.setGlobal({
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
    },
    facBlocks: {
      defenses: null,
      defenseBus: null,
      offense: null,
      offenseBus: null,
      buses: [],
      blocks: []
    },
    player: PlayerWorkshop.newPlayer,
    activeFeatures: [],
    version: CONFIG.IDB_SAVE_VERSION
  })
}
export const loadGame = (saveData) => {
  IgorJs.setGlobal(saveData)
}

//* This sets up the references Igor needs to run
const setupIgor = () => {
  //TODO rebuild Igor's object list,
  // but ideally it happens automatically 
  // when loading game object descriptions
  IgorJs.defineObj("#.facBlocks", "factoryBlocksBase")
  IgorJs.defineObj("player", "player")
  IgorJs.addObjectTickFunction("FactoryBlocksBase", (td, obj) => { tickBase(td, obj) })
}

//* saves data, should eventually take an object with a save(json) function 
export const saveGame = (idb) => {
  idb.set("SaveGame_Igor", IgorJs.globalObject)
  console.log('save complete')
}
export const game = {
  new: newGame,
  load: loadGame,
  save: saveGame,
  setup: setupIgor,
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
