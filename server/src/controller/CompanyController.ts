import { NextFunction, Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { UserAddress } from "../entity/address"
import { Company } from "../entity/company"
import { CONSTANT } from "../constants"
import * as bcrypt from "bcryptjs"
import * as Jwt from "jsonwebtoken"

export class CompanyController {

    private companyRepository = AppDataSource.getRepository(Company)
    private addressRepository = AppDataSource.getRepository(UserAddress)
  

    async all(request: Request, response: Response, next: NextFunction) {
        const companies = await this.companyRepository.find()
        return {code:200, data: companies}  
    }

    async one(request: Request, response: Response, next: NextFunction) {
        try {
            const id = request.params.id

            const company = await this.companyRepository.findOne({
                where: { id: id }
            })
            return {code:201, data: company} ;
        }
        catch(error){
            return {code:500, data: error}    
        }
        
    }

    async save(request: Request, response: Response, next: NextFunction) {
       
        try {
            const {  name, email, phoneNumber, birthdate, street, city, postal } = request.body;
            const checkEmail = await this.companyRepository.findOne({where:{email: email}})    
            if(checkEmail) return {code:400, data:"Email already exist"}
            let addr = await this.addressRepository.findOne({ where: { street: street, city: city}})
        if(addr == null || addr == undefined)
        {
            addr = Object.assign(new UserAddress(), {
                street,
                city,
                postal
            }) 
           addr = await this.addressRepository.save(addr)
        }


        //calcul  of hash

        const salt = await bcrypt.genSalt(15)
        const hashPassword = await bcrypt.hash(request.body.password, salt)
        const password = hashPassword
        const company = Object.assign(new Company(), {
            name,
            birthdate,
            email,
            password,
            phoneNumber,
            addr
        })
        const saveUser = this.companyRepository.save(company)
        return {code:200, data: saveUser} 
        } catch (error) {
            return {code:500, data: error}  
        }
    }

    async login(request:Request, response:Response, next: NextFunction){
        try {
            if(request.body.email!= undefined && request.body.password != null){
                const salt = await bcrypt.genSalt(15)
                const hashPassword = await bcrypt.hash(request.body.password, salt)
                const user = await this.companyRepository.findOneOrFail({
                        where:{
                            email:request.body.email
                        }
                    })

                    if(!user) return { code:404, data:"User does not exist"}
                    const validPass = await bcrypt.compare(request.body.password, user.password)
                    if(!validPass) return response.status(404).send("Email or Password is Wrong");
                    const token = Jwt.sign({_id: user.id}, CONSTANT.SECRET, {expiresIn:"1h"})
                    return {code:200, data:{"result": user, "token": token}}
            }
            else{
                 return { code:400, data:"No parameters"}
            }
            
        } catch (error) {
            return {code:500, data: error} 
        }
    }

    async update(request: Request, response: Response, next: NextFunction) {
        try {
            const { name,  email, phoneNumber, password, street, city, postal,id } = request.body;
            var company = new  Company()
            company.name = name
            company.email = email
            company.phoneNumber = phoneNumber
            company.password = password
            company.address.city = city
            company.address.street = street
            company.address.postal = postal
            const res= await this.companyRepository.update( {id: id}, company)
            return {code:201, data: res} 
        } catch (error) {
            return {code:500, data: error}  
        }
         
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        try {
            const id = request.params.id

            let userToRemove = await this.companyRepository.findOneBy({ id })
           
           let removedUser = await this.companyRepository.remove(userToRemove)
    
            return {code:201, data: removedUser} 
        } catch (error) {
            return {code:500, data: error}   
        }
       
    }

}