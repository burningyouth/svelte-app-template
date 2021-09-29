// Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
import { Octokit } from "@octokit/core";

export const octokit = new Octokit({
  auth: `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`,
});
