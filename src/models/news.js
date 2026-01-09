import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const News = sequelize.define(
    "news",
    {

        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        cover_photo: {
            type: DataTypes.STRING(),
            allowNull: false,
        },
        cover_photo_public_id: {
            type: DataTypes.STRING(),
            allowNull: true,
        },
        category: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING(350),
            allowNull: false,
        },
        journalist_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        news_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            unique: true
        },

    },
    {
        timestamps: true
    }
)

export default News;