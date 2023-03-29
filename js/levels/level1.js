let level1;


/**
 * Initializes Level 1 of the game.
 * Creates level1 objects. 
 */
async function initLevel1() {
    level1 = new Level(
        createChickensLevel(3, 3),
        createEndBossLevel(),
        createClouds(8),
        createBackground(3),
        createBottles(6),
        createCoins(5),
    );
}






