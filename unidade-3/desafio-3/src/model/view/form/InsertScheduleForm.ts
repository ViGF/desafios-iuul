import { Prompt } from "prompt-sync";
import { Schedule } from "../../Schedule";
import { Patient } from "../../Patient";

export class InsertScheduleForm {
  constructor(private prompt: Prompt) {}

  execute() {
    let cpf = this.prompt("CPF: ");
    while (Patient.validateCpf(cpf) == null) {
      console.log("Erro: CPF inválido!");
      cpf = this.prompt("CPF: ");
    }

    let date = this.prompt("Data: ");
    while (Schedule.validateDate(date) == null) {
      console.log("Erro: data inválida");
      date = this.prompt("Data: ");
    }

    let startHour = this.prompt("Hora inicial (Ex.: 08:45): ");
    while (Schedule.validateStartHour(startHour, date) == null) {
      console.log(Schedule.validateStartHour(startHour, date).error);
      startHour = this.prompt("Hora inicial (Ex.: 08:45): ");
    }

    let endHour = this.prompt("Hora final (Ex.: 08:45): ");
    while (Schedule.validateEndHour(endHour, date) == null) {
      console.log(Schedule.validateStartHour(startHour, date).error);
      endHour = this.prompt("Hora final (Ex.: 08:45): ");
    }

    return {
      cpf,
      date,
      startHour,
      endHour,
    };
  }
}
