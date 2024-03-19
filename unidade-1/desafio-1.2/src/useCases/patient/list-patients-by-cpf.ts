import { Patient } from "../../model/Patient";
import { PatientRepository } from "../../repositories/patient/PatientRepository";

export class ListPatientsByCPF {
  constructor(private patientRepository: PatientRepository) {}

  execute(): Patient[] {
    const patients = this.patientRepository.findAll();

    patients.sort((a, b) => {
      if (a.cpf < b.cpf) {
        return -1;
      } else if (a.cpf > b.cpf) {
        return 1;
      }

      // names must be equal
      return 0;
    });

    return patients;
  }
}
