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
    this.margin_y = 120;
    this.options = [
      { text: "Resume", onSelect: () => {} },
      { text: "Restart", onSelect: () => {} },
      { text: "Quit", onSelect: () => {} },
    ];

    // cursor flag
    this.cursor = 0;
    this.max_cursor_float_height = 2;
    this.cursor_y = 0;
    this.time = 0; // will used for animations
    this.current_option = this.options[this.cursor];

    // background flag
    this.background_flag_y = 64;
    this.background_flag_height = 208;

    // controls
    this.keyHeld_Down = false;
    this.keyHeld_Up = false;
    this.downKey = 0;
    this.upKey = 0;
  }

  setMenuControls(controls) {
    this.downKey = controls.downKey;
    this.upKey = controls.upKey;
  }

  setKeyHoldState(thisKey, setTo) {
    if (thisKey === this.downKey) {
      this.keyHeld_Down = setTo;
    }
    if (thisKey === this.upKey) {
      this.keyHeld_Up = setTo;
    }

    // not moving the cursor when the button is lifted
    if ((thisKey === this.downKey || thisKey === this.upKey) && !setTo) {
      this.cursor_moving = false;
    }
  }

  createTextGradient(x, y, width, height) {
    var gradient = canvasContext.createLinearGradient(x, y, width, height);
    gradient.addColorStop(0, this.text_color_1);
    gradient.addColorStop(1, this.text_color_2);
    gradient.textBaseline = "top";
    return gradient;
  }

  highlightMenuOption(option, gradient) {
    canvasContext.fillStyle = gradient;
    canvasContext.lineWidth = 8;
    canvasContext.strokeText(option.text, option.x, option.y);
  }

  update() {
    // move the cursor up or down
    if (this.keyHeld_Down && !this.cursor_moving) {
      this.cursor++;
      this.cursor_moving = true;
    }

    if (this.keyHeld_Up && !this.cursor_moving) {
      this.cursor--;
      this.cursor_moving = true;
    }

    // loop the menu cursor
    if (this.cursor > this.options.length - 1) {
      this.cursor = 0;
    }

    if (this.cursor < 0) {
      this.cursor = this.options.length - 1;
    }

    // get the current menu item where the cursor is pointed
    this.current_option = this.options[this.cursor];

    // animate cursor floating
    let cursor_float = Math.sin(this.time / 4) * this.max_cursor_float_height;
    this.cursor_y =
      this.menu_start_y +
      this.margin_y * this.cursor -
      this.option_font_size +
      cursor_float;

    // progress time value for animations
    this.time++;
  }

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
    canvasContext.drawImage(cursor_flag, canvas.width / 2 - 300, this.cursor_y);

    // pause text color
    var gradient = this.createTextGradient(
      pause_text_x,
      pause_text_y,
      pause_text_x + text_width,
      pause_text_y + 48
    );

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
      // dimensions
      let option_width = canvasContext.measureText(option.text).width;
      let option_x = canvas.width / 2 - option_width / 2;
      let option_y = this.menu_start_y + this.margin_y * i;
      let option_height = this.option_font_size;
      const option_object = {
        x: option_x,
        y: option_y,
        width: option_width,
        height: option_height,
        text: option.text,
      };

      // default fill style for menu items
      canvasContext.fillStyle = this.text_color_1;

      // highlight the currently selected menu item
      if (i === this.cursor) {
        this.highlightMenuOption(option_object, gradient);
      }

      canvasContext.fillText(option.text, option_x, option_y);
    });
  }
}
