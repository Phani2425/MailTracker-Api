import {createTransport} from 'nodemailer';

const transport = createTransport({
    host:'smtp.gmail.com',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

export const sendEmail = async(emails:string[], trackingId:string) => {

  const trackingURL = `${Bun.env.BASE_URL}/track/track-mail/${trackingId}`

    try{
        await transport.sendMail({
            from: process.env.EMAIL_USER,
            to: emails,
            subject: 'Tracking dead pixel',
            html:`<h1>Tracking Id:- ${trackingId}</h1>
            <img src="${trackingURL}" alt="dead pixel" style="display: none;"  />`
        })
        console.log('Email sent successfully');
    }catch(err){
        console.log('Failed to send email:', err);
    }
}