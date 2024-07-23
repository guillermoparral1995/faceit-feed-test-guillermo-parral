import Image from "next/image";
import MOCK_DATA from "../MOCK_DATA.json";

interface PostPageParams {
  params: {
    id: string;
  };
}

export default async function PostPage({ params }: PostPageParams) {
  const post: Post | undefined = await getPost(params.id);
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
    <p>Post not found</p>
  );
}

export async function getPost(id: string): Promise<Post | undefined> {
  return MOCK_DATA.find((post) => post.id === Number(id));
}
