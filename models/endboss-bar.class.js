class EndbossStatusBar extends DrawableObject {
  IMAGES = [
    "img/7_statusbars/2_statusbar_endboss/orange/orange0.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange20.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange40.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange60.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange80.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange100.png",
  ];

  percentage = 100;

  /**
   * Constructs a new endboss status bar, loads image assets, sets initial position and size,
   * and initializes the bar to display 100% by default.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 260;
    this.y = 10;
    this.width = 280;
    this.height = 80;
    this.setPercentage(100);
  }

  /**
   * Updates the displayed percentage of the endboss's health in the status bar.
   * Selects the image based on the current percentage value.
   * @param {number} percentage - The new health percentage to display on the status bar.
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
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage == 80) {
      return 4;
    } else if (this.percentage == 60) {
      return 3;
    } else if (this.percentage == 40) {
      return 2;
    } else if (this.percentage == 20) {
      return 1;
    } else {
      return 0;
    }
  }
}

  