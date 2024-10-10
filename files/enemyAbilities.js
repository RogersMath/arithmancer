const enemyAbilities = [
    {
        name: "Leadership",
        description: "Adjacent cards do +1 damage.",
        effect: {
            type: "adjacentDamageBoost",
            value: 1
        }
    },
    {
        name: "Shield",
        description: "Reduces incoming damage by 1.",
        effect: {
            type: "damageReduction",
            value: 1
        }
    },
    {
        name: "Regeneration",
        description: "Recovers 1 HP every 10 seconds.",
        effect: {
            type: "healing",
            value: 1,
            interval: 10
        }
    },
    {
        name: "Drain",
        description: "Steals 1 mana from the player on hit.",
        effect: {
            type: "manaDrain",
            value: 1
        }
    },
    {
        name: "Countdown",
        description: "Reduces its vulnerability by 1 every 5 seconds.",
        effect: {
            type: "vulnerabilityReduction",
            value: 1,
            interval: 5
        }
    }
];
