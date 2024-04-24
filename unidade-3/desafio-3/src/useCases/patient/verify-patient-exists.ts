import { PatientRepository } from "../../repositories/patient/PatientRepository";

export class VerifyPatientExists {
  constructor(private patientRepository: PatientRepository) {}

  async execute(cpf: string) {
    const patient = await this.patientRepository.findUnique(cpf);

    return patient
  }
}
