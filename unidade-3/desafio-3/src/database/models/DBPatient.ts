import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { database } from "..";

export class DBPatient extends Model<InferAttributes<DBPatient>, InferCreationAttributes<DBPatient>> {
  declare id: CreationOptional<string>;
  declare cpf: string;
  declare name: string;
  declare birthdate: string;
}

DBPatient.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    cpf: {
      type: DataTypes.STRING(11),
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthdate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    }
  },
  {
    sequelize: database,
    modelName: "patients",
    underscored: true,
  }
);
