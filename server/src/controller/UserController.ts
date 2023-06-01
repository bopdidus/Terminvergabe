import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import { UserAddress } from "../entity/address"
import * as bcrypt from "bcryptjs"

export class UserController {

    private userRepository = AppDataSource.getRepository(User)
    private addressRepository = AppDataSource.getRepository(UserAddress)
  

    async all(request: Request, response: Response, next: NextFunction) {
        this.userRepository = AppDataSource.getRepository(User)
        const users = await this.userRepository.find()
        return {code:200, data: users}  
    }

    async one(request: Request, response: Response, next: NextFunction) {
        try {
            this.userRepository = AppDataSource.getRepository(User)
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
            
            if(checkEmail) return {code:400, data:"Email already exist"}
            
            let addr = await this.addressRepository.findOne({ where: { street: street, city: city}})
        if(addr == null || addr == undefined)
        {
            addr = Object.assign(new UserAddress(), {
                street,
                city,
                postal
            }) 
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

    async update(request: Request, response: Response, next: NextFunction) {
        try {
            this.userRepository = AppDataSource.getRepository(User)
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
            this.userRepository = AppDataSource.getRepository(User)
            const id = request.params.id

            let userToRemove = await this.userRepository.findOneBy({ id })
           
           let removedUser = await this.userRepository.remove(userToRemove)
    
            return {code:201, data: removedUser} 
        } catch (error) {
            return {code:500, data: error}   
        }
       
    }

}