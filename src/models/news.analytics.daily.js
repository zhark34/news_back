import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const NewsAnalyticsDaily = sequelize.define(
    "news_analytics_daily",
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
            type: DataTypes.DATE,
            allowNull: false
        },
        page_views: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        unique_views: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        sessions: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        avg_time_seconds: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        bounce_rate: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        exit_rate: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        scroll_25: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        scroll_50: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        scroll_75: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        scroll_100: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        trafic_direct: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        trafic_organic: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        trafic_social: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        trafic_referral: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        device_desktop: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        device_mobile: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        device_tablet: {
            type: DataTypes.INTEGER,
            allowNull: false
        },


    },
    {
        timestamps: true
    }
)

export default NewsAnalyticsDaily