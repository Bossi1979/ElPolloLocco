class ChickenSmall extends MoveableObject {
    x = 720 + Math.random() * 2500;
    y = 365;
    height = 243 * 0.25;
    width = 248 * 0.25;
    dead;
    soundIndex = 0;
    hit_small_chicken_audio = this.setMuteableAudio('./audio/hitSmallChicken.mp3');

    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ]

    IMAGES_DEAD = [
        './img/3_enemies_chicken/chicken_small/2_dead/dead.png',
    ]


    constructor() {
        super();
        this.loadImage('./img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.speed = 0.21 + Math.random() * 0.22;
        this.animate();
    }


    /**
     * The animate function pauses the hit_small_chicken_audio and starts three stoppable
     * intervals for moving left, playing walking animation, and playing dead animation.
     */
    animate() {
        this.hit_small_chicken_audio.pause();
        this.setStopableInterval(() => this.moveLeft(), 1000 / 60);
        this.setStopableInterval(() => this.playWalking(), 200);
        this.setStopableInterval(() => this.playDead(), 200);
    }


    /**
     * The moveLeft function moves the chicken to the left if it is not dead.
     */
    moveLeft() {
        if (this.IsNotDead()) super.moveLeft();
    }


    /**
     * The isDead function checks if the chicken is dead and the game is not paused.
     * 
     * @returns {boolean} - Returns true if the chicken is dead and the game is not paused.
     */
    isDead() {
        return this.dead && !pause;
    }


    /**
     * The playDeadAudio function plays the hit_small_chicken_audio and increments the soundIndex.
     */
    playDeadAudio() {
        this.hit_small_chicken_audio.play();
        this.soundIndex++;
    }
}