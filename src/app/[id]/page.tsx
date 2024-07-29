import Image from "next/image";
import dbConnection from "@/lib/mongodb";

interface PostPageParams {
  params: {
    id: string;
  };
}

export default async function PostPage({ params }: PostPageParams) {
  const post: Post | null = await getPost(params.id);
  return post ? (
    <article className="flex flex-col items-center max-w-3xl mx-auto">
      <Image
        src={post.author.avatar.picture}
        alt={post.author.name}
        width={250}
        height={250}
      />
      <h2 className="font-bold text-2xl my-4">{post.author.name}</h2>
      <p>{post.post.body}</p>
    </article>
  ) : (
    <p className="text-center">Post not found</p>
  );
}

export async function getPost(id: string): Promise<Post | null> {
  try {
    const client = await dbConnection;
    const db = client!.db();
    const post = await db.collection<Post>("posts").findOne({ id: Number(id) });
    return post
      ? { id: post?.id, author: post?.author, post: post?.post }
      : null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
