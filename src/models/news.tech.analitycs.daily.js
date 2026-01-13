import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const NewsTechAnalitycsDaily = sequelize.define(
    "news_tech_analitycs_daily",
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        news_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        browser: {
            type: DataTypes.STRING,
            allowNull: false
        },
        os: {
            type: DataTypes.STRING,
            allowNull: false
        },
        device: {
            type: DataTypes.STRING,
            allowNull: false
        },
        total_load_time_ms: {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: 0
        },
        total_requests: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        errors_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    },
    {
        timestamps: true
    }
);


export default NewsTechAnalitycsDaily