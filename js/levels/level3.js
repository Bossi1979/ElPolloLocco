/**
 * Initializes Level 2 of the game.
 * Creates level1 objects. 
 */
async function initLevel3() {
    level1 = new Level(
        createChickensLevel(12, 6),
        createEndBossLevel(),
        createClouds(8),
        createBackground(3),
        createBottles(7),
        createCoins(5),
    );
}