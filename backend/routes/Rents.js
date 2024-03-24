import express from 'express';
import { createRent, getRents } from '../controllers/rent.js';
import { checkAuth } from '../utils/checkAuth.js';

const router = express.Router();

router.post('/create', checkAuth, createRent);

router.get('/', checkAuth, getRents);

export default router;
