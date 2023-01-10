class Speedometer {
    constructor() {
        this.font = '48px serif';
        //SIZE OPTIONS
        this.radius = 80;

        //Needle Options
        this.needleLength = this.radius-9;
        this.needleWidth = 5;
        this.needleColor = "red";

        //speed ticks options
        this.numberSmallTicks = 50;
        this.smallTickLength = 20;
        this.numberBigTicks = 11;
        this.bigTickLength = 30;

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
    setGear(newGear){
        this.gear = newGear;
    }
    setRPM(newRPM){
        this.rpm = newRPM;
    }
    draw(){
        //get a speed adjusted to real looking speed numbers
        var adjustedSpeed = this.speed/this.displaySpeedAdjustment;
        //calculate the percentage of maxspeed we are going on the display
        var rotationPercentage = adjustedSpeed/this.maxDisplaySpeed;
        //calculate the rotation in angles
        var rotation = ((this.maxAngle - this.minAngle)*rotationPercentage) + this.minAngle;

        var rpmRotationPercentage = this.rpm / 3000;
        //var rpm_rotation = ((this.maxAngle-this.minAngle)*rpmRotationPercentage)+this.minAngle;
        var rpm_rotation = rpmRotationPercentage * 360 - 180; // the entire circle

        canvasContext.save(); // allows us to undo translate movement and rotate spin
        canvasContext.translate(this.xLocation,this.yLocation); // sets the point where our graphic will go

        //start draw Grey Background
        canvasContext.beginPath();
        canvasContext.arc(0, 0, this.radius, 0, 2 * Math.PI);
        canvasContext.fillStyle = "grey";
        canvasContext.fill();

        //draw white inner
        canvasContext.beginPath();
        canvasContext.arc(0, 0, this.radius-10, 0, 2 * Math.PI);
        canvasContext.fillStyle = "white";
        canvasContext.fill();

        //draw the speed ticks
        let rotationAmount = ((this.maxAngle - this.minAngle)/this.numberSmallTicks) * Math.PI/180;
        this.drawSpeedTicks(this.numberSmallTicks,this.smallTickLength,rotationAmount);
        this.drawSpeedTicks(this.numberBigTicks,this.bigTickLength,rotationAmount*5);

        // rpm dial
        canvasContext.beginPath();
        canvasContext.arc(20, 20, 20, 0, 2 * Math.PI);
        canvasContext.fillStyle = "rgba(220,220,220,1)";
        canvasContext.fill();
        // rpm mini needle
        canvasContext.save();
        canvasContext.translate(20,20);
        canvasContext.rotate(rpm_rotation*Math.PI/180 - Math.PI); // sets the rotation (converting to radians)
        canvasContext.fillStyle = "grey";
        canvasContext.fillRect(0,0,this.needleWidth/4,this.needleLength/4);
        canvasContext.restore();
        // numeric gear display
        canvasContext.fillStyle = "grey";
        canvasContext.font = "11px Courier Bold";
        canvasContext.fillText(this.gear,18,32);

        //start draw needle
        canvasContext.save();
        canvasContext.rotate(rotation*Math.PI/180 - Math.PI); // sets the rotation (converting to radians)
        canvasContext.fillStyle = this.needleColor;
        canvasContext.fillRect(0,0,this.needleWidth,this.needleLength);
        canvasContext.restore();

        //restore canvas
        canvasContext.restore();
    }
    drawSpeedTicks(numberOfTicks,tickLength,rotationPerTick){
        //draw small speed ticks lines
        canvasContext.save();
        canvasContext.rotate(this.minAngle * Math.PI/180 - Math.PI);
        for (let i = 0; i < numberOfTicks; i++){
            canvasContext.fillStyle = "black";
            canvasContext.fillRect(0, 0, 2, this.needleLength);
            canvasContext.rotate(rotationPerTick);
        }
        canvasContext.restore();
        // draw white inner
        canvasContext.beginPath();
        canvasContext.arc(0, 0, this.radius-tickLength, 0, 2 * Math.PI);
        canvasContext.fillStyle = "white";
        canvasContext.fill();
    }
}