import { ScheduleRepository } from "../../repositories/schedule/ScheduleRepository";

export class ListSchedules {
  constructor(private scheduleRepository: ScheduleRepository) {}

  execute() {
    const schedules = this.scheduleRepository.findAll();

    return schedules;
  }
}
