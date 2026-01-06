import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";


const NewsQuote = sequelize.define(
    "news_quote", {

    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    quote_text: {
        type: DataTypes.STRING(1000),
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    block_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    news_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
    }

},
    {
        timestamps: true
    }
)

export default NewsQuote;