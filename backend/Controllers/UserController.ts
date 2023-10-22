import { Request, Response } from "express";
import { IRegister,ILogin } from "../Types/Types";
import {genSalt, hash, compare} from 'bcryptjs'
import User from '../Models/User'
import createToken from "../helpers/Create-token";

interface IUserExist {
    password: string
}

export default class UserController {

    static async register(req: Request,res: Response){
        const {
            name,
            email,
            password,
            confirmpassword
        } = <IRegister> req.body

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
        await User.create(user).then((userData)=>{
            createToken(userData, res)
        })
    }
    static async login(req: Request, res: Response){
        const {
            email, 
            password
        } = <ILogin> req.body;

        //validar se o usuário preencheu todos os campos
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

        //Validar se o usuário existe
        const UserExist = await User.findOne({
            where:{email},
            raw: true
        })
        if(!UserExist){
            return res.status(422).json({
                message: "Email ou senha incorreto"
            })
        }
        
        //validar se a senha está certa
        const checkPassword = await compare(password, UserExist.password)
        if(!checkPassword){
            return res.status(422).json({
                message: "Email ou senha incorreto"
            })
        }
        createToken(UserExist, res)
    }
}