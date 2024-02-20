"use client"
import FeedCards from "@/components/UI/FeedCards";
import Image from "next/image";
import React, { useCallback } from "react";
import { BiHomeCircle } from "react-icons/bi";
import { FaSquareXTwitter } from "react-icons/fa6";
import {GoogleLogin,CredentialResponse} from '@react-oauth/google'
import toast from "react-hot-toast";
import { graphqlClient } from "@/clients/api";
import { verifyTokenQuery } from "@/graphql/query/user";

interface sidebarButton{
  title: string;
  icon:React.ReactNode
}

const sidebarMenuItems: sidebarButton[] = [
  {
    title: "Home",
    icon:<BiHomeCircle/>
  }
]

export default function Home() {
  const handleLogin = useCallback(async(cred:CredentialResponse) => {
    const googleToken = cred.credential
    if (!googleToken) return toast.error("Google token not found")
    const { verifyGoogleToken } = await graphqlClient.request(verifyTokenQuery, { token: googleToken })
    toast.success("Login successfull")
    console.log(verifyGoogleToken);
    if(verifyGoogleToken)window.localStorage.setItem("social",verifyGoogleToken)
  },[])
  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen px-48">
        <div className=" col-span-3 pt-3">
          <FaSquareXTwitter className=" text-4xl" />
          <ul className="flex gap-2 py-4 text-xl">
          {
              sidebarMenuItems.map((item,index) => <li key={index} className=" flex gap-4 justify-center items-center hover:bg-gray-800 rounded-full p-4">{item.icon}{ item.title}</li>)
            }
          </ul>
          <button className="bg-[#1d9bf0] p-4 rounded-full w-1/2">Post</button>
        </div>
        <div className=" col-span-6 border-r-2 border-l-2 border-slate-500">
          <FeedCards />
          <FeedCards />
          <FeedCards/>
        </div>
        <div className=" col-span-3">
          <div>
            <h1>New to X? </h1>
          <GoogleLogin onSuccess={handleLogin}/>
          </div>
           
        </div>
      </div>
   </div>
  );
}
