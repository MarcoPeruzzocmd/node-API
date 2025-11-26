'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('contact', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      customer_id: {
        type: Sequelize.INTEGER,
        references: {model: 'customers', key: "id"},
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      created_at:{
        type: Sequelize.DATE,
        allowNull: false
      },
      update_at:{
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable('users');

}};
