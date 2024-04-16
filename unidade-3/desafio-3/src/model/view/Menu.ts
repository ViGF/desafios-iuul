import { MenuPresentation } from "./MenuPresentation";

export class Menu {
  constructor(private _title: string, private _options: string[]) {}

  selectOption(option: number, menuPresentation: MenuPresentation): Promise<void> | void {
    throw new Error("Method not implemented.");
  }

  get options() {
    return this._options;
  }

  get title() {
    return this._title;
  }
}
