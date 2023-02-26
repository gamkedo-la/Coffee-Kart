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
            // start the next race
            resetAllCars();
            decals.clear();
            timer.reset();
            gGameState = GS_SELECT_LEVEL;
            this.canSelect = false;
            
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
            canvasContext.drawImage(placingSheet,
                i * 32, 0, // top-left corner of tile art, multiple of tile width
                32, 32, // get full tile size from source
                SCREEN_WIDTH / 2 - 150, SCREEN_HEIGHT / 4 + i*100 - 30, // x,y top-left corner for image destination
                TRACK_W, TRACK_H); // draw full full tile size for destination
            if (gCars[carId].isPlayer) {
                if (i == 0) {
                    drawBitmapCenteredAtLocationWithRotation(you_won_pic, SCREEN_WIDTH / 2, SCREEN_HEIGHT / 4 - 100);
                } else {
                    drawBitmapCenteredAtLocationWithRotation(better_luck_pic, SCREEN_WIDTH / 2, SCREEN_HEIGHT / 4 - 100);
                }
                drawBitmapCenteredAtLocationWithRotation(player_arrow, SCREEN_WIDTH / 2 + 150, SCREEN_HEIGHT / 4 + i*100);
            }       
            drawBitmapCenteredAtLocationWithRotation(gCars[carId].myBitmap, SCREEN_WIDTH / 2, SCREEN_HEIGHT / 4 + i*100);
            drawBitmapCenteredAtLocationWithRotation(press_enter_continue_pic, SCREEN_WIDTH / 2, 3*SCREEN_HEIGHT/4 + 40 );
        }

    }
}