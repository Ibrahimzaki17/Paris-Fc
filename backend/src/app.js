import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.resolve("uploads")));

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

//http://localhost:5000/api/players

export default app