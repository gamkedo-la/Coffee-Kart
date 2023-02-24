// todo: probably need extra info like "target velocity"
const DEBUG_RANK = false;
console.log("Press 'R' to enter WaypointEditor mode");

let canToggleWaypointEditor = true;

var keyHeld_WaypointEditor = false;
let waypointEditorOn = false;

let lastMatchedWaypoint = -1;

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
    //console.log("car " + rank.id + "has dist " + rank.dist);
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
      colorLine(waypoint.xPos - camera.drawPosition.x, waypoint.yPos - camera.drawPosition.y, waypointPrev.xPos - camera.drawPosition.x, waypointPrev.yPos - camera.drawPosition.y, "blue");
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
  var foundMatchingWaypoint = false;
  for (var i = 0; i < TRACKS[courseIndex].waypoints.length; i++) {
    var currentWaypoint = TRACKS[courseIndex].waypoints[i];
    var currentWaypointPos = Vec2Init(currentWaypoint.xPos, currentWaypoint.yPos);
    var mousePos = Vec2Init(x,y);
    if (Vec2Distance(currentWaypointPos, mousePos) < currentWaypoint.radiusVal) {
      foundMatchingWaypoint = true;
      lastMatchedWaypoint = i;
      break;
    }
  }

  if (!foundMatchingWaypoint) {

  
  
    angleToAdd = Number(prompt("enter angle"));
    widthToAdd = Number(prompt("enter width"));
    radiusToAdd = Number(prompt("enter radius"));

    waypointToAdd = waypointInit(x, y, angleToAdd, widthToAdd, radiusToAdd);

    console.log("adding waypoint at " + x + " " + y + " " + angleToAdd + " " + widthToAdd + radiusToAdd);    
    if (lastMatchedWaypoint == -1) {
      TRACKS[courseIndex].waypoints.push(waypointToAdd);
    } else {
      TRACKS[courseIndex].waypoints.splice(lastMatchedWaypoint+1, 0, waypointToAdd);
    }
    p2.resetWaypoints();
  }
} 

document.addEventListener('click', WaypointEditorClick);
