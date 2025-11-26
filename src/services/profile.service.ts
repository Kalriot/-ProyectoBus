import api from './api';

export interface UpdateProfileData {
    userId: string;
    name?: string;
    profilePicture?: string;
}

export interface Booking {
    id: string;
    bookingCode: string;
    travelDate: string;
    passengers: number;
    totalPrice: number;
    status: string;
    passengerName: string;
    passengerEmail: string;
    passengerPhone: string;
    createdAt: string;
    package: {
        id: string;
        title: string;
        destination: string;
        duration: string;
        price: number;
        image: string;
        slug: string;
    };
}

export const profileService = {
    // Actualizar perfil del usuario
    async updateProfile(data: UpdateProfileData) {
        const response = await api.put('/auth/profile', data);
        return response.data;
    },

    // Obtener reservas del usuario
    async getMyBookings(userId: string): Promise<Booking[]> {
        const response = await api.get(`/bookings/user/${userId}`);
        return response.data;
    }
};

export default profileService;
