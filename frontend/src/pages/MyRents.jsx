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
        <div className="mx-auto font-l rent-container text-black">
            <div className="myrent-top items-center mb-4">
                <label className="text-black myrent-top-inner">
                    <input
                        type="checkbox"
                        style={{width:20}}
                        checked={showCurrent}
                        onChange={() => setShowCurrent(!showCurrent)}
                    />
                    Показати лише поточні
                </label>
            </div>
            {filteredRents && filteredRents.length > 0 ? (
                <table className="table-auto w-full bg-gray border rounded-md">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-left text-gray">Користувач</th>
                            <th className="px-4 py-2 text-left text-gray">Дата початку</th>
                            <th className="px-4 py-2 text-left text-gray">Дата завершення</th>
                            <th className="px-4 py-2 text-left text-gray">Назва книги</th>
                            <th className="px-4 py-2 text-left text-gray">Завершено</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRents.map((rent) => (
                            <tr key={rent.id} className="hover:bg-gray">
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
