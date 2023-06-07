import { validationRegisterObject} from "./validation-simpleUser";
import { LoginUserModel, RegisterObjectCompanyUser, RegisterObjectSimpleUser} from "./schemaModel";
import * as Joi from "joi";

export const CheckRequestUser = (req, res, next)=>{
    const { error } = RegisterObjectSimpleUser.validate(req.body);
        console.log(error)
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

export const CheckRequestCompany = (req, res, next)=>{
    const { error } = RegisterObjectCompanyUser.validate(req.body);
        console.log(error)
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

export const CheckRequestLogin = (req, res, next)=>{
    const { error } = LoginUserModel.validate(req.body);
        console.log(error)
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