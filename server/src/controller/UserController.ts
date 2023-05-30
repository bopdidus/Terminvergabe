import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import { UserAddress } from "../entity/address"

export class UserController {

    private userRepository = AppDataSource.getRepository(User)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = request.params.id

        const user = await this.userRepository.findOne({
            where: { id: id }
        })

        if (!user) {
            return "unregistered user"
        }
        return user
    }

    async save(request: Request, response: Response, next: NextFunction) {
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

        return this.userRepository.save(user)
    }

    async update(request: Request, response: Response, next: NextFunction) {
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
              
        return  res

         
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let userToRemove = await this.userRepository.findOneBy({ id })

        if (!userToRemove) {
            return "this user not exist"
        }

        await this.userRepository.remove(userToRemove)

        return "user has been removed"
    }

}