interface AuthorAvatar {
    thumbnail: string;
    picture: string;
}

interface PostAuthor {
    name: string;
    avatar: AuthorAvatar;
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

type PaginatedPosts = {
    posts: Post[];
    hasNext: boolean;
};