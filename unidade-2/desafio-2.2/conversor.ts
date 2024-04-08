import { ConverterController } from "./controller/ConverterController";
import { GetRateController } from "./controller/GetRateController";
import { ConverterPresenter } from "./presenter/ConverterPresenter";

const converterController = new ConverterController()
const getRateController = new GetRateController()

const converterPresenter = new ConverterPresenter(converterController, getRateController)
converterPresenter.run()