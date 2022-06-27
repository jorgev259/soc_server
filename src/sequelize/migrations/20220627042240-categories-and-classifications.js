'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameTable('category', 'classification')
    await queryInterface.renameTable('ost_category', 'ost_classification')

    await queryInterface.renameTable('class', 'category')
    await queryInterface.renameTable('ost_class', 'ost_category')
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameTable('category', 'class')
    await queryInterface.renameTable('ost_category', 'ost_class')

    await queryInterface.renameTable('classification', 'category')
    await queryInterface.renameTable('ost_classification', 'ost_category')
  }
}
