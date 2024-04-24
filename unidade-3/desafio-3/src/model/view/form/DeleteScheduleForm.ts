import { Prompt } from "prompt-sync";
import { Schedule, ScheduleProps } from "../../Schedule";
import { VerifyPatientExists } from "../../../useCases/patient/verify-patient-exists";

type DeleteScheduleRequest = Omit<ScheduleProps, "endHour">;

export class DeleteScheduleForm {
  constructor(private prompt: Prompt) {}

  async execute(verifyPatientExists: VerifyPatientExists): Promise<DeleteScheduleRequest | void> {
    const cpf = this.prompt("CPF: ");

    const patientExists = await verifyPatientExists.execute(cpf)

    if (!patientExists) {
      console.log("Erro: paciente não cadastrado");
      return;
    }

    let date = this.prompt("Data da consulta: ");
    while (Schedule.validateDate(date)?.error) {
      console.log(Schedule.validateDate(date).error);
      date = this.prompt("Data da consulta: ");
    }

    let startHour = this.prompt("Hora inicial (Ex.: 08:45): ");
    while (Schedule.validateStartHour(startHour, date)?.error) {
      console.log(Schedule.validateStartHour(startHour, date).error);
      startHour = this.prompt("Hora inicial: (Ex.: 08:45): ");
    }

    return {
      cpf,
      date: Schedule.getDateObjet(date),
      startHour
    }
  }
}
