import jwt from "jsonwebtoken";
import {config} from 'dotenv'
config()

const KeyTokenSecret = process.env.TOKEN_SECRET || 'chavemuitosupersecreta';

const getToken = (auth:string) =>{
    const [, token] = auth.split(' ');
    try {
        const currentUserAuthenticate = jwt.verify(token, KeyTokenSecret)
        return currentUserAuthenticate
    } catch (error) {
        return error
    }
}

export default getToken;