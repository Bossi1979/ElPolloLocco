class StatusbarCoin extends DrawableObject {
    world;
    y = 50;
    x = 10;
    height = 158 * 0.30;
    width = 595 * 0.30;

    STATUSBAR_COIN_IMAGES = [
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
    ]


    constructor() {
        super();
        this.loadImages(this.STATUSBAR_COIN_IMAGES);
        this.setPercentage(0, this.STATUSBAR_COIN_IMAGES);
    }


    /**
    * Checks if the character has collided with any collectible objects (e.g. coins) in the level,
    * and updates the game status bar accordingly.
    */
    checkCoinCollectable() {
        let index = 0;
        world.level.coins.forEach((coin) => {
            if (world.character.isColliding(coin)) {
                if (world.statusBarCoin.percentage <= 80) {
                    world.statusBarCoin.percentage += 20;
                    world.statusBarCoin.setPercentage(world.statusBarCoin.percentage, world.statusBarCoin.STATUSBAR_COIN_IMAGES);
                    world.removeObject(world.level.coins, index);
                }
            }
            index += 1;
        });
    }
}
