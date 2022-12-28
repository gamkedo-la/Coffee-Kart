const editorCameraMoveSpeed = 20;

function EditorCamera() {
  this.position = Vec2Init(SCREEN_WIDTH / 2.0, SCREEN_HEIGHT / 2.0);

  this.keyHeld_MoveLeft = false;
  this.keyHeld_MoveRight = false;
  this.keyHeld_MoveUp = false;
  this.keyHeld_MoveDown = false;

  this.setupControls = function(leftKey, rightKey, upKey, downKey) {
    this.controlKeyForMoveLeft = leftKey;
    this.controlKeyForMoveRight = rightKey;
    this.controlKeyForMoveUp = upKey;
    this.controlKeyForMoveDown = downKey;
  }

  this.setKeyHoldState = function(thisKey, setTo) {
    if (thisKey == this.controlKeyForMoveLeft) {
      this.keyHeld_MoveLeft = setTo;
    }
    if (thisKey == this.controlKeyForMoveRight) {
      this.keyHeld_MoveRight = setTo;
    }
    if (thisKey == this.controlKeyForMoveUp) {
      this.keyHeld_MoveUp = setTo;
    }
    if (thisKey == this.controlKeyForMoveDown) {
      this.keyHeld_MoveDown = setTo;
    }
  }

  this.moveEditorCamera = function() {
    if (this.keyHeld_MoveLeft) {
      Vec2Update(this.position, this.position.x - editorCameraMoveSpeed, this.position.y);
    } else if (this.keyHeld_MoveRight) {
      Vec2Update(this.position, this.position.x + editorCameraMoveSpeed, this.position.y);
    } else if (this.keyHeld_MoveUp) {
      Vec2Update(this.position, this.position.x, this.position.y - editorCameraMoveSpeed);
    } else if (this.keyHeld_MoveDown) {
      Vec2Update(this.position, this.position.x, this.position.y + editorCameraMoveSpeed);
    }
  }
}
