/**
 * Сторінка для відображення списку книг.
 * @module BooksPage
 */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBooks } from '../redux/bookSlice';
import BookItem from '../components/BookItem';
import '../styles/BooksPage.css';

/**
 * Компонент, що представляє сторінку з книгами.
 * @returns {JSX.Element} Елемент React, що містить сторінку з книгами.
 */
const BooksPage = () => {
  const dispatch = useDispatch();

  /**
   * Стан книг, отриманих з Redux store.
   * @type {Object}
   */
  const bookState = useSelector((state) => state.book);

  /**
   * Стан, що містить всі книги.
   * @type {Array}
   */
  const [allBooks, setAllBooks] = useState([]);

  /**
   * Стан, що містить відфільтровані книги.
   * @type {Array}
   */
  const [filteredBooks, setFilteredBooks] = useState([]);

  /**
   * Строка для пошуку книг.
   * @type {string}
   */
  const [searchTerm, setSearchTerm] = useState('');

  /**
   * Запит до Redux store для отримання всіх книг.
   */
  useEffect(() => {
    dispatch(getAllBooks());
  }, [dispatch]);

  /**
   * Оновлення стану книг після отримання їх з Redux store.
   */
  useEffect(() => {
    setAllBooks(bookState.books || []);
  }, [bookState.books]);

  /**
   * Фільтрація книг за введеним пошуковим запитом.
   */
  useEffect(() => {
    if (searchTerm) {
      const filtered = allBooks.filter((book) =>
        book.BookName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBooks(filtered);
    } else {
      setFilteredBooks(allBooks);
    }
  }, [searchTerm, allBooks]);

  /**
   * Обробник зміни пошукового запиту.
   * @param {Object} event - Подія зміни значення в полі пошуку.
   */
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className='books-main'>
      <div className="flex justify-between gap-4">
        <div className="flex text-2xl text-white flex-col gap-5 basis-4/5">
          <div className="search-container mb-4">
            <input
              type="text"
              placeholder="Пошук книг..."
              className="search-input"
              onChange={handleSearchChange}
              value={searchTerm}
            />
          </div>
          <div className="books-list" style={{ display:'flex',flexDirection:'row',flexWrap:"wrap", maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book, idx) => (
                <BookItem key={idx} book={book} />
              ))
            ) : (
              <p className="text-gray-500 text-center">
                Такої книги немає. 
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BooksPage;
