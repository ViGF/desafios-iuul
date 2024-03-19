import { Patient, PatientProps } from "../../model/Patient";
import { PatientRepository } from "../../repositories/patient/PatientRepository";
import { VerifyPatientExists } from "./verify-patient-exists";

type IncludePatientRequest = PatientProps;

export class IncludePatient {
  constructor(private patientRepository: PatientRepository) {}

  execute({ cpf, name, birthdate }: IncludePatientRequest) {
    const cpfValidated = Patient.validateCpf(cpf);
    const nameValidated = Patient.validateName(name);
    const birthdateValidated = Patient.validateBirthdate(birthdate);
    const patientAlreadyExists = new VerifyPatientExists(
      this.patientRepository
    ).execute(cpf);

    if (patientAlreadyExists) {
      return "Paciente já cadastrado!";
    }

    if (cpfValidated.value && nameValidated.value && birthdateValidated.value) {
      const newPatient = new Patient({ cpf, name, birthdate });

      this.patientRepository.include(newPatient);
      return "Paciente cadastrado com sucesso!";
    }

    return "Erro: informações inválidas";
  }
}
