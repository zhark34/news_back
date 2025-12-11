import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Categories = sequelize.define(
    "categories",
    {

        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        category_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            unique: true
        },
        category: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },

    },
    {
        timestamps: true
    }
)

export default Categories;