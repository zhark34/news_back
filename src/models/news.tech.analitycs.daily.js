import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const NewsTechAnalitycsDaily = sequelize.define(
    "news_tech_analitycs_daily",
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        news_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
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
        avg_load_time_ms: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        errors_count: {
            type: DataTypes.INTEGER,
            allowNull: false
        }

    },
    {
        timestamps: true
    }
)

export default NewsTechAnalitycsDaily