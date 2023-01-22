console.log("Press 'R' to enter PowerupEditor mode");

let canTogglePowerupEditor = true;

var keyHeld_PowerupEditor = false;
let PowerupEditorOn = false;

function PowerupInit(xPosVal, yPosVal, angleVal, widthVal, radiusVal) {
    var result = {xPos: xPosVal, yPos : yPosVal, angleVal : angleVal, widthVal : widthVal, radiusVal : radiusVal};
    return result;
}

function PowerupInitWithConfig(config) {
    var result = {
        position: Vec2Init(config.xPos, config.yPos),
        angle: config.angleVal,
        width: config.widthVal,
        radius: config.radiusVal
    };

    return result;
}

function drawPowerup(Powerup) {

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
  
  angleToAdd = Number(prompt("enter angle"));
  widthToAdd = Number(prompt("enter width"));
  radiusToAdd = Number(prompt("enter radius"));

  PowerupToAdd = PowerupInit(x, y, angleToAdd, widthToAdd, radiusToAdd);

  console.log("adding Powerup at " + x + " " + y + " " + angleToAdd + " " + widthToAdd + radiusToAdd);
  // TODO: enable user to select tile type
  TRACKS[courseIndex].Powerups.push(PowerupToAdd);
  p2.resetPowerups();
}

document.addEventListener('click', PowerupEditorClick);
