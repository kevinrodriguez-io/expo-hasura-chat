import { HttpLink, split } from "apollo-boost";
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";

const httpLink = new HttpLink({
  uri: "https://expo-hasura-chat.herokuapp.com/v1/graphql"
});

const wsLink = new WebSocketLink({
  uri: `wss://expo-hasura-chat.herokuapp.com/v1/graphql`,
  options: {
    reconnect: true,
    connectionCallback: (error) => {
      console.log({error})
    }
  }
});

const link = split(
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

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

export default client;
