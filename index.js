import { databaseLoader } from "./src/loaders/databes.loader.js";
import app from './src/app.js'

const PORT = process.env.PORT;

const startServer = async () => {
  await databaseLoader();
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en: http://localhost:${PORT}`);
  });
};

startServer();