import { Hono } from "hono";
import Track from "../model/track-model";
const app = new Hono();

app.get('/get-mail-status/:id', async(c) => {

    try{
        const id = c.req.param("id");
        if (!id) {
            return c.json({ error: "Tracking id is required" });
        }
    
        // Check if the tracking id exists in the database
        const track = await Track.findOne({trackingId:id});
    
        if (!track) {
            return c.json({ error: "Tracking id not found" });
        }

        return c.json({ data:track})
    }catch(err){
        console.log(err);
        return c.json({ error: "Failed to get tracking status" });
    }

     
})

export default app;