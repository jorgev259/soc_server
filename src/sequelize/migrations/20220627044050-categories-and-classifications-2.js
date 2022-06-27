'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('ost_category', 'className', 'categoryName')
    await queryInterface.renameColumn('ost_classification', 'categoryName', 'classificationName')
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('ost_category', 'categoryName', 'className')
    await queryInterface.renameColumn('ost_classification', 'classificationName', 'categoryName')
  }
}
