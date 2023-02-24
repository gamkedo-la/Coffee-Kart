class ScoreBoard {
    constructor() {
        this.scores = {};
        for (var i = 1; i <= 4; i++) {
            this.scores[i] = 0;
        }
        
    }

    setLevelSelectControls(controls) {        
        
        this.selectKey = controls.selectKey;
    }

    setKeyHoldState(thisKey, setTo) {
        
        if (thisKey === this.selectKey) {
          this.keyHeld_Select = setTo;
        }
    
        
    }

    updateLevelSelect() {     
        
        if (this.keyHeld_Select && this.canSelect) {
            // start the race
            resetAllCars();
            timer.reset();
            onLevelSelectScreen = false;
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