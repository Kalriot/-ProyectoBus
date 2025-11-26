import express from 'express';
import rateLimit from 'express-rate-limit';
import { chatbot, generateItinerary } from '../controllers/gemini.controller.js';

const router = express.Router();

// Rate limiting específico para Gemini (más restrictivo)
const geminiLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minuto
    max: 10, // 10 requests por minuto
    message: 'Demasiadas solicitudes al asistente. Por favor espera un momento.'
});

router.use(geminiLimiter);

// POST /api/gemini/chat - Chatbot
router.post('/chat', chatbot);

// POST /api/gemini/itinerary - Planificador de viajes
router.post('/itinerary', generateItinerary);

export default router;
