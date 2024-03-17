import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBooks } from '../redux/bookSlice';
import BookItem from '../components/BookItem';
import '../styles/patientsPage.css';

const BooksPage = () => {
  const dispatch = useDispatch();
  const bookState = useSelector((state) => state.book);
  const [allBooks, setAllBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); 

  useEffect(() => {
    dispatch(getAllBooks());
  }, [dispatch]);

  useEffect(() => {
    setAllBooks(bookState.books || []); 
  }, [bookState.books]);

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

  if (!bookState || !bookState.books || bookState.books.length === 0) {
    return (
      <div className="text-xl text-center text-white py-10">
        Книг не існує (There are no books)
      </div>
    );
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="max-w-[900px] mx-auto py-5">
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
          <div className="books-list" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
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
