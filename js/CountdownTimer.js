class CountdownTimer{
    constructor(){
        this.remainingTime = 60;
        this.paused = true;
        this.timerColor = 'red';
        this.font = '48px serif';
        this.xLocation = 60;
        this.yLocation = 60;
    }
    update(){
        if(!this.paused) {
            this.remainingTime -= framesPerSecond/1000;
        }
    }
    draw(){
        canvasContext.font =this.font;
        canvasContext.fillText(Math.round(this.remainingTime),this.xLocation,this.yLocation);
    }
    addTime(timeToAdd){
        this.remainingTime += timeToAdd;
    }
    setTime(timeToSet){
        this.remainingTime = timeToSet;
    }
    pause(){
        this.paused = true;
    }
    resume(){
        this.paused = false;
    }
}