import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import appConfig from '@/app/config/app';

const transporter = nodemailer.createTransport({
    host: appConfig.mailHost,
    port: appConfig.mailPort,
    //secure: false,
    auth: {

        user: appConfig.mailUsername,
        pass: appConfig.mailPassword,
    }
});

export async function sendMail(from: string | undefined, to: string, subject: string, html: string | '', text: string | undefined) {
    try {
        
        const mailOptions: Mail.Options = {
            from: appConfig.mailFromAddress,
            to: to,
            // cc: email, (uncomment this line if you want to send a copy to the sender)
            subject: subject,
            //text: text,
            html: html,
          };

        await new Promise((resolve, reject) => {

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                reject(error)
            } else {
                console.log('Email sent: ' + info.response);
                resolve(true)
            }
        });   
    })       
    //   return payload
    } catch (error) {
      console.log('Failed to send email')
    }
  }