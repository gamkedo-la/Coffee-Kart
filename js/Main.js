// save the canvas for dimensions, and its 2d context for drawing to it
var canvas, canvasContext;
const SCREEN_WIDTH = 1280;
const SCREEN_HEIGHT = 720;
const framesPerSecond = 30;

var courseIndex = 0;
var p1 = new carClass();
var p2 = new carClass();
var camera = new CameraClass();
var timer = new CountdownTimer();
var speedometer = new Speedometer();
var pauseUI = new PauseUI();
var paused = false;
var canChangePauseState = true;

window.onload = function () {
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext("2d");

  loadImages();
};

function loadingDoneSoStartGame() {
  // these next few lines set up our game logic and render to happen 30 times per second
  setInterval(function () {
    updateEverything();
    moveEverything();
    drawEverything();
  }, 1000 / framesPerSecond);
  timer.resume();
  p2.carInit(car2Pic);
  p1.carInit(carSportPic, true);
  camera.InitCamera(
    SCREEN_WIDTH / 2,
    SCREEN_HEIGHT / 2,
    SCREEN_WIDTH,
    SCREEN_HEIGHT,
    Vec2Init(
      TRACK_COLS * TRACK_W - SCREEN_WIDTH / 2.0,
      TRACK_ROWS * TRACK_H - SCREEN_HEIGHT / 2.0
    ),
    Vec2Init(SCREEN_WIDTH / 2.0, SCREEN_HEIGHT / 2.0),
    1.0
  ); // end InitCamera
  initInput();
}
function updateEverything() {
  if (paused) {
    pauseUI.update();
    return;
  }
  updateEditor();
  updateWaypointEditor();
  timer.update();
  speedometer.setSpeed(p1.carSpeed);
}
function moveEverything() {
  if (paused) return;
  p1.carMove();
  p2.carMove();
  camera.UpdateCamera(p1.position);
}

function drawEverything() {
  drawTracks();

  decals.draw(-camera.drawPosition.x, -camera.drawPosition.y); // tire tracks etc

  p1.carDraw();
  p2.carDraw();
  speedometer.draw();
  timer.draw();

  if (paused) {
    pauseUI.draw();
  }

  if (trackEditorOn) {
    drawEditor();
  }
}
