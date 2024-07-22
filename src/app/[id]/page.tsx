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
    <article>
      <Image
        src={post.author.avatar}
        alt={post.author.name}
        width={40}
        height={40}
      />
      <h3>{post.author.name}</h3>
      <p>{post.post.body}</p>
    </article>
  ) : (
    <p>Post not found</p>
  );
}

export async function getPost(id: string): Promise<Post | undefined> {
  return MOCK_DATA.find((post) => post.id === Number(id));
}
