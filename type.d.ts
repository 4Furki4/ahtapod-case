type Post = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    content: string;
    viewCount: number;
    userId: string;
}

type PostWithUser = {
    user: {
        id: string;
        email: string;
        firstName: string | null;
        lastName: string | null;
        imageUrl: string | null;
    } | null;
} & Post
type GetPostsResponse = {
    posts: PostWithUser[]
    totalPosts: number
    totalPages: number
}

