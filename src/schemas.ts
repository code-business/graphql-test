import { gql } from 'apollo-server';

export default gql`
  type Query {
    longestRaisingSequence(sequence: [Int]!): [Int]
  }
`;
