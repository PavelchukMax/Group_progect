import React, { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch  } from 'react-redux';
import { getPatientById, getAllPatients  } from '../redux/patientSlice';
import "../styles/medicalCard.css";

const MedicalCard = () => {
  const { id } = useParams();
const user = useSelector((state) => state.auth.user);
const patient = useSelector((state) => {
  if (state.patient) {
    return state.patient.patient || state.patient;
  } else {
    return null; 
  }
});
const allPatients = useSelector((state) => state.patient.patients);
const isCurrentUserPatient = user.role === false && allPatients.some(p => p.patientName === user.username);
const currentUserPatient = allPatients.find((p) => p.patientName === user.username);
const dispatch = useDispatch();
console.log("user", user);
console.log("patientid", id);
console.log("patient", patient);
useEffect(() => {
  dispatch(getAllPatients());
}, [dispatch]);
useEffect(() => {
  dispatch(getPatientById(id));
}, [dispatch, id]);
let displayContent;
if (user.role) {
  displayContent = (
    <>
      <div className="mb-4">
        <label className="text-gray-500 font-bold mb-2" htmlFor="name">
          Ім'я та прізвище:
        </label>
        <p className="text-gray-900 font-bold mb-2" htmlFor="name">
          {patient.patientName || "Невідомий пацієнт"}
        </p>
      </div>
      <div className="mb-4">
        <label className="text-gray-500 font-bold mb-2" htmlFor="diagnosis">
          Діагноз:
        </label>
        <p className="text-gray-900 font-bold mb-2" htmlFor="name">
          {patient.diagnosis || "Діагноз відсутній"}
        </p>
      </div>
      <div className="mb-4">
        <label className="text-gray-500 font-bold mb-2" htmlFor="instructions">
          Інструкції щодо лікування
        </label>
        <p className="text-gray-900 font-bold mb-2" htmlFor="name">
          {patient.instructions || "Інструкції відсутні"}
        </p>
        <NavLink to={`/patients/${patient.id}/editMedicalCard`}>
          <button className="bg-green-500 hover:bg-green-700 text-lg text-white py-2 px-4 rounded">
            Редагувати
          </button>
        </NavLink>
      </div>
    </>
  );
} else {
  if (isCurrentUserPatient) {
    displayContent = (
      <>
        <div className="mb-4">
          <label className="text-gray-500 font-bold mb-2" htmlFor="name">
            Ім'я та прізвище:
          </label>
          <p className="text-gray-900 font-bold mb-2" htmlFor="name">
            {currentUserPatient.patientName || "Невідомий пацієнт"}
          </p>
        </div>
        <div className="mb-4">
          <label className="text-gray-500 font-bold mb-2" htmlFor="diagnosis">
            Діагноз:
          </label>
          <p className="text-gray-900 font-bold mb-2" htmlFor="name">
            {currentUserPatient.diagnosis || "Діагноз відсутній"}
          </p>
        </div>
        <div className="mb-4">
          <label className="text-gray-500 font-bold mb-2" htmlFor="instructions">
            Інструкції щодо лікування
          </label>
          <p className="text-gray-900 font-bold mb-2" htmlFor="name">
            {currentUserPatient.instructions || "Інструкції відсутні"}
          </p>
        </div>
      </>
    );
  }
  else {
    displayContent = (
      <p className="text-gray-900 font-bold mb-2">Картки не існує.</p>
    );
  }
}

return (
  <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden">
    <div className="px-6 py-4">
      <h2 className="text-2xl font-bold mb-2">Медична карта пацієнта</h2>
      {displayContent}
    </div>
  </div>
);
}

export default MedicalCard;
