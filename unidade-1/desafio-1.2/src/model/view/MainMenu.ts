import { Prompt } from "prompt-sync";
import { Menu } from "./Menu";
import { MenuPresentation } from "./MenuPresentation";
import { RegisterMenu } from "./RegisterMenu";
import { ScheduleMenu } from "./ScheduleMenu";

export class MainMenu extends Menu {
  constructor() {
    super("Menu Principal", ["Cadastro de pacientes", "Agenda", "Fim"]);
  }

  selectOption(option: number, menuPresentation: MenuPresentation) {
    switch (option) {
      case 1:
        const registerMenu = new RegisterMenu();
        menuPresentation.setMenu(registerMenu);
        break;
      case 2:
        const scheduleMenu = new ScheduleMenu();
        menuPresentation.setMenu(scheduleMenu);
        break;
      default:
        menuPresentation.setMenu(null);
        break;
    }
  }
}
