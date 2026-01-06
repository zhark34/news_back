import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const NewsAnalyticsRealtime = sequelize.define(
    "news_analytics_realtime",
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
        bucket_time: {
            type: DataTypes.DATE,
            allowNull: false
        },
        active_views: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

    },
    {
        timestamps: true
    }
)

export default NewsAnalyticsRealtime;
