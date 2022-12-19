import {
  ApolloClient,
  gql,
  HttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";
const baseurl = process.env.REACT_APP_API_KEY;

const wsLink = new GraphQLWsLink(createClient({
  url: baseurl,
  // connectionParams: {
  //   authToken: user.authToken,
  // },
  options:{
    reconnect:true
  }
}));

const httpLink = new HttpLink({
  uri: baseurl,
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
