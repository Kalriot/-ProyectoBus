import { Request, Response } from 'express';
import prisma from '../config/database.js';

// Generar código de reserva único
function generateBookingCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

// POST /api/bookings - Crear reserva
export async function create(req: Request, res: Response) {
    try {
        const { packageId, travelDate, passengers, passengerName, passengerEmail, passengerPhone } = req.body;

        // Validar datos
        if (!packageId || !travelDate || !passengers || !passengerName || !passengerEmail) {
            return res.status(400).json({ error: 'Faltan datos requeridos' });
        }

        // Obtener paquete para calcular precio
        const pkg = await prisma.package.findUnique({
            where: { id: packageId }
        });

        if (!pkg) {
            return res.status(404).json({ error: 'Paquete no encontrado' });
        }

        const totalPrice = pkg.price * passengers;
        const bookingCode = generateBookingCode();

        const booking = await prisma.booking.create({
            data: {
                bookingCode,
                packageId,
                travelDate: new Date(travelDate),
                passengers,
                totalPrice,
                passengerName,
                passengerEmail,
                passengerPhone: passengerPhone || '',
                status: 'PENDING'
            },
            include: {
                package: true
            }
        });

        res.status(201).json(booking);
    } catch (error: any) {
        console.error('Error en create booking:', error);
        res.status(500).json({ error: 'Error al crear reserva' });
    }
}

// GET /api/bookings/:code - Obtener reserva por código
export async function getByCode(req: Request, res: Response) {
    try {
        const { code } = req.params;

        const booking = await prisma.booking.findUnique({
            where: { bookingCode: code },
            include: { package: true }
        });

        if (!booking) {
            return res.status(404).json({ error: 'Reserva no encontrada' });
        }

        res.json(booking);
    } catch (error: any) {
        console.error('Error en getByCode:', error);
        res.status(500).json({ error: 'Error al obtener reserva' });
    }
}
