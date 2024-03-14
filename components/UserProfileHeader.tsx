"use client";
import React, { useCallback, useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import Image from "next/image";
import { useCurrentUser } from "@/hooks/user";
import { User } from "@/gql/graphql";
import { graphqlClient } from "@/clients/api";
import { followUserMutation, unfollowUserMutation } from "@/graphql/mutation/user";
import { useQueryClient } from "@tanstack/react-query";

const UserProfileHeader = ({ data }: { data: any }) => {
  const [currUserData, setCurrUserData] = useState<User>();
 const queryClient=useQueryClient()
 const currUser = useCurrentUser();
  useEffect(() => {
    setCurrUserData(currUser.data?.getCurrentUser as User);
  }, [currUser]);

  const handleFollowUser = useCallback(async () => {
    await graphqlClient.request(followUserMutation, { to: data.id });
    await queryClient.invalidateQueries({ queryKey: ["curr-user"] })
  }, [data]);

  const handleUnFollowUser = useCallback(async () => {
    await graphqlClient.request(unfollowUserMutation, { to: data.id });
    await queryClient.invalidateQueries({ queryKey: ["curr-user"] })
  }, [data]);

  return (
    <div>
      <nav className="flex">
        <IoArrowBack className=" text-4xl" />
        <div>
          <h1 className=" text-2xl">
            {data?.firstName} {data?.lastName}
          </h1>
          <p className=" text-slate-500">{data?.tweets?.length} Tweets</p>
        </div>
      </nav>
      <div className="p-4">
        {data?.profileImage && (
          <Image
            className=" rounded-full"
            src={data.profileImage}
            alt={""}
            width={90}
            height={90}
          />
        )}
        <h1 className=" text-2xl mt-4">
          {data?.firstName} {data?.lastName}
        </h1>
        <div className="flex justify-between items-center">
          <div className="flex gap-2 mt-2">
            <h1>{data?.followers?.length} followers</h1>
            <h1>{data?.following?.length} following</h1>
          </div>
          {data?.id != currUserData?.id && (
            <div className="bg-white text-black text-lg font-medium px-2 py-1 rounded-full">
              {currUserData?.following?.find((item) => item?.id == data?.id) ? (
                <button onClick={handleUnFollowUser} className="">Un Follow</button>
              ) : (
                <button onClick={handleFollowUser} className="">
                  Follow
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfileHeader;
