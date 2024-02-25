import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Users  = sequelize.define('Users', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null, 
  },
}, {
  timestamps: true,
  tableName : 'User'
});

export default Users ;
