class PauseUI {
  constructor() {
    // general text properties
    this.text_color_1 = "#FCEC5B";
    this.text_color_2 = "#F87F7F";
    this.font = `48px PressStart2P`;

    // pause text
    this.text = "PAUSED";
    this.pause_text_size = 96;

    // option text
    this.option_font_size = 48;
    this.menu_start_y = 400;
    this.margin_y = 80;
    this.options = [
      { text: "Resume", onSelect: () => {} },
      { text: "Restart", onSelect: () => {} },
      { text: "Quit", onSelect: () => {} },
    ];

    // cursor flag
    this.cursor = 0;
    this.time = 0; // will used for animations

    // background flag
    this.background_flag_y = 64;
    this.background_flag_height = 208;
  }

  update() {}

  draw() {
    canvasContext.font = `${this.pause_text_size}px PressStart2P`;

    // dark transparent overlay on the game
    canvasContext.globalAlpha = 0.5;
    canvasContext.fillStyle = "black";
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    canvasContext.globalAlpha = 1;

    // background flag image
    canvasContext.drawImage(background_flag, 0, 64);

    // pause text dimensions + position
    let text_width = canvasContext.measureText(this.text).width;
    let pause_text_x = canvas.width / 2 - text_width / 2;

    // vertically center the pause text within the background flag
    let pause_text_y =
      this.background_flag_y +
      this.background_flag_height / 2 +
      this.pause_text_size / 2;

    // cursor flag -- render test
    canvasContext.drawImage(
      cursor_flag,
      canvas.width / 2 - 300,
      this.menu_start_y
    );

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

    // pause text shadow
    canvasContext.fillStyle = "#00000088";
    canvasContext.fillText(this.text, pause_text_x + 16, pause_text_y + 15);

    canvasContext.fillStyle = gradient;
    canvasContext.shadowColor = "black";
    canvasContext.shadowBlur = 0;
    canvasContext.lineWidth = 8;
    canvasContext.strokeText(this.text, pause_text_x, pause_text_y);
    canvasContext.shadowBlur = 0;
    canvasContext.fillText(this.text, pause_text_x, pause_text_y);

    // pause menu options
    canvasContext.font = this.font;
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
