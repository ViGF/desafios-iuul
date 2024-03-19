import { Prompt } from "prompt-sync";
import { Patient, PatientProps } from "../../Patient";

export class InsertPatientForm {
  constructor(private prompt: Prompt) {}

  execute(): PatientProps {
    let cpf = this.prompt("CPF: ");
    while (Patient.validateCpf(cpf)?.error) {
      console.log(Patient.validateCpf(cpf).error);
      cpf = this.prompt("CPF: ");
    }

    let name = this.prompt("Nome: ");
    while (Patient.validateName(name)?.error) {
      console.log(Patient.validateName(name).error);
      name = this.prompt("Nome: ");
    }

    let birthdate = this.prompt("Data de nascimento: ");
    while (Patient.validateBirthdate(birthdate)?.error) {
      console.log(Patient.validateBirthdate(birthdate).error);
      birthdate = this.prompt("Data de nascimento: ");
    }

    return {
      cpf,
      name,
      birthdate,
    };
  }
}
