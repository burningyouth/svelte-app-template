// Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
import { Octokit } from "@octokit/core";

export const octokit = new Octokit({
  auth: `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`,
});
