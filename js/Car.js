// car tuning constants


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

  this.carInit = function(whichGraphic,whichName, isPlayerVal) {
    this.myBitmap = whichGraphic;
    this.myName = whichName;
    this.isPlayer = isPlayerVal;
    this.carReset();
  }
  
  this.carReset = function() {
    this.carSpeed = 0;
    this.wheelSpeed = 0; // rpm of wheels, inherently 1-dimensional
    this.carAng = -90; // currently in radians. why -ve? because 'up' is negative
    this.wheelAng = 0;
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
    this.wheelBase = 1.2;
    this.carVelocity = Vec2Init(0, 0);
    this.engineForce = 0;
    this.carMass = 2;        


  } // end of carReset
  
  this.carMove = function() {
    const turnSpeed = 720.0;
    const wheelDeadSpot = 15;
    const wheelDecayRate = 0.5;
    const wheelAngleMin = -45;
    const wheelAngleMax = 45;
    const fixedDt = 30.0/1000.0;    
    const roadFriction = 1.28;
    const engineDecayRate = 500;
    const dragCoefficient = 0.04;
    const drivePower = 500;
    const drivePowerMax = 3000;
    const drivePowerMaxReverse = -3000;


    if(this.keyHeld_TurnLeft) {
        if (this.wheelAng > wheelAngleMin) {
          this.wheelAng -= turnSpeed * fixedDt;
        }
    } else if(this.keyHeld_TurnRight) {
        if (this.wheelAng < wheelAngleMax) {
          this.wheelAng += turnSpeed * fixedDt;
        }
    } else {
      if (Math.abs(this.wheelAng) < wheelDeadSpot) {
        this.wheelAng *= wheelDecayRate;
      } else {
        this.wheelAng = 0;
      }
    }
    
    // engine stuff
    if(this.keyHeld_Gas) {
      this.engineForce += drivePower;
      //this.carSpeed += DRIVE_POWER;
    } else if(this.keyHeld_Reverse) {
      this.engineForce -= drivePower;
      //this.carSpeed -= REVERSE_POWER;
    } else {
      if (this.engineForce > 0) {
        this.engineForce -= (engineDecayRate*fixedDt);
      } 
      if (this.engineForce < 0) {
        this.engineForce += (engineDecayRate*fixedDt);
      }
      if (Math.abs(this.engineForce) < 5) {
        this.engineForce = 0;
      }
    }

    if (this.engineForce > drivePowerMax) {
      this.engineForce = drivePowerMax;
    }
    if (this.engineForce < (drivePowerMaxReverse)) {
      this.engineForce = drivePowerMaxReverse;
    }
    
    
    var tractionForce = Vec2Scale(this.carHeading, this.engineForce);
    
    var rollingResistanceForce = Vec2Scale(this.carVelocity, -1.0*roadFriction);
    
    var dragForce = Vec2Scale(this.carVelocity, -1.0 * Vec2Mag(this.carVelocity) * dragCoefficient);
    
    var longForce = Vec2Add(Vec2Add(tractionForce, rollingResistanceForce), dragForce);
    var accel = Vec2Scale(longForce , 1.0 / this.carMass);
    this.carVelocity = Vec2Add(this.carVelocity, Vec2Scale(accel, fixedDt));
    console.log("velocity mag " + Vec2Mag(this.carVelocity));
    if (Vec2Mag(this.carVelocity) < 1) {
      Vec2Update(this.carVelocity, 0, 0);
    }
    var nextPos = Vec2Add(this.position, Vec2Scale(this.carVelocity, fixedDt));


    var carSpeed = Vec2Mag(this.carVelocity);
    this.carSpeed = carSpeed;
    // this.carPosition 
    // turning stuff
    var angularVelocityRad;
    if (sinDeg(this.wheelAng) == 0) {
      angularVelocityRad = 0;
    } else {
      var circleRadius = this.wheelBase / sinDeg(this.wheelAng);
      angularVelocityRad = (carSpeed * fixedDt) / circleRadius;
    }
    
    var angularVelocityDeg = radToDeg(angularVelocityRad);
    
    
    this.carAng += (angularVelocityDeg * fixedDt);

    
    
    
    Vec2Update(this.carHeading, cosDeg(this.carAng), sinDeg(this.carAng));
    //Vec2Update(this.carVelocity, carSpeed * cosDeg(this.carAng), carSpeed * sinDeg(this.carAng));
    
    
    
    
    
    
    var drivingIntoTileType = getTrackAtPixelCoord(nextPos.x,nextPos.y);
    
    if( drivingIntoTileType == TRACK_ROAD ) {
      this.position = nextPos;
    } else if( drivingIntoTileType == TRACK_GOAL ) {
      document.getElementById("debugText").innerHTML = this.myName + " won the race";
      p1.carReset();
      p2.carReset();
    } else {
    
      var actualHeading = Vec2Init(0, 0);
      if (Vec2Mag(this.carVelocity) > 1) {
        actualHeading = Vec2Normalize(this.carVelocity);
      }
      var headingHorizontal = Vec2Init(actualHeading.x, 0);
      var headingVertical = Vec2Init(0, actualHeading.y);
      var nextPosHorizontal = Vec2Add(this.position, Vec2Scale(headingHorizontal, fixedDt * this.carSpeed));
      var nextPosVertical = Vec2Add(this.position, Vec2Scale(headingVertical, fixedDt * this.carSpeed));
      var trackHorizontal = getTrackAtPixelCoord(nextPosHorizontal.x, nextPosHorizontal.y);
      var trackVertical = getTrackAtPixelCoord(nextPosVertical.x, nextPosVertical.y);
    
      if (trackHorizontal == TRACK_ROAD) {
    
        this.position = Vec2Add(this.position, Vec2Scale(headingHorizontal, fixedDt * this.carSpeed));
        this.carVelocity = Vec2Scale(this.carVelocity, 0.97);
        this.engineForce *= 0.97;
      } else if (trackVertical == TRACK_ROAD) {
    
        this.position = Vec2Add(this.position, Vec2Scale(headingVertical, fixedDt * this.carSpeed));
        this.carVelocity = Vec2Scale(this.carVelocity, 0.97);
        this.engineForce *= 0.97;
      } else if (trackVertical != TRACK_ROAD && trackHorizontal != TRACK_ROAD) {
    
    
        this.position = Vec2Add(this.position, Vec2Scale(actualHeading, -0.1*this.carSpeed*fixedDt));
        this.carVelocity = Vec2Scale(this.carVelocity, -0.5);
        this.engineForce = 0;
      }

      //this.carSpeed = 0.0;
    }

    
  }
  
  this.carDraw = function() {      
    drawBitmapCenteredAtLocationWithRotation( this.myBitmap, this.position.x - camera.drawPosition.x, this.position.y - camera.drawPosition.y, degToRad(this.carAng + 90) );        
    
  }

} // end of car class