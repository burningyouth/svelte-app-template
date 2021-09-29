// Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
import { Octokit } from "@octokit/core";

export const octokit = new Octokit({
  auth: `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`,
});
