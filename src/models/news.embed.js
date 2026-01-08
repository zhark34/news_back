import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const NewsEmbed = sequelize.define(
    "news_embed",
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        embed_code: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        provider: {
            type: DataTypes.STRING,
            allowNull: false
        },
        block_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        news_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        }
    },
    {
        timestamps: true
    }
)

export default NewsEmbed
