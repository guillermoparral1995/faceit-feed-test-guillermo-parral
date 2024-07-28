import Image from "next/image";
import Link from "next/link";

interface PostProps {
  post: Post;
  withHighlight: boolean;
}

export default function Post({ post, withHighlight }: PostProps) {
  return (
    <article
      className={`cursor-pointer max-w-3xl mx-auto dark:prose-dark rounded-md border-2 p-4 my-4 ${
        withHighlight ? "bg-yellow-500" : ""
      }`}
    >
      <Link className="flex gap-4" href={`/${post.id}`}>
        <div className="flex-none">
          <Image
            src={post.author.avatar.thumbnail}
            alt={post.author.name}
            width={40}
            height={40}
          />
        </div>
        <div className="flex-auto">
          <h3 className="mb-2 font-bold">{post.author.name}</h3>
          <p className="line-clamp-2 font-normal">{post.post.body}</p>
        </div>
      </Link>
    </article>
  );
}
