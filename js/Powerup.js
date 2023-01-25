console.log("Press 'P' to enter PowerupEditor mode");

let canTogglePowerupEditor = true;

var keyHeld_PowerupEditor = false;
let PowerupEditorOn = false;

const POWERUP_NONE = 0;
const POWERUP_COFFEE_BEAN = 1;
const POWERUP_MUFFIN = 2;
const POWERUP_FRENCH_PRESS = 3;
const POWERUP_ESPRESSO = 4;

function powerupConstString(type) {
  switch (type) {
    case POWERUP_COFFEE_BEAN: return 'POWERUP_COFFEE_BEAN';
    case POWERUP_MUFFIN: return 'POWERUP_MUFFIN';
    case POWERUP_FRENCH_PRESS: return 'POWERUP_FRENCH_PRESS';
    case POWERUP_ESPRESSO: return 'POWERUP_ESPRESSO';
    default: return 'POWERUP_NONE';
  }
}

function PowerupInit(typeVal, xPosVal, yPosVal, radiusVal, activeVal) {
    var result = {type: typeVal, xPos: xPosVal, yPos : yPosVal, radiusVal : radiusVal, active : activeVal};
    return result;
}

function PowerupInitWithConfig(config) {
    var result = {
        position: Vec2Init(config.xPos, config.yPos),
        angle: config.angleVal,
        width: config.widthVal,
        radius: config.radiusVal,
        active : config.activeVal
    };

    return result;
}

function drawPowerups() {
    for (i = 0; i < TRACKS[courseIndex].powerups.length; i++) {
        var powerup = TRACKS[courseIndex].powerups[i];
        if (powerup.active) {
          if (powerup.type == POWERUP_ESPRESSO) {
              drawBitmapCenteredAtLocationWithRotation(decal_coffee_cup, powerup.xPos - camera.drawPosition.x, powerup.yPos - camera.drawPosition.y, degToRad(0) );
          }
        }
    }
}

function PowerupTimer(powerupType)
{
  if (powerupType == POWERUP_ESPRESSO) {
    return 5;
  }
  return 0;
}

function PowerupPower(powerupType)
{
  if (powerupType == POWERUP_ESPRESSO) {
    return drivePower * 2;
  }
  return 0;
}

function PowerupPowerMax(powerupType)
{
  if (powerupType == POWERUP_ESPRESSO) {
    return drivePowerMax * 2;
  }
  return 0;
}

function updatePowerups()
{
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
          }
        }
      } 
    }
}




function updatePowerupEditor() {
  if (keyHeld_PowerupEditor && canTogglePowerupEditor && !PowerupEditorOn) {
    console.log('Switching to Powerup PowerupEditor');
    PowerupEditorOn = true;
    canTogglePowerupEditor = false;
  }
  if (keyHeld_PowerupEditor && canTogglePowerupEditor && PowerupEditorOn) {
    console.log('Exiting Powerup PowerupEditor');
    PowerupEditorOn = false;
    canTogglePowerupEditor = false;
  }
  else if (!keyHeld_PowerupEditor && !canTogglePowerupEditor) {
    canTogglePowerupEditor = true;
  }
}

function PowerupEditorClick(e) {
  if (!PowerupEditorOn) {
    return;
  }
  const x = Math.round(camera.drawPosition.x) + Math.round(e.clientX);
  const y = Math.round(camera.drawPosition.y) + Math.round(e.clientY);
  
  radiusToAdd = Number(prompt("enter radius"));

  PowerupToAdd = PowerupInit(x, y, radiusToAdd);

  console.log("adding Powerup at " + x + " " + y + " " + angleToAdd + " " + widthToAdd + radiusToAdd);
  // TODO: enable user to select tile type
  TRACKS[courseIndex].Powerups.push(PowerupToAdd);
  p2.resetPowerups();
}

document.addEventListener('click', PowerupEditorClick);
