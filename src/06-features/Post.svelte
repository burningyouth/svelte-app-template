<style>
  h2:first-letter {
    text-transform: uppercase;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: var(--gap-300);
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
  import Chip from "../08-shared/ui-kit/Chip.svelte";
  import { createEventDispatcher } from "svelte";
  import type { Label } from "../08-shared/github/repositories";

  const dispatch = createEventDispatcher();

  const onLabelClick = (value: string) => {
    dispatch("labelClick", {
      label: value,
    });
  };

  export let title = "Без названия";
  export let date = "Без даты";
  export let labels: Label[] = [];
  export let deployment = "";
</script>

<section {...$$restProps}>
  <h2>
    {title}
  </h2>

  <div class="content">
    <div class="date">{date}</div>
    {#if labels.length}
      <div class="labels">
        {#each labels as label}
          <Chip
            on:click="{() => {
              onLabelClick(label.name);
            }}"
            class="chip">
            {label.name}
          </Chip>
        {/each}
        {#if deployment}
          <Chip
            on:click="{() => window.open(deployment, '_blank')}"
            class="chip chip--link"
            >Deployment
          </Chip>
        {/if}
      </div>
    {/if}
  </div>
</section>
