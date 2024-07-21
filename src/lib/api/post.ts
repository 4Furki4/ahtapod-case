import { api } from "../utils"

export async function getPosts(page: number = 1, limit: number = 10) {
    return (await api.get(`/api/posts?page=${page}&limit=${limit}`)).data as GetPostsResponse
}

export async function createPost(newPost: Post, token: string | null) {
    return (await api.post('/api/posts', newPost, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })).data
}

export async function deletePost(postId: string, token: string | null) {
    return (await api.delete(`/api/posts/${postId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })).data
}

export async function editPost(postId: string, editedPost: any, token: string | null) {
    return (await api.put(`/api/posts/${postId}`, editedPost, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })).data
}

export async function getPostCount() {
    return (await api.get('/api/posts/count')).data
}