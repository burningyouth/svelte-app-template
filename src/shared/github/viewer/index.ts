import { octokit } from "../index";

export type ViewerStore = Partial<{
  viewer: {
    avatarUrl: string;
    bio: string;
    login: string;
    repositories: {
      totalCount: number;
      pageInfo: {
        endCursor: number;
        hasNextPage: boolean;
      };
      nodes: {
        name: string;
        createdAt: DateTimeISO;
        homepageUrl: URI;
        resourcePath: URI;
        url: URI;
      };
    };
  };
}>;

export const viewer: Promise<ViewerStore> = octokit.graphql(`{
  viewer {
    avatarUrl
    bio
    login
    repositories(first: 100, affiliations: [OWNER]) {
      totalCount
      pageInfo {
        endCursor
        hasNextPage
      }
      nodes{
        name
        createdAt
        homepageUrl
        resourcePath
        url
      }
   }
 } 
}`);
