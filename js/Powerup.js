console.log("Press 'P' to enter PowerupEditor mode");

let canTogglePowerupEditor = true;

var keyHeld_PowerupEditor = false;
let powerupEditorOn = false;

const POWERUP_NONE = 0;
const POWERUP_COFFEE_BEAN = 1;
const POWERUP_MUFFIN = 2;
const POWERUP_FRENCH_PRESS = 3;
const POWERUP_ESPRESSO = 4;
// inelegant but let's make the croissant the last
// so we can get the number to modulo with off that?
const POWERUP_TAKEAWAY = 5;
const POWERUP_CROISSANT = 6;
const POWERUP_NUM = POWERUP_CROISSANT + 1;

var selectedPowerup = 1;

// TODO: map powerups to sprite names to draw

document.addEventListener("wheel", selectPowerup);

function selectPowerup(e) {
  if (!powerupEditorOn) {
    return;
  }

  if (e.deltaY > 0) {
    selectedPowerup = Math.max(1, (selectedPowerup + 1) % POWERUP_NUM);
    
  } else {
    selectedPowerup--;
    if (selectedPowerup < 0) {
      selectedPowerup = POWERUP_NUM - 1;
    }
  }
  console.log("changed to " + powerupConstString(selectedPowerup) + " powerup");
}

function powerupConstString(type) {
  switch (type) {
    case POWERUP_COFFEE_BEAN: return 'POWERUP_COFFEE_BEAN';
    case POWERUP_MUFFIN: return 'POWERUP_MUFFIN';
    case POWERUP_FRENCH_PRESS: return 'POWERUP_FRENCH_PRESS';
    case POWERUP_ESPRESSO: return 'POWERUP_ESPRESSO';
    case POWERUP_TAKEAWAY: return 'POWERUP_TAKEAWAY';
    case POWERUP_CROISSANT: return 'POWERUP_CROISSANT';
    default: return 'POWERUP_NONE';
  }
}

function PowerupRadius(type) {
  const testRadius = 20;
  switch (type) {
    case POWERUP_COFFEE_BEAN: return testRadius;
    case POWERUP_MUFFIN: return testRadius;
    case POWERUP_FRENCH_PRESS: return testRadius;
    case POWERUP_ESPRESSO: return testRadius;
    case POWERUP_TAKEAWAY: return testRadius;
    case POWERUP_CROISSANT: return testRadius;

    default: return testRadius;
  }
}

function PowerupInit(xPosVal, yPosVal, typeVal) {
    var radiusToAdd = PowerupRadius(typeVal);
    var result = {type: typeVal, xPos: xPosVal, yPos : yPosVal, radiusVal : radiusToAdd, active : true, timer : 0};
    return result;
}

function PowerupInitWithConfig(config) {
    var result = {
        position: Vec2Init(config.xPos, config.yPos),
        angle: config.angleVal,
        width: config.widthVal,
        radius: config.radiusVal,
        active : config.activeVal,
        timer : 0
    };

    return result;
}

function drawPowerups() {
    for (i = 0; i < TRACKS[courseIndex].powerups.length; i++) {
        var powerup = TRACKS[courseIndex].powerups[i];
        if (powerup.active) {      
          if (powerup.type == POWERUP_COFFEE_BEAN) {
              drawBitmapCenteredAtLocationWithRotation(decal_coffee_bean, powerup.xPos - camera.drawPosition.x, powerup.yPos - camera.drawPosition.y, degToRad(0) );
          }
          if (powerup.type == POWERUP_MUFFIN) {
              drawBitmapCenteredAtLocationWithRotation(decal_muffin, powerup.xPos - camera.drawPosition.x, powerup.yPos - camera.drawPosition.y, degToRad(0) );
          }
          if (powerup.type == POWERUP_FRENCH_PRESS) {
            drawBitmapCenteredAtLocationWithRotation(decal_french_press, powerup.xPos - camera.drawPosition.x, powerup.yPos - camera.drawPosition.y, degToRad(0) );
          }
          if (powerup.type == POWERUP_ESPRESSO) {
            drawBitmapCenteredAtLocationWithRotation(decal_coffee_cup, powerup.xPos - camera.drawPosition.x, powerup.yPos - camera.drawPosition.y, degToRad(0) );
          }
          if (powerup.type == POWERUP_TAKEAWAY) {
            drawBitmapCenteredAtLocationWithRotation(decal_coffee_takeaway, powerup.xPos - camera.drawPosition.x, powerup.yPos - camera.drawPosition.y, degToRad(0) );
          }
          if (powerup.type == POWERUP_CROISSANT) {
            drawBitmapCenteredAtLocationWithRotation(decal_croissant, powerup.xPos - camera.drawPosition.x, powerup.yPos - camera.drawPosition.y, degToRad(0) );
          }
        }
    }
}

