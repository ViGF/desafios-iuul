import { PatientRepository } from "../../repositories/patient/PatientRepository";
import { MenuPresentation } from "./MenuPresentation";

export class Menu {
  constructor(private _title: string, private _options: string[]) {}

  selectOption(option: number, menuPresentation: MenuPresentation): void {
    throw new Error("Method not implemented.");
  }

  get options() {
    return this._options;
  }

  get title() {
    return this._title;
  }
}
