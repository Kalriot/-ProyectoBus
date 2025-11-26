import express from 'express';
import { getPosts, createPost, createComment } from '../controllers/forum.controller.js';

const router = express.Router();

// GET /api/forum - Listar posts
router.get('/', getPosts);

// POST /api/forum - Crear post
router.post('/', createPost);

// POST /api/forum/:postId/comments - Crear comentario
router.post('/:postId/comments', createComment);

export default router;
