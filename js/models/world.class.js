class World {
    character = new Character();
    statusBarHealth = new StatusbarHealth();
    statusBarCoin = new StatusbarCoin();
    statusBarBottle = new StatusbarBottle();
    statusBarEndboss = new StatusbarEndboss();
    actualLevel = new ActualLevel();
    lostGame = new LostGame();
    winGame = new WinGame();
    nextLevel = new NextLevel();
    throwableObject = [];
    throwableObjects = new ThowableObject();
    drawableObject = new DrawableObject();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    animationFrame;
    background_audio = this.drawableObject.setMuteableAudio('./audio/ES_Mexican Standoff - Walt Adams.mp3');
    rooster_audio = this.drawableObject.setMuteableAudio('./audio/rooster.mp3');


    constructor(canvas, keyboard) {
        this.background_audio.volume = 0.05;
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }


    /**
    * Sets the world of a character object to the current object instance of world.
    */
    setWorld() {
        this.character.world = this;
    }


    /**
     * Start the background music and to set an interval for the game events.
     */
    run() {
        this.startBackgroundMusic();
        this.setChecksGameEvents();
    }


    /**
     * this function starts the background music as loop.
     */
    startBackgroundMusic() {
        this.background_audio.loop = true;
        this.background_audio.play();
    }


    /**
     * this function set interval to check the game events.
     */
    setChecksGameEvents() {
        this.drawableObject.setStopableInterval(() => {
            this.throwableObjects.checkThowableObjects();
            this.throwableObjects.checkBottleHitBoss();
            this.statusBarBottle.checkBottleCollectable();
            this.statusBarCoin.checkCoinCollectable();
            this.checkEndbossNear();
        }, 200);
        this.drawableObject.setStopableInterval(() => {
            this.checkCharacterHitEnemy();
            this.checkCollisions();
        }, 80);
    }


    /**
     * this checks if the character is alive.
     * @returns - true if the character is not dead.
     */
    characterIsAlive() {
        return !this.character.isDead();
    }


    /**
     * this function creates a bottle object.
     * @returns - a bottle object.
     */
    createBottleObject() {
        return new ThowableObject(this.character.x + 75, this.character.y + 100);
    }


    /**
     * Checks for collisions between the character and enemies, as well as the character and the end boss.
     * If a collision occurs, the character's health is decreased by 5 and the status bar health is updated.
     */
    checkCollisions() {
        this.checkCollidingWithEnemy();
        this.checkCollidingWithEndboss();
    }


    /**
     * Checks for collisions between the character and enemies.
     * If a collision occurs, the character's health is decreased by 5 and the status bar health is updated.
     */
    checkCollidingWithEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.checkCollisionsWithEnemies(enemy)) {
                this.character.hit(5);
                this.statusBarHealth.setPercentage(this.character.energy, this.statusBarHealth.STATUSBAR_HEALTH_IMAGES);
            }
        });
    }


    /**
     * Checks for collisions between the character and the end boss.
     * If a collision occurs, the character's health is decreased by 5 and the status bar health is updated.
     */
    checkCollidingWithEndboss() {
        if (this.checkCollisionsWithEndboss()) {
            this.level.endBoss[0].attackModus = true;
            this.character.hit(5);
            this.statusBarHealth.setPercentage(this.character.energy, this.statusBarHealth.STATUSBAR_HEALTH_IMAGES);
        } else if (!pause) {
            this.level.endBoss[0].attackModus = false;
        }
    }


    /**
    * Checks for collisions between the character and enemies.
    * 
    * @returns {boolean} - true if a collision occurs between the character and an enemy, false otherwise.
    */
    checkCollisionsWithEnemies(enemy) {
        return this.character.isColliding(enemy) && !enemy.dead && !pause && !this.level.endBoss[0].isDead();
    }


    /**
    * Checks for collisions between the character and endboss.
    * 
    * @returns {boolean} - true if a collision occurs between the character and the endboss, false otherwise.
    */
    checkCollisionsWithEndboss() {
        return this.character.isColliding(this.level.endBoss[0]) && !pause && !this.level.endBoss[0].isDead();
    }


    /**
     * Checks if the character is hitting any enemies and marks them as dead if true.
     */
    checkCharacterHitEnemy() {
        let i = 0;
        this.level.enemies.forEach((enemy) => {
            if (this.character.isHitting(enemy)) {
                enemy.dead = true;
                i++
            }
        });
    }


    /**
     * Checks if the character is behind the end boss 
     * 
     * @returns {boolean} true if the character is behind the end boss, false otherwise. 
     */
    isBehind() {
        return this.character.x > this.level.endBoss[0].x + this.level.endBoss[0].width / 2;
    }


    /**
     * Draws the game objects onto the canvas, and repeatedly calls itself using requestAnimationFrame
     * to create an animation effect. This function also translates the canvas to simulate a camera panning effect.
     */
    async draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        await this.drawBackgroundObjects();
        await this.drawOpponents();
        this.drawThrowableObjects();
        this.ctx.translate(-this.camera_x, 0); // back
        this.drawFixedObjects();
        this.drawLevelEndImage();
        this.ctx.translate(this.camera_x, 0); // forwards
        this.drawCharacterIfAlive();
        this.ctx.translate(-this.camera_x, 0);
        this.drawableObject.drawFrame(this.ctx);
        if (!pause) this.restartDrawing();
    }


    /**
    * Asynchronously draws background objects on the canvas.
    */
    async drawBackgroundObjects() {
        await this.addObjectsToMap(this.level.backgroundObjects);
        await this.addObjectsToMap(this.level.clouds);
        await this.addObjectsToMap(this.level.bottles);
        await this.addObjectsToMap(this.level.coins);
    }


    /**
     * Asynchronously draws opponents on the canvas.
     */
    async drawOpponents() {
        await this.addObjectsToMap(this.level.enemies);
        await this.addObjectsToMap(this.level.endBoss);
    }


    /**
     * Draws thowableObjects on the canvas.
     */
    drawThrowableObjects() {
        this.addObjectsToMap(this.throwableObject);
    }


    /**
     * Draws fixed Objects to canvas.
     */
    drawFixedObjects() {
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.actualLevel);
        this.addToMap(this.statusBarEndboss);
    }


    /**
     * Draws the level end images on the canvas, including the lost, win, and next level images if necessary.
     */
    drawLevelEndImage() {
        this.drawLostImageIfNecessary();
        this.drawWinImageIfNecessary();
        this.drawNextLevelImageIfNecessary();
    }


    /**
     * Draws the lost game image on the canvas if the character is really dead.
     */
    drawLostImageIfNecessary() {
        if (this.character.realyDead) {
            this.addToMap(this.lostGame);
        }
    }


    /**
     * Draws the win game image on the canvas if the end boss is really dead and the current level is the last level.
     */
    drawWinImageIfNecessary() {
        if (this.level.endBoss[0].realyDead && aLevel == 5) {
            this.addToMap(this.winGame);
        }
    }


    /**
     * Draws the next level image on the canvas if the end boss is really dead and the current level is not the last level.
     */
    drawNextLevelImageIfNecessary() {
        if (this.level.endBoss[0].realyDead && aLevel < 5) {
            this.addToMap(this.nextLevel);
        }
    }


    /**
     * Draws the character on the canvas if the character is not really dead.
     */
    drawCharacterIfAlive() {
        if (!this.character.realyDead) {
            this.addToMap(this.character);
        }
    }

    /**
     * Restarts the drawing animation frame.
     */
    restartDrawing() {
        let self = this;
        this.animationFrame = requestAnimationFrame(function () {
            self.draw();
        });
    }


    /**
     * Adds multiple objects to the map asynchronously.
     * @param {Array<Object>} objects - The objects to be added to the map.
     */
    async addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }


    /**
    * Adds a moving object to the game map, and flips it horizontally if it is moving in the opposite direction.
    * @param {object} mo - The moving object to add to the map.
    */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        // mo.drawFrame(this.ctx); //Draws a frame on the canvas using the provided canvas context.
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    /**
    * Flips an image horizontally.
    * @param {Object} mo - The image object to be flipped.
    */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    /**
    * Reverses the horizontal flip of an image that was previously flipped using the flipImage() method.
    * @param {Object} mo - The image object to be unflipped.
    */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }


    /**
    * Checks if the end boss is near the character, and updates the boss's energy level accordingly.
    */
    checkEndbossNear() {
        if (this.character.x + 300 > this.level.endBoss[0].x && this.level.endBoss[0].energy > 99) {
            this.rooster_audio.play();
            this.level.endBoss[0].energy = 99;
        }
    }


    /**
    * Removes an object from an array at a specified index.
    * 
    * @param {Array} obj - The array to remove the object from.
    * @param {number} index - The index of the object to remove.
    */
    removeObject(obj, index) {
        obj.splice(index, 1);
    }


    /**
    * Stops the animation and clears the canvas.
    */
    stopAnimation() {
        cancelAnimationFrame(this.animationFrame);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.level = {};
    }
}