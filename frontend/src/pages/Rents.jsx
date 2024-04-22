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
      <div className="rent-container text-black">
      {activeRents && activeRents.length > 0 ? (
         <table className="mx-auto table-auto w-full bg-gray rent-border rounded-md">
             <thead>
                 <tr>
                     <th className="px-4 py-2 text-left font-l text-black">Користувач</th>
                     <th className="px-4 py-2 text-left font-l text-black">Дата початку</th>
                     <th className="px-4 py-2 text-left font-l text-black">Дата завершення</th>
                     <th className="px-4 py-2 text-left font-l text-black">Назва книги</th>
                 </tr>
             </thead>
             <tbody>
                 {activeRents.map((rent) => (
                     <tr key={rent.id} className="hover:bg-gray">
                         <td className="rent-border font-l px-4 py-2">{rent.User_name}</td>
                         <td className="rent-border font-l px-4 py-2">{rent.datestart}</td>
                         <td className="rent-border font-l px-4 py-2">{rent.datefinish}</td>
                         <td className="rent-border font-l px-4 py-2">{rent.book_name}</td>
                     </tr>
                 ))}
             </tbody>
         </table>
     ) : (<p>Немає активних оренд.</p>)}
 </div>
);
};

export default Rents;
