import { GraphQLClient } from "graphql-request";

const isClient=typeof window !="undefined"

export const graphqlClient = new GraphQLClient("http://localhost:3002/graphql", {
    headers: () => ({
        Authorization:isClient?`Bearer ${window.localStorage.getItem("social")}`:""
    })
})