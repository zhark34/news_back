import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const NewsVideo = sequelize.define(
    "news_video",
    {

        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        video_url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        public_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        caption: {
            type: DataTypes.STRING,
            allowNull: true
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

export default NewsVideo;