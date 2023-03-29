class MoveableObject extends DrawableObject {
    speed = 0.2;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    animationIndex = 0;
    realyDead;


    /**
     * Checks if the current object is colliding with the given object.
     * 
     * @param {Object} mo - The object to check collision with. 
     * @returns {boolean} Returns true if there is a collision, false otherwise.
     */
    isColliding(mo) {
        return ((this.x + this.width - 50 >= mo.x && this.y + this.height > mo.y) && (this.x < mo.x) &&
            (this.y + this.height > mo.y)) || ((this.x + 50 <= mo.x + mo.width) &&
                (this.x > mo.x) && this.y + this.height > mo.y);
    }


    /**
     * Checks if the player is hitting a enemy object. Returns true if the player
     * is hitting a enemy, false otherwise.
     * 
     * @returns {boolean} - Returns true if the player is hitting the enemy, false otherwise.
     */
    isHitting(mo) {
        if (this.characterFall()) {
            return (this.x + this.width - 50 > mo.x) && (this.x + 50 < mo.x + mo.width) && (mo.y < this.y + this.height -5); 
        }
        return false
    }


    /**
     * Determines if the character is falling.
     * @returns {boolean} - Returns true if the character is falling, otherwise returns false. 
     */
    characterFall() {
        return this.isAboveGround() && this.speedY < 0
    }


    /**
     * Plays the next image in the given array of images for animation.
     * 
     * @param {Array} images - An array of image paths for the animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length; // let i = 0 % 3;  0, Rest 0
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    /**
     * Increments the x-coordinate of the object's position by its current speed value.
     */
    moveRight() {
        this.x += this.speed;
    }


    /**
     * Decrease the x-coordinate of the object's position by its current speed value.
     */
    moveLeft() {
        this.x -= this.speed;
    }


    /**
     * Makes the Object jump by setting its vertical speed.
     * If the Object is an instance of Chicken, sets the speed to 20, otherwise sets it to 30.
     */
    jump() {
        if (this instanceof Chicken) this.speedY = 15;
        else if (this instanceof Character) this.speedY = 30;
    }


    /**
     * Applies gravity to the game object by reducing its y-coordinate position at a constant rate.
     * This function uses setInterval to repeatedly update the y-coordinate position based on the object's
     * speed and acceleration values.
     */
    applyGravity() {
        setInterval(() => this.applyGravitySettings(), 1000 / 25);
    }


    /**
     * Applies gravity settings to the object.
     */
    applyGravitySettings() {
        if (this.isAboveGroundOrClimb()) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        }
    }


    /**
     * Detects if the object is above ground level and/or the object climb.
     * 
     * @returns - Returns true if the object is above ground level and/or the object climb.
     * Otherwise false.
     */
    isAboveGroundOrClimb() {
        return this.isAboveGround() || this.speedY > 0;
    }


    /**
     * Checks if the object is above ground level.
     * 
     * @returns {boolean} Returns true if the object is above the ground level, false otherwise. 
     */
    isAboveGround() {
        if (this instanceof ThowableObject) return true;
        else if (this instanceof Chicken) return this.y < 365;
        else return this.y < 130;
    }


    /**
     * Decreases the energy of the object by the given amount and sets the last hit time to the
     * current time.
     * 
     * @param {number} lostEnergy - The amount of energy lost.
     */
    hit(lostEnergy) {
        this.energy -= lostEnergy;
        if (this.energy < 0) this.energy = 0;
        else this.lastHit = new Date().getTime();
    }


    /**
     * Checks if the object is dead by verifying if its energy level is zero.
     * 
     * @returns {boolean} - Returns true if the object is dead (energy level is zero), otherwise returns false.
     */
    isDead() {
        return this.energy == 0;
    }


    /**
     * Checks if the object has been hit within the last 0.5 seconds.
     * 
     * @returns {boolean} True if the object has been hit recently, false otherwise.
     */
    itHurts() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 0.5;
    }


    /**
     * Plays a dead animation for a specified number of cycles.
     * 
     * @param {number} cycles - The number of animation cycles to play before switching to 
     * the final dead image.
     */
    deadAnimation(cycles) {
        if (this.animationIndex < cycles) {
            this.playAnimation(this.IMAGES_DEAD);
            this.animationIndex++;
        }
        if (this.animationIndex >= cycles) {
            this.playAnimation(this.IMAGES_DEAD_END);
            this.realyDead = true;
        }
    }



    /**
     * The IsNotDead function checks if the chicken is not dead and the game is not paused.
     * 
     * @returns {boolean} - Returns true if the chicken is not dead and the game is not paused. 
     */
    IsNotDead() {
        return !this.dead && !pause;
    }


    /**
     * The playWalking function plays the walking animation of the chicken if it is not dead.
     */
    playWalking() {
        if (this.IsNotDead()) this.playAnimation(this.IMAGES_WALKING);
    }


    /**
     * The playDead function plays the dead animation and audio if the chicken is dead and soundIndex is 0.
     */
    playDead() {
        if (this.isDead()) {
            if (this.soundIndexIs0()) this.playDeadAudio();
            this.playAnimation(this.IMAGES_DEAD);
        }
    }


    /**
     * The soundIndexIs0 function checks if the soundIndex is 0.
     * 
     * @returns {boolean} - Returns true if the soundIndex is 0. 
     */
    soundIndexIs0() {
        return this.soundIndex == 0;
    }
}