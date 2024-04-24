import { Schedule, ScheduleProps } from "../../model/Schedule";
import { ScheduleRepository } from "../../repositories/schedule/ScheduleRepository";

export type IncludeScheduleRequest = Omit<ScheduleProps, "date"> & {
  date: string;
};

export class IncludeSchedule {
  constructor(private scheduleRepository: ScheduleRepository) {}

  async execute(scheduleInfo: IncludeScheduleRequest) {
    const schedule = {
      ...scheduleInfo,
      date: Schedule.getDateObjet(scheduleInfo.date)
    };

    const conflicts = await this.scheduleRepository.findConflict(schedule)

    if (!conflicts) {
      return "Erro: Não foi possível realizar o agendamento";
    } else if (conflicts.length > 0) {
      return "Erro: Já existe um atendimento nesse horário";
    }

    //Apaga todos os agendamentos futuros do usuário antes de adicionar
    const resultDelete = await this.scheduleRepository.deleteInFutureByUser(schedule.cpf)

    if (!resultDelete) {
      return "Erro: Não foi possível realizar o agendamento";
    }

    const result = await this.scheduleRepository.include(schedule);

    if (result) {
      return "Agendamento realizado com sucesso";
    }

    return "Erro: Não foi possível realizar o agendamento";
  }
}
