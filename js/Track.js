// track constants and variables
const TILE_SIZE = 32;
const TRACK_W = 80;
const TRACK_H = 80;
const TRACK_COLS = 20;
const TRACK_ROWS = 30;//15

const TRACKS = [
  // snow track
  {
    decals: {
      "decal_lights": [382,634,124,637,350,130,776,126,1008,132,1290,130,1582,520,1398,455,682,464,602,775,1486,1266,1236,1244,687,1263,940,1578,853,1836,1570,1910,1245,2050,58,1790],
    },
    grid: [
      6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
      6, 6, 4, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
      6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6,
      6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 5, 5, 5, 6,
      6, 5, 5, 5, 5, 6, 6, 6, 6, 5, 5, 5, 6, 6, 6, 6, 6, 6, 5, 6,
      6, 6, 5, 5, 6, 5, 5, 5, 6, 6, 6, 6, 6, 5, 5, 5, 6, 6, 5, 6,
      6, 6, 5, 5, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 4, 5, 6,
      6, 6, 5, 5, 6, 5, 5, 6, 4, 5, 5, 5, 5, 5, 5, 4, 4, 5, 5, 6,
      6, 6, 2, 2, 6, 5, 5, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 6,
      6, 6, 2, 2, 6, 5, 5, 6, 4, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6,
      6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6,
      6, 5, 3, 3, 5, 5, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6,
      6, 5, 5, 5, 4, 5, 5, 6, 5, 5, 5, 6, 6, 6, 6, 6, 5, 5, 5, 6,
      6, 5, 4, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 5, 5, 6, 6,
      6, 4, 5, 5, 5, 4, 4, 5, 6, 6, 6, 6, 6, 6, 6, 6, 5, 5, 6, 6,
      6, 5, 5, 5, 5, 5, 4, 5, 6, 5, 5, 5, 5, 5, 6, 6, 5, 5, 6, 6,
      6, 5, 4, 5, 5, 5, 5, 6, 5, 5, 5, 6, 5, 5, 5, 5, 5, 5, 6, 6,
      6, 5, 5, 5, 5, 4, 5, 6, 5, 5, 6, 6, 6, 6, 5, 5, 5, 5, 6, 6,
      6, 5, 5, 5, 4, 5, 5, 5, 6, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
      6, 5, 5, 5, 5, 5, 4, 4, 6, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6,
      6, 5, 5, 4, 5, 5, 5, 5, 5, 6, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6,
      6, 5, 5, 4, 5, 5, 4, 5, 5, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 6,
      6, 5, 5, 4, 5, 5, 4, 5, 4, 5, 6, 5, 5, 5, 5, 5, 5, 5, 5, 6,
      6, 5, 5, 5, 5, 5, 5, 5, 4, 5, 5, 6, 6, 6, 6, 6, 6, 5, 5, 6,
      6, 5, 5, 5, 5, 4, 5, 5, 4, 5, 5, 5, 5, 5, 6, 6, 6, 5, 5, 6,
      6, 5, 4, 5, 5, 4, 5, 5, 5, 5, 5, 5, 5, 5, 6, 6, 5, 5, 5, 6,
      6, 5, 4, 5, 5, 4, 5, 5, 5, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6,
      6, 5, 4, 5, 5, 5, 5, 5, 5, 4, 5, 5, 5, 5, 5, 5, 5, 5, 4, 6,
      6, 5, 5, 5, 5, 5, 5, 5, 5, 4, 5, 4, 5, 5, 5, 5, 5, 5, 6, 6,
      6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6
    ],
    waypoints: [
      { xPos: 265, yPos: 280, angleVal: 0, widthVal: 0, radiusVal: 70},
      { xPos: 578, yPos: 254, angleVal: 0, widthVal: 30, radiusVal: 30},
      { xPos: 1233, yPos: 206, angleVal: 0, widthVal: 30, radiusVal: 30},
      { xPos: 1492, yPos: 297, angleVal: 0, widthVal: 30, radiusVal: 30},
      { xPos: 1480, yPos: 664, angleVal: 0, widthVal: 30, radiusVal: 30},
      { xPos: 905, yPos: 577, angleVal: 0, widthVal: 30, radiusVal: 30},
      { xPos: 524, yPos: 507, angleVal: 0, widthVal: 30, radiusVal: 30},
      { xPos: 534, yPos: 841, angleVal: 0, widthVal: 30, radiusVal: 30},
      { xPos: 1176, yPos: 929, angleVal: 0, widthVal: 30, radiusVal: 30},
      { xPos: 1427, yPos: 939, angleVal: 0, widthVal: 30, radiusVal: 30},
      { xPos: 1366, yPos: 1362, angleVal: 0, widthVal: 30, radiusVal: 30},
      { xPos: 1039, yPos: 1302, angleVal: 0, widthVal: 30, radiusVal: 30},
      { xPos: 817, yPos: 1245, angleVal: 0, widthVal: 30, radiusVal: 30},
      { xPos: 776, yPos: 1527, angleVal: 0, widthVal: 30, radiusVal: 30},
      { xPos: 1139, yPos: 1781, angleVal: 0, widthVal: 30, radiusVal: 30},
      { xPos: 1445, yPos: 1812, angleVal: 0, widthVal: 30, radiusVal: 30},
      { xPos: 1374, yPos: 2223, angleVal: 0, widthVal: 30, radiusVal: 30},
      { xPos: 1050, yPos: 2210, angleVal: 0, widthVal: 30, radiusVal: 30},
      { xPos: 371, yPos: 1673, angleVal: 0, widthVal: 30, radiusVal: 30},
      { xPos: 284, yPos: 923, angleVal: 0, widthVal: 30, radiusVal: 30},
    ],
    powerups: [
      { type: POWERUP_ESPRESSO, xPos: 175, yPos: 300, radiusVal: 20, active: false },
      { type: POWERUP_ESPRESSO, xPos: 275, yPos: 300, radiusVal: 20, active: false },
    ]
  },
  // CAFE track
  {
    decals: {
      "decal_oilstain": [1368,1958],
      "decal_lights": [382,634,124,637,350,130,776,126,1008,132,1290,130,1582,520,1398,455,682,464,602,775,1486,1266,1236,1244,687,1263,940,1578,853,1836,1570,1910,1245,2050,58,1790],
    },
    grid: [
      7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 7,
      7, 8, 8, 8, 8, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 9,
      9, 7, 8, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 9,
      9, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 8, 7, 7, 7, 7, 7, 7, 9,
      9, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 7, 7, 8, 7, 7, 7, 7, 7, 9,
      9, 7, 7, 8, 8, 7, 7, 7, 8, 8, 8, 7, 7, 7, 8, 7, 7, 7, 7, 9,
      9, 7, 7, 8, 7, 8, 8, 8, 7, 7, 7, 7, 7, 7, 7, 8, 7, 7, 7, 9,
      9, 7, 7, 8, 7, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 7, 7, 7, 9,
      9, 7, 7, 8, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 7, 7, 7, 9,
      9, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 7, 7, 7, 7, 7, 7, 7, 7, 9,
      9, 7, 7, 7, 7, 8, 7, 7, 7, 7, 7, 8, 7, 7, 7, 7, 7, 7, 7, 9,
      9, 7, 8, 7, 9, 7, 7, 7, 7, 7, 7, 7, 8, 7, 7, 7, 7, 7, 7, 9,
      9, 7, 8, 7, 9, 7, 7, 7, 7, 7, 7, 7, 8, 7, 7, 7, 7, 7, 8, 8,
      9, 7, 8, 7, 9, 7, 7, 7, 7, 8, 7, 7, 7, 7, 7, 7, 7, 8, 7, 7,
      9, 7, 8, 7, 9, 7, 7, 7, 7, 9, 9, 7, 7, 7, 7, 7, 7, 9, 7, 7,
      9, 7, 8, 7, 9, 7, 7, 7, 7, 9, 8, 7, 7, 7, 7, 7, 7, 9, 8, 9,
      9, 7, 7, 7, 9, 8, 8, 7, 7, 9, 7, 8, 7, 7, 7, 7, 8, 7, 7, 9,
      9, 7, 7, 7, 9, 7, 8, 7, 7, 9, 8, 8, 8, 8, 8, 8, 7, 7, 7, 8,
      9, 7, 7, 7, 9, 7, 8, 7, 7, 9, 7, 7, 7, 7, 7, 7, 7, 7, 7, 9,
      9, 7, 7, 8, 8, 8, 8, 7, 7, 9, 7, 7, 7, 7, 7, 7, 8, 8, 7, 9,
      9, 7, 7, 9, 7, 7, 7, 7, 7, 9, 7, 7, 7, 7, 7, 8, 9, 7, 7, 9,
      9, 7, 7, 9, 7, 7, 7, 7, 8, 7, 7, 7, 8, 8, 8, 7, 9, 7, 7, 9,
      9, 7, 7, 9, 7, 7, 7, 9, 9, 7, 7, 7, 8, 8, 8, 7, 9, 7, 7, 9,
      9, 7, 7, 9, 7, 7, 9, 7, 7, 8, 7, 7, 7, 7, 7, 8, 9, 7, 7, 9,
      9, 7, 7, 9, 7, 7, 7, 8, 8, 8, 8, 8, 7, 7, 7, 7, 9, 7, 7, 9,
      9, 7, 7, 9, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 9, 7, 7, 9,
      9, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 2, 2, 9,
      9, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 9, 2, 2, 9,
      9, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 8, 7, 9,
      7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 7
    ],
    waypoints: [
      { xPos: 175, yPos: 300, angleVal: 0, widthVal: 20, radiusVal: 20},
      { xPos: 578, yPos: 254, angleVal: 0, widthVal: 30, radiusVal: 30},
      { xPos: 1233, yPos: 206, angleVal: 0, widthVal: 30, radiusVal: 30},
      { xPos: 1492, yPos: 297, angleVal: 0, widthVal: 30, radiusVal: 30},
      { xPos: 1480, yPos: 664, angleVal: 0, widthVal: 30, radiusVal: 30},
      { xPos: 905, yPos: 577, angleVal: 0, widthVal: 30, radiusVal: 30},
      { xPos: 524, yPos: 507, angleVal: 0, widthVal: 30, radiusVal: 30},
      { xPos: 534, yPos: 841, angleVal: 0, widthVal: 30, radiusVal: 30},
      { xPos: 1176, yPos: 929, angleVal: 0, widthVal: 30, radiusVal: 30},
      { xPos: 1427, yPos: 939, angleVal: 0, widthVal: 30, radiusVal: 30},
      { xPos: 1366, yPos: 1362, angleVal: 0, widthVal: 30, radiusVal: 30},
      { xPos: 1039, yPos: 1302, angleVal: 0, widthVal: 30, radiusVal: 30},
      { xPos: 817, yPos: 1245, angleVal: 0, widthVal: 30, radiusVal: 30},
      { xPos: 776, yPos: 1527, angleVal: 0, widthVal: 30, radiusVal: 30},
      { xPos: 1139, yPos: 1781, angleVal: 0, widthVal: 30, radiusVal: 30},
      { xPos: 1445, yPos: 1812, angleVal: 0, widthVal: 30, radiusVal: 30},
      { xPos: 1374, yPos: 2223, angleVal: 0, widthVal: 30, radiusVal: 30},
      { xPos: 682, yPos: 2050, angleVal: 0, widthVal: 30, radiusVal: 30},
      { xPos: 1050, yPos: 2210, angleVal: 0, widthVal: 30, radiusVal: 30},
      { xPos: 371, yPos: 1673, angleVal: 0, widthVal: 30, radiusVal: 30},
      { xPos: 284, yPos: 923, angleVal: 0, widthVal: 30, radiusVal: 30},
    ],
    powerups: [
      { type: POWERUP_ESPRESSO, xPos: 175, yPos: 300, radiusVal: 20, active: false },
      { type: POWERUP_ESPRESSO, xPos: 275, yPos: 300, radiusVal: 20, active: true },
    ]
  }

];

