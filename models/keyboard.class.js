class Keyboard {
  LEFT = false;
  RIGHT = false;
  UP = false;
  DOWN = false;
  SPACE = false;
  D = false;

  /**
   * Constructs a new Keyboard object and binds key press events for desktop controls.
   */
  constructor() {
    this.bindKeyPressEvents();
  }

  /**
   * Binds touch and click events to mobile control buttons, allowing interaction
   * on touchscreens. Updates the directional states when buttons are pressed or released.
   */
  bindBtsPressEvents() {
    const leftBtn = document.getElementById("mobile-move-left");
    const rightBtn = document.getElementById("mobile-move-right");
    const throwBtn = document.getElementById("mobile-bottlethrow");
    const jumpBtn = document.getElementById("mobile-jump");

    if (leftBtn) {
      leftBtn.addEventListener("touchstart", (e) => {
        e.preventDefault();
        this.LEFT = true;
      });
      leftBtn.addEventListener("touchend", (e) => {
        e.preventDefault();
        this.LEFT = false;
      });
      leftBtn.addEventListener("mousedown", () => {
        this.LEFT = true;
      });
      leftBtn.addEventListener("mouseup", () => {
        this.LEFT = false;
      });
    }

    if (rightBtn) {
      rightBtn.addEventListener("touchstart", (e) => {
        e.preventDefault();
        this.RIGHT = true;
      });
      rightBtn.addEventListener("touchend", (e) => {
        e.preventDefault();
        this.RIGHT = false;
      });
      rightBtn.addEventListener("mousedown", () => {
        this.RIGHT = true;
      });
      rightBtn.addEventListener("mouseup", () => {
        this.RIGHT = false;
      });
    }

    if (throwBtn) {
      throwBtn.addEventListener("touchstart", (e) => {
        e.preventDefault();
        this.D = true;
      });
      throwBtn.addEventListener("touchend", (e) => {
        e.preventDefault();
        this.D = false;
      });
      throwBtn.addEventListener("mousedown", () => {
        this.D = true;
      });
      throwBtn.addEventListener("mouseup", () => {
        this.D = false;
      });
    }

    if (jumpBtn) {
      jumpBtn.addEventListener("touchstart", (e) => {
        e.preventDefault();
        this.SPACE = true;
      });
      jumpBtn.addEventListener("touchend", (e) => {
        e.preventDefault();
        this.SPACE = false;
      });
      jumpBtn.addEventListener("mousedown", () => {
        this.SPACE = true;
      });
      jumpBtn.addEventListener("mouseup", () => {
        this.SPACE = false;
      });
    }
  }

  /**
   * Binds keyboard events for desktop controls. Sets movement states based on
   * the arrow keys, space, and 'D' for throwing objects.
   */
  bindKeyPressEvents() {
    window.addEventListener("keydown", (event) => {
      if (event.keyCode == 39) {
        keyboard.RIGHT = true;
      }
      if (event.keyCode == 37) {
        keyboard.LEFT = true;
      }
      if (event.keyCode == 38) {
        keyboard.UP = true;
      }
      if (event.keyCode == 40) {
        keyboard.DOWN = true;
      }
      if (event.keyCode == 32) {
        keyboard.SPACE = true;
      }
      if (event.keyCode == 68) {
        keyboard.D = true;
      }
    });

    window.addEventListener("keyup", (event) => {
      if (event.keyCode == 39) {
        keyboard.RIGHT = false;
      }
      if (event.keyCode == 37) {
        keyboard.LEFT = false;
      }
      if (event.keyCode == 38) {
        keyboard.UP = false;
      }
      if (event.keyCode == 40) {
        keyboard.DOWN = false;
      }
      if (event.keyCode == 32) {
        keyboard.SPACE = false;
      }
      if (event.keyCode == 68) {
        keyboard.D = false;
      }
    });
  }
}
