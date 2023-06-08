import * as Joi from "joi"

export const RegisterObjectSimpleUser = Joi.object().keys({
    lastName: Joi.string().alphanum().min(2).max(30).required(),
    firstName: Joi.string().alphanum().min(3).max(30).optional(),
    birthdate: Joi.date().max(new Date()),
    email: Joi.string().pattern( new RegExp("^[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}$")).required(),
    phoneNumber: Joi.number().optional(),
    password: Joi.string().alphanum().required(),
    street: Joi.string().min(2).max(100).required(),
    city: Joi.string().alphanum().min(2).max(100).required(),
    postal:Joi.number().required()
})

export const RegisterObjectCompanyUser = Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().pattern( new RegExp("^[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}$")).required(),
    phoneNumber: Joi.number().required(),
    password: Joi.string().alphanum().required(),
    street: Joi.string().min(2).max(100).required(),
    city: Joi.string().alphanum().min(2).max(100).required(),
    postal:Joi.number().required()
})

export const LoginUserModel = Joi.object().keys({
    email: Joi.string().pattern( new RegExp("^[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}$")).required(),
    password: Joi.string().alphanum().required(),
})