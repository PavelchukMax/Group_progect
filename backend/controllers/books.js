import Books from '../models/books.js';

export const getAll = async (req, res) => {
  try {
    
    const books = await Books.findAll();

    if (!books || books.length === 0) {
      return res.json({ message: 'книг нема' });
    }

    res.json({ books });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Щось пішло не так!' });
  }
};

export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Books.findByPk(id);

    if (!book) {
      return res.status(404).json({ message: 'книги не знайдено' });
    }

    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Щось пішло не так!' });
  }
};