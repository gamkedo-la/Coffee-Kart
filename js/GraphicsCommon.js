// todo:
// refactor to include camera.drawPosition in these calls

function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
  canvasContext.save();
  canvasContext.fillStyle = fillColor;
  canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
  canvasContext.restore();
}

function colorRectRotated(topLeftX, topLeftY, boxWidth, boxHeight, fillColor, withAngle) {
  canvasContext.save();
  canvasContext.rotate(withAngle); // sets the rotation
  canvasContext.fillStyle = fillColor;
  canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
  canvasContext.restore();
}

function colorCircle(centerX, centerY, radius, fillColor) {
  canvasContext.save();
  canvasContext.fillStyle = fillColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
  canvasContext.fill();
  canvasContext.restore();
}

function colorLine(startX, startY, endX, endY, fillColor) {
  canvasContext.save();
  canvasContext.strokeStyle = fillColor;
  canvasContext.beginPath();
  canvasContext.moveTo(startX, startY);
  canvasContext.lineTo(endX, endY);
  canvasContext.stroke();
  canvasContext.restore();
}
  
function drawBitmapCenteredAtLocationWithRotation(graphic, atX, atY,withAngle) {
  canvasContext.save(); // allows us to undo translate movement and rotate spin
  canvasContext.translate(atX,atY); // sets the point where our graphic will go
  canvasContext.rotate(withAngle); // sets the rotation
  canvasContext.drawImage(graphic,-graphic.width/2,-graphic.height/2); // center, draw
  canvasContext.restore(); // undo the translation movement and rotation since save()
}