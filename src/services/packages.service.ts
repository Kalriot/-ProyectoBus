import api from './api';

export interface Package {
    id: string;
    slug: string;
    title: string;
    destination: string;
    duration: string;
    price: number;
    currency: string;
    rating: number;
    image: string;
    featured?: boolean;
    description: string;
    includes: string[];
    notIncludes: string[];
    itinerary: { day: number; title: string; description: string }[];
    photos: string[];
    streetViewUrl?: string;
}

export const packagesService = {
    // GET /api/packages - Listar todos
    getAll: async (params?: { featured?: boolean; destination?: string }) => {
        const response = await api.get<Package[]>('/packages', { params });
        return response.data;
    },

    // GET /api/packages/:slug - Obtener por slug
    getBySlug: async (slug: string) => {
        const response = await api.get<Package>(`/packages/${slug}`);
        return response.data;
    },

    // POST /api/packages - Crear paquete
    create: async (packageData: Omit<Package, 'id'>) => {
        const response = await api.post<Package>('/packages', packageData);
        return response.data;
    },
};
