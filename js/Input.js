// keyboard keycode constants, determined by printing out evt.keyCode from a key handler
const KEY_ENTER = 13;
const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;
const KEY_DIGIT_0 = 48;
const KEY_DIGIT_1 = 49;
const KEY_DIGIT_2 = 50;
const KEY_DIGIT_3 = 51;
const KEY_LETTER_W = 87;
const KEY_LETTER_A = 65;
const KEY_LETTER_S = 83;
const KEY_LETTER_D = 68;
const KEY_LETTER_SPACE = 32;
const KEY_LETTER_P = 80;
const KEY_LETTER_E = 69;
const KEY_LETTER_R = 82;
const KEY_LETTER_U = 85;
const controlKeyForWaypointEditor = KEY_LETTER_R;
const controlKeyForPowerupEditor = KEY_LETTER_U; 
const KEY_DEL = 46;

var keyPressedWaypointDelete = false;
var canDelete = true;
var clickedYet = false;

function initInput() {
  document.addEventListener("keydown", keyPressed);
  document.addEventListener("keyup", keyReleased);
  document.addEventListener("mousedown", mousePressed)
  p1.setupControls(
    KEY_UP_ARROW,
    KEY_DOWN_ARROW,
    KEY_LEFT_ARROW,
    KEY_RIGHT_ARROW,
    KEY_LETTER_SPACE
  );
  //p2.setupControls(KEY_LETTER_W,KEY_LETTER_S,KEY_LETTER_A,KEY_LETTER_D);

  pauseUI.setMenuControls({
    downKey: KEY_DOWN_ARROW,
    upKey: KEY_UP_ARROW,
    selectKey: KEY_ENTER,
  });
  titleUI.setMenuControls({
    downKey: KEY_DOWN_ARROW,
    upKey: KEY_UP_ARROW,
    selectKey: KEY_ENTER,
  });
  controlsUI.setMenuControls({
    downKey: KEY_DOWN_ARROW,
    upKey: KEY_UP_ARROW,
    selectKey: KEY_ENTER,
  });

  levelSelect.setLevelSelectControls({
    leftKey: KEY_LEFT_ARROW,
    rightKey: KEY_RIGHT_ARROW,
    selectKey: KEY_ENTER,
  });

  scoreBoard.setScoreboardControls({    
    selectKey: KEY_ENTER,
  });

  editorCamera.setupControls(
    KEY_LEFT_ARROW,
    KEY_RIGHT_ARROW,
    KEY_UP_ARROW,
    KEY_DOWN_ARROW
  );
}

function mousePressed() {
  if (!clickedYet) {
    clickedYet = true;    
  }
}

function setKeyHoldState(thisKey, thisCar, setTo) {
  if (thisKey == thisCar.controlKeyForTurnLeft) {
    thisCar.keyHeld_TurnLeft = setTo;
  }
  if (thisKey == thisCar.controlKeyForTurnRight) {
    thisCar.keyHeld_TurnRight = setTo;
  }
  if (thisKey == thisCar.controlKeyForGas) {
    thisCar.keyHeld_Gas = setTo;
  }
  if (thisKey == thisCar.controlKeyForReverse) {
    thisCar.keyHeld_Reverse = setTo;
  }
  if (thisKey == thisCar.controlKeyForHandbrake) {
    thisCar.keyHeld_Handbrake = setTo;
  }
  if (thisKey == controlKeyForEditor) {
    keyHeld_Editor = setTo;
  }
  if (thisKey == controlKeyForWaypointEditor) {
    keyHeld_WaypointEditor = setTo;
  }
  if (thisKey == controlKeyForPowerupEditor) {
    keyHeld_PowerupEditor = setTo;
  }
  
}

function keyPressed(evt) {
  evt.preventDefault(); // without this, arrow keys scroll the browser!
  if(gGameState == GS_SHOW_CREDITS) {
    gGameState = GS_TITLE_SCREEN;
    return;
  }
  setKeyHoldState(evt.keyCode, p1, true);
  //setKeyHoldState(evt.keyCode, p2, true);
  editorCamera.setKeyHoldState(evt.keyCode, true);
  pauseUI.setKeyHoldState(evt.keyCode, true);
  titleUI.setKeyHoldState(evt.keyCode, true);
  controlsUI.setKeyHoldState(evt.keyCode, true);
  levelSelect.setKeyHoldState(evt.keyCode, true);
  scoreBoard.setKeyHoldState(evt.keyCode, true);

  // we've pressed the pause key, so pause the game and only listen to this first press
  if (evt.keyCode == KEY_LETTER_P && canChangePauseState) {
    paused = !paused;
    canChangePauseState = false;
  }
  if (evt.keyCode == KEY_DEL && canDelete) {
    keyPressedWaypointDelete = true;;
    canDelete = false;
  }

  if (evt.keyCode == KEY_DIGIT_0) {
    resetCurrentTrack();
  }
  if (evt.keyCode == KEY_DIGIT_1) {
    goToTrack(0);
  }
  if (evt.keyCode == KEY_DIGIT_2) {
    goToTrack(1);
  }
  if (evt.keyCode == KEY_DIGIT_3) {
    goToTrack(2);
  }
}

function keyReleased(evt) {
  setKeyHoldState(evt.keyCode, p1, false);
  //setKeyHoldState(evt.keyCode, p2, false);
  editorCamera.setKeyHoldState(evt.keyCode, false);
  pauseUI.setKeyHoldState(evt.keyCode, false);
  titleUI.setKeyHoldState(evt.keyCode, false);
  controlsUI.setKeyHoldState(evt.keyCode, false);
  levelSelect.setKeyHoldState(evt.keyCode, false);
  scoreBoard.setKeyHoldState(evt.keyCode, false);
  // prevents player from toggling pause on and off while holding pause key

  // we've released the pause key, so allow us to unpause on the next press
  if (evt.keyCode == KEY_LETTER_P) {
    canChangePauseState = true;
  }
  if (evt.keyCode == KEY_DEL) {
    canDelete = true;
  }
}
