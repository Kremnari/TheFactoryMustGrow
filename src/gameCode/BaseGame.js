import {IgorUtils as IgorJs} from "IgorJs/main"
import * as CONFIG from 'Config'

import * as PlayerWorkshop from 'gameCode/PlayerWorkshop'
import * as ObjectsSource from 'gameCode/GameObjects'
import * as InventoryIgor from 'gameCode/inventory_Igor'
import * as FactoryBlocks from 'gameCode/FactoryBlocks'
import * as Expansion from 'gameCode/Expansion'


//* these two setup the base game data,
// possibly combine them to a single function
//
const newGame = {
    land: {
      total: 100,
      used: 0,
      complexity: 0,
      res_patches: 2,
      res_patches_used: 0,
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
      resBlocks: [],
      buses: [],
      blocks: [],
      techBlocks: []
    },
    player: PlayerWorkshop.newPlayer,
    activeFeatures: {
      tutorial: true
    },
    research: { completed: {}, progressing: null },
    unlocked_recipes: [],
    control: {
      bonusTicks: 0,
    },
    version: CONFIG.IDB_SAVE_VERSION
}
IgorJs.defineObj("#", newGame)
IgorJs.setNamed("player.inventory", "player.inv")
IgorJs.setNamed("research", "research")
IgorJs.setNamed("global", "")
IgorJs.setStatic("config.TICKS_PER_SECOND", CONFIG.TICKS_PER_SECOND)


IgorJs.addEventHandler("gameLoad", function(Igor) {
  let game = IgorJs.getNamed("global")
  if(!game.control) {
    game.control = {
      bonusTicks: 0,
    }
    return
  }
  //Calulate the time between game.control.lastSave and now
  let timeDiff = (new Date()).getTime() - game.control.lastSave
  //Calculate the bonus ticks from config.TICKS_PER_SECOND and milliseconds_per_tick
  let bonusTicks = Math.floor(timeDiff / 1000 * CONFIG.TICKS_PER_SECOND)
  //add bonus ticks to game.control.bonusTicks
  console.log('added: '+bonusTicks)
  game.control.bonusTicks += Math.floor(bonusTicks/20)
  
})
IgorJs.addEventHandler("gameSave", function(Igor) {
  //Set the last save time to now
  let game = IgorJs.getNamed("global")
  game.control.lastSave = (new Date()).getTime()

})
IgorJs.provide_CCC("game.fastForward", (obj, Igor) => {
  let game = Igor.getNamedObject("global")
  if(obj.to.string=="true" && game.control.bonusTicks > 0) {
    game.control.fastForward = true
    Igor.ticker.fastForward()
  } else {
    game.control.fastForward = false
    Igor.ticker.fastForward(false)
  }
}, {to:"string"})
IgorJs.addEventHandler("tick", (td, Igor) => {
  let game = Igor.getNamedObject("global")
  if(game.control.fastForward) {
    game.control.bonusTicks--
    if(game.control.bonusTicks<=0) {
      game.control.fastForward = true
      Igor.ticker.fastForward(false)
      //Just to handle rounding errors
      game.control.bonusTicks = 0
    }
  }

})


//* This sets up the references Igor needs to run
export const setupIgor = () => {
  //TODO rebuild Igor's object list,
  // but ideally it happens automatically 
  // when loading game object descriptions
  //IgorJs.defineObj("#.facBlocks", "factoryBlocksBase")
  //IgorJs.defineObj("player", "player")
  //IgorJs.amendObject("FactoryBlocksBase", {tickFn: (td, obj) => { tickBase(td, obj) } })
  //console.log('setup complete')
}

/*
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
*/