<style>
  .root {
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--gap-100);
    padding: var(--gap-100) var(--gap-200);
    background-color: rgba(0, 0, 0, 0.025);
    border: 1px solid var(--colors-grey-200);
    color: var(--colors-grey-500);
    border-radius: 12px;
    font-size: 0.85rem;
    text-transform: capitalize;
  }

  :global(.chip--close-icon) {
    cursor: pointer;
  }
</style>

<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Close from "./icons/Close.svelte";

  export let removable = false;
  const dispatch = createEventDispatcher();

  const onRemoveClick = () => {
    dispatch("remove");
  };
</script>

<span {...$$props} on:click class="root {$$props.class}">
  <slot>Undefined</slot>
  {#if removable}
    <Close on:click="{onRemoveClick}" class="chip--close-icon" />
  {/if}
</span>
