class CoinStatusBar extends DrawableObject {
  IMAGES = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png",
  ];

  percentage = 0;

  /**
   * Constructs a new coin status bar, loading image assets and setting its position and size.
   * Initializes the status bar to display 0% by default.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 20;
    this.y = 35;
    this.width = 180;
    this.height = 50;
    this.setPercentage(0);
  }

  /**
   * Updates the displayed percentage of the coin status bar.
   * Sets the image based on the current percentage value.
   * @param {number} percentage - The new percentage to display on the status bar.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Determines the index of the image to use based on the current percentage value.
   * @returns {number} - The index of the appropriate image in the IMAGES array.
   */
  resolveImageIndex() {
    if (this.percentage >= 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
