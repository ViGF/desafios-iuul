import { ScheduleProps } from "../../model/Schedule";
import { ScheduleRepository } from "../../repositories/schedule/ScheduleRepository";

export class DeleteSchedule {
  constructor(private scheduleRepository: ScheduleRepository) {}

  execute(schedule: Omit<ScheduleProps, "endHour">) {
    const scheduleDeleted = this.scheduleRepository.delete(schedule)

    if (scheduleDeleted) {
      return "Agendamento cancelado com sucesso"
    } else {
      return "Erro: não foi possível cancelar o agendamento"
    }
  }
}