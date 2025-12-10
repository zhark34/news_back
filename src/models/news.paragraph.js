import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const NewsParagraph = sequelize.define(
    "news_paragraph",
    {

        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        content: {
            type: DataTypes.TEXT(1000),
            allowNull: false,
        },
        block_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },

    },
    {
        timestamps: true
    }
)

export default NewsParagraph;