import { Prompt } from "prompt-sync";
import { Menu } from "./Menu";
import { PatientRepository } from "../../repositories/patient/PatientRepository";
import { ScheduleRepository } from "../../repositories/schedule/ScheduleRepository";
import { Patient } from "../Patient";

export class MenuPresentation {
  private menuDisplayed: Menu | null;
  private _prompt: Prompt;
  private _patientRepository: PatientRepository;
  private _scheduleRepository: ScheduleRepository;

  constructor(
    menu: Menu,
    prompt: Prompt,
    patientRepository: PatientRepository,
    scheduleRepository: ScheduleRepository
  ) {
    this.menuDisplayed = menu;
    this._prompt = prompt;
    this._patientRepository = patientRepository;
    this._scheduleRepository = scheduleRepository
  }

  setMenu(menu: Menu | null) {
    this.menuDisplayed = menu;
  }

  get menu() {
    return this.menuDisplayed;
  }

  get patientRepository() {
    return this._patientRepository;
  }

  get scheduleRepository() {
    return this._scheduleRepository
  }

  get prompt() {
    return this._prompt;
  }

  init() {
    while (this.menu) {
      console.log(this.menu.title);
      for (let index = 0; index < this.menu.options.length; index++) {
        const menuOption = this.menu.options[index];
        console.log(`${index + 1} - ${menuOption}`);
      }
      let userOption = +this.prompt("Opção: ");

      this.menu.selectOption(userOption, this);
    }
  }
}
