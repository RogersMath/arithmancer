import enemyAbilities from './enemyAbilities.json';

const enemyTypes = [
    { name: 'Grunt', baseHP: 2, basePower: 1, baseCountdown: 10 },
    { name: 'Brute', baseHP: 4, basePower: 2, baseCountdown: 12 },
    { name: 'Speeder', baseHP: 1, basePower: 1, baseCountdown: 8 },
    { name: 'Tank', baseHP: 6, basePower: 1, baseCountdown: 15 },
    { name: 'Mage', baseHP: 3, basePower: 2, baseCountdown: 11 }
];

function generateEnemy(stage) {
    const typeIndex = Math.floor(Math.random() * enemyTypes.length);
    const type = enemyTypes[typeIndex];
    const abilityIndex = Math.floor(Math.random() * enemyAbilities.length);
    const ability = enemyAbilities[abilityIndex];

    return {
        type: type.name,
        vulnerability: Math.floor(Math.random() * 20 * stage) + 1,
        hp: type.baseHP + Math.floor(stage / 2),
        power: type.basePower + Math.floor(stage / 3),
        countdown: type.baseCountdown - Math.floor(stage / 2),
        ability: ability
    };
}

export { enemyTypes, generateEnemy };
