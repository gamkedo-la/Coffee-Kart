class ScoreBoard {
    constructor() {
        this.scores = {};
        for (var i = 1; i <= 4; i++) {
            this.scores[i] = 0;
        }
        
    }

    setScoreboardControls(controls) {        
        
        this.selectKey = controls.selectKey;
    }

    setKeyHoldState(thisKey, setTo) {
        
        if (thisKey === this.selectKey) {
          this.keyHeld_Select = setTo;
        }
    
        
    }

    updateScores(idToSet, rankingToSet) {
        this.scores[rankingToSet] = idToSet;
    }

    updateScoreboard() {     
        
        if (this.keyHeld_Select && this.canSelect) {
            // start the race
            resetAllCars();
            timer.reset();
            onScoreBoardScreen = false;
        }
        if (!this.keyHeld_Select && 
            !this.keyHeld_Left &&
            !this.keyHeld_Right) {
                this.canSelect = true;
        }
        

        return;
    }

    
    drawScoreboard() {
        colorRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT, "#6f4e37");
        for (var i = 1; i <= 4; i++) {
            var carId = this.scores[i];
            console.log("attempting to draw " + carId);
            drawBitmapCenteredAtLocationWithRotation(gCars[carId-1].myBitmap, SCREEN_WIDTH / 2, SCREEN_HEIGHT / 4 + i*200);
        }

    }
}