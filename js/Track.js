// track constants and variables
const TILE_SIZE = 32;
const TRACK_W = 80;
const TRACK_H = 80;
const TRACK_COLS = 20;
const TRACK_ROWS = 30;//15

const MAX_LAPS = 3;

const SNOW_LEVEL = 0;
const CAFE_LEVEL = 1;
const JUNGLE_LEVEL = 2;

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
const TRACK_WATER = 10;
const TRACK_WOOD = 11;
const TRACK_WOOD_ROTATED = 12;
const TRACK_TILE_MAX = 13; // will have to update this as extra tiles are added, should match suffix of track file
//const TRACK_FLAG = 8;

const TRACKS = [

  // snow track debug
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
      6, 6, 5, 5, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6,
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
      { xPos: 265, yPos: 280, angleVal: 30, widthVal: 200, radiusVal: 60},
      { xPos: 578, yPos: 254, angleVal: 80, widthVal: 150, radiusVal: 50},
      { xPos: 1233, yPos: 206, angleVal: 80, widthVal: 100, radiusVal: 40},
      { xPos: 1492, yPos: 297, angleVal: 30, widthVal: 100, radiusVal: 50},
      { xPos: 1480, yPos: 664, angleVal: 30, widthVal: 400, radiusVal: 50},
      { xPos: 905, yPos: 577, angleVal: 380, widthVal: 100, radiusVal: 40},
      { xPos: 524, yPos: 507, angleVal: 75, widthVal: 180, radiusVal: 50},
      { xPos: 534, yPos: 841, angleVal: 149, widthVal: 130, radiusVal: 40},
      { xPos: 1176, yPos: 929, angleVal: 80, widthVal: 200, radiusVal: 40},
      { xPos: 1427, yPos: 939, angleVal: 140, widthVal: 300, radiusVal: 40},
      { xPos: 1366, yPos: 1362, angleVal: 45, widthVal: 200, radiusVal: 30},
      { xPos: 1039, yPos: 1302, angleVal: 80, widthVal: 100, radiusVal: 30},
      { xPos: 817, yPos: 1245, angleVal: 30, widthVal: 150, radiusVal: 30},
      { xPos: 776, yPos: 1527, angleVal: 0, widthVal: 100, radiusVal: 30},
      { xPos: 1139, yPos: 1781, angleVal: 80, widthVal: 150, radiusVal: 30},
      { xPos: 1445, yPos: 1812, angleVal: 140, widthVal: 180, radiusVal: 30},
      { xPos: 1374, yPos: 2223, angleVal: 45, widthVal: 250, radiusVal: 30},
      { xPos: 1050, yPos: 2210, angleVal: 80, widthVal: 350, radiusVal: 30},      
      { xPos: 371, yPos: 1673, angleVal: 0, widthVal: 350, radiusVal: 30},
      { xPos: 279, yPos: 937, angleVal: 0, widthVal: 300, radiusVal: 50},
    ],
    powerups: [
      { type: POWERUP_ESPRESSO, xPos: 175, yPos: 300, radiusVal: 20, active: false },
      { type: POWERUP_ESPRESSO, xPos: 275, yPos: 300, radiusVal: 20, active: false },
    ]
  }
  ,
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
      9, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 2, 2, 9,
      9, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 7, 7, 9,
      7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 7
    ],
    waypoints: [
      { xPos: 1498, yPos: 1666, angleVal: 0, widthVal: 250, radiusVal: 40},
      { xPos: 1470, yPos: 1387, angleVal: 300, widthVal: 300, radiusVal: 40},
      { xPos: 1217, yPos: 1499, angleVal: 90, widthVal: 200, radiusVal: 40},
      { xPos: 918, yPos: 1621, angleVal: 30, widthVal: 250, radiusVal: 40},
      { xPos: 898, yPos: 1848, angleVal: 330, widthVal: 150, radiusVal: 30},
      { xPos: 1111, yPos: 1907, angleVal: 330, widthVal: 200, radiusVal: 40},
      { xPos: 994, yPos: 2046, angleVal: 30, widthVal: 150, radiusVal: 40},
      { xPos: 435, yPos: 2044, angleVal: 330, widthVal: 200, radiusVal: 40},
      { xPos: 432, yPos: 1828, angleVal: 0, widthVal: 150, radiusVal: 40},
      { xPos: 613, yPos: 1632, angleVal: 30, widthVal: 180, radiusVal: 40},
      { xPos: 630, yPos: 1027, angleVal: 0, widthVal: 300, radiusVal: 40},
      { xPos: 891, yPos: 986, angleVal: 330, widthVal: 200, radiusVal: 40},
      { xPos: 1086, yPos: 1216, angleVal: 60, widthVal: 300, radiusVal: 40},
      { xPos: 1229, yPos: 843, angleVal: 0, widthVal: 350, radiusVal: 40},
      { xPos: 858, yPos: 630, angleVal: 90, widthVal: 900, radiusVal: 40},
      { xPos: 464, yPos: 698, angleVal: 30, widthVal: 900, radiusVal: 40},
      { xPos: 283, yPos: 828, angleVal: 0, widthVal: 300, radiusVal: 40},
      { xPos: 284, yPos: 1352, angleVal: 0, widthVal: 300, radiusVal: 40},
      { xPos: 161, yPos: 1592, angleVal: 0, widthVal: 150, radiusVal: 40},
      { xPos: 168, yPos: 2198, angleVal: 330, widthVal: 250, radiusVal: 40},
      { xPos: 1426, yPos: 2269, angleVal: 30, widthVal: 250, radiusVal: 40},
    ],
    powerups: [
      { type: POWERUP_ESPRESSO, xPos: 175, yPos: 300, radiusVal: 20, active: false },
      { type: POWERUP_ESPRESSO, xPos: 275, yPos: 300, radiusVal: 20, active: true },
    ]
  }
  
  ,
  // new monsoon
  {
    decals: {
    },
    grid: [
      10, 10, 10, 10, 10, 10, 10, 10, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      10, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
      10, 10, 0, 11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 11, 0, 1,
      10, 10, 0, 11, 11, 0, 0, 0, 10, 10, 0, 0, 0, 0, 0, 0, 0, 11, 0, 1,
      10, 10, 0, 11, 0, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 0, 11, 0, 1,
      10, 10, 0, 11, 0, 10, 0, 0, 0, 10, 10, 0, 0, 0, 0, 0, 0, 11, 0, 1,
      10, 10, 0, 11, 0, 10, 11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 11, 0, 1,
      10, 10, 0, 11, 0, 10, 11, 11, 0, 0, 10, 10, 1, 1, 1, 1, 1, 1, 1, 1,
      10, 10, 0, 11, 0, 10, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 0, 1,
      10, 10, 0, 11, 0, 10, 0, 0, 0, 0, 10, 10, 10, 0, 0, 0, 0, 11, 0, 1,
      10, 10, 0, 11, 0, 10, 0, 0, 0, 0, 10, 10, 10, 10, 0, 0, 0, 11, 0, 1,
      10, 10, 0, 11, 0, 10, 0, 0, 1, 1, 1, 10, 10, 10, 0, 0, 0, 11, 0, 1,
      10, 10, 0, 11, 0, 10, 0, 1, 1, 1, 1, 10, 10, 10, 10, 0, 0, 11, 0, 1,
      10, 0, 11, 11, 0, 10, 10, 10, 1, 1, 1, 0, 10, 10, 10, 10, 0, 11, 0, 1,
      10, 0, 11, 11, 0, 10, 10, 10, 0, 0, 0, 0, 0, 10, 10, 10, 0, 11, 0, 1,
      10, 0, 11, 10, 0, 10, 10, 10, 0, 12, 12, 12, 12, 12, 12, 12, 12, 12, 0, 1,
      10, 0, 11, 10, 0, 10, 10, 10, 0, 11, 0, 0, 0, 10, 10, 10, 10, 0, 0, 1,
      10, 0, 11, 10, 0, 10, 10, 10, 0, 11, 0, 0, 0, 0, 10, 10, 10, 0, 0, 1,
      10, 0, 11, 0, 0, 10, 10, 10, 0, 11, 0, 0, 0, 10, 10, 10, 10, 1, 1, 1,
      10, 0, 11, 0, 0, 10, 10, 10, 0, 11, 0, 10, 10, 10, 10, 0, 1, 1, 1, 1,
      10, 0, 11, 11, 0, 10, 10, 10, 0, 12, 12, 12, 12, 12, 12, 12, 12, 0, 0, 1,
      10, 0, 11, 11, 0, 10, 10, 10, 0, 0, 0, 0, 0, 0, 0, 11, 11, 0, 0, 1,
      10, 10, 10, 11, 0, 10, 10, 10, 0, 0, 0, 10, 10, 0, 0, 11, 11, 0, 0, 1,
      10, 10, 10, 11, 0, 10, 10, 10, 1, 1, 1, 10, 10, 10, 0, 11, 11, 0, 0, 1,
      10, 10, 10, 11, 0, 10, 10, 10, 0, 0, 1, 1, 10, 10, 0, 2, 2, 0, 0, 1,
      10, 10, 10, 11, 0, 10, 10, 10, 0, 0, 0, 0, 10, 10, 0, 2, 2, 0, 0, 1,
      10, 10, 10, 11, 0, 10, 10, 10, 0, 12, 12, 12, 12, 10, 10, 11, 11, 0, 0, 1,
      10, 10, 0, 11, 12, 12, 12, 12, 11, 11, 1, 1, 11, 12, 3, 12, 11, 0, 0, 1,
      10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 0, 0, 0, 0, 1,
      10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10
    ],
    waypoints: [
      { xPos: 1269, yPos: 1674, angleVal: 0, widthVal: 50, radiusVal: 50},
      { xPos: 877, yPos: 1651, angleVal: 0, widthVal: 50, radiusVal: 50},
      { xPos: 772, yPos: 1622, angleVal: 0, widthVal: 30, radiusVal: 30},
      { xPos: 779, yPos: 1264, angleVal: 0, widthVal: 60, radiusVal: 60},
      { xPos: 935, yPos: 1251, angleVal: 0, widthVal: 30, radiusVal: 50},
      { xPos: 1402, yPos: 1268, angleVal: 0, widthVal: 30, radiusVal: 50},
      { xPos: 1404, yPos: 764, angleVal: 0, widthVal: 50, radiusVal: 50},
      { xPos: 1386, yPos: 668, angleVal: 0, widthVal: 30, radiusVal: 30},
      { xPos: 1026, yPos: 668, angleVal: 0, widthVal: 30, radiusVal: 40},
      { xPos: 739, yPos: 688, angleVal: 0, widthVal: 40, radiusVal: 40},
      { xPos: 550, yPos: 694, angleVal: 0, widthVal: 40, radiusVal: 40},
      { xPos: 567, yPos: 559, angleVal: 0, widthVal: 40, radiusVal: 40},
      { xPos: 712, yPos: 519, angleVal: 0, widthVal: 40, radiusVal: 40},
      { xPos: 1400, yPos: 524, angleVal: 0, widthVal: 40, radiusVal: 40},
      { xPos: 1401, yPos: 233, angleVal: 0, widthVal: 40, radiusVal: 40},
      { xPos: 985, yPos: 202, angleVal: 0, widthVal: 40, radiusVal: 40},
      { xPos: 579, yPos: 208, angleVal: 0, widthVal: 40, radiusVal: 40},
      { xPos: 313, yPos: 300, angleVal: 0, widthVal: 40, radiusVal: 40},
      { xPos: 280, yPos: 672, angleVal: 0, widthVal: 40, radiusVal: 40},
      { xPos: 296, yPos: 1062, angleVal: 0, widthVal: 40, radiusVal: 40},
      { xPos: 186, yPos: 1183, angleVal: 0, widthVal: 40, radiusVal: 40},
      { xPos: 218, yPos: 1652, angleVal: 0, widthVal: 40, radiusVal: 40},
      { xPos: 298, yPos: 1750, angleVal: 0, widthVal: 40, radiusVal: 40},
      { xPos: 315, yPos: 2180, angleVal: 0, widthVal: 40, radiusVal: 40},
      { xPos: 718, yPos: 2214, angleVal: 0, widthVal: 40, radiusVal: 40},
      { xPos: 781, yPos: 2109, angleVal: 0, widthVal: 40, radiusVal: 40},
      { xPos: 989, yPos: 2132, angleVal: 0, widthVal: 40, radiusVal: 40},
      { xPos: 1018, yPos: 2224, angleVal: 0, widthVal: 40, radiusVal: 40},
      { xPos: 1313, yPos: 2206, angleVal: 0, widthVal: 40, radiusVal: 40},
    ],
    powerups: [
      { type: POWERUP_ESPRESSO, xPos: 175, yPos: 300, radiusVal: 20, active: false },
      { type: POWERUP_ESPRESSO, xPos: 275, yPos: 300, radiusVal: 20, active: false },
    ]
  },
  

  
  
  

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


