import {request, response, NextFunction, Request, Response} from 'express'
import * as jwt from 'jsonwebtoken';

export const checkAuth= (req:Request, res:Response, next: NextFunction)=>{
//get the token from header
const token = <string>req.headers["token"];
if(!token) return res.status(401).send('Acces Denied')

try {
    const verified = <any>jwt.verify(token, process.env.SECRET)
    if(verified != null && verified != undefined )
    {
        next()
    }
    else
    {
        res.sendStatus(401)
    }

} catch (error) {
    res.sendStatus(500)
    return;
}

next()
};