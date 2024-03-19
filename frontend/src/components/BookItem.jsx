import { NavLink } from 'react-router-dom';
import '../styles/PatientItem.css';
import React from 'react';
/**
 * Компонент для відображення інформації про книгу.
 * @param {Object} props - Властивості компонента.
 * @param {Object} props.book - Об'єкт, що має інформацію про книгу.
 * @param {string} props.book.BookName - Назва книги.
 * @param {string} props.book.autor - Автор книги.
 * @param {string} props.book.Cover_image_name - ім'я файла обкладинки книги.
 * @returns {JSX.Element} Елемент компонента для відображения інформації про книгу.
 */
const BookItem = ({ book }) => {
  const { BookName, autor, Cover_image_name} = book;

  const coverImage = Cover_image_name ? (
    <img
      src={`../book_covers/${book.Cover_image_name}`}
      alt={Cover_image_name}
      className="patient-item-image"
    />
  ) : null;
  return (
    <div className='patient-item'>
      <div className="patient-item-header">
        <div className='book-Cover-image-container'>
        {coverImage}
        </div>
        <div className='patient-info'>{BookName}</div>
        <div className='patient-info'>автор: {autor}</div>
      </div>
      <div className="buttons-container">
        <NavLink to={`/books/${book.id}/BookInfo`} className='button button-medical-card'>
          Детальніше
        </NavLink>
      </div>
    </div>
  );
};

export default BookItem;
