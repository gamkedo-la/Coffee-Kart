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
      
      
      { type: POWERUP_COFFEE_BEAN, xPos: 227, yPos: 337, radiusVal: 20, active: true, timer : 0},
      { type: POWERUP_COFFEE_BEAN, xPos: 361, yPos: 214, radiusVal: 20, active: true, timer : 0},
      { type: POWERUP_CROISSANT, xPos: 608, yPos: 212, radiusVal: 20, active: true, timer : 0},
      { type: POWERUP_CROISSANT, xPos: 858, yPos: 334, radiusVal: 20, active: true, timer : 0},
      { type: POWERUP_MUFFIN, xPos: 936, yPos: 212, radiusVal: 20, active: true, timer : 0},
      { type: POWERUP_MUFFIN, xPos: 1112, yPos: 284, radiusVal: 20, active: true, timer : 0},
      { type: POWERUP_FRENCH_PRESS, xPos: 1357, yPos: 293, radiusVal: 20, active: true, timer : 0},
      { type: POWERUP_FRENCH_PRESS, xPos: 1315, yPos: 534, radiusVal: 20, active: true, timer : 0},
      { type: POWERUP_TAKEAWAY, xPos: 1073, yPos: 522, radiusVal: 20, active: true, timer : 0},
      { type: POWERUP_TAKEAWAY, xPos: 747, yPos: 611, radiusVal: 20, active: true, timer : 0},
      { type: POWERUP_ESPRESSO, xPos: 443, yPos: 529, radiusVal: 20, active: true, timer : 0},
      { type: POWERUP_ESPRESSO, xPos: 387, yPos: 371, radiusVal: 20, active: true, timer : 0},
      { type: POWERUP_ESPRESSO, xPos: 151, yPos: 262, radiusVal: 20, active: true, timer : 0},
      { type: POWERUP_ESPRESSO, xPos: 548, yPos: 696, radiusVal: 20, active: true, timer : 0},
      { type: POWERUP_FRENCH_PRESS, xPos: 477, yPos: 777, radiusVal: 20, active: true, timer : 0},
      { type: POWERUP_FRENCH_PRESS, xPos: 999, yPos: 932, radiusVal: 20, active: true, timer : 0},
      { type: POWERUP_FRENCH_PRESS, xPos: 1333, yPos: 825, radiusVal: 20, active: true, timer : 0},
      { type: POWERUP_MUFFIN, xPos: 1298, yPos: 1185, radiusVal: 20, active: true, timer : 0},
      { type: POWERUP_ESPRESSO, xPos: 1084, yPos: 1350, radiusVal: 20, active: true, timer : 0},
      { type: POWERUP_ESPRESSO, xPos: 752, yPos: 1347, radiusVal: 20, active: true, timer : 0},
      { type: POWERUP_MUFFIN, xPos: 889, yPos: 1662, radiusVal: 20, active: true, timer : 0},
      { type: POWERUP_COFFEE_BEAN, xPos: 1387, yPos: 1810, radiusVal: 20, active: true, timer : 0},
      { type: POWERUP_COFFEE_BEAN, xPos: 1172, yPos: 1754, radiusVal: 20, active: true, timer : 0},
      { type: POWERUP_COFFEE_BEAN, xPos: 1121, yPos: 2122, radiusVal: 20, active: true, timer : 0},
      { type: POWERUP_FRENCH_PRESS, xPos: 536, yPos: 2103, radiusVal: 20, active: true, timer : 0},
      { type: POWERUP_FRENCH_PRESS, xPos: 840, yPos: 1885, radiusVal: 20, active: true, timer : 0},
      { type: POWERUP_FRENCH_PRESS, xPos: 272, yPos: 2043, radiusVal: 20, active: true, timer : 0},
      { type: POWERUP_ESPRESSO, xPos: 162, yPos: 1892, radiusVal: 20, active: true, timer : 0},
      { type: POWERUP_ESPRESSO, xPos: 602, yPos: 1654, radiusVal: 20, active: true, timer : 0},
      { type: POWERUP_ESPRESSO, xPos: 444, yPos: 1470, radiusVal: 20, active: true, timer : 0},
      { type: POWERUP_CROISSANT, xPos: 155, yPos: 1456, radiusVal: 20, active: true, timer : 0},
      { type: POWERUP_CROISSANT, xPos: 354, yPos: 1158, radiusVal: 20, active: true, timer : 0},
      { type: POWERUP_CROISSANT, xPos: 769, yPos: 782, radiusVal: 20, active: true, timer : 0},
      { type: POWERUP_CROISSANT, xPos: 1393, yPos: 1006, radiusVal: 20, active: true, timer : 0},
      { type: POWERUP_CROISSANT, xPos: 287, yPos: 539, radiusVal: 20, active: true, timer : 0},
      { type: POWERUP_COFFEE_BEAN, xPos: 204, yPos: 1010, radiusVal: 20, active: true, timer : 0},
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
      
      { type: POWERUP_ESPRESSO, xPos: 275, yPos: 300, radiusVal: 20, active: true, timer : 0},
      { type: POWERUP_MUFFIN, xPos: 1504, yPos: 1812, radiusVal: 20, active: true, timer : 0},
      { type: POWERUP_MUFFIN, xPos: 1395, yPos: 1743, radiusVal: 20, active: true, timer : 0},
      { type: POWERUP_FRENCH_PRESS, xPos: 1388, yPos: 1943, radiusVal: 20, active: true, timer : 0},

      { type: POWERUP_TAKEAWAY, xPos: 1426, yPos: 1505, radiusVal: 20, active: true, timer : 0},

      { type: POWERUP_ESPRESSO, xPos: 1021, yPos: 1522, radiusVal: 20, active: true, timer : 0},
      { type: POWERUP_ESPRESSO, xPos: 1108, yPos: 1642, radiusVal: 20, active: true, timer : 0},

      { type: POWERUP_CROISSANT, xPos: 918, yPos: 1749, radiusVal: 20, active: true, timer : 0},
      { type: POWERUP_CROISSANT, xPos: 1003, yPos: 1927, radiusVal: 20, active: true, timer : 0},
      { type: POWERUP_COFFEE_BEAN, xPos: 930, yPos: 2038, radiusVal: 20, active: true, timer : 0},

      { type: POWERUP_COFFEE_BEAN, xPos: 398, yPos: 2020, radiusVal: 20, active: true, timer : 0},
      { type: POWERUP_FRENCH_PRESS, xPos: 378, yPos: 1882, radiusVal: 20, active: true, timer : 0},

      { type: POWERUP_ESPRESSO, xPos: 697, yPos: 1511, radiusVal: 20, active: true, timer : 0},
      { type: POWERUP_ESPRESSO, xPos: 606, yPos: 1387, radiusVal: 20, active: true, timer : 0},

      { type: POWERUP_ESPRESSO, xPos: 626, yPos: 1256, radiusVal: 20, active: true, timer : 0},
      { type: POWERUP_CROISSANT, xPos: 520, yPos: 1069, radiusVal: 20, active: true, timer : 0},
      { type: POWERUP_CROISSANT, xPos: 715, yPos: 959, radiusVal: 20, active: true, timer : 0},
      { type: POWERUP_CROISSANT, xPos: 561, yPos: 878, radiusVal: 20, active: true, timer : 0},

      { type: POWERUP_CROISSANT, xPos: 1343, yPos: 1075, radiusVal: 20, active: true, timer : 0},
      { type: POWERUP_CROISSANT, xPos: 1401, yPos: 837, radiusVal: 20, active: true, timer : 0},

      { type: POWERUP_MUFFIN, xPos: 1120, yPos: 788, radiusVal: 20, active: true, timer : 0},

      { type: POWERUP_MUFFIN, xPos: 1124, yPos: 154, radiusVal: 20, active: true, timer : 0},
      { type: POWERUP_FRENCH_PRESS, xPos: 884, yPos: 177, radiusVal: 20, active: true, timer : 0},

      { type: POWERUP_ESPRESSO, xPos: 146, yPos: 834, radiusVal: 20, active: true, timer : 0},

      { type: POWERUP_ESPRESSO, xPos: 140, yPos: 1175, radiusVal: 20, active: true, timer : 0},
      { type: POWERUP_TAKEAWAY, xPos: 272, yPos: 1380, radiusVal: 20, active: true, timer : 0},
      { type: POWERUP_TAKEAWAY, xPos: 185, yPos: 1780, radiusVal: 20, active: true, timer : 0},

      { type: POWERUP_TAKEAWAY, xPos: 271, yPos: 2265, radiusVal: 20, active: true, timer : 0},

      { type: POWERUP_ESPRESSO, xPos: 169, yPos: 2186, radiusVal: 20, active: true, timer : 0},
      { type: POWERUP_ESPRESSO, xPos: 823, yPos: 2271, radiusVal: 20, active: true, timer : 0},


      { type: POWERUP_COFFEE_BEAN, xPos: 1214, yPos: 2293, radiusVal: 20, active: true, timer : 0},
      { type: POWERUP_FRENCH_PRESS, xPos: 1438, yPos: 2268, radiusVal: 20, active: true, timer : 0},
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
      { xPos: 1269, yPos: 1674, angleVal: 330, widthVal: 300, radiusVal: 40},
      { xPos: 877, yPos: 1651, angleVal: 90, widthVal: 150, radiusVal: 40},
      { xPos: 772, yPos: 1622, angleVal: 330, widthVal: 200, radiusVal: 30},
      { xPos: 779, yPos: 1264, angleVal: 30, widthVal: 300, radiusVal: 40},
      { xPos: 935, yPos: 1251, angleVal: 30, widthVal: 350, radiusVal: 30},
      { xPos: 1402, yPos: 1268, angleVal: 30, widthVal: 300, radiusVal: 40},
      { xPos: 1404, yPos: 764, angleVal: 0, widthVal: 400, radiusVal: 40},
      { xPos: 1386, yPos: 668, angleVal: 330, widthVal: 300, radiusVal: 30},
      { xPos: 1026, yPos: 668, angleVal: 90, widthVal: 100, radiusVal: 30},
      { xPos: 739, yPos: 688, angleVal: 330, widthVal: 300, radiusVal: 40},
      { xPos: 550, yPos: 694, angleVal: 330, widthVal: 300, radiusVal: 30},
      { xPos: 567, yPos: 559, angleVal: 0, widthVal: 300, radiusVal: 30},
      { xPos: 712, yPos: 519, angleVal: 30, widthVal: 300, radiusVal: 40},
      { xPos: 1400, yPos: 524, angleVal: 30, widthVal: 300, radiusVal: 40},
      { xPos: 1401, yPos: 233, angleVal: 330, widthVal: 300, radiusVal: 40},
      { xPos: 985, yPos: 202, angleVal: 90, widthVal: 300, radiusVal: 40},
      { xPos: 579, yPos: 208, angleVal: 30, widthVal: 300, radiusVal: 40},
      { xPos: 313, yPos: 300, angleVal: 30, widthVal: 300, radiusVal: 40},
      { xPos: 280, yPos: 672, angleVal: 0, widthVal: 200, radiusVal: 40},
      { xPos: 296, yPos: 1062, angleVal: 0, widthVal: 300, radiusVal: 40},
      { xPos: 186, yPos: 1183, angleVal: 0, widthVal: 300, radiusVal: 40},
      { xPos: 218, yPos: 1652, angleVal: 0, widthVal: 300, radiusVal: 40},
      { xPos: 298, yPos: 1750, angleVal: 0, widthVal: 300, radiusVal: 40},
      { xPos: 315, yPos: 2180, angleVal: 330, widthVal: 300, radiusVal: 40},
      { xPos: 718, yPos: 2214, angleVal: 30, widthVal: 300, radiusVal: 40},
      { xPos: 781, yPos: 2109, angleVal: 30, widthVal: 300, radiusVal: 40},
      { xPos: 989, yPos: 2132, angleVal: 330, widthVal: 300, radiusVal: 40},
      { xPos: 1018, yPos: 2224, angleVal: 330, widthVal: 300, radiusVal: 40},
      { xPos: 1313, yPos: 2206, angleVal: 30, widthVal: 300, radiusVal: 40},
    ],
    powerups: [

      { type: POWERUP_MUFFIN, xPos: 1341, yPos: 1702, radiusVal: 20, active: true, timer : 0},

      { type: POWERUP_FRENCH_PRESS, xPos: 742, yPos: 1627, radiusVal: 20, active: true, timer : 0},
      { type: POWERUP_ESPRESSO, xPos: 1166, yPos: 1666, radiusVal: 20, active: true, timer : 0},
      { type: POWERUP_ESPRESSO, xPos: 904, yPos: 1398, radiusVal: 20, active: true, timer : 0},

      { type: POWERUP_TAKEAWAY, xPos: 774, yPos: 1481, radiusVal: 20, active: true, timer : 0},
      { type: POWERUP_TAKEAWAY, xPos: 1018, yPos: 1244, radiusVal: 20, active: true, timer : 0},
      { type: POWERUP_COFFEE_BEAN, xPos: 1407, yPos: 1241, radiusVal: 20, active: true, timer : 0},

      { type: POWERUP_COFFEE_BEAN, xPos: 1117, yPos: 1248, radiusVal: 20, active: true, timer : 0},
      { type: POWERUP_FRENCH_PRESS, xPos: 1426, yPos: 984, radiusVal: 20, active: true, timer : 0},

      { type: POWERUP_TAKEAWAY, xPos: 1350, yPos: 740, radiusVal: 20, active: true, timer : 0},
      { type: POWERUP_COFFEE_BEAN, xPos: 1147, yPos: 702, radiusVal: 20, active: true, timer : 0},

      { type: POWERUP_COFFEE_BEAN, xPos: 1196, yPos: 810, radiusVal: 20, active: true, timer : 0},
      { type: POWERUP_MUFFIN, xPos: 664, yPos: 763, radiusVal: 20, active: true, timer : 0},

      { type: POWERUP_FRENCH_PRESS, xPos: 572, yPos: 630, radiusVal: 20, active: true, timer : 0},

      { type: POWERUP_FRENCH_PRESS, xPos: 1352, yPos: 461, radiusVal: 20, active: true, timer : 0},

      { type: POWERUP_TAKEAWAY, xPos: 1317, yPos: 262, radiusVal: 20, active: true, timer : 0},

      { type: POWERUP_COFFEE_BEAN, xPos: 957, yPos: 202, radiusVal: 20, active: true, timer : 0},            
      { type: POWERUP_CROISSANT, xPos: 1235, yPos: 218, radiusVal: 20, active: true, timer : 0},

      { type: POWERUP_ESPRESSO, xPos: 374, yPos: 276, radiusVal: 20, active: true, timer : 0},
      { type: POWERUP_ESPRESSO, xPos: 250, yPos: 438, radiusVal: 20, active: true, timer : 0},

      { type: POWERUP_CROISSANT, xPos: 282, yPos: 327, radiusVal: 20, active: true, timer : 0},

      { type: POWERUP_MUFFIN, xPos: 327, yPos: 847, radiusVal: 20, active: true, timer : 0},


      { type: POWERUP_TAKEAWAY, xPos: 172, yPos: 1499, radiusVal: 20, active: true, timer : 0},

      { type: POWERUP_TAKEAWAY, xPos: 305, yPos: 2012, radiusVal: 20, active: true, timer : 0},
      { type: POWERUP_COFFEE_BEAN, xPos: 738, yPos: 2195, radiusVal: 20, active: true, timer : 0},

      { type: POWERUP_FRENCH_PRESS, xPos: 1202, yPos: 2208, radiusVal: 20, active: true, timer : 0},
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