import { ModelStatic } from "sequelize";
import { ScheduleProps } from "../../model/Schedule";
import { DBSchedule } from "../../database/models/DBSchedule";

export interface ScheduleRepository {
  model: ModelStatic<DBSchedule>;

  include(schedule: ScheduleProps): Promise<ScheduleProps | void>;
  findByUser(cpf: string): Promise<ScheduleProps[]>;
  findAll(): Promise<ScheduleProps[] | void>;
  findByDate(startDate: Date, endDate: Date): Promise<ScheduleProps[] | void>;
  findInFutureByUser(cpf: string): Promise<ScheduleProps[] | void>;
  delete(schedule: Omit<ScheduleProps, "endHour">): Promise<number | void>;
  deleteInFutureByUser(cpf: string): Promise<number | void>;
  findConflict(scheduleProps: ScheduleProps): Promise<DBSchedule[] | void>
}
