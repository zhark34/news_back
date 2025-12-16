import express from "express";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import cors from "cors";
import cookieParser from 'cookie-parser';
import journalistRoutes from './routes/journalist.routes.js'
import socialNetworks from "./routes/social.networks.routes.js";

dotenv.config();

const app = express();
app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true}));
app.use(express.json());
app.use(cookieParser());

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 1000,
    message: {
        status: 429,
        error: 'Demasiadas peticiones. Por favor, intenta de nuevo en 15 minutos.'
    },
	standardHeaders: true,
	legacyHeaders: false,
});

app.use(limiter);

app.use('/api/v1/journalist', journalistRoutes)

app.use('/api/v1/social-networks', socialNetworks)

app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

export default app;