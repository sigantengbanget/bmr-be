import dotenv from 'dotenv'
dotenv.config()
import { Sequelize } from 'sequelize'
import { UserFactory } from './user.model.js'
import { RoomFactory } from './room.model.js'
import { BookingFactory } from './booking.model.js'
import pg from 'pg'

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
  dialectModule: pg,
})

const User = UserFactory(sequelize)
const Room = RoomFactory(sequelize)
const Booking = BookingFactory(sequelize)

User.hasMany(Booking, { foreignKey: 'userId' })
Room.hasMany(Booking, { foreignKey: 'roomId' })

Booking.belongsTo(User, { foreignKey: 'userId' })
Booking.belongsTo(Room, { foreignKey: 'roomId' })

export { sequelize, User, Room, Booking }
