function pow10(x) {
    let res = new Decimal(1)
    for(let i = 1; i <= x; i++) res = res.times(10)
    return res
}

addLayer("B", {
    name: "Blood", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "B", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#E02800",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Blood", // Name of prestige currency
    baseResource: "Blood Drops", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "b", description: "B: Reset for Blood", onPress() {if (canReset(this.layer)) doReset(this.layer)}},
    ],
    buyables: {
        11: {
            cost(x) { 
                return new Decimal(pow10(x))
            },
            title: "Blood Core",
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            display() {
                let line1="Level: "
                let line2="Effect: "
                if(getBuyableAmount("B", 11) == 0) line1="",line2=line2+"None"
                if(getBuyableAmount("B", 11) == 1) line1='Level: I',line2="Effect: Add 3 Blood Upgrades\n"
                if(getBuyableAmount("B", 11) == 2) line1='Level: II',line2=line2+"Add 3 more Blood Upgrades\n"
                if(getBuyableAmount("B", 11) == 3) line1='Level: III',line2=line2+"Add 3 Blood Milestones\n"
                if(getBuyableAmount("B", 11) == 4) line1='Level: IV'
                if(getBuyableAmount("B", 11) == 5) line1='Level: V'
                if(getBuyableAmount("B", 11) == 6) line1='Level: VI'
                if(getBuyableAmount("B", 11) == 7) line1='Level: VII'
                if(getBuyableAmount("B", 11) == 8) line1='Level: VIII'
                if(getBuyableAmount("B", 11) == 9) line1='Level: IX'
                if(getBuyableAmount("B", 11) == 10) line1='Level: X'
                line1=line1+"\n"
                line2=line2+"\n"
                let line3="Cost: "+this.cost(getBuyableAmount("B", 11))+"\n"
                return line1+line2+line3
            },
            purchaseLimit: new Decimal(10),
        }
    },
    layerShown(){return true}
})
