import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const News = sequelize.define(
    "news",
    {

        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
        },
        cover_photo: {
            type: DataTypes.STRING(),
            allowNull: false,
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
            primaryKey: true,
        },
        country: {
            type: DataTypes.STRING(50),
            allowNull: false,
        }

    },
    {
        timestamps: true
    }
)

export default News;