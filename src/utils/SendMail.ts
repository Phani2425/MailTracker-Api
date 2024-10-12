import {createTransport} from 'nodemailer';

const transport = createTransport({
    host:'smtp.gmail.com',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

const sendEmail = async(emails:string[], trackingId:string) => {
    try{
        await transport.sendMail({
            from: process.env.EMAIL_USER,
            to: emails,
            subject: 'Tracking dead pixel',
            html:`<h1>Tracking Id:- ${trackingId}</h1>`
        })
        console.log('Email sent successfully');
    }catch(err){
        console.log('Failed to send email:', err);
    }
}