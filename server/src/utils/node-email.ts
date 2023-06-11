import * as nodemailer  from "nodemailer"
import { CONSTANT } from "../constants";

export class TerminatorEmail{
 
    public async sendActivationEmail(email_receiver:string, name:string, link:string){

        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth:{
            user: "terminator.activation@gmail.com",
            pass: "BJT_Terminator9"
          }
        })

        const data  = {
            from: "terminator.activation@gmail.com",
            to: email_receiver,
            subject:"Activation of account",
            html: `Hello '+ ${name} ,<br/> <h1> Welcome in Terminator</h1>.</br> Follow the link in order to activate your account.<a href=${link}>Activatiion </a>. <b>Thank You </b>`

          };
        
          transporter.sendMail(data,function (error, info) {
            if(error){
              console.error(error)
            }else{
              console.log("Email sent: "+ info.response)
            }
          })
        
    }
}