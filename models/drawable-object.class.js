class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 120;
  y = 280;
  height = 150;
  width = 100;

  /**
   * Loads an image from the specified path and assigns it to the object.
   * @param {string} path - The path to the image file.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Draws the object's current image onto the specified canvas context.
   * @param {CanvasRenderingContext2D} ctx - The canvas context to draw the image on.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Preloads multiple images from an array of paths and stores them in the image cache.
   * This enables smooth switching between images for animations.
   * @param {string[]} arr - An array of image paths to preload.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Checks if this object is colliding with another movable object, considering offsets for precision.
   * @param {MovableObject} mo - The other object to check for collision.
   * @returns {boolean} - True if a collision is detected, otherwise false.
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }
}
