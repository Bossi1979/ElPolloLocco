class NextLevel extends DrawableObject {
    x = 219.5;
    y = 140;
    width = 281;
    height = 200;
    index = 0;
    win_game_audio = this.setMuteableAudio('./audio/win.mp3');
    
    IMAGES_NEXT_LEVEL = [
        './img/9_intro_outro_screens/game_over/next_Level3.png',
        './img/9_intro_outro_screens/game_over/next_Level3.png',
    ]


    constructor() {
        super();
        this.loadImage(this.IMAGES_NEXT_LEVEL[0]);
        this.animate();
    }


    /**
     * The animate() method animates the game state after the player defeats the boss. It sets a stoppable interval
     * to check if the current level is completed, and if so, loads the next level image. If the current level is not the last level,
     * it exits the game and starts again. If the end boss is dead, it loads the next level image and plays the win game audio.
     */
    animate() {
        this.setStopableInterval(() => this.playNextLevel(), 2500);
    }


    /**
     * Plays the next level or image based on the current state of the game.
     */
    playNextLevel() {
        if (this.playFinished()) this.startNextLevel();
        else if (this.winLevel()) this.playNextImage();
    }


    /**
     * Checks if the current level has finished.
     * 
     * @returns {boolean} Returns `true` if the current level has finished, `false` otherwise. 
     */
    playFinished() {
        return this.index >= 2;
    }


    /**
     * Start next level of the game.
     */
    startNextLevel() {
        aLevel += 1;
        exitGame();
        startGame();
    }


    /**
     * Determines whether the player has won the current level.
     * 
     * @returns {boolean} Returns `true` if the current level is won, `false` otherwise. 
     */
    winLevel() {
        return world.level.endBoss[0].isDead() && this.index < 2 && aLevel <= 4;
    }


    /**
     * Plays the next image in the game.
     */
    playNextImage() {
        this.loadImage(this.IMAGES_NEXT_LEVEL[this.index]);
        this.win_game_audio.play();
        this.index++;
    }
}