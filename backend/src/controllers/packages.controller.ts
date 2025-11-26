import { Request, Response } from 'express';
import prisma from '../config/database.js';

// GET /api/packages - Listar todos los paquetes
export async function getAll(req: Request, res: Response) {
    try {
        const { featured, destination } = req.query;

        const packages = await prisma.package.findMany({
            where: {
                ...(featured === 'true' && { featured: true }),
                ...(destination && { destination: { contains: destination as string } })
            },
            orderBy: { createdAt: 'desc' }
        });

        // Parsear JSON strings a objetos
        const formattedPackages = packages.map(pkg => ({
            ...pkg,
            includes: JSON.parse(pkg.includes),
            notIncludes: JSON.parse(pkg.notIncludes),
            itinerary: JSON.parse(pkg.itinerary),
            photos: JSON.parse(pkg.photos)
        }));

        res.json(formattedPackages);
    } catch (error: any) {
        console.error('Error en getAll packages:', error);
        res.status(500).json({ error: 'Error al obtener paquetes' });
    }
}

// GET /api/packages/:slug - Obtener paquete por slug
export async function getBySlug(req: Request, res: Response) {
    try {
        const { slug } = req.params;

        const pkg = await prisma.package.findUnique({
            where: { slug }
        });

        if (!pkg) {
            return res.status(404).json({ error: 'Paquete no encontrado' });
        }

        // Parsear JSON strings
        const formattedPackage = {
            ...pkg,
            includes: JSON.parse(pkg.includes),
            notIncludes: JSON.parse(pkg.notIncludes),
            itinerary: JSON.parse(pkg.itinerary),
            photos: JSON.parse(pkg.photos)
        };

        res.json(formattedPackage);
    } catch (error: any) {
        console.error('Error en getBySlug:', error);
        res.status(500).json({ error: 'Error al obtener paquete' });
    }
}

// POST /api/packages - Crear paquete (admin)
export async function create(req: Request, res: Response) {
    try {
        const packageData = req.body;

        // Convertir arrays a JSON strings para SQLite
        const pkg = await prisma.package.create({
            data: {
                ...packageData,
                includes: JSON.stringify(packageData.includes || []),
                notIncludes: JSON.stringify(packageData.notIncludes || []),
                itinerary: JSON.stringify(packageData.itinerary || []),
                photos: JSON.stringify(packageData.photos || [])
            }
        });

        res.status(201).json(pkg);
    } catch (error: any) {
        console.error('Error en create package:', error);
        res.status(500).json({ error: 'Error al crear paquete' });
    }
}
