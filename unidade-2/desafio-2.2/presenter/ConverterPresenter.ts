import { ConverterController } from "../controller/ConverterController";
import { OperationStatus } from "../controller/operation-code";
import { IGetRateController } from "../model/IGetRateController";
import { ConverterView } from "../view/ConverterView";

/*
Classe responsável por manipular a view,
o controller que manipula a API e o que realiza o cálculo
*/
export class ConverterPresenter {
  #view: ConverterView;
  #getRateController: IGetRateController;
  #converterController: ConverterController;

  constructor(
    converterController: ConverterController,
    getRateController: IGetRateController
  ) {
    this.#view = new ConverterView();
    this.#converterController = converterController;
    this.#getRateController = getRateController;
  }

  async run() {
    for (;;) {
      const baseCurrency = this.#view.readBaseCurrency();

      //Encerra o loop caso a moeda de origem seja vazia
      if (!baseCurrency) {
        return;
      }

      const destinationCurrency =
        this.#view.readDestinationCurrency(baseCurrency);
      const value = this.#view.readValue();

      const { status, errors, result } = await this.#getRateController.run(
        baseCurrency,
        destinationCurrency
      );

      if (status != OperationStatus.SUCCESS) {
        return this.#view.process({
          status,
          errors,
        });
      }

      const valueConverted = this.#converterController.run(
        result.conversionRate,
        value
      );

      this.#view.process({
        status,
        errors,
        result: {
          baseCurrency,
          destinationCurrency,
          conversionRate: result.conversionRate,
          value,
          valueConverted,
        },
      });
    }
  }
}
