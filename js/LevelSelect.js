

class LevelSelect {
    constructor() {
        this.keyHeld_Left = false;
        this.keyHeld_Right = false;
        this.keyHeld_Select = false;
        this.canSelect = false;
        this.leftKey = 0;
        this.rightKey = 0;
        this.selectKey = 0;
        
    }

    setLevelSelectControls(controls) {        
        this.leftKey = controls.leftKey;
        this.rightKey = controls.rightKey;
        this.selectKey = controls.selectKey;
    }

    setKeyHoldState(thisKey, setTo) {
        //console.log("hit setkeyhold");
        if (thisKey === this.leftKey) {
          this.keyHeld_Left = setTo;
        }
        if (thisKey === this.rightKey) {
            console.log("setting right key");
          this.keyHeld_Right = setTo;
        }
        if (thisKey === this.selectKey) {
          this.keyHeld_Select = setTo;
        }
    
        
    }

    updateLevelSelect() {     
        if (this.keyHeld_Left && this.canSelect) {
            this.canSelect = false;
            if (courseIndex > 0) {
                courseIndex--;
            } else {
                courseIndex = TRACKS.length-1;
            }
            
        }
        if (this.keyHeld_Right && this.canSelect) {
            console.log("pressed right");
            courseIndex = (courseIndex + 1) % TRACKS.length;
            this.canSelect = false;
        }
        if (this.keyHeld_Select && this.canSelect) {
            // start the race
            resetAllCars();
            timer.reset();
            gGameState = GS_RACING;
        }
        if (!this.keyHeld_Select && 
            !this.keyHeld_Left &&
            !this.keyHeld_Right) {
                this.canSelect = true;
        }
        

        return;
    }

    
    drawLevelSelect() {
        colorRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT, "#6f4e37");
        if (courseIndex == SNOW_LEVEL) {
            drawBitmapCenteredAtLocationWithRotation(snow_level_pic, SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, 0);
        } else if (courseIndex == CAFE_LEVEL) {
            drawBitmapCenteredAtLocationWithRotation(cafe_level_pic, SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, 0);
        } else if (courseIndex ==  JUNGLE_LEVEL) {
            drawBitmapCenteredAtLocationWithRotation(jungle_level_pic, SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, 0);
        }
    }
}