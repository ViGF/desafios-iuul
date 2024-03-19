import { Schedule } from "../../model/Schedule";
import { ScheduleRepository } from "../../repositories/schedule/ScheduleRepository";

export class ListSchedulesByDates {
  constructor(private scheduleRepository: ScheduleRepository) {}

  execute(startDate: string, endDate: string) {
    const allSchedules = this.scheduleRepository.findAll()
    
    const startDateObject = Schedule.getDateObjet(startDate)
    const endDateObject = Schedule.getDateObjet(endDate)

    const schedulesInPeriod: Schedule[] = []

    allSchedules.map(sch => {
      if (sch.date >= startDateObject && sch.date <= endDateObject) {
        schedulesInPeriod.push(sch)
      }
    })

    return schedulesInPeriod
  }
}