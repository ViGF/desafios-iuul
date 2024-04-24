import { ModelStatic } from "sequelize";
import { DBPatient } from "../../database/models/DBPatient";
import { PatientProps } from "../../model/Patient";
import { PatientRepository } from "./PatientRepository";

export class PatientRepositoryImplementation implements PatientRepository {
  model: ModelStatic<DBPatient> = DBPatient;

  async include(patient: PatientProps): Promise<PatientProps | void> {
    try {
      const result = await this.model.create({
        birthdate: patient.birthdate,
        name: patient.name,
        cpf: patient.cpf,
      });

      return result.toJSON();
    } catch (error) {
      return;
    }
  }

  async findAll(): Promise<PatientProps[]> {
    try {
      const patients = await this.model.findAll();

      return patients;
    } catch (error) {
      return [];
    }
  }

  async findUnique(cpf: string): Promise<PatientProps | void> {
    try {
      const patient = await this.model.findOne({
        where: {
          cpf
        }
      })

      return patient?.toJSON();
    } catch (error) {
      console.log(error)
      return;
    }
  }

  async delete(cpf: string): Promise<number | void> {
    try {
      const patient = await this.model.destroy({
        where: {
          cpf,
        },
      });

      return patient;
    } catch (error) {
      return;
    }
  }

  async findAllOrderByCpf(): Promise<PatientProps[]> {
    try {
      const patients = await this.model.findAll({
        order: [["cpf", "ASC"]],
      });

      return patients;
    } catch (error) {
      return [];
    }
  }

  async findAllOrderByName(): Promise<PatientProps[]> {
    try {
      const patients = await this.model.findAll({
        order: [["name", "ASC"]],
      });

      return patients;
    } catch (error) {
      return [];
    }
  }
}
