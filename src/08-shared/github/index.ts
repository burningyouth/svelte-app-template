// Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
import { Octokit } from "@octokit/core";

export const octokit = new Octokit({
  auth: `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`,
});
