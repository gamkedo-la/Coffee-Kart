console.log("Press 'e' to enter editor mode");

let canToggleEditor = true;
let controlKeyForEditor = KEY_LETTER_E;
var keyHeld_Editor = false;
let trackEditorOn = false;

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
  const x = Math.round(camera.drawPosition.x) + Math.round(e.clientX);
  const y = Math.round(camera.drawPosition.y) + Math.round(e.clientY);
  const trackCol = Math.floor(x / TRACK_W);
  const trackRow = Math.floor(y / TRACK_H);
  const trackPos = trackCol + TRACK_COLS * trackRow;

  // TODO: enable user to select tile type
  TRACKS[courseIndex].grid[trackPos] = TRACK_ROAD;
}

document.addEventListener('click', editorClick);
