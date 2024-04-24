import { ModelStatic, Op } from "sequelize";
import { DBSchedule } from "../../database/models/DBSchedule";
import { ScheduleProps } from "../../model/Schedule";
import { ScheduleRepository } from "./ScheduleRepository";

export class ScheduleRepositoryImplementation implements ScheduleRepository {
  model: ModelStatic<DBSchedule> = DBSchedule;
  // new Schedule({
  //   cpf: "18219822821",
  //   date: new Date("02/20/2024"),
  //   startHour: "0800",
  //   endHour: "0900",
  // }),
  // new Schedule({
  //   cpf: "31081862807",
  //   date: new Date("04/20/2024"),
  //   startHour: "0845",
  //   endHour: "0930",
  // }),
  // new Schedule({
  //   cpf: "26050431850",
  //   date: new Date("04/20/2024"),
  //   startHour: "1000",
  //   endHour: "1040",
  // }),

  async include(schedule: ScheduleProps): Promise<ScheduleProps | void> {
    try {
      let result = await this.model.create({
        date: schedule.date,
        start_hour: schedule.startHour,
        end_hour: schedule.endHour,
        patient_cpf: schedule.cpf,
      });

      result = result.toJSON();

      return {
        date: result.date,
        startHour: result.start_hour,
        endHour: result.end_hour,
        cpf: result.patient_cpf,
      };
    } catch (error) {
      return;
    }
  }

  async findByUser(cpf: string): Promise<ScheduleProps[]> {
    try {
      const result = await this.model.findAll({
        where: {
          patient_cpf: cpf,
        },
      });

      const schedules: ScheduleProps[] = result.map((sch) => {
        const { date, patient_cpf, start_hour, end_hour } = sch.toJSON();

        return {
          date,
          cpf: patient_cpf,
          startHour: start_hour,
          endHour: end_hour,
        };
      });

      return schedules;
    } catch (error) {
      return [];
    }
  }

  async findAll(): Promise<ScheduleProps[] | void> {
    try {
      const result = await this.model.findAll();

      const schedules: ScheduleProps[] = result.map((sch) => {
        const { date, patient_cpf, start_hour, end_hour } = sch.toJSON();

        return {
          date,
          cpf: patient_cpf,
          startHour: start_hour,
          endHour: end_hour,
        };
      });

      return schedules;
    } catch (error) {
      return;
    }
  }

  async findByDate(
    startDate: Date,
    endDate: Date
  ): Promise<ScheduleProps[] | void> {
    try {
      const result = await this.model.findAll({
        where: {
          date: {
            [Op.gte]: startDate,
            [Op.lte]: endDate,
          },
        },
      });

      const schedules: ScheduleProps[] = result.map((sch) => {
        const { date, patient_cpf, start_hour, end_hour } = sch.toJSON();

        return {
          date,
          cpf: patient_cpf,
          startHour: start_hour,
          endHour: end_hour,
        };
      });

      return schedules;
    } catch (error) {
      return;
    }
  }

  async findInFutureByUser(cpf: string): Promise<ScheduleProps[] | void> {
    try {
      const dateNow = new Date()
      
      const result = await this.model.findAll({
        where: {
          patient_cpf: cpf,
          date: {
            [Op.gte]: dateNow
          }
        }
      })

      const schedules: ScheduleProps[] = result.map((sch) => {
        const { date, patient_cpf, start_hour, end_hour } = sch.toJSON();

        return {
          date,
          cpf: patient_cpf,
          startHour: start_hour,
          endHour: end_hour,
        };
      });

      return schedules;
    } catch (error) {
      return;
    }
  }

  async delete(schedule: Omit<ScheduleProps, "endHour">): Promise<number | void> {
    try {
      const result = await this.model.destroy({
        where: {
          date: schedule.date,
          patient_cpf: schedule.cpf,
          start_hour: schedule.startHour
        }
      })

      return result
    } catch (error) {
      return;
    }
  }

  async deleteInFutureByUser(cpf: string) {
    try {
      const result = await this.model.destroy({
        where: {
          patient_cpf: cpf,
          date: {
            [Op.gte]: new Date()
          }
        }
      })
  
      return result
    } catch (error) {
      return;
    }
  }

  async findConflict(scheduleProps: ScheduleProps): Promise<DBSchedule[] | void> {
    try {
      const schedule = await this.model.findOne({
        where: {
          date: scheduleProps.date,
          start_hour: {
            [Op.gte]: scheduleProps.startHour,
            [Op.lt]: scheduleProps.endHour
          },
        }
      })

      if (!schedule) {
        return []
      }
      
      return [schedule]
    } catch (error) {
      return;
    }
  }
}
