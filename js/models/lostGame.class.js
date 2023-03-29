class LostGame extends DrawableObject {
    x = 0;
    y = 0;
    width = 720;
    height = 480;
    index = 0;
    loose_audio = this.setMuteableAudio('./audio/loose.mp3');

    IMAGES_LOST = [
        './img/9_intro_outro_screens/game_over/oh_no_you_lost.png',
        './img/9_intro_outro_screens/game_over/you lost.png'
    ]


    constructor() {
        super();
        this.loadImage(this.IMAGES_LOST[0]);
        this.animate();
    }


    /**
     * It sets a repeating interval to check game events and play
     * audio and draw images accordendly.
     */
    animate() {
        this.setStopableInterval(() => this.playGameLost(), 5000);
    }


    /**
     * Draw lost images and play lost sound, if game is lost.
     */
    playGameLost(){
        if (this.gameLost()) {
            this.loadImage(this.IMAGES_LOST[this.index]);
            this.loose_audio.play();
            this.index += 1;
        } else if (this.index >= 2) {
            aLevel = 1;
            exitGame();
        }
    }


    /**
     * Check if the game has been lost.
     * 
     * @returns {boolean} True if the game has been lost, false otherwise. 
     */
    gameLost(){
        return world.character.isDead() && this.index < 2;
    }
}