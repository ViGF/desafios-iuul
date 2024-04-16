import { Prompt } from "prompt-sync";
import { Schedule, ScheduleProps } from "../../Schedule";
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
      console.log("Erro: nome inválido");
      date = this.prompt("Data: ");
    }

    let startHour = this.prompt("Hora inicial: ");
    while (Schedule.validateStartHour(startHour, date) == null) {
      console.log("Erro: o paciente deve ter pelo menos 13 anos");
      startHour = this.prompt("Data de nascimento: ");
    }

    let endHour = this.prompt("Hora final: ");
    while (Schedule.validateEndHour(endHour, date) == null) {
      console.log("Erro: o paciente deve ter pelo menos 13 anos");
      endHour = this.prompt("Data de nascimento: ");
    }

    return {
      cpf,
      date,
      startHour,
      endHour,
    };
  }
}

// try {
//   const cpf = Patient.validateCpf("16933203042");
//   const date = Schedule.validateDate("14/03/2024");
//   const startHour = Schedule.validateStartHour("1400", date);
//   const endHour = Schedule.validateEndHour("1430", startHour);

//   const schedule = new Schedule({ cpf, date, startHour, endHour });

//   console.log(schedule.cpf);
//   console.log(schedule.date);
//   console.log(schedule.startHour);
//   console.log(schedule.endHour);
// } catch (error: any) {
//   console.log(error.message);
// }
