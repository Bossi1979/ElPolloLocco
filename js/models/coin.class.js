class Coin extends MoveableObject {
    x;
    y;
    height = 301 * 0.25;
    width = 300 * 0.25;


    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
    }
}