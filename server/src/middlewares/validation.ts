import { validationRegisterObject} from "./validation-simpleUser";
import { RegisterObjectSimpleUser} from "./schemaModel";
import * as Joi from "joi";

export const CheckRequest = (req, res, next)=>{
    const { error } = RegisterObjectSimpleUser.validate(req.body);
        const valid = error == null
        if(valid)
        {
           return next();
        }else { 
        const { details } = error; 
        const message = details.map(i => i.message).join(',');
     
        console.log("error", message); 
         return res.status(422).json({ error: message })
         } 

}