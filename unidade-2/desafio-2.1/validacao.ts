import { ReadFile } from "./implementations/ReadFile.js";
import process from "process";
import { WriteFile } from "./implementations/WriteFile.js";
import { FileReceived } from "./implementations/FileReceived.js";
import { ValidateUser } from "./implementations/ValidateUser.js";
import { ValidateFile } from "./implementations/ValidateFile.js";
import {
  OperationStatus,
  operationErrorMessages,
} from "./implementations/OperationErrors.js";

const fileName = process.argv[2];
const result = FileReceived.validateFileName(fileName);

//Verifica se o arquivo foi passado como parâmetro
if (result?.status != OperationStatus.SUCCESS && result?.errors) {
  console.log("Erro", operationErrorMessages.errors.get(result?.errors[0]));
} else {
  const fileReceived = new FileReceived(fileName);
  const readFile = new ReadFile(fileReceived);
  const writeFile = new WriteFile(fileReceived);
  const validateUser = new ValidateUser();

  const validateFile = new ValidateFile(readFile, validateUser, writeFile);
  await validateFile.run();
}
