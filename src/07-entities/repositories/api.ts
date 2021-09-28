import { octokit } from "../../08-shared/octokit";
import {
  normalizeRawRepository,
  normalizeViewerRepositoryResponse,
} from "./lib";

export const getRepositoryReadme = async (owner: string, repo: string) => {
  const promise = await fetch(
    `https://raw.githubusercontent.com/${owner}/${repo}/master/README.md`
  );
  if (promise.ok) return promise;
  throw promise;
};

export const getRepository = (
  owner: string,
  repo: string
): Promise<Repository> => {
  return new Promise((resolve, reject) => {
    octokit
      .graphql(
        `{
  repository(owner: "${owner}", name: "${repo}") {
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
}`
      )
      .then((response: RepositoryResponse) =>
        resolve(normalizeRawRepository(response.repository))
      )
      .catch(reject);
  });
};

export const getViewerRepositories = (): Promise<Repositories> => {
  return new Promise((resolve, reject) => {
    octokit
      .graphql(
        `{
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
}`
      )
      .then((response: ViewerRepositoriesResponse) =>
        resolve(normalizeViewerRepositoryResponse(response))
      )
      .catch(reject);
  });
};
