import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createRent, getRents } from '../redux/rentSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/addRent.css';
import { getAllBooks } from '../redux/bookSlice';

const AddRent = () => {
  const dispatch = useDispatch();
  const rentedBooks = useSelector((state) => state.rent.rents.rents);
  const availableBooks = useSelector((state) => state.book.books);
  const user = useSelector((state) => state.auth.user);
  const address = useSelector((state) => state.auth.address);
  const [datestart, setDateStart] = useState('');
  const [duration, setDuration] = useState(3);
  const [selectedBook, setSelectedBook] = useState('');
  const [deliveryType, setDeliveryType] = useState('library');
  const [userRealname, setUserRealname] = useState('');
  const [userAddress, setUserAddress] = useState('');

  useEffect(() => {
    dispatch(getAllBooks());
    dispatch(getRents());
  }, [dispatch]);
  
  const isBookAvailable = (bookName) => {
  const hasRentRecords = rentedBooks.find((rent) => rent.book_name === bookName);
  if (!hasRentRecords) {
    return true;
  }
  const allRentsFinished = rentedBooks.every((rent) => rent.book_name === bookName && rent.is_finished);
  return allRentsFinished;
};
  
  const handleDeliveryChange = (e) => {
    setDeliveryType(e.target.value);
  };

  const handleDurationChange = (e) => {
    setDuration(parseInt(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
 
  if (!isBookAvailable(selectedBook)) {
    toast.error('Ця книга вже орендована');
    return;
  }
  if (deliveryType === 'delivery' && (!userAddress || userAddress.trim() === 'null')) {
    toast.error('Будь ласка, вкажіть адресу доставки');
    return;
  }
    const endDate = new Date(datestart);
    endDate.setDate(endDate.getDate() + duration);

    const rentData = {
      datestart,
      datefinish: endDate.toISOString().split('T')[0],
      book_name: selectedBook,
      User_Address: deliveryType === 'delivery' ? userAddress : address,
      User_realname: deliveryType === 'delivery' ? userRealname : null,
      User_name: user.username,
    };

    dispatch(createRent(rentData))
      .then(() => {
        toast.success('Аренду створено успешно');
        setDateStart('');
        setDuration(3);
        setSelectedBook('');
        setUserAddress('');
        setUserRealname('');

      })
      .catch((error) => {
        console.error('Помидка при створенні аренди:', error);
        toast.error('Помилка при створенні аренди');
      });
  };

  return (
    <div className="outer">
      <form className="inner rent-form" onSubmit={handleSubmit}>
        <h2 className="register-xl-text">Створення аренди</h2>
        <div className="mb-4 rent-field">
          <label htmlFor="datestart" className="block register-text">
            Дата початку аренди
          </label>
          <input
            type="date"
            id="datestart"
            name="datestart"
            value={datestart}
            onChange={(e) => setDateStart(e.target.value)}
            className="field register-input-text"
          />
        </div>
        <div className="mb-4 rent-field">
          <label htmlFor="duration" className="block register-text">
            Тривалість оренди
          </label>
          <select
            id="duration"
            name="duration"
            value={duration}
            onChange={handleDurationChange}
            className="field register-input-text"
          >
            <option value="3">3 дні</option>
            <option value="7">1 тиждень</option>
            <option value="14">2 тижня</option>
          </select>
        </div>
        <div className="mb-4 rent-field">
          <label htmlFor="book" className="block register-text">
            Книга
          </label>
          <select
            id="book"
            name="book"
            value={selectedBook}
            onChange={(e) => setSelectedBook(e.target.value)}
            className="field register-input-text"
          >
            <option value="" disabled>
              Виберіть книгу
            </option>
            {availableBooks.map((book) => (
              <option key={book.BookName} value={book.BookName}>
                {book.BookName}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4 rent-field">
          <label htmlFor="deliveryType" className="block register-text">
            Тип доставки
          </label>
          <select
            id="deliveryType"
            name="deliveryType"
            value={deliveryType}
            onChange={handleDeliveryChange}
            className="field register-input-text"
          >
            <option value="library">Забрати самому з бібліотеки</option>
            <option value="delivery">Доставка</option>
          </select>
        </div>
        {deliveryType === 'delivery' && (
          <>
            <div className="mb-4 rent-field">
              <label htmlFor="userRealname" className="block register-text">
                Реальне ім'я
              </label>
              <input
                type="text"
                id="userRealname"
                name="userRealname"
                value={userRealname}
                onChange={(e) => setUserRealname(e.target.value)}
                className="field register-input-text"
              />
            </div>
            <div className="mb-4 rent-field">
              <label htmlFor="userAddress" className="block register-text">
                Адреса доставки
              </label>
              <input
                type="text"
                id="userAddress"
                name="userAddress"
                value={userAddress}
                onChange={(e) => setUserAddress(e.target.value)}
                className="field register-input-text"
              />
            </div>
          </>
        )}
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="register-button"
          >
            арендувати
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRent;
