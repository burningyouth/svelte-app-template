<style>
  .title:first-letter {
    text-transform: uppercase;
  }

  :global(.title-link) {
    color: inherit;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: var(--gap-200);
    gap: var(--gap-300);
  }

  .labels {
    display: flex;
    flex-wrap: wrap;
    gap: var(--gap-200);
  }

  :global(.chip) {
    cursor: pointer;
  }

  :global(.chip--link) {
    color: var(--colors-link) !important;
  }

  @media (max-width: 720px) {
    .content {
      flex-direction: column-reverse;
      align-items: flex-start;
    }
  }
</style>

<script lang="ts">
  import Chip from "../../08-shared/ui-kit/Chip.svelte";
  import { createEventDispatcher } from "svelte";
  import { Link } from "svelte-routing";
  import Skeleton from "../../08-shared/ui-kit/loaders/Skeleton.svelte";
  import { currentRepository } from "../../07-entities/repositories";

  const dispatch = createEventDispatcher();

  const onTopicClick = (value: string) => {
    dispatch("topicClick", {
      label: value,
    });
  };

  export let loading = false;
  export let repoData: Repository;
</script>

<section {...$$restProps}>
  <h2 class="title">
    {#if loading}
      <Skeleton width="300px" />
    {:else}
      <Link
        class="title-link"
        on:click="{() => {
          $currentRepository = repoData;
        }}"
        to="/repository/{repoData.name}"
        >{repoData.description}
      </Link>
    {/if}
  </h2>

  <div class="content">
    <div class="date">
      {#if loading}
        <Skeleton width="200px" />
      {:else}{repoData.updatedAt}{/if}
    </div>
    {#if !loading}
      {#if repoData.repositoryTopics.length}
        <div class="labels">
          {#each repoData.repositoryTopics as topic}
            <Chip
              on:click="{() => {
                onTopicClick(topic.name);
              }}"
              class="chip">
              {topic.name}
            </Chip>
          {/each}
          {#if repoData.homepageUrl}
            <Chip
              on:click="{() => window.open(repoData.homepageUrl, '_blank')}"
              class="chip chip--link"
              >Deployment
            </Chip>
          {/if}
        </div>
      {/if}
    {:else}
      <div class="labels">
        <Skeleton width="150px" />
      </div>
    {/if}
  </div>
</section>
