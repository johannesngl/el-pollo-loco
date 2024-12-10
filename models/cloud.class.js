class Cloud extends MovableObject {
    y = 20;
    width = 500;
    height = 250;
  
    /**
     * Constructs a new cloud object, setting its initial position and loading its image.
     * @param {string} path - The path to the image representing the cloud.
     * @param {number} x - The initial horizontal position of the cloud.
     */
    constructor(path, x) {
      super().loadImage(path);
  
      this.x = x;
      this.animate();
    }
  
    /**
     * Animates the cloud by moving it slowly to the left, creating a scrolling effect.
     */
    animate() {
      setInterval(() => {
        this.moveLeft(0);
      }, 1000 / 60);
    }
  }
  