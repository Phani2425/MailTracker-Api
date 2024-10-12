import { Hono } from "hono";
import { getConnInfo } from "hono/bun";
import Track from "../model/track-model";
import { promises as fs } from "fs";

const app = new Hono();

// Buffer to store the image, initialized later
let imageBuffer: Buffer | null = null;

// Function to load the image buffer
const loadImageBuffer = async () => {
  try {
    // Use process.cwd() to get the current working directory and construct the absolute path
    const imagePath = process.cwd() + "/src/assets/image.png"; 
    imageBuffer = await fs.readFile(imagePath);
  } catch (err) {
    console.error("Error loading image:", err);
  }
};

// Immediately load the image buffer when the server starts
loadImageBuffer();

app.get("/track-mail/:id", async (c) => {
  const id = c.req.param("id");
  const userIp =
    c.req.raw.headers.get("true-client-ip") ||
    c.req.raw.headers.get("cf-connecting-ip") ||
    getConnInfo(c).remote.address ||
    "0.0.0.0";

  if (!id) return c.json({ error: "tracking id is required" });

  try {
    // Check if IP is already available in db
    const track = await Track.findOne({ trackingId: id });
    if (!track) return c.json({ error: "tracking id not found" });

    // Check if user already opened the mail
    if (track.userIPs.includes(userIp)) {
      return c.json({ error: "user already opened the mail" });
    }

    // Update user IP and increment opens
    track.userIPs.push(userIp);
    track.opens++;
    await track.save();

    // Ensure image buffer is loaded before sending it
    if (!imageBuffer) {
      return c.json({ error: "Image buffer not loaded" });
    }

    // Send dead pixel image in response
    return new Response(imageBuffer, {
      headers: {
        "Content-Type": "image/png",
        "Content-Length": imageBuffer.length.toString(),
      },
    });
  } catch (err) {
    console.error("Error updating tracking:", err);
    return c.json({ error: "Failed to update tracking" });
  }
});

export default app;