var copiedGrids = TRACKS.map((track) => track.grid.slice());

// var trackGrid =
//     [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
//       1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
//       1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
//       1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
//       1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1,
//       1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1,
//       1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
//       1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
//       1, 2, 2, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
//       1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
//       1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1,
//       1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
//       0, 3, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
//       0, 3, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
//       1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_PLAYER = 2;
const TRACK_GOAL = 3;
//const TRACK_TREE = 4;
const TRACK_SNOW_ICE = 4;
const TRACK_SNOW_ROAD = 5;
const TRACK_SNOW_WALL = 6;
const TRACK_CAFE_FLOOR = 7;
const TRACK_CAFE_COUNTER = 8;
const TRACK_CAFE_COUNTER_ROTATED = 9;
const TRACK_TILE_MAX = 10; // will have to update this as extra tiles are added, should match suffix of track file
//const TRACK_FLAG = 8;

function courseReplacementTile()
{
  if (courseIndex == 0) {
    return TRACK_SNOW_ROAD;
  }
  if (courseIndex == 1) {
    return TRACK_CAFE_FLOOR;
  }
}

function trackTileToIndex(tileCol, tileRow) {
  return (tileCol + TRACK_COLS*tileRow);
}

function tileIsDriveable(tileType) {
  if (tileType == TRACK_ROAD) {
    return true;
  }
  if (tileType == TRACK_SNOW_ROAD) {
    return true;
  }
  if (tileType == TRACK_SNOW_ICE) {
    return true;
  }
  if (tileType == TRACK_CAFE_FLOOR) {
    return true;
  }
  return false;
}

