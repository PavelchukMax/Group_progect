import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Books = sequelize.define('Book', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  BookName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  autor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  Pages: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Cover_image_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, 
{
  timestamps: false, 
});

export default Books;
