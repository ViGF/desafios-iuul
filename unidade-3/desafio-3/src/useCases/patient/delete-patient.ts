import { PatientRepository } from "../../repositories/patient/PatientRepository";
import { ListPatientFutureSchedule } from "../schedule/list-patient-future-schedule";
import { ScheduleRepository } from "../../repositories/schedule/ScheduleRepository";
// import { DeleteScheduleByUser } from "../schedule/delete-schedule-by-user";

export class DeletePatient {
  constructor(
    private patientRepository: PatientRepository,
    private scheduleRepository: ScheduleRepository
  ) {}

  async execute(cpf: string) {
    //Não há mais a necessidade de apagar os agendamentos por usuário
    //pq o relacionamento no BD está com a configuração CASCADE

    const listPatientFutureSchedule = await new ListPatientFutureSchedule(
      //this.patientRepository,
      this.scheduleRepository
    ).execute(cpf);

    if (!listPatientFutureSchedule) {
      return "Erro: não foi possível excluir o paciente";
    }

    if (listPatientFutureSchedule.length > 0) {
      return "Erro: paciente está agendado";
    }

    const patient = await this.patientRepository.delete(cpf);

    if (patient == 1) {
      return "Paciente excluído com sucesso";
    } else {
      return "Erro: não foi possível excluir o paciente";
    }

    //Apaga todos os agendamentos futuros do usuário excluído
    // const deleteScheduleByUser = new DeleteScheduleByUser(this.scheduleRepository)
    // deleteScheduleByUser.execute(cpf)
  }
}
