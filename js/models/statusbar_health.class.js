class StatusbarHealth extends DrawableObject {
    world;
    y = 10;
    x = 10;
    height = 158 * 0.30;
    width = 595 * 0.30;;
    
    STATUSBAR_HEALTH_IMAGES = [
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
    ]


    constructor() {
        super();
        this.loadImages(this.STATUSBAR_HEALTH_IMAGES);
        this.setPercentage(100, this.STATUSBAR_HEALTH_IMAGES);
    }
}