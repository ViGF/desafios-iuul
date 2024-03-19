import { Schedule, ScheduleProps } from "../../model/Schedule";

export interface ScheduleRepository {
  schedules: Schedule[];

  include(schedule: Schedule): void;
  findAll(): Schedule[];
  delete(schedule: Omit<ScheduleProps, "endHour">): Schedule | void;
  deleteByUser(cpf: string): void;
  findByUser(cpf: string): Schedule[];
}
