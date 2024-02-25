import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAppointment } from '../redux/appointmentSlice';
import { getAllUsers } from '../redux/authSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/addAppointment.css';

const AddAppointment = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const allUsers = useSelector((state) => state.auth.allUsers);
  const doctors = allUsers.filter((user) => user.role === true);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedDate = new Date(date + 'T' + time);
    const dayOfWeek = selectedDate.getDay();
    const hours = selectedDate.getHours();
    if (dayOfWeek >= 1 && dayOfWeek <= 5 && hours >= 9 && hours <= 15) {
      const consultation = {
        date,
        time,
        doctor: selectedDoctor, 
        patient: user.username,
      };
      dispatch(createAppointment(consultation));
      setDate('');
      setTime('');
      setSelectedDoctor('');
    } else {
      toast.error('Виберіть день з понеділка по п\'ятницю з 9:00 до 15:00', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6">Запис на консультацію</h2>
        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-700 font-bold mb-2">
            Дата
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="time" className="block text-gray-700 font-bold mb-2">
            Час
          </label>
          <input
            type="time"
            id="time"
            name="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="doctor" className="block text-gray-700 font-bold mb-2">
            Лікар
          </label>
          <select
            id="doctor"
            name="doctor"
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="" disabled>
              Виберіть лікаря
            </option>
            {doctors.map((doctor) => (
              <option key={doctor.username} value={doctor.username}>
                {doctor.username}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Записатись
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAppointment;
