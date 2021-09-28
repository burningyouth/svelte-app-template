import { writable } from "svelte/store";
import { getViewerRepositories } from "./api";

export const repositories = getViewerRepositories();

export const currentRepository = writable<Repository | null>(null);
