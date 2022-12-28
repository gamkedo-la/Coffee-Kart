function CameraClass() {    

    this.InitCamera = function(xval, yval, widthVal, heightVal, maxBoundVal, minBoundVal, speedVal) {
        this.position = Vec2Init(xval, yval);
        this.width = widthVal;
        this.height = heightVal;
        this.widthOffset = this.width/2.0;
        this.heightOffset = this.height/2.0;
        this.drawPosition = Vec2Init(this.position.x - this.widthOffset, this.position.y - this.heightOffset);
        this.maxBound = maxBoundVal;
        this.minBound = minBoundVal;
        this.speed = speedVal;
    }

    this.UpdateCamera = function(target) {
        const fixedDt = 300/1000.0;
        if (Vec2Distance(target, this.position) > 0) {
            var directionToTarget = Vec2Sub(target, this.position);
            this.position = Vec2Add(this.position, Vec2Scale(directionToTarget, fixedDt * this.speed));
            if (this.position.x < this.minBound.x) {
                this.position.x = this.minBound.x;
            }
            if (this.position.x > this.maxBound.x) {
                this.position.x = this.maxBound.x;
            }
            if (this.position.y < this.minBound.y) {
                this.position.y = this.minBound.y;
            }
            if (this.position.y > this.maxBound.y) {
                this.position.y = this.maxBound.y;
            }
        }
        this.drawPosition.x = this.position.x - this.widthOffset;
        this.drawPosition.y = this.position.y - this.heightOffset;
    }

    this.UpdateEditorCamera = function(target) {
        const fixedDt = 300/1000.0;
        if (Vec2Distance(target, this.position) > 0) {
            var directionToTarget = Vec2Sub(target, this.position);
            this.position = Vec2Add(this.position, Vec2Scale(directionToTarget, fixedDt * this.speed));
            // Maybe we bring bounds back, but with different values
            // if (this.position.x < this.minBound.x) {
            //     this.position.x = this.minBound.x;
            // }
            // if (this.position.x > this.maxBound.x) {
            //     this.position.x = this.maxBound.x;
            // }
            // if (this.position.y < this.minBound.y) {
            //     this.position.y = this.minBound.y;
            // }
            // if (this.position.y > this.maxBound.y) {
            //     this.position.y = this.maxBound.y;
            // }
        }
        this.drawPosition.x = this.position.x - this.widthOffset;
        this.drawPosition.y = this.position.y - this.heightOffset;
    }

}
