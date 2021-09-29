<style>
  .repo-info {
    display: flex;
    flex-direction: column;
    gap: var(--gap-200);
    margin-bottom: var(--gap-300);
  }

  .repo-info--content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .repo-info--title {
    padding-bottom: var(--gap-200);
    border-bottom: 1px solid var(--colors-grey-200);
  }
</style>

<script lang="ts">
  import { allReposDictionary } from "./model";
  import {
    getRepository,
    getRepositoryReadme,
  } from "../../07-entities/repositories/api";
  import { viewer } from "../../07-entities/viewer";
  import Error from "../../08-shared/ui-kit/Error.svelte";
  import marked from "marked";
  import Chip from "../../08-shared/ui-kit/Chip.svelte";

  export let repoName = "";
  let error = "";
  let repoDetailsEl;
  let repoData = $allReposDictionary[repoName];

  const fetchData = async (name: string) => {
    const repo = $allReposDictionary[name];
    try {
      const viewer_ = await viewer;
      const results: [any, Repository] = await Promise.all([
        getRepositoryReadme(viewer_.login, name),
        !repo && getRepository(viewer_.login, name),
      ]);
      if (repoDetailsEl)
        repoDetailsEl.innerHTML = marked(await results[0].text());
      repoData = repo || results[1];
    } catch (error_) {
      console.log(error_);
      error =
        error_.status === 404 ? "readme.md не найдено" : JSON.stringify(error);
    }
  };

  $: {
    fetchData(repoName);
  }
</script>

<svelte:head>
  <title>{repoData?.description ?? "Репозиторий"}</title>
</svelte:head>

<div>
  {#if error}
    <Error message="{error}" />
  {:else if repoData}
    <div class="repo-info">
      <h1 class="repo-info--title">
        {repoData.description}
      </h1>
      <div class="repo-info--content">
        <div>
          {repoData.createdAt}
        </div>
        {#if repoData.homepageUrl}
          <Chip on:click="{() => window.open(repoData.homepageUrl, '_blank')}">
            Deployment
          </Chip>
        {/if}
      </div>
    </div>
  {/if}
  <div class="markdown-body" bind:this="{repoDetailsEl}"></div>
</div>
