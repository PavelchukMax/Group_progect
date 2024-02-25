import Appointments from '../models/rents.js';

export const createAppointment = async (req, res) => {
  try {
    const { date, time, doctor, patient } = req.body;
    await Appointments.create({ date, time, doctor, patient });
    res.status(200).json({ message: 'Appointment created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointments.findAll();
    console.log(appointments);
    res.json({ appointments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};