import { Patient } from "../../model/Patient";

export interface PatientRepository {
  patients: Patient[];

  include(patient: Patient): void;
  findAll(): Patient[];
  delete(cpf: string): Patient | void;
  findUnique(cpf: string): Patient | void;
}
