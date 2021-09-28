import { octokit } from "../../08-shared/octokit";

const viewerResponse: Promise<ViewerResponse> = octokit.graphql(`{
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
