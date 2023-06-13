import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/user"
import { UserAddress } from "../entity/address"
import * as bcrypt from "bcryptjs"
import * as Jwt from "jsonwebtoken"
import { CONSTANT } from "../constants"
import { Appointment } from "../entity/appointment"
import { Disponibility } from "../entity/disponibility"

export class AppointmentController {

    private appointmentRepository = AppDataSource.getRepository(Appointment)
    private userRepository = AppDataSource.getRepository(User)
    private DisponibilityRepository = AppDataSource.getRepository(Disponibility)

    async all(request: Request, response: Response, next: NextFunction) {
        try{            
            const appointments = await this.appointmentRepository.find({relations:{user:true, clerk:true, availability:true}})
            //console.log("Test all appointments")
            return {code:200, data: appointments}
        }
        catch(error){
            return {code:500, error}
        }  
    }

    /* returns a single appointment (apmnt) by id */
    async one(request: Request, response: Response, next: NextFunction) {
        try {
            const id = request.params.id

            const appointment = await this.appointmentRepository.findOne({
                where: { id: id }
            })
            return {code:201, data: appointment} ;
        }
        catch(error){
            return {code:500, data: error}    
        }        
    }

    /* save an appointment */
    async save(request: Request, response: Response, next: NextFunction) {
        try {
            const { disponibilityID, userID, clerkID } = request.body;

             let appointmentUser = await this.userRepository.findOne({
                 where: { id: userID }})
             let appointmentClerk = await this.userRepository.findOne({
               where: { id: clerkID }})
               let disponibilityAppointment = await this.DisponibilityRepository.findOne({ where: { id: disponibilityID }})
                console.log(appointmentClerk)
                console.log(appointmentClerk)
                console.log(disponibilityAppointment)

            const appointment = new Appointment()
            appointment.availability = disponibilityAppointment
            appointment.clerk = appointmentClerk
            appointment.user = appointmentUser

             
            const saveAppointment =await this.appointmentRepository.save(appointment)

            return {code:200, data: saveAppointment} 
        } catch (error) {
            return {code:500, data: error}  
        }
    }

    // Update appointment - maybe after cancelling an appointment and changing it
    async update(request: Request, response: Response, next: NextFunction) {
        try {
            const { id, date, time, iduser, idclerk } = request.body;

            //anpassen
            //const res = await this.appointmentRepository.update( {id: id}, appointment)
            return {code:201, data: []} 
        } catch (error) {
            return {code:500, data: error}  
        }         
    }

    // remove an appointment by id
    async remove(request: Request, response: Response, next: NextFunction) {
        try {
            const id = request.params.id

            let appointmentToRemove = await this.appointmentRepository.findOneBy({ id })
           
            let removedAppointment = await this.appointmentRepository.remove(appointmentToRemove)
    
            return {code:201, data: removedAppointment} 
        } catch (error) {
            return {code:500, data: error}   
        }
       
    }

    async getUsersAppointments(request: Request, response: Response, next: NextFunction) {
        try {
            const id = request.params.id

            let appointments = await this.appointmentRepository.find({  
                relations:{availability:true, clerk:true},
                where:{
                    user:{
                        id:id
                    }
                }
            })
            console.log(appointments)
            return {code:200, data: appointments} 
        } catch (error) {
            return {code:500, data: error}   
        }
       
    }

    async getClerkAppointments(request: Request, response: Response, next: NextFunction) {
        try {
            const id = request.params.id

            let appointments = await this.appointmentRepository.find({  
                where:{
                    clerk:{
                        id:id
                    }
                }
            })
           
           
    
            return {code:200, data: appointments} 
        } catch (error) {
            return {code:500, data: error}   
        }
       
    }


}