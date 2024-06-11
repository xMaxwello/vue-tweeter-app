interface Tweet{
    id: number;
    body: string;
    imageUrl: string;
    user: User;
    is_liked: boolean;
    likes_count: number;
    comments_count: number;
    comments: Comment[];
    created_at: string;
}

interface User {
    id: number;
    full_name: string;
    avatar_url: string;
}

export type { Tweet };