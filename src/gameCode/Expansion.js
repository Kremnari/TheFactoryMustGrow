import {IgorUtils as IgorJs} from "IgorJs/main"

const Expansion = {}
Expansion.Setup = (event, IgorUtil) => {
    let global = IgorUtil.getNamed("global")
    !global.activeFeatures["offenseBlocks"] && (global.activeFeatures.offenseBlocks = {})
    global.activeFeatures.offenseBlocks.radar = true
    global.scanning = {
        nextCost: 100,
        currentAccum: 0,
        radarCount: 0,
        landsSurveyed: [],
        foundTotal: 0,
        enemyDepth: 0,
        penetrateEnemy: false,
        penetrateDepth: false,
    }
    IgorUtil.addEventHandler("tick", Expansion.RadarTick)
}
Expansion.Setup.Igor_Event = {name: "SetupExpansion", type: "FeatureUpdate"}
Expansion.AddRadar = (obj, Igor) => {
    if(Igor.processTEMP("player.inventory", "inventory.consume", {itemStacks: {name: "radar", count: 1}})) {
        Igor.getNamedObject("global").scanning.radarCount++
    }
}
Expansion.AddRadar.signature = {}
Expansion.AddRadar.CC_provide = "expansion.AddRadar"
Expansion.RadarTick = (obj, Igor) => {
    //# Magic number for how many ticks it takes to scan
    //# also in html
    if(obj.ticks%60) return
    let scan = Igor.getNamedObject("global").scanning
    if(scan.radarCount==0) return
    if(scan.enemyDepth>=5) return
    if(scan.landsSurveyed.length >= 10) return

    scan.currentAccum += scan.radarCount * 10
    if(scan.currentAccum >= scan.nextCost) {
        scan.foundTotal++
        scan.currentAccum -= scan.nextCost
        scan.nextCost *= 2
        //TODO: Move to probabilities storage on Igor
        let possibilities = [
            {item: {type: "empty", strength: false}, weight: 2},
            {item: {type: "enemy", strength: 100*scan.foundTotal}, weight: 4},
            {item: {type: "resource", strength: false}, weight: 1},
        ]
        let probability = possibilities.map((v, i) => Array(v.weight).fill(i)).reduce((c, v) => c.concat(v), []);

        //Random select from probability array
        //TODO: Could change this to a imperative call on Igor Probabilies module
        let land = possibilities[probability[Math.floor((Math.random() * probability.length))]].item;
        land.type=="enemy" && (scan.enemyDepth++);
        scan.enemyDepth==5 && (scan.penetrateEnemy = true)
        scan.landsSurveyed.push(land)
        scan.landsSurveyed.length>=10 && (scan.penetrateDepth = true)
    }
}

IgorJs.defineFeature("Expansion", Expansion)


const Offense = {}
Offense.Setup = (event, IgorUtil) => {
    let global = IgorUtil.getNamed("global")
    !global.activeFeatures["offenseBlocks"] && (global.activeFeatures.offenseBlocks = {})
    global.activeFeatures.offenseBlocks.offenses = true
    global.offense = {
        offenseBots: 0
    }
}
Offense.Setup.Igor_Event = {name: "SetupOffense", type: "FeatureUpdate"}
Offense.AddOffenseBot = (obj, Igor) => {
    if(Igor.processTEMP("player.inventory", "inventory.consume", {itemStacks: {name: "offenseBot", count: 1}})) {
        Igor.getNamedObject("global").offense.offenseBots++
    }
}
Offense.AddOffenseBot.signature = {}
Offense.AddOffenseBot.CC_provide = "offense.AddOffenseBot"
Offense.Attack = (obj, Igor) => {
    let global = Igor.getNamedObject("global")
    let land = global.scanning.landsSurveyed[0]
    if(land.type!="enemy") return
    let diff = land.strength - (global.offense.offenseBots*10)
    
    land.strength = Math.max(diff, 0)
    global.offense.offenseBots = Math.abs(Math.min(0, diff/10))
}
Offense.Attack.signature = {}
Offense.Attack.CC_provide = "offense.Attack"
Offense.Secure = (obj, Igor) => {
    let global = Igor.getNamedObject("global")
    let land = global.scanning.landsSurveyed[0]
    if(land.strength) return Igor.view.warnToast("Enemy still has a presence")
    switch(land.type) {
        case "resource":
            global.land.res_patches++
            break;
        case "enemy":
            global.scanning.enemyDepth--
            global.scanning.penetrateEnemy = false
            break;
    }
    global.land.total += 100
    Igor.view.goodToast("Land secured")
    scan.penetrateDepth = false
    global.scanning.landsSurveyed.shift()
    Igor.view.signaler.signal("updateEnemy")
}
Offense.Secure.signature = {}
Offense.Secure.CC_provide = "offense.Secure"

IgorJs.defineFeature("Offense", Offense)

const Defense = {}
Defense.Setup = (event, IgorUtil) => {
    let global = IgorUtil.getNamed("global")
    !global.activeFeatures["defenseBlocks"] && (global.activeFeatures.defenseBlocks = {})
    global.activeFeatures.defenseBlocks.defense = true
    global.defense = {
        turrets: 0,
        attackWaveTimer: 0,
        nextAttackWave: 100,
    }
    IgorUtil.addEventHandler("tick", Defense.tick)

}
Defense.Setup.Igor_Event = {name: "SetupDefense", type: "FeatureUpdate"}
Defense.addTurret = (obj, Igor) => {
    if(Igor.processTEMP("player.inventory", "inventory.consume", {itemStacks: {name: "turret", count: 1}})) {
        Igor.getNamedObject("global").defense.turrets++
    }
}
Defense.addTurret.signature = {}
Defense.addTurret.CC_provide = "defense.AddTurret"
Defense.tick = (tickdata, Igor) => {
    if(tickdata.ticks%30) return
    let defense = Igor.getNamedObject("global").defense
    if(++defense.attackWaveTimer>=defense.nextAttackWave) {
        Igor.view.warnToast("Attack wave")

        defense.attackWaveTimer = 0
        defense.nextAttackWave = defense.nextAttackWave * 1.2

        let land = Igor.getNamedObject("global").scanning?.landsSurveyed?.[0]
        if(land?.type=="enemy") defense.nextAttackWave *= 0.8
    } else {
        defense.nextAttackSecs = Math.ceil(defense.nextAttackWave - defense.attackWaveTimer)

    }
}
IgorJs.defineFeature("Defense", Defense)