const carsToUpdate = 4;

class ScoreBoard {
    constructor() {
        this.scores = [];
        for (var i = 0; i < carsToUpdate; i++) {
            this.scores.push(0);
        }
        this.canSelect = false;
        
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
        this.scores[rankingToSet-1] = idToSet;
    }

    updateScoreboard() {     
        
        if (this.keyHeld_Select && this.canSelect) {
            // start the race
            resetAllCars();
            timer.reset();
            
        }
        if (!this.keyHeld_Select) {
            this.canSelect = true;
        }
        

        return;
    }

    
    drawScoreboard() {
        colorRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT, "#6f4e37");
        for (var i = 0; i < carsToUpdate; i++) {
            var carId = this.scores[i];
            console.log("attempting to draw " + carId);
            drawBitmapCenteredAtLocationWithRotation(gCars[carId].myBitmap, SCREEN_WIDTH / 2, SCREEN_HEIGHT / 4 + i*100);
        }

    }
}