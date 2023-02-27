function degToRad(deg) {
  return (deg * Math.PI) / 180.0;
}

function radToDeg(rad) {
  return (rad * 180.0) / Math.PI;
}

function acosDeg(rad) {
  return radToDeg(Math.acos(rad));
}

function asinDeg(rad) {
  return radToDeg(Math.asin(rad));
}

function cosDeg(deg) {
  return Math.cos(degToRad(deg));
}

function sinDeg(deg) {
  return Math.sin(degToRad(deg));
}

function Vec2Init(xVal, yVal) {
  var result = { x: xVal, y: yVal };
  return result;
}

function Vec2Update(v, xVal, yVal) {
  v.x = xVal;
  v.y = yVal;
}

function Vec2PolarInit(angle, length) {
  var result = Vec2Init(length * cosDeg(angle), length * sinDeg(angle));
  return result;
}

function Vec2Angle(v) {
  const length = Vec2Mag(v);
  const epsilon = 0.0001;
  if (length < epsilon) {
    return 0.0;
  }
  const cosTheta = v.x / length;
  const sinTheta = v.y / length;
  const acosTheta = acosDeg(cosTheta);
  const asinTheta = asinDeg(sinTheta);

  // 4 quadrants
  if (asinTheta < 0.0) {
    return 360 - acosTheta;
  } else {
    return acosTheta;
  }
}

function Vec2Dot(v1, v2) {
  return v1.x * v2.x + v1.y * v2.y;
}

function Vec2Add(v1, v2) {
  var result = Vec2Init(v1.x + v2.x, v1.y + v2.y);
  return result;
}

function Vec2Sub(v1, v2) {
  var result = Vec2Init(v1.x - v2.x, v1.y - v2.y);
  return result;
}

function Vec2Scale(v1, s) {
  var result = Vec2Init(v1.x * s, v1.y * s);
  return result;
}

function Vec2ScaleSelf(v1, s) {
  v1.x = v1.x * s;
  v1.y = v1.y * s;
}

function Vec2Mag(v) {
  return Math.sqrt(v.x * v.x + v.y * v.y);
}

function Vec2PointPastLine(lineStart, lineEnd, pointToTest) {
  if (((lineEnd.x - lineStart.x) * (pointToTest.y - lineStart.y) - (lineEnd.y - lineStart.y) * (pointToTest.x - lineStart.x)) > 0) {
    return true;
  }
  return false;
}

function Vec2AngleBetween(v1, v2) {
  // check for
  // potential div-zero
  const v1Mag = Vec2Mag(v1);
  const v2Mag = Vec2Mag(v2);
  const epsilon = 0.0001;
  if (v1Mag < epsilon || v2Mag < epsilon) {
    return 0.0;
  }
  const cosTheta = Vec2Dot(v1, v2) / (Vec2Mag(v1) * Vec2Mag(v2));
  const theta = acosDeg(cosTheta);
  return theta;
}

function Vec2Rotate(v, rotationAmount) {
  const currentAngle = Vec2Angle(v);
  const currentMag = Vec2Mag(v);
  const newAngle = currentAngle + rotationAmount;
  result = Vec2PolarInit(newAngle, currentMag);
  return result;
}

function Vec2RotateSelf(v, rotationAmount) {
  const currentAngle = Vec2Angle(v);
  const currentMag = Vec2Mag(v);
  const newAngle = currentAngle + rotationAmount;
  v.x = currentMag * cosDeg(newAngle);
  v.y = currentMag * sinDeg(newAngle);
}

function Vec2Distance(v1, v2) {
  var v1ToV2 = Vec2Sub(v1, v2);
  var result = Vec2Mag(v1ToV2);
  return result;
}

function Vec2Normalize(v) {
  var result = Vec2Init(1, 0);
  var mag = Vec2Mag(v);
  // not sure what epsilon to use here
  if (mag > 0.0001) {
    result.x = v.x / mag;
    result.y = v.y / mag;
  }
  return result;
}

function Vec2InRect(v, topLeft, topRight, bottomLeft, bottomRight) {
  if (
    v.x >= topLeft.x &&
    v.x <= topRight.x &&
    v.y <= bottomLeft.y &&
    v.y >= topLeft.y
  ) {
    return true;
  }
  return false;
}

function lerp(value, target, percentage = 1, tolerance = 0.001) {
  let diff = Math.abs(value - target);
  if (diff <= tolerance) return target;
  return (value += (target - value) * percentage);
}
