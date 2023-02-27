// todo: probably need extra info like "target velocity"
const DEBUG_RANK = false;
console.log("Press 'R' to enter WaypointEditor mode");

let canToggleWaypointEditor = true;

var keyHeld_WaypointEditor = false;
let waypointEditorOn = false;

let lastMatchedWaypoint = -1;

var foundMatchingWaypoint = false;

function rankCars() {
  var carRankings = [];
  
  for (var i = 0; i < gCars.length; i++) {
    var currentCar = gCars[i];
    
    var trackLength = currentCar.waypoints.length;
    var tDist =  Vec2Distance(currentCar.position, currentCar.waypoints[currentCar.waypointCounter % currentCar.waypoints.length].position);
    //console.log("tdist is " + tDist);
    var distToAdd;
    // todo: refine this to allow for multiple laps etc
    distToAdd = (trackLength * currentCar.lap * 10000) + currentCar.waypointCounter*500 - tDist;    
    if (DEBUG_RANK) {
      console.log("car " + i + " has distance " + distToAdd);
      console.log("and has lap " + currentCar.lap);
    }
    var result = {id : i, dist : distToAdd};
    carRankings.push(result);
  }
  // so now we have an unsorted array
  carRankings.sort(function(x,y){return x.dist - y.dist});
  // now it's sorted lowest to highest, so should be 4th, 3rd etc
  for (var i = 0; i < carRankings.length; i++) {
    var rank = carRankings[i];
    
    gCars[rank.id].ranking = carRankings.length - i;
    
    scoreBoard.updateScores(rank.id, gCars[rank.id].ranking);
  }
}

function waypointInit(xPosVal, yPosVal, angleVal, widthVal, radiusVal) {
    var result = {xPos: xPosVal, yPos : yPosVal, angleVal : angleVal, widthVal : widthVal, radiusVal : radiusVal};
    return result;
}

function waypointInitWithConfig(config) {
    var result = {
        position: Vec2Init(config.xPos, config.yPos),
        angle: config.angleVal,
        width: config.widthVal,
        radius: config.radiusVal
    };

    return result;
}

function drawWaypoints() {
  if (TRACKS[courseIndex].waypoints.length > 1) {    
    for (let i = 1; i < TRACKS[courseIndex].waypoints.length; i++) {
      // some overdraw here
      waypoint = TRACKS[courseIndex].waypoints[i];
      // check for angle adjustment?
      var waypointPosVector = Vec2Init(waypoint.xPos, waypoint.yPos);
      console.log("waypoint pos vector is " + waypointPosVector.x + "," + waypointPosVector.y);
      var widthVectorUpper = Vec2Add(waypointPosVector, Vec2PolarInit(waypoint.angleVal, waypoint.widthVal));
      console.log("width vector upper is " + widthVectorUpper.x + "," + widthVectorUpper.y);
      var widthVectorLower = Vec2Add(waypointPosVector, Vec2PolarInit(waypoint.angleVal + 180, waypoint.widthVal));
      if (i == lastMatchedWaypoint) {
        colorCircle(waypoint.xPos - camera.drawPosition.x, waypoint.yPos - camera.drawPosition.y, waypoint.radiusVal, "red");
      } else {
        colorCircle(waypoint.xPos - camera.drawPosition.x, waypoint.yPos - camera.drawPosition.y, waypoint.radiusVal, "blue");
      }
      waypointPrev = TRACKS[courseIndex].waypoints[i-1];
      if (i - 1 == lastMatchedWaypoint) {
        colorCircle(waypointPrev.xPos - camera.drawPosition.x, waypointPrev.yPos - camera.drawPosition.y, waypointPrev.radiusVal, "red");
      } else {
        colorCircle(waypointPrev.xPos - camera.drawPosition.x, waypointPrev.yPos - camera.drawPosition.y, waypointPrev.radiusVal, "blue");
      }
      colorLine(waypoint.xPos - camera.drawPosition.x, waypoint.yPos - camera.drawPosition.y, waypointPrev.xPos - camera.drawPosition.x, waypointPrev.yPos - camera.drawPosition.y, "black");
      colorLine(waypointPosVector.x - camera.drawPosition.x, waypointPosVector.y - camera.drawPosition.y, widthVectorUpper.x - camera.drawPosition.x, widthVectorUpper.y - camera.drawPosition.y, "blue");
      colorLine(waypointPosVector.x - camera.drawPosition.x, waypointPosVector.y - camera.drawPosition.y, widthVectorLower.x - camera.drawPosition.x, widthVectorLower.y - camera.drawPosition.y, "blue");
      
    }
  } else if (TRACKS[courseIndex].waypoints.length == 1) {
      waypoint = TRACKS[courseIndex].waypoints[0];
      colorCircle(waypoint.xPos - camera.drawPosition.x, waypoint.yPos - camera.drawPosition.y, waypoint.radiusVal, "blue");
  }
}



