import { Hono } from "hono";
import {getConnInfo} from 'hono/bun'
import Track from "../model/track-model";

const app = new Hono();

app.get('/track-mail/:id', async(c)=>{
    const id = c.req.param('id');
    const userIp = c.req.raw.headers.get('true-client-ip') || c.req.raw.headers.get('cf-connecting-ip') || getConnInfo(c).remote.address || "0.0.0.0";

    // /checks

    if(!id) return c.json({error:"tracking id is required"})

        try{

            //check if ip is already available in db
            const track = await Track.findOne({trackingId:id})

            if(!track) return c.json({error:"tracking id not found"})

                //check if user already opened the mail
                if(track.userIPs.includes(userIp)){
                    return c.json({error:"user already opened the mail"})
                }

                //update user IP and increment opens
                track.userIPs.push(userIp);
                track.opens++;
                await track.save();

                //send dead pixel image in response

                

            

        }catch(err){
            console.log(err);
            return c.json({error:"Failed to update tracking"})
        }
})