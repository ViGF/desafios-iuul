import { Patient } from "../../model/Patient";
import { PatientRepository } from "./PatientRepository";

export class InMemoryPatientRepository implements PatientRepository {
  patients: Patient[] = [
    // new Patient({
    //   cpf: "18219822821",
    //   name: "Marcelo",
    //   birthdate: "10/08/2000",
    // }),
    // new Patient({
    //   cpf: "31081862807",
    //   name: "Paula",
    //   birthdate: "10/08/2000",
    // }),
    // new Patient({
    //   cpf: "26050431850",
    //   name: "Andre",
    //   birthdate: "10/08/2000",
    // }),
  ];

  include(patient: Patient): void {
    this.patients.push(patient);
    return;
  }

  findAll(): Patient[] {
    return this.patients;
  }

  delete(cpf: string): Patient | void {
    const patient = this.findUnique(cpf);

    if (patient) {
      this.patients = this.patients.filter(
        (patientInMemory) => patientInMemory.cpf != patient.cpf
      );

      return patient;
    } else {
      return;
    }
  }

  findUnique(cpf: string): Patient | void {
    const patientIndex = this.patients.findIndex(
      (patient) => patient.cpf == cpf
    );

    if (patientIndex == -1) {
      return;
    } else {
      const patient = this.patients[patientIndex];

      return patient;
    }
  }
}
