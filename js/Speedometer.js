class Speedometer {
    constructor() {
        this.font = '48px serif';
        //SIZE OPTIONS
        this.radius = 80;

        //Needle Options
        this.needleLength = this.radius-5;
        this.needleWidth = 5;
        this.needleColor = "red";

        //Location (Currently Bottom Left)
        this.screenEdgePadding = 30;
        this.xLocation = this.screenEdgePadding + this.needleLength;
        this.yLocation = SCREEN_HEIGHT - this.needleLength-this.screenEdgePadding;

        //adjustment ratio to make car.speed a real looking value
        this.displaySpeedAdjustment = 4;

        //Max Speed
        this.maxDisplaySpeed = 100;

        //rotation of speed 0
        this.minAngle = -140;
        //rotation of maxDisplaySpeed
        this.maxAngle = 140;

        //current speed displayed
        this.speed = 0;
    }
    setSpeed(newSpeed){
        this.speed = newSpeed;
    }
    draw(){
        //get a speed adjusted to real looking speed numbers
        var adjustedSpeed = this.speed/this.displaySpeedAdjustment;
        //calculate the percentage of maxspeed we are going on the display
        var rotationPercentage = adjustedSpeed/this.maxDisplaySpeed;
        //calculate the rotation in angles
        var rotation = ((this.maxAngle - this.minAngle)*rotationPercentage) + this.minAngle;

        canvasContext.save(); // allows us to undo translate movement and rotate spin
        canvasContext.translate(this.xLocation,this.yLocation); // sets the point where our graphic will go

        //start draw Background
        //TODO: probably replace this with an image
        canvasContext.beginPath();
        canvasContext.arc(0, 0, this.radius, 0, 2 * Math.PI);
        canvasContext.fill();

        //start draw needle
        canvasContext.rotate(rotation*Math.PI/180 - Math.PI); // sets the rotation (converting to radians)
        canvasContext.fillStyle = this.needleColor;
        canvasContext.fillRect(0,0,this.needleWidth,this.needleLength);

        //restore canvas
        canvasContext.restore();
    }
}