import express from "express";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import sequelize from "./src/config/db.js";
import {
    Journalist,
    Categories,
    SocialNetworks,
    News,
    NewsBlock
} from './src/models/associations.js'

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

app.listen(PORT, async () => {
  try{

    await sequelize.sync({ alter: true });
    console.log('Conexión a la base de datos establecida con éxito.');

    app.listen(PORT, () => {
        console.log(`Servidor corriendo en: http://localhost:${PORT}`);
    });

  }catch (error) {
        console.error('Error al conectar con la base de datos:', error);
    }
});