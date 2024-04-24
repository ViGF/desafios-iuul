import { ModelStatic } from "sequelize";
import { DBPatient } from "../../database/models/DBPatient";
import { Patient, PatientProps } from "../../model/Patient";

export interface PatientRepository {
  model: ModelStatic<DBPatient>;

  include(patient: PatientProps): Promise<PatientProps | void>;
  findAll(): Promise<PatientProps[]>;
  findUnique(cpf: string): Promise<PatientProps | void>;
  delete(cpf: string): Promise<number | void>;
  findAllOrderByCpf(): Promise<PatientProps[]>;
  findAllOrderByName(): Promise<PatientProps[]>;
}
