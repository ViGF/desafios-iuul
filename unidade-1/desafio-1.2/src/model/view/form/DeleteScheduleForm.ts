import { Prompt } from "prompt-sync";
import { Schedule, ScheduleProps } from "../../Schedule";
import { VerifyPatientExists } from "../../../useCases/patient/verify-patient-exists";

type DeleteScheduleRequest = Omit<ScheduleProps, "endHour">;

export class DeleteScheduleForm {
  constructor(private prompt: Prompt) {}

  execute(verifyPatientExists: VerifyPatientExists): DeleteScheduleRequest | void {
    const cpf = this.prompt("CPF: ");

    if (verifyPatientExists.execute(cpf) == undefined) {
      console.log("Erro: paciente não cadastrado");
      return;
    }

    let date = this.prompt("Data da consulta: ");
    while (Schedule.validateDate(date)?.error) {
      console.log(Schedule.validateDate(date).error);
      date = this.prompt("Data da consulta: ");
    }

    let startHour = this.prompt("Hora inicial: ");
    while (Schedule.validateStartHour(startHour, date)?.error) {
      console.log(Schedule.validateStartHour(startHour, date).error);
      startHour = this.prompt("Hora inicial: ");
    }

    return {
      cpf,
      date: Schedule.getDateObjet(date),
      startHour
    }
  }
}
