import dotenv from 'dotenv'
dotenv.config()
import express from "express";
import { sequelize } from './src/models/index.js'
import cors from 'cors'
import router from './src/routes/index.js';

const app = express()
sequelize.sync({ alter: true }).then(() => {
  console.log('Database synced')
})
app.use(cors({
  origin : '*'
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', router) 

app.listen(5000,  () => {
    console.log("Server is running on port 5000")
})