function updateWaypointEditor() {
  if (keyHeld_WaypointEditor && canToggleWaypointEditor && !waypointEditorOn) {
    console.log('Switching to waypoint WaypointEditor');
    waypointEditorOn = true;
    canToggleWaypointEditor = false;
  }
  if (keyHeld_WaypointEditor && canToggleWaypointEditor && waypointEditorOn) {
    console.log('Exiting waypoint WaypointEditor');
    waypointEditorOn = false;
    canToggleWaypointEditor = false;
  }
  else if (!keyHeld_WaypointEditor && !canToggleWaypointEditor) {
    canToggleWaypointEditor = true;
  }

  if (keyPressedWaypointDelete) {
    // handle deletion
    keyPressedWaypointDelete = false;
    if (lastMatchedWaypoint != -1) {
      TRACKS[courseIndex].waypoints.splice(lastMatchedWaypoint, 1);
    }
  }
}

function WaypointEditorClick(e) {
  if (!waypointEditorOn) {
    return;
  }
  const x = Math.round(camera.drawPosition.x) + Math.round(e.clientX);
  const y = Math.round(camera.drawPosition.y) + Math.round(e.clientY);
  // find a possible waypoint to select
  
  for (var i = 0; i < TRACKS[courseIndex].waypoints.length; i++) {
    var currentWaypoint = TRACKS[courseIndex].waypoints[i];
    var currentWaypointPos = Vec2Init(currentWaypoint.xPos, currentWaypoint.yPos);
    var mousePos = Vec2Init(x,y);
    if (Vec2Distance(currentWaypointPos, mousePos) < currentWaypoint.radiusVal) {
      if (foundMatchingWaypoint) {
        foundMatchingWaypoint = false;
        lastMatchedWaypoint = -1;
        return;
      } else {
        foundMatchingWaypoint = true;
        lastMatchedWaypoint = i;
      }
      
      break;
    }
  }

  if (!foundMatchingWaypoint) {

  
    radiusToAdd = Number(prompt("enter radius"));    
    widthToAdd = Number(prompt("enter width"));
    angleToAdd = Number(prompt("enter angle"));

    if(radiusToAdd < 50) {
      radiusToAdd = 50;
    }

    waypointToAdd = waypointInit(x, y, angleToAdd, widthToAdd, radiusToAdd);

    console.log("adding waypoint at " + x + " " + y + " " + angleToAdd + " " + widthToAdd + radiusToAdd);    
    if (lastMatchedWaypoint == -1) {
      TRACKS[courseIndex].waypoints.push(waypointToAdd);
    } else {
      TRACKS[courseIndex].waypoints.splice(lastMatchedWaypoint+1, 0, waypointToAdd);
    }
    p2.resetWaypoints();
  } else {
    // modify 
    radiusToAdd = Number(prompt("enter radius"));
    widthToAdd = Number(prompt("enter width"));
    angleToAdd = Number(prompt("enter angle"));
    TRACKS[courseIndex].waypoints[lastMatchedWaypoint].radiusVal = radiusToAdd;
    TRACKS[courseIndex].waypoints[lastMatchedWaypoint].widthVal = widthToAdd;
    TRACKS[courseIndex].waypoints[lastMatchedWaypoint].angleVal = angleToAdd;
  }
}

document.addEventListener('click', WaypointEditorClick);
