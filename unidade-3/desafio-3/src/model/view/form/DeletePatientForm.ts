import { Prompt } from "prompt-sync";
import { VerifyPatientExists } from "../../../useCases/patient/verify-patient-exists";

export class DeletePatientForm {
  constructor(private prompt: Prompt) {}

  async execute(verifyPatientExists: VerifyPatientExists) {
    const cpf = this.prompt("CPF: ");

    const patientExists = await verifyPatientExists.execute(cpf)

    if (!patientExists) {
      console.log("Erro: paciente não cadastrado");
      return;
    }

    return cpf;
  }
}
