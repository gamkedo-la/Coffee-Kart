// keeping this very simple -
function drawCredits() {
  colorRect(0,0,canvas.width,canvas.height,"black");
  canvasContext.fillStyle = 'white';
  canvasContext.font = '20px Helvetica';
  for(var i=0;i<creditsList.length;i++) {
    canvasContext.fillText(creditsList[i], 315,80+20*i);
  }
}

var creditsList = [
"Cooper Willis: Project lead, core gameplay, track design, car physics, handbrake support and gear shifting, AI waypoints system, level select, snow tiles, french press sprite, powerup code, ranking, assorted coffee sounds and base art",
"Michael Monty: Menus color scheme, controls menu, font loading, text drop shadow and gradient, flag background animations, menu highlights, pause screen",
"Rodrigo Bonzerr Lopez: Music (snow level, drum rock),portraits (office worker, farmer, hipster, grandmother, metal head, clown), sprites (coffee cups, french press, croissant with variant, 2 open top cars) and coffee sip sound",
"Christer \"McFunkypants\" Kaitila: Decal support and various related art (street lights, debris, rocks, grass, barrel, cone, stripes, crack), engine sound, AI steering fix, skid effect, gear and RPM UI, headlights, particle system (with exhaust), rain effect, start countdown, crash sound",
"Dan Dela Rosa: Track editor functionality (including track export), motorcycle sprite, assorted bug fixes (menu flow bug, synching countdown beep, decal placement issue), dialog box art",
"Jared Rigby: Mud particle, muffin sprite, gear shift sound",
"H Trayford: Car variations (green, red, sports), track switching, tire marks made conditional",
"Sergio Ferrer: Water tile, wood tile, coffee bean sprite",
"Patrick Moffett: Speedometer, countdown timer",
" ",
"Game created by HomeTeamGameDev.com Lighthouse group members",
" ",
"                    - Press any key to return to the main menu -",
];

function lineWrapCredits() { // note: gets calling immediately after definition!
  const newCut = [];
  var maxLineChar = 72;
  var findEnd;

  for(let i = 0; i < creditsList.length; i++) {
    const currentLine = creditsList[i];
    for(let j = 0; j < currentLine.length; j++) {
      /*const aChar = currentLine[j];
      if(aChar === ":") {
        if(i !== 0) {
          newCut.push("\n");
        }
        newCut.push(currentLine.substring(0, j + 1));
        newCut.push(currentLine.substring(j + 2, currentLine.length));
        break;
      } else*/ if(j === currentLine.length - 1) {
        if((i === 0) || (i >= creditsList.length - 2)) {
          newCut.push(currentLine);
        } else {
          newCut.push(currentLine.substring(0, currentLine.length));
        }
      }
    }
  }

  const newerCut = [];
  for(var i=0;i<newCut.length;i++) {
    while(newCut[i].length > 0) {
      findEnd = maxLineChar;
      if(newCut[i].length > maxLineChar) {
        for(var ii=findEnd;ii>0;ii--) {
          if(newCut[i].charAt(ii) == " ") {
            findEnd=ii;
            break;
          }
        }
      }
      newerCut.push(newCut[i].substring(0, findEnd));
      newCut[i] = newCut[i].substring(findEnd, newCut[i].length);
    }
  }

  creditsList = newerCut;
}
lineWrapCredits(); // note: calling immediately as part of init, outside the function