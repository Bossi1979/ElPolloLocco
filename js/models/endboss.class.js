class Endboss extends MoveableObject {
    x = 3500;
    y = 180;
    height = 1045 * 0.25;
    width = 1217 * 0.25;
    speed = 15;
    turn = false;
    idleMode = true;
    attackModus = false;
    dead_sound_index = 0;
    hit_endboss_sound = this.setMuteableAudio('./audio/hit_endboss.mp3');
    attack_sound = this.setMuteableAudio('./audio/ES_Chicken Cluck 6 - SFX Producer.mp3');
    dead_sound = this.setMuteableAudio('audio/boss_dead.mp3');

    IMAGES_WAIT = [
        './img/4_enemie_boss_chicken/1_walk/G1.png',
    ]

    IMAGES_WALKING = [
        './img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/4_enemie_boss_chicken/1_walk/G3.png',
        './img/4_enemie_boss_chicken/1_walk/G4.png',
    ]

    IMAGES_ALERT = [
        './img/4_enemie_boss_chicken/2_alert/G5.png',
        './img/4_enemie_boss_chicken/2_alert/G6.png',
        './img/4_enemie_boss_chicken/2_alert/G7.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G9.png',
        './img/4_enemie_boss_chicken/2_alert/G10.png',
        './img/4_enemie_boss_chicken/2_alert/G11.png',
        './img/4_enemie_boss_chicken/2_alert/G12.png',
    ]

    IMAGES_ATTACK = [
        './img/4_enemie_boss_chicken/3_attack/G13.png',
        './img/4_enemie_boss_chicken/3_attack/G14.png',
        './img/4_enemie_boss_chicken/3_attack/G15.png',
        './img/4_enemie_boss_chicken/3_attack/G16.png',
        './img/4_enemie_boss_chicken/3_attack/G17.png',
        './img/4_enemie_boss_chicken/3_attack/G18.png',
        './img/4_enemie_boss_chicken/3_attack/G19.png',
        './img/4_enemie_boss_chicken/3_attack/G20.png',
    ]

    IMAGES_HURT = [
        './img/4_enemie_boss_chicken/4_hurt/G21.png',
        './img/4_enemie_boss_chicken/4_hurt/G22.png',
        './img/4_enemie_boss_chicken/4_hurt/G23.png',
    ]

    IMAGES_DEAD = [
        './img/4_enemie_boss_chicken/5_dead/G24.png',
        './img/4_enemie_boss_chicken/5_dead/G25.png',
        './img/4_enemie_boss_chicken/5_dead/G26.png',
    ]

    IMAGES_DEAD_END = [
        './img/4_enemie_boss_chicken/5_dead/G26.png',
    ]


    constructor() {
        super();
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.dead_sound.playrate = 8;
        this.animate();
    }


    /**
     * It sets a repeating interval to check game events and play
     * audio and draw images accordendly.
     */
    animate() {
        this.setStopableInterval(() => this.playEndBossAnimation(), 150);
        this.setStopableInterval(() => this.playAttack(), 50);
    }


    /**
     * Pauses the sounds hit and dead of the endboss.
     */
    pauseSounds() {
        this.hit_endboss_sound.pause();
        this.dead_sound.pause();
    }


    /**
     * Plays the appropriate animation for the end boss character based on its current state.
     * If the end boss is dead, it plays the dead animation and sound.
     * If the end boss is hurt, it plays the "it hurts" animation and sound and change its speed.
     * If the end boss is alerted, it plays the alert animation.
     * If the end boss is hurted and the character is behind it, it moves left, otherwise it moves right while playing the walking animation.
     */
    playEndBossAnimation() {
        this.pauseSounds();
        if (this.isDead()) this.playDeadAnimation();
        else if (this.isHurt()) this.playItHurts();
        else if (this.isAlerted()) this.playAnimation(this.IMAGES_ALERT);
        else if (this.isHurted()) {
            this.playAnimation(this.IMAGES_WALKING);
            if (this.characterIsBehind()) this.moveLeft();
            else if (!pause) this.moveRight();
        }
    }


    /**
     * Checks if the end boss character is dead.
     * 
     * @returns {boolean} Returns true if the character is dead and the game is not paused, 
     */
    isDead() {
        return super.isDead() && !pause;
    }


    /**
     * Plays the dead animation of the end boss character and its corresponding sound if the
     * sound index is less than 10.
     */
    playDeadAnimation() {
        this.deadAnimation(12);
        if (this.dead_sound_index < 10) this.playDeadSound();
    }


    /**
     * Plays the dead sound of the end boss character and increments the dead sound index.
     */
    playDeadSound() {
        this.dead_sound.play();
        this.dead_sound_index++;
    }


    /**
     * Checks if the end boss character is hurt.
     * 
     * @returns {boolean} Returns true if the character is hurt and the game is not paused, otherwise false. 
     */
    isHurt() {
        return this.itHurts() && !pause;
    }


    /**
     * Plays the "it hurts" animation of the end boss character, its corresponding sound and change its speed.
     */
    playItHurts() {
        this.playAnimation(this.IMAGES_HURT);
        this.hit_endboss_sound.play();
        this.speed = 15 + Math.random() * 30;
    }


    /**
     * Checks if the end boss character is in an alerted state.
     * 
     * @returns {boolean} Returns true if the character is in an alerted state and the game is not paused,
     * otherwise false.
     */
    isAlerted() {
        return (this.idleMode && this.energy == 100 && !this.attackModus) && !pause;
    }


    /**
     * Checks if the end boss character is hurted.
     * 
     * @returns {boolean} Returns true if the character is hurted and the game is not paused, otherwise false. 
     */
    isHurted() {
        return (this.energy < 100 && !this.itHurts() && !this.attackModus) || world.character.isDead() && !pause;
    }


    /**
     * Checks if the game character is behind the end boss character.
     * 
     * @returns {boolean} Returns true if the game character is not dead, is not behind the end boss character
     * and the game is not paused, otherwise false. 
     */
    characterIsBehind() {
        return !world.isBehind() && !world.character.isDead() && !pause;
    }


    /**
     * Moves the endboss to the left and sets the other direction flag to false.
     */
    moveLeft() {
        super.moveLeft();
        this.otherDirection = false;
    }


    /**
     * Moves the endboss to the right and sets the other direction flag to true.
     */
    moveRight() {
        super.moveRight();
        this.otherDirection = true;
    }


    /**
     * Plays the attack sound and animation for the endboss.
     * It first pauses the attack sound and then checks if the attack mode is active.
     * If the attack mode is active, it plays the attack sound and animation.
     */
    playAttack() {
        this.attack_sound.pause();
        if (this.attackModusActive()) {
            this.attack_sound.play();
            this.playAnimation(this.IMAGES_ATTACK);
        }
    }


    /**
     * Checks if the attack mode is active or not.
     *
     * @returns {boolean} True if attack mode is active, false otherwise.
     */
    attackModusActive() {
        return this.attackModus && !this.isDead() && !world.character.isDead() && !pause;
    }
}


