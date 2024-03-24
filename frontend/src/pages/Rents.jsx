import "../styles/Rents.css"
import React, { useEffect } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { getRents } from '../redux/rentSlice';

const Rents = () => {
    const dispatch = useDispatch();
    const rents = useSelector((state) => {
        if (state.rent.rents && state.rent.rents.rents) {
          return state.rent.rents.rents;
        } else if (state.rent.rents) {
          return state.rent.rents;
        } else {
          return [];
        }
      });

    useEffect(() => {
        dispatch(getRents());
    }, [dispatch]);

    const activeRents = rents.filter(rent => !rent.is_finished);

  
    return (
      <div className="max-w-lg mx-auto text-white">
      {activeRents && activeRents.length > 0 ? (
         <table className="table-auto w-full bg-gray-800 border rounded-md">
             <thead>
                 <tr>
                     <th className="px-4 py-2 text-left text-gray-300">Користувач</th>
                     <th className="px-4 py-2 text-left text-gray-300">Дата початку</th>
                     <th className="px-4 py-2 text-left text-gray-300">Дата завершення</th>
                     <th className="px-4 py-2 text-left text-gray-300">Назва книги</th>
                 </tr>
             </thead>
             <tbody>
                 {activeRents.map((rent) => (
                     <tr key={rent.id} className="hover:bg-gray-700">
                         <td className="border px-4 py-2">{rent.User_name}</td>
                         <td className="border px-4 py-2">{rent.datestart}</td>
                         <td className="border px-4 py-2">{rent.datefinish}</td>
                         <td className="border px-4 py-2">{rent.book_name}</td>
                     </tr>
                 ))}
             </tbody>
         </table>
     ) : (<p>Немає активних оренд.</p>)}
 </div>
);
};

export default Rents;
