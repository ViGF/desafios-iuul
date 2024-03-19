import { Prompt } from "prompt-sync";
import { VerifyPatientExists } from "../../../useCases/patient/verify-patient-exists";

export class DeletePatientForm {
  constructor(private prompt: Prompt) {}

  execute(verifyPatientExists: VerifyPatientExists) {
    const cpf = this.prompt("CPF: ");

    if (verifyPatientExists.execute(cpf) == undefined) {
      console.log("Erro: paciente não cadastrado");
      return;
    }

    return cpf;
  }
}
