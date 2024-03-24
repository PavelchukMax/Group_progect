import "../styles/MyRents.css"
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRents } from '../redux/rentSlice';

const MyRents = () => {
    const dispatch = useDispatch();
    const rents = useSelector((state) => state.rent.rents.rents);
    const user = useSelector((state) => state.auth.user);
    const [showCurrent, setShowCurrent] = useState(true);

    useEffect(() => {
        dispatch(getRents());
    }, [dispatch]);

    const filteredRents = rents.filter(rent => {
        if (showCurrent) {
            return rent.User_name === user.username && !rent.is_finished;
        } else {
            return rent.User_name === user.username;
        }
    });

    return (
        <div className="max-w-lg mx-auto text-white">
            <div className="flex items-center mb-4">
                <label className="mr-2">
                    <input
                        type="checkbox"
                        checked={showCurrent}
                        onChange={() => setShowCurrent(!showCurrent)}
                    />
                    Показать только текущие
                </label>
            </div>
            {filteredRents && filteredRents.length > 0 ? (
                <table className="table-auto w-full bg-gray-800 border rounded-md">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-left text-gray-300">Користувач</th>
                            <th className="px-4 py-2 text-left text-gray-300">Дата початку</th>
                            <th className="px-4 py-2 text-left text-gray-300">Дата завершення</th>
                            <th className="px-4 py-2 text-left text-gray-300">Назва книги</th>
                            <th className="px-4 py-2 text-left text-gray-300">Завершено</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRents.map((rent) => (
                            <tr key={rent.id} className="hover:bg-gray-700">
                                <td className="border px-4 py-2">{rent.User_name}</td>
                                <td className="border px-4 py-2">{rent.datestart}</td>
                                <td className="border px-4 py-2">{rent.datefinish}</td>
                                <td className="border px-4 py-2">{rent.book_name}</td>
                                <td className="border px-4 py-2">
                                    <input
                                        type="checkbox"
                                        checked={rent.is_finished}
                                        disabled
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (<p>Немає {showCurrent ? 'активних' : 'всіх'} оренд.</p>)}
        </div>
    );
};

export default MyRents;
