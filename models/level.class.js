class Level {
  enemies;
  clouds;
  bottles;
  coins;
  backgroundObjects;
  level_end_x = 4400;

  /**
   * Constructs a new level object, setting up arrays for enemies, clouds, bottles, coins,
   * and background objects in the game level. Also defines the horizontal end point of the level.
   * @param {Array} enemies - An array of enemy objects in the level.
   * @param {Array} clouds - An array of cloud objects in the level.
   * @param {Array} bottles - An array of bottle objects in the level.
   * @param {Array} coins - An array of coin objects in the level.
   * @param {Array} backgroundObjects - An array of background objects in the level.
   */
  constructor(enemies, clouds, bottles, coins, backgroundObjects) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.bottles = bottles;
    this.coins = coins;
    this.backgroundObjects = backgroundObjects;
  }
}

