class ThrowableObject extends MovableObject {
  offset = { top: 0, bottom: 0, left: 0, right: 0 };
  statusCooldown = false;

  IMAGES_BOTTLETHROW = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGES_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  /**
   * Constructs a new throwable object (bottle) with initial position, world reference,
   * and loads image assets for throwing and splash animations.
   * @param {number} x - The initial horizontal position of the bottle.
   * @param {number} y - The initial vertical position of the bottle.
   * @param {object} world - Reference to the game world for updating the bottle status bar.
   */
  constructor(x, y, world) {
    super().loadImage("img/7_statusbars/3_icons/icon_salsa_bottle.png");
    this.loadImages(this.IMAGES_BOTTLETHROW);
    this.loadImages(this.IMAGES_SPLASH);
    this.x = x;
    this.y = y;
    this.width = 80;
    this.height = 70;
    this.world = world;
    this.throw();
  }

  /**
   * Initiates the throwing action for the bottle, applying gravity,
   * setting initial vertical speed, and starting the rotation animation.
   * Updates the bottle status bar if not on cooldown.
   */
  throw() {
    this.speedY = 20;
    this.applyGravity();
    setInterval(() => {
      this.x += 10;
      this.playAnimation(this.IMAGES_BOTTLETHROW);
    }, 25);

    if (!this.bottleThrowCooldown) {
      this.world.bottleStatusBar.setPercentage(this.world.collectedBottles);
    }

    this.statusCooldown = true;
    setTimeout(() => {
      this.statusCooldown = false;
    }, 500);
  }
}
