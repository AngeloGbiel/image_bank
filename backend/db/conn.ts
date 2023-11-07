import {Sequelize} from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()

const password: string = process.env.DB_PASSWORD!;
const name_db: string = process.env.DB_NAME!;
const host: string = process.env.ENDPOINT_RDS!;
const user: string = process.env.USER_DB!;

// console.log(password, name_db, host)

export const sequelize = new Sequelize(`${name_db}`, `${user}`, `${password}`, {
    host: `${host}`,
    dialect: "mysql"
})