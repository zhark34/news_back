import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Categorys = sequelize.define(
    "categorys",
    {

        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
        },
        category: {
            type: DataTypes.STRING(50),
            allowNull: false,
        }

    },
    {
        timestamps: true
    }
)

export default Categorys;