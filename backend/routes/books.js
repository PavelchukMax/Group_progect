import express from 'express';
import { getAll, getBookById } from '../controllers/books.js';

const router = express.Router();

router.get('/', getAll);
router.get('/:id', getBookById);  


export default router;
