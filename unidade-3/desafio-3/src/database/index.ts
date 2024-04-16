import { Sequelize } from "sequelize";
import * as databaseConfig from "../config/database";

export const database = new Sequelize(databaseConfig);