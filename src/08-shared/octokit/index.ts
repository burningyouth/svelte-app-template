// Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
import { Octokit } from "@octokit/core";

export const octokit = new Octokit({
  auth: `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`,
});
