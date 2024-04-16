import { Patient } from "../../model/Patient";
import { PatientRepository } from "../../repositories/patient/PatientRepository";

export class ListPatientsByName {
  constructor(private patientRepository: PatientRepository) {}

  execute(): Patient[] {
    const patients = this.patientRepository.findAll();

    patients.sort((a, b) => {
      const nameA = a.name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.name.toUpperCase(); // ignore upper and lowercase

      if (nameA < nameB) {
        return -1;
      } else if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    });

    return patients;
  }
}
