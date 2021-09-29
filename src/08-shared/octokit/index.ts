// Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
import { Octokit } from "@octokit/core";

export const octokit = new Octokit({
  auth: `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`,
});
