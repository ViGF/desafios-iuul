import { Schedule } from "../../model/Schedule";
import { ScheduleRepository } from "../../repositories/schedule/ScheduleRepository";

export class ListPatientFutureSchedule {
  constructor(
    private scheduleRepository: ScheduleRepository
  ) {}

  async execute(cpf: string) {
    const scheduleProps = await this.scheduleRepository.findInFutureByUser(cpf)

    if (!scheduleProps) {
      return;
    }

    const schedules = scheduleProps.map(sch => new Schedule(sch))
    
    return schedules;
  }
}
