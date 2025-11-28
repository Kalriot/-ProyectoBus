import api from './api';

export interface User {
    id: string;
    email: string;
    name: string;
    createdAt: string;
    profilePicture?: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData {
    email: string;
    password: string;
    name: string;
}

export const authService = {
    // POST /api/auth/register - Registro
    register: async (data: RegisterData) => {
        const response = await api.post<{ user: User }>('/auth/register', data);
        return response.data;
    },

    // POST /api/auth/login - Login
    login: async (data: LoginData) => {
        const response = await api.post<{ user: User }>('/auth/login', data);
        // Guardar usuario en localStorage
        localStorage.setItem('user', JSON.stringify(response.data.user));
        return response.data;
    },

    // GET /api/auth/me - Obtener usuario actual
    getMe: async (userId: string) => {
        const response = await api.get<{ user: User }>(`/auth/me?userId=${userId}`);
        return response.data;
    },

    // Logout (local)
    logout: () => {
        localStorage.removeItem('user');
    },

    // Obtener usuario del localStorage
    getCurrentUser: (): User | null => {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    }
};
