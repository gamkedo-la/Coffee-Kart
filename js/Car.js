const DEBUG_DRAW = true;
const AI_DEBUG_MODE = false; // console.log spam
const AI_WAYPOINT_TRIGGER_DISTANCE = 350; // how close we need to get to each waypoint

const turnSpeed = 360.0;
const wheelDeadSpot = 15;
const wheelDecayRate = 0.5;
const wheelAngleMin = -30;
const wheelAngleMax = 30;
const fixedDt = 30.0/1000.0;    
const roadFriction = 2.8; // pulled from the track now, only used as default
const engineDecayRate = 6000;
const dragCoefficient = 0.04;
const drivePower = 4000;
const reversePower = 7000;
const drivePowerMax = 7000;
const drivePowerMaxReverse = -3000;
const collisionDecay = 0.97;

const waypointEps = 20.0;

function carClass() {
    
    // waypoints for ai.
  this.waypoints = [];
  for (const config of TRACKS[courseIndex].waypoints) {
    this.waypoints.push(waypointInitWithConfig(config));
  }
  this.waypointCounter = 0;
  // todo : visualize these


  // variables to keep track of car position

  // todo
  // add RPM to wheels

  // to be used later
  this.engineSoundGear = 1; // only affects sound
  this.engineSoundRPM = 1000; // sound loop playback rate * 1000
  this.gearRatios = [2.5, 1.8, 1.4, 1.0, 0.75];
  this.diffRatio = 3.4;
  this.wheelRadius = 0.3;
  this.tireTrackAlpha = 0.1; // default: very faint
  this.tireTrackAlphaDRIFT = 0.4; // dark when handbrake skidding
  this.tireTrackAlphaACCEL = 0.25; // medium when pedal to the metal
  this.driftVol = 0; // current bvolume of drifting sound, used to fade in and out

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

  this.carInit = function(whichGraphic, isPlayerVal = false) {
    this.myBitmap = whichGraphic;
    this.myName = this.nameFromGraphic();
    this.isPlayer = isPlayerVal;
    this.carWidth = this.myBitmap.width;
    this.carHeight = this.myBitmap.height;    
    this.carReset();
  }

  this.nameFromGraphic = function() {
    switch (this.myBitmap) {
      case carPic:
        return 'Blue Car';
      case car2Pic:
        return 'Green Car';
      case car3Pic:
        return 'Red Car';
      case carSportPic:
        return 'Red Sports Car';
      default:
        return 'Unknown Car';
    }
  }

  this.resetWaypoints = function() {
    this.waypoints = [];
    for (const config of TRACKS[courseIndex].waypoints) {
      this.waypoints.push(waypointInitWithConfig(config));
    }
    this.waypointCounter = 0;
  }
  
  this.carReset = function() {
    this.carSpeed = 0;
    this.wheelSpeed = 0; // rpm of wheels, inherently 1-dimensional
    this.carAng = -90; // currently in radians. why -ve? because 'up' is negative
    this.wheelAng = 0;
    if(this.homeX == undefined) {
      for(var i=0; i<TRACKS[courseIndex].grid.length; i++) {
        if( TRACKS[courseIndex].grid[i] == TRACK_PLAYER) {
          var tileRow = Math.floor(i/TRACK_COLS);
          var tileCol = i%TRACK_COLS;
          this.homeX = tileCol * TRACK_W + 0.5*TRACK_W;
          this.homeY = tileRow * TRACK_H + 0.5*TRACK_H;
          TRACKS[courseIndex].grid[i] = TRACK_ROAD;
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
    this.carFriction = roadFriction;
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

    // change the pitch of the motor sound loop
    if (this.engineSound) {
        
        // gear shifting simulation based on speed
        this.engineSoundRPM = 1000 * (0.25+6*(this.carSpeed/500)); // sound loop speed scale * 1000
        let prevGear = this.engineSoundGear;
        this.engineSoundGear = 1;
        if (this.carSpeed>200) this.engineSoundGear++;
        if (this.carSpeed>300) this.engineSoundGear++;
        // bump down RPM for each gear
        this.engineSoundRPM -= (this.engineSoundGear-1) * 1000;
        // play a sound the 1st time we shift up
        if (prevGear < this.engineSoundGear) {
            //console.log("gear shift up!");
            if (this.gearShiftUpSFX) this.gearShiftUpSFX.play();
        }

        document.getElementById("debugText").innerHTML = "ENGINE SOUND DEBUG: speed: "+this.carSpeed.toFixed(0)+" gear:"+this.engineSoundGear+" rpm:"+this.engineSoundRPM.toFixed(0);
        
        this.engineSound.playbackRate = this.engineSoundRPM / 1000; // so that 1000 rpm is 100% playback speed when idling
        
        if (this.carSpeed < 10) // almost stopped: fade sound out
            this.engineSound.volume = 0.25 * this.carSpeed/10; // silence as we slow
        else 
            this.engineSound.volume = 0.25; // default
    }

    // drifting skid sound
    if (this.driftSound) {
        if (!this.handBrake) { // fade out the sound
            this.driftVol -= 0.01;
            if (this.driftVol<0) this.driftVol=0;
            this.driftSound.volume = Math.min(this.driftVol,this.carSpeed/500);
        } else { // fade in the sound
            this.driftVol += 0.01;
            if (this.driftVol>0.1) this.driftVol=0.1;
            this.driftSound.volume = Math.min(this.driftVol,this.carSpeed/500);
        }
    }


  }

  this.carMoveAi = function() {
    
    // todo: 
    // get heading to next waypoint
    // update angle of current heading by rotation
    // apply acceleration in that direction
    // when within a certain distance of the waypoint, update to a new waypoint

    var currentWaypoint = this.waypoints[this.waypointCounter];    
    var headingToWaypoint = (Vec2Sub(currentWaypoint.position, this.position)); 
    var distanceToWaypoint = Vec2Distance(this.position, currentWaypoint.position);
    waypointEpsilon = currentWaypoint.radius;
    const headingEpsilon = 0.5;

    if (distanceToWaypoint < waypointEpsilon && this.waypointCounter < (this.waypoints.length - 1)) {
      
      if (AI_DEBUG_MODE) console.log("AI REACHED ("+Math.round(distanceToWaypoint)+" away) waypoint "+this.waypointCounter+" of " +this.waypoints.length);

      // update our waypoint to the next
      this.waypointCounter++;
      currentWaypoint = this.waypoints[this.waypointCounter];    
      headingToWaypoint = Vec2Normalize((Vec2Sub(currentWaypoint.position, this.position)));           
    }    

    // I think this is where the bug was, not taking the "short way around"
    var headingDifference = Vec2Angle(headingToWaypoint) - Vec2Angle(this.carHeading);

    // let's try normalizing the range to +/- 180 degrees - woo hoo I THINK this fixes it!
    if (headingDifference > 180)        { headingDifference -= 2 * 180; }
    else if (headingDifference <= -180) { headingDifference += 2 * 180; }
    
    if (AI_DEBUG_MODE) console.log("ai heading to waypoint " + this.waypointCounter+" of " +this.waypoints.length + " (dist:"+Math.round(distanceToWaypoint)+" headingDifference:"+Math.round(headingDifference)+")");
    
    if (Math.abs(headingDifference) > headingEpsilon) {
      if (headingDifference > 0) {
        // to the right?
        if (this.wheelAng < wheelAngleMax) {
          this.wheelAng += turnSpeed * fixedDt;
          this.drawTireTracks = true;
        }
      } else {
        // to the left?
        if (this.wheelAng > wheelAngleMin) {
          this.wheelAng -= turnSpeed * fixedDt;
          this.drawTireTracks = true;
        }
      }
    }

    const brakingConst = -30000.0;
    var brakingForce = Vec2Init(0, 0);

    this.handBrake = false;
    var hitTheGas = false;
    if (distanceToWaypoint > AI_WAYPOINT_TRIGGER_DISTANCE) {
        //if (AI_DEBUG_MODE) console.log("we are "+Math.round(distanceToWaypoint)+" away from wp "+this.waypointCounter+" of " +this.waypoints.length);
        hitTheGas = true;
    } else {
        // we are near to the next waypoint - maybe slow down?
    }
    
    // let off the gas if we are turning really sharply? (trying to avoid looping around waypoints)
    if (Math.abs(headingDifference) > 60) hitTheGas = false;

    var hitReverse = false;
    
    if (hitTheGas) {
      if (this.reversing) {
        this.reversing = false;
      }
      if (!this.handBrake) {
        this.engineForce += (drivePower * fixedDt);
      }
    } else if (hitReverse) {

    }

    if (hitTheGas && this.engineForce > drivePowerMax) {
      this.engineForce = drivePowerMax;
      this.drawTireTracks = true;
    }
    if (this.engineForce < (drivePowerMaxReverse)) {
      this.engineForce = drivePowerMaxReverse;
      this.drawTireTracks = true;
    }

    // I probably need to use friction here too
    var tractionToApply = Math.min(this.carFriction, 1.0);
    var tractionForce = Vec2Scale(this.carHeading, this.engineForce * tractionToApply);
    if (this.handBrake) {
      
      tractionForce = Vec2Scale(Vec2Normalize(this.carVelocity), this.engineForce);
    }
    
    var rollingResistanceForce = Vec2Scale(this.carVelocity, -1.0*this.carFriction);
    
    var dragForce = Vec2Scale(this.carVelocity, -1.0 * Vec2Mag(this.carVelocity) * dragCoefficient);
    
    var longForce = Vec2Add(Vec2Add(Vec2Add(tractionForce, rollingResistanceForce), dragForce), brakingForce);


    var accel = Vec2Scale(longForce , 1.0 / this.carMass);
    this.carVelocity = Vec2Add(this.carVelocity, Vec2Scale(accel, fixedDt));
    
    if (Vec2Mag(this.carVelocity) < 1) {
      Vec2Update(this.carVelocity, 0, 0);
    }
    var nextPos = Vec2Add(this.position, Vec2Scale(this.carVelocity, fixedDt));


    var carSpeed = Vec2Mag(this.carVelocity);
    //console.log("ai speed is " + carSpeed);
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
    this.carCollidesTrack(nextPos);

    // now that we've updated, check the friction of the tile to use next update
    this.carFriction = tileFriction(getTrackAtPixelCoord(this.position.x, this.position.y));


  }

  this.carCollidesTrack = function(nextPos) {
    var drivingIntoTileType = getTrackAtPixelCoord(nextPos.x,nextPos.y);
    
    if( tileIsDriveable(drivingIntoTileType) ) {
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
    
      if (tileIsDriveable(trackHorizontal)) {
    
        this.position = Vec2Add(this.position, Vec2Scale(headingHorizontal, fixedDt * this.carSpeed));
        this.carVelocity = Vec2Scale(this.carVelocity, collisionDecay);
        this.engineForce *= collisionDecay;
      } else if (tileIsDriveable(trackVertical)) {
    
        this.position = Vec2Add(this.position, Vec2Scale(headingVertical, fixedDt * this.carSpeed));
        this.carVelocity = Vec2Scale(this.carVelocity, collisionDecay);
        this.engineForce *= collisionDecay;
      } else if (!tileIsDriveable(trackVertical) && !tileIsDriveable(trackHorizontal)) {
    
    
        this.position = Vec2Add(this.position, Vec2Scale(actualHeading, -0.1*this.carSpeed*fixedDt));
        this.carVelocity = Vec2Scale(this.carVelocity, -0.5);
        this.engineForce = 0;
      }

      
    }
  }

  this.carCollidesCar = function(otherCar) {
    // WIP
    topLeftInitial = Vec2Add(this.position, Vec2Init(-this.carWidth/4, -this.carHeight/2));
    topRightInitial = Vec2Add(this.position, Vec2Init(this.carWidth/4, -this.carHeight/2));
    bottomLeftInitial = Vec2Add(this.position, Vec2Init(-this.carWidth/4, this.carHeight/2));
    bottomRightInitial = Vec2Add(this.position, Vec2Init(this.carWidth/4, this.carHeight/2));

    topLeftRotated = Vec2Add(Vec2Rotate(Vec2Sub(topLeftInitial, this.position), this.carAng + 90), this.position);
    topRightRotated = Vec2Add(Vec2Rotate(Vec2Sub(topRightInitial, this.position), this.carAng + 90), this.position);
    bottomLeftRotated = Vec2Add(Vec2Rotate(Vec2Sub(bottomLeftInitial, this.position), this.carAng + 90), this.position);
    bottomRightRotated = Vec2Add(Vec2Rotate(Vec2Sub(bottomRightInitial, this.position), this.carAng + 90), this.position);

    // debug draw this to check that locations are correct
    colorCircle(topLeftRotated.x - camera.drawPosition.x, topLeftRotated.y - camera.drawPosition.y, 5, "blue");
    colorCircle(topRightRotated.x - camera.drawPosition.x, topRightRotated.y - camera.drawPosition.y, 5, "red");
    colorCircle(bottomLeftRotated.x - camera.drawPosition.x, bottomLeftRotated.y - camera.drawPosition.y, 5, "green");
    colorCircle(bottomRightRotated.x - camera.drawPosition.x, bottomRightRotated.y - camera.drawPosition.y, 5, "yellow");
  }
  
  this.startEngineSound = function() {
    
    // note: the user MUST have already clicked mouse or keyboard
    // or the browser will NOT let the sound play! won't work on frame 1

    this.engineSound = new Audio('sounds/engine_loop.ogg');
    this.engineSound.loop = true;
    this.engineSound.volume = 0.1;
    this.engineSound.playbackRate = 2;
    this.engineSound.preservesPitch = false;
    this.engineSound.play();

    this.gearShiftUpSFX = new Audio('sounds/gear_shift_up.wav');
    this.gearShiftUpSFX.loop = false;
    this.gearShiftUpSFX.volume = 1;

    // a sound for when we are skidding / drifting / handbrake
    this.driftSound = new Audio('sounds/drifting_loop.ogg');
    this.driftSound.loop = true;
    this.driftSound.volume = 0;
    this.driftSound.playbackRate = 1;
    this.driftSound.preservesPitch = false;
    this.driftSound.play();

  }
 

  this.carMovePlayer = function() {
    

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
      this.tireTrackAlpha = this.tireTrackAlphaDRIFT;
    } else {
      this.tireTrackAlpha = this.tireTrackAlphaACCEL;
    }

    if(this.keyHeld_Gas) {
      
      if (!this.engineSound) this.startEngineSound();
      
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
    
    
    // I probably need to use friction here too
    var tractionToApply = Math.min(this.carFriction, 1.0);
    var tractionForce = Vec2Scale(this.carHeading, this.engineForce * tractionToApply);
    if (this.handBrake) {
      tractionForce = Vec2Scale(Vec2Normalize(this.carVelocity), this.engineForce * tractionToApply);
    }
    
    var rollingResistanceForce = Vec2Scale(this.carVelocity, -1.0*this.carFriction);
    
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

    
    if (timer.getTime() <= 0) {
      // out of time!
      document.getElementById("debugText").innerHTML = "out of time!";
      p1.carReset();
      p2.carReset();
      timer.setTime(TIME_DEFAULT);
      return;
    }
    
    // todo
    // wrap below into a collision function
    this.carCollidesTrack(nextPos);

    this.carFriction = tileFriction(getTrackAtPixelCoord(this.position.x, this.position.y));
    

    
  }
  
  this.carDraw = function() {      
    
    // waypoints
    if (DEBUG_DRAW) {      
      for (let i = 0; i < this.waypoints.length; i++) {
        waypoint = this.waypoints[i];
        colorCircle(waypoint.position.x - camera.drawPosition.x, waypoint.position.y - camera.drawPosition.y, waypoint.radius, "blue");
      }
    }
    
    // headlights and tail lights
    drawBitmapCenteredAtLocationWithRotation(car_lights, this.position.x - camera.drawPosition.x, this.position.y - camera.drawPosition.y, degToRad(this.carAng + 90) );

    // car sprite
    drawBitmapCenteredAtLocationWithRotation(this.myBitmap, this.position.x - camera.drawPosition.x, this.position.y - camera.drawPosition.y, degToRad(this.carAng + 90) );        
    
    // collider debug
    if (DEBUG_DRAW) {
      this.carCollidesCar(0);
    }

    // tire tracks
    // todo: only when accel is max, when we are drifting, or brakes are on
    if (!this.drawTireTracks) return
    
    if (this.lastTireTrackX != this.position.x || this.lastTireTrackY != this.position.y) {
      decals.add(this.position.x,this.position.y,degToRad(this.carAng + 90),this.tireTrackAlpha,tireTracksPic);
      this.lastTireTrackX = this.position.x;
      this.lastTireTrackY = this.position.y;
    }

  }

} // end of car class