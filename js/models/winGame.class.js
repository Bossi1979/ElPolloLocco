class WinGame extends DrawableObject {
    x = 0;
    y = 0;
    width = 720;
    height = 480;
    index = 0;
    win_game_audio = this.setMuteableAudio('./audio/victory.mp3');
    IMAGES_WIN = [
        './img/9_intro_outro_screens/game_over/game over!.png',
        './img/9_intro_outro_screens/game_over/game over.png',
    ]


    constructor() {
        super();
        this.loadImage(this.IMAGES_WIN[0]);
        this.animate();
    }


    /**
     * It sets a repeating interval to check game events and play
     * audio and draw images accordendly.
     */
    animate() {
        this.setStopableInterval(() => this.playGameOver(), 5000);
    }


    /**
     * Plays the game over animations and exits the game if the game is over,
     * or plays the game over images if the last level has been won.
     */
    playGameOver() {
        if (this.gameOver()) this.exitGame();
        else if (this.lastLevelWon()) playGameOverImages();
    }


    /**
     * Checks whether the game is over by evaluating whether the current index is
     * greater than or equal to 2 and the current level is equal to 5.
     * 
     * @returns {boolean} true if the game is over, false otherwise
     */
    gameOver() {
        return this.index >= 2 && aLevel == 5;
    }


    /**
     * Exits the game by resetting the level to 1 and calling the exitGame() function.
     */
    exitGame() {
        aLevel = 1;
        exitGame();
    }


    /**
     * Checks whether the player has won the last level by evaluating whether the
     * end boss is dead, the current index is less than 2, and the current level is 5.
     * 
     * @returns {boolean} true if the last level is won, false otherwise
     */
    lastLevelWon() {
        return world.level.endBoss[0].isDead() && this.index < 2 && aLevel == 5;
    }


    /**
     * Plays the game over images by loading the next image in the IMAGES_WIN array,
     * playing the win game audio, and incrementing the index by 1.
     */
    playGameOverImages() {
        this.loadImage(this.IMAGES_WIN[this.index]);
        this.win_game_audio.play();
        this.index += 1;
    }
}