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

function cosDeg(rad) {
    return Math.cos(rad_to_deg(rad));
}

function sinDeg(rad) {
    return Math.sin(rad_to_deg(rad));
}

function Vec2Init(xVal, yVal) {
    var result = {x : xVal, y : yVal};        
    return result;
}

function Vec2PolarInit(angle, length) {
    var result = Vec2Init(length * cosDeg(angle), length * sinDeg(angle));
    return result;
}

function Vec2Angle(v) {     
    const length = Vec2Mag(v);
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
    return v1.x*v2.x + v1.y*v2.y;
}

function Vec2Add(v1, v2) {
    var result = Vec2Init(v1.x + v2.x, v1.y + v2.y);
    return result;
}

function Vec2Scale(v1, s) {
    var result = Vec2Init(v1.x*s, v1.y*s);
    return result;
}

function Vec2Mag(v) {
    return Math.sqrt(v.x*v.x + v.y*v.y);
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



