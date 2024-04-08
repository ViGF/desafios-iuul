/*
A GetRateController, responsável pelo requisição a API,
deve obedecer à este contrato, para que o ConverterPresenter
dependa de sua abstração
*/
export interface IGetRateController {
  run: (base: string, destination: string) => Promise<ControllerReturn<GetRateControllerResult>>;
}