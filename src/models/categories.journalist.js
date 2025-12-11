import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const CategoriesJournalist = sequelize.define(
    "categories_journalists",
    {

        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        journalist_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: 'journalists',
                key: 'journalist_id'
            }
        },
        category_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: 'categories', 
                key: 'category_id'
            }
        },

    },
    {
        timestamps: true
    }
)

export default CategoriesJournalist;