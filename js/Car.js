// car tuning constants
const GROUNDSPEED_DECAY_MULT = 0.94;
const DRIVE_POWER = 0.5;
const REVERSE_POWER = 0.2;
const TURN_RATE = 1.0;
const MIN_TURN_SPEED = 0.5;

function carClass() {
  // variables to keep track of car position

  // todo
  // add RPM to wheels
  //this.position = Vec2Init(75, 75);
  //this.carHeading = Vec2Init(0,1);
  //this.wheelHeading = Vec2Init(0,1);
  //this.carAng = -90;

  // keyboard hold state variables, to use keys more like buttons
  this.keyHeld_Gas = false;
  this.keyHeld_Reverse = false;
  this.keyHeld_TurnLeft = false;
  this.keyHeld_TurnRight = false;

  // key controls used for this car 
  this.setupControls = function(forwardKey,backKey,leftKey,rightKey) {
    this.controlKeyForGas = forwardKey;
    this.controlKeyForReverse = backKey;
    this.controlKeyForTurnLeft = leftKey;
    this.controlKeyForTurnRight = rightKey;
  }

  this.carInit = function(whichGraphic,whichName) {
    this.myBitmap = whichGraphic;
    this.myName = whichName;
    this.carReset();
  }
  
  this.carReset = function() {
    this.carSpeed = 0;
    this.carAng = -90; // currently in radians. why -ve? because 'up' is negative
    this.wheelAng = -90;
    if(this.homeX == undefined) {
      for(var i=0; i<trackGrid.length; i++) {
        if( trackGrid[i] == TRACK_PLAYER) {
          var tileRow = Math.floor(i/TRACK_COLS);
          var tileCol = i%TRACK_COLS;
          this.homeX = tileCol * TRACK_W + 0.5*TRACK_W;
          this.homeY = tileRow * TRACK_H + 0.5*TRACK_H;
          trackGrid[i] = TRACK_ROAD;
          break; // found it, so no need to keep searching 
        } // end of if
      } // end of for
    } // end of if car position not saved yet

    this.position = Vec2Init(this.homeX, this.homeY);
    this.carHeading = Vec2Init(0,1);
    this.wheelHeading = Vec2Init(0,1);
    


  } // end of carReset
  
  this.carMove = function() {
    const turnSpeed = 5.25;
    // only allow the car to turn while it's rolling
    //if(Math.abs(this.carSpeed) > MIN_TURN_SPEED) {
      if(this.keyHeld_TurnLeft) {
        this.carAng -= turnSpeed;
      }

      if(this.keyHeld_TurnRight) {
        this.carAng += turnSpeed;
      }
    //}
    
    if(this.keyHeld_Gas) {
      this.carSpeed += DRIVE_POWER;
    }
    if(this.keyHeld_Reverse) {
      this.carSpeed -= REVERSE_POWER;
    }
    
    //var heading = Vec2PolarInit(this.carAng, 1);
    Vec2Update(this.carHeading, cosDeg(this.carAng), sinDeg(this.carAng));
    
    console.log("angle is" + this.carAng);
    
    
    var nextPos = Vec2Add(this.position, Vec2Scale(this.carHeading, this.carSpeed));
    
    var drivingIntoTileType = getTrackAtPixelCoord(nextPos.x,nextPos.y);
    
    if( drivingIntoTileType == TRACK_ROAD ) {
      this.position = nextPos;
    } else if( drivingIntoTileType == TRACK_GOAL ) {
      document.getElementById("debugText").innerHTML = this.myName + " won the race";
      p1.carReset();
      p2.carReset();
    } else {
      // TODO: extra collision handling here
      this.carSpeed = 0.0;
    }

    this.carSpeed *= GROUNDSPEED_DECAY_MULT;
  }
  
  this.carDraw = function() {
    // drawBitmapCenteredAtLocationWithRotation( this.myBitmap, this.carX, this.carY, this.carAng );
    drawBitmapCenteredAtLocationWithRotation( this.myBitmap, this.position.x, this.position.y, degToRad(this.carAng) );
  }

} // end of car class