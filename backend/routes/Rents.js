import express from 'express';
import { createAppointment, getAppointments } from '../controllers/rent.js';
import { checkAuth } from '../utils/checkAuth.js';

const router = express.Router();

router.post('/create', checkAuth, createAppointment);

router.get('/', checkAuth, getAppointments);

export default router;
