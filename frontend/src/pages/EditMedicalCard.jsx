import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updatePatient, getPatientById } from '../redux/patientSlice';

const EditMedicalCard = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const patient = useSelector((state) => {
    if (state.patient) {
      return state.patient.patient || state.patient;
    } else {
      return null; 
    }
  });
  const [diagnosis, setDiagnosis] = useState(patient?.diagnosis || '');
  const [instructions, setInstructions] = useState(patient?.instructions || '');
  useEffect(() => {
  }, [id, dispatch]);
  useEffect(() => {
    dispatch(getPatientById(id));
  }, [dispatch, id]);
  const handleUpdate = () => {
    dispatch(updatePatient({ id, diagnosis, instructions }));
    navigate('/patients');
  };
  console.log(patient)
  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-4">
      <h2 className="text-2xl font-bold mb-2">Редагування медичної карти пацієнта{patient?.patientName}:</h2>
        <div className="mb-4">
          <label className="text-gray-500 font-bold mb-2" htmlFor="diagnosis">
            Діагноз:
          </label>
          <input
            type="text"
            id="diagnosis"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            className="border rounded w-full py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-500 font-bold mb-2" htmlFor="instructions">
            Інструкції щодо лікування:
          </label>
          <textarea
            id="instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className="border rounded w-full py-2 px-3"
          />
        </div>
        <button
          onClick={handleUpdate}
          className="bg-blue-500 hover:bg-blue-700 text-lg text-white py-2 px-4 rounded"
        >
          Зберегти зміни
        </button>
      </div>
    </div>
  );
};

export default EditMedicalCard;
