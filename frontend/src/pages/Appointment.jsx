import "../styles/appointment.css"
import React, { useEffect } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { getAppointments } from '../redux/appointmentSlice';

const Appointment = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const doctorName = user.username;
    const consultations = useSelector((state) => {
        if (state.appointment.appointments && state.appointment.appointments.appointments) {
          return state.appointment.appointments.appointments;
        } else if (state.appointment.appointments) {
          return state.appointment.appointments;
        } else {
          return [];
        }
      });

    useEffect(() => {
      console.log('Before dispatch(getAppointments())');
        dispatch(getAppointments());
    }, [dispatch]);

    const doctorConsultations = consultations.filter((consultation) => consultation.doctor === doctorName);

  
    return (
        <div className="max-w-lg mx-auto text-white">
             {doctorConsultations && doctorConsultations.length > 0 ? (
                <table className="table-auto w-full bg-gray-800 border rounded-md">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-left text-gray-300">Дата</th>
                            <th className="px-4 py-2 text-left text-gray-300">Час</th>
                            <th className="px-4 py-2 text-left text-gray-300">Пацієнт</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doctorConsultations.map((consultation) => (
                            <tr key={consultation.id} className="hover:bg-gray-700">
                                <td className="border px-4 py-2">{consultation.date}</td>
                                <td className="border px-4 py-2">{consultation.time}</td>
                                <td className="border px-4 py-2">{consultation.patient}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (<p>До вас нема записаних на консультацію.</p>)}
        </div>
    );
};

export default Appointment;
