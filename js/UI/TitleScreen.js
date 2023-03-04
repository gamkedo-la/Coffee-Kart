class TitleScreenUI extends Menu {
  constructor() {
    super();
    // general text properties

    this.font = `48px PressStart2P`;

    // main text
    this.text = "COFFEE KART";
    this.main_text_size = 96;

    // option text
    this.option_font_size = 48;
    this.menu_start_y = 400;
    this.margin_y = 120;
    this.options = [
      {
        text: "Start",
        onSelect: () => {
          this.startGame();
        },
      },
      {
        text: "Controls",
        onSelect: () => {
          this.showControls();
        },
      },
    ];
  }

  startGame() {
    gGameState = GS_SELECT_LEVEL;
  }

  showControls() {
    gGameState = GS_SHOW_INSTRUCTIONS;
  }
}
