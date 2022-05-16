import { DataTypes } from 'sequelize'
const model = sequelize => {
  const Class = sequelize.define('class', {
    name: {
      type: DataTypes.STRING,
      primaryKey: true
    }
  },
  {
    freezeTableName: true
  }
  )

  return Class
}

export default model
