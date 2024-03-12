import { NavLink } from 'react-router-dom';
import { deletePatient } from '../redux/patientSlice';
import { useDispatch } from 'react-redux';
import '../styles/PatientItem.css';

const PatientItem = ({ patient }) => {
  const dispatch = useDispatch();
  const handleDeletePatient = () => {
    dispatch(deletePatient(patient.id));
  };
  return (
    <div className='patient-item'>
      <div className="patient-item-header">
        <div className='patient-info'>Пацієнт: {patient?.patientName}</div>
        <div className='patient-info'>Лікар: {patient?.doctorName}</div>
      </div>
      <div className="buttons-container">
        <NavLink to={`/patients/${patient.id}/medicalCard`} className='button button-medical-card'>
          Мед. карта
        </NavLink>
        <button className='button button-delete' onClick={handleDeletePatient}>
          Видалити
        </button>
      </div>
    </div>
  );
};

export default PatientItem;
