import express from 'express';
import cors from 'cors';

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";

const app = express();

app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173/",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));


//routes import
import authRouter from './routes/auth.route.js';
import playerRouter from './routes/player.route.js';
import coachRouter from './routes/coach.route.js';
import matchRouter from './routes/match.route.js';
import announcementRouter from './routes/announcement.route.js';
import dashboardRouter from './routes/dashboard.route.js';
import publicRouter from './routes/public.route.js'

//routes application
app.use('/api/auth', authRouter);
app.use('/api', playerRouter);
app.use('/api', coachRouter);
app.use('/api', matchRouter);
app.use('/api', announcementRouter);
app.use('/api', dashboardRouter);
app.use('/api/public', publicRouter)

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

//http://localhost:3000/api/

export default app