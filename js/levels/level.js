/**
 * Creates an array of chicken objects containing both standard and small chickens.
 * 
 * @param {number} amountChicken - The number of standard chickens to create.
 * @param {number} amountChickenSmall - The number of small chickens to create.
 * @returns {array} - An array of chicken objects. 
 */
function createChickensLevel(amountChicken, amountChickenSmall) {
    let chickenArray = [];
    for (let i = 0; i < amountChicken; i++) {
        let chicken = new Chicken();
        chickenArray.push(chicken);
    }
    for (let i = 0; i < amountChickenSmall; i++) {
        let chicken = new ChickenSmall();
        chickenArray.push(chicken);
    }
    return chickenArray;
}


/**
 * Creates an array containing an instance of the Endboss class.
 * 
 * @returns {array} - An array containing a single Endboss object. 
 */
function createEndBossLevel() {
    let endBoss = [new Endboss()];
    return endBoss;
}


/**
 * Creates an array of cloud objects with random positions.
 * @param {number} amount - The number of clouds to create.
 * @returns {array} - An array of cloud objects. 
 */
function createClouds(amount) {
    let cloudsArray = [
        new Cloud('./img/5_background/layers/4_clouds/1.png', (- 100 + Math.random() * 400), 5),
        new Cloud('./img/5_background/layers/4_clouds/2.png', (- 100 + Math.random() * 400), 50),
    ];
    for (let i = 0; i < amount - 2; i++) {
        let clouds1 = new Cloud('./img/5_background/layers/4_clouds/1.png',
            (619 * (i + 1) + Math.random() * 400), 5);
        let clouds2 = new Cloud('./img/5_background/layers/4_clouds/2.png',
            (619 * (i + 1) + Math.random() * 400), 50);
        cloudsArray.push(clouds1, clouds2);
    }
    return cloudsArray;
}


/**
 * Creates an array of background objects containing multiple layers.
 * 
 * @param {number} amount - The number of background objects to create. 
 * @returns {array} - An array of background objects. 
 */
function createBackground(amount) {
    let backgroundArray = [];
    for (let i = 0; i < amount + 2; i += 2) {
        let layer1 = new BackgroundObject('./img/5_background/layers/air.png', 719 * (i), 0);
        let layer2 = new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 719 * (i), 0);
        let layer3 = new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 719 * (i), 0);
        let layer4 = new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 719 * (i), 0);
        let layer5 = new BackgroundObject('./img/5_background/layers/air.png', 719 * (i + 1), 0);
        let layer6 = new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 719 * (i + 1), 0);
        let layer7 = new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 719 * (i + 1), 0);
        let layer8 = new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 719 * (i + 1), 0);
        backgroundArray.push(layer1, layer2, layer3, layer4, layer5, layer6, layer7, layer8);
    }
    return backgroundArray;
}


/**
 * Creates an array of bottles with randomized positions.
 * 
 * @param {number} amount - The number of bottles to create. 
 * @returns {array} - An array of bottle objects.
 */
function createBottles(amount) {
    let bottleArray = [];
    for (let i = 0; i < amount; i++) {
        let bottle = new Bottle('./img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
            (520 + (100 * i) + Math.random() * (1700 + (i * -100))), 320);
        bottleArray.push(bottle);
    }
    return bottleArray;
}


/**
 * Creates an array of coins with randomized positions.
 * 
 * @param {number} amount - The number of coins to create. 
 * @returns {array} - An array of coin objects.
 */
function createCoins(amount) {
    let coinsArray = [];
    for (let i = 0; i < amount; i++) {
        let coin = new Coin('./img/8_coin/coin_1.png',
            (520 + (i * 100) + Math.random() * 1700), (200 + Math.random() * 150));
        coinsArray.push(coin)
    }
    return coinsArray;
}