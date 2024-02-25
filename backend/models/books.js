import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Patients = sequelize.define('Patient', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  patientName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  doctorName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
   diagnosis: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  instructions: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  timestamps: false, 
});

export default Patients;
