import { PostAssignedModel } from "@/components/posts/models";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getRelativeTimeOrFormattedDateTime } from "@/lib/dateFns";
import PostSettingsPopover from "./PostSettingsPopover";
import { Heart, MessageSquare } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import PostComment from "./PostComment";
import CommentCard from "@/components/comments/CommentCard";
import { CommentUserAssignedModel } from "@/components/comments/models";
import { useState } from "react";

const PostCard = (post: PostAssignedModel) => {
  const [comments, setComments] = useState<CommentUserAssignedModel[]>(
    post.comments,
  );
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

  const PostMeta = [
    {
      icon: Heart,
      name: "likes",
      iconClass: "hover:fill-red-900 dark:hover:fill-red-500",
      count: post._count.likes,
    },
    {
      icon: MessageSquare,
      name: "comments",
      iconClass: "hover:fill-gray-300 dark:hover:fill-gray-500",
      count: post._count.comments,
    },
  ];

  return (
    <div className="flex w-full flex-col gap-2 rounded-xl border border-gray-200 bg-white p-3 shadow-md dark:bg-black">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="https://picsum.photos/100" />
          </Avatar>
          <p>{post.Author.username}</p>
        </div>
        <div className="flex items-center gap-2">
          <p className="tooltip">
            {
              getRelativeTimeOrFormattedDateTime(post.createdAt)
                .relativeDateTime
            }
            <span className="tooltip-text">
              {
                getRelativeTimeOrFormattedDateTime(post.createdAt)
                  .formattedDateTime
              }
            </span>
          </p>
          <PostSettingsPopover {...post} />
        </div>
      </div>
      <p className="font-bold">{post.title}</p>
      <p>{post.content}</p>
      {post.media && (
        <AspectRatio ratio={imageRatio}>
          <img
            src={post.media}
            alt="Post"
            className="h-full w-full rounded-xl object-cover"
          />
        </AspectRatio>
      )}
      <Separator className="my-2" />
      <div className="flex items-center gap-2">
        {PostMeta.map((meta, index) => (
          <div
            key={index}
            className="flex cursor-pointer items-center gap-2 rounded-md bg-gray-100 p-1 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            <meta.icon strokeWidth={0.5} size={24} className={meta.iconClass} />
            <p className="hover:underline">
              {meta.count} {meta.name}
            </p>
          </div>
        ))}
      </div>
      <Separator className="my-2" />
      <PostComment
        post={post}
        onComment={(comment: CommentUserAssignedModel) => {
          setComments((prev) => [comment, ...prev]);
        }}
      />
      {comments.map((comment, index) => (
        <CommentCard key={index} {...comment} />
      ))}
      <div className="flex items-center gap-2">
        {post._count.comments > 1 && (
          <p className="cursor-pointer text-sm text-gray-600 hover:underline dark:text-gray-400">
            View all {post._count.comments} comments
          </p>
        )}
      </div>
    </div>
  );
};

export default PostCard;
