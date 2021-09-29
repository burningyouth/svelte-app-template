<style>
  .repo-item--title:first-letter {
    text-transform: uppercase;
  }

  :global(.repo-item--title-link) {
    color: inherit;
  }

  .repo-item--content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: var(--gap-200);
    gap: var(--gap-300);
  }

  .repo-item--labels {
    display: flex;
    flex-wrap: wrap;
    gap: var(--gap-200);
  }

  :global(.repo-item--chip) {
    cursor: pointer;
  }

  :global(.repo-item--chip--link) {
    color: var(--colors-link) !important;
  }

  @media (max-width: 720px) {
    .repo-item--content {
      flex-direction: column-reverse;
      align-items: flex-start;
      margin-top: var(--gap-300);
    }
  }
</style>

<script lang="ts">
  import Chip from "../../../08-shared/ui-kit/Chip.svelte";
  import { createEventDispatcher } from "svelte";
  import { Link } from "svelte-routing";
  import Skeleton from "../../../08-shared/ui-kit/loaders/Skeleton.svelte";

  const dispatch = createEventDispatcher();

  const onTopicClick = (value: string) => {
    dispatch("topicClick", {
      label: value,
    });
  };

  export let loading = false;
  export let repoData: Repository;
</script>

<li {...$$restProps} class="repo-item">
  <h2 class="repo-item--title">
    {#if loading}
      <Skeleton width="300px" />
    {:else}
      <Link class="repo-item--title-link" to="/repository/{repoData.name}"
        >{repoData.description}
      </Link>
    {/if}
  </h2>

  <div class="repo-item--content">
    <div class="repo-item--date">
      {#if loading}
        <Skeleton width="200px" />
      {:else}{repoData.createdAt}{/if}
    </div>
    {#if !loading}
      {#if repoData.repositoryTopics.length}
        <div class="repo-item--labels">
          {#each repoData.repositoryTopics as topic}
            <Chip
              on:click="{() => {
                onTopicClick(topic.name);
              }}"
              class="repo-item--chip">
              {topic.name}
            </Chip>
          {/each}
        </div>
      {/if}
    {:else}
      <div class="repo-item--labels">
        <Skeleton width="150px" />
      </div>
    {/if}
  </div>
</li>
