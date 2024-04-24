import { Schedule } from "../../model/Schedule";
import { ScheduleRepository } from "../../repositories/schedule/ScheduleRepository";

export class ListSchedules {
  constructor(private scheduleRepository: ScheduleRepository) {}

  async execute() {
    const schedulesProps = await this.scheduleRepository.findAll();

    if (!schedulesProps) {
      return;
    }

    const schedules = schedulesProps.map((sch) => {
      return new Schedule({
        cpf: sch.cpf,
        date: new Date(sch.date),
        endHour: sch.endHour,
        startHour: sch.startHour
      })
    });

    return schedules;
  }
}
