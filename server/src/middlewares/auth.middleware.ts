import {request, response, NextFunction, Request, Response} from 'express'
import * as jwt from 'jsonwebtoken';
import { CONSTANT } from '../constants';

export const checkAuth= (req:Request, res:Response, next: NextFunction)=>{
//get the token from header
const token = <string>req.headers.authorization;
if(!token) return res.status(401).send('Acces Denied')

try {
    const verified = <any>jwt.verify(token, CONSTANT.SECRET)
    if(verified != null && verified != undefined )
    {
        return next()
    }
    else
    {
       return res.sendStatus(401)
    }

} catch (error) {
    
    return res.sendStatus(500);
}

next()
};