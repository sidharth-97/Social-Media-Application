import { useCreateTweet, useGetAllTweet } from "@/hooks/tweet";
import React, { useCallback, useState } from "react";
import { CiImageOn } from "react-icons/ci";
import FeedCards from "./UI/FeedCards";
import { Tweet, User } from "@/gql/graphql";
import Image from "next/image";
import { useCurrentUser } from "@/hooks/user";
import { graphqlClient } from "@/clients/api";
import { getSignedImageURL } from "@/graphql/query/tweet";
import axios from "axios";
import toast from "react-hot-toast";

interface FeedProps{
    user?:User
}

const Feeds: React.FC<FeedProps> = () => {
  const { mutate } = useCreateTweet();
  const { tweets = [] } = useGetAllTweet();
  const [imageURL,setImageURL]=useState("")
  const [content, setContent] = useState("");
  const { user } = useCurrentUser();

  const handleInputChange = useCallback((input: HTMLInputElement) => {
    return async(event: Event) => {
      event.preventDefault();
      const file: File | null | undefined = input.files?.item(0)
      if (!file) return;
      const { getSignedUrl } = await graphqlClient.request(getSignedImageURL, {
        imageName:file.name,
        imageType:file.type
      })
      if (getSignedUrl) {
        toast.loading("Uploading", { id: "2" })
        try {
            await axios.put(getSignedUrl, file, {
          headers: {
            "Content-Type":file.type
          }
        })
        } catch (error) {
          console.log(error);
          
        }
      
        toast.success("Upload Completed", { id: "2" })
        const url = new URL(getSignedUrl)
        console.log(url);
        
        const filePath = `${url.origin}${url.pathname}`
        console.log(filePath);
        
        setImageURL(filePath)
      }
  }
},[])
  const handleImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");

  const handlerFn=handleInputChange(input)
    input.addEventListener("change",handlerFn)
    input.click();
  }, [handleInputChange]);

  const handlePostTweet = useCallback(() => {
    mutate({
      content,
      imageURL
    });
    setContent("");
    setImageURL("")
  }, [content,imageURL, mutate]);
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
          {imageURL&& <Image src={imageURL} alt="img"width={300}height={300}/>}
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
