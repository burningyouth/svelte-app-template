<style>
  .topics {
    display: flex;
    gap: var(--gap-200);
  }
</style>

<script lang="ts">
  import Chip from "../../08-shared/ui-kit/Chip.svelte";
  import { onMount } from "svelte";
  import Error from "../../08-shared/ui-kit/Error.svelte";
  import RepositoryListItem from "./RepositoryListItem.svelte";
  import {
    currentRepository,
    repositories,
  } from "../../07-entities/repositories";

  let topics = [];
  let repos: Repositories["nodes"] = new Array(10).fill({
    description: "#",
  });

  let loading = true;
  let error = "";
  let filteredRepos = repos;

  onMount(() =>
    repositories
      .then((response) => {
        repos = response.nodes;
        filteredRepos = repos;
      })
      .catch((error_) => {
        error = error_.message;
      })
      .finally(() => {
        loading = false;
      })
  );

  const onTopicClick = (event: any) => {
    if (!topics.includes(event.detail.label)) {
      window.scrollTo({ top: 0 });
      topics = [...topics, event.detail.label];
      filteredRepos = repos.filter((repo) =>
        repo.repositoryTopics.find((topic) => topic.name === event.detail.label)
      );
    }
  };

  const onRemoveTopic = (topicName: string) => {
    const index = topics.indexOf(topicName);
    if (index !== -1) {
      if (topics.length > 1) {
        topics.splice(index, 1);
        topics = topics.slice();
        filteredRepos = repos.filter((repo) =>
          topics.some((label) =>
            repo.repositoryTopics.find((topic) => topic.name === label)
          )
        );
      } else {
        topics = [];
        filteredRepos = repos;
      }
    }
  };

  // eslint-disable-next-line prefer-const
  $currentRepository = null;
</script>

<svelte:head>
  <title>Мои работы</title>
</svelte:head>

{#if !error}
  {#if topics.length}
    <div class="topics">
      {#each topics as topicName}
        <Chip removable on:click="{() => onRemoveTopic(topicName)}">
          {topicName}
        </Chip>
      {/each}
    </div>
  {/if}
  {#each filteredRepos as repository}
    {#if repository.description}
      <RepositoryListItem
        loading="{loading}"
        on:topicClick="{onTopicClick}"
        repoData="{repository}" />
    {/if}
  {/each}
{:else}
  <Error message="{error.message}" />
{/if}
