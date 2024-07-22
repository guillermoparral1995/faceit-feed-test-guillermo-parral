interface PostAuthor {
    name: string;
    avatar: string;
}

interface PostContent {
    created_at: string;
    body: string;
}

interface Post {
    id: number;
    author: PostAuthor
    post: PostContent;
}