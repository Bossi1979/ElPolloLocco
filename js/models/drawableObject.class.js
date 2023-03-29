let intervalIds = [];
let allSoundsIds = [];
class DrawableObject {
    x;
    y;
    height;
    width;
    img;
    imageCache;
    currentImage = 0;
    percentage = 0;

    constructor() {
        this.imageCache = {}
    }


    /**
     * Load an image from a given path. 
     * Create a new Image object.
     * 
     * @param {string} path - The path to the image file.
     */
    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementById('image') <img id='image'>.
        this.img.src = path;
    }


    /**
     * Draw the image onto a canvas context.
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas context to draw the image on.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    /**
     * Draw a rectangular frame around the character, chicken, or end boss object on a canvas context.
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas context to draw the frame on.
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof ChickenSmall || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }


    /**
     * Load an array of images and store them in an image cache.
     * 
     * @param {Array<string>} arr - The array of image paths to load. 
     */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    /**
     * Determine the index of the image to display based on the percentage completion of a
     * statusbar.
     * 
     * @param {number} percentage - The percentage completion of the game level, from 0 to 100. 
     * @returns {number} The index of the image to display.
     */
    resolveImageIndex(percentage) {
        if (percentage == 100) return 5;
        else if (percentage > 79) return 4;
        else if (percentage > 59) return 3;
        else if (percentage > 39) return 2;
        else if (percentage > 19) return 1;
        else return 0;
    }


    /**
     * Sets the percentage of the character's status bars and updates the corresponding image.
     * 
     * @param {number} percentage - The percentage of health, ranging from 0 to 5.
     */
    setPercentage(percentage, statusbar) {
        this.percentage = percentage;// => 0....5
        let path = statusbar[this.resolveImageIndex(this.percentage)];
        this.img = this.imageCache[path];
    }


    /**
     * Set a stoppable interval that executes a function at a specified time interval.
     * Add the interval ID to an array of interval IDs for future reference.
     * 
     * @param {Function} fn - The function to execute.
     * @param {number} time - The time interval between function executions.
     */
    setStopableInterval(fn, time) {
        let intervalId = setInterval(fn, time);
        intervalIds.push(intervalId);
    }


    /**
     * Create a muteable audio object from a given audio file path.
     * Add the audio object to an array of all sound objects for future reference.
     * 
     * @param {string} path - The file path of the audio file to load.
     * @returns {HTMLAudioElement} - The audio object created from the given audio file. 
     */
    setMuteableAudio(path) {
        let audio = new Audio(path);
        allSoundsIds.push(audio);
        return audio;
    }
}