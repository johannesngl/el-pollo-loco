class Character extends MovableObject {
  height = 280;
  width = 130;
  y = 200;
  speed = 10;
  offset = { top: 108, bottom: 10, left: 13, right: 26 };

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_LONG_IDLE = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  world;
  walking_sound = new Audio("audio/walking.wav");
  noActivity = false;
  timeoutId;

  /**
   * Resets the inactivity timeout that controls the 'long idle' animation.
   * Clears any existing timeout and sets a new timeout for 15 seconds.
   */
  resetNoActivityTimeout = () => {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.timeoutId = setTimeout(() => {
      this.noActivity = true;
    }, 15000);
  };

  /**
   * Constructs a new character object, loads images for various animations,
   * applies gravity, and starts the animation loop.
   */
  constructor() {
    super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.applyGravity();
    this.animate();
  }

  /**
   * Handles the character's movement and animation updates based on keyboard input,
   * adjusting position and playing sounds as necessary. Also manages camera positioning.
   */
  animate() {
    setInterval(() => {
      this.checkWalkingRight();
      this.checkWalkingLeft();
      this.checkJumping();

      this.world.camera_x = -this.x + 100;
      this.pepeIsOnLine();
      this.pepeIsUpOrDown();
    }, 1000 / 60);

    this.checkAnimation();
  }

  /**
   * Checks if the character is moving to the right.
   * If the right arrow key is pressed and the character hasn't reached the level end,
   * the character moves right, playing the walking sound if enabled.
   * Resets the no-activity timeout.
   */
  checkWalkingRight() {
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.noActivity = false;
      this.moveRight();
      this.otherDirection = false;
      if (play) {
        this.walking_sound.play();
      }
      this.resetNoActivityTimeout();
    }
  }

  /**
   * Checks if the character is moving to the left.
   * If the left arrow key is pressed and the character is not at the starting position,
   * the character moves left, playing the walking sound if enabled.
   * Resets the no-activity timeout.
   */
  checkWalkingLeft() {
    if (this.world.keyboard.LEFT && this.x > 0) {
      this.noActivity = false;
      this.moveLeft(0);
      this.otherDirection = true;
      if (play) {
        this.walking_sound.play();
      }
      this.resetNoActivityTimeout();
    }
  }

  /**
   * Checks if the character is jumping.
   * If the space bar is pressed and the character is on the ground,
   * the jump action is triggered, and the no-activity timeout is reset.
   */
  checkJumping() {
    if (this.world.keyboard.SPACE && !this.isAboveGround()) {
      this.noActivity = false;
      this.jump();
      this.resetNoActivityTimeout();
    }
  }

  /**
   * Continuously checks the character's current animation state and updates the displayed animation.
   * Prioritizes animations in this order: dead, hurt, jumping, walking, long idle (if no activity), and idle.
   */
  checkAnimation() {
    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      } else if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
      } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.IMAGES_WALKING);
      } else if (this.noActivity == true) {
        this.playAnimation(this.IMAGES_LONG_IDLE);
      } else {
        this.playAnimation(this.IMAGES_IDLE);
      }
    }, 100);
  }

  /**
   * Checks if the character is above or below a certain height on the screen,
   * updating the `pepeIsUp` flag to reflect position changes.
   */
  pepeIsUpOrDown() {
    if (this.y < 0) {
      this.pepeIsUp = true;
    } else if (this.y > 140) {
      this.pepeIsUp = false;
    }
  }
}
