import { octokit } from ".";

type Response = {
  viewer: {
    avatarUrl: string;
    bio: string;
    login: string;
    name: string;
    email: string;
    url: URI;
  };
};

export type Viewer = {
  avatarUrl: string;
  bio: string;
  login: string;
  name: string;
  email: string;
  url: URI;
};

const viewerResponse: Promise<Response> = octokit.graphql(`{
  viewer {
    avatarUrl
    bio
    login
    name
    email
    url
 } 
}`);

export const viewer: Promise<Viewer> = new Promise((resolve, reject) => {
  viewerResponse.then((response) => resolve(response.viewer)).catch(reject);
});
