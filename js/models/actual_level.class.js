class ActualLevel extends DrawableObject {
    world;
    y = 50;
    x = 360 - (507 * 0.3 / 2);
    height = 132 * 0.30;
    width = 507 * 0.30;

    LEVEL_IMAGES = [
        './img/Level/level_1.png',
        './img/Level/level_2.png',
        './img/Level/level_3.png',
        './img/Level/level_4.png',
        './img/Level/level_5.png',
    ]


    constructor() {
        super();
        this.loadImages(this.LEVEL_IMAGES);
        this.setLevelImg(aLevel - 1);
    }


    /**
    * Sets the level image for a given level.
    * 
    * @param {number} level - The level for which to set the image.
    */
    setLevelImg(level) {
        let path = this.LEVEL_IMAGES[level];
        this.img = this.imageCache[path];
    }
}