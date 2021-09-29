import { writable } from "svelte/store";

export const filteredTopics = writable<string[]>([]);

export const filteredRepos = writable<Repository[]>([]);

export const allRepos = writable<Repository[]>([]);

export const allReposDictionary = writable<{ [key: string]: Repository }>({});
