import { Schedule } from "../../model/Schedule";
import { PatientRepository } from "../../repositories/patient/PatientRepository";
import { ScheduleRepository } from "../../repositories/schedule/ScheduleRepository";

export class VerifyPatientFutureSchedule {
  constructor(
    private patientRepository: PatientRepository,
    private scheduleRepository: ScheduleRepository
  ) {}

  execute(cpf: string) {
    const patient = this.patientRepository.findUnique(cpf);

    if (!patient) {
      return;
    }

    const patientSchedule = this.scheduleRepository.findByUser(cpf);
    let scheduleInFuture = false

    patientSchedule.map((schedule) => {
      const dateString = Schedule.dateObjectToString(schedule.date)

      //Verifica se a data está no futuro
      if (Schedule.validateDate(dateString)?.value) {
        scheduleInFuture = true;
      }
    });

    return scheduleInFuture;
  }
}