function PowerupTimer(powerupType)
{
  if (powerupType == POWERUP_ESPRESSO) {
    return 3;
  }
  if (powerupType == POWERUP_COFFEE_BEAN) {
    return 2;
  }
  if (powerupType == POWERUP_MUFFIN) {
    return 4;
  }
  if (powerupType == POWERUP_FRENCH_PRESS) {
    return 5;
  }
  if (powerupType == POWERUP_CROISSANT) {
    return 5;
  }
  if (powerupType == POWERUP_TAKEAWAY) {
    return 5;
  }
  return 0;
}

function PowerupPower(powerupType)
{
  if (powerupType == POWERUP_ESPRESSO) {
    return drivePower * 3.25;
  }
  if (powerupType == POWERUP_COFFEE_BEAN) {
    return drivePower * 3.5;
  }
  if (powerupType == POWERUP_MUFFIN) {
    return drivePower * 2.75;
  }
  if (powerupType == POWERUP_FRENCH_PRESS) {
    return drivePower * 3.6;
  }
  if (powerupType == POWERUP_CROISSANT) {
    return drivePower * 2.8;
  }
  if (powerupType == POWERUP_TAKEAWAY) {
    return drivePower * 3.1;
  }
  

  return 0;
}

function PowerupPowerMax(powerupType)
{
  // for now just use this
  return PowerupPower(powerupType);  
}

function updatePowerups()
{
    const powerupRefresh = 20.0;
    for (i = 0; i < TRACKS[courseIndex].powerups.length; i++) {
      var powerup = TRACKS[courseIndex].powerups[i];
      var powerupPos = Vec2Init(powerup.xPos, powerup.yPos);
      if (powerup.active) {
        for (j = 0; j < gCars.length; j++) {
          var currentCar = gCars[j];        
          if (Vec2Distance(powerupPos, currentCar.position) < 20) {
            gCars[j].powerupType = powerup.type;
            gCars[j].powerupTimer = PowerupTimer(powerup.type);
            TRACKS[courseIndex].powerups[i].active = false;
            if (gCars[j].isPlayer) {
              playPowerupSound(powerup.type);
            }
          }
        }
      } else {
        TRACKS[courseIndex].powerups[i].timer += fixedDt;
        if (TRACKS[courseIndex].powerups[i].timer > powerupRefresh) {
          TRACKS[courseIndex].powerups[i].active = true;
          TRACKS[courseIndex].powerups[i].timer = 0;
        }
      } 
    }
}


function playPowerupSound(powerupType) {
  if (powerupType == POWERUP_ESPRESSO || 
    powerupType == POWERUP_TAKEAWAY ||
    powerupType == POWERUP_FRENCH_PRESS) {
      sip_sound.play();
  } else if (powerupType == POWERUP_COFFEE_BEAN) {
    aero_eject_sound.play();
  } else {
    beans_pour_sound.play();
  }
}



function updatePowerupEditor() {
  if (keyHeld_PowerupEditor && canTogglePowerupEditor && !powerupEditorOn) {
    console.log('Switching to Powerup PowerupEditor');
    powerupEditorOn = true;
    canTogglePowerupEditor = false;
  }
  if (keyHeld_PowerupEditor && canTogglePowerupEditor && powerupEditorOn) {
    console.log('Exiting Powerup PowerupEditor');
    powerupEditorOn = false;
    canTogglePowerupEditor = false;
  }
  else if (!keyHeld_PowerupEditor && !canTogglePowerupEditor) {
    canTogglePowerupEditor = true;
  }
}


function PowerupEditorClick(e) {
  if (!powerupEditorOn) {
    return;
  }
  const x = Math.round(camera.drawPosition.x) + Math.round(e.clientX);
  const y = Math.round(camera.drawPosition.y) + Math.round(e.clientY);
  
  

  PowerupToAdd = PowerupInit(x, y, selectedPowerup);

  console.log("adding Powerup" + powerupConstString(selectedPowerup) + " at " + PowerupToAdd.xPos + " " + PowerupToAdd.yPos );
  // TODO: enable user to select tile type
  TRACKS[courseIndex].powerups.push(PowerupToAdd);
  
}

document.addEventListener('click', PowerupEditorClick);
