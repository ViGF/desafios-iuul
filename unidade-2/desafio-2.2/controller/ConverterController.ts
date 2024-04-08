//Classe responsável por converter o valor
export class ConverterController {
  run(taxRate: number, value: number) {
    const result = taxRate * value

    return result
  }
}