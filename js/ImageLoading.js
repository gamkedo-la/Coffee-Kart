var carPic = document.createElement("img");
var car2Pic = document.createElement("img");
var car3Pic = document.createElement("img");
var carSportPic = document.createElement("img");
var carOpenTopPic = document.createElement("img");
var trackSheet = document.createElement("img");
var car_lights = document.createElement("img");
var timerBGPic = document.createElement("img");
var placingSheet = document.createElement("img");

// decals
var tireTracksPic = document.createElement("img");
var decal_oilstain = document.createElement("img");
var decal_crack = document.createElement("img");
var decal_pebbles = document.createElement("img");
var decal_grass = document.createElement("img");
var decal_barrel = document.createElement("img");
var decal_tire = document.createElement("img");
var decal_cone = document.createElement("img");
var decal_skidmarks = document.createElement("img");
var decal_stripes = document.createElement("img");
var decal_coffee_cup = document.createElement("img");
var decal_coffee_takeaway = document.createElement("img");
var decal_muffin = document.createElement("img");
var decal_french_press = document.createElement("img");
var decal_skidmarks_left = document.createElement("img");
var decal_stripes_vertical = document.createElement("img");
var decal_lights = document.createElement("img");
var background_flag = document.createElement("img");
var cursor_flag = document.createElement("img");

// particles
var smokePic = document.createElement("img");

var picsToLoad = 0;

function countLoadedImageAndLaunchIfReady() {
  picsToLoad--;
  if (picsToLoad == 0) {
    // last image loaded?
    loadingDoneSoStartGame();
  }
}

function beginLoadingImage(imgVar, fileName) {
  imgVar.onload = countLoadedImageAndLaunchIfReady;
  imgVar.src = "images/" + fileName;
}

function loadImages() {
  var imageList = [
    { varName: carPic, theFile: "car_top.png" },
    { varName: car2Pic, theFile: "car_green_top.png" },
    { varName: car3Pic, theFile: "car_red_top.png" },
    { varName: carSportPic, theFile: "car_red_sport_top.png" },
    { varName: carOpenTopPic, theFile: "opentopCarv2.png" },
    { varName: trackSheet, theFile: "tiles_ten.png" },
    { varName: tireTracksPic, theFile: "tire_tracks.png" },
    { varName: decal_oilstain, theFile: "decal_oilstain.png" },
    { varName: decal_crack, theFile: "decal_crack.png" },
    { varName: decal_pebbles, theFile: "decal_pebbles.png" },
    { varName: decal_grass, theFile: "decal_grass.png" },
    { varName: decal_barrel, theFile: "decal_barrel.png" },
    { varName: decal_tire, theFile: "decal_tire.png" },
    { varName: decal_cone, theFile: "decal_cone.png" },
    { varName: decal_skidmarks, theFile: "decal_skidmarks.png" },
    { varName: decal_stripes, theFile: "decal_stripes.png" },
    { varName: decal_coffee_cup, theFile: "coffee_cup--1.png" },
    { varName: decal_coffee_takeaway, theFile: "coffee_cup--2.png" },
    { varName: decal_french_press, theFile: "French-Press.png" },
    { varName: decal_muffin, theFile: "muffin.png" },
    { varName: decal_skidmarks_left, theFile: "decal_skidmarks_left.png" },
    { varName: decal_stripes_vertical, theFile: "decal_stripes_vertical.png" },
    { varName: decal_lights, theFile: "decal_lights.png" },
    { varName: background_flag, theFile: "background_flag.png" },
    { varName: cursor_flag, theFile: "cursor_flag.png" },
    { varName: car_lights, theFile: "car_lights.png" },
    { varName: smokePic, theFile: "smoke.png" },
    { varName: timerBGPic, theFile: "stopwatch_bg.png" },
    { varName : placingSheet, theFile: "placings.png"},
  ];

  picsToLoad = imageList.length;

  for (var i = 0; i < imageList.length; i++) {
    beginLoadingImage(imageList[i].varName, imageList[i].theFile);
  } // end of for imageList
} // end of function loadImages
