function degToRad(deg) {
    return (deg * Math.PI) / 180.0;
}

function radToDeg(rad) {
    return (rad * 180.0) / Math.PI;
}

function acosDeg(rad) {
    return radToDeg(Math.acos(rad));
}

function Vec2Init(xval, yval) {
    result = {x : xval, y : yval};        
    return result;
}

function Vec2Dot(v1, v2) {
    return v1.x*v2.x + v1.y*v2.y;
}

function Vec2Add(v1, v2) {
    result = Vec2Init(v1.x + v2.x, v1.y + v2.y);
    return result;
}

function Vec2Scale(v1, s) {
    result = Vec2Init(v1.x*s, v1.y*s);
    return result;
}

function Vec2Mag(v) {
    return Math.sqrt(v.x*v.x + v.y*v.y);
}

function Vec2AngleBetween(v1, v2) {
    // potential for div-zero 
    cosTheta = Vec2Dot(v1, v2) / (Vec2Mag(v1) * Vec2Mag(v2));
    theta = acosDeg();
}



