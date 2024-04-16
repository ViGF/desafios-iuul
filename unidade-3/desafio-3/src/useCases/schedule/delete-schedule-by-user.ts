import { ScheduleRepository } from "../../repositories/schedule/ScheduleRepository";

export class DeleteScheduleByUser {
  constructor(private scheduleRepository: ScheduleRepository) {}

  execute(cpf: string) {
    this.scheduleRepository.deleteByUser(cpf)
  }
}