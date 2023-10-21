import { DataTypes } from "sequelize";
import conn from "../db/conn";

const User = conn.define('User',{
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
})

export default User;



