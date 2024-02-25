import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createPatient } from '../redux/patientSlice';
import { getAllUsers } from '../redux/authSlice';
import "../styles/addPatientPage.css"

const AddPatientPage = () => {
  const [selectedPatient, setSelectedPatient] = useState('');
  const [age, setAge] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const { loading } = useSelector((state) => state.patient);
  const allUsers = useSelector((state) => state.auth.allUsers);
  const doctors = allUsers.filter((user) => user.role === true);
  const patients = allUsers.filter((user) => user.role === false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  
  useEffect(() => {
    if (loading) {
      toast.success("Пацієнта додано");
    }
  }, [loading]);

  const submitHandler = () => {
    try {
      const data = new FormData();
      data.append('patientName', selectedPatient);
      data.append('age', age);
      data.append('doctorName', selectedDoctor);

      const jsonObject = {};
      for (const [key, value] of data.entries()) {
        jsonObject[key] = value;
      }

      dispatch(createPatient(jsonObject));
      setSelectedPatient('');
      setAge('');
      setSelectedDoctor('');
      navigate('/patients');
    } catch (error) {
      console.error(error);
    }
  };

  const clearFormHandler = () => {
    setSelectedPatient('');
    setAge('');
    setSelectedDoctor('');
  };

  return (
    <form className="w-1/3 mx-auto py-10" onSubmit={(e) => e.preventDefault()}>
      <label className="text-lg text-white opacity-70">
        Пацієнт:
        <select
          value={selectedPatient}
          onChange={(e) => setSelectedPatient(e.target.value)}
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
        >
          <option value="" disabled>
            Виберіть пацієнта
          </option>
          {patients.map((patient) => (
            <option key={patient.username} value={patient.username}>
              {patient.username}
            </option>
          ))}
        </select>
      </label>
      <label className="text-lg text-white opacity-70">
        Вік пацієнта:
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Вік"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
        />
      </label>
      <label className="text-lg text-white opacity-70">
        Лікар:
        <select
          value={selectedDoctor}
          onChange={(e) => setSelectedDoctor(e.target.value)}
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
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
      </label>
      <div className="flex gap-8 items-center justify-center mt-4">
        <button
          className="flex justify-center items-center bg-gray-800 text-lg text-white rounded-sm py-2 px-4"
          onClick={submitHandler}
        >
          Додати
        </button>
        <button
          className="flex justify-center items-center bg-red-700 text-lg text-white rounded-sm py-2 px-4"
          onClick={clearFormHandler}>
          Скасувати
        </button>
      </div>
    </form>
  );
};

export default AddPatientPage;
