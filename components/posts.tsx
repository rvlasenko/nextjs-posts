import { formatDate } from "@/lib/format";
import LikeButton from "./like-icon";
import Image from "next/image";
import { IPost } from "@/lib/posts";

function Post({ post }: { post: IPost }) {
  return (
    <article className="post">
      <div className="post-image">
        <Image
          src={`https://rvlasenko-nextjs-demo-users-image.s3.amazonaws.com/${post.image}`}
          alt={post.title}
          width={100}
          height={100}
        />
      </div>
      <div className="post-content">
        <header>
          <div>
            <h2>{post.title}</h2>
            <p>
              Shared by {post.userFirstName} on{" "}
              <time dateTime={post.createdAt}>
                {formatDate(post.createdAt)}
              </time>
            </p>
          </div>
          <div>
            <LikeButton />
          </div>
        </header>
        <p>{post.content}</p>
      </div>
    </article>
  );
}

export default function Posts({ posts }: { posts: IPost[] }) {
  if (!posts || posts.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  return (
    <ul className="posts">
      {posts.map((post) => (
        <li key={post.id}>
          <Post post={post} />
        </li>
      ))}
    </ul>
  );
}
