import { gql } from '@apollo/client';

export const SEARCH_ANIME_QUERY = gql`
  query SearchAnime($searchTerm: String!) {
    anime: Page {
      id
      results: media(search: $searchTerm, type: ANIME) {
        id
        title {
          english
          native
        }
        siteUrl
        description
      }
    }
  }
`;
