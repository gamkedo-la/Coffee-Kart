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

let exportButtonRect = new Rect(1100, 650, 100, 50);

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

function editorClick(e) {
  if (!trackEditorOn) {
    return;
  }

  if (isXYinRect(e.clientX, e.clientY, exportButtonRect)) {
    exportTrack();
    return;
  }
  const x = Math.round(camera.drawPosition.x) + Math.round(e.clientX);
  const y = Math.round(camera.drawPosition.y) + Math.round(e.clientY);
  const trackCol = Math.floor(x / TRACK_W);
  const trackRow = Math.floor(y / TRACK_H);
  const trackPos = trackCol + TRACK_COLS * trackRow;

  // TODO: enable user to select tile type
  TRACKS[courseIndex].grid[trackPos] = TRACK_ROAD;
}

document.addEventListener('click', editorClick);

function drawEditor() {

  colorRect(exportButtonRect.x, exportButtonRect.y, exportButtonRect.width, exportButtonRect.height, 'gray');

  canvasContext.save();
  canvasContext.font = '30px serif';
  canvasContext.fillColor = 'black';
  canvasContext.fillText('Export', exportButtonRect.x + 10, exportButtonRect.y + 30);
  canvasContext.restore();
}

function exportTrack() {
  // TODO: find some way to print the spawn point as well, otherwise we're going to have to remember where it is and re-insert it every time we do an export
  // TODO: find a better way to print this too
  console.log('Exporting track', courseIndex, 'see console output below');
  const exportString = JSON.stringify(TRACKS[courseIndex]);
  console.log(exportString);
  console.log('copy and paste the above into the track class');
}
