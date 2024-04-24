import { Sequelize } from "sequelize";
import { DBPatient } from "./DBPatient";
import { DBSchedule } from "./DBSchedule";

export {
  DBPatient,
  DBSchedule
}

export function initModels(sequelize: Sequelize) {
  DBPatient.initModel(sequelize);
  DBSchedule.initModel(sequelize);

  DBPatient.hasMany(DBSchedule, {
    foreignKey: "patient_cpf",
    sourceKey: "cpf",
    as: "schedules",
  });

  DBSchedule.belongsTo(DBPatient, {
    foreignKey: "patient_cpf",
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  });

  return {
    DBPatient,
    DBSchedule
  }
}
