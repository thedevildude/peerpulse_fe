import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageIcon, VoteIcon } from "lucide-react";
import PostForm from "./PostForm";
import PollForm from "./PollForm";

export const CreatePost = () => {
  return (
    <div className="flex w-full flex-col gap-5 rounded-md bg-white">
      <Tabs defaultValue="post" className="p-5">
        <TabsList>
          <TabsTrigger value="post">
            <ImageIcon size={20} />
            <p className="ml-2">Post</p>
          </TabsTrigger>
          <TabsTrigger value="poll">
            <VoteIcon size={20} />
            <p className="ml-2">Poll</p>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="post">
          <PostForm />
        </TabsContent>
        <TabsContent value="poll">
          <PollForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};
