import { PostModel } from "@/components/posts/models";

const PostCard = (post: PostModel) => {
  return (
    <div>
      <p>{post.title}</p>
      <p>{post.content}</p>
    </div>
  );
};

export default PostCard;
