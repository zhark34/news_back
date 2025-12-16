import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const Session = sequelize.define("session", {
    id: { 
        type: DataTypes.BIGINT,
        autoIncrement: true, 
        primaryKey: true 
    },
    journalist_id: { 
        type: DataTypes.BIGINT, 
        allowNull: false 
    },
    id_token: {
        type: DataTypes.BIGINT, 
        allowNull: false
    },
    refresh_token_hash: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    user_agent: { 
        type: DataTypes.STRING
    },
    ip: { 
        type: DataTypes.STRING
    },
    location_country: { 
        type: DataTypes.STRING
    },
    location_region: { 
        type: DataTypes.STRING
    },
    location_city: { 
        type: DataTypes.STRING
    },
    expires_at: { 
        type: DataTypes.DATE, 
        allowNull: false 
    },
    revoked: { 
        type: DataTypes.BOOLEAN, 
        defaultValue: false 
    },
});

export default Session;