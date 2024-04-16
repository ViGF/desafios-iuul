import { ModelStatic } from "sequelize";
import { DBPatient } from "../../database/models/DBPatient";
import { Patient, PatientProps } from "../../model/Patient";

export interface PatientRepository {
  model: ModelStatic<DBPatient>;

  include(patient: Patient): Promise<PatientProps | void>;
  findAll(): Promise<PatientProps[] | void>;
  //delete(cpf: string): Patient | void;
  //findUnique(cpf: string): Patient | void;
}
