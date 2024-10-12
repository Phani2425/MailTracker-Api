
# MailTracker API

A mail tracking API built using [Hono](https://hono.dev/), MongoDB, and hosted on [Render](https://render.com). The API tracks when an email is opened by embedding an image that, when loaded, updates the tracking information.

## Project Overview

This project allows users to track email opens by embedding a small "dead pixel" image into emails. Every time the image is requested, the API logs the user's IP address and increments an open count for the mail associated with a unique tracking ID.

### Features
- Tracks unique opens of an email via a tracking image.
- Stores and updates the tracking information in MongoDB.
- Tracks user IPs to prevent duplicate opens from the same IP.
- Provides a tracking pixel (1x1 PNG image) to embed in emails.

## Live API

The API is live at: [MailTracker API](https://mailtracker-api-n3bz.onrender.com)

### Local Development

#### 1. Clone the repository

```bash
git clone https://github.com/your-username/mailtracker-api.git
cd mailtracker-api
```

#### 2. Install dependencies

Make sure you have Bun installed. Install the project dependencies by running:

```bash
bun install
```

#### 3. MongoDB Setup

Ensure that you have a MongoDB instance running locally or remotely (e.g., MongoDB Atlas). Update your MongoDB connection string in your environment file or hardcode it into the database connection file.

Example MongoDB connection string:

```bash
MONGO_URL="your-mongodb-connection-string"
```

#### 4. Run the server

You can start the server by running:

```bash
bun run dev
```

The server should now be running at [http://localhost:3000](http://localhost:3000).

### Technologies Used

- **Node.js**: JavaScript runtime.
- **Bun.js**: A fast JavaScript runtime that focuses on performance.
- **Hono**: A fast, small web framework.
- **MongoDB**: NoSQL database for storing tracking information.
- **Render**: Cloud platform where the API is deployed.

### How it Works

1. When an email is sent, embed the tracking image URL with a unique `trackingId` (for example, `https://mailtracker-api-n3bz.onrender.com/track-mail/{trackingId}`).
2. When the recipient opens the email, the tracking image is requested from the API.
3. The API records the recipient's IP address and increments the open count in the MongoDB database.
4. The API sends back a 1x1 PNG image in response.

### Example Email Embed

Embed the following HTML in the email to track opens:

```html
<img src="https://mailtracker-api-n3bz.onrender.com/track-mail/your-tracking-id" width="1" height="1" alt="">
```

### Contact

If you have any questions or suggestions, feel free to open an issue or contact me at mohantyphanibhusan@gmail.com.

---

Feel free to modify any section to better fit your project's details!