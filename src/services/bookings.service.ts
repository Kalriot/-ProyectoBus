import api from './api';

export interface Booking {
    id: string;
    bookingCode: string;
    packageId: string;
    travelDate: string;
    passengers: number;
    totalPrice: number;
    status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
    passengerName: string;
    passengerEmail: string;
    passengerPhone: string;
    package?: any;
    createdAt: string;
    updatedAt: string;
}

export interface CreateBookingData {
    packageId: string;
    travelDate: string;
    passengers: number;
    passengerName: string;
    passengerEmail: string;
    passengerPhone?: string;
    userId?: string;
}

export const bookingsService = {
    // POST /api/bookings - Crear reserva
    create: async (data: CreateBookingData) => {
        const response = await api.post<Booking>('/bookings', data);
        return response.data;
    },

    // GET /api/bookings/:code - Obtener por código
    getByCode: async (code: string) => {
        const response = await api.get<Booking>(`/bookings/${code}`);
        return response.data;
    },
};
