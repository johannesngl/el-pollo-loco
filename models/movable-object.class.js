class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;

  /**
   * Applies gravity to the object, causing it to fall unless it is grounded.
   * Continuously adjusts vertical position (`y`) and vertical speed (`speedY`).
   * Specific ground levels and falling behavior are adjusted for chickens.
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;

        if (this instanceof Chicken) {
          if (this.isSmallChicken) {
            this.speedY -= this.acceleration;
          }
        } else {
          this.speedY -= this.acceleration;
        }
      } else {
        this.speedY = 0;

        if (this instanceof Chicken) {
          if (this.isSmallChicken) {
            this.y = 360;
          } else {
            this.y = 334;
          }
        } else {
          this.y = 140;
        }

        if (this instanceof Chicken) {
          this.isJumping = false;
        }
      }
    }, 1000 / 25);
  }

  /**
   * Checks if the object is above the ground level.
   * For throwable objects, it always returns true.
   * @returns {boolean} - True if the object is above ground level, otherwise false.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else if (this instanceof Chicken && this.isSmallChicken) {
      return this.y < 360;
    } else {
      return this.y < 140;
    }
  }

  /**
   * Checks if the object is jumping on an enemy.
   * @param {MovableObject} enemy - The enemy object to check.
   * @returns {boolean} - True if the object is jumping on the enemy, otherwise false.
   */
  isJumpingOn(enemy) {
    return (
      this.y + this.height < enemy.y + enemy.height &&
      !(enemy instanceof Endboss) &&
      this.speedY < 0
    );
  }

  /**
   * Reduces the object's energy when hit by an enemy.
   * A greater reduction is applied if hit by a boss.
   * @param {boolean} boss - Indicates if the hit was from a boss.
   */
  hit(boss) {
    if (boss) {
      this.energy -= 100;
    } else {
      this.energy -= 20;
    }
    if (this.energy <= 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Checks if the object was recently hit.
   * @returns {boolean} - True if the object was hit within the last second.
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  /**
   * Checks if the object's energy has reached zero.
   * @returns {boolean} - True if the object is dead, otherwise false.
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Moves the object to the right based on its speed.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves the object to the left based on its speed and an optional attack boost.
   * @param {number} attack - Additional speed boost for attacking moves.
   */
  moveLeft(attack) {
    this.x -= this.speed + attack;
  }

  /**
   * Cycles through an array of images to create an animation effect.
   * @param {string[]} images - An array of image paths for the animation.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Initiates a jump by setting vertical speed if the object is not already jumping.
   * Special jump behavior is applied for small chickens.
   */
  jump() {
    if (this instanceof Chicken && this.isSmallChicken && this.isJumping) {
      return;
    }

    this.speedY = 25;

    if (this instanceof Chicken && this.isSmallChicken) {
      this.isJumping = true;
    }
  }

  /**
   * Ensures that the object stays at or above a specific vertical line.
   * For example, it prevents a character from falling below a certain y-level.
   */
  pepeIsOnLine() {
    if (this.y > 143) {
      this.y = 143;
    }
  }
}
