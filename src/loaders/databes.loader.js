import sequelize from "../config/db.js";
import {
    Journalist,
    Categories,
    SocialNetworks,
    News,
    NewsBlock
} from '../models/associations.js'

export const databaseLoader = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Conexión a la base de datos establecida y sincronizada.');
  } catch (error) {
    console.error('Error fatal al conectar la base de datos:', error);
    process.exit(1); 
  }
};