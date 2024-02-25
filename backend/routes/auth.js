import express from 'express';
import { register, login, getMe ,getAllUsers, updateUser  } from '../controllers/auth.js';
import { checkAuth } from '../utils/checkAuth.js';

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.post('/me', checkAuth, getMe);

router.get('/users', checkAuth, getAllUsers);

router.put('/update', checkAuth, updateUser);

export default router;
