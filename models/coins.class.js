class Coin extends DrawableObject {
  height = 80;
  width = 80;
  offset = { top: 8, bottom: 8, left: 8, right: 8 };

  /**
   * Constructs a new coin object, setting its position and loading its image.
   * @param {number} x - The horizontal position of the coin.
   * @param {number} y - The vertical position of the coin.
   */
  constructor(x, y) {
    super().loadImage("img/7_statusbars/3_icons/icon_coin.png");

    this.x = x;
    this.y = y;
  }
}
