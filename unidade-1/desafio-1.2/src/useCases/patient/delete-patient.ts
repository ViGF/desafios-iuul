import { PatientRepository } from "../../repositories/patient/PatientRepository";
import { ScheduleRepository } from "../../repositories/schedule/ScheduleRepository";
import { DeleteScheduleByUser } from "../schedule/delete-schedule-by-user";
import { VerifyPatientFutureSchedule } from "../schedule/verify-patient-future-schedule";

export class DeletePatient {
  constructor(
    private patientRepository: PatientRepository,
    private scheduleRepository: ScheduleRepository
  ) {}

  execute(cpf: string) {
    const verifyPatientFutureSchedule = new VerifyPatientFutureSchedule(
      this.patientRepository,
      this.scheduleRepository
    ).execute(cpf);

    if (verifyPatientFutureSchedule) {
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
