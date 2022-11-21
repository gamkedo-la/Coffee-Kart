// save the canvas for dimensions, and its 2d context for drawing to it
var canvas, canvasContext;
const SCREEN_WIDTH = 1280;
const SCREEN_HEIGHT = 720;


var p1 = new carClass();
var p2 = new carClass();
var camera = new CameraClass();

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  
  loadImages();
}

function loadingDoneSoStartGame() {
  // these next few lines set up our game logic and render to happen 30 times per second
  var framesPerSecond = 30;
  setInterval(function() {
      moveEverything();
      drawEverything();
    }, 1000/framesPerSecond);
  
  p2.carInit(car2Pic, "Green Car", false);
  p1.carInit(carPic, "Blue Car", true);
  camera.InitCamera(SCREEN_WIDTH/2, SCREEN_HEIGHT/2, 
       SCREEN_WIDTH, SCREEN_HEIGHT, Vec2Init((TRACK_COLS * TRACK_W) - SCREEN_WIDTH/2.0,
       TRACK_ROWS * TRACK_H - SCREEN_HEIGHT/2.0),
       Vec2Init(SCREEN_WIDTH/2.0, SCREEN_HEIGHT/2.0), 1.0); // end InitCamera
  initInput();  
}

function moveEverything() {
  p1.carMove();
  //p2.carMove();
  camera.UpdateCamera(p1.position);
}

function drawEverything() {
  drawTracks();
  
  p1.carDraw();
  //p2.carDraw();    
}