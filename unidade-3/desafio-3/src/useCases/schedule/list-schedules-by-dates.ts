import { Schedule } from "../../model/Schedule";
import { ScheduleRepository } from "../../repositories/schedule/ScheduleRepository";

export class ListSchedulesByDates {
  constructor(private scheduleRepository: ScheduleRepository) {}

  async execute(startDate: string, endDate: string) {
    
    const startDateObject = Schedule.getDateObjet(startDate)
    const endDateObject = Schedule.getDateObjet(endDate)
    
    const schedulesProps = await this.scheduleRepository.findByDate(startDateObject, endDateObject)

    if (!schedulesProps) {
      return;
    }

    const schedules = schedulesProps.map((sch) => new Schedule(sch));

    return schedules
  }
}