import { NextFunction, Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { User } from "../entity/User"
import { Disponibility } from "../entity/disponibility"
import { MoreThanOrEqual } from "typeorm"

export class DisponibilityController {

    private userRepository = AppDataSource.getRepository(User)
    private disponibilityRepository = AppDataSource.getRepository(Disponibility)
  

    async all(request: Request, response: Response, next: NextFunction) {
        const disponibilities = await this.disponibilityRepository.find({relations:{user:true}})
        return {code:200, data: disponibilities}  
    }

    async one(request: Request, response: Response, next: NextFunction) {
        try {
            const id = request.params.id

            const disponibility = await this.disponibilityRepository.findOne({
                where: { id: id }
            })
            return {code:201, data: disponibility} ;
        }
        catch(error){
            return {code:500, data: error}    
        }
        
    }

    async save(request: Request, response: Response, next: NextFunction) {
       
        try {
            const {  disponibilityDate, start_time, end_time, userEmail } = request.body;
            let connectedUser = await this.userRepository.findOne({ where: { email: userEmail}})

            if(connectedUser == null || connectedUser == undefined)
            {
                return {code: 404, data:"user not found"}
            }

            
            const disponibility = new Disponibility();
             disponibility.start_time = start_time
             disponibility.end_time = end_time
             disponibility.disponibilityDate=  disponibilityDate,
             disponibility.user=   connectedUser
            
            const savedDisponibility = await this.disponibilityRepository.save(disponibility)
            return {code:200, data: savedDisponibility} 
            } catch (error) {
                return {code:500, data: error}  
            }
    }

 
    async update(request: Request, response: Response, next: NextFunction) {
        try {
            const {  disponibilityDate, start_time, end_time, id } = request.body;
            var disponibility = new  Disponibility()
            disponibility.start_time = start_time
            disponibility.end_time = end_time
            disponibility.disponibilityDate = disponibilityDate

            const res= await this.disponibilityRepository.update( {id: id}, disponibility)
            return {code:201, data: res} 
        } catch (error) {
            return {code:500, data: error}  
        }
         
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        try {
            const id = request.params.id

            let disponibilityToRemove = await this.disponibilityRepository.findOneBy({ id })
           
           let removedDisponibility = await this.disponibilityRepository.remove(disponibilityToRemove)
    
            return {code:201, data: removedDisponibility} 
        } catch (error) {
            return {code:500, data: error}   
        }
       
    }

    async getTimes(request: Request, response: Response, next: NextFunction){
        const id = request.params.id
        const currentDate = new Date()
        // let userForDisponibilities = await this.userRepository.findOneBy({ id })
        let disponibilities = await this.disponibilityRepository.find({
           
            where:{
                user:{
                    id:id
                },
                disponibilityDate:MoreThanOrEqual(currentDate)
            }
            })
        return {code:201, data: disponibilities}
    }

}