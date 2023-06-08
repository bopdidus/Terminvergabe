import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/user"
import { UserAddress } from "../entity/address"
import * as bcrypt from "bcryptjs"
import * as Jwt from "jsonwebtoken"
import { CONSTANT } from "../constants"
import { Appointment } from "../entity/appointment"

export class AppointmentController {

    private appointmentRepository = AppDataSource.getRepository(Appointment)
    private userRepository = AppDataSource.getRepository(User)

    async all(request: Request, response: Response, next: NextFunction) {
        const appointments = await this.appointmentRepository.find()
        console.log("Test all appointments")
        return {code:200, data: appointments}  
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
            const { date, time, iduser, idclerk } = request.body;

            let appointmentUser = await this.userRepository.findOne({
                where: { id: iduser }})
            let appointmentClerk = await this.userRepository.findOne({
                where: { id: idclerk }})

            const appointment = Object.assign(new Appointment(), {
                date,
                time,
                appointmentUser,
                appointmentClerk
            })
            const saveAppointment = this.appointmentRepository.save(appointment)
            return {code:200, data: saveAppointment} 
        } catch (error) {
            return {code:500, data: error}  
        }
    }

    // Update appointment - maybe after cancelling an appointment and changing it
    async update(request: Request, response: Response, next: NextFunction) {
        try {
            const { id, date, time, iduser, idclerk } = request.body;

            let user = await this.userRepository.findOne({
                where: { id: iduser }})
            let clerk = await this.userRepository.findOne({
                where: { id: idclerk }})

            var appointment = new  Appointment()
            appointment.date = date
            appointment.time = time
            appointment.user = user
            appointment.clerk = clerk //anpassen
            const res = await this.appointmentRepository.update( {id: id}, appointment)
            return {code:201, data: res} 
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
}