// Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
import { Octokit } from "@octokit/core";

export const octokit = new Octokit({
  auth: `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`,
});