function tileFriction(tileType) {
  if (tileType == TRACK_ROAD) {
    return 2.8;
  }
  if (tileType == TRACK_SNOW_ROAD) {    
    return 1.8;
  }
  if (tileType == TRACK_SNOW_ICE) {
    return 0.4;
  }

  // this shouldn't happen but...  
  return 2.8;
}

function getTrackAtPixelCoord(pixelX,pixelY) { 
  var tileCol = pixelX / TRACK_W;
  var tileRow = pixelY / TRACK_H;
  
  // we'll use Math.floor to round down to the nearest whole number
  tileCol = Math.floor( tileCol );
  tileRow = Math.floor( tileRow );

  // first check whether the car is within any part of the track wall
  if(tileCol < 0 || tileCol >= TRACK_COLS ||
     tileRow < 0 || tileRow >= TRACK_ROWS) {
     return TRACK_WALL; // avoid invalid array access, treat out of bounds as wall
  }
  
  var trackIndex = trackTileToIndex(tileCol, tileRow);
  return TRACKS[courseIndex].grid[trackIndex];
}

var last_course_with_decals = -999; // so it gets drawn only once ont every frame

function drawTracks() {
  var trackIndex = 0;
  var trackLeftEdgeX = 0;
  var trackTopEdgeY = 0;
  
  // draw decals on the first frame only, then reuse forever
  if (last_course_with_decals != courseIndex) { 
    last_course_with_decals = courseIndex;
    if (TRACKS[courseIndex].decals) {
        for (var key in TRACKS[courseIndex].decals) {
            var img = window[key]; // all our images are globals so we need to find it by string name
            if (img && img.src) spawn_decals(img,TRACKS[courseIndex].decals[key]);
        }
    }
  }

  for(var eachRow=0; eachRow<TRACK_ROWS; eachRow++) { // deal with one row at a time
    
    trackLeftEdgeX = 0; // resetting horizontal draw position for tiles to left edge
    
    for(var eachCol=0; eachCol<TRACK_COLS; eachCol++) { // left to right in each row

      var trackTypeHere = TRACKS[courseIndex].grid[ trackIndex ]; // getting the track code for this tile        
      canvasContext.drawImage(trackSheet,
        trackTypeHere * TILE_SIZE, 0, // top-left corner of tile art, multiple of tile width
        TILE_SIZE, TILE_SIZE, // get full tile size from source
        trackLeftEdgeX - camera.drawPosition.x, trackTopEdgeY - camera.drawPosition.y, // x,y top-left corner for image destination
        TRACK_W, TRACK_H); // draw full full tile size for destination
      
      trackIndex++; // increment which index we're going to next check for in the track        
      trackLeftEdgeX += TRACK_W; // jump horizontal draw position to next tile over by tile width

    } // end of for eachCol
    
    trackTopEdgeY += TRACK_H; // jump horizontal draw position down by one full tile height
    
  } // end of for eachRow    

} // end of drawTracks()
