import {Sequelize} from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()

const password: string = "Ab12345*";
const name_db: string = "imagebank"

export const sequelize = new Sequelize(name_db, 'root', password, {
    host: "localhost",
    dialect: "mysql"
})


