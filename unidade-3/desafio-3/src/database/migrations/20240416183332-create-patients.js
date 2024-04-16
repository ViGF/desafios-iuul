"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("patients", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      cpf: {
        type: Sequelize.STRING(11),
        allowNull: false,
        unique: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      birthdate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("patients");
  },
};
