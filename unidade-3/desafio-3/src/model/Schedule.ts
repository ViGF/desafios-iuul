export type ScheduleProps = {
  cpf: string;
  date: Date;
  startHour: string;
  endHour: string;
};

export class Schedule {
  private _cpf: string;
  private _date: Date;
  private _startHour: string;
  private _endHour: string;
  private _duration: string;

  constructor({ cpf, date, startHour, endHour }: ScheduleProps) {
    this._cpf = cpf;
    this._date = date;
    this._startHour = startHour;
    this._endHour = endHour;
    this._duration = Schedule.calculateDuration(startHour, endHour);
  }

  //Retorna a data do agendamento em formato de objeto Date
  static getDateObjet(date: string) {
    const [day, month, year] = date.split("/");

    return new Date(`${month}/${day}/${year}`);
  }

  static hourToPresentableFormat(completeHour: string) {
    const hours = completeHour.slice(0, 2);
    const minutes = completeHour.slice(2, 4);

    return `${hours}:${minutes}`;
  }

  //Converte um objeto data em string Ex.: 10/07/2000
  static dateObjectToString(date: Date) {
    const dateDay = date.getDate();
    const dateMonth = String(date.getMonth() + 1).padStart(2, "0");
    const dateYear = date.getFullYear();

    const dateString = `${dateDay}/${dateMonth}/${dateYear}`;
    return dateString;
  }

  static validateDate(date: string, dateInPassToCompare?: string) {
    const scheduleDate = Schedule.getDateObjet(date);
    const actualDate = dateInPassToCompare
      ? Schedule.getDateObjet(dateInPassToCompare)
      : new Date(new Date().toDateString());

    if (scheduleDate >= actualDate) {
      return {
        value: date,
      };
    } else {
      return {
        value: null,
        error: "Erro: a data deve ser futura",
      };
    }
  }

  static validateStartHour(startHour: string, date: string) {
    const scheduleDate = Schedule.getDateObjet(date);

    const startHourHour = +startHour.slice(0, 2);
    const startHourMinutes = +startHour.slice(2, 4);
    const dateNow = new Date();

    if (startHourHour < 8) {
      return {
        value: null,
        error: "Erro: o horário de funcionamento é entre às 8:00h e 19:00h",
      };
    }

    if (startHourMinutes % 15 != 0) {
      return {
        value: null,
        error:
          "Erro: o horário deve ser definido de 15 em 15 minutos. Ex.: 0845",
      };
    }

    //Verifica se a hora está no futuro somente se o dia do agendamento coincidir com o dia atual
    if (scheduleDate == dateNow) {
      //Cria uma nova data com o dia atual e define a hora e os minutos conforme horário do agendamento
      let scheduleDateWithStartHour = new Date(
        new Date(new Date().setHours(startHourHour)).setMinutes(
          startHourMinutes
        )
      );

      if (scheduleDateWithStartHour > dateNow) {
        return {
          value: startHour,
        };
      } else {
        return {
          value: null,
          error: "Erro: a hora deve estar no futuro",
        };
      }
    } else {
      return {
        value: startHour,
      };
    }
  }

  static validateEndHour(endHour: string, startHour: string) {
    const endHourHour = +endHour.slice(0, 2);
    const endHourMinutes = +endHour.slice(2, 4);
    const startHourHour = +startHour.slice(0, 2);
    const startHourMinutes = +startHour.slice(2, 4);

    if (endHourHour > 19 || (endHourHour == 19 && endHourMinutes != 0)) {
      return {
        value: null,
        error: "Erro: o horário de funcionamento é entre às 8:00h e 19:00h",
      };
    }

    if (endHourMinutes % 15 != 0) {
      return {
        value: null,
        error:
          "Erro: o horário deve ser definido de 15 em 15 minutos. Ex.: 0845",
      };
    }

    if (endHourHour > startHourHour) {
      return endHour;
    } else if (endHourHour == startHourHour) {
      if (endHourMinutes > startHourMinutes) {
        return {
          value: endHour,
        };
      } else {
        return {
          value: null,
          error: "Erro: a hora final deve ser depois da hora inicial",
        };
      }
    } else {
      return {
        value: null,
        error: "Erro: a hora final deve ser depois da hora inicial",
      };
    }
  }

  static calculateDuration(startCompleteHour: string, endCompleteHour: string) {
    const startMinutes = Number(startCompleteHour.slice(2, 4));
    const startHourInMinutes = Number(startCompleteHour.slice(0, 2)) * 60 + startMinutes;

    const endMinutes = Number(endCompleteHour.slice(2, 4));
    const endHourInMinutes = Number(endCompleteHour.slice(0, 2)) * 60 + endMinutes;

    const minutesDifference = Math.abs(endMinutes - startMinutes);
    const durationInMinutes = endHourInMinutes - startHourInMinutes

    const durationString = `${String(Math.floor(durationInMinutes / 60)).padStart(
      2,
      "0"
    )}:${String(durationInMinutes % 60).padStart(2, "0")}`;

    //525
    //570

    return durationString
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

  get duration() {
    return this._duration
  }
}