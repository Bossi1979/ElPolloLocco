/**
 * Initializes Level 2 of the game.
 * Creates level1 objects. 
 */
async function initLevel2() {


    level1 = new Level(
        createChickensLevel(6, 6),
        createEndBossLevel(),
        createClouds(8),
        createBackground(3),
        createBottles(6),
        createCoins(5),
    );
}