import express from "express";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import { databaseLoader } from "./src/loaders/databes.loader.js";

dotenv.config();

const PORT = process.env.PORT;

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

const startServer = async () => {
  await databaseLoader();
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en: http://localhost:${PORT}`);
  });
};

startServer();