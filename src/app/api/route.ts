import { NextResponse, type NextRequest } from "next/server";
import dbConnection from "@/lib/mongodb";
import { faker } from '@faker-js/faker';

/**
 * GET endpoint to fetch paginated posts
 * @param request - NextRequest object which receives "limit" and "offset" for pagination
 * @returns - NextResponse object with Post[] or error message
 */
export async function GET(request: NextRequest): Promise<NextResponse<Post[] | { error: string }>> {
    const queryParams = request.nextUrl.searchParams;
    const limit = Number(queryParams.get('limit')) || 20;
    const offset = Number(queryParams.get('offset')) || 0;
    
    try {
        const client = await dbConnection;
        const db = client.db();
        const posts: Post[] = await db.collection<Post>('posts').find().sort({ "post.created_at": -1 }).limit(limit).skip(offset).toArray();
        return NextResponse.json(posts, { status: 200 });
      } catch (error) {
        return NextResponse.json({ error: 'Unable to fetch posts' }, { status: 500 });
      }
}

const generateRandomPost = (id: number): Post => {
    return {
        id,
        author: {
          name: faker.person.fullName(),
          avatar: {
              thumbnail: `http://dummyimage.com/40x40.png/${faker.color.rgb().replace('#', '')}/${faker.color.rgb().replace('#', '')}`,
              picture: `http://dummyimage.com/250x250.png/${faker.color.rgb()}/${faker.color.rgb()}`,
          },
        },
        post: {
          created_at: new Date().toISOString(),
          body: faker.lorem.sentence(),
        }
    };
}

/**
 * POST endpoint for triggering creating a new post from the client
 * This behavior is intended to mock a real-time post creation, in reality we would expect the posts to be created in the background by other users
 * @param _request - NextRequest object
 * @returns
 */
export async function POST(_request: NextRequest): Promise<NextResponse<{ error: string } | { message: string }>> {
    try {
        const client = await dbConnection;
        const db = client.db();
        const postCount = await db.collection<Post>('posts').countDocuments();
        const newPost: Post = generateRandomPost(postCount + 1)
        await db.collection<Post>('posts').insertOne(newPost);
        return NextResponse.json({ message: 'OK!' }, { status: 200 });
      } catch (error) {
        return NextResponse.json({ error: 'Unable to fetch posts' }, { status: 500 });
      }
}