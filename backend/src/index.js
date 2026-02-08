import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import quizRoutes from './routes/quiz.js';
import resultsRoutes from './routes/results.js';

await connectDB();

const app = express();

const allowedOrigins = [ process.env.FRONTEND_URL, ].filter(Boolean); app.use(cors({ origin: allowedOrigins, credentials: true, }));
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://frontend-production-7228.up.railway.app' }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/results', resultsRoutes);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
