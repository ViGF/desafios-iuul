import { OperationErrors, OperationStatus } from "../controller/operation-code";
import { Input } from "../utils/input";

export class ConverterView {
  #input: Input;
  #errors: Map<number, string>;

  constructor() {
    this.#input = new Input();
    this.#errors = new Map();

    this.#setupMessages();
  }

  readBaseCurrency() {
    return this.#input.readCurrency(
      "Moeda origem: ",
      "A moeda deve conter exatamente 3 caracteres"
    );
  }

  readDestinationCurrency(baseCurrency: string) {
    return this.#input.readCurrency(
      "Moeda destino: ",
      "A moeda deve conter exatamente 3 caracteres",
      {
        baseCurrency,
        errorMessage: "A moeda de destino deve ser diferente da moeda de origem",
      }
    );
  }

  readValue() {
    return this.#input.readValue(
      "Valor na moeda de origem: ",
      "O valor deve ser positivo"
    );
  }

  #writeResult({
    baseCurrency,
    destinationCurrency,
    conversionRate,
    value,
    valueConverted,
  }: ConverterPresenterResult) {
    process.stdout.write(
      `\n${baseCurrency.toUpperCase()} ${value.toFixed(2)} => ${
        destinationCurrency.toUpperCase()
      } ${valueConverted.toFixed(2)}`
    );
    process.stdout.write(`\nTaxa: ${conversionRate.toFixed(6)}\n`);
    process.stdout.write('\n')
  }

  process({ status, errors, result }: ControllerReturn<ConverterPresenterResult>) {
    if (status == OperationStatus.SUCCESS && result) {
      this.#writeResult(result);
    } else {
      process.stdout.write("Erro na conversão");
      errors.map((errorCode) => {
        process.stdout.write(`Erro ` + this.#errors.get(errorCode));
      });
    }
  }

  #setupMessages() {
    this.#errors.set(
      OperationErrors.UNABLE_TO_GET_TAX_RATE,
      "- Não foi possível obter a taxa de conversão"
    );
  }
}
