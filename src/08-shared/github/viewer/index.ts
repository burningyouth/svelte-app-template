import { octokit } from "../index";

type Response = {
  viewer: {
    avatarUrl: string;
    bio: string;
    login: string;
    name: string;
    repositories: {
      totalCount: number;
      nodes: {
        name: string;
        createdAt: DateTimeISO;
        updatedAt: DateTimeISO;
        homepageUrl: URI;
        resourcePath: URI;
        url: URI;
        description: string;
        deployments: {
          nodes: {
            latestEnvironment: URI;
          }[];
        };
        repositoryTopics: {
          nodes: {
            topic: { name: string };
            url: URI;
          }[];
        };
      }[];
    };
  };
};
export type Label = {
  name: string;
  url: URI;
};

export type NormalizedViewer = {
  avatarUrl: string;
  bio: string;
  login: string;
  name: string;
  repositories: {
    totalCount: number;
    nodes: {
      name: string;
      createdAt: DateTimeISO;
      updatedAt: DateTimeISO;
      homepageUrl: URI;
      resourcePath: URI;
      url: URI;
      description: string;
      deployment?: URI;
      repositoryTopics: Label[];
    }[];
  };
};

const viewerResponse: Promise<Response> = octokit.graphql(`{
  viewer {
    avatarUrl
    bio
    login
    name
    repositories(last: 100, affiliations: [OWNER]) {
      totalCount
      nodes{
        name
        createdAt
        updatedAt
        homepageUrl
        resourcePath
        url
        description
        deployments(first: 1) {
          nodes {
            latestEnvironment
          }
        }
        repositoryTopics(first: 10) {
          nodes {
            topic {
              name
            }
            url
          }
        }
      }
   }
 } 
}`);

const normalizeResponse = (response: Response): NormalizedViewer => {
  const normalizedRepositories = response.viewer.repositories.nodes.map(
    (item) => ({
      ...item,
      deployments: undefined,
      repositoryTopics: item.repositoryTopics.nodes.map((node) => ({
        name: node.topic.name,
        url: node.url,
      })),
      deployment: item.deployments.nodes[0]?.latestEnvironment ?? undefined,
    })
  );

  return {
    ...response.viewer,
    repositories: {
      totalCount: response.viewer.repositories.totalCount,
      nodes: normalizedRepositories,
    },
  };
};

export const viewer: Promise<NormalizedViewer> = new Promise(
  (resolve, reject) => {
    viewerResponse
      .then((response) => resolve(normalizeResponse(response)))
      .catch(reject);
  }
);
