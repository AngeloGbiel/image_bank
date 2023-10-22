import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db/conn";
import User from "./User";

class Images extends Model {
    image: string;
    title: string;
    description?: string;
    user: object;
}

Images.init({
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    user: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},{
    sequelize,
    modelName: 'Images'
})

Images.belongsTo(User)
User.hasMany(Images)

export default Images;