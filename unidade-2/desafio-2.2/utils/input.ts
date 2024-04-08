import PromptSync, { Prompt } from "prompt-sync"

type ReadCurrencyOptions = {
  baseCurrency: string
  errorMessage: string
}

export class Input {
  #prompt: Prompt

  constructor() {
    this.#prompt = PromptSync({ sigint: true })
  }

  //Lê uma moeda. Caso seja a moeda de destino recebe a de origem
  readCurrency(label: string, errorMessage: string, options?: ReadCurrencyOptions) {
    const baseCurrency = options?.baseCurrency

    for(;;) {
      const currency = this.#prompt(label)

      //Permite retornar vazio caso a moeda seja a de origem (Encerra o programa)
      if (currency == "" && !baseCurrency) {
        return currency
      } else if (currency.length != 3) {
        process.stdout.write(errorMessage + '\n')
      } else if (baseCurrency && baseCurrency == currency) {
        //Verifica se a moeda de origem é igual a moeda de destino

        process.stdout.write(options.errorMessage + '\n')
      } else {
        return currency
      }
    }
  }

  readValue(label: string, errorMessage: string) {
    for(;;) {
      const value = parseFloat(this.#prompt(label))

      if (value <= 0 || !value) {
        process.stdout.write(errorMessage + '\n')
      } else {
        return value
      }
    }
  }
}