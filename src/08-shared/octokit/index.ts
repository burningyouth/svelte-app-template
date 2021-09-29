// Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
import { Octokit } from "@octokit/core";

export const octokit = new Octokit({
  auth: `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`,
});
