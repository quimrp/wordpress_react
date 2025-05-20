import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      nodes {
        id
        title
        date
      }
    }
  }
`;

export const GET_VIEWER = gql`
  query GetViewer {
    viewer {
      id
    }
  }
`;

export const GET_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      title
      date
    }
  }
`; 