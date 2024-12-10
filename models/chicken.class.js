class Chicken extends MovableObject {
  offset = {};
  isDead = false;

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  IMAGES_WALKING_SMALL = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  /**
   * Constructs a new chicken object, sets its size and appearance based on the provided image path,
   * applies gravity, initializes random position and speed, and starts animations.
   * @param {string} path - The path to the image for initializing the chicken (determines size).
   */
  constructor(path) {
    super().loadImage(path);
    this.applyGravity();

    if (this.IMAGES_WALKING_SMALL.includes(path)) {
      this.loadImages(this.IMAGES_WALKING_SMALL);
      this.isSmallChicken = true;
      this.offset = { top: 4, bottom: 3, left: 9, right: 4 };
      this.height = 54;
      this.width = 54;
      this.y = 360;
    } else {
      this.loadImages(this.IMAGES_WALKING);
      this.isSmallChicken = false;
      this.offset = { top: 4, bottom: 6, left: 0, right: 0 };
      this.height = 80;
      this.width = 80;
      this.y = 334;
    }

    this.x = 500 + Math.random() * 4500;
    this.speed = 0.15 + Math.random() * 0.25;
    this.startRandomJumps();
    this.animate();
  }

  /**
   * Animates the chicken by continuously moving it to the left and playing its walking animation.
   */
  animate() {
    setInterval(() => {
      if (!this.isDead) {
        this.moveLeft(0);
      }
    }, 1000 / 60);

    setInterval(() => {
      if (!this.isDead) {
        if (this.isSmallChicken) {
          this.playAnimation(this.IMAGES_WALKING_SMALL);
        } else {
          this.playAnimation(this.IMAGES_WALKING);
        }
      }
    }, 100);
  }

  /**
   * Initiates random jumping behavior for small chickens by periodically triggering a jump.
   */
  startRandomJumps() {
    if (this.isSmallChicken) {
      setInterval(() => {
        setTimeout(() => {
          if (!this.isDead && this.isSmallChicken && !this.isJumping) {
            this.jump();
            this.isJumping = true;
          }
        }, 2000);
        this;
      }, 3000);
    }
  }
}
