import { Patient, PatientProps } from "../../model/Patient";
import { PatientRepository } from "../../repositories/patient/PatientRepository";
import { VerifyPatientExists } from "./verify-patient-exists";

type IncludePatientRequest = PatientProps;

export class IncludePatient {
  constructor(private patientRepository: PatientRepository) {}

  async execute({ cpf, name, birthdate }: IncludePatientRequest) {
    const cpfValidated = Patient.validateCpf(cpf);
    const nameValidated = Patient.validateName(name);
    const birthdateValidated = Patient.validateBirthdate(birthdate);
    const patientAlreadyExists = await new VerifyPatientExists(
      this.patientRepository
    ).execute(cpf);

    if (patientAlreadyExists) {
      return "Paciente já cadastrado!";
    }

    if (cpfValidated.value && nameValidated.value && birthdateValidated.value) {
      const patientProps = {
        cpf,
        name,
        birthdate: Patient.getDateObjet(birthdate).toUTCString()
      }

      const result = await this.patientRepository.include(patientProps);
      
      if (result) {
        return "Paciente cadastrado com sucesso!";
      } else {
        return "Erro: Não foi possível salvar as informações";
      }
    }

    return "Erro: informações inválidas";
  }
}
