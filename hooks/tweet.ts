import { graphqlClient } from "@/clients/api"
import { getAllTweetQuery } from "@/graphql/query/tweet"
import { useQuery } from "@tanstack/react-query"


export const useGetAllTweet = () => {
    const query = useQuery({
        queryKey: ["all-tweets"],
        queryFn:()=>graphqlClient.request(getAllTweetQuery)
    })
    return {...query,tweets:query.data?.getAllTweets}
}