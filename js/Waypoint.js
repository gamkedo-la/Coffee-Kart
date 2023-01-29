// todo: probably need extra info like "target velocity"

console.log("Press 'R' to enter WaypointEditor mode");

let canToggleWaypointEditor = true;

var keyHeld_WaypointEditor = false;
let waypointEditorOn = false;

function rankCars() {
  var carRankings = [];
  for (var i = 0; i < gCars.length; i++) {
    var currentCar = gCars[i];
    var tDist = Vec2Distance(currentCar.position, currentCar.waypoints[currentCar.waypointCounter].position);
    //console.log("tdist is " + tDist);
    var distToAdd;
    // todo: refine this to allow for multiple laps etc
    distToAdd = currentCar.waypointCounter*10000 - tDist;    
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

function drawWaypoint(waypoint) {

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
}

function WaypointEditorClick(e) {
  if (!waypointEditorOn) {
    return;
  }
  const x = Math.round(camera.drawPosition.x) + Math.round(e.clientX);
  const y = Math.round(camera.drawPosition.y) + Math.round(e.clientY);
  
  angleToAdd = Number(prompt("enter angle"));
  widthToAdd = Number(prompt("enter width"));
  radiusToAdd = Number(prompt("enter radius"));

  waypointToAdd = waypointInit(x, y, angleToAdd, widthToAdd, radiusToAdd);

  console.log("adding waypoint at " + x + " " + y + " " + angleToAdd + " " + widthToAdd + radiusToAdd);
  // TODO: enable user to select tile type
  TRACKS[courseIndex].waypoints.push(waypointToAdd);
  p2.resetWaypoints();
}

document.addEventListener('click', WaypointEditorClick);
