import { Request, Response } from "express";
import { ILogin } from "../Types/Types";
import {genSalt, hash} from 'bcryptjs'
import User from '../Models/User'

export default class UserController {

    static async login(req: Request,res: Response){
        const {
            name,
            email,
            password,
            confirmpassword
        } = <ILogin> req.body

        //validar se o usuário preencheu todos os campos
        if(!name){
            return res.status(422).json({
                message: 'O nome é obrigatório'
            })
        }
        if(!email){
            return res.status(422).json({
                message: 'O email é obrigatório'
            })
        }
        if(!password){
            return res.status(422).json({
                message: 'A senha é obrigatório'
            })
        }
        if(!confirmpassword){
            return res.status(422).json({
                message: 'A coonfirmação de senha é obrigatório'
            })
        }

        //Verificar se existe o email cadastrado
        const userExist = await User.findOne({
            where: {email},
            raw: true
        })
        if(userExist){
            return res.status(422).json({
                message: 'Esse email já está em uso'
            })
        }

        // Verificar se as senhas são iguais
        if(password != confirmpassword){
            return res.status(422).json({
                message: 'As senhas não combinam'
            })
        }

        //Criptografar a senha
        const salt = await genSalt(12)
        const passwordHash = await hash(password, salt)

        //criar o usuário
        const user = {
            name,
            email,
            password: passwordHash
        }

        //Salvar o usuário no banco de dados
        await User.create(user).then(()=>{
            return res.status(200).json({
                message: "Usuário criado com sucesso!!"
            })
        })
    }
}