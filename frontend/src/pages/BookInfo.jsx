import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getBookById } from '../redux/bookSlice';
import '../styles/medicalCard.css';

/**
 * Компонент BookInfo.
 * @module BookInfo
 * @returns {JSX.Element} Елемент React, що представляє інформацію про книгу.
 */
const BookInfo = () => {
  const { id } = useParams();
  const book = useSelector((state) => state.book?.book || state.book); 
  const dispatch = useDispatch();
  const coverImage = book.Cover_image_name ? (
    <img
      src={`../book_covers/${book.Cover_image_name}`}
      alt={book.Cover_image_name}
      className="patient-item-image"
    />) : null
  
  /**
   * Ефект, що виконує завантаження інформації про книгу з її ID при монтуванні компонента.
   * @name useEffect
   * @function
   * @param {Function} dispatch - Функція для надсилання дій Redux.
   * @param {int} id – ID книги для завантаження інформації.
   */
  
  useEffect(() => {
    dispatch(getBookById(id));
  }, [dispatch, id]);

  if (!book) {
    return (
      <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4">
          <p className="text-gray-900 font-bold mb-2"> Такої книги не існує.</p>
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-4">
        <div className="book-info">
          {coverImage}
          <div className="mb-4">
            <label className="text-gray-500 font-bold mb-2" htmlFor="name">
              Назва книги
            </label>
            <p className="text-gray-900 font-bold mb-2" htmlFor="name">
              {book.BookName || "Невідома книга"}
            </p>
          </div>
          <div className="mb-4">
            <label className="text-gray-500 font-bold mb-2" htmlFor="diagnosis">
              Автор
            </label>
            <p className="text-gray-900 font-bold mb-2" htmlFor="name">
              {book.autor || "Невідомий автор"}
            </p>
          </div>
          <div className="mb-4">
            <label className="text-gray-500 font-bold mb-2" htmlFor="instructions">
              Кількість сторінок
            </label>
            <p className="text-gray-900 font-bold mb-2" htmlFor="name">
              {book.Pages || "Невідома кількість"} сторінок
            </p>
          </div>
          <div className="mb-4">
            <label className="text-gray-500 font-bold mb-2" htmlFor="instructions">
              Опис книги
            </label>
            <p className="text-gray-900 font-bold mb-2" htmlFor="name">
              {book.Description || "Опис відсутній"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookInfo;
