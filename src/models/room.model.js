import { DataTypes } from 'sequelize'

export const RoomFactory = (sequelize) => {
  return sequelize.define('Room', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    capacity : {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  })
}
