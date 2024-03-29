// Shared state between all of the menus
let isSelecting = false;

class Menu {
  constructor() {
    // general text properties
    this.text_color_1 = "#D19E79";
    this.text_color_2 = "#78462C";
    this.font = `48px PressStart2P`;

    // main text
    this.text = "";
    this.main_text_size = 96;

    // option text
    this.option_font_size = 48;
    this.menu_start_y = 400;
    this.margin_y = 120;
    this.options = [{ text: "Sample", onSelect: () => {} }];

    // cursor flag
    this.cursor = 0;
    this.cursor_float = 0;
    this.max_cursor_float_height = 2;
    this.cursor_y = 0;
    this.cursor_x = -300;
    this.time = 0; // will used for animations
    this.current_option = this.options[this.cursor];
    this.shadow_color = "#00000088";

    // line width
    this.currentOptionLineWidth = 0;
    this.maxLineWidth = 8;

    // background flag
    this.background_flag = {
      x: 0,
      y: 64,
      height: 208,
      width: SCREEN_WIDTH,
      speed: 8,
    };
    this.background_flags = [
      { ...this.background_flag },
      { ...this.background_flag, x: SCREEN_WIDTH },
    ];

    // text outline
    this.outline_color = "#20130E";

    // controls
    this.keyHeld_Down = false;
    this.keyHeld_Up = false;
    this.keyHeld_Select = false;
    this.downKey = 0;
    this.upKey = 0;
  }

  setMenuControls(controls) {
    this.downKey = controls.downKey;
    this.upKey = controls.upKey;
    this.selectKey = controls.selectKey;
  }

  setKeyHoldState(thisKey, setTo) {
    if (thisKey === this.downKey) {
      this.keyHeld_Down = setTo;
    }
    if (thisKey === this.upKey) {
      this.keyHeld_Up = setTo;
    }
    if (thisKey === this.selectKey) {
      this.keyHeld_Select = setTo;
    }

    // not moving the cursor when the button is lifted
    if ((thisKey === this.downKey || thisKey === this.upKey) && !setTo) {
      this.cursor_moving = false;
    }
    if (thisKey === this.selectKey && !setTo) {
      isSelecting = false;
    }
  }

  createTextGradient(x1, y1, x2, y2) {
    var gradient = canvasContext.createLinearGradient(x1, y1, x2, y2);
    gradient.addColorStop(0, this.text_color_1);
    gradient.addColorStop(1, this.text_color_2);
    canvasContext.textBaseline = "middle";
    return gradient;
  }

  highlightMenuOption(option) {
    // option text shadow
    canvasContext.fillStyle = this.shadow_color;
    canvasContext.fillText(
      option.text,
      option.x + this.currentOptionLineWidth + 1,
      option.y + this.currentOptionLineWidth + 1
    );

    canvasContext.fillStyle = this.createTextGradient(option.x, option.y - 8, option.x, option.y + 8);
    this.currentOptionLineWidth = lerp(
      this.currentOptionLineWidth,
      this.maxLineWidth,
      0.2
    );
    canvasContext.lineWidth = this.currentOptionLineWidth;
    canvasContext.lineColor = this.outline_color;
    canvasContext.strokeText(
      option.text,
      option.x - this.currentOptionLineWidth,
      option.y - this.currentOptionLineWidth
    );
  }

  update() {
    // move background flag
    this.background_flags.forEach((flag) => {
      flag.x -= flag.speed;
      if (flag.x + flag.width <= 0) flag.x = SCREEN_WIDTH;
    });

    // move the cursor up or down
    if (this.keyHeld_Down && !this.cursor_moving) {      
      this.cursor++;
      this.cursor_moving = true;
      this.currentOptionLineWidth = 0;
      beans_pour_sound.play();
    }

    if (this.keyHeld_Up && !this.cursor_moving) {
      this.cursor--;
      this.cursor_moving = true;
      this.currentOptionLineWidth = 0;
      beans_pour_sound.play();
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
    this.cursor_float = Math.sin(this.time / 4) * this.max_cursor_float_height;
    this.cursor_y =
      this.menu_start_y +
      this.margin_y * this.cursor -
      this.option_font_size +
      this.cursor_float;

    // progress time value for animations
    this.time++;
    if (this.time > 500) {
      this.time = 0;
    }

    //   select the current menu item if the selecy key was pressed
    if (this.keyHeld_Select && !isSelecting) {
      isSelecting = true;
      this.current_option.onSelect();
      aero_eject_sound.play();
    }
  }

  draw() {
    canvasContext.font = `${this.main_text_size}px PressStart2P`;

    // dark transparent overlay on the game
    canvasContext.globalAlpha = 0.9;
    canvasContext.fillStyle = "#20130E";
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    canvasContext.globalAlpha = 1;

    // background flag image
    this.background_flags.forEach((flag) => {
      canvasContext.drawImage(background_flag, flag.x, flag.y);
    });

    // main text dimensions + position
    let text_width = canvasContext.measureText(this.text).width;
    let main_text_x = canvas.width / 2 - text_width / 2;

    // vertically center the main text within the background flag
    let main_text_y =
      this.background_flag.y +
      this.background_flag.height / 2;

    // cursor flag shadow
    canvasContext.fillStyle = this.shadow_color;
    canvasContext.fillRect(
      canvas.width / 2 + this.cursor_x + 8,
      this.cursor_y + 8 - this.cursor_float,
      cursor_flag.width - this.cursor_float,
      cursor_flag.height - this.cursor_float
    );

    // cursor flag
    canvasContext.drawImage(
      cursor_flag,
      canvas.width / 2 + this.cursor_x,
      this.cursor_y
    );

    // main text color
    var gradient = this.createTextGradient(
      main_text_x,
      main_text_y,
      main_text_x,
      main_text_y + 24
    );

    // main text shadow
    canvasContext.fillStyle = this.shadow_color;
    canvasContext.fillText(this.text, main_text_x + 16, main_text_y + 15);

    // text outline
    canvasContext.fillStyle = gradient;
    canvasContext.strokeStyle = "#20130E";
    canvasContext.shadowColor = "black";
    canvasContext.shadowBlur = 0;
    canvasContext.lineWidth = 8;
    canvasContext.strokeText(this.text, main_text_x, main_text_y);
    canvasContext.shadowBlur = 0;
    canvasContext.fillText(this.text, main_text_x, main_text_y);

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
      canvasContext.strokeStyle = "#241D2D";

      // highlight the currently selected menu item
      let text_float = 0;
      if (i === this.cursor) {
        this.highlightMenuOption(option_object, gradient);
        text_float = this.currentOptionLineWidth;
      }

      canvasContext.fillText(
        option.text,
        option_x - text_float,
        option_y - text_float
      );
    });
  }
}
