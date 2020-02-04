import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import apolloClient from "./lib/graphql/client";
import Main from './pages/Main'

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <Main />
    </ApolloProvider>
  );
}
