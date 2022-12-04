const DEBUG_DRAW = true;

function carClass() {
  // waypoints for ai.
  this.waypoints = [waypointInit(175, 300, 0, 20), waypointInit(500, 150, 20, 20)];
  this.waypointCounter = 0;
  // todo : visualize these


  // variables to keep track of car position

  // todo
  // add RPM to wheels

  // to be used later
  this.gearRatios = [2.5, 1.8, 1.4, 1.0, 0.75];
  this.diffRatio = 3.4;
  this.wheelRadius = 0.3;

  // keyboard hold state variables, to use keys more like buttons
  this.keyHeld_Gas = false;
  this.keyHeld_Reverse = false;
  this.keyHeld_TurnLeft = false;
  this.keyHeld_TurnRight = false;
  this.keyHeld_Handbrake = false;

  // key controls used for this car 
  this.setupControls = function(forwardKey,backKey,leftKey,rightKey, spaceKey) {
    this.controlKeyForGas = forwardKey;
    this.controlKeyForReverse = backKey;
    this.controlKeyForTurnLeft = leftKey;
    this.controlKeyForTurnRight = rightKey;
    this.controlKeyForHandbrake = spaceKey;
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

    this.reverseTimer = 0;
    this.reversing = false;
    this.handBrake = false;
    this.drawTireTracks = false;


  } // end of carReset

  this.carMove = function() {
    if (this.isPlayer) {
      this.carMovePlayer();
    } else {
      this.carMoveAi();
    }
  }

  this.carMoveAi = function() {
    const turnSpeed = 360.0;
    const wheelDeadSpot = 15;
    const wheelDecayRate = 0.5;
    const wheelAngleMin = -30;
    const wheelAngleMax = 30;
    const fixedDt = 30.0/1000.0;    
    const roadFriction = 12.8;
    const engineDecayRate = 6000;
    const dragCoefficient = 0.04;
    const drivePower = 4000;
    const reversePower = 7000;
    const drivePowerMax = 7000;
    const drivePowerMaxReverse = -3000;
    const collisionDecay = 0.97;


    // todo: 
    // get heading to next waypoint
    // update angle of current heading by rotation
    // apply acceleration in that direction
    // when within a certain distance of the waypoint, update to a new waypoint

  }
  
  this.carMovePlayer = function() {
    const turnSpeed = 360.0;
    const wheelDeadSpot = 15;
    const wheelDecayRate = 0.5;
    const wheelAngleMin = -30;
    const wheelAngleMax = 30;
    const fixedDt = 30.0/1000.0;    
    const roadFriction = 2.8;
    const engineDecayRate = 6000;
    const dragCoefficient = 0.04;
    const drivePower = 4000;
    const reversePower = 7000;
    const drivePowerMax = 7000;
    const drivePowerMaxReverse = -3000;
    const collisionDecay = 0.97;

    this.drawTireTracks = false;

    if(this.keyHeld_TurnLeft) {
        if (this.wheelAng > wheelAngleMin) {
          this.wheelAng -= turnSpeed * fixedDt;
          this.drawTireTracks = true;
        }
    } else if(this.keyHeld_TurnRight) {
        if (this.wheelAng < wheelAngleMax) {
          this.wheelAng += turnSpeed * fixedDt;
          this.drawTireTracks = true;
        }
    } else {
      if (Math.abs(this.wheelAng) < wheelDeadSpot) {
        this.wheelAng *= wheelDecayRate;
      } else {
        this.wheelAng = 0;
      }
    }
    
    // engine stuff

    
    const brakingConst = -30000.0;
    var brakingForce = Vec2Init(0, 0);

    this.handBrake = false;

    if (this.keyHeld_Handbrake) {      
      this.handBrake = true;
      this.drawTireTracks = true;
    }

    if(this.keyHeld_Gas) {
      // make this * fixedDt ?
      if (this.reversing) {
        this.reversing = false;
      }
      if (!this.handBrake) {
        this.engineForce += (drivePower * fixedDt);
      }
    
    } else if(this.keyHeld_Reverse) {
      if (!this.reversing) {
        
        
        const revEpsilon = 10;
        const reverseTimerMax = 0.25;
        if (this.engineForce > revEpsilon) {
          this.engineForce -= (reversePower * fixedDt);
          brakingForce = Vec2Scale(this.carHeading, brakingConst * fixedDt);
        } else {
          this.engineForce = 0;
          this.reverseTimer += fixedDt;
          if (this.reverseTimer > reverseTimerMax) {
            this.reversing = true;
            this.reverseTimer = 0;
          }
        }
      }
      if (this.reversing) {
        this.engineForce -= (reversePower * fixedDt);
      }
    
    } 
    if (this.handBrake || ((!this.keyHeld_Gas) && (!this.keyHeld_Reverse))) {
      //console.log("reducing engine speed");
      if (this.engineForce > 0) {
        this.engineForce -= (engineDecayRate*fixedDt);
        if (this.engineForce < 0) { // don't oscilate
          this.engineForce = 0;
        }
      } 
      if (this.engineForce < 0) {
        this.engineForce += (engineDecayRate*fixedDt);
        if (this.engineForce > 0) { // don't oscilate
          this.engineForce = 0;
        }
      }
      if (Math.abs(this.engineForce) < 5) {
        this.engineForce = 0;
      }
    }

    if (this.engineForce > drivePowerMax) {
      this.engineForce = drivePowerMax;
      this.drawTireTracks = true;
    }
    if (this.engineForce < (drivePowerMaxReverse)) {
      this.engineForce = drivePowerMaxReverse;
      this.drawTireTracks = true;
    }
    

    
    var tractionForce = Vec2Scale(this.carHeading, this.engineForce);
    if (this.handBrake) {
      tractionForce = Vec2Scale(Vec2Normalize(this.carVelocity), this.engineForce);
    }
    
    var rollingResistanceForce = Vec2Scale(this.carVelocity, -1.0*roadFriction);
    
    var dragForce = Vec2Scale(this.carVelocity, -1.0 * Vec2Mag(this.carVelocity) * dragCoefficient);
    
    var longForce = Vec2Add(Vec2Add(Vec2Add(tractionForce, rollingResistanceForce), dragForce), brakingForce);


    var accel = Vec2Scale(longForce , 1.0 / this.carMass);
    this.carVelocity = Vec2Add(this.carVelocity, Vec2Scale(accel, fixedDt));
    //console.log("velocity mag " + Vec2Mag(this.carVelocity));
    if (Vec2Mag(this.carVelocity) < 1) {
      Vec2Update(this.carVelocity, 0, 0);
    }
    var nextPos = Vec2Add(this.position, Vec2Scale(this.carVelocity, fixedDt));


    var carSpeed = Vec2Mag(this.carVelocity);
    this.carSpeed = carSpeed;
    
    // turning stuff
    // low speed assumption?
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

    // high speed scenario

    
    
    
    // todo
    // wrap below into a collision function
    
    var drivingIntoTileType = getTrackAtPixelCoord(nextPos.x,nextPos.y);
    
    if( drivingIntoTileType == TRACK_ROAD ) {
      this.position = nextPos;
    } else if( drivingIntoTileType == TRACK_GOAL ) {
      document.getElementById("debugText").innerHTML = this.myName + " won the race";
      p1.carReset();
      p2.carReset();
      timer.setTime(TIME_DEFAULT);
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
        this.carVelocity = Vec2Scale(this.carVelocity, collisionDecay);
        this.engineForce *= collisionDecay;
      } else if (trackVertical == TRACK_ROAD) {
    
        this.position = Vec2Add(this.position, Vec2Scale(headingVertical, fixedDt * this.carSpeed));
        this.carVelocity = Vec2Scale(this.carVelocity, collisionDecay);
        this.engineForce *= collisionDecay;
      } else if (trackVertical != TRACK_ROAD && trackHorizontal != TRACK_ROAD) {
    
    
        this.position = Vec2Add(this.position, Vec2Scale(actualHeading, -0.1*this.carSpeed*fixedDt));
        this.carVelocity = Vec2Scale(this.carVelocity, -0.5);
        this.engineForce = 0;
      }

      
    }

    
  }
  
  this.carDraw = function() {      
    
    if (DEBUG_DRAW) {
      for (let i = 0; i < this.waypoints.length; i++) {
        wayPoint = this.waypoints[i];
        colorCircle(wayPoint.x - camera.drawPosition.x, wayPoint.y - camera.drawPosition.y, 40, "blue");
      }
    }
    drawBitmapCenteredAtLocationWithRotation( this.myBitmap, this.position.x - camera.drawPosition.x, this.position.y - camera.drawPosition.y, degToRad(this.carAng + 90) );        
    // draw tire tracks
    // todo: only when accel is max, when we are drifting, or brakes are on
    if (!this.drawTireTracks) return
    
    if (this.lastTireTrackX != this.position.x || this.lastTireTrackY != this.position.y) {
      decals.add(this.position.x,this.position.y,degToRad(this.carAng + 90),0.1,tireTracksPic);
      this.lastTireTrackX = this.position.x;
      this.lastTireTrackY = this.position.y;
    }
  }

} // end of car class