import { ScheduleProps } from "../../model/Schedule";
import { ScheduleRepository } from "../../repositories/schedule/ScheduleRepository";

export class DeleteSchedule {
  constructor(private scheduleRepository: ScheduleRepository) {}

  async execute(schedule: Omit<ScheduleProps, "endHour">) {
    const scheduleDeleted = await this.scheduleRepository.delete(schedule)

    if (scheduleDeleted == 1) {
      return "Agendamento cancelado com sucesso"
    } else {
      return "Erro: não foi possível cancelar o agendamento"
    }
  }
}