import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const SocialNetworks = sequelize.define(
    "social_networks",
    {

        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
        },
        social_network: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        link_social_network: {
            type: DataTypes.STRING(250),
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

export default SocialNetworks;