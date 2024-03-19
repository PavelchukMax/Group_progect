import express from 'express';
import { getAllBooks, getBookById } from '../controllers/books.js';
import { checkAuth } from '../utils/checkAuth.js';

const router = express.Router();

router.get('/',checkAuth, getAllBooks);
router.get('/:id',checkAuth, getBookById);   

export default router;
