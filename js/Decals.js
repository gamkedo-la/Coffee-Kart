const DECAL_EDITOR_MODE = true; // if true, we record mouse clicks to the console log for later copy/pasting

// decals by @mcfunkypants
// this is one large offscreen canvas that we can draw onto
// which only needs a single draw call each frame to render
// great for tire tracks, debris, scorch marks, footsteps etc
// zero performance penalty for infinite numbers of decals
// these fx have virtually no effect on framerate at all!

// how to use:
// decals.add(x,y,angle,image);

// each frame:
// decals.draw(camerax,cameray);

function Decalmanager() {

  var debugdecals = false;
  var decalCount = 0;
  var decalCanvas;
  var decalContext;

  // draw any image you want - once, not every frame
  this.add = function (x, y, rot = 0, alpha = 0.03, spritePic) {
    if (!spritePic) return;
    
    if (!decalCanvas) {
        if (debugdecals) console.log("decals initializing");
        decalCanvas = document.createElement("canvas");
        decalContext = decalCanvas.getContext("2d");
        this.resize();
    }
    
    if (debugdecals) console.log('decal at '+x+','+y);
    decalCount++;
    // snap coords - less blurry this way
    x = Math.round(x);
    y = Math.round(y);
    decalContext.globalAlpha = alpha;
    
    // unrotated:
    // decalContext.drawImage(spritePic, x, y);

    decalContext.save();
    decalContext.translate(x,y);
    decalContext.rotate(rot);
    decalContext.drawImage(spritePic,-spritePic.width/2,-spritePic.height/2);
    decalContext.restore();



  };

  // call once per frame
  this.draw = function (xoffset=0,yoffset=0) {
    if (!decalCanvas) return;
    canvasContext.drawImage(decalCanvas, xoffset, yoffset);
  };

  this.resize = function () {
    //decalCanvas.width = gameCanvas.width;
    //decalCanvas.height = gameCanvas.height;
    decalCanvas.width = TRACK_COLS * TRACK_W;
    decalCanvas.height = TRACK_ROWS * TRACK_H;
    if (debugdecals) console.log("decalCanvas size: "+decalCanvas.width+"x"+decalCanvas.height);
  };

  this.clear = function () {
    this.resize();
    decalContext.clearRect(0, 0, decalCanvas.width, decalCanvas.height);
  };

  // randomly fill the entire canvas
  this.scatterDecorations = function (howMany = 50, spritePic, bottomMargin, alpha) {
    if (debugdecals) console.log("Scattering decoration decals");
    if (!spritePic) return;
    if (!bottomMargin) bottomMargin = 0; //avoid null
    var x, y;
    for (var i = 0; i < howMany; i++) {
      x = randomInteger(0, decalCanvas.width);
      y = randomInteger(0, decalCanvas.height - bottomMargin);
      this.add(x, y, 0, alpha, spritePic);
    }
  }

  // randomly fill a circle - more dense near center
  this.scatterDecorationsInRadius = function (x, y, radius, howMany, spritePic, alpha) {
    if (debugdecals) console.log("Scattering decoration decals");
    for (var sx, sy, angle, rot, rad, i = 0; i < howMany; i++) {
      // choose a random location inside a circle:
      angle = Math.random() * Math.PI * 2;
      rad = Math.random() * radius;
      sx = Math.cos(angle) * rad;
      sy = Math.sin(angle) * rad;
      // orient the sprite randomly too
      rot = Math.random() * Math.PI * 2;
      this.add(x + sx, y + sy, rot, alpha, spritePic);
    }
  }
  
};

// handy function - can include min and max
function randomInteger(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var decals = new Decalmanager(); // initialized immediately




const decalpics = [
  decal_oilstain,
  decal_crack,
  decal_pebbles,
  decal_grass,
  decal_barrel,
  decal_tire,
  decal_cone,
  decal_skidmarks,
  decal_skidmarks_left,
  decal_stripes,
  decal_stripes_vertical,
  decal_coffee_cup,
  decal_coffee_takeaway,
  decal_muffin,
  decal_lights,
  decal_french_press,
];

if (DECAL_EDITOR_MODE) {
    
    console.log("DECAL_EDITOR_MODE is on: recording clicks to console.log for you to copy n paste.");

    
    var decalClickBuffer = ""; //"var decals = [";
    var decalNumber = 0;
    
    function rememberThisClick(e) {
        if (gGameState == GS_TITLE_SCREEN) {
          return;
        }
        if (trackEditorOn || waypointEditorOn) {
          // FIXME this is wrong, we need the track editor to accept decal clicks
          // (note - Cooper) maybe we can have different modes,
          // one for adding decals, one for adding tracks, one for adding waypoints?
          // that largely share same code
          return;
        }

        if (!isXYinRect(e.clientX, e.clientY, canvas.getBoundingClientRect())) {
          return;
        }

        let x = Math.round(camera.drawPosition.x) + Math.round(e.clientX);
        let y = Math.round(camera.drawPosition.y) + Math.round(e.clientY);
        decalClickBuffer += x+","+y+","; 
        
        let imagename = decalpics[decalNumber].src.split("/").pop().split(".")[0]; // remove url
        console.log('"'+imagename+'":['+decalClickBuffer.substring(0,decalClickBuffer.length-1)+"],"); // remove trailing comma

        // add it visually right now!
        let alpha = 1;
        
        let pic = decalpics[decalNumber];
        //let rot = degToRad(Math.random()*360);
        let rot = 0;
        decals.add(x,y,rot,alpha,pic);

        let decalsToSave = TRACKS[courseIndex].decals;
        if (!decalsToSave[imagename]) {
          decalsToSave[imagename] = [];
        }
        decalsToSave[imagename].push(x, y);
    }
 
    // mouse click places a decal
    document.addEventListener("click",rememberThisClick);

    // scroll wheel advances decal number
    document.addEventListener("wheel",
        function(e) {
            if (e.deltaY>0) decalNumber++; else decalNumber--;
            if (decalNumber < 0) decalNumber = decalpics.length-1;
            if (decalNumber >= decalpics.length) decalNumber = 0;
            console.log("Next DECAL number:" + decalNumber + " is " + decalpics[decalNumber].src);
        }
    );

}

// spawns multiple decals using an array of x,y coords captured above
function spawn_decals(img,xy) {
    
    if (!img) return;
    if (!img.src) return;
    if (!xy) return;
    if (xy.length<2) return;

    //console.log("spawning "+(xy.length/2)+" decals of "+img.src);
    
    for (let n=0; n<xy.length; n+=2) {
        decals.add(xy[n],xy[n+1],0,1,img);
    }
}
