import { useCreateTweet, useGetAllTweet } from "@/hooks/tweet";
import React, { useCallback, useState } from "react";
import { CiImageOn } from "react-icons/ci";
import FeedCards from "./UI/FeedCards";
import { Tweet, User } from "@/gql/graphql";
import Image from "next/image";
import { useCurrentUser } from "@/hooks/user";

interface FeedProps{
    user?:User
}

const Feeds: React.FC<FeedProps> = () => {
  const { mutate } = useCreateTweet();
  const { tweets = [] } = useGetAllTweet();
  const [content, setContent] = useState("");
  const { user } = useCurrentUser();
  const handleImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
  }, []);

  const handlePostTweet = useCallback(() => {
    mutate({
      content,
    });
    setContent("");
  }, [content, mutate]);
  return (
    <>
      <div className="grid grid-cols-12 sm:gap-3 transition-all cursor-pointer mb-5">
        <div className="col-span-1">
          {user?.profileImage && (
            <Image
              className="rounded-full"
              src={user?.profileImage}
              alt="user-image"
              height={50}
              width={50}
            />
          )}
        </div>
        <div className="col-span-11">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full bg-transparent text-lg sm:text-xl px-3 border-b border-slate-700"
            placeholder="What's happening?"
            rows={3}
          ></textarea>
          <div className="mt-2 flex justify-between items-center">
            <CiImageOn onClick={handleImage} className=" text-white text-2xl" />
            <button
              onClick={handlePostTweet}
              className="bg-[#1d9bf0] font-semibold text-sm py-2 px-4 rounded-full"
            >
              Post
            </button>
          </div>
        </div>
      </div>
      {tweets?.map((tweet) =>
        tweet ? <FeedCards key={tweet?.id} data={tweet as Tweet} /> : null
      )}
    </>
  );
};

export default Feeds;
