// Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
import { Octokit } from "@octokit/core";

export const octokit = new Octokit({
  auth: `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`,
});
