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
    justify-content: space-between;
    align-items: flex-end;
    gap: var(--gap-200);
    margin-bottom: var(--gap-300);
  }

  :global(.detail-chip) {
    color: var(--colors-grey-800);
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
  import Chip from "../08-shared/ui-kit/Chip.svelte";
  import Explore from "../08-shared/ui-kit/icons/Explore.svelte";

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
        currentRepository.set(results[1]);
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
  <title>{$currentRepository?.description ?? "Репозиторий"}</title>
</svelte:head>

<div>
  {#if loading}
    <div class="loader">
      <Dots />
    </div>
  {:else if error}
    <Error message="{error}" />
  {:else if $currentRepository}
    <section class="repo-info">
      <div>
        <h2 class="title">
          {$currentRepository.description}
        </h2>
        <div class="date">
          {$currentRepository.createdAt}
        </div>
      </div>
      <div>
        <Chip
          size="lg"
          on:click="{() =>
            window.open($currentRepository.homepageUrl, '_blank')}"
          class="detail-chip">
          <Explore size="1.45em" color="var(--colors-grey-500)" />
          Deployment
        </Chip>
      </div>
    </section>
  {/if}
  <div class="markdown-body" class:loading bind:this="{repoDetailsEl}"></div>
</div>
