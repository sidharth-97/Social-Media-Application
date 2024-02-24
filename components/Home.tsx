"use client";
import FeedCards from "@/components/UI/FeedCards";
import Image from "next/image";
import React, { useCallback } from "react";
import { BiHomeCircle, BiImageAlt } from "react-icons/bi";
import { FaSquareXTwitter } from "react-icons/fa6";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import toast from "react-hot-toast";
import { graphqlClient } from "@/clients/api";
import { verifyTokenQuery } from "@/graphql/query/user";
import { useCurrentUser } from "@/hooks/user";
import { useQueryClient } from "@tanstack/react-query";
import { CiImageOn } from "react-icons/ci";
import { useGetAllTweet } from "@/hooks/tweet";
import { Tweet } from "@/gql/graphql";

interface sidebarButton {
  title: string;
  icon: React.ReactNode;
}

const sidebarMenuItems: sidebarButton[] = [
  {
    title: "Home",
    icon: <BiHomeCircle />,
  },
];

export default function Home() {
  const { user } = useCurrentUser();
  const {tweets=[]}=useGetAllTweet()
  const queryClient = useQueryClient();
  console.log(user);
  const handleLogin = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;
      if (!googleToken) return toast.error("Google token not found");
      const { verifyGoogleToken } = await graphqlClient.request(
        verifyTokenQuery,
        { token: googleToken }
      );
      toast.success("Login successfull");
      console.log(verifyGoogleToken);
      if (verifyGoogleToken)
        window.localStorage.setItem("social", verifyGoogleToken);
      await queryClient.invalidateQueries({ queryKey: ["curr-user"] });
    },
    [queryClient]
  );
  const handleImage = useCallback(() => {
    const input = document.createElement("input")
    input.setAttribute("type", "file")
    input.setAttribute("accept", "image/*")
    input.click()
  },[])
  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen px-48 relative sm:px-56">
        <div className=" col-span-3 p-3">
          <FaSquareXTwitter className=" text-4xl" />
          <ul className="flex gap-2 py-4 text-xl">
            {sidebarMenuItems.map((item, index) => (
              <li
                key={index}
                className=" flex gap-4 justify-center items-center hover:bg-gray-800 rounded-full p-4"
              >
                {item.icon}
                {item.title}
              </li>
            ))}
          </ul>
          <button className="bg-[#1d9bf0] p-3 rounded-full w-1/2">Post</button>
          <div className=" absolute bottom-5 flex gap-2 bg-slate-800 px-3 py-3 rounded-full">
            {user && user.profileImage && (
              <div className="flex justify-center items-center gap-3">
                <Image
                  className=" rounded-full"
                  src={user?.profileImage}
                  alt="image"
                  typeof="input"
                  height={50}
                  width={50}
                />
                <div className="flex gap-1">
                <h5>{user?.firstName}</h5>
                <h5>{user?.lastName}</h5>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className=" col-span-6 border-r-2 border-l-2 border-slate-500 p-5">
          <div className="grid grid-cols-12 gap-3 transition-all cursor-pointer mb-5">
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
                className="w-full bg-transparent text-xl px-3 border-b border-slate-700"
                placeholder="What's happening?"
                rows={3}
              ></textarea>
              <div className="mt-2 flex justify-between items-center">
                <CiImageOn onClick={handleImage} className=" text-white text-2xl" />
                <button className="bg-[#1d9bf0] font-semibold text-sm py-2 px-4 rounded-full">
                  Post
                </button>
              </div>
            </div>
          </div>
          {
            tweets?.map((tweet) => tweet?<FeedCards key={tweet?.id} data={tweet as Tweet} />:null)
          }
        </div>
        <div className=" col-span-3">
          {!user && (
            <div>
              <h1>New to X?</h1>
              <GoogleLogin onSuccess={handleLogin} />
            </div>
          )}
        </div> 
      </div>
    </div>
  );
}
