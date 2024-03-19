export type PatientProps = {
  cpf: string;
  name: string;
  birthdate: string;
};

export class Patient {
  private _cpf: string;
  private _name: string;
  private _birthdate: string;

  constructor({ cpf, name, birthdate }: PatientProps) {
    this._cpf = cpf;
    this._name = name;
    this._birthdate = birthdate;
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
      }
    } else {
      return {
        value: null,
        error: "Erro: CPF inválido!",
      }
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

  static validateBirthdate(birthdate: string) {
    const [birthday, birthdayMonth, birthdayYear] = birthdate.split("/");
    const actualYear = new Date().getFullYear();
    const age = actualYear - Number(birthdayYear);

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
}

// try {
//   const name = Patient.validateName("carro");
//   const cpf = Patient.validateCpf("16933203042");
//   const birthdate = Patient.validateBirthdate("04/08/2010");

//   const patient = new Patient({ cpf, name, birthdate });

//   console.log(patient.cpf);
//   console.log(patient.name);
//   console.log(patient.birthdate);
// } catch (error: any) {
//   console.log(error.message);
// }
