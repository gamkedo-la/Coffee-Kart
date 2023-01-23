class TitleScreenUI extends Menu {
  constructor() {
    super();
    // general text properties
    this.text_color_1 = "#FCEC5B";
    this.text_color_2 = "#F87F7F";
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
      { text: "Options", onSelect: () => {} },
    ];
  }

  startGame() {
    onTitleScreen = false;
  }
}