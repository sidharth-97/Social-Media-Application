import { graphqlClient } from "@/clients/api"
import { User } from "@/gql/graphql"
import { getCurrentUserQuery, getUserByIdQuery } from "@/graphql/query/user"
import { useQuery } from "@tanstack/react-query"

export const useCurrentUser = () => {
    const query = useQuery({
        queryKey: ["curr-user"],
        queryFn:()=>graphqlClient.request(getCurrentUserQuery)
    })
    return {...query,user:query.data?.getCurrentUser}
}

export const useGetUserById = (id: string) => {
    const query = useQuery({
        queryKey: ["user-id"],
        queryFn:()=>graphqlClient.request(getUserByIdQuery,{id})
    })
    console.log(id);
    return {...query,userWithId:query.data?.getUserById}
}