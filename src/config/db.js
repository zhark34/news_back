import { Sequelize } from "sequelize";
import pg from 'pg';
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL_UNPOOLED, {
  dialect: "postgres",
  dialectModule: pg,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  pool: {
    max: 2,
    min: 0,
    idle: 0,
    acquire: 30000,
  },
  logging: false
});

export default sequelize;
