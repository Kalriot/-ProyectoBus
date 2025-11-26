import { Request, Response } from 'express';
import prisma from '../config/database.js';

// Hash simple de contraseña (en producción usar bcrypt)
function hashPassword(password: string): string {
    // Por ahora usamos un hash simple, en producción usar bcrypt
    return Buffer.from(password).toString('base64');
}

function verifyPassword(password: string, hash: string): boolean {
    return hashPassword(password) === hash;
}

// POST /api/auth/register - Registro de usuario
export async function register(req: Request, res: Response) {
    try {
        const { email, password, name } = req.body;

        if (!email || !password || !name) {
            return res.status(400).json({ error: 'Todos los campos son requeridos' });
        }

        // Verificar si el usuario ya existe
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return res.status(400).json({ error: 'El email ya está registrado' });
        }

        // Crear usuario
        const user = await prisma.user.create({
            data: {
                email,
                password: hashPassword(password),
                name
            },
            select: {
                id: true,
                email: true,
                name: true,
                createdAt: true
            }
        });

        res.status(201).json({ user });
    } catch (error: any) {
        console.error('Error en register:', error);
        res.status(500).json({ error: 'Error al registrar usuario' });
    }
}

// POST /api/auth/login - Login de usuario
export async function login(req: Request, res: Response) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email y contraseña requeridos' });
        }

        // Buscar usuario
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user || !verifyPassword(password, user.password)) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        // Retornar usuario (sin contraseña)
        const { password: _, ...userWithoutPassword } = user;
        res.json({ user: userWithoutPassword });
    } catch (error: any) {
        console.error('Error en login:', error);
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
}

// GET /api/auth/me - Obtener usuario actual (por ID)
export async function getMe(req: Request, res: Response) {
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({ error: 'userId requerido' });
        }

        const user = await prisma.user.findUnique({
            where: { id: userId as string },
            select: {
                id: true,
                email: true,
                name: true,
                profilePicture: true,
                createdAt: true
            }
        });

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.json({ user });
    } catch (error: any) {
        console.error('Error en getMe:', error);
        res.status(500).json({ error: 'Error al obtener usuario' });
    }
}

// PUT /api/auth/profile - Actualizar perfil de usuario
export async function updateProfile(req: Request, res: Response) {
    try {
        const { userId, name, profilePicture } = req.body;

        if (!userId) {
            return res.status(400).json({ error: 'userId requerido' });
        }

        // Preparar datos a actualizar
        const updateData: any = {};
        if (name !== undefined) updateData.name = name;
        if (profilePicture !== undefined) updateData.profilePicture = profilePicture;

        const user = await prisma.user.update({
            where: { id: userId },
            data: updateData,
            select: {
                id: true,
                email: true,
                name: true,
                profilePicture: true,
                createdAt: true
            }
        });

        res.json({ user });
    } catch (error: any) {
        console.error('Error en updateProfile:', error);
        res.status(500).json({ error: 'Error al actualizar perfil' });
    }
}

// POST /api/auth/upload-profile-picture - Subir foto de perfil
export async function uploadProfilePicture(req: Request, res: Response) {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ error: 'userId requerido' });
        }

        if (!req.file) {
            return res.status(400).json({ error: 'No se subió ninguna imagen' });
        }

        // Construir URL de la imagen
        const imageUrl = `/uploads/profiles/${req.file.filename}`;

        // Actualizar usuario con la nueva foto
        const user = await prisma.user.update({
            where: { id: userId },
            data: { profilePicture: imageUrl },
            select: {
                id: true,
                email: true,
                name: true,
                profilePicture: true,
                createdAt: true
            }
        });

        res.json({ user, imageUrl });
    } catch (error: any) {
        console.error('Error en uploadProfilePicture:', error);
        res.status(500).json({ error: 'Error al subir imagen' });
    }
}
