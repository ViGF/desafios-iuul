import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";

export class DBSchedule extends Model<
  InferAttributes<DBSchedule>,
  InferCreationAttributes<DBSchedule>
> {
  declare id: CreationOptional<string>
  declare date: Date;
  declare patient_cpf: string
  declare start_hour: string;
  declare end_hour: string;

  static initModel(database: Sequelize) {
    DBSchedule.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4
        },
        patient_cpf: {
          type: DataTypes.STRING(11),
          allowNull: false,
          references: {
            model: "patients",
            key: "cpf",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        date: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        start_hour: {
          type: DataTypes.CHAR(5),
          allowNull: false,
        },
        end_hour: {
          type: DataTypes.CHAR(5),
          allowNull: false,
        },
      },
      {
        sequelize: database,
        modelName: "schedules",
        underscored: true,
      }
    );
  }
}