import express from 'express';
import { create, getByCode } from '../controllers/bookings.controller.js';

const router = express.Router();

// POST /api/bookings - Crear reserva
router.post('/', create);

// GET /api/bookings/:code - Obtener por código
router.get('/:code', getByCode);

export default router;
