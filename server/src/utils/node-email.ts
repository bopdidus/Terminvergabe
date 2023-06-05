import { Client, SendEmailV3_1, LibraryResponse }  from "node-mailjet"
import { CONSTANT } from "../constants";

export class TerminatorEmail{
 
    public async sendActivationEmail(email_receiver:string, link:string){

        const mailjet = new Client({
            apiKey: CONSTANT.APIKEY_PUBLIC,
            apiSecret: CONSTANT.APIKEY_PRIVATE
        });
        const data: SendEmailV3_1.Body = {
            Messages: [
              {
                From: {
                  Email: 'bopdidus@gmx.de',
                  Name:"Terminator"
                },
                To: [
                  {
                    Email: email_receiver,
                  },
                ],
               
                Subject: 'Activation account',
                HTMLPart: `<h3>Dear user, welcome to Terminator!</h3><br/>Thanks for using our application!</br> Click this link to activate your account ${link}`,
              },
            ],
          };
          const result: LibraryResponse<SendEmailV3_1.Response> = await mailjet
          .post('send', { version: 'v3.1' })
          .request(data);

        const { Status } = result.body.Messages[0];
        console.log(Status)
    }
}