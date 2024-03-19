import { Prompt } from "prompt-sync";
import { Schedule } from "../../Schedule";

export class ScheduleListForm {
  constructor(private prompt: Prompt) {}

  execute() {
    let startDate = this.prompt("Data inicial: ");

    let endDate = this.prompt("Data final: ");
    while (Schedule.validateDate(endDate, startDate)?.error) {
      console.log(Schedule.validateDate(startDate).error);
      endDate = this.prompt("Data final: ");
    }

    return {
      startDate,
      endDate
    }
  }
}