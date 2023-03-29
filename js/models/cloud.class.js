class Cloud extends MoveableObject {
    height = 1080 * 0.25;
    width = 1920 * 0.25;


    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
        this.speed = 0.05;
        this.moveLeft();
    }
}