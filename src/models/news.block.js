import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const NewsBlock = sequelize.define(
    "news_block",
    {

        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        news_id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
        },
        block_type: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        block_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        position: {
            type: DataTypes.SMALLINT,
            primaryKey: true,
        },

    },
    {
        timestamps: true
    }
)

export default NewsBlock;