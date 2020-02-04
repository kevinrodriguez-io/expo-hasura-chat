import { gql } from "apollo-boost";

export const INSERT_MESSAGE = gql`
  mutation INSERT_MESSAGE($objects: [messages_insert_input!]!) {
    insert_messages(objects: $objects) {
      affected_rows
    }
  }
`;
