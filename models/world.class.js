class World {
  character = new Character();
  enemies = level1.enemies;
  clouds = level1.clouds;
  bottles = level1.bottles;
  coins = level1.coins;
  backgroundObjects = level1.backgroundObjects;
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  healthStatusBar = new HealthStatusBar();
  coinStatusBar = new CoinStatusBar();
  bottleStatusBar = new BottleStatusBar();
  endbossStatusBar = new EndbossStatusBar();
  throwableObjects = [];
  collectedCoins = 0;
  collectedBottles = 0;
  bottleThrowCooldown = false;
  damageCooldown = false;
  coin_sound = new Audio("audio/coin-recieved-230517.mp3");
  chicken_sound = new Audio("audio/chicken.wav");
  hurt_sound = new Audio("audio/retro-hurt-2-236675.mp3");
  bottle_sound = new Audio("audio/teacup-clink-sfx-156224.mp3");
  bottle_break = new Audio("audio/bottle-break-39916.mp3");
  winning_sound = new Audio("audio/you-win-sequence-1-183948.mp3");
  losing_sound = new Audio("audio/wrong-buzzer-6268.mp3");
  noDamage = false;
  enbossFight = false;
  IMAGE_WIN = "img/9_intro_outro_screens/win/win_2.png";
  IMAGE_LOSS = "img/9_intro_outro_screens/game_over/oh no you lost!.png";
  gameOver = false;
  intervals = [];
  IMAGE_WIN = "img/9_intro_outro_screens/win/win_2.png";
  IMAGE_LOSS = "img/9_intro_outro_screens/game_over/oh no you lost!.png";
  winningImage = new Image();
  losingImage = new Image();

  /**
   * Creates a World instance and initializes the canvas context, the game status, and event listeners.
   * @param {HTMLCanvasElement} canvas - The canvas element to render the game world.
   * @param {Keyboard} keyboard - An instance of Keyboard to handle user inputs.
   */
  constructor(canvas, keyboard, level) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.level = level;

    this.enemies = level.enemies;
    this.clouds = level.clouds;
    this.bottles = level.bottles;
    this.coins = level.coins;
    this.backgroundObjects = level.backgroundObjects;

    this.winningImage.src = this.IMAGE_WIN;
    this.losingImage.src = this.IMAGE_LOSS;

    this.draw();
    this.setWorld();
    this.run();
  }

  /**
   * Sets the game world reference for the character.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Starts the game loop, checking collisions, item collection, and actions.
   */
  run() {
    if (!this.won) {
      this.setInterval(() => {
        this.checkCollisions();
        this.collectItems();
        this.checkCollisionsBottle();
        this.checkThrowObjects();
      }, 10);

      this.setInterval(() => {
        this.checkEndBossFight();
      }, 100);
    }
  }

  /**
   * Clears all active intervals stored in the `intervals` array,
   * effectively stopping all timed functions in the game.
   * Empties the `intervals` array after clearing.
   */
  clearIntervals() {
    this.intervals.forEach((id) => clearInterval(id));
    this.intervals = [];
  }

  /**
   * Sets a new interval and stores its ID in the `intervals` array for later clearing.
   * Allows tracking and management of all intervals set within the game.
   *
   * @param {Function} callback - The function to execute at each interval.
   * @param {number} interval - The time, in milliseconds, between each function call.
   * @returns {number} The ID of the created interval.
   */
  setInterval(callback, interval) {
    const id = setInterval(callback, interval);
    this.intervals.push(id);
    return id;
  }

  /**
   * Checks if the player has lost by reaching zero energy and initiates losing animation.
   */
  checkLoss() {
    if (this.character.energy == 0) {
      setInterval(() => {
        this.character.playAnimation(this.character.IMAGES_DEAD);
        this.character.speed = 0;
      }, 100);
      setTimeout(() => {
        this.losingAnimation();
      }, 2000);
      this.gameOver = true;
    }
  }

  /**
   * Checks collisions between the character and enemies.
   */
  checkCollisions() {
    if (!this.gameOver) {
      for (let i = this.level.enemies.length - 1; i >= 0; i--) {
        let enemy = this.level.enemies[i];
        if (this.character.isColliding(enemy)) {
          this.handleCharacterEnemyCollision(enemy, i);
        }
      }
    }
  }

  /**
   * Handles collision effects when the character collides with an enemy.
   * @param {Enemy} enemy - The enemy object that was collided with.
   * @param {number} enemyIndex - The index of the enemy in the enemies array.
   */
  handleCharacterEnemyCollision(enemy, enemyIndex) {
    if (this.character.isJumpingOn(enemy)) {
      this.processEnemyStomp(enemy, enemyIndex);
    } else if (!this.damageCooldown && !this.noDamage) {
      this.processCharacterDamage(enemy);
    }
  }

  /**
   * Manages actions when the character stomps on an enemy.
   * @param {Enemy} enemy - The enemy being stomped on.
   * @param {number} enemyIndex - The index of the enemy in the enemies array.
   */
  processEnemyStomp(enemy, enemyIndex) {
    this.noDamage = true;
    this.character.jump();
    if (play) {
      this.chicken_sound.play();
    }

    if (enemy instanceof Chicken && !enemy.isDead) {
      this.processChickenHit(enemy, [], enemyIndex);
      setTimeout(() => {
        this.noDamage = false;
      }, 500);
    }
  }

  /**
   * Processes damage to the character when colliding with an enemy.
   * @param {Enemy} enemy - The enemy causing damage to the character.
   */
  processCharacterDamage(enemy) {
    if (play) {
      this.hurt_sound.play();
    }

    if (enemy instanceof Endboss) {
      this.character.hit(true);
    } else {
      this.character.hit(false);
    }
    this.checkLoss();
    this.healthStatusBar.setPercentage(this.character.energy);
    this.damageCooldown = true;

    setTimeout(() => {
      this.damageCooldown = false;
    }, 1000);
  }

  /**
   * Initiates the Endboss fight when the character reaches a specific position.
   */
  checkEndBossFight() {
    if (this.character.x >= 4100) {
      this.level.enemies.forEach((enemy) => {
        if (enemy instanceof Endboss) {
          enemy.animateWalking();
          enemy.moveBossLeft(1);
        }
      });
      this.enbossFight = true;
    }
  }

  /**
   * Manages collection of items like coins and bottles in the game.
   */
  collectItems() {
    setInterval(() => {
      this.collectCoins();
      this.collectBottles();
    }, 10);
  }

  /**
   * Collects coins when the character collides with a coin object.
   */
  collectCoins() {
    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin)) {
        if (play) {
          this.coin_sound.play();
        }
        this.collectedCoins += 4;
        this.coinStatusBar.setPercentage(this.collectedCoins);
        const index = this.level.coins.indexOf(coin);
        if (index > -1) {
          this.level.coins.splice(index, 1);
        }
      }
    });
  }

  /**
   * Collects bottles when the character collides with a bottle object.
   */
  collectBottles() {
    this.level.bottles.forEach((bottle) => {
      if (this.character.isColliding(bottle) && this.collectedBottles !== 100) {
        if (play) {
          this.bottle_sound.play();
        }
        this.collectedBottles += 20;
        this.bottleStatusBar.setPercentage(this.collectedBottles);
        const index = this.level.bottles.indexOf(bottle);
        if (index > -1) {
          this.level.bottles.splice(index, 1);
        }
      }
    });
  }

  /**
   * Manages throwable objects like bottles, including cooldowns and impact checks.
   */
  checkThrowObjects() {
    if (this.canThrowBottle()) {
      this.throwBottle();
    }

    this.throwableObjects.forEach((bottle, index) => {
      this.handleBottleImpact(bottle, index);
    });
  }

  /**
   * Checks if the character can throw a bottle based on cooldown and bottle count.
   * @returns {boolean} - True if the character can throw a bottle.
   */
  canThrowBottle() {
    return (
      this.keyboard.D && this.collectedBottles > 0 && !this.bottleThrowCooldown
    );
  }

  /**
   * Throws a bottle by creating a new throwable object and starting a cooldown.
   */
  throwBottle() {
    this.keyboard.D = false;
    let bottle = new ThrowableObject(
      this.character.x + 100,
      this.character.y + 100,
      this
    );
    this.throwableObjects.push(bottle);
    this.collectedBottles -= 20;
    this.bottleStatusBar.setPercentage(this.collectedBottles);
    this.startBottleThrowCooldown();
  }

  /**
   * Starts a cooldown timer to prevent rapid bottle throws.
   */
  startBottleThrowCooldown() {
    this.bottleThrowCooldown = true;
    setTimeout(() => {
      this.bottleThrowCooldown = false;
    }, 100);
  }

  /**
   * Handles bottle impact events, such as playing splash animation and removing bottles.
   * @param {ThrowableObject} bottle - The bottle object impacting the game environment.
   * @param {number} index - The index of the bottle in the throwable objects array.
   */
  handleBottleImpact(bottle, index) {
    if (bottle.y >= 300) {
      bottle.playAnimation(bottle.IMAGES_SPLASH);
      if (play) {
        this.bottle_break.play();
      }
      this.removeBottleAfterDelay(index);
    }
  }

  /**
   * Removes a bottle from the game after a brief delay.
   * @param {number} index - The index of the bottle to remove.
   */
  removeBottleAfterDelay(index) {
    setTimeout(() => {
      this.throwableObjects.splice(index, 1);
    }, 75);
  }

  /**
   * Checks for collisions between thrown bottles and enemies.
   */
  checkCollisionsBottle() {
    if (!this.gameOver) {
      const enemiesToRemove = [];

      for (let i = this.level.enemies.length - 1; i >= 0; i--) {
        let enemy = this.level.enemies[i];
        this.throwableObjects.forEach((thrownBottle, index2) => {
          if (thrownBottle.isColliding(enemy)) {
            this.handleBottleCollision(
              thrownBottle,
              index2,
              enemy,
              enemiesToRemove,
              i
            );
          }
        });
      }
    }
  }

  /**
   * Handles the collision between a thrown bottle and an enemy,
   * applying damage or other effects based on the enemy type.
   * @param {ThrowableObject} thrownBottle - The thrown bottle that collided with the enemy.
   * @param {number} bottleIndex - The index of the thrown bottle in the throwableObjects array.
   * @param {Enemy} enemy - The enemy that was hit by the thrown bottle.
   * @param {Array} enemiesToRemove - An array to track enemies that should be removed.
   * @param {number} enemyIndex - The index of the enemy in the enemies array.
   */
  handleBottleCollision(
    thrownBottle,
    bottleIndex,
    enemy,
    enemiesToRemove,
    enemyIndex
  ) {
    this.playBottleSplash(thrownBottle, bottleIndex);

    if (enemy instanceof Endboss && !enemy.hitCooldown) {
      this.processEndbossHit(enemy);
    } else if (enemy instanceof Chicken && !enemy.isDead) {
      this.processChickenHit(enemy, enemiesToRemove, enemyIndex);
    }
  }

  /**
   * Plays the splash animation for a bottle and removes it from the game after a short delay.
   * @param {ThrowableObject} thrownBottle - The thrown bottle that splashed.
   * @param {number} bottleIndex - The index of the thrown bottle in the throwableObjects array.
   */
  playBottleSplash(thrownBottle, bottleIndex) {
    thrownBottle.playAnimation(thrownBottle.IMAGES_SPLASH);
    if (play) {
      this.bottle_break.play();
    }
    setTimeout(() => {
      this.throwableObjects.splice(bottleIndex, 1);
    }, 200);
  }

  /**
   * Processes the hit effects on the endboss, updating energy and triggering animations.
   * If the endboss's energy reaches zero, initiates the winning sequence.
   * @param {Endboss} endboss - The endboss enemy that was hit.
   */
  processEndbossHit(endboss) {
    this.enbossFight = true;
    this.endbossHit(endboss);
    this.endbossStatusBar.setPercentage(endboss.energy);

    if (endboss.energy === 0) {
      this.gameOver = true;
      setTimeout(() => {
        this.winningAnimation();
      }, 2000);

      setInterval(() => {
        endboss.playAnimation(endboss.IMAGES_DEAD);
        endboss.speed = 0;
      }, 100);
    }
  }

  /**
   * Handles the process when a chicken enemy is hit, marking it as dead and playing death animation.
   * @param {Chicken} chicken - The chicken enemy that was hit.
   * @param {Array} enemiesToRemove - An array to store enemies that should be removed.
   * @param {number} enemyIndex - The index of the chicken in the enemies array.
   */
  processChickenHit(chicken, enemiesToRemove, enemyIndex) {
    chicken.isDead = true;
    chicken.speed = 0;
    const imagePath = chicken.isSmallChicken
      ? "img/3_enemies_chicken/chicken_small/2_dead/dead.png"
      : "img/3_enemies_chicken/chicken_normal/2_dead/dead.png";
    chicken.loadImage(imagePath);

    enemiesToRemove.push({ index: enemyIndex, enemy: chicken });

    setTimeout(() => {
      const enemyIndex = this.level.enemies.indexOf(chicken);
      if (enemyIndex > -1) {
        this.level.enemies.splice(enemyIndex, 1);
      }
    }, 500);
  }

  /**
   * Applies hit effects to the endboss, changing its state and triggering a cooldown period.
   * @param {Enemy} enemy - The endboss enemy that was hit.
   */
  endbossHit(enemy) {
    enemy.hit();
    enemy.loadImage("img/4_enemie_boss_chicken/4_hurt/G21.png");
    enemy.playAnimation(enemy.IMAGES_HURT);
    enemy.animateAttacking();
    enemy.hitCooldown = true;
    setTimeout(() => {
      enemy.hitCooldown = false;
    }, 1000);
  }

  /**
   * Displays the winning screen overlay with a semi-transparent effect.
   * Plays the winning sound if the audio is enabled, and stops the game loop.
   */
  winningAnimation() {
    this.ctx.globalAlpha = 0.7;
    this.ctx.drawImage(
      this.winningImage,
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
    this.ctx.globalAlpha = 1;

    if (play) {
      this.winning_sound.play();
    }

    cancelAnimationFrame(this.animationFrame);
  }

  /**
   * Displays the losing screen overlay with a semi-transparent effect.
   * Plays the losing sound if the audio is enabled, and stops the game loop.
   */
  losingAnimation() {
    this.ctx.globalAlpha = 0.7;
    this.ctx.drawImage(
      this.losingImage,
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
    this.ctx.globalAlpha = 1;
    if (play) {
      this.losing_sound.play();
    }

    cancelAnimationFrame(this.animationFrame);
  }

  /**
   * Continuously draws the game world, updating object positions and camera movement.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.healthStatusBar);
    this.ctx.translate(this.camera_x, 0);
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.coinStatusBar);
    this.ctx.translate(this.camera_x, 0);
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.bottleStatusBar);
    this.ctx.translate(this.camera_x, 0);

    if (this.enbossFight) {
      this.ctx.translate(-this.camera_x, 0);
      this.addToMap(this.endbossStatusBar);
      this.ctx.translate(this.camera_x, 0);
    }

    this.addToMap(this.character);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);

    this.ctx.translate(-this.camera_x, 0);

    let self = this;
    this.animationFrame = requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * Adds an array of objects to the game map, rendering each object.
   * @param {Array} objects - The array of objects to render on the map.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Adds a single movable object to the game map, adjusting orientation as needed.
   * @param {MovableObject} mo - The movable object to add to the map.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Flips the image horizontally by saving the current state, translating, and scaling.
   * @param {MovableObject} mo - The movable object to flip.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Restores the image orientation after being flipped horizontally.
   * @param {MovableObject} mo - The movable object to reset after flipping.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
