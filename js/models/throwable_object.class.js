class ThowableObject extends MoveableObject {
    x = 175;
    y = 250;
    height = 400 * 0.25;
    width = 400 * 0.25;
    speedY = 30;
    speedX = 20;
    world;
    bottleSplash = false;
    drawableObject = new DrawableObject();
    statusBarBottle = new StatusbarBottle();
    throw_audio = this.drawableObject.setMuteableAudio('./audio/throw.mp3');

    BOTTLE_ROTATION_IMAGES = [
        './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ]
    
    BOTTLE_SPLASH_IMAGES = [
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ]


    constructor(x, y) {
        super();
        this.loadImage('./img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',)
        this.x = x;
        this.y = y;
        this.loadImages(this.BOTTLE_ROTATION_IMAGES);
        this.loadImages(this.BOTTLE_SPLASH_IMAGES);
        this.throw();
    }


    /**
     * Throw the bottle and animate it until it hits the ground or obstacle.
     */
    throw() {
        this.setAxisSpeedsAndApplyGravaty();
        this.setStopableInterval(() => this.playBottle(), 50);
    }


    /**
     * Sets the X and Y speeds of the object to 30 and applies gravity.
     */
    setAxisSpeedsAndApplyGravaty() {
        this.speedY = 30;
        this.speedX = 30;
        this.applyGravity();
    }


    /**
     * Plays the bottle animation based on the current state.
     */
    playBottle() {
        if (this.EndbossNotBehind()) this.playThrowRight();
        else if (this.EndbossIsBehind()) this.playThrowLeft();
        else if (this.canSplash()) this.playSplash();
    }


    /**
     * Checks if the bottle should be thrown to the right.
     * @returns {boolean} True if the bottle should be thrown to the right, false otherwise.
     */
    EndbossNotBehind() {
        return this.y < 295 && !this.bottleSplash && !world.isBehind() && !pause;
    }


    /**
     * Throws the bottle to the right.
     */
    playThrowRight() {
        this.x += 15;
        this.playAnimation(this.BOTTLE_ROTATION_IMAGES);
    }


    /**
     * Checks if the bottle should be thrown to the left.
     * @returns {boolean} True if the bottle should be thrown to the left, false otherwise.
     */
    EndbossIsBehind() {
        return this.y < 295 && !this.bottleSplash && world.isBehind() && !pause;
    }


    /**
     * Throws the bottle to the left.
     */
    playThrowLeft() {
        this.x -= 15;
        this.playAnimation(this.BOTTLE_ROTATION_IMAGES);
    }


    /**
     * Checks if the bottle should splash.
     * @returns {boolean} True if the bottle should splash, false otherwise.
     */
    canSplash() {
        return this.y > 296 && !this.bottleSplash && !pause;
    }


    /**
     * Plays the bottle splash animation.
     */
    playSplash() {
        this.bottleSplash = true;
        this.y = 296;
        this.playAnimation(this.BOTTLE_SPLASH_IMAGES);
    }


    /**
     * this function calls a subfunctions to throw a bottle and update the bottle statusbar, if the 'd' key pressed and
     * the character has as min. one bottle owned and character is alive.
     */
    checkThowableObjects() {
        if (this.checkCanThrow()) {
            this.throwBottle();
            world.statusBarBottle.updateStatusbarBottle();
        }
    }


     /**
     * Checks if the bottle can be thrown by checking if the throw key is pressed,
     * if the player has bottles remaining, and if the character is alive.
     * @returns {boolean} True if the bottle can be thrown, false otherwise.
     */
     checkCanThrow() {
        return this.throwKeyPressed() && this.bottlesOwned() && world.characterIsAlive();
    }


    /**
     * this function call the keyboard.DKEY value.
     * @returns - true if 'd' key on keyboard is pressed.
     */
    throwKeyPressed() {
        return world.keyboard.DKEY;
    }


    /**
     * this function determind, statusbar bottles is not zero.
     * @returns - returns true if statusbar value is greater zero.
     */
    bottlesOwned() {
        return world.statusBarBottle.percentage > 0;
    }


    /**
     * this function throw a bottle at next draw interval of the bottle and play throw audio.
     */
    throwBottle() {
        let bottle = world.createBottleObject();
        this.throw_audio.play();
        world.throwableObject.push(bottle);
    }


    /**
     * Checks if a bottle thrown by the character hits the end boss and updates the end boss's health and bottle status bar.
     */
    checkBottleHitBoss() {
        world.throwableObject.forEach((bottle) => {
            if (world.throwableObjects.endBossHittedByBottle(bottle)) {
                world.level.endBoss[0].hit(15);
                let energy = world.level.endBoss[0].energy;
                world.statusBarEndboss.setPercentage(energy, world.statusBarEndboss.STATUSBAR_ENDBOSS_IMAGES);
            }
            world.throwableObjects.chickenHittedByBottle(bottle);
        });
    }

     /**
     * Checks if a bottle thrown by the character hits the end boss.
     * 
     * @param {Object} bottle - The bottle object being thrown by the character.
     * @returns {boolean} - true if the bottle hits the end boss, false otherwise.
     */
     endBossHittedByBottle(bottle) {
        return world.level.endBoss[0].x < bottle.x &&
            world.level.endBoss[0].x + world.level.endBoss[0].width > bottle.x &&
            world.level.endBoss[0].y + world.level.endBoss[0].height > bottle.y &&
            world.level.endBoss[0].y < bottle.y;
    }


    /**
     * Checks if a bottle thrown by the character hits any chickens (enemies) in the level and marks them as dead if true.
     * 
     * @param {Object} bottle - The bottle object being thrown by the character.
     */
    chickenHittedByBottle(bottle) {
        world.level.enemies.forEach(chicken => {
            if (world.throwableObjects.checkChickenHittedByBottle(chicken, bottle)) chicken.dead = true;
        });
    }


    /**
     * Checks if the chicken has been hit by the bottle.
     * 
     * @param {object} chicken - The chicken object to check.
     * @param {object} bottle - The bottle object to check.
     * @returns {boolean} True if the chicken has been hit by the bottle, false otherwise.
     */
    checkChickenHittedByBottle(chicken, bottle) {
        return chicken.x - 50 < bottle.x && chicken.x + chicken.width > bottle.x &&
            chicken.y + chicken.height > bottle.y && chicken.y - 20 < bottle.y;
    }
}




