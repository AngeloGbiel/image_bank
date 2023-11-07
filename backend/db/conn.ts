import {Sequelize} from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()

const password: string = process.env.DB_PASSWORD!;
const name_db: string = process.env.DB_NAME!;

export const sequelize = new Sequelize(name_db, 'root', password, {
    host: "db",
    dialect: "mysql"
})


