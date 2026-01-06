import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const NewsGeoAnalyticsDaily = sequelize.define(
    "news_geo_analytics_daily",
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
        country_code: {
            type: DataTypes.STRING,
            allowNull: false
        },
        views: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    },
    {
        timestamps: true
    }
)

export default NewsGeoAnalyticsDaily