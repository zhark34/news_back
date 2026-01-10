import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const NewsCaption = sequelize.define("news_caption", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    caption: {
        type: DataTypes.STRING,
        allowNull: false
    },
    block_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    }
});

export default NewsCaption;
