//import { Patient } from "./Patient";

type ScheduleProps = {
  cpf: string;
  date: string;
  startHour: string;
  endHour: string;
};

class Schedule {
  private _cpf: string;
  private _date: string;
  private _startHour: string;
  private _endHour: string;

  constructor({ cpf, date, startHour, endHour }: ScheduleProps) {
    this._cpf = cpf;
    this._date = date;
    this._startHour = startHour;
    this._endHour = endHour;
  }

  //Retorna a data do agendamento em formato de objeto Date
  static getDateObjet(date: string) {
    const [day, month, year] = date.split("/");

    return new Date(`${month}/${day}/${year}`);
  }

  static validateDate(date: string) {
    const scheduleDate = Schedule.getDateObjet(date);
    const actualDate = new Date(new Date().toDateString());

    if (scheduleDate >= actualDate) {
      return date;
    } else {
      throw new Error("Erro: a data deve ser futura");
    }
  }

  static validateStartHour(startHour: string, date: string) {
    const scheduleDay = Schedule.getDateObjet(date).getDate();
    const startHourHour = +startHour.slice(0, 2);
    const startHourMinutes = +startHour.slice(2, 4);
    const dateNow = new Date();
    const dayNow = new Date().getDate();

    if (startHourHour < 8) {
      throw new Error(
        "Erro: o horário de funcionamento é entre às 8:00h e 19:00h"
      );
    }

    if (startHourMinutes % 15 != 0) {
      throw new Error(
        "Erro: o horário deve ser definido de 15 em 15 minutos. Ex.: 0845"
      );
    }

    //Verifica se a hora está no futuro somente se o dia do agendamento coincidir com o dia atual
    if (scheduleDay == dayNow) {
      //Cria uma nova data com o dia atual e define a hora e os minutos conforme horário do agendamento
      let scheduleDateWithStartHour = new Date(
        new Date(new Date().setHours(startHourHour)).setMinutes(
          startHourMinutes
        )
      );

      if (scheduleDateWithStartHour > dateNow) {
        return startHour;
      } else {
        throw new Error("Erro: a hora deve estar no futuro");
      }
    } else {
      return startHour;
    }
  }

  static validateEndHour(endHour: string, startHour: string) {
    const endHourHour = +endHour.slice(0, 2);
    const endHourMinutes = +endHour.slice(2, 4);
    const startHourHour = +startHour.slice(0, 2);
    const startHourMinutes = +startHour.slice(2, 4);

    if (endHourHour > 19 || (endHourHour == 19 && endHourMinutes != 0)) {
      throw new Error(
        "Erro: o horário de funcionamento é entre às 8:00h e 19:00h"
      );
    }

    if (endHourMinutes % 15 != 0) {
      throw new Error(
        "Erro: o horário deve ser definido de 15 em 15 minutos. Ex.: 0845"
      );
    }

    if (endHourHour > startHourHour) {
      return endHour;
    } else if (endHourHour == startHourHour) {
      if (endHourMinutes > startHourMinutes) {
        return endHour;
      } else {
        throw new Error("Erro: a hora final deve ser depois da hora inicial");
      }
    } else {
      throw new Error("Erro: a hora final deve ser depois da hora inicial");
    }
  }

  get cpf() {
    return this._cpf;
  }

  get date() {
    return this._date;
  }

  get startHour() {
    return this._startHour;
  }

  get endHour() {
    return this._endHour;
  }
}

// try {
//   const cpf = Patient.validateCpf("16933203042");
//   const date = Schedule.validateDate("14/03/2024");
//   const startHour = Schedule.validateStartHour("1400", date);
//   const endHour = Schedule.validateEndHour("1430", startHour);

//   const schedule = new Schedule({ cpf, date, startHour, endHour });

//   console.log(schedule.cpf);
//   console.log(schedule.date);
//   console.log(schedule.startHour);
//   console.log(schedule.endHour);
// } catch (error: any) {
//   console.log(error.message);
// }
