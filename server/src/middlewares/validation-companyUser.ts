import * as joi from "joi"

export const validationRegisterObject = (schema: joi.Schema, data:any) =>{
    return (req, res, next)=>{
        const { error } = schema.validate(data);
        console.log(error)
        const valid = error == null
        if(valid)
        {
            next();
        }else { 
        const { details } = error; 
        const message = details.map(i => i.message).join(',');
     
        console.log("error", message); 
       res.status(422).json({ error: message })
         } 
      } 
    }
    
    