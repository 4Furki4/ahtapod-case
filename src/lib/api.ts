import axios from "axios";
export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
});

export async function getPosts(page: number = 1, limit: number = 10) {
    return (await api.get(`/api/posts?page=${page}&limit=${limit}`)).data
}