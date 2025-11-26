import express from 'express';
import { register, login, getMe, updateProfile, uploadProfilePicture } from '../controllers/auth.controller.js';
import { upload } from '../config/upload.js';

const router = express.Router();

// POST /api/auth/register - Registro
router.post('/register', register);

// POST /api/auth/login - Login
router.post('/login', login);

// GET /api/auth/me - Obtener usuario actual
router.get('/me', getMe);

// PUT /api/auth/profile - Actualizar perfil
router.put('/profile', updateProfile);

// POST /api/auth/upload-profile-picture - Subir foto de perfil
router.post('/upload-profile-picture', upload.single('profilePicture'), uploadProfilePicture);

export default router;
