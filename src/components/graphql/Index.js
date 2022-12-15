import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

const baseurl = process.env.REACT_APP_API_KEY;

export const client = new ApolloClient({
  uri: baseurl,
  cache: new InMemoryCache(),
});
