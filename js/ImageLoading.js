var carPic = document.createElement("img");
var car2Pic = document.createElement("img");
var car3Pic = document.createElement("img");
var motorcyclePic = document.createElement("img");
var carSportPic = document.createElement("img");
var carOpenTopPic = document.createElement("img");
var trackSheet = document.createElement("img");
var car_lights = document.createElement("img");
var timerBGPic = document.createElement("img");
var placingSheet = document.createElement("img");
var rainEffectPic = document.createElement("img");
var player_arrow = document.createElement("img");
var instructions_pic = document.createElement("img");
var press_enter_pic = document.createElement("img");
var press_enter_continue_pic = document.createElement("img");
var select_level_pic = document.createElement("img");
var you_won_pic = document.createElement("img");
var better_luck_pic = document.createElement("img");

var snow_level_pic = document.createElement("img");
var cafe_level_pic = document.createElement("img");
var jungle_level_pic = document.createElement("img");

// portraits

var clown_portrait = document.createElement("img");
var farmer_portrait = document.createElement("img");
var hipster_portrait = document.createElement("img");
var office_guy_portrait = document.createElement("img");


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
var decal_coffee_bean = document.createElement("img");
var decal_coffee_cup = document.createElement("img");
var decal_croissant = document.createElement("img");
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
var mudPic = document.createElement("img");

var picsToLoad = 0;
var allImagesLoaded = false;

function countLoadedImageAndLaunchIfReady() {
  picsToLoad--;
  if (picsToLoad == 0) {
    // last image loaded?
    allImagesLoaded = true;
    //loadingDoneSoStartGame();
    
    var message = "Click to start the game!";
    var messageWidth = canvasContext.measureText(message).width;
    canvasContext.drawImage(instructions_pic, 0, 0, 256, 256, SCREEN_WIDTH / 2 - messageWidth / 2, 48, 256, 256);
    canvasContext.fillStyle = "black";
    canvasContext.fillText(message, SCREEN_WIDTH / 2 - messageWidth /2,
    SCREEN_HEIGHT / 2 + 30);
  }
}

function beginLoadingImage(imgVar, fileName) {
  imgVar.onload = countLoadedImageAndLaunchIfReady;
  imgVar.src = "images/" + fileName;
}

function loadImages() {
  var imageList = [
    { varName: clown_portrait, theFile: "clownxcf.png" },
    { varName: hipster_portrait, theFile: "hipster.png" },
    { varName: farmer_portrait, theFile: "farmer.png" },
    { varName: office_guy_portrait, theFile: "officeGuyWithShadow.png" },
    { varName: you_won_pic, theFile: "you_won.png" },
    { varName: better_luck_pic, theFile: "better_luck.png" },
    { varName: press_enter_continue_pic, theFile: "press_enter_continue.png" },
    { varName: press_enter_pic, theFile: "press_enter.png" },
    { varName: select_level_pic, theFile: "select_track.png" },
    { varName: snow_level_pic, theFile: "snowLevel.png" },
    { varName: cafe_level_pic, theFile: "cafeLevel.png" },
    { varName: jungle_level_pic, theFile: "jungleLevel.png" },
    { varName: decal_coffee_bean, theFile: "CoffeeBean.png" },
    { varName: decal_croissant, theFile: "croissantv2.png" },
    { varName: carPic, theFile: "car_top.png" },
    { varName: instructions_pic, theFile: "instructions.png"},
    { varName: car2Pic, theFile: "car_green_top.png" },
    { varName: car3Pic, theFile: "car_red_top.png" },
    { varName: motorcyclePic, theFile : "motorcycle.png"},
    { varName: carSportPic, theFile: "car_red_sport_top.png" },
    { varName: carOpenTopPic, theFile: "opentopCarv2.png" },
    { varName: trackSheet, theFile: "tiles_thirteen.png" },
    { varName: tireTracksPic, theFile: "tire_tracks.png" },
    { varName: player_arrow, theFile: "arrow.png" },
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
    { varName: mudPic, theFile: "mud.png" },
    { varName: timerBGPic, theFile: "stopwatch_bg.png" },
    { varName : placingSheet, theFile: "placings.png"},
    { varName : rainEffectPic, theFile: "rain_effect.png"},
  ];

  picsToLoad = imageList.length;

  for (var i = 0; i < imageList.length; i++) {
    beginLoadingImage(imageList[i].varName, imageList[i].theFile);
  } // end of for imageList
} // end of function loadImages
