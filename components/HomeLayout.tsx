"use client";
import FeedCards from "@/components/UI/FeedCards";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { BiHomeCircle, BiImageAlt } from "react-icons/bi";
import { FaSquareXTwitter } from "react-icons/fa6";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import toast from "react-hot-toast";
import { graphqlClient } from "@/clients/api";
import { verifyTokenQuery } from "@/graphql/query/user";
import { useCurrentUser } from "@/hooks/user";
import { useQueryClient } from "@tanstack/react-query";
import { HiOutlineUser } from "react-icons/hi";
import Link from "next/link";

interface sidebarButton {
  title: string;
  icon: React.ReactNode;
  link: string;
}


interface LayoutProps{
  children: React.ReactNode
}

const Home:React.FC<LayoutProps>=(props)=> {
  const { user } = useCurrentUser();

  const queryClient = useQueryClient();
 

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

  const sidebarMenuItems: sidebarButton[] = [
    {
      title: "Home",
      icon: <BiHomeCircle className=" text-2xl" />,
      link:"/"
    },
    {
      title: "Profile",
      icon: <HiOutlineUser className=" text-2xl"/>,
      link:`/${user?.id}`
    }
  ];
 
  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen sm:px-48 relative">
        <div className=" col-span-3 py-3 flex flex-col gap-3 sm:gap-0">
          <FaSquareXTwitter className=" ms-3 text-4xl" />
          <ul className="flex flex-col items-start sm:py-4 text-lg font-semibold sm:text-xl">
            {sidebarMenuItems.map((item, index) => (
              <li
                key={index}
                className=" flex gap-1 sm:gap-4 justify-center font-semibold items-center hover:bg-gray-800 rounded-full sm:p-4"
              >
                <Link className="flex gap-1 justify-center items-center" href={item.link}>
                {item.icon}
                {item.title}
                </Link>
              </li>
            ))}
          </ul>
          <button className="bg-[#1d9bf0] p-1 sm:p-3 font-semibold rounded-full sm:w-1/2">Post</button>
          <div className="absolute bottom-5 flex gap-2 bg-slate-800 sm:px-3 sm:py-3 rounded-full">
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
                <div className="hidden sm:flex gap-1">
                <h5>{user?.firstName}</h5>
                <h5>{user?.lastName}</h5>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className=" col-span-6 border-r-2 border-l-2 border-slate-500 p-5">
          {props.children}
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


export default Home