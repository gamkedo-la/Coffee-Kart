class PauseUI extends Menu {
  constructor() {
    super();
    // general text properties
    this.font = `48px PressStart2P`;

    // pause text
    this.text = "PAUSED";
    this.main_text_size = 96;

    // option text
    this.option_font_size = 48;
    this.menu_start_y = 400;
    this.margin_y = 120;
    this.options = [
      {
        text: "Resume",
        onSelect: () => {
          this.resumeGame();
        },
      },
      {
        text: "Restart",
        onSelect: () => {
          this.restartGame();
        },
      },
      {
        text: "Quit",
        onSelect: () => {
          this.quitGame();
        },
      },
    ];
  }

  resumeGame() {
    paused = false;
  }
  restartGame() {
    reset();
    paused = false;
  }
  quitGame() {
    reset();
    paused = false;
    onTitleScreen = true;
  }
}
