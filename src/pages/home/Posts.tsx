import routes from "@/api/routes";
import { API_ENDPOINT, LocalStorageKeys } from "@/config/constants";
import { pollFormSchema } from "@/validation/post.validation";
import axios from "axios";
import { useEffect, useState } from "react";
import { z } from "zod";

const Posts = () => {
  const [posts, setPosts] = useState<z.infer<typeof pollFormSchema>[]>([]);
  const fetchPosts = async () => {
    const res = await axios.get(API_ENDPOINT + routes.queryPosts.path, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(LocalStorageKeys.accessToken)}`,
      },
      params: {
        limit: 2,
      },
    });
    console.log(res.data);
    setPosts(res.data.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="flex w-full cursor-pointer flex-col gap-3 rounded-md bg-white p-5 transition-colors duration-200 ease-in-out hover:bg-gray-100 dark:bg-black">
      <p>Posts</p>
      {posts &&
        posts.map((post, index) => (
          <div key={index} className="bg-gray-200">
            <p>{post.title}</p>
            <p>{post.content}</p>
          </div>
        ))}
    </div>
  );
};

export default Posts;
