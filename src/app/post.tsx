import Image from "next/image";
import Link from "next/link";

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps) {
  return (
    <Link href={`/${post.id}`}>
      <article className="max-w-3xl mx-auto prose dark:prose-dark">
        <Image
          src={post.author.avatar}
          alt={post.author.name}
          width={40}
          height={40}
        />
        <h3>{post.author.name}</h3>
        <p>{post.post.body}</p>
      </article>
    </Link>
  );
}
