import jwt from 'jsonwebtoken';
import {Response} from 'express'
import {config} from 'dotenv'
import { IToken } from '../Types/Types';
config()

console.log(process.env.TOKEN_SECRET)
const KeyTokenSecret = process.env.TOKEN_SECRET;

const createToken = (user:IToken, res: Response) =>{
    const subject = String(user.id)
    const token = jwt.sign({
        name: user.name,
        id: user.id
    },'KeyTokenSecret',{
        subject: subject,
        expiresIn: '1h'
    })
    res.status(200).send(token)
}
export default createToken;