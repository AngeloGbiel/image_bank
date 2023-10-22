import { Model } from "sequelize";

export interface IRegister {
    name: string,
    email: string,
    password: string,
    confirmpassword: string,
}
export interface ILogin {
    email: string,
    password: string
}

export interface IAttributes{
    name: string,
    email: string,
    password: string
}
export interface UserDefine extends Model<IAttributes> {}