import axios, { AxiosResponse } from "axios";
import { IGetRateController } from "../model/IGetRateController";
import { OperationErrors, OperationStatus } from "./operation-code";

//Classe responsável por fazer a requisição, retorna a taxa ou erro
export class GetRateController implements IGetRateController {
  async run(base: string, destination: string) {
    return await axios
      .get(
        `https://v6.exchangerate-api.com/v6/3b7f2b2850fa03fc996d3cc0/pair/${base}/${destination}`
      )
      .then(({ data }: AxiosResponse<APIResponse>) => {
        return {
          status: OperationStatus.SUCCESS,
          result: {
            conversionRate: data.conversion_rate
          }
        };
      })
      .catch(() => {
        return {
          status: OperationStatus.FAILURE,
          errors: [OperationErrors.UNABLE_TO_GET_TAX_RATE],
        };
      });
  }
}
