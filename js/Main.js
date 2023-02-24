// save the canvas for dimensions, and its 2d context for drawing to it
var canvas, canvasContext;
const SCREEN_WIDTH = 1280;
const SCREEN_HEIGHT = 720;
const framesPerSecond = 30;

const countdownToUse = 4;


const GS_TITLE_SCREEN = 0;
const GS_SELECT_LEVEL = 1;
const GS_RACING = 2;
const GS_SHOW_SCORES = 3;
const GS_SHOW_INSTRUCTIONS = 4;
const GS_EDITING = 5;

var gGameState = GS_TITLE_SCREEN;

var courseIndex = 0;
var currentlyRaining = true; // FIXME: set to true on track 2(?) only

// limit ourselves to four cars
var p1 = new carClass(); // player
var p2 = new carClass();
var p3 = new carClass();
var p4 = new carClass();
var camera = new CameraClass();
let editorCamera = new EditorCamera();
var timer = new CountdownTimer();
var speedometer = new Speedometer();
var pauseUI = new PauseUI();
var titleUI = new TitleScreenUI();

var levelSelect = new LevelSelect();

var scoreBoard = new ScoreBoard();

var paused = false;

var onLevelSelectScreen = true;
var onRaceResultsScreen = false;

var onTitleScreen = false;
var canChangePauseState = true;
gCars = [];
carCount = 0;



window.onload = function () {
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext("2d");

  loadImages();
  initInput();
};

function reset() {
  resetAllCars();
  resetCurrentTrack();
}

function loadingDoneSoStartGame() {
  // these next few lines set up our game logic and render to happen 30 times per second
  setInterval(function () {
    updateEverything();
    moveEverything();
    drawEverything();
  }, 1000 / framesPerSecond);
  timer.resume();

  p1.carInit(carSportPic, 1, true);
  p2.carInit(motorcyclePic, 2);
  p3.carInit(carOpenTopPic, 3);
  p4.carInit(carPic, 4);

  gCars = [p1, p2, p3, p4];
  

  
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
  //initInput();
}
function updateEverything() {
  if (paused) {
    pauseUI.update();
    return;
  } else if (gGameState == GS_TITLE_SCREEN) {
    titleUI.update();
    return;
  } else if (gGameState == GS_SELECT_LEVEL) {
    // update level select    
    levelSelect.updateLevelSelect();
    return;
  } else if (gGameState == GS_SHOW_SCORES) {
    // update race results
    scoreBoard.updateScoreboard();
    return;
  }

  updateEditor();
  updateWaypointEditor();
  updatePowerupEditor();
  updatePowerups();
  // at this level of the loop we can probably
  // rank the cars based on their positions
  rankCars();
  timer.update();
  speedometer.setSpeed(p1.carSpeed);
  speedometer.setGear(p1.engineSoundGear);
  speedometer.setRPM(p1.engineSoundRPM);
}
function moveEverything() {
  if (paused || gGameState != GS_RACING) return;

  particles.update();

  if (trackEditorOn) {
    editorCamera.moveEditorCamera();
    camera.UpdateEditorCamera(editorCamera.position);
  } else {
    if (timer.timeElapsed <= countdownToUse) {
      //console.log("counting down");
      //;
    } else {
      for (var i = 0; i < gCars.length; i++) {
        gCars[i].carMove();
      }
    }
    camera.UpdateCamera(p1.position);
  }
}

function drawEverything() {

  if (gGameState == GS_SELECT_LEVEL) {
    levelSelect.drawLevelSelect();
    return; // exit and do not draw anything else
    // draw level select screen
  }

  if (gGameState == GS_SHOW_SCORES) {
    // draw race results
    scoreBoard.drawScoreboard();
  }
    
  if (trackEditorOn) {
    colorRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT, "black");
  }

  drawTracks();

  drawPowerups();

  decals.draw(-camera.drawPosition.x, -camera.drawPosition.y); // tire tracks etc

  particles.draw(-camera.drawPosition.x, -camera.drawPosition.y);

  for (var i = 0; i < gCars.length; i++) {
    gCars[i].carDraw();
  }

  // draw arrow just on player (and don't get drawn over)
  for (var i = 0; i < gCars.length; i++) {
    if (gCars[i].isPlayer) {
      gCars[i].drawStartArrow();
    }
  }

  if (currentlyRaining)
    drawRain(-camera.drawPosition.x, -camera.drawPosition.y);

  speedometer.draw();
  
  if (!paused && timer.timeElapsed <= countdownToUse) {
    timer.drawCountdown();
  } else {
    timer.draw();
  }

  if (paused) {
    pauseUI.draw();
  } else if (gGameState == GS_TITLE_SCREEN) {
    titleUI.draw();
  }

  if (trackEditorOn) {
    drawEditor();
    if (waypointEditorOn) {
      drawWaypoints();
    }
  }

  
}
