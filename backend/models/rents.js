import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Appointments = sequelize.define('Appointment', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
    date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  doctor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  patient: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false, 
});

export default Appointments;
