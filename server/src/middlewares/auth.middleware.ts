import {request, response, NextFunction, Request, Response} from 'express'
import * as jwt from 'jsonwebtoken';

export const checkAuth= (req:Request, res:Response, next: NextFunction)=>{
//get the token from header
const token = <string>req.headers["token"];
if(!token) return res.status(500).send('Acces Denied')

try {
    const verified = <any>jwt.verify(token, "")
    res.locals.payload = verified
    req.body.user = verified
    /*
Use this property to set variables accessible in templates rendered with res.render. 
The variables set on res.locals are available within a single request-response cycle, 
and will not be shared between requests.
    */
} catch (error) {
    res.sendStatus(401)
    return;
}

next()
};