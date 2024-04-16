export type PatientProps = {
  cpf: string;
  name: string;
  birthdate: string;
};

export class Patient {
  private _cpf: string;
  private _name: string;
  private _birthdate: string;
  private _age: number;

  constructor({ cpf, name, birthdate }: PatientProps) {
    this._cpf = cpf;
    this._name = name;
    this._birthdate = birthdate;
    this._age = Patient.calculateAge(birthdate);
  }

  static validateCpf(cpf: string) {
    const lengthIsCorrect = cpf.length == 11;
    const digitsEquals = cpf
      .split("")
      .filter((digit) => digit == cpf[0]).length;
    const allDigitsAreNotEquals = digitsEquals < 11;
    const digits = cpf.split("");
    let j = 0;
    let k = 0;

    for (let index = 10; index > 1; index--) {
      j += parseInt(digits[Math.abs(index - 10)]) * index;
    }

    if (j % 11 > 1) {
      j = 11 - (j % 11);
    } else {
      j = 0;
    }

    for (let index = 10; index > 0; index--) {
      k += parseInt(digits[Math.abs(index - 10)]) * (index + 1);
    }

    if (k % 11 > 1) {
      k = 11 - (k % 11);
    } else {
      k = 0;
    }

    if (
      lengthIsCorrect &&
      allDigitsAreNotEquals &&
      j.toString() == digits[9] &&
      k.toString() == digits[10]
    ) {
      return {
        value: cpf,
      };
    } else {
      return {
        value: null,
        error: "Erro: CPF inválido!",
      };
    }
  }

  static validateName(name: string) {
    if (name.length > 4) {
      return {
        value: name,
      };
    } else {
      return {
        value: null,
        error: "Erro: nome inválido",
      };
    }
  }

  static getDateObjet(date: string) {
    const [day, month, year] = date.split("/");

    return new Date(`${month}/${day}/${year}`);
  }

  static calculateAge(birthdate: string) {
    const birthdateObject = this.getDateObjet(birthdate);
    const actualDate = new Date();

    const actualYear = actualDate.getFullYear()
    const actualMonth = actualDate.getMonth()
    const actualDay = actualDate.getDate()

    const birthdateYear = birthdateObject.getFullYear()
    const birthdateMonth = birthdateObject.getMonth()
    const birthdateDay = birthdateObject.getDate()

    let age = (actualYear - birthdateYear) - 1;

    if (actualMonth == birthdateMonth || actualMonth > birthdateMonth) {
      if (actualDay == birthdateDay || actualDay > birthdateDay) {
        age += 1
      }
    }

    return age
  }

  static validateBirthdate(birthdate: string) {
    const age = this.calculateAge(birthdate);

    if (age > 12) {
      return {
        value: birthdate,
      };
    } else {
      return {
        value: null,
        error: "Erro: o paciente deve ter pelo menos 13 anos",
      };
    }
  }

  get cpf() {
    return this._cpf;
  }

  get name() {
    return this._name;
  }

  get birthdate() {
    return this._birthdate;
  }

  get age() {
    return this._age
  }
}
