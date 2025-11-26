import { Request, Response } from 'express';
import prisma from '../config/database.js';

// GET /api/forum - Listar posts
export async function getPosts(req: Request, res: Response) {
    try {
        const posts = await prisma.forumPost.findMany({
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                },
                comments: {
                    include: {
                        author: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    },
                    orderBy: { createdAt: 'desc' }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        res.json(posts);
    } catch (error: any) {
        console.error('Error en getPosts:', error);
        res.status(500).json({ error: 'Error al obtener posts' });
    }
}

// POST /api/forum - Crear post
export async function createPost(req: Request, res: Response) {
    try {
        const { title, content, userId } = req.body;

        if (!title || !content || !userId) {
            return res.status(400).json({ error: 'Faltan datos requeridos: title, content, userId' });
        }

        const post = await prisma.forumPost.create({
            data: { title, content, userId },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });

        res.status(201).json(post);
    } catch (error: any) {
        console.error('Error en createPost:', error);
        res.status(500).json({ error: 'Error al crear post' });
    }
}

// POST /api/forum/:postId/comments - Crear comentario
export async function createComment(req: Request, res: Response) {
    try {
        const { postId } = req.params;
        const { content, userId } = req.body;

        if (!content || !userId) {
            return res.status(400).json({ error: 'Faltan datos requeridos: content, userId' });
        }

        const comment = await prisma.forumComment.create({
            data: {
                content,
                userId,
                postId
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });

        res.status(201).json(comment);
    } catch (error: any) {
        console.error('Error en createComment:', error);
        res.status(500).json({ error: 'Error al crear comentario' });
    }
}
