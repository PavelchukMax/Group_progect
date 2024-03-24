import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Rents = sequelize.define('Rents', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  datestart: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  datefinish: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  User_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  User_realname: {
    type: DataTypes.STRING,
  },
  book_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  User_Address: {
    type: DataTypes.STRING,
  },
  is_finished: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  timestamps: false, 
});

export default Rents;
