import { DateTime } from "luxon";
import { UserArchive } from "../@types/UserArchive.js";
import {
  UserFieldValidationResult,
  UserValidationResult,
} from "../@types/UserValidationResult.js";
import { OperationErrors, operationErrorMessages } from "./OperationErrors.js";

export class ValidateUser {
  static validateName(
    name: string | undefined
  ): UserFieldValidationResult | void {
    if (!name) {
      return {
        campo: "nome",
        mensagem: operationErrorMessages.errors.get(
          OperationErrors.MISSING_REQUIRED_FIELD
        )!,
      };
    }

    if (name.length < 5 || name.length > 60) {
      return {
        campo: "nome",
        mensagem: operationErrorMessages.errors.get(
          OperationErrors.INVALID_NAME
        )!,
      };
    }
  }

  static validateCpf(
    cpf: string | undefined
  ): UserFieldValidationResult | void {
    if (!cpf) {
      return {
        campo: "cpf",
        mensagem: operationErrorMessages.errors.get(
          OperationErrors.MISSING_REQUIRED_FIELD
        )!,
      };
    }

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
      return;
    } else {
      return {
        campo: "cpf",
        mensagem: operationErrorMessages.errors.get(
          OperationErrors.INVALID_DOCUMENT
        )!,
      };
    }
  }

  static validateBirthdate(
    birthdate: string | undefined
  ): UserFieldValidationResult | void {
    if (!birthdate) {
      return {
        campo: "dt_nascimento",
        mensagem: operationErrorMessages.errors.get(
          OperationErrors.MISSING_REQUIRED_FIELD
        )!,
      };
    }

    const dt = DateTime.fromFormat(birthdate, "ddMMyyyy");
    const age = DateTime.now().diff(dt).as("years");

    if (!dt.isValid || age < 18) {
      return {
        campo: "dt_nascimento",
        mensagem: operationErrorMessages.errors.get(
          OperationErrors.INVALID_BIRTHDATE
        )!,
      };
    }
  }

  static validateIncome(
    value: string | undefined
  ): UserFieldValidationResult | void {
    if (!value) {
      return;
    }

    const num = Number.parseFloat(value);
    const [, decimals] = value.split(",");

    //Verifica se o valor não possui vírgula
    const notContainsComma = !value.includes(",");
    const isNotANumber = isNaN(num);

    //Verifica se o número possui menos de 2 casa decimais
    const containsLess2DecimalCases = decimals.length < 2;

    if (notContainsComma || isNotANumber || containsLess2DecimalCases) {
      return {
        campo: "renda_mensal",
        mensagem: operationErrorMessages.errors.get(
          OperationErrors.INVALID_INCOME
        )!,
      };
    }
  }

  static validateState(
    state: string | undefined
  ): UserFieldValidationResult | void {
    if (!state) {
      return;
    }

    const validChars = ["C", "S", "V", "D"];

    if (!validChars.includes(state.toUpperCase())) {
      return {
        campo: "estado_civil",
        mensagem: operationErrorMessages.errors.get(
          OperationErrors.INVALID_STATE
        )!,
      };
    }
  }

  run(user: UserArchive): UserValidationResult {
    const result: UserValidationResult = {
      dados: user,
      erros: [],
    };

    const nameValidation = ValidateUser.validateName(user.nome);
    const cpfValidation = ValidateUser.validateCpf(user.cpf);
    const birthdateValidation = ValidateUser.validateBirthdate(user.dt_nascimento);
    const incomeValidation = ValidateUser.validateIncome(user.renda_mensal);
    const stateValidation = ValidateUser.validateState(user.estado_civil);

    nameValidation ? result.erros.push(nameValidation) : null
    cpfValidation ? result.erros.push(cpfValidation) : null
    birthdateValidation ? result.erros.push(birthdateValidation) : null
    incomeValidation ? result.erros.push(incomeValidation) : null
    stateValidation ? result.erros.push(stateValidation) : null

    return result;
  }
}
