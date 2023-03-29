class Level {
    enemies;
    clouds;
    backgroundObjects;
    bottles;
    coins;
    endBoss;
    level_end_x = 3595; // 719*5 = 3595

    
    constructor(enemies, endBoss, clouds, backgroundObjects, bottles, coins ){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
        this.endBoss = endBoss;
        this.coins = coins;
    }
}


