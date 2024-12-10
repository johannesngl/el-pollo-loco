class Endboss extends MovableObject {
  height = 330;
  width = 300;
  y = 110;
  offset = { top: -60, bottom: -80, left: 40, right: 25 };
  currentAnimation = null;
  moveInterval = null;
  enboss_sound = new Audio("audio/chicken-noise-196746.mp3");

  IMAGES_ALERT = [
    "./img/4_enemie_boss_chicken/2_alert/G5.png",
    "./img/4_enemie_boss_chicken/2_alert/G6.png",
    "./img/4_enemie_boss_chicken/2_alert/G7.png",
    "./img/4_enemie_boss_chicken/2_alert/G8.png",
    "./img/4_enemie_boss_chicken/2_alert/G9.png",
    "./img/4_enemie_boss_chicken/2_alert/G10.png",
    "./img/4_enemie_boss_chicken/2_alert/G11.png",
    "./img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  /**
   * Constructs a new endboss object, loads image assets for animations, sets its initial position, and starts alert animation.
   */
  constructor() {
    super().loadImage(this.IMAGES_ALERT[0]);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 4400;

    this.animateAlert();
  }

  /**
   * Starts the alert animation, cycling through alert images to indicate the boss is ready.
   */
  animateAlert() {
    this.currentAnimation = "alert";
    this.alertInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_ALERT);
    }, 200);
  }

  /**
   * Initiates the walking animation by switching images, clearing other animations, and moving the boss left at a slow pace.
   */
  animateWalking() {
    if (this.currentAnimation !== "walking") {
      clearInterval(this.alertInterval);
      clearInterval(this.attackingInterval);
      this.currentAnimation = "walking";
      this.walkingInterval = setInterval(() => {
        this.playAnimation(this.IMAGES_WALKING);
      }, 200);
      this.moveBossLeft(1);
    }
  }

  /**
   * Initiates the attack animation, clearing other animations, playing attack images, and moving the boss quickly toward the player.
   * Resumes walking after the attack animation finishes.
   */
  animateAttacking() {
    if (this.currentAnimation !== "attacking") {
      clearInterval(this.walkingInterval);
      this.currentAnimation = "attacking";
      this.attackingInterval = setInterval(() => {
        this.playAnimation(this.IMAGES_ATTACK);
      }, 400);
      if (play) {
        this.enboss_sound.play();
      }
      this.moveBossLeft(8);
      setTimeout(() => {
        this.moveBossLeft(1);
        this.animateWalking();
      }, 1000);
    }
  }

  /**
   * Moves the boss to the left at the specified speed.
   * @param {number} speed - The speed at which the boss moves to the left.
   */
  moveBossLeft(speed) {
    if (this.moveInterval) {
      clearInterval(this.moveInterval);
    }

    this.speed = speed;
    this.moveInterval = setInterval(() => {
      this.x -= this.speed;
      if (this.x < 0) this.x = 0;
    }, 1000 / 60);
  }
}
