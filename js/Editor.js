console.log("Press 'e' to enter editor mode");

// Geometry things that could be useful elsewhere
class Rect {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}

function isXYinRect(x, y, rect) {
  if (x < rect.x) return false;
  if (x > rect.x + rect.width) return false;
  if (y < rect.y) return false;
  if (y > rect.y + rect.height) return false;
  return true;
}

let canToggleEditor = true;
let controlKeyForEditor = KEY_LETTER_E;
var keyHeld_Editor = false;
let trackEditorOn = false;

let trackTileCounter = 0;

let exportButtonRect = new Rect(1100, 650, 100, 50);

let selectedTileRect = new Rect(1150, 20, 120, 130);

function updateEditor() {
  if (keyHeld_Editor && canToggleEditor && !trackEditorOn) {
    console.log('Switching to track editor');
    trackEditorOn = true;
    canToggleEditor = false;
  }
  if (keyHeld_Editor && canToggleEditor && trackEditorOn) {
    console.log('Exiting track editor');
    trackEditorOn = false;
    canToggleEditor = false;
  }
  else if (!keyHeld_Editor && !canToggleEditor) {
    canToggleEditor = true;
  }
}

function getXOnScreen(e) {
  return Math.round(e.clientX) - e.target.getBoundingClientRect().x;
}

function getYOnScreen(e) {
  return Math.round(e.clientY) - e.target.getBoundingClientRect().y;
}

function editorClick(e) {
  if (!trackEditorOn) {
    return;
  }

  const xOnScreen = getXOnScreen(e);
  const yOnScreen = getYOnScreen(e);
  if (isXYinRect(xOnScreen, yOnScreen, exportButtonRect)) {
    exportTrack();
    return;
  }
  const xOnTrack = xOnScreen + Math.round(camera.drawPosition.x);
  const yOnTrack = yOnScreen + Math.round(camera.drawPosition.y);
  const trackCol = Math.floor(xOnTrack / TRACK_W);
  const trackRow = Math.floor(yOnTrack / TRACK_H);
  const trackPos = trackCol + TRACK_COLS * trackRow;

  TRACKS[courseIndex].grid[trackPos] = trackTileCounter;
  copiedGrids[courseIndex][trackPos] = trackTileCounter;
}

document.addEventListener('click', editorClick);

let hoverTrackCol;
let hoverTrackRow;

function editorHover(e) {
  if (!trackEditorOn) {
    return;
  }

  const xOnScreen = getXOnScreen(e);
  const yOnScreen = getYOnScreen(e);
  if (isXYinRect(xOnScreen, yOnScreen, exportButtonRect)) {
    hoverTrackCol = undefined;
    hoverTrackRow = undefined;
  }
  else {
    const xOnTrack = xOnScreen + Math.round(camera.drawPosition.x);
    const yOnTrack = yOnScreen + Math.round(camera.drawPosition.y);
    hoverTrackCol = Math.floor(xOnTrack / TRACK_W);
    hoverTrackRow = Math.floor(yOnTrack / TRACK_H);
  }
}

document.addEventListener('mousemove', editorHover, false);

function selectTrackTile(e) {
  if (!trackEditorOn) {
    return;
  }

  if (e.deltaY > 0) {
    trackTileCounter++;
    if (trackTileCounter >= TRACK_TILE_MAX) {
      trackTileCounter = 0;
    }
  } else {
    trackTileCounter--;
    if (trackTileCounter < 0) {
      trackTileCounter = TRACK_TILE_MAX - 1;
    }
  }
  console.log("Next track number:" + trackTileCounter);
}

document.addEventListener("wheel", selectTrackTile);

function drawEditor() {
  if (hoverTrackCol != undefined && hoverTrackRow != undefined) {
    const hoverX = hoverTrackCol * TRACK_W - Math.round(camera.drawPosition.x);
    const hoverY = hoverTrackRow * TRACK_H - Math.round(camera.drawPosition.y);
    const hoverTileColor = 'rgba(255, 255, 0, 0.5)';
    colorRect(hoverX, hoverY, TRACK_W, TRACK_H, hoverTileColor);
  }

  colorRect(exportButtonRect.x, exportButtonRect.y, exportButtonRect.width, exportButtonRect.height, 'gray');

  canvasContext.save();
  canvasContext.font = '30px serif';
  canvasContext.fillColor = 'black';
  canvasContext.fillText('Export', exportButtonRect.x + 10, exportButtonRect.y + 30);
  canvasContext.restore();

  colorRect(selectedTileRect.x, selectedTileRect.y, selectedTileRect.width, selectedTileRect.height, 'gray');

  canvasContext.save();
  canvasContext.font = '20px serif';
  canvasContext.fillColor = 'black';
  canvasContext.fillText('Selected Tile', selectedTileRect.x + 10, selectedTileRect.y + 20);
  canvasContext.restore();

  canvasContext.drawImage(trackSheet,
    trackTileCounter * TILE_SIZE, 0,
    TILE_SIZE, TILE_SIZE,
    selectedTileRect.x + 20, selectedTileRect.y + 30,
    TRACK_W, TRACK_H);
}

function exportTrack() {
  console.log('Exporting track', courseIndex, 'see console output below');
  let printLines = [];
  printLines.push('  {');
  // TODO: include new decals
  let decalsString = '    decals: ' + JSON.stringify(TRACKS[courseIndex].decals) + ',';
  printLines.push(decalsString);
  let gridString = '    grid: [';
  for (let i = 0; i < copiedGrids[courseIndex].length; i++) {
    if (i % TRACK_COLS === 0) {
      gridString += '\n      ';
    }
    gridString += copiedGrids[courseIndex][i].toString();
    if (i < copiedGrids[courseIndex].length - 1) {
      gridString += ',';
      if (i % TRACK_COLS < TRACK_COLS - 1) {
        gridString += ' ';
      }
    }
  }
  gridString += '\n    ],';
  printLines.push(gridString);
  printLines.push('    waypoints: [');
  for (let i = 0; i < TRACKS[courseIndex].waypoints.length; i++) {
    const waypoint = TRACKS[courseIndex].waypoints[i];
    printLines.push('      { xPos: ' + waypoint.xPos + ', yPos: ' + waypoint.yPos + ', angleVal: ' + waypoint.angleVal + ', widthVal: ' + waypoint.widthVal + ', radiusVal: ' + waypoint.radiusVal + '},');
  }
  printLines.push('    ],');
  printLines.push('    powerups: [');
  for (let i = 0; i < TRACKS[courseIndex].powerups.length; i++) {
    const item = TRACKS[courseIndex].powerups[i];
    printLines.push('      { type: ' + powerupConstString(item.type) + ', xPos: ' + item.xPos + ', yPos: ' + item.yPos + ', radiusVal: ' + item.radiusVal + ', active: ' + item.active.toString() + ' },');
  }
  printLines.push('    ]');
  printLines.push('  }');
  console.log(printLines.join('\n'));
  console.log('copy and paste the above into the TRACKS array');
}
