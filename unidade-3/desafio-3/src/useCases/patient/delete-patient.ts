import { PatientRepository } from "../../repositories/patient/PatientRepository";
import { ScheduleRepository } from "../../repositories/schedule/ScheduleRepository";
import { DeleteScheduleByUser } from "../schedule/delete-schedule-by-user";
import { ListPatientFutureSchedule } from "../schedule/list-patient-future-schedule";

export class DeletePatient {
  constructor(
    private patientRepository: PatientRepository,
    private scheduleRepository: ScheduleRepository
  ) {}

  execute(cpf: string) {
    const listPatientFutureSchedule = new ListPatientFutureSchedule(
      this.patientRepository,
      this.scheduleRepository
    ).execute(cpf);

    if (listPatientFutureSchedule.length > 0) {
      return "Erro: paciente está agendado";
    }

    const patient = this.patientRepository.delete(cpf);

    if (!patient) {
      return "Erro: não foi possível excluir o paciente";
    }

    //Apaga todos os agendamentos futuros do usuário excluído
    const deleteScheduleByUser = new DeleteScheduleByUser(this.scheduleRepository)
    deleteScheduleByUser.execute(cpf)
    
    return "Paciente excluído com sucesso";
  }
}
