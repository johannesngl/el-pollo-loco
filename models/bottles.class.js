class Bottle extends DrawableObject {
  y = 350;
  height = 80;
  width = 80;
  offset = { top: 13, bottom: 0, left: 42, right: 20 };

  /**
   * Constructs a new bottle object, setting its initial position and loading its image.
   * @param {string} path - The path to the image representing the bottle.
   * @param {number} x - The initial horizontal position of the bottle.
   */
  constructor(path, x) {
    super().loadImage(path);

    this.x = x;
  }
}
