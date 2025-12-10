import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Categorys = sequelize.define(
    "categorys",
    {

        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        category: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        journalist_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },

    },
    {
        timestamps: true
    }
)

export default Categorys;