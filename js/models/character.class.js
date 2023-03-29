class Character extends MoveableObject {
  height = 1200 * 0.25;
  width = 610 * 0.25;
  x = 100;
  y = 130;
  world;
  speed = 5;
  soundIndex = 0;
  time = new Date() / 1000;
  idleMode = false;
  youWin = false;
  walking_sound = this.setMuteableAudio("./audio/running.mp3");
  hurts_sound = this.setMuteableAudio("./audio/hurt.mp3");
  jump_sound = this.setMuteableAudio("./audio/jump.mp3");
  dying_sound = this.setMuteableAudio("./audio/dying.mp3");
  snoring_sound = this.setMuteableAudio("./audio/snoring.mp3");

  IMAGES_WALKING = [
    "./img/2_character_pepe/2_walk/W-21.png",
    "./img/2_character_pepe/2_walk/W-22.png",
    "./img/2_character_pepe/2_walk/W-23.png",
    "./img/2_character_pepe/2_walk/W-24.png",
    "./img/2_character_pepe/2_walk/W-25.png",
    "./img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "./img/2_character_pepe/3_jump/J-31.png",
    "./img/2_character_pepe/3_jump/J-32.png",
    "./img/2_character_pepe/3_jump/J-33.png",
    "./img/2_character_pepe/3_jump/J-34.png",
    "./img/2_character_pepe/3_jump/J-35.png",
    "./img/2_character_pepe/3_jump/J-36.png",
    "./img/2_character_pepe/3_jump/J-37.png",
    "./img/2_character_pepe/3_jump/J-38.png",
    "./img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_IDLE = [
    "./img/2_character_pepe/1_idle/idle/I-1.png",
    "./img/2_character_pepe/1_idle/idle/I-2.png",
    "./img/2_character_pepe/1_idle/idle/I-3.png",
    "./img/2_character_pepe/1_idle/idle/I-4.png",
    "./img/2_character_pepe/1_idle/idle/I-5.png",
    "./img/2_character_pepe/1_idle/idle/I-6.png",
    "./img/2_character_pepe/1_idle/idle/I-7.png",
    "./img/2_character_pepe/1_idle/idle/I-8.png",
    "./img/2_character_pepe/1_idle/idle/I-9.png",
    "./img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_LONG_IDLE = [
    "./img/2_character_pepe/1_idle/long_idle/I-11.png",
    "./img/2_character_pepe/1_idle/long_idle/I-12.png",
    "./img/2_character_pepe/1_idle/long_idle/I-13.png",
    "./img/2_character_pepe/1_idle/long_idle/I-14.png",
    "./img/2_character_pepe/1_idle/long_idle/I-15.png",
    "./img/2_character_pepe/1_idle/long_idle/I-16.png",
    "./img/2_character_pepe/1_idle/long_idle/I-17.png",
    "./img/2_character_pepe/1_idle/long_idle/I-18.png",
    "./img/2_character_pepe/1_idle/long_idle/I-19.png",
    "./img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  IMAGES_HURT = [
    "./img/2_character_pepe/4_hurt/H-41.png",
    "./img/2_character_pepe/4_hurt/H-42.png",
    "./img/2_character_pepe/4_hurt/H-43.png",
  ];

  IMAGES_DEAD = [
    "./img/2_character_pepe/5_dead/D-51.png",
    "./img/2_character_pepe/5_dead/D-52.png",
    "./img/2_character_pepe/5_dead/D-53.png",
    "./img/2_character_pepe/5_dead/D-54.png",
    "./img/2_character_pepe/5_dead/D-55.png",
    "./img/2_character_pepe/5_dead/D-56.png",
  ];

  IMAGES_DEAD_END = ["./img/2_character_pepe/5_dead/D-57.png"];

  IMAMGE_LOST = [
    "./img/9_intro_outro_screens/game_over/oh no you lost!.png",
    "./img/9_intro_outro_screens/game_over/you lost.png",
    "/img/9_intro_outro_screens/game_over/game over.png",
  ];

  IMAGES_FLIGHT = [
    "./img/2_character_pepe/3_jump/J-34.png",
    "./img/2_character_pepe/3_jump/J-34.png",
  ];


  constructor() {
    super().loadImage("./img/2_character_pepe/2_walk/W-21.png");
    this.walking_sound.volume = 0.5;
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_DEAD_END);
    this.loadImages(this.IMAGES_FLIGHT);
    this.applyGravity();
    this.animate();
  }


  /**
   * It sets a repeating interval to check game events and play
   * audio and draw images accordendly.
   */
  animate() {
    this.setStopableInterval(() => this.moveCharacter(), 1000 / 60);
    this.setStopableInterval(() => this.playCharacter(), 100);
    this.setStopableInterval(() => this.playCharacterIdle(), 100);
    this.setStopableInterval(() => this.playCharacterWins(), 200);
  }


  /**
   * Moves the character and updates the camera position.
   */
  moveCharacter() {
    this.walking_sound.pause();
    if (this.canMoveRight()) this.moveRight();
    if (this.canJump()) this.jump();
    if (this.canMoveLeft()) this.moveLeft();
    this.world.camera_x = -this.x + 100;
  }


  /**
   * Checks if the character can move to the right.
   * @returns {boolean} - true if the character can move to the right, false otherwise. 
   */
  canMoveRight() {
    return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && !this.isDead() && !pause && !this.youWin;
  }


  /**
   * Moves the character to the right and plays the walking sound.
   */
  moveRight() {
    super.moveRight();
    this.otherDirection = false;
    this.walking_sound.play();
  }


  /**
   * Checks if the character can jump.
   * 
   * @returns {boolean} - true if the character can jump, false otherwise. 
   */
  canJump() {
    return this.world.keyboard.SPACE && !this.isAboveGround() && !(this.isDead() && !pause && !this.youWin);
  }

  /**
   * Checks if the character can move to the left.
   * @returns {boolean} - true if the character can move to the left, false otherwise. 
   */
  canMoveLeft() {
    return this.world.keyboard.LEFT && this.x > 100 && !this.isDead() && !pause && !this.youWin;
  }


  /**
   * Moves the character to the left and plays the walking sound.
   */
  moveLeft() {
    super.moveLeft();
    this.otherDirection = true;
    this.walking_sound.play();
  }


  /**
   * Stops any currently playing character sounds before playing a new one.
   * Plays the appropriate sound effect and animation based on the character's current state.
   */
  playCharacter() {
    this.pauseCharacterSounds();
    if (this.characterIsDead()) {
      this.playCharacterIsDead();
    } else if (this.enemyHurtsCharacter()) {
      this.playCharacterHurt();
    } else if (this.characterJumps()) {
      this.playJump();
    } else if (this.characterWalking()) {
      this.playWalking();
    } else if (this.characterNotIdle()) {
      this.playIdleImg();
    }
  }


  /**
   * Pause all character play sounds.
   */
  pauseCharacterSounds() {
    this.dying_sound.pause();
    this.hurts_sound.pause();
    this.jump_sound.pause();
  }


  /**
   * Checks if the character is dead.
   * 
   * @return {boolean} Returns true if the character is dead and the game is not paused and
   * the player has not won, false otherwise.  
   */
  characterIsDead() {
    return this.isDead() && !pause && !this.youWin;
  }


  /**
   * Plays the animation and sound effect for when the character is dead.
   */
  playCharacterIsDead() {
    this.deadAnimation(21, this.IMAGES_DEAD, this.IMAGES_DEAD_END);
    if (this.soundIndex <= 20) {
      this.dying_sound.play();
      this.soundIndex++;
    }
  }


  /**
   * Checks if the enemy hurts the character.
   * 
   * @return {boolean} Returns true if the enemy hurts the character and the game is not
   * paused and the player has not won, false otherwise.
   */
  enemyHurtsCharacter() {
    return this.itHurts() && !pause && !this.youWin;
  }


  /**
   * Plays the animation and sound effect for when the character gets hurt.
   */
  playCharacterHurt() {
    this.playAnimation(this.IMAGES_HURT);
    this.hurts_sound.play();
    this.time = new Date() / 1000;
    this.idleMode = false;
  }


  /**
   * Checks if the character is jumping.
   * 
   * @return {boolean} Returns true if the character is above the ground and the game is not
   * paused and the player has not won, false otherwise.
   */
  characterJumps() {
    return this.isAboveGround() && !pause && !this.youWin;
  }


  /**
   * Plays the animation and sound effect for when the character jumps.
   */
  playJump() {
    this.playAnimation(this.IMAGES_JUMPING);
    this.jump_sound.play();
    this.time = new Date() / 1000;
    this.idleMode = false;
  }


  /**
   * Checks if the character is walking.
   * 
   * @return {boolean} Returns true if the right arrow key is pressed or if the left arrow key is
   * pressed and the game is not paused and the player has not won, false otherwise. 
   */
  characterWalking() {
    return this.world.keyboard.RIGHT || (this.world.keyboard.LEFT && !pause && !this.youWin);
  }


  /**
   * Plays the animation and sound effect for when the character walk.
   */
  playWalking() {
    this.time = new Date() / 1000;
    this.playAnimation(this.IMAGES_WALKING);
    this.idleMode = false;
  }


  /**
   * Checks if the character is not idle.
   * 
   * @return {boolean} Returns true if the character is not in idle mode and the game is not
   * paused and the player has not won, false otherwise.
   */
  characterNotIdle() {
    return !this.idleMode && !pause && !this.youWin;
  }


  /**
   * Plays the animation for idle after action.
   */
  playIdleImg() {
    this.loadImage("./img/2_character_pepe/1_idle/idle/I-1.png");
  }


  /**
   * Plays an idle animation and sound effect for the game character, depending on the elapsed time since the game started.
   */
  playCharacterIdle() {
    this.snoring_sound.pause();
    if (this.elapsedTimeGreater5Seconds()) this.playIdle();
    if (this.elapsedTimeGreater15Seconds()) this.playLongIdle();
  }


  /**
   * Checks if the elapsed time since the game started is greater than 5 seconds, the game is not paused,
   * and the player has not won yet.
   * 
   * @returns {boolean} Returns true if the elapsed time is greater than 5 seconds, and both pause and 
   * youWin are false; otherwise returns false.
   */
  elapsedTimeGreater5Seconds() {
    return new Date() / 1000 - this.time > 5 && !pause && !this.youWin;
  }


  /**
   * Plays a idle animation and sound effect.
   */
  playIdle() {
    this.idleMode = true;
    this.playAnimation(this.IMAGES_IDLE);
  }


  /**
   * Checks if the elapsed time since the game started is greater than 15 seconds, the game is not paused,
   * and the player has not won yet.
   * 
   * @returns {boolean} Returns true if the elapsed time is greater than 15 seconds, and both pause and 
   * youWin are false; otherwise returns false.
   */
  elapsedTimeGreater15Seconds() {
    return new Date() / 1000 - this.time > 15 && !pause && !this.youWin;
  }


  /**
   * Plays a long idle animation and sound effect.
   */
  playLongIdle() {
    this.playAnimation(this.IMAGES_LONG_IDLE);
    this.snoring_sound.play();
  }


  /**
   * Plays a winning animation if the end boss is really dead.
   */
  playCharacterWins() {
    if (this.endbossRealyDead()) this.playWins();
  }


  /**
   * Checks whether the end boss is really dead.
   * 
   * @returns {boolean} Returns true if the end boss is really dead, false otherwise.
   */
  endbossRealyDead() {
    return this.world.level.endBoss[0].realyDead;
  }


  /**
   * Plays character win animation.
   */
  playWins() {
    this.youWin = true;
    this.playAnimation(this.IMAGES_FLIGHT);
    this.jump();
    this.jump();
  }
}
