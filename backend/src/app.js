import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

//routes import
import playerRouter from './routes/player.route.js';
import coachRouter from './routes/coach.route.js'

//routes application
app.use('/api', playerRouter);
app.use('/api', coachRouter)

//http://localhost:5000/api/players

export default app