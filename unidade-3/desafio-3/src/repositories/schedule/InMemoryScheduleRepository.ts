import { Schedule, ScheduleProps } from "../../model/Schedule";
import { ScheduleRepository } from "./ScheduleRepository";

export class InMemoryScheduleRepository implements ScheduleRepository {
  schedules: Schedule[] = [
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
  ];

  include(schedule: Schedule): void {
    const newSchedule = new Schedule(schedule)
    //Apaga todos os agendamentos futuros do usuário antes de adicionar
    this.deleteInFutureByUser(schedule.cpf)
    this.schedules.push(newSchedule)
  }

  findAll(): Schedule[] {
    return this.schedules;
  }

  delete(schedule: Omit<ScheduleProps, "endHour">): void | Schedule {
    const scheduleInMemory = this.schedules.find((sch) => {
      return (sch.date.toISOString() == schedule.date.toISOString() && sch.startHour == schedule.startHour)
    });
    const scheduleInFuture = schedule.date >= new Date(new Date().toDateString())

    if (scheduleInMemory && scheduleInFuture) {
      this.schedules = this.schedules.filter((sch) => sch != scheduleInMemory);

      return scheduleInMemory;
    } else {
      return;
    }
  }

  deleteByUser(cpf: string): void {
    this.schedules = this.schedules.filter(schedule => schedule.cpf != cpf)
  }

  deleteInFutureByUser(cpf: string) {
    this.schedules = this.schedules.filter(schedule => {
      if (schedule.cpf == cpf) {
        const scheduleInFuture = schedule.date >= new Date(new Date().toDateString())
  
        if (scheduleInFuture) {
          return false
        }

        return true
      }

      return true
    })
  }

  findByUser(cpf: string): Schedule[] {
    const schedules = this.schedules.filter((schedule) => schedule.cpf == cpf);

    return schedules;
  }
}
