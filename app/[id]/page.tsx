import Home from "@/components/HomeLayout";
import React, { useEffect } from "react";
import { IoArrowBack } from "react-icons/io5";
import Image from "next/image";
import { useCurrentUser, useGetUserById } from "@/hooks/user";
import FeedCards from "@/components/UI/FeedCards";
import { Tweet, User } from "@/gql/graphql";
import { notFound, usePathname } from "next/navigation";
import {  NextPage } from "next";
import { graphqlClient } from "@/clients/api";
import { getUserByIdQuery } from "@/graphql/query/user";

interface ServerProps {
  params: {
    id: string;
  };
}

const Profile: NextPage<ServerProps> = async ({
  params,
}: {
  params: { id: string };
}) => {
  const id = params.id;
  console.log(id);
  if (!id) return;
  let user = await graphqlClient.request(getUserByIdQuery, { id });
  if (!user) return;
  let data = user.getUserById;
  return (
    <div>
      <Home>
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
          </div>
          <div>
            {data?.tweets?.map((tweet) => (
              <FeedCards data={tweet as Tweet} key={tweet?.id} />
            ))}
          </div>
        </div>
      </Home>
    </div>
  );
};

export default Profile;
