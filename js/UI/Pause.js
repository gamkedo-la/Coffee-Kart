class PauseUI {
  constructor() {
    this.text = "PAUSED";
    this.font = "48px PressStart2P";
  }

  update() {}

  draw() {
    canvasContext.font = this.font;

    canvasContext.globalAlpha = 0.5;
    canvasContext.fillStyle = "black";
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    canvasContext.globalAlpha = 1;

    canvasContext.fillStyle = "white";
    let text_width = canvasContext.measureText(this.text).width;
    canvasContext.fillText(
      this.text,
      canvas.width / 2 - text_width / 2,
      canvas.height / 2
    );
  }
}
