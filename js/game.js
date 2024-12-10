let canvas;
let world;
let keyboard = new Keyboard();
let music = new Audio("audio/cort_ranchera_dm-244661.mp3");
let play = false;

/**
 * Initialisiert das Spiel und zeigt den Startbildschirm an.
 */
function init() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();

  img.src = "./img/9_intro_outro_screens/start/startscreen_1.png";

  img.onload = function () {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };
}


/**
 * Displays a popup element on the screen.
 * @param {string} popupId - The ID of the popup element to display.
 */
function showPopup(popupId) {
  document.getElementById(popupId).style.display = "block";
}

/**
 * Hides a popup element from the screen.
 * @param {string} popupId - The ID of the popup element to hide.
 */
function closePopup(popupId) {
  document.getElementById(popupId).style.display = "none";
}

/**
 * Loads the game by initializing the canvas, keyboard controls,
 * and creating a new game world instance.
 */
function loadGame() {
  canvas = document.getElementById("canvas");
  keyboard = new Keyboard();
  keyboard.bindBtsPressEvents();

  world = new World(canvas, keyboard, level1);
}

/**
 * Restarts the game by reloading the game instance.
 */
function restart() {
  if (world) {
    world.clearIntervals(); 
  }
  resetLevel();
  loadGame();
}

function resetLevel() {
  level1 = createNewLevel();
}

/**
 * Starts playing the background music in a loop
 * and updates the UI to show that music is playing.
 */
function playMusic() {
  music.play();
  play = true;
  setInterval(() => {
    if (play) {
      music.play();
    }
  }, 10000);

  document.getElementById("music-off").classList.add("hidden");
  document.getElementById("music-on").classList.remove("hidden");
}

/**
 * Stops the background music and updates the UI
 * to show that music is paused.
 */
function stopMusic() {
  play = false;
  music.pause();

  document.getElementById("music-on").classList.add("hidden");
  document.getElementById("music-off").classList.remove("hidden");
}

