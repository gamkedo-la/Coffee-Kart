class ControlsScreenUI extends Menu {
  constructor() {
    super();
    // main text
    this.text = "CONTROLS";
    this.font = `32px PressStart2P`;
    this.menu_start_y = 400;
    this.margin_y = 60;
    this.cursor_x = -500;
    this.options = [
      {
        text: "Accelerate: Up Key",
        onSelect: () => {},
      },
      { text: "Brake: Down Key", onSelect: () => {} },
      { text: "Steer: Left and Right keys", onSelect: () => {} },
      { text: "Drift: Spacebar", onSelect: () => {} },
      {
        text: "Back to Start Menu",
        onSelect: () => {
          gGameState = GS_TITLE_SCREEN;
        },
      },
    ];
  }
}
