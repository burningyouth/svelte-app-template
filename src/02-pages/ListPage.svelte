<style>
  .labels {
    display: flex;
    gap: var(--gap-200);
  }
</style>

<script lang="ts">
  import { NormalizedViewer, viewer } from "../08-shared/github/viewer";
  import Post from "../06-features/Post.svelte";
  import { onMount } from "svelte";
  import Chip from "../08-shared/ui-kit/Chip.svelte";

  let labels = [];
  let repos: NormalizedViewer["repositories"]["nodes"] = [];

  let filteredRepos = repos;

  onMount(async () => {
    repos = (await viewer).repositories.nodes;
    filteredRepos = repos;
  });

  const onLabelClick = (event: any) => {
    if (!labels.includes(event.detail.label)) {
      labels = [...labels, event.detail.label];
      filteredRepos = repos.filter((repo) =>
        repo.repositoryTopics.find((topic) => topic.name === event.detail.label)
      );
    }
  };

  const onRemoveLabel = (label: string) => {
    const index = labels.indexOf(label);
    if (index !== -1) {
      if (labels.length > 1) {
        labels = [...labels.splice(index - 1, 1)];
        filteredRepos = repos.filter((repo) =>
          labels.some((label) =>
            repo.repositoryTopics.find((topic) => topic.name === label)
          )
        );
      } else {
        labels = [];
        filteredRepos = repos;
      }
    }
  };
</script>

<svelte:head>
  <title>Мои работы</title>
</svelte:head>

{#if labels.length}
  <div class="labels">
    {#each labels as label}
      <Chip removable on:remove="{() => onRemoveLabel(label)}">
        {label}
      </Chip>
    {/each}
  </div>
{/if}
{#each filteredRepos as repository}
  {#if repository.description}
    <Post
      on:labelClick="{onLabelClick}"
      title="{repository.description}"
      deployment="{repository.homepageUrl}"
      date="{repository.createdAt}"
      labels="{repository.repositoryTopics || []}" />
  {/if}
{/each}
