import { PostAssignedModel } from "@/components/posts/models";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getRelativeTimeOrFormattedDateTime } from "@/lib/dateFns";

const PostCard = (post: PostAssignedModel) => {
  const getImageRatio = (media?: string) => {
    if (!media) return;
    const image = new Image();
    image.src = media;
    const ratio = image.width / image.height;

    if (Math.abs(ratio - 16 / 9) <= 0.1) {
      return 16 / 9;
    } else if (Math.abs(ratio - 1.91 / 1) <= 0.1) {
      return 1.91 / 1;
    } else if (Math.abs(ratio - 1 / 1) <= 0.1) {
      return 1 / 1;
    } else if (Math.abs(ratio - 9 / 16) <= 0.1) {
      return 9 / 16;
    } else {
      return 3 / 2; // default ratio
    }
  };

  const imageRatio = getImageRatio(post.media);

  return (
    <div className="flex w-full flex-col gap-2 rounded-md border border-gray-200 bg-white p-2 shadow-md dark:bg-black">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="https://picsum.photos/100" />
          </Avatar>
          <p>{post.Author.username}</p>
        </div>
        <p>{getRelativeTimeOrFormattedDateTime(post.createdAt)}</p>
      </div>
      <p className="font-bold">{post.title}</p>
      <p>{post.content}</p>
      {post.media && (
        <AspectRatio ratio={imageRatio}>
          <img
            src={post.media}
            alt="Post"
            className="h-full w-full object-cover"
          />
        </AspectRatio>
      )}
    </div>
  );
};

export default PostCard;
