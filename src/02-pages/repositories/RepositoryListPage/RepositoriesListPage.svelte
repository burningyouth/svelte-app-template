<style>
  .topics {
    display: flex;
    gap: var(--gap-200);
  }

  .repos {
    display: flex;
    flex-direction: column;
    gap: var(--gap-400);
  }
</style>

<script lang="ts">
  import Chip from "../../../08-shared/ui-kit/Chip.svelte";
  import { onMount } from "svelte";
  import Error from "../../../08-shared/ui-kit/Error.svelte";
  import RepositoryListItem from "./RepositoryListItem.svelte";
  import { repositories } from "../../../07-entities/repositories";
  import {
    allRepos,
    allReposDictionary,
    filteredRepos,
    filteredTopics,
  } from "../model";

  const defaultRepos = new Array(10).fill({
    description: "#",
  });

  let error = "";

  const filterRepos = () =>
    $allRepos.filter((repo) =>
      $filteredTopics.some((label) =>
        repo.repositoryTopics.find((topic) => topic.name === label)
      )
    );

  const onTopicClick = (event: any) => {
    if (!$filteredTopics.includes(event.detail.label)) {
      window.scrollTo({ top: 0 });
      $filteredTopics = [...$filteredTopics, event.detail.label];
      $filteredRepos = $allRepos.filter((repo) =>
        repo.repositoryTopics.find((topic) => topic.name === event.detail.label)
      );
    }
  };

  const onRemoveTopic = (topicName: string) => {
    const index = $filteredTopics.indexOf(topicName);
    if (index !== -1) {
      if ($filteredTopics.length > 1) {
        $filteredTopics.splice(index, 1);
        $filteredTopics = $filteredTopics.slice();
        $filteredRepos = filterRepos();
      } else {
        $filteredTopics = [];
        $filteredRepos = $allRepos;
      }
    }
  };

  onMount(() => {
    if ($allRepos.length === 0)
      repositories
        .then((response) => {
          const repos = response.nodes.filter(
            (node) =>
              !node.repositoryTopics.find((topic) => topic.name === "dont-show")
          );
          $allRepos = repos;
          $filteredRepos = repos;
          const reposDictionary = {};
          response.nodes.forEach((node) => {
            reposDictionary[node.name] = node;
          });
          $allReposDictionary = reposDictionary;
        })
        .catch((error_) => {
          error = error_.message;
        });
  });
</script>

<svelte:head>
  <title>Мои работы</title>
</svelte:head>

{#if !error}
  {#if $filteredTopics.length}
    <div class="topics">
      {#each $filteredTopics as topicName}
        <Chip removable on:click="{() => onRemoveTopic(topicName)}">
          {topicName}
        </Chip>
      {/each}
    </div>
  {/if}
  <ul class="repos">
    {#each $filteredRepos as repository}
      {#if repository.description}
        <RepositoryListItem
          loading="{false}"
          on:topicClick="{onTopicClick}"
          repoData="{repository}" />
      {/if}
    {/each}
  </ul>
{:else}
  <Error message="{error.message}" />
{/if}
