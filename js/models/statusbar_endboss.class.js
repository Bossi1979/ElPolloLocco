class StatusbarEndboss extends DrawableObject {
    world;
    y = 10;
    x = 521.5;
    height = 158 * 0.30;
    width = 595 * 0.30;
    percentageEndboss = 0;

    STATUSBAR_ENDBOSS_IMAGES = [
        './img/7_statusbars/2_statusbar_endboss/0.png',
        './img/7_statusbars/2_statusbar_endboss/20.png',
        './img/7_statusbars/2_statusbar_endboss/40.png',
        './img/7_statusbars/2_statusbar_endboss/60.png',
        './img/7_statusbars/2_statusbar_endboss/80.png',
        './img/7_statusbars/2_statusbar_endboss/100.png',
    ]


    constructor() {
        super();
        this.loadImages(this.STATUSBAR_ENDBOSS_IMAGES);
        this.setPercentage(100, this.STATUSBAR_ENDBOSS_IMAGES);
    }
}