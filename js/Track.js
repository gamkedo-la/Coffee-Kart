// track constants and variables
const TILE_SIZE = 32;
const TRACK_W = 80;
const TRACK_H = 80;
const TRACK_COLS = 20;
const TRACK_ROWS = 15;
const TRACKS = [
  {
    decals:
    { 
        "decal_skidmarks":[448,583,197,407,322,264,1312,236,1500,433,1380,693,1496,933,990,654,1046,605,464,748,126,699,201,679,122,788,229,712,170,809],
        "decal_skidmarks_left":[600,698,1172,654,1091,572,1253,206,1419,242,1214,500],
        "decal_stripes":[112,816,233,814,494,77,670,78,833,81,999,79,571,265,745,262,927,258,1088,259,1404,1136,1237,1134,879,1059,459,399,1171,400,1015,400,419,1146,242,1146,66,1146],
        "decal_stripes_vertical":[272,751,58,755,58,580,57,426,269,616,269,465,1552,307,1336,487,1546,509,1331,645,1327,785,1548,664,1549,837,1546,986,1086,961,1083,789,854,618,510,1040,507,875],        "decal_oilstain":[208,770,343,631,502,486,763,848,899,553,1177,438,1180,670,1231,844,268,244,402,137,1132,107,1389,291,1473,982,1418,1061,387,954,333,1003],
        "decal_crack":[586,611,106,371,692,218,780,101,1399,114,997,454,443,1071],
        "decal_pebbles":[426,466,364,502,590,755,959,502,1223,735,149,727,97,633,245,328,414,188,775,175,997,99,1101,202,1328,117,1421,192,1496,306,1309,302,1407,345,1449,261,1453,392,1399,229,1356,281,1462,483,1526,1013,1419,1016,1315,901,1201,1052,1015,885,955,964,1010,931,939,886,921,999,793,641,484,1007,382,1093,479,1108,311,961,405,803,364,695,367,764],
        "decal_grass":[727,563,636,493,792,636,554,399,946,397,888,474,891,452,266,806,84,806,322,411,275,493,65,394,72,233,88,152,167,168,71,262,241,85,335,63,228,94,402,65,491,258,637,273,556,268,709,247,786,64,844,88,942,61,868,68,713,76,650,74,950,264,1082,297,1049,253,1116,262,1007,272,1147,270,1217,267,1129,329,1189,73,1243,63,1311,87,1208,55,1098,33,1401,75,1469,97,1531,185,1342,362,1572,310,1586,403,1540,405,1316,551,1277,493,1319,617,1555,769,1565,931,1557,985,1504,1041,1511,1115,1578,1074,1535,1134,1139,1046,1444,1159,1378,1163,1346,1145,1552,1156,1319,1174,1037,1029,1115,990,1071,947,1101,858,1072,944,823,718,695,963,623,866,682,939,711,1031,661,1039,761,1100,665,1122,740,1062,602,1064,958,1136,1035,1122,1080,1151,928,1134,540,798,481,814,488,896,479,903,555,934,468,887,570,955,226,911,146,931,31,891,14,935,17,796,250,883,231,943,407,1151,321,1181,225,1165,326,1134,281,1152,390,1158,548,1147],
        "decal_barrel":[248,804,274,808,271,780,837,797,861,793,326,410,341,385,358,412,1284,322,1314,326,1302,349,1574,859,1580,900,1580,936,1557,887,1562,924],
        "decal_tire":[262,825,60,806,65,800,78,818,82,809,68,821,167,172,187,162,221,154,880,273,804,276,1526,133,1537,148,1551,167,1533,155,1547,171,1557,190,1555,149,1570,171,1349,841,1342,855,875,1123,890,1123,909,1124,885,1115,902,1112,895,1105],
        "decal_cone":[50,700,267,700,403,342,287,459,1510,116,1560,224,1529,182,1323,861,1086,642,1060,694,1106,702,514,1086,463,1151],
        "decal_coffee_cup":[292,745,165,849,937,409,664,47,1558,113,1403,1162,927,1080],
        "decal_coffee_takeaway":[285,855,467,354,861,727,828,774,88,221,168,147,1277,358,1232,348,1363,44,1592,781,1314,829,1576,1052,1045,1006,1086,1061,726,555,235,883,40,907,178,935,223,1171,420,1171],
        "decal_lights":[12,640,270,640,820,745,570,58,744,57,904,54,1541,161,1564,767],
    },

    grid:
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
      1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
      1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1,
      1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1,
      1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
      1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
      1, 2, 2, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
      1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
      1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1,
      1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
      0, 3, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
      0, 3, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    waypoints:
    [
      {xPos: 175, yPos: 300, angleVal: 0, widthVal: 20, radiusVal: 20,},
      {xPos: 500, yPos: 150, angleVal: 20, widthVal: 20, radiusVal: 20},
      {xPos: 700, yPos: 150, angleVal: 20, widthVal: 20, radiusVal: 20},
      {xPos: 900, yPos: 150, angleVal: 20, widthVal: 20, radiusVal: 20},
      {xPos: 1100, yPos: 150, angleVal: 20, widthVal: 20, radiusVal: 10}
    ]
  }
];
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
const TRACK_TREE = 4;
const TRACK_FLAG = 5;

function trackTileToIndex(tileCol, tileRow) {
  return (tileCol + TRACK_COLS*tileRow);
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
