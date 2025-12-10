import express from "express";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();
app.use(express.json());

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 100,
    message: {
        status: 429,
        error: 'Demasiadas peticiones. Por favor, intenta de nuevo en 15 minutos.'
    },
	standardHeaders: true,
	legacyHeaders: false,
});

app.use(limiter);

app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

export default app;