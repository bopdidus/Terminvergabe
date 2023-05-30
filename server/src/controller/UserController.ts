import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import { UserAddress } from "../entity/address"

export class UserController {

    private userRepository = AppDataSource.getRepository(User)

    async all(request: Request, response: Response, next: NextFunction) {
        const users =  this.userRepository.find()
        return {code:200, data: users}  
    }

    async one(request: Request, response: Response, next: NextFunction) {
        try {
            const id = request.params.id

            const user = await this.userRepository.findOne({
                where: { id: id }
            })
            return response.status(201).send(user);
        }
        catch(error){
            return {code:500, data: error}  
        }
        
    }

    async save(request: Request, response: Response, next: NextFunction) {
       
        try {
            const { firstName, lastName, email, phoneNumber, password, street, city, postal } = request.body;
        const address = Object.assign(new UserAddress(), {
            street,
            city,
            postal
        }) 
        
        const user = Object.assign(new User(), {
            firstName,
            lastName,
            email,
            phoneNumber,
            address
        })
        const saveUser = this.userRepository.save(user)
        return {code: 200, data:saveUser}
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

}