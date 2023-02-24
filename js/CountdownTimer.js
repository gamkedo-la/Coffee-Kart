const TIME_DEFAULT = 360;

class CountdownTimer{
    constructor(){
        this.remainingTime = TIME_DEFAULT;
        this.timeElapsed = 0;
        this.paused = true;
        this.timerColor = 'white';
        this.countdownColor = 'red';
        this.shadowColor = 'black';
        this.font = 'bold 32px arial';
        this.xLocation = 60;
        this.yLocation = 45;
        this.lastCountDown = ""; // used to avoid playing sounds every frme
    }
    reset() {
        this.timeElapsed = 0;
        this.remainingTime = TIME_DEFAULT;
    }

    update(){
        if(!this.paused && this.remainingTime && !trackEditorOn > 0) {
            this.remainingTime -= framesPerSecond/1000;
            this.timeElapsed += framesPerSecond/1000;
        }
    }
    formatTimeString(secs){
        var duration = secs * 100000;
        var microsecs = Math.floor((duration % 1000) / 100),
            ms = Math.floor((duration / 1000) % 60),
            secs = Math.floor((duration / (1000 * 60)) % 60),
            mins = Math.floor((duration / (1000 * 60 * 60)) % 24);
        mins = (mins < 10) ? "0" + mins : mins;
        secs = (secs < 10) ? "0" + secs : secs;
        ms = (ms < 10) ? "0" + ms : ms;
        return mins + ":" + secs + ":" + ms; // +"."+microsecs;
    }
    draw(){
        var timestr = this.formatTimeString(this.remainingTime);
        canvasContext.drawImage(timerBGPic,0,0);
        canvasContext.font = this.font;
        canvasContext.fillStyle = this.shadowColor
        canvasContext.fillText(timestr,this.xLocation+1,this.yLocation+1);
        canvasContext.fillStyle = this.timerColor;
        canvasContext.fillText(timestr,this.xLocation,this.yLocation);
        canvasContext.fillStyle = 'white'; // reset just in case
    }

    drawCountdown(){
        if (paused) return;
        if (this.paused) return; // FIXME: this function is called during track selection screen
        var timeToDisplay = Math.round(3.5 - this.timeElapsed);
        var actualTime = 3 - this.timeElapsed;
        
        var timestr = (timeToDisplay).toFixed(0);
        
        // play a sound only when the number changes
        if (timestr != this.lastCountDown) { 
            console.log("Countdown: "+timestr);
            this.lastCountDown = timestr;
            if (actualTime <= 0.3) {
                countdown_start.currentTime = 0;    
                countdown_start.play();
            } else {
                countdown_beep.currentTime = 0;    
                countdown_beep.play();
            }
        }
        
        canvasContext.drawImage(timerBGPic,0,0);
        canvasContext.font = this.font;
        canvasContext.fillStyle = this.shadowColor
        canvasContext.fillText(timestr,(SCREEN_WIDTH / 2)+1,(SCREEN_HEIGHT / 2)+1);
        canvasContext.fillStyle = this.countdownColor;
        canvasContext.fillText(timestr,(SCREEN_WIDTH / 2),(SCREEN_HEIGHT / 2));
        canvasContext.fillStyle = 'white'; // reset just in case
    }
    addTime(timeToAdd){
        this.remainingTime += timeToAdd;
    }
    setTime(timeToSet){
        this.remainingTime = timeToSet;
    }
    getTime() {
        return this.remainingTime;
    }
    pause(){
        this.paused = true;
    }
    resume(){
        this.paused = false;
    }
}