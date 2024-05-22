import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT as string),
    //secure: false,
    auth: {

        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
    }
});

export async function sendMail(from: string | undefined, to: string, subject: string, html: string | '', text: string | undefined) {
    try {
        
        const mailOptions: Mail.Options = {
            from: process.env.MAIL_FROM_ADDRESS,
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