import express from 'express';
import { getAll, getBySlug, create } from '../controllers/packages.controller.js';

const router = express.Router();

// GET /api/packages - Listar paquetes
router.get('/', getAll);

// GET /api/packages/:slug - Obtener por slug
router.get('/:slug', getBySlug);

// POST /api/packages - Crear paquete
router.post('/', create);

export default router;
