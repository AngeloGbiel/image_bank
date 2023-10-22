import { DataTypes, Model, Sequelize } from "sequelize";
import {sequelize} from "../db/conn"

class User extends Model {
    public id: number
    public name: string;
    public email: string;
    public password: string
}

User.init(
    {
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
    },
    {
        sequelize,
        modelName: 'User'
    }
)


export default User;



