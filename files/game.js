// Import enemy types and abilities
import { enemyTypes, generateEnemy } from './enemies.js';
import playerUpgrades from './playerUpgrades.json';

// Game state
let gameState = {
    playerHP: 3,
    playerMaxHP: 3,
    playerMana: 10,
    playerMaxMana: 10,
    playerPower: 1,
    currentAttack: 0,
    enemies: [],
    stage: 1,
    isGameOver: false,
    upgrades: [],
    score: 0
};

// Audio
const enemyHitSound = new Audio('assets/enemyHit.mp3');
const playerHitSound = new Audio('assets/playerHit.mp3');

// DOM elements
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const startGameButton = document.getElementById('start-game');
const playerHPDisplay = document.getElementById('player-hp');
const playerManaDisplay = document.getElementById('player-mana');
const playerPowerDisplay = document.getElementById('player-power');
const attackValueDisplay = document.getElementById('attack-value');
const enemyArea = document.getElementById('enemy-area');
const actionButtons = {
    plusOne: document.getElementById('action-plus-one'),
    timesTwo: document.getElementById('action-times-two'),
    divideThree: document.getElementById('action-divide-three')
};

// Event listeners
startGameButton.addEventListener('click', startGame);
actionButtons.plusOne.addEventListener('click', () => performAction('+1'));
actionButtons.timesTwo.addEventListener('click', () => performAction('*2'));
actionButtons.divideThree.addEventListener('click', () => performAction('/3'));

// Game functions
function startGame() {
    startScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    resetGameState();
    spawnEnemy();
    gameLoop();
}

function resetGameState() {
    gameState = {
        playerHP: 3,
        playerMaxHP: 3,
        playerMana: 10,
        playerMaxMana: 10,
        playerPower: 1,
        currentAttack: 0,
        enemies: [],
        stage: 1,
        isGameOver: false,
        upgrades: [],
        score: 0
    };
    updateDisplay();
}

function updateDisplay() {
    playerHPDisplay.textContent = gameState.playerHP;
    playerManaDisplay.textContent = gameState.playerMana;
    playerPowerDisplay.textContent = gameState.playerPower;
    attackValueDisplay.textContent = gameState.currentAttack;
}

function performAction(action) {
    if (gameState.playerMana < 1) return; // Not enough mana

    gameState.playerMana--;

    switch (action) {
        case '+1':
            gameState.currentAttack += 1;
            break;
        case '*2':
            gameState.currentAttack *= 2;
            break;
        case '/3':
            gameState.currentAttack = Math.floor(gameState.currentAttack / 3);
            break;
    }

    if (gameState.currentAttack < 1) gameState.currentAttack = 1;

    updateDisplay();
    checkEnemyVulnerabilities();
}

function spawnEnemy() {
    const enemy = generateEnemy(gameState.stage);
    gameState.enemies.push(enemy);
    renderEnemies();
}

function renderEnemies() {
    enemyArea.innerHTML = '';
    gameState.enemies.forEach((enemy, index) => {
        const enemyCard = document.createElement('div');
        enemyCard.classList.add('enemy-card', 'bg-gray-700', 'p-2', 'rounded');
        enemyCard.innerHTML = `
            <div>Vuln: ${enemy.vulnerability}</div>
            <div>HP: ${enemy.hp}</div>
            <div>Countdown: ${enemy.countdown}</div>
            <div>Ability: ${enemy.ability.name}</div>
        `;
        enemyArea.appendChild(enemyCard);
    });
}

function checkEnemyVulnerabilities() {
    gameState.enemies.forEach((enemy, index) => {
        if (gameState.currentAttack === enemy.vulnerability) {
            enemy.hp -= gameState.playerPower;
            enemyHitSound.play();
            if (enemy.hp <= 0) {
                gameState.enemies.splice(index, 1);
                gameState.score += 10;
            }
        }
    });
    renderEnemies();
}

function gameLoop() {
    if (gameState.isGameOver) return;

    // Mana regeneration
    if (gameState.playerMana < gameState.playerMaxMana) {
        gameState.playerMana = Math.min(gameState.playerMaxMana, gameState.playerMana + 0.2);
    }

    // Decrease enemy countdowns
    gameState.enemies.forEach(enemy => {
        enemy.countdown--;
        if (enemy.countdown <= 0) {
            gameState.playerHP -= enemy.power;
            playerHitSound.play();
            gameState.enemies = gameState.enemies.filter(e => e !== enemy);
        }
    });

    // Check for game over
    if (gameState.playerHP <= 0) {
        gameState.isGameOver = true;
        alert(`Game Over! Final Score: ${gameState.score}`);
        return;
    }

    // Spawn new enemy if needed
    if (gameState.enemies.length < 5 && Math.random() < 0.1) {
        spawnEnemy();
    }

    updateDisplay();
    renderEnemies();

    // Continue the game loop
    setTimeout(gameLoop, 1000);
}

// Initialize the game
updateDisplay();

export { gameState, updateDisplay };
