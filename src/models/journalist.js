import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Journalist = sequelize.define(
    "journalist",
    {

        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(250),
            allowNull: false,
        },
        profile_image_url: {
            type: DataTypes.STRING(),
            allowNull: true
        },
        profile_image_public_id: {
            type: DataTypes.STRING(),
            allowNull: true
        },
        bio: {
            type: DataTypes.STRING(1000),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(250),
            allowNull: false,
        },
        journalist_id: {
            type: DataTypes.BIGINT,
            allowNull: false, 
        },
        role: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        reset_token: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        reset_token_expire: {
            type: DataTypes.BIGINT,
            allowNull: true,
        }

    },
    {
        timestamps: true
    }
)

export default Journalist;