function courseReplacementTile()
{
  if (courseIndex == 0) {
    return TRACK_SNOW_ROAD;
  }
  if (courseIndex == 1) {
    return TRACK_CAFE_FLOOR;
  }
  if (courseIndex == 2) {
    return TRACK_WOOD;
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
  if (tileType == TRACK_WOOD || tileType == TRACK_WOOD_ROTATED) {
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


/* 

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
      6, 6, 5, 5, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6,
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
  }
  // old cafe 
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
      9, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 2, 2, 9,
      9, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 7, 7, 9,
      7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 7
    ],
    waypoints: [
      { xPos: 1498, yPos: 1666, angleVal: 0, widthVal: 50, radiusVal: 50},
      { xPos: 1470, yPos: 1387, angleVal: 0, widthVal: 40, radiusVal: 40},
      { xPos: 1217, yPos: 1499, angleVal: 0, widthVal: 40, radiusVal: 40},
      { xPos: 918, yPos: 1621, angleVal: 0, widthVal: 40, radiusVal: 40},
      { xPos: 898, yPos: 1848, angleVal: 0, widthVal: 40, radiusVal: 40},
      { xPos: 1111, yPos: 1907, angleVal: 0, widthVal: 40, radiusVal: 40},
      { xPos: 994, yPos: 2046, angleVal: 0, widthVal: 40, radiusVal: 40},
      { xPos: 435, yPos: 2044, angleVal: 0, widthVal: 40, radiusVal: 40},
      { xPos: 432, yPos: 1828, angleVal: 0, widthVal: 40, radiusVal: 40},
      { xPos: 613, yPos: 1632, angleVal: 0, widthVal: 40, radiusVal: 40},
      { xPos: 630, yPos: 1027, angleVal: 0, widthVal: 50, radiusVal: 50},
      { xPos: 891, yPos: 986, angleVal: 0, widthVal: 40, radiusVal: 40},
      { xPos: 1086, yPos: 1216, angleVal: 0, widthVal: 40, radiusVal: 40},
      { xPos: 1229, yPos: 843, angleVal: 0, widthVal: 40, radiusVal: 40},
      { xPos: 858, yPos: 630, angleVal: 0, widthVal: 40, radiusVal: 40},
      { xPos: 464, yPos: 698, angleVal: 0, widthVal: 40, radiusVal: 40},
      { xPos: 283, yPos: 828, angleVal: 0, widthVal: 40, radiusVal: 40},
      { xPos: 284, yPos: 1352, angleVal: 0, widthVal: 40, radiusVal: 40},
      { xPos: 161, yPos: 1592, angleVal: 0, widthVal: 40, radiusVal: 40},
      { xPos: 168, yPos: 2198, angleVal: 0, widthVal: 40, radiusVal: 40},
      { xPos: 1426, yPos: 2269, angleVal: 0, widthVal: 40, radiusVal: 40},
    ],
    powerups: [
      { type: POWERUP_ESPRESSO, xPos: 175, yPos: 300, radiusVal: 20, active: false },
      { type: POWERUP_ESPRESSO, xPos: 275, yPos: 300, radiusVal: 20, active: true },
    ]
  }

  */