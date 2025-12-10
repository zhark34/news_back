import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const NewsImage = sequelize.define(
    "news_image",
    {

        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        image_url: {
            type: DataTypes.STRING(),
            allowNull: false,
        },
        caption: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        caption: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        photo_source: {
            type: DataTypes.STRING(150),
            allowNull: false,
        }
    },
    {
        timestamps: true
    }
)

export default NewsImage;