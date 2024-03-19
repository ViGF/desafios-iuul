import { PatientRepository } from "../../repositories/patient/PatientRepository";

export class VerifyPatientExists {
  constructor(private patientRepository: PatientRepository) {}

  execute(cpf: string) {
    const patient = this.patientRepository.findUnique(cpf);

    if (patient) {
      return patient;
    } else {
      return;
    }
  }
}
