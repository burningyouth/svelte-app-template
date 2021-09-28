<style>
  .loader {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30vh;
  }

  .loading {
    display: none;
  }

  .repo-info {
    display: flex;
    flex-direction: column;
    gap: var(--gap-200);
  }
</style>

<script lang="ts">
  import { currentRepository } from "../07-entities/repositories";
  import { onMount } from "svelte";
  import {
    getRepository,
    getRepositoryReadme,
  } from "../07-entities/repositories/api";
  import { viewer } from "../07-entities/viewer";
  import Error from "../08-shared/ui-kit/Error.svelte";
  import marked from "marked";
  import Dots from "../08-shared/ui-kit/loaders/Dots.svelte";

  export let repoName = "";
  let loading = true;
  let error = "";
  let repoDetailsEl;

  onMount(async () => {
    try {
      const viewer_ = await viewer;
      const results: [any, Repository] = await Promise.all([
        getRepositoryReadme(viewer_.login, repoName),
        !$currentRepository && getRepository(viewer_.login, repoName),
      ]);

      repoDetailsEl.innerHTML = marked(await results[0].text());
      if (results[1]) {
        // eslint-disable-next-line require-atomic-updates
        $currentRepository = results[1];
      }
    } catch (error_) {
      console.log(error_);
      error =
        error_.status === 404 ? "readme.md не найдено" : JSON.stringify(error);
    } finally {
      loading = false;
    }
  });
</script>

<svelte:head>
  <title>Репозиторий - {repoName}</title>
</svelte:head>

{#if loading}
  <div class="loader">
    <Dots />
  </div>
{:else if error}
  <Error message="{error}" />
{:else if $currentRepository}
  <section class="repo-info">
    <h2 class="title">
      {$currentRepository.description}
    </h2>
    <div class="date">
      {$currentRepository.createdAt} - {$currentRepository.updatedAt}
    </div>
  </section>
{/if}
<div class="markdown-body" class:loading bind:this="{repoDetailsEl}"></div>
