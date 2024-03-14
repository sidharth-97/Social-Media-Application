import Home from "@/components/HomeLayout";
import React from "react";

import FeedCards from "@/components/UI/FeedCards";
import { Tweet, User } from "@/gql/graphql";
import { NextPage } from "next";
import { graphqlClient } from "@/clients/api";
import { getCurrentUserQuery, getUserByIdQuery } from "@/graphql/query/user";
import UserProfileHeader from "@/components/UserProfileHeader";

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
  if (!id) return;
  let user = await graphqlClient.request(getUserByIdQuery, { id });
  if (!user) return;
  let data = user.getUserById;
  
  return (
    <div>
      <Home>
        <div>
        <UserProfileHeader data={data}/>
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
