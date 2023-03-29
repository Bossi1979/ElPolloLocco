class Chicken extends MoveableObject {
    x = 720 + Math.random() * 2500;
    y = 365;
    height = 243 * 0.25;
    width = 248 * 0.25;
    dead;
    soundIndex = 0;
    hit_chicken_audio = this.setMuteableAudio('./audio/ES_Chicken Squawk 2 - SFX Producer.mp3');

    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ]

    IMAGES_DEAD = [
        './img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ]


    constructor() {
        super();
        this.loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.speed = 0.21 + Math.random() * 0.5;
        this.applyGravity();
        this.animate();
    }


    /**
     * The animate function pauses the hit_chicken_audio and starts five stoppable intervals
     * for moving left, playing walking animation, playing jumping animation, playing dead animation, and jump.
     */
    animate() {
        this.hit_chicken_audio.pause();
        this.setStopableInterval(() => this.moveLeft(), 1000 / 60);
        this.setStopableInterval(() => this.playWalking(), 200);
        this.setStopableInterval(() => this.playJumping(), 200);
        this.setStopableInterval(() => this.playDead(), 200);
        this.setStopableInterval(() => this.moveJump(), 200);
    }


    /**
     * The playJumping function plays the walking animation if the chicken is jumping.
     */
    playJumping() {
        if (this.isJumping()) this.playAnimation(this.IMAGES_WALKING);
    }


    /**
     * The moveJump function randomly allows the chicken to jump if it can jump.
     */
    moveJump(){
        if (this.canJump()) this.randomAllowToJump();
    }


    /**
     * The canJump function checks if the chicken is not above ground and not dead.
     * 
     * @returns {boolean} - Returns true if the chicken is not above ground and not dead.
     */
    canJump() {
        return !this.isAboveGround() && !this.dead;
    }


    /**
     * The randomAllowToJump function generates a random number between 0 and 1 and
     * allows the chicken to jump if the number is greater than 0.8.
     */
    randomAllowToJump() {
        let random = Math.random();
        if (random > 0.8) this.jump();
    }


    /**
     * The isJumping function checks if the chicken is above ground and not dead.
     * 
     * @returns {boolean} - Returns true if the chicken is above ground and not dead. 
     */
    isJumping() {
        return this.isAboveGround() && !this.dead;
    }


    /**
     * The moveLeft function moves the chicken to the left if it is not dead.
     */
    moveLeft() {
        if (this.IsNotDead()) super.moveLeft();
    }


    /**
     * The isDead function checks if the chicken is dead and the game is not paused.
     * @returns {boolean} - Returns true if the chicken is dead and the game is not paused.
     */
    isDead() {
        return this.dead && !pause;
    }


    /**
     * The playDeadAudio function plays the hit_small_chicken_audio and increments the soundIndex.
     */
    playDeadAudio() {
        this.hit_chicken_audio.play();
        this.soundIndex++;
    }
}