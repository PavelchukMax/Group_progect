import { NavLink } from 'react-router-dom';
import '../styles/PatientItem.css';
import React from 'react';

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
