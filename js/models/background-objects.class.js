class BackgroundObject extends MoveableObject {
    height = 480;
    width = 720;


    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
    }
}