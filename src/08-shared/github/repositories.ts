import { octokit } from ".";

type Response = {
  viewer: {
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

export type Repositories = {
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

const promise: Promise<Response> = octokit.graphql(`{
  viewer {
    repositories(first: 100, affiliations: [OWNER], orderBy: {field: CREATED_AT, direction: DESC}, privacy: PUBLIC) {
      totalCount
      nodes{
        name
        createdAt
        updatedAt
        homepageUrl
        resourcePath
        url
        description
        repositoryTopics(first: 10)  {
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

const normalizeDate = (date: DateTimeISO) =>
  new Intl.DateTimeFormat("ru", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));

const normalizeResponse = (response: Response): Repositories => {
  const normalizedRepositories = response.viewer.repositories.nodes.map(
    (item) => ({
      ...item,
      updatedAt: normalizeDate(item.updatedAt),
      createdAt: normalizeDate(item.createdAt),
      repositoryTopics: item.repositoryTopics.nodes.map((node) => ({
        name: node.topic.name,
        url: node.url,
      })),
    })
  );

  return {
    totalCount: response.viewer.repositories.totalCount,
    nodes: normalizedRepositories,
  };
};

export const repositories: Promise<Repositories> = new Promise(
  (resolve, reject) => {
    promise
      .then((response) => resolve(normalizeResponse(response)))
      .catch(reject);
  }
);
