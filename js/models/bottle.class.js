class Bottle extends MoveableObject {
    x;
    y;
    height = 400 * 0.25;
    width = 400 * 0.25;


    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
    }
}