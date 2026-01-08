import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const NewsStatus = sequelize.define(
    "news_status",
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        status: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        message: {
            type: DataTypes.STRING(1000),
            allowNull: false,
        },
        news_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            unique: true
        }
    },
    {
        timestamps: true
    }
)

export default NewsStatus;
