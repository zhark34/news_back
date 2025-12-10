import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Journalist = sequelize.define(
    "journalist",
    {

        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(250),
            allowNull: false,
        },
        bio: {
            type: DataTypes.TEXT(1000),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(250),
            allowNull: false,
        }

    },
    {
        timestamps: true
    }
)

export default Journalist;