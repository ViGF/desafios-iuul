import { IRead } from "../interfaces/IRead.js";
import { IWrite } from "../interfaces/IWrite.js";
import { OperationStatus, operationErrorMessages } from "./OperationErrors.js";
import { ValidateUser } from "./ValidateUser.js";

export class ValidateFile {
  constructor(
    private readFile: IRead,
    private validateUser: ValidateUser,
    private writeFile: IWrite,
  ) {}

  async run() {
    console.log("Lendo dados...")
    let result = await this.readFile.read()

    if (result.status != OperationStatus.SUCCESS && result.errors) {
      return console.log(
        "Erro",
        operationErrorMessages.errors.get(result.errors[0])
      );
    }

    result = await this.writeFile.start()
    console.log("Criando arquivo .json...")

    if (result.status != OperationStatus.SUCCESS && result.errors) {
      return console.log(
        "Erro",
        operationErrorMessages.errors.get(result.errors[0])
      );
    }

    console.log("Validando dados e escrevendo no arquivo...")
    
    const iterator = this.readFile.iterator()
    
    //Para cada usuário, faço a validação e escrevo no arquivo
    let objectsCount = 0
    for (const user of iterator) {
      const userValidated = JSON.stringify(this.validateUser.run(user))

      //Se for o último item, não quero inserir vírgula ao final da linha
      if (objectsCount == this.readFile.users.length - 1) {
        await this.writeFile.write(userValidated, "\n")
      } else {
        await this.writeFile.write(userValidated)
      }

      objectsCount++
    }

    result = await this.writeFile.end()
    if (result.status != OperationStatus.SUCCESS && result.errors) {
      return console.log(
        "Erro",
        operationErrorMessages.errors.get(result.errors[0])
      );
    } else {
      return console.log("Arquivo gerado com sucesso!")
    }
  }
}
