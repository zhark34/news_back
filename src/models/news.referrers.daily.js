import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const NewsReferrersDaily = sequelize.define(
    "news_referrers_daily",
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
        referrer_domain: {
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

export default NewsReferrersDaily
