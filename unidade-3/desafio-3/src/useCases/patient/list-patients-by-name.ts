import { Patient } from "../../model/Patient";
import { PatientRepository } from "../../repositories/patient/PatientRepository";

export class ListPatientsByName {
  constructor(private patientRepository: PatientRepository) {}

  async execute(): Promise<Patient[]> {
    const patients = await this.patientRepository.findAllOrderByName();

    const patientsTransformed = patients.map(patient => {
      return new Patient(patient)
    })

    return patientsTransformed;
  }
}
