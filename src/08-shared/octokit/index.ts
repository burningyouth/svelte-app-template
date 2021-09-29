// Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
import { Octokit } from "@octokit/core";

export const octokit = new Octokit({
  auth: `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`,
});
