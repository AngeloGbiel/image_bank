import jwt from 'jsonwebtoken'
import {Request, Response, NextFunction} from 'express'
import {config} from 'dotenv'
config()

const KeyTokenSecret = process.env.TOKEN_SECRET || 'chavemuitosupersecreta';

//criar um middleware de autenticação
const authenticate = (req:Request,res:Response,next:NextFunction) =>{
    const authToken = req.headers.authorization;
    if(!authToken){
        return res.status(401).json({
            message: "Token está faltando!!"
        })
    }
    const [, token] = authToken.split(' ');
    try {
        jwt.verify(token, KeyTokenSecret);
        next()
    } catch (error) {
        return res.status(401).json({
            message: 'Token invalid!'
        })
    }
}

export default authenticate