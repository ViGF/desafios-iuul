import { Error, ModelStatic } from "sequelize";
import { DBPatient } from "../../database/models/DBPatient";
import { Patient, PatientProps } from "../../model/Patient";
import { PatientRepository } from "./PatientRepository";

export class PatientRepositoryImplementation implements PatientRepository {
  model: ModelStatic<DBPatient> = DBPatient;

  async include(patient: Patient): Promise<PatientProps | void> {
    try {
      const result = await this.model.create({
        birthdate: Patient.getDateObjet(patient.birthdate).toUTCString(),
        name: patient.name,
        cpf: patient.cpf,
      })

      return result.toJSON()
    } catch (error) {
      return;
    }
  }

  async findAll(): Promise<DBPatient[]> {
    const patients = await this.model.findAll();
    console.log(patients);

    return patients;
  }

  // delete(cpf: string): Patient | void {
  //   const patient = this.findUnique(cpf);

  //   if (patient) {
  //     this.patients = this.patients.filter(
  //       (patientInMemory) => patientInMemory.cpf != patient.cpf
  //     );

  //     return patient;
  //   } else {
  //     return;
  //   }
  // }

  // findUnique(cpf: string): Patient | void {
  //   const patientIndex = this.patients.findIndex(
  //     (patient) => patient.cpf == cpf
  //   );

  //   if (patientIndex == -1) {
  //     return;
  //   } else {
  //     const patient = this.patients[patientIndex];

  //     return patient;
  //   }
  // }
}
