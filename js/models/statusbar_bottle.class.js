class StatusbarBottle extends DrawableObject {
    world;
    y = 90;
    x = 10;
    height = 158 * 0.30;
    width = 595 * 0.30;

    STATUSBAR_BOTTLE_IMAGES = [
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png',
    ]


    constructor() {
        super();
        this.loadImages(this.STATUSBAR_BOTTLE_IMAGES);
        this.setPercentage(20, this.STATUSBAR_BOTTLE_IMAGES);
    }


    /**
     * Checks if the character has collided with any collectible objects (e.g. bottles) in the level, 
     * and updates the game status bar accordingly.
     */
    checkBottleCollectable() {
        let index = 0;
        world.level.bottles.forEach((bottle) => {
            if (world.character.isColliding(bottle)) {
                if (world.statusBarBottle.percentage <= 80) {
                    world.statusBarBottle.percentage += 20;
                    world.statusBarBottle.setPercentage(world.statusBarBottle.percentage, world.statusBarBottle.STATUSBAR_BOTTLE_IMAGES);
                    world.removeObject(world.level.bottles, index);
                }
            }
            index += 1;
        });
    }


    /**
     * this function update the bottle statusbar
     */
    updateStatusbarBottle() {
        world.statusBarBottle.percentage -= 20;
        world.statusBarBottle.setPercentage(world.statusBarBottle.percentage, world.statusBarBottle.STATUSBAR_BOTTLE_IMAGES);
    }
}