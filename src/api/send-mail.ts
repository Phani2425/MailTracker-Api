import { Hono } from "hono"
import {v4 as uuid} from "uuid"
import Track from "../model/track-model";
import { sendEmail } from "../utils/SendMail";


const app = new Hono();

app.post('/send-mail', async(c) => {
    const {emails, password} = await c.req.json();

    //checks
    if(!emails || !password) return c.json({error : "emails and passowrd are required"});

    if (password !== Bun.env.PASSWORD){
        return c.json({error : "incorrect password"});
    }


    const trackingId = uuid();

    try{

        await Track.create({trackingId});
        await sendEmail(emails,trackingId);

        return c.json({message : "Email sent successfully", trackingId});

    }catch(err){
        console.log(err);
        return c.json({error : "Failed to send email"});

    }

    
})

export default app;