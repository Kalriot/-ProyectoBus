import api from './api';

export interface ForumComment {
    id: string;
    content: string;
    authorName: string;
    createdAt: string;
    author: {
        name: string;
    };
}

export interface ForumPost {
    id: string;
    title: string;
    content: string;
    authorName: string;
    likes: number;
    comments: ForumComment[];
    createdAt: string;
    updatedAt: string;
    author: {
        name: string;
    };
}

export interface CreatePostData {
    title: string;
    content: string;
    userId: string;
}

export interface CreateCommentData {
    content: string;
    userId: string;
}

export const forumService = {
    // GET /api/forum - Listar posts
    getPosts: async () => {
        const response = await api.get<ForumPost[]>('/forum');
        return response.data;
    },

    // POST /api/forum - Crear post
    createPost: async (data: CreatePostData) => {
        const response = await api.post<ForumPost>('/forum', data);
        return response.data;
    },

    // POST /api/forum/:postId/comments - Crear comentario
    createComment: async (postId: string, data: CreateCommentData) => {
        const response = await api.post<ForumComment>(`/forum/${postId}/comments`, data);
        return response.data;
    },
};
