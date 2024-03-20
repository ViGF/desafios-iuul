import { Schedule } from "../../model/Schedule";
import { PatientRepository } from "../../repositories/patient/PatientRepository";
import { ScheduleRepository } from "../../repositories/schedule/ScheduleRepository";

export class ListPatientFutureSchedule {
  constructor(
    private patientRepository: PatientRepository,
    private scheduleRepository: ScheduleRepository
  ) {}

  execute(cpf: string) {
    const patient = this.patientRepository.findUnique(cpf);

    if (!patient) {
      return [];
    }

    const patientSchedule = this.scheduleRepository.findByUser(cpf);
    const schedulesInFuture: Schedule[] = []

    patientSchedule.map((schedule) => {
      const dateString = Schedule.dateObjectToString(schedule.date)

      //Verifica se a data está no futuro
      if (Schedule.validateDate(dateString)?.value) {
        schedulesInFuture.push(schedule)
      }
    });

    return schedulesInFuture;
  }
}
