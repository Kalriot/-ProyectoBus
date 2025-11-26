import express from 'express';
import { register, login, getMe } from '../controllers/auth.controller.js';

const router = express.Router();

// POST /api/auth/register - Registro
router.post('/register', register);

// POST /api/auth/login - Login
router.post('/login', login);

// GET /api/auth/me - Obtener usuario actual
router.get('/me', getMe);

export default router;
