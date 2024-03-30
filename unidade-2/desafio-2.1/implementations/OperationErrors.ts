class OperationStatus {
  static get SUCCESS() {
    return 1;
  }
  static get FAILURE() {
    return 2;
  }
}

class OperationErrors {
  static get FILE_NOT_EXITS() {
    return 0;
  }
  static get INVALID_NAME() {
    return 1;
  }
  static get INVALID_DOCUMENT() {
    return 2;
  }
  static get INVALID_BIRTHDATE() {
    return 3;
  }
  static get INVALID_INCOME() {
    return 4;
  }
  static get INVALID_STATE() {
    return 5;
  }
  static get UNABLE_TO_WRITE_FILE() {
    return 6;
  }
  static get FILE_NOT_CONTAINS_ARRAY() {
    return 7;
  }
  static get MISSING_REQUIRED_FIELD() {
    return 8;
  }
}

class OperationErrorMessages {
  private errorMessages = new Map<number, string>();

  constructor() {
    this.#setupMessages();
  }

  get errors() {
    return this.errorMessages;
  }

  #setupMessages() {
    this.errorMessages.set(
      OperationErrors.FILE_NOT_EXITS,
      "- O arquivo recebido não existe."
    );
    this.errorMessages.set(
      OperationErrors.INVALID_NAME,
      "O nome deve conter de 5 à 60 caracteres."
    );
    this.errorMessages.set(
      OperationErrors.INVALID_DOCUMENT,
      "O CPF é inválido"
    );
    this.errorMessages.set(
      OperationErrors.INVALID_BIRTHDATE,
      "O cliente deve ter pelo menos 18 anos."
    );
    this.errorMessages.set(
      OperationErrors.INVALID_INCOME,
      "A renda mensal deve conter duas casas decimais com vírgula decimal."
    );
    this.errorMessages.set(
      OperationErrors.INVALID_STATE,
      "O estado civil é inválido."
    );
    this.errorMessages.set(
      OperationErrors.FILE_NOT_CONTAINS_ARRAY,
      "- O arquivo enviado não contem um Array."
    );
    this.errorMessages.set(
      OperationErrors.MISSING_REQUIRED_FIELD,
      "O campo é obrigatório."
    );
  }
}

const operationErrorMessages = new OperationErrorMessages();

export { OperationStatus, OperationErrors, operationErrorMessages };
