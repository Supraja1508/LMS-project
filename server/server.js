import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/mongodb.js';
import connectCloudinary from './configs/cloudinary.js';
import { clerkWebhooks } from './controllers/webhooks.js';
import educatorRouter from './routes/educatorRouter.js';
import courseRouter from './routes/courseRoute.js';
import { clerkMiddleware } from '@clerk/express';
import userRouter from './routes/userRoutes.js';

const app = express();

// Global Middleware
app.use(cors());
app.use(express.json()); // Parses JSON bodies for all routes

// Clerk Middleware
app.use(clerkMiddleware());

// Routes
app.get('/', (req, res) => res.send("API Working"));

app.post('/clerk', clerkWebhooks); // Clerk webhooks
app.use('/api/educator', educatorRouter); // Educator routes
app.use('/api/course', courseRouter); // Course routes
app.use('/api/user', express.json(), userRouter);

// Start Server
const startServer = async () => {
  try {
    await connectDB();             // MongoDB connection
    await connectCloudinary();     // Cloudinary config

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Server start failed:", error.message);
    process.exit(1);
  }
};

startServer();
