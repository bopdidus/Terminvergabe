import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import { UserAddress } from "../entity/address"
import * as bcrypt from "bcryptjs"
import * as Jwt from "jsonwebtoken"
import { CONSTANT } from "../constants"
import { TerminatorEmail } from "../utils/node-email"
import { Company } from "../entity/company"

export class UserController {

    private userRepository = AppDataSource.getRepository(User)
    private addressRepository = AppDataSource.getRepository(UserAddress)
    private companyRepository = AppDataSource.getRepository(Company)
  

    async all(request: Request, response: Response, next: NextFunction) {
        const users = await this.userRepository.find()
        return {code:200, data: users}  
    }

    async one(request: Request, response: Response, next: NextFunction) {
        try {
            const id = request.params.id

            const user = await this.userRepository.findOne({
                where: { id: id }
            })
            return {code:201, data: user} ;
        }
        catch(error){
            return {code:500, data: error}    
        }
        
    }

    async save(request: Request, response: Response, next: NextFunction) {
       
        try {
            const { firstName, lastName, email, phoneNumber, birthdate, street, city, postal } = request.body;
            const checkEmail = await this.userRepository.findOne({where:{email: email}})    
            //let terminator =new TerminatorEmail()
            if(checkEmail) return {code:400, data:"Email already exist"}
           // await terminator.sendActivationEmail(email,"http://localhost:3000/account/activation")
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
        const user = Object.assign(new User(), {
            firstName,
            lastName,
            birthdate,
            email,
            password,
            phoneNumber,
            addr
        })
        const saveUser = this.userRepository.save(user)
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
                const user = await this.userRepository.findOneOrFail({
                        where:{
                            email:request.body.email
                        }
                    })

                    if(!user) return { code:404, data:"User does not exist"}
                    const validPass = await bcrypt.compare(request.body.password, user.password)
                    if(!validPass) return response.status(404).send("Email or Password is Wrong");
                    const token = Jwt.sign({_id: user.email}, CONSTANT.SECRET, {expiresIn:"1h"})
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
            const { firstName, lastName, email, phoneNumber, password, street, city, postal,id } = request.body;
            var user = new  User()
            user.firstName = firstName
            user.lastName = lastName
            user.email = email
            user.phoneNumber = phoneNumber
            user.password = password
            user.address.city = city
            user.address.street = street
            user.address.postal = postal
            const res= await this.userRepository.update( {id: id}, user)
            return {code:201, data: res} 
        } catch (error) {
            return {code:500, data: error}  
        }
         
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        try {
            const id = request.params.id

            let userToRemove = await this.userRepository.findOneBy({ id })
           
           let removedUser = await this.userRepository.remove(userToRemove)
    
            return {code:201, data: removedUser} 
        } catch (error) {
            return {code:500, data: error}   
        }
       
    }

    async allClerks(request: Request, response: Response, next: NextFunction) {
        console.log("getting all clerks")
        // const clerkQueryResult = await this.userRepository
        //     .createQueryBuilder("user")
        //     .select("user.firstName", "user.lastName")
        //     .where("user.email = :email", { email: "behoerde@bochum.de"})
        //     .getMany()
        
        // for (let i in clerkQueryResult  ){
        //     console.log("step")
        //     console.log(i)
        // }
        // console.log(clerkQueryResult) //Was not able to create a working Query
        
        // const clerks = await this.companyRepository.find({}) //brauchen
        const usersClerks = await this.userRepository.find({
            where: [
              {email: "behoerde@bochum.de"},
              {email: "zk.behoerde@bochum.de"},
              {email: "ak.behoerde@bochum.de"},
              ]
            })
        return {code:200, data: usersClerks}  
    }

}