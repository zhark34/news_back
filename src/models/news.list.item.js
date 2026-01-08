import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const NewsListItem = sequelize.define(
    "news_list_item",
    {

        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        list_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        position: {
            type: DataTypes.SMALLINT,
            allowNull: false
        }

    },
    {
        timestamps: true
    }
)

export default NewsListItem