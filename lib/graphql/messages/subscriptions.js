import { gql } from "apollo-boost";

export const SUBSCRIBE_MESSAGES = gql`
  subscription SUBSCRIBE_MESSAGES {
    messages(order_by: { created_at: desc }) {
      id
      created_by
      content
      created_at
    }
  }
`;
