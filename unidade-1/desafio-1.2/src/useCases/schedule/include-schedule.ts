import { Schedule, ScheduleProps } from "../../model/Schedule";
import { ScheduleRepository } from "../../repositories/schedule/ScheduleRepository";

type IncludeScheduleRequest = Omit<ScheduleProps, "date"> & {
  date: string;
};

export class IncludeSchedule {
  constructor(private scheduleRepository: ScheduleRepository) {}

  execute(scheduleInfo: IncludeScheduleRequest) {
    const schedule: ScheduleProps = {
      ...scheduleInfo,
      date: Schedule.getDateObjet(scheduleInfo.date),
    };

    const newSchedule = new Schedule(schedule);
    this.scheduleRepository.include(newSchedule);

    if (newSchedule) {
      return "Agendamento realizado com sucesso";
    }

    return "Não foi possível realizar o agendamento";
  }
}
