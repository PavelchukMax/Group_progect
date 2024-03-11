import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPatients } from '../redux/patientSlice';
import PatientItem from '../components/PatientItem';
import '../styles/patientsPage.css';

const PatientsPage = () => {
  const dispatch = useDispatch();
  const patientState = useSelector((state) => state.patient);

  useEffect(() => {
    dispatch(getAllPatients());
  }, [dispatch]);

  if (!patientState || !patientState.patients || patientState.patients.length === 0) {
    return (
      <div className="text-xl text-center text-white py-10">
        Пацієнтів не існує
      </div>
    );
  }

  const { patients } = patientState;

  return (
    <div className="max-w-[900px] mx-auto py-5">
      <div className="flex justify-between gap-4">
        <div className="flex text-2xl text-white flex-col gap-5 basis-4/5">
          Пацієнти
          {patients.map((patient, idx) => (
            <PatientItem key={idx} patient={patient} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientsPage;
