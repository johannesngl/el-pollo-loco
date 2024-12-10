class BackgroundObject extends MovableObject {
  width = 720;
  height = 480;

  /**
   * Constructs a new background object, setting its initial position and loading its image.
   * Positions the object at the bottom of the canvas.
   * @param {string} imagePath - The path to the image representing the background object.
   * @param {number} x - The initial horizontal position of the background object.
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.y = 480 - this.height; 
    this.x = x;
  }
}
