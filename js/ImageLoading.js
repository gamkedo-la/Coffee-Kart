var carPic = document.createElement("img");
var car2Pic = document.createElement("img");
var trackSheet = document.createElement("img");
var tireTracksPic = document.createElement("img");

var picsToLoad = 0;

function countLoadedImageAndLaunchIfReady() {
  picsToLoad--;
  if(picsToLoad == 0) { // last image loaded?
    loadingDoneSoStartGame();
  }
}

function beginLoadingImage(imgVar, fileName) {
  imgVar.onload=countLoadedImageAndLaunchIfReady;
  imgVar.src="images/"+fileName;
}

function loadImages() {

  var imageList = [
    {varName:carPic, theFile:"car_top.png"},
    {varName:car2Pic, theFile:"car_top.png"},
    {varName:trackSheet, theFile:"tiles_four.png"},
    {varName:tireTracksPic, theFile:"tire_tracks.png"}
    ];

  picsToLoad = imageList.length;

  for(var i=0;i<imageList.length;i++) {
    beginLoadingImage(imageList[i].varName, imageList[i].theFile);
  } // end of for imageList

} // end of function loadImages
