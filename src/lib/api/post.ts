import { api } from "../utils"
/**
 * 
 * @param page  The page number to get posts from, default is 1
 * @param limit The number of posts to get per page, default is 10
 * @returns The postsWithUsers and the total number of posts and pages based on the limit
 */
export async function getPosts(page: number = 1, limit: number = 10) {
    return (await api.get(`/api/posts?page=${page}&limit=${limit}`)).data as GetPostsResponse
}
/**
 * 
 * @param postId The ID of the post to get
 * @param token The JWT of the user by clerk APIs
 * @returns The post with the user
 */
export async function createPost(newPost: Post, token: string | null) {
    return (await api.post('/api/posts', newPost, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })).data
}
/**
 * 
 * @param postId The ID of the post to delete
 * @param token The JWT of the user by clerk APIs
 * @returns The deleted post
 */
export async function deletePost(postId: string, token: string | null) {
    return (await api.delete(`/api/posts/${postId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })).data as PostWithUser
}

/**
 * 
 * @param postId the ID of the post to edit
 * @param editedPost the edited post
 * @param token the JWT of the user by clerk APIs
 * @returns the edited post With User
 */
export async function editPost(postId: string, editedPost: Post, token: string | null) {
    return (await api.put(`/api/posts/${postId}`, editedPost, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })).data as PostWithUser
}
/**
 * 
 * @returns the total number of posts
 */
export async function getPostCount() {
    return (await api.get('/api/posts/count')).data as {
        count: number
    }
}