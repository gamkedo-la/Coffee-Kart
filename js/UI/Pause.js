class PauseUI {
  constructor() {
    this.text_color_1 = "#FCEC5B";
    this.text_color_2 = "#F87F7F";
    this.text = "PAUSED";
    this.font = "48px PressStart2P";
    this.menu_start_y = 280;
    this.margin_y = 80;
    this.options = [
      { text: "Resume", onSelect: () => {} },
      { text: "Restart", onSelect: () => {} },
      { text: "Quit", onSelect: () => {} },
    ];
    this.cursor = 0;
    this.time = 0;
  }

  update() {}

  draw() {
    canvasContext.font = this.font;

    // dark transparent overlay on the game
    canvasContext.globalAlpha = 0.5;
    canvasContext.fillStyle = "black";
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    canvasContext.globalAlpha = 1;

    // pause text dimensions + position
    let text_width = canvasContext.measureText(this.text).width;
    let pause_text_x = canvas.width / 2 - text_width / 2;
    let pause_text_y = 85;

    // pause text color
    var gradient = canvasContext.createLinearGradient(
      pause_text_x,
      pause_text_y,
      pause_text_x + text_width,
      pause_text_y + 48
    );
    gradient.addColorStop(0, this.text_color_1);
    gradient.addColorStop(1, this.text_color_2);
    gradient.textBaseline = "top";

    canvasContext.fillStyle = gradient;
    canvasContext.shadowColor = "black";
    canvasContext.shadowBlur = 0;
    canvasContext.lineWidth = 8;
    canvasContext.strokeText(this.text, pause_text_x, pause_text_y);
    canvasContext.shadowBlur = 0;
    canvasContext.fillText(this.text, pause_text_x, pause_text_y);

    // pause menu options
    this.options.forEach((option, i) => {
      canvasContext.fillStyle = this.text_color_1;
      let width = canvasContext.measureText(option.text).width;
      canvasContext.fillText(
        option.text,
        canvas.width / 2 - width / 2,
        this.menu_start_y + this.margin_y * i
      );
    });
  }
}
