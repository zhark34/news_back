import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const NewsList = sequelize.define(

    "news_list",
    {

        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        block_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        news_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        type: {

            type: DataTypes.STRING,
            allowNull: false

        },
        list_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        }

    },
    {
        timestamps: true
    }

)

export default NewsList
