import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";

export class DBPatient extends Model<
  InferAttributes<DBPatient>,
  InferCreationAttributes<DBPatient>
> {
  declare id: CreationOptional<string>
  declare cpf: string;
  declare name: string;
  declare birthdate: string;

  static initModel(database: Sequelize) {
    DBPatient.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4
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
        },
      },
      {
        sequelize: database,
        modelName: "patients",
        underscored: true,
      }
    );
  }
